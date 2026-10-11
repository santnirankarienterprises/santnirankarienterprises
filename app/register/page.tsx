"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, BriefcaseBusiness, Building2, Sparkles, Users } from "lucide-react";
import { useState } from "react";
import { AuthButton } from "@/components/auth/auth-button";
import { AuthInput } from "@/components/auth/auth-input";

type FormErrors = {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = () => {
    const nextErrors: FormErrors = {};

    if (!fullName.trim()) {
      nextErrors.fullName = "Full name is required.";
    } else if (fullName.trim().length < 2) {
      nextErrors.fullName = "Please enter your complete name.";
    }

    if (!email.trim()) {
      nextErrors.email = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!password.trim()) {
      nextErrors.password = "Password is required.";
    } else if (password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters.";
    }

    if (!confirmPassword.trim()) {
      nextErrors.confirmPassword = "Please confirm your password.";
    } else if (confirmPassword !== password) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setErrors((current) => ({
          ...current,
          email: result.message || "Unable to create your account.",
        }));
        return;
      }

      localStorage.setItem("userId", result.user.id);
      localStorage.setItem("user", JSON.stringify(result.user));
      window.dispatchEvent(new Event("storage"));

      window.location.href = "/candidate/profile";
    } catch (error) {
      console.error(error);

      setErrors((current) => ({
        ...current,
        email: "Unable to create your account right now. Please try again.",
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-zinc-50 text-zinc-950 dark:bg-[#020617] dark:text-white">
      <main className="grid min-h-screen lg:grid-cols-[1.02fr_0.98fr]">

        {/* LEFT PANEL */}
        {/* LEFT PANEL */}
        <section className="relative hidden overflow-hidden bg-[#020617] lg:flex lg:min-h-screen lg:items-start">

          {/* Background Glow */}
          <div className="absolute -left-32 -top-24 h-[380px] w-[380px] rounded-full bg-blue-600/20 blur-[100px]" />
          <div className="absolute -bottom-32 -right-24 h-[380px] w-[380px] rounded-full bg-violet-600/20 blur-[100px]" />
          <div className="absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[90px]" />

          {/* Decorative Grid */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.8) 1px,transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative z-10 mx-auto w-full max-w-xl px-8 pt-16 xl:px-12 xl:pt-20">

            {/* Brand */}
            <Link href="/" className="group mb-7 inline-flex items-center gap-2.5">
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

            {/* Heading */}
            <div className="mb-6">

              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                <Sparkles size={11} className="text-violet-400" />
                Candidate Registration
              </div>

              <h1 className="max-w-lg text-[42px] font-extrabold leading-[0.98] tracking-[-0.055em] text-white xl:text-5xl">
                Build your
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent">
                  career profile.
                </span>
              </h1>

              <p className="mt-4 max-w-md text-[13px] leading-6 text-zinc-400 xl:text-sm xl:leading-6">
                Create your professional candidate profile and connect with
                opportunities that match your skills, experience and career goals.
              </p>

            </div>

            {/* Benefits */}
            <div className="flex max-w-lg flex-col gap-3">

              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3.5 backdrop-blur-sm">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400">
                  <Sparkles size={17} />
                </div>

                <div>
                  <h3 className="text-xs font-bold text-white">
                    Smart Matchmaking
                  </h3>

                  <p className="mt-0.5 text-[11px] leading-5 text-zinc-400">
                    Discover opportunities aligned with your profile and career preferences.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3.5 backdrop-blur-sm">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-500/20 text-violet-400">
                  <BriefcaseBusiness size={17} />
                </div>

                <div>
                  <h3 className="text-xs font-bold text-white">
                    Multiple Industries
                  </h3>

                  <p className="mt-0.5 text-[11px] leading-5 text-zinc-400">
                    Explore roles across manufacturing, IT, logistics, healthcare and more.
                  </p>
                </div>
              </div>

            </div>

            {/* Stats */}
            <div className="mt-5 grid max-w-lg grid-cols-3 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025]">

              <div className="px-3 py-3">
                <Users size={14} className="mb-1.5 text-blue-400" />
                <p className="text-lg font-extrabold text-white">500+</p>
                <p className="text-[9px] uppercase tracking-wider text-zinc-500">
                  Candidates
                </p>
              </div>

              <div className="border-l border-white/10 px-3 py-3">
                <Building2 size={14} className="mb-1.5 text-violet-400" />
                <p className="text-lg font-extrabold text-white">50+</p>
                <p className="text-[9px] uppercase tracking-wider text-zinc-500">
                  Companies
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
        <section className="relative flex min-h-screen items-center justify-center overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">

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
                    <ArrowRight size={18} />
                  </div>

                  <h2 className="text-[25px] font-extrabold tracking-[-0.04em] text-zinc-950 dark:text-white">
                    Create your account
                  </h2>

                  <p className="mt-1.5 max-w-sm text-xs leading-5 text-zinc-500 dark:text-zinc-400">
                    Start your candidate journey with a professional profile
                    built around your skills and ambitions.
                  </p>

                </div>

                {/* Register Form */}
                <form className="space-y-3.5" onSubmit={handleSubmit} autoComplete="off">

                  {/* Full Name */}
                  <AuthInput
                    id="fullName"
                    label="Full name"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(value) => {
                      setFullName(value);

                      if (errors.fullName) {
                        setErrors((current) => ({
                          ...current,
                          fullName: undefined,
                        }));
                      }
                    }}
                    error={errors.fullName}
                    autoComplete="name"
                  />

                  {/* Email */}
                  <AuthInput
                    id="email"
                    label="Email address"
                    type="email"
                    placeholder="Enter your email"
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
                    autoComplete="email"
                  />

                  {/* Password */}
                  <AuthInput
                    id="password"
                    label="Password"
                    type="password"
                    placeholder="Create a password"
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

                  {/* Confirm Password */}
                  <AuthInput
                    id="confirmPassword"
                    label="Confirm password"
                    type="password"
                    placeholder="Re-enter your password"
                    value={confirmPassword}
                    onChange={(value) => {
                      setConfirmPassword(value);

                      if (errors.confirmPassword) {
                        setErrors((current) => ({
                          ...current,
                          confirmPassword: undefined,
                        }));
                      }
                    }}
                    error={errors.confirmPassword}
                    autoComplete="new-password"
                  />

                  {/* Submit */}
                  <div className="pt-1">
                    <AuthButton loading={loading} type="submit">
                      Create Account <ArrowRight size={15} />
                    </AuthButton>
                  </div>

                </form>

                {/* Footer */}
                <div className="mt-5 border-t border-zinc-200 pt-4 text-center dark:border-white/10">

                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                    Already have an account?
                  </p>

                  <Link
                    href="/login"
                    className="group mt-2 inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-blue-700 via-violet-700 to-emerald-600 px-4 py-2 text-[11px] font-bold text-white shadow-[0_7px_20px_-8px_rgba(79,70,229,0.75)] transition-all duration-300 hover:-translate-y-0.5 hover:from-blue-600 hover:via-violet-600 hover:to-emerald-500 hover:shadow-[0_10px_25px_-8px_rgba(79,70,229,0.9)]"
                  >
                    Sign In
                    <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                  </Link>

                </div>

              </div>
            </div>

            {/* Bottom Note */}
            <p className="mx-auto mt-3 max-w-md text-center text-[9px] leading-4 text-zinc-400 dark:text-zinc-600">
              By creating an account, you agree to use Sant Nirankari Enterprise
              for genuine career, employment and recruitment purposes.
            </p>

          </div>
        </section>

      </main>
    </div>
  );
}
