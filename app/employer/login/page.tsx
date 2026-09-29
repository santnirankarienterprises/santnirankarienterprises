"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Building2, BriefcaseBusiness, Sparkles, Users } from "lucide-react";
import { useState } from "react";
import { AuthButton } from "@/components/auth/auth-button";
import { AuthInput } from "@/components/auth/auth-input";

export default function EmployerLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      nextErrors.email = "Company email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      nextErrors.email = "Please enter a valid company email.";
    }

    if (!password.trim()) {
      nextErrors.password = "Password is required.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) return;

    setLoading(true);

    try {
      const response = await fetch("/api/employer/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        setErrors({
          password: result.message || "Unable to sign in. Please check your credentials.",
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
        password: "Something went wrong. Please try again.",
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

          {/* Decorative Grid */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.8) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />

          <div className="relative z-10 mx-auto w-full max-w-xl px-8 pt-16 xl:px-12 xl:pt-20">

            {/* Brand */}
            <Link href="/" className="group mb-8 inline-flex items-center gap-2.5">
              <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/5 transition duration-300 group-hover:scale-105 group-hover:border-violet-400/40">
                <img src="/logo_img.png" alt="Sant Nirankari Enterprise" className="h-full w-full object-contain p-1.5" />
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

            {/* Employer Badge */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
              <Building2 size={11} className="text-violet-400" />
              Employer Workspace
            </div>

            {/* Heading */}
            <h1 className="max-w-lg text-[42px] font-extrabold leading-[0.98] tracking-[-0.055em] text-white xl:text-5xl">
              Build your
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent">
                hiring pipeline.
              </span>
            </h1>

            <p className="mt-5 max-w-md text-[13px] leading-6 text-zinc-400 xl:text-sm xl:leading-6">
              Access your recruitment workspace, review candidate profiles and
              keep your hiring activities organized from one place.
            </p>

            {/* Benefits */}
            <div className="mt-7 flex max-w-lg flex-col gap-3">

              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3.5 backdrop-blur-sm">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400">
                  <Users size={17} />
                </div>

                <div>
                  <h3 className="text-xs font-bold text-white">
                    Candidate Discovery
                  </h3>

                  <p className="mt-0.5 text-[11px] leading-5 text-zinc-400">
                    Review candidate information and identify profiles relevant to your requirements.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3.5 backdrop-blur-sm">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-500/20 text-violet-400">
                  <BriefcaseBusiness size={17} />
                </div>

                <div>
                  <h3 className="text-xs font-bold text-white">
                    Recruitment Management
                  </h3>

                  <p className="mt-0.5 text-[11px] leading-5 text-zinc-400">
                    Keep your hiring workflow organized and manage recruitment activity efficiently.
                  </p>
                </div>
              </div>

            </div>

            {/* Employer Stats */}
            <div className="mt-5 grid max-w-lg grid-cols-3 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025]">

              <div className="px-3 py-3">
                <Building2 size={14} className="mb-1.5 text-blue-400" />
                <p className="text-lg font-extrabold text-white">250+</p>
                <p className="text-[9px] uppercase tracking-wider text-zinc-500">
                  Companies
                </p>
              </div>

              <div className="border-l border-white/10 px-3 py-3">
                <Users size={14} className="mb-1.5 text-violet-400" />
                <p className="text-lg font-extrabold text-white">5000+</p>
                <p className="text-[9px] uppercase tracking-wider text-zinc-500">
                  Profiles
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
        <section className="relative flex min-h-screen items-start justify-center overflow-y-auto px-4 pb-8 pt-8 sm:px-6 lg:px-8 lg:pt-12">

          {/* Background Glow */}
          <div className="absolute -right-32 -top-32 h-72 w-72 rounded-full bg-blue-500/10 blur-[100px]" />
          <div className="absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-violet-500/10 blur-[100px]" />

          <div className="relative z-10 w-full max-w-[470px]">

            {/* Back */}
            <Link href="/" className="group mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold text-zinc-600 shadow-sm transition-all hover:-translate-x-0.5 hover:border-violet-300 hover:text-zinc-950 dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-400 dark:hover:border-violet-500/40 dark:hover:text-white">
              <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-0.5" />
              Return to Home
            </Link>

            {/* Gradient Card */}
            <div className="rounded-[23px] bg-gradient-to-br from-blue-600 via-violet-600 to-emerald-500 p-[1px] shadow-[0_20px_70px_-35px_rgba(79,70,229,0.5)]">

              <div className="rounded-[22px] bg-white p-5 sm:p-6 dark:bg-[#080b12]">

                {/* Header */}
                <div className="mb-5">

                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-violet-600 to-emerald-500 text-white shadow-lg shadow-violet-500/20">
                    <Building2 size={18} />
                  </div>

                  <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-400">
                    <Sparkles size={11} className="text-violet-500" />
                    Employer Access
                  </div>

                  <h2 className="text-[25px] font-extrabold tracking-[-0.04em] text-zinc-950 dark:text-white">
                    Access your workspace
                  </h2>

                  <p className="mt-1.5 max-w-sm text-xs leading-5 text-zinc-500 dark:text-zinc-400">
                    Sign in to manage your recruitment activities and connect
                    with candidate profiles.
                  </p>

                </div>

                {/* Form */}
                <form className="space-y-3.5" onSubmit={handleSubmit} autoComplete="off">

                  <AuthInput
                    id="email"
                    label="Company email"
                    type="email"
                    placeholder="hr@company.com"
                    value={email}
                    onChange={(value) => {
                      setEmail(value);

                      if (errors.email) {
                        setErrors((current) => ({
                          ...current,
                          email: undefined,
                        }));
                      }
                    }}
                    error={errors.email}
                    autoComplete="off"
                  />

                  <AuthInput
                    id="password"
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(value) => {
                      setPassword(value);

                      if (errors.password) {
                        setErrors((current) => ({
                          ...current,
                          password: undefined,
                        }));
                      }
                    }}
                    error={errors.password}
                    autoComplete="new-password"
                  />

                  <div className="pt-1">
                    <AuthButton loading={loading} type="submit">
                      Open Employer Workspace <ArrowRight size={15} />
                    </AuthButton>
                  </div>

                </form>

                {/* Footer */}
                <div className="mt-5 border-t border-zinc-200 pt-4 text-center dark:border-white/10">

                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                    New to our employer network?
                  </p>

                  <Link
                    href="/employer/register"
                    className="group mt-2 inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-blue-700 via-violet-700 to-emerald-600 px-4 py-2 text-[11px] font-bold text-white shadow-[0_7px_20px_-8px_rgba(79,70,229,0.75)] transition-all duration-300 hover:-translate-y-0.5 hover:from-blue-600 hover:via-violet-600 hover:to-emerald-500 hover:shadow-[0_10px_25px_-8px_rgba(79,70,229,0.9)]"
                  >
                    Register Your Company
                    <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                  </Link>

                </div>

              </div>
            </div>

            {/* Bottom Note */}
            <p className="mx-auto mt-3 max-w-md text-center text-[9px] leading-4 text-zinc-400 dark:text-zinc-600">
              Employer access is intended for authorized recruitment and hiring activities.
            </p>

          </div>
        </section>

      </main>
    </div>
  );
}