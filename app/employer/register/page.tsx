"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, BriefcaseBusiness, Building2, Sparkles, Users } from "lucide-react";
import { useState } from "react";
import { AuthButton } from "@/components/auth/auth-button";
import { AuthInput } from "@/components/auth/auth-input";

type FormErrors = Record<string, string>;

export default function EmployerRegisterPage() {
  const [formData, setFormData] = useState({
    employerName: "",
    companyName: "",
    phone: "",
    email: "",
    password: "",
    companyAddress: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));

    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: "" }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: FormErrors = {};

    if (!formData.employerName.trim()) {
      nextErrors.employerName = "Your name is required.";
    }

    if (!formData.companyName.trim()) {
      nextErrors.companyName = "Company name is required.";
    }

    if (!formData.phone.trim()) {
      nextErrors.phone = "Phone number is required.";
    }

    if (!formData.email.trim()) {
      nextErrors.email = "Company email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      nextErrors.email = "Please enter a valid company email.";
    }

    if (!formData.password.trim()) {
      nextErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters.";
    }

    if (!formData.companyAddress.trim()) {
      nextErrors.companyAddress = "Company address is required.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) return;

    setLoading(true);

    try {
      const response = await fetch("/api/employer/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        setErrors({
          email: result.message || "Unable to create your employer account.",
        });
        return;
      }

      localStorage.setItem("userId", result.user.id);
      localStorage.setItem("user", JSON.stringify(result.user));
      window.dispatchEvent(new Event("storage"));

      window.location.href = "/employer/dashboard";
    } catch (error) {
      console.error(error);

      setErrors({
        email: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-zinc-50 text-zinc-950 dark:bg-[#020617] dark:text-white">
      <main className="grid min-h-screen lg:grid-cols-[1.02fr_0.98fr]">

        {/* LEFT PANEL */}
        <section className="relative hidden overflow-hidden bg-[#020617] lg:flex lg:min-h-screen lg:items-start">

          {/* Background Glow */}
          <div className="absolute -left-32 -top-24 h-[380px] w-[380px] rounded-full bg-blue-600/20 blur-[100px]" />
          <div className="absolute -bottom-32 -right-24 h-[380px] w-[380px] rounded-full bg-violet-600/20 blur-[100px]" />
          <div className="absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[90px]" />

          {/* Grid */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.8) 1px,transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative z-10 mx-auto w-full max-w-xl px-8 pt-10 pb-8 xl:px-12 xl:pt-14">

            {/* Brand */}
            <Link href="/" className="group mb-5 inline-flex items-center gap-2.5">
              <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/5 transition duration-300 group-hover:scale-105 group-hover:border-violet-400/40">
                <img
                  src="/sant-nirankari-enterprise-logo.png"
                  alt="Sant Nirankari Enterprise"
                  className="h-full w-full object-cover"
                />
              </div>

              <div>
                <p className="bg-gradient-to-r from-blue-400 via-violet-400 to-emerald-400 bg-clip-text font-serif text-[17px] font-extrabold tracking-[-0.03em] text-transparent">
                  Sant Nirankari
                </p>

                <p className="mt-0.5 text-[7px] font-bold uppercase tracking-[0.38em] text-zinc-500">
                  Enterprise
                </p>
              </div>
            </Link>

            {/* Badge */}
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
              <Sparkles size={11} className="text-violet-400" />
              Simple Hiring Process
            </div>

            {/* Heading */}
            <h1 className="max-w-lg text-[32px] font-extrabold leading-[1.05] tracking-[-0.05em] text-white xl:text-[38px]">
              How it works for
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent">
                employers.
              </span>
            </h1>

            <p className="mt-2.5 max-w-md text-[13px] leading-relaxed text-zinc-400">
              Follow these simple steps to build your recruitment pipeline with qualified candidates.
            </p>

            {/* Process Steps */}
            <div className="mt-6 flex max-w-lg flex-col gap-3">

              <div className="flex items-start gap-3.5 rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/[0.05]">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/20 text-xs font-extrabold text-blue-400">
                  1
                </div>

                <div>
                  <h3 className="text-xs font-bold text-white">
                    Create Your Profile
                  </h3>

                  <p className="mt-0.5 text-[11px] leading-5 text-zinc-400">
                    Register with your company and contact details to set up your verified employer workspace.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/[0.05]">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-violet-500/30 bg-violet-500/20 text-xs font-extrabold text-violet-400">
                  2
                </div>

                <div>
                  <h3 className="text-xs font-bold text-white">
                    Post any Number of Requirements you have
                  </h3>

                  <p className="mt-0.5 text-[11px] leading-5 text-zinc-400">
                    Post as many job requirements and hiring positions as you need with full flexibility.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/[0.05]">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/20 text-xs font-extrabold text-emerald-400">
                  3
                </div>

                <div>
                  <h3 className="text-xs font-bold text-white">
                    Dedicated Support & Dashboard Updates
                  </h3>

                  <p className="mt-0.5 text-[11px] leading-5 text-zinc-400">
                    Our team will call u and u can see all the details in your dashboard whenever you login.
                  </p>
                </div>
              </div>

            </div>

            {/* Stats */}
            <div className="mt-5 grid max-w-lg grid-cols-3 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025]">

              <div className="px-3 py-3">
                <Building2 size={14} className="mb-1.5 text-blue-400" />
                <p className="text-lg font-extrabold text-white">50+</p>
                <p className="text-[9px] uppercase tracking-wider text-zinc-500">
                  Companies
                </p>
              </div>

              <div className="border-l border-white/10 px-3 py-3">
                <Users size={14} className="mb-1.5 text-violet-400" />
                <p className="text-lg font-extrabold text-white">5000+</p>
                <p className="text-[9px] uppercase tracking-wider text-zinc-500">
                  Candidates
                </p>
              </div>

              <div className="border-l border-white/10 px-3 py-3">
                <BriefcaseBusiness size={14} className="mb-1.5 text-emerald-400" />
                <p className="text-lg font-extrabold text-white">6+</p>
                <p className="text-[9px] uppercase tracking-wider text-zinc-500">
                  Industries
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* RIGHT PANEL */}
        <section className="relative flex min-h-screen items-start justify-center overflow-y-auto px-4 pb-8 pt-6 sm:px-6 lg:px-8 lg:pt-8">

          {/* Background Glow */}
          <div className="absolute -right-32 -top-32 h-72 w-72 rounded-full bg-blue-500/10 blur-[100px]" />
          <div className="absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-violet-500/10 blur-[100px]" />

          <div className="relative z-10 w-full max-w-[500px]">

            {/* Back */}
            <Link
              href="/"
              className="group mb-3 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold text-zinc-600 shadow-sm transition-all hover:-translate-x-0.5 hover:border-violet-300 hover:text-zinc-950 dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-400 dark:hover:border-violet-500/40 dark:hover:text-white"
            >
              <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-0.5" />
              Return to Home
            </Link>

            {/* Gradient Card */}
            <div className="rounded-[23px] bg-gradient-to-br from-blue-600 via-violet-600 to-emerald-500 p-[1px] shadow-[0_20px_70px_-35px_rgba(79,70,229,0.55)]">

              <div className="rounded-[22px] bg-white p-5 sm:p-6 dark:bg-[#080b12]">

                {/* Header */}
                <div className="mb-5">

                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-violet-600 to-emerald-500 text-white shadow-lg shadow-violet-500/20">
                    <Building2 size={18} />
                  </div>

                  <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-400">
                    <Sparkles size={11} className="text-violet-500" />
                    Company Setup
                  </div>

                  <h2 className="text-[24px] font-extrabold tracking-[-0.04em] text-zinc-950 dark:text-white">
                    Create your employer profile
                  </h2>

                  <p className="mt-1.5 max-w-sm text-xs leading-5 text-zinc-500 dark:text-zinc-400">
                    Tell us about your company and hiring requirements to get
                    started with your recruitment workspace.
                  </p>

                </div>

                {/* Form */}
                <form
                  className="space-y-3"
                  onSubmit={handleSubmit}
                  autoComplete="off"
                >

                  {/* Name + Company */}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                    <AuthInput
                      id="employerName"
                      label="Your name"
                      type="text"
                      placeholder="Enter your name"
                      value={formData.employerName}
                      onChange={(value) => handleChange("employerName", value)}
                      error={errors.employerName}
                      autoComplete="name"
                    />

                    <AuthInput
                      id="companyName"
                      label="Company name"
                      type="text"
                      placeholder="Enter company name"
                      value={formData.companyName}
                      onChange={(value) => handleChange("companyName", value)}
                      error={errors.companyName}
                      autoComplete="organization"
                    />

                  </div>

                  {/* Email */}
                  <AuthInput
                    id="email"
                    label="Company email"
                    type="email"
                    placeholder="hr@company.com"
                    value={formData.email}
                    onChange={(value) => handleChange("email", value)}
                    error={errors.email}
                    autoComplete="email"
                  />

                  {/* Phone */}
                  <AuthInput
                    id="phone"
                    label="Contact number"
                    type="tel"
                    placeholder="+91 9876543210"
                    value={formData.phone}
                    onChange={(value) => handleChange("phone", value)}
                    error={errors.phone}
                    autoComplete="tel"
                  />

                  {/* Address */}
                  <AuthInput
                    id="companyAddress"
                    label="Company address"
                    type="text"
                    placeholder="Business address"
                    value={formData.companyAddress}
                    onChange={(value) => handleChange("companyAddress", value)}
                    error={errors.companyAddress}
                    autoComplete="street-address"
                  />

                  {/* Password */}
                  <AuthInput
                    id="password"
                    label="Password"
                    type="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(value) => handleChange("password", value)}
                    error={errors.password}
                    autoComplete="new-password"
                  />

                  {/* Submit */}
                  <div className="pt-1">
                    <AuthButton loading={loading} type="submit">
                      Create Employer Account <ArrowRight size={15} />
                    </AuthButton>
                  </div>

                </form>

                {/* Footer */}
                <div className="mt-5 border-t border-zinc-200 pt-4 text-center dark:border-white/10">

                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                    Already have an employer account?
                  </p>

                  <Link
                    href="/employer/login"
                    className="group mt-2 inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-blue-700 via-violet-700 to-emerald-600 px-4 py-2 text-[11px] font-bold text-white shadow-[0_7px_20px_-8px_rgba(79,70,229,0.8)] transition-all duration-300 hover:-translate-y-0.5 hover:from-blue-600 hover:via-violet-600 hover:to-emerald-500 hover:shadow-[0_10px_25px_-8px_rgba(79,70,229,0.95)]"
                  >
                    Sign In to Employer Portal
                    <ArrowRight
                      size={13}
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </Link>

                </div>

              </div>
            </div>

            {/* Bottom Note */}
            <p className="mx-auto mt-3 max-w-md text-center text-[9px] leading-4 text-zinc-400 dark:text-zinc-600">
              By creating an employer account, you agree to use Sant Nirankari
              Enterprise for genuine recruitment and hiring activities.
            </p>

          </div>
        </section>

      </main>
    </div>
  );
}
