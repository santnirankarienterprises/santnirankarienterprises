import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { EmployerNav } from "@/components/employer/employer-nav";
import { RequirementForm } from "@/components/employer/requirement-form";
import { Building2, Users, BriefcaseBusiness, Mail, MapPin, Phone, ArrowLeft } from "lucide-react";
import Link from "next/link";

async function getEmployerProfile() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) redirect("/employer/login");

  try {
    const decoded = verifyToken(token) as { id: string; role: string };
    if (decoded.role !== "employer") redirect("/employer/login");

    const employer = await prisma.employerProfile.findUnique({
      where: { userId: decoded.id },
      include: {
        requirements: {
          orderBy: { createdAt: "desc" }
        }
      },
    });

    if (!employer) redirect("/employer/login");
    return employer;
  } catch (error) {
    redirect("/employer/login");
  }
}

export default async function EmployerDashboardPage() {
  const employer = await getEmployerProfile();

  // Basic stats
  const totalRequests = employer.requirements.length;
  const totalCandidatesRequested = employer.requirements.reduce((acc, req) => acc + req.numberOfCandidates, 0) + employer.candidatesRequired;
  const fulfilledRequests = employer.requirements.filter(req => req.status === "FULFILLED").length;

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#000000]">
      <EmployerNav />

      {/* Background styling elements */}
      <div className="pointer-events-none fixed inset-0 flex justify-center">
        <div className="absolute -top-[20%] right-0 h-[500px] w-[500px] rounded-full bg-emerald-500/5 blur-[120px]" />
        <div className="absolute -top-[10%] left-[-10%] h-[400px] w-[400px] rounded-full bg-blue-500/5 blur-[120px]" />
      </div>

      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-24 pt-28 sm:px-6">
        {/* Back Button */}
        <div className="mb-6">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-zinc-700 shadow-sm ring-1 ring-black/5 transition-all hover:bg-zinc-50 hover:shadow dark:bg-white/5 dark:text-zinc-300 dark:ring-white/10 dark:hover:bg-white/10"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>

        {/* Header Section */}
        <div className="mb-10 text-center">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-white shadow-xl ring-1 ring-black/5 dark:bg-white/5 dark:ring-white/10">
            <Building2 size={36} className="text-emerald-500" strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
            Welcome, {employer.employerName}
          </h1>
          <p className="mt-3 text-sm font-medium text-zinc-500 dark:text-zinc-400">
            {employer.companyName}
          </p>
        </div>

        {/* Stats Row */}
        <div className="mb-10 grid gap-4 sm:grid-cols-3">
          <div className="flex flex-col items-center justify-center rounded-[24px] border border-white/40 bg-white/40 p-6 text-center backdrop-blur-xl dark:border-white/5 dark:bg-white/5">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
              <Users size={20} />
            </div>
            <p className="text-3xl font-bold text-zinc-900 dark:text-white">{totalCandidatesRequested}</p>
            <p className="mt-1 text-xs font-medium uppercase tracking-wider text-zinc-500">Candidates Needed</p>
          </div>

          <div className="flex flex-col items-center justify-center rounded-[24px] border border-white/40 bg-white/40 p-6 text-center backdrop-blur-xl dark:border-white/5 dark:bg-white/5">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
              <BriefcaseBusiness size={20} />
            </div>
            <p className="text-3xl font-bold text-zinc-900 dark:text-white">{totalRequests}</p>
            <p className="mt-1 text-xs font-medium uppercase tracking-wider text-zinc-500">Total Requests</p>
          </div>

          <div className="flex flex-col items-center justify-center rounded-[24px] border border-white/40 bg-white/40 p-6 text-center backdrop-blur-xl dark:border-white/5 dark:bg-white/5">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-violet-500/10 text-violet-600 dark:bg-violet-500/20 dark:text-violet-400">
              <Building2 size={20} />
            </div>
            <p className="text-3xl font-bold text-zinc-900 dark:text-white">{fulfilledRequests}</p>
            <p className="mt-1 text-xs font-medium uppercase tracking-wider text-zinc-500">Fulfilled</p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Main Column */}
          <div className="space-y-8 lg:col-span-3">
            {/* Post Requirement Form */}
            <RequirementForm userId={employer.userId} />

            {/* Active Requirements List */}
            <div className="rounded-[24px] border border-white/40 bg-white/40 p-6 backdrop-blur-xl dark:border-white/5 dark:bg-white/5">
              <h2 className="mb-6 text-lg font-bold text-zinc-900 dark:text-white">Active Requests</h2>
              
              {employer.requirements.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-zinc-300 p-8 text-center dark:border-zinc-800">
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">No active requirements. Post one above to get started!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {employer.requirements.map((req) => (
                    <div key={req.id} className="flex flex-col justify-between gap-4 rounded-2xl border border-white/40 bg-white/60 p-4 dark:border-zinc-800 dark:bg-zinc-900/60 sm:flex-row sm:items-center">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-zinc-900 dark:text-white">{req.jobCategory}</h3>
                          <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                            req.status === "PENDING" ? "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400" :
                            req.status === "IN_PROGRESS" ? "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400" :
                            "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400"
                          }`}>
                            {req.status}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                          {req.numberOfCandidates} Candidates needed • {req.field || req.preferredJobCategory || "General Role"}
                        </p>
                      </div>
                      <div className="text-right text-[10px] text-zinc-400">
                        {new Date(req.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8 lg:col-span-2">
            <div className="rounded-[24px] border border-white/40 bg-white/40 p-6 backdrop-blur-xl dark:border-white/5 dark:bg-white/5">
              <h2 className="mb-6 text-lg font-bold text-zinc-900 dark:text-white">Company Profile</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white/50 p-3 dark:border-zinc-800 dark:bg-zinc-900/50">
                  <Mail className="text-zinc-400" size={16} />
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Email Address</p>
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-200">{employer.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white/50 p-3 dark:border-zinc-800 dark:bg-zinc-900/50">
                  <Phone className="text-zinc-400" size={16} />
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Phone</p>
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-200">{employer.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white/50 p-3 dark:border-zinc-800 dark:bg-zinc-900/50">
                  <MapPin className="text-zinc-400" size={16} />
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Address</p>
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-200">{employer.companyAddress}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Support Card */}
            <div className="rounded-[24px] border border-blue-500/20 bg-gradient-to-b from-blue-500/5 to-transparent p-6 dark:border-blue-500/10">
              <h3 className="font-bold text-zinc-900 dark:text-white">Need Support?</h3>
              <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
                Contact our administration team directly if you have an urgent recruitment requirement.
              </p>
              <div className="mt-4 flex flex-col gap-1 text-sm font-semibold text-blue-600 dark:text-blue-400">
                <span>Sant Nirankari Enterprise</span>
                <a href="tel:+919756280678" className="flex items-center gap-1.5 hover:underline">
                  <Phone size={14} /> +91 97562 80678
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
