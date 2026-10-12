"use client";

import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock,
  Headphones,
  LogIn,
  MapPin,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";

export function FeaturedJobs() {
  const highlights = [
    {
      icon: Users,
      title: "Pre-Screened Talent",
      description:
        "Every candidate profile is thoroughly verified for experience, skills, and background credentials.",
      color: "from-blue-500/20 to-blue-600/20 text-blue-600 dark:text-blue-400 border-blue-500/30",
    },
    {
      icon: Clock,
      title: "Fast 24-48h Deployment",
      description:
        "Share your requirement and get qualified profiles ready for interview within 24 to 48 hours.",
      color: "from-violet-500/20 to-violet-600/20 text-violet-600 dark:text-violet-400 border-violet-500/30",
    },
    {
      icon: MapPin,
      title: "Haridwar, Roorkee & Beyond",
      description:
        "Deep local sourcing network across SIDCUL Haridwar, Roorkee, Bhagwanpur, Dehradun & Uttarakhand.",
      color: "from-emerald-500/20 to-emerald-600/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    },
    {
      icon: Headphones,
      title: "Dedicated HR Coordinator",
      description:
        "Single-point account support to manage candidate calls, interview scheduling, and feedback.",
      color: "from-amber-500/20 to-amber-600/20 text-amber-600 dark:text-amber-400 border-amber-500/30",
    },
  ];

  const servedIndustries = [
    "Pharma & Healthcare",
    "SMT & Electronics",
    "Automobile & Engineering",
    "Plastic Injection Moulding",
    "Sheet Metal & Fabrication",
    "Warehouse & Logistics",
    "Accounts & Back Office",
    "FMCG & Packaging",
  ];

  return (
    <section
      id="manpower"
      className="relative overflow-hidden bg-white py-16 text-zinc-950 sm:py-24 lg:py-28 dark:bg-[#030303] dark:text-white"
    >
      {/* Background Decor Orbs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-12 h-[520px] w-[520px] rounded-full bg-blue-600/5 blur-[120px] dark:bg-blue-600/10" />
        <div className="absolute -right-40 bottom-12 h-[520px] w-[520px] rounded-full bg-violet-600/5 blur-[120px] dark:bg-violet-600/10" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[350px] rounded-full bg-emerald-500/5 blur-[100px] dark:bg-emerald-500/10" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Badge & Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            <Building2 size={13} className="text-blue-600 dark:text-blue-400" />
            <span>Industrial & Corporate Manpower Solutions</span>
          </div>

          <h2 className="mt-5 font-serif text-3xl font-extrabold tracking-tight text-zinc-950 sm:text-4xl lg:text-5xl dark:text-white">
            Need A Manpower?
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-emerald-500 bg-clip-text text-transparent">
              Give Us Your Requirements, We Give You The Best Candidates.
            </span>
          </h2>

          <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
            We have supplied reliable, vetted manpower to multiple companies across{" "}
            <span className="font-semibold text-zinc-900 dark:text-zinc-200">
              Haridwar, Roorkee, SIDCUL, and beyond
            </span>
            . From plant operators and technical engineers to office executives, we fulfill your workforce demands with speed and precision.
          </p>

          {/* Location Badges */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-zinc-600 dark:text-zinc-400">
            <span className="inline-flex items-center gap-1 rounded-full border border-zinc-200/80 bg-zinc-50 px-3 py-1 dark:border-white/10 dark:bg-zinc-900">
              <MapPin size={12} className="text-blue-600" /> SIDCUL Haridwar
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-zinc-200/80 bg-zinc-50 px-3 py-1 dark:border-white/10 dark:bg-zinc-900">
              <MapPin size={12} className="text-violet-600" /> Roorkee
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-zinc-200/80 bg-zinc-50 px-3 py-1 dark:border-white/10 dark:bg-zinc-900">
              <MapPin size={12} className="text-emerald-600" /> Bhagwanpur
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-zinc-200/80 bg-zinc-50 px-3 py-1 dark:border-white/10 dark:bg-zinc-900">
              <MapPin size={12} className="text-amber-600" /> Dehradun & Across Uttarakhand
            </span>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 sm:mt-16">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group relative rounded-2xl border border-zinc-200/80 bg-white/80 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-xl dark:border-white/10 dark:bg-zinc-900/60 dark:hover:border-white/20"
              >
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl border bg-gradient-to-br ${item.color}`}
                >
                  <Icon size={20} />
                </div>

                <h3 className="mt-4 text-base font-bold text-zinc-950 dark:text-white">
                  {item.title}
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Industries Served Strip */}
        <div className="mt-10 rounded-2xl border border-zinc-200/70 bg-zinc-50/70 p-5 dark:border-white/5 dark:bg-white/[0.02]">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-violet-600 dark:text-violet-400 shrink-0" />
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                Industries We Actively Support:
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-1.5">
              {servedIndustries.map((ind) => (
                <span
                  key={ind}
                  className="rounded-lg border border-zinc-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-zinc-700 shadow-2xs dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-300"
                >
                  {ind}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons Box (According to User Request) */}
        <div className="mt-12 rounded-3xl border border-zinc-200/80 bg-gradient-to-br from-zinc-50 via-white to-zinc-50 p-6 sm:p-10 shadow-lg shadow-zinc-200/40 dark:border-white/10 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 dark:shadow-none">
          <div className="flex flex-col items-center justify-between gap-6 text-center lg:flex-row lg:text-left">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <ShieldCheck size={14} />
                <span>Zero Sourcing Delays</span>
              </div>
              <h3 className="mt-2 text-xl font-bold tracking-tight text-zinc-950 sm:text-2xl dark:text-white">
                Ready to fulfill your company's manpower needs?
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-xl">
                Post your hiring requirements today. Our team will contact you directly and provide screened candidates right into your employer dashboard.
              </p>
            </div>

            {/* 3 Requested Buttons */}
            <div className="flex flex-col w-full sm:w-auto sm:flex-row items-center gap-3 shrink-0">
              {/* Button 1: Post Your Requirement Now -> redirects to /employer */}
              <Link
                href="/employer"
                className="group w-full sm:w-auto inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-violet-600 to-emerald-600 px-6 text-xs sm:text-sm font-bold text-white shadow-lg shadow-violet-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-violet-500/40"
              >
                <span>Post Your Requirement Now</span>
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </Link>

              {/* Button 2: Contact Us -> redirects to #contact */}
              <Link
                href="/#contact"
                className="w-full sm:w-auto inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-zinc-300 bg-white px-5 text-xs sm:text-sm font-bold text-zinc-800 shadow-xs transition hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
              >
                <PhoneCall size={14} className="text-zinc-600 dark:text-zinc-400" />
                <span>Contact Us</span>
              </Link>

              {/* Button 3: If you already have account Login -> redirects to /employer/login */}
              <Link
                href="/employer/login"
                className="w-full sm:w-auto inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-violet-500/30 bg-violet-500/10 px-4 text-xs sm:text-sm font-bold text-violet-700 transition hover:bg-violet-500/20 dark:text-violet-300"
              >
                <LogIn size={14} />
                <span>Employer Login</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturedJobs;