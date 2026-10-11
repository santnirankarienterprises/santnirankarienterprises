// app/candidate/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import Link from "next/link";

import {
  ArrowRight,
  BriefcaseBusiness,
  ShieldCheck,
  Sparkles,
  UserRound,
  Calendar,
  CheckCircle2,
  Clock
} from "lucide-react";

import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import { InfoCard } from "@/components/dashboard/info-card";
import { SectionCard } from "@/components/dashboard/section-card";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CandidateDashboardPage() {
  const router = useRouter();

  const [payment, setPayment] = useState<any>(null);
  const [paymentLoading, setPaymentLoading] = useState(true);

  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const userId = localStorage.getItem("userId");

        if (!userId) {
          router.push("/login");
          return;
        }

        setAuthorized(true);

        // 1. LOAD CANDIDATE PROFILE
        const profileResponse = await fetch(`/api/profile?userId=${userId}`);
        const profileResult = await profileResponse.json();

        if (profileResponse.ok && profileResult.success) {
          if (!profileResult.profile || !profileResult.profile.user?.profileCompleted) {
            router.push("/candidate/profile");
            return;
          }
          setProfile(profileResult.profile);
        } else {
          setProfile(null);
        }

        // 2. CHECK PAYMENT STATUS
        const paymentResponse = await fetch(`/api/payment/check?userId=${userId}`, {
          method: "GET",
          cache: "no-store",
        });
        const paymentResult = await paymentResponse.json();

        if (paymentResponse.ok && paymentResult.success && paymentResult.paid) {
          setPayment(paymentResult.payment);
        } else {
          setPayment(null);
        }
      } catch (error) {
        console.error("DASHBOARD LOAD ERROR:", error);
        setPayment(null);
      } finally {
        setLoading(false);
        setPaymentLoading(false);
      }
    };

    loadDashboard();
  }, [router]);

  // ============================================
  // Payment Integration
  // ============================================
  const handlePayment = async () => {
    setPaymentProcessing(true);
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        router.push("/login");
        return;
      }

      // Create Razorpay Order
      const orderResponse = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
      const orderResult = await orderResponse.json();

      if (!orderResult.success) {
        alert(orderResult.message || "Unable to create payment.");
        setPaymentProcessing(false);
        return;
      }

      const order = orderResult.order;

      // Open Razorpay Checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Sant Nirankari Enterprise",
        description: "Candidate Registration Fee",
        order_id: order.id,
        handler: async function (response: any) {
          try {
            // Verify Payment
            const verifyResponse = await fetch("/api/payment/verify", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                userId: localStorage.getItem("userId"),
              }),
            });

            const verifyResult = await verifyResponse.json();

            if (!verifyResult.success) {
              alert(verifyResult.message || "Payment verification failed.");
              setPaymentProcessing(false);
              return;
            }

            // Payment Successfully Verified
            alert("Payment successful! Unlocking your dashboard...");
            window.location.reload(); // Reload to fetch updated payment status
          } catch (error) {
            console.error("Payment verification error:", error);
            alert("Payment was completed, but verification failed. Please contact support.");
            setPaymentProcessing(false);
          }
        },
        prefill: {
          name: profile?.user?.fullName || "Candidate",
        },
        theme: {
          color: "#18181b",
        },
        modal: {
          ondismiss: function () {
            setPaymentProcessing(false);
          },
        },
      };

      const Razorpay = window.Razorpay;
      const razorpay = new Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Unable to start payment. Please try again.");
      setPaymentProcessing(false);
    }
  };


  if (loading || !authorized || paymentLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-lg font-medium">
        Loading...
      </div>
    );
  }

  const fullName = profile?.user?.fullName || "Candidate";
  const jobField = profile?.preferredJobField || "Not Added";
  const profileStatus = profile?.user?.profileCompleted ? "Completed" : "Incomplete";
  const isPaid = payment?.status === "SUCCESS";

  const interviews = profile?.interviews || [];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingInterviews = interviews.filter((int: any) => new Date(int.date) >= today);
  const pastInterviews = interviews.filter((int: any) => new Date(int.date) < today);

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-50 via-white to-blue-50 dark:from-slate-900 dark:via-[#0a0f18] dark:to-slate-950 relative z-0 overflow-hidden">
      {/* Background Premium Orbs */}
      <div className="absolute -z-10 top-20 left-0 w-72 h-72 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse dark:mix-blend-lighten dark:bg-orange-600"></div>
      <div className="absolute -z-10 top-40 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse dark:mix-blend-lighten dark:bg-blue-600" style={{ animationDelay: '2s' }}></div>

      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
      <DashboardNav />

      <main className="mx-auto max-w-7xl px-4 pb-12 pt-32 sm:px-6 relative z-10">

        {/* ========================================
            UNPAID VIEW (PAYMENT WALL)
        ======================================== */}
        {/* ========================================
            UNPAID VIEW (PAYMENT WALL)
        ======================================== */}
        {!isPaid && (
          <div className="mx-auto mt-6 max-w-6xl">
            {/* Top Attention Banner */}
            <div className="mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500/10 via-orange-400/10 to-orange-500/10 p-1 border border-orange-500/20 relative shadow-sm">
              <div className="absolute inset-0 bg-white/40 dark:bg-slate-950/40 backdrop-blur-sm -z-10"></div>
              <div className="flex items-center justify-center gap-3 py-3 px-4 text-center">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-orange-600 dark:bg-orange-900/50 dark:text-orange-400 shrink-0 shadow-sm animate-bounce">
                  🚀
                </span>
                <p className="text-orange-800 dark:text-orange-200 text-sm sm:text-base font-medium">
                  <span className="font-bold">To get the Job Opportunities,</span> please complete your premium registration below.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 overflow-hidden rounded-3xl border border-white/60 bg-white/40 shadow-[0_20px_60px_-15px_rgba(255,150,0,0.1)] backdrop-blur-2xl lg:grid-cols-2 dark:border-slate-800/50 dark:bg-slate-900/40 transition-all hover:shadow-[0_20px_60px_-15px_rgba(255,150,0,0.2)]">
              
              {/* Left Side: Content */}
              <div className="flex flex-col justify-center p-10 lg:p-14 relative overflow-hidden group">
                <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-orange-400/20 blur-3xl transition-transform duration-700 group-hover:translate-x-10 group-hover:translate-y-10 group-hover:bg-orange-400/30"></div>
                
                <div className="relative z-10">
                  <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-sm font-semibold text-orange-600 shadow-sm dark:border-orange-900/50 dark:bg-orange-900/20 dark:text-orange-400">
                    <Sparkles size={16} className="animate-pulse" /> Premium Access
                  </div>
                  
                  <h1 className="text-4xl font-black tracking-tight text-zinc-900 sm:text-5xl dark:text-white leading-[1.1]">
                    Complete Your <br/>
                    <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent drop-shadow-sm">Registration</span>
                  </h1>
                  
                  <p className="mt-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
                    Your profile for <strong className="rounded-md bg-zinc-100 px-2 py-0.5 text-zinc-900 dark:bg-zinc-800 dark:text-white border border-zinc-200 dark:border-zinc-700">{jobField}</strong> is ready! To unlock guaranteed interview opportunities and exclusive direct HR referrals, please complete your registration.
                  </p>

                  <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                    <button
                      onClick={handlePayment}
                      disabled={paymentProcessing}
                      className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-4 font-bold text-white shadow-xl shadow-orange-500/20 transition-all hover:-translate-y-1 hover:shadow-orange-500/40 active:translate-y-0 sm:w-auto cursor-pointer disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:-translate-y-0 relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-white/20 translate-y-full transition-transform group-hover:translate-y-0 duration-300 ease-out"></div>
                      <span className="relative z-10">{paymentProcessing ? "Processing..." : "Click Here to Pay Fees"}</span>
                      <ArrowRight size={20} className="relative z-10 transition-transform group-hover:translate-x-1" />
                    </button>

                    <Link
                      href="/#contact"
                      className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-zinc-200/80 bg-white/50 px-8 py-4 font-bold text-zinc-700 backdrop-blur-sm transition-all hover:bg-zinc-100 hover:border-zinc-300 sm:w-auto dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-200 dark:hover:bg-zinc-800"
                    >
                      Need Help?
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right Side: Features/Illustration */}
              <div className="relative hidden bg-gradient-to-br from-zinc-50 to-orange-50/50 p-10 lg:flex lg:flex-col lg:justify-center dark:from-slate-800/80 dark:to-slate-900/80">
                <div className="absolute -right-20 -bottom-20 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl"></div>
                <div className="absolute top-20 right-20 h-32 w-32 rounded-full bg-orange-500/10 blur-2xl"></div>
                
                <div className="relative z-10 space-y-6 rounded-3xl border border-white/60 bg-white/70 p-10 backdrop-blur-xl shadow-lg dark:border-slate-700/50 dark:bg-slate-800/70 transition-transform hover:scale-[1.02] duration-500">
                  <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Why Registration?</h3>
                  
                  <div className="group flex items-start gap-5 rounded-2xl p-3 transition-colors hover:bg-white/60 dark:hover:bg-slate-700/50">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-orange-600 shadow-sm transition-transform group-hover:scale-110 group-hover:rotate-3 dark:bg-orange-900/30 dark:text-orange-400">
                      <BriefcaseBusiness size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-zinc-900 dark:text-white">Direct HR Referrals</h4>
                      <p className="mt-1 text-sm text-zinc-600 leading-relaxed dark:text-zinc-400">Skip the line and get your resume directly in front of hiring managers.</p>
                    </div>
                  </div>

                  <div className="group flex items-start gap-5 rounded-2xl p-3 transition-colors hover:bg-white/60 dark:hover:bg-slate-700/50">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 shadow-sm transition-transform group-hover:scale-110 group-hover:-rotate-3 dark:bg-blue-900/30 dark:text-blue-400">
                      <Calendar size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-zinc-900 dark:text-white">Guaranteed Interviews</h4>
                      <p className="mt-1 text-sm text-zinc-600 leading-relaxed dark:text-zinc-400">We ensure you get interviews for roles matching your profile.</p>
                    </div>
                  </div>

                  <div className="group flex items-start gap-5 rounded-2xl p-3 transition-colors hover:bg-white/60 dark:hover:bg-slate-700/50">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 shadow-sm transition-transform group-hover:scale-110 group-hover:rotate-3 dark:bg-emerald-900/30 dark:text-emerald-400">
                      <ShieldCheck size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-zinc-900 dark:text-white">Dedicated Support</h4>
                      <p className="mt-1 text-sm text-zinc-600 leading-relaxed dark:text-zinc-400">Get assistance from our recruitment team every step of the way.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================
            PAID VIEW (FULL DASHBOARD)
        ======================================== */}
        {isPaid && (
          <>
            <SectionCard className="relative overflow-hidden border-0 bg-gradient-to-r from-blue-600 via-violet-600 to-emerald-500 text-white shadow-[0_10px_40px_-15px_rgba(79,70,229,0.5)]">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
              <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                    <Sparkles size={14} />
                    Your  Dashboard
                  </div>
                  <h1 className="mt-5 text-3xl font-extrabold sm:text-4xl lg:text-5xl tracking-tight">
                    Welcome back, {fullName} 👋
                  </h1>
                  <p className="mt-4 text-lg text-white/80 font-medium">
                    Track Your all Interviews Updates.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-md shadow-inner">
                  <p className="text-sm font-semibold uppercase tracking-wider text-white/70">Current Status</p>
                  <p className="mt-1 text-2xl font-bold sm:text-3xl text-emerald-300 drop-shadow-md">
                    {profile?.status || "Applied"}
                  </p>
                </div>
              </div>
            </SectionCard>

            {/* Dashboard Stats */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <InfoCard label="Preferred Job Field" value={jobField} />
              <InfoCard label="Total Interviews" value={interviews.length.toString()} />
              <InfoCard label="Scheduled Interviews" value={upcomingInterviews.length.toString()} />
              <InfoCard label="City" value={profile?.city || "Not Added"} />
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">

              {/* INTERVIEW SCHEDULE */}
              <SectionCard
                title="Interview Schedule"
                description={<>Your upcoming and past job interviews.</>}
              >
                {interviews.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10 text-center text-zinc-500">
                    <Calendar className="h-12 w-12 text-zinc-300 mb-3" />
                    <p>No interviews scheduled yet.</p>
                    <p className="text-sm">We will notify you when an employer shortlists your profile.</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-6">
                    {/* UPCOMING */}
                    {upcomingInterviews.length > 0 && (
                      <div>
                        <h3 className="mb-3 font-semibold text-green-600">Upcoming Interviews</h3>
                        <div className="flex flex-col gap-3">
                          {upcomingInterviews.map((interview: any) => (
                            <div key={interview.id} className="rounded-xl border border-green-200 bg-green-50 p-4">
                              <p className="font-bold text-zinc-900">{interview.companyName}</p>
                              {interview.designation && <p className="text-sm font-semibold text-green-700">{interview.designation}</p>}
                              <div className="mt-2 grid grid-cols-2 gap-2 text-sm text-zinc-600">
                                <div className="flex items-center gap-1"><Calendar size={14} /> {new Date(interview.date).toLocaleDateString('en-IN')}</div>
                                <div className="flex items-center gap-1"><Clock size={14} /> {interview.time}</div>
                              </div>
                              <p className="mt-2 text-sm text-zinc-700"><strong>Location/Link:</strong> {interview.location}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* PAST */}
                    {pastInterviews.length > 0 && (
                      <div>
                        <h3 className="mb-3 font-semibold text-zinc-500">Previous Interviews</h3>
                        <div className="flex flex-col gap-3">
                          {pastInterviews.map((interview: any) => (
                            <div key={interview.id} className="rounded-xl border bg-zinc-50 p-4 opacity-75">
                              <p className="font-bold text-zinc-900">{interview.companyName}</p>
                              {interview.designation && <p className="text-sm font-semibold text-zinc-600">{interview.designation}</p>}
                              <div className="mt-2 grid grid-cols-2 gap-2 text-sm text-zinc-600">
                                <div className="flex items-center gap-1"><Calendar size={14} /> {new Date(interview.date).toLocaleDateString('en-IN')}</div>
                                <div className="flex items-center gap-1"><Clock size={14} /> {interview.time}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </SectionCard>

              {/* PROFILE OVERVIEW */}
              <SectionCard
                title="Profile Overview"
                description={<>Your information saved in Sant Nirankari Enterprise.</>}
              >
                <div className="space-y-4 text-zinc-900 dark:text-white">
                  <div className="flex items-center gap-3 rounded-xl border dark:border-zinc-800 p-4">
                    <UserRound className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
                    <div>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">Full Name</p>
                      <p className="font-semibold">{fullName}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl border dark:border-zinc-800 p-4">
                    <BriefcaseBusiness className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
                    <div>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">Experience</p>
                      <p className="font-semibold">{profile?.experience || "Not Added"}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl border dark:border-zinc-800 p-4">
                    <CheckCircle2 className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
                    <div>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">Skills</p>
                      <p className="font-semibold">{profile?.skills || "Not Added"}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    onClick={() => router.push("/candidate/profile")}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 font-semibold text-zinc-900 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800 transition"
                  >
                    Edit Profile Details
                  </button>
                </div>
              </SectionCard>

            </div>
          </>
        )}
      </main>
    </div>
  );
}
