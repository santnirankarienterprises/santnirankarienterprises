"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, ShieldCheck, KeyRound, LockKeyhole } from "lucide-react";
import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { AuthButton } from "@/components/auth/auth-button";
import { AuthInput } from "@/components/auth/auth-input";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string; form?: string }>({});

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const nextErrors: { password?: string; confirmPassword?: string; form?: string } = {};
    if (!password) nextErrors.password = "Please enter a new password.";
    else if (password.length < 8) nextErrors.password = "Password must be at least 8 characters.";
    
    if (!confirmPassword) nextErrors.confirmPassword = "Please confirm your password.";
    else if (password && confirmPassword && password !== confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);

    try {
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setErrors({ form: result.message || "Failed to reset password." });
        return;
      }

      router.push("/login?reset=success");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-zinc-50 text-zinc-950 dark:bg-[#020617] dark:text-white">
      <main className="grid min-h-screen lg:min-h-screen lg:grid-cols-[1.02fr_0.98fr]">
        
        {/* LEFT PANEL */}
        <section className="relative hidden overflow-hidden bg-[#020617] lg:flex lg:min-h-screen lg:items-center">
            {/* Background Glow */}
            <div className="absolute -left-32 -top-24 h-[380px] w-[380px] rounded-full bg-blue-600/20 blur-[100px]" />
            <div className="absolute -bottom-32 -right-24 h-[380px] w-[380px] rounded-full bg-violet-600/20 blur-[100px]" />
            <div className="absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[90px]" />

            {/* Grid */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.8) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />

            <div className="relative z-10 mx-auto w-full max-w-xl px-8 py-6 xl:px-12">
              <Link href="/" className="group mb-7 inline-flex items-center gap-2.5">
                <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/5 transition duration-300 group-hover:scale-105 group-hover:border-violet-400/40">
                  <img src="/sant-nirankari-enterprise-logo.png" alt="Sant Nirankari Enterprise" className="h-full w-full object-cover" />
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

              <div className="mb-6">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                  <LockKeyhole size={11} className="text-violet-400" />
                  Account Security
                </div>

                <h1 className="max-w-lg text-[42px] font-extrabold leading-[0.98] tracking-[-0.055em] text-white xl:text-5xl">
                  Secure your
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent">
                    account access.
                  </span>
                </h1>

                <p className="mt-4 max-w-md text-[13px] leading-6 text-zinc-400 xl:text-sm xl:leading-6">
                  Reset your password to securely regain access to your candidate profile and continue your career journey with us.
                </p>
              </div>

              <div className="flex max-w-lg flex-col gap-3">
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3.5 backdrop-blur-sm">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400">
                    <ShieldCheck size={17} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white">Enhanced Protection</h3>
                    <p className="mt-0.5 text-[11px] leading-5 text-zinc-400">
                      Your data is safeguarded with our secure authentication systems.
                    </p>
                  </div>
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
            <Link href="/login" className="group mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold text-zinc-600 shadow-sm transition-all hover:-translate-x-0.5 hover:border-violet-300 hover:text-zinc-950 dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-400 dark:hover:border-violet-500/40 dark:hover:text-white">
              <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-0.5" />
              Return to Login
            </Link>

            {/* Gradient Card */}
            <div className="rounded-[23px] bg-gradient-to-br from-blue-500/70 via-violet-500/60 to-emerald-500/60 p-[1px] shadow-[0_20px_70px_-35px_rgba(79,70,229,0.45)]">
              <div className="rounded-[22px] bg-white p-5 sm:p-6 dark:bg-[#080b12]">
                
                {/* Header */}
                <div className="mb-5">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-violet-600 to-emerald-500 text-white shadow-lg shadow-violet-500/20">
                    <KeyRound size={18} />
                  </div>
                  <h2 className="text-[25px] font-extrabold tracking-[-0.04em] text-zinc-950 dark:text-white">
                    Reset Password
                  </h2>
                  <p className="mt-1.5 max-w-sm text-xs leading-5 text-zinc-500 dark:text-zinc-400">
                    Enter your new password below to update your account credentials.
                  </p>
                </div>

                {errors.form && (
                  <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-[11px] font-medium text-red-500">
                    {errors.form}
                  </div>
                )}

                <form className="space-y-3.5" onSubmit={handleSubmit} autoComplete="off">
                  <AuthInput
                    id="password"
                    label="New Password"
                    type="password"
                    placeholder="Create a new password"
                    value={password}
                    onChange={(value) => {
                      setPassword(value);
                      if (errors.password) {
                        setErrors((current) => ({ ...current, password: undefined }));
                      }
                    }}
                    error={errors.password}
                    autoComplete="new-password"
                  />

                  <AuthInput
                    id="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    placeholder="Re-enter your new password"
                    value={confirmPassword}
                    onChange={(value) => {
                      setConfirmPassword(value);
                      if (errors.confirmPassword) {
                        setErrors((current) => ({ ...current, confirmPassword: undefined }));
                      }
                    }}
                    error={errors.confirmPassword}
                    autoComplete="new-password"
                  />

                  <div className="pt-1">
                    <AuthButton loading={loading} type="submit">
                      Update Password <ArrowRight size={15} />
                    </AuthButton>
                  </div>
                </form>

              </div>
            </div>

            {/* Bottom Note */}
            <p className="mx-auto mt-3 max-w-md text-center text-[9px] leading-4 text-zinc-400 dark:text-zinc-600">
              Ensure you use a strong and unique password for better account security.
            </p>

          </div>
        </section>

      </main>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-[#020617]"><div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white"></div></div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
