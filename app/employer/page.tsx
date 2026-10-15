"use client";

import Link from "next/link";
import { ArrowRight, Building2, CheckCircle2, Users, Zap, Search, Phone } from "lucide-react";
import { SiteNavbar } from "@/components/site-navbar";
import { SiteFooter } from "@/components/site-footer";

export default function EmployerLandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-zinc-950 transition-colors duration-200 dark:bg-[#0f0f10] dark:text-zinc-50">
      <SiteNavbar />

      <main className="flex-1">
        {/* ===================================================
            HERO SECTION
        ==================================================== */}
        <section className="relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32 bg-zinc-50 dark:bg-[#030303]">
          {/* Background Decor */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-full overflow-hidden" aria-hidden="true">
            <div className="absolute -left-1/4 top-1/4 h-[600px] w-[600px] rounded-full bg-blue-500/10 blur-[120px] dark:bg-blue-500/10" />
            <div className="absolute -right-1/4 bottom-1/4 h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[100px] dark:bg-emerald-500/10" />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 dark:border-blue-900/50 dark:bg-blue-900/20 dark:text-blue-400">
              <Building2 className="h-4 w-4" />
              For Employers, HR & Enterprises
            </div>

            <h1 className="mt-8 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-7xl font-serif">
              Hire Reliable Talent, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-violet-600 to-emerald-500">Faster.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              Partner with Sant Nirankari Enterprise to access a highly vetted pool of candidates across Manufacturing, IT, Logistics, and Healthcare in Uttarakhand & beyond.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/employer/register"
                className="group relative inline-flex h-14 items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-blue-600 via-violet-600 to-emerald-500 px-8 font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl w-full sm:w-auto"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Post a Requirement
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
              <Link
                href="https://wa.me/918171933515"
                target="_blank"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full border-2 border-zinc-200 bg-white px-8 font-bold text-zinc-900 transition-colors hover:border-zinc-900 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-black dark:text-white dark:hover:border-zinc-700 dark:hover:bg-zinc-900 w-full sm:w-auto"
              >
                <Phone className="h-4 w-4" />
                Contact Sales
              </Link>
            </div>
          </div>
        </section>

        {/* ===================================================
            HOW IT WORKS
        ==================================================== */}
        <section className="py-20 lg:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-serif">How It Works</h2>
              <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">Our streamlined process connects you with the right candidates in days, not weeks.</p>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                  <Building2 className="h-8 w-8" />
                </div>
                <h3 className="mt-6 text-xl font-bold">1. Post Requirements</h3>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">Create an employer account and submit your job descriptions, salary brackets, and required skills.</p>
              </div>

              <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400">
                  <Search className="h-8 w-8" />
                </div>
                <h3 className="mt-6 text-xl font-bold">2. We Screen Profiles</h3>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">Our HR team instantly matches your needs against our pre-verified database of thousands of candidates.</p>
              </div>

              <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                  <Zap className="h-8 w-8" />
                </div>
                <h3 className="mt-6 text-xl font-bold">3. Interview & Hire</h3>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">We align candidate schedules. You simply conduct the interviews and roll out the offer letters.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            WHY CHOOSE US
        ==================================================== */}
        <section className="py-20 lg:py-32 bg-zinc-950 text-white dark:bg-[#080808]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-serif">
                  Why Leading Companies Trust Us
                </h2>
                <p className="mt-6 text-lg text-zinc-400">
                  We don't just send resumes; we send reliable manpower. Our stringent vetting process ensures you only spend time interviewing serious, qualified candidates.
                </p>
                <div className="mt-10 space-y-6">
                  {[
                    "Pre-screened & verified candidate profiles",
                    "Rapid turnaround time (often within 48 hours)",
                    "Vast local network in Haridwar, SIDCUL, & Pantnagar",
                    "Dedicated account manager for your hiring needs"
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="h-6 w-6 text-emerald-400 shrink-0" />
                      <span className="text-lg font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-blue-600 to-emerald-500 opacity-30 blur-2xl"></div>
                <div className="relative rounded-3xl bg-zinc-900 border border-zinc-800 p-8 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-6">
                    <div>
                      <h4 className="text-2xl font-bold text-white">500+</h4>
                      <p className="text-sm text-zinc-400 mt-1">Active Candidates</p>
                    </div>
                    <Users className="h-10 w-10 text-blue-400" />
                  </div>
                  <div className="flex items-center justify-between border-b border-zinc-800 py-6">
                    <div>
                      <h4 className="text-2xl font-bold text-white">50+</h4>
                      <p className="text-sm text-zinc-400 mt-1">Companies Served</p>
                    </div>
                    <Building2 className="h-10 w-10 text-violet-400" />
                  </div>
                  <div className="flex items-center justify-between pt-6">
                    <div>
                      <h4 className="text-2xl font-bold text-white">10+</h4>
                      <p className="text-sm text-zinc-400 mt-1">Industries Covered</p>
                    </div>
                    <Zap className="h-10 w-10 text-emerald-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            FINAL CTA
        ==================================================== */}
        <section className="py-20 lg:py-32">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold sm:text-5xl font-serif">Stop struggling to find good talent.</h2>
            <p className="mt-6 text-xl text-zinc-600 dark:text-zinc-400">Join hundreds of companies scaling their workforce with Sant Nirankari Enterprise.</p>
            <div className="mt-10">
              <Link
                href="/employer/register"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-zinc-950 px-10 font-bold text-white transition-all hover:scale-105 hover:bg-zinc-800 hover:shadow-xl dark:bg-white dark:text-black dark:hover:bg-zinc-200"
              >
                Create Employer Account
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
