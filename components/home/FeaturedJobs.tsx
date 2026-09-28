"use client";

import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import Link from "next/link";
import { JobCard } from "@/components/home/JobCard";

const companies = [
  {
    company: "Relaxo Footwear Ltd.",
    location: "SIDCUL, Haridwar",
    type: "Full Time",
  },
  {
    company: "C&S Electric Ltd.",
    location: "SIDCUL, Haridwar",
    type: "Full Time",
  },
  {
    company: "Campus Activewear",
    location: "SIDCUL, Haridwar",
    type: "Full Time",
  },
  {
    company: "Mahindra Logistics",
    location: "Haridwar",
    type: "Full Time",
  },
  {
    company: "Milton Pvt. Ltd.",
    location: "SIDCUL, Haridwar",
    type: "Full Time",
  },
  {
    company: "IPL Biologicals Ltd.",
    location: "SIDCUL, Haridwar",
    type: "Full Time",
  },
];

export function FeaturedJobs() {
  return (
    <section
      id="jobs"
      className="relative overflow-hidden bg-white py-16 text-zinc-950 sm:py-24 lg:py-32 dark:bg-[#030303] dark:text-white"
    >
      {/* Background Decor */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-10 h-[500px] w-[500px] rounded-full bg-blue-600/5 blur-[120px] dark:bg-blue-600/10" />
        <div className="absolute -right-32 bottom-10 h-[500px] w-[500px] rounded-full bg-violet-600/5 blur-[120px] dark:bg-violet-600/10" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              <Sparkles size={14} />
              <span>Featured Opportunities</span>
            </div>
            <h2 className="mt-4 text-3xl font-serif font-bold tracking-tight text-black sm:text-4xl lg:text-5xl dark:text-white">
              Discover roles that match <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-violet-600 to-emerald-500">your ambition.</span>
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              Explore hand-picked career opportunities across leading enterprises and rapidly growing industries.
            </p>
          </div>

          <div className="relative rounded-full p-[2px] bg-gradient-to-r from-blue-700 via-violet-700 to-emerald-600 shadow-sm shrink-0 self-start sm:self-auto">
            <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-zinc-900 dark:bg-[#030303] dark:text-white">
              <MapPin size={16} className="text-blue-600 dark:text-blue-400" />
              <span>Prime Locations</span>
            </div>
          </div>
        </div>

        {/* Company Grid */}
        <div className="mt-12 grid grid-cols-2 gap-3 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 xl:gap-8">
          {companies.map((company) => (
            <JobCard
              key={`${company.company}-${company.location}`}
              company={company.company}
              location={company.location}
              type={company.type}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:mt-16">
          <Link
            href="/login"
            className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 text-sm font-semibold text-white shadow-[0_8px_20px_-8px_rgba(37,99,235,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-[0_8px_25px_-8px_rgba(37,99,235,0.8)] dark:bg-blue-600 dark:text-white dark:hover:bg-blue-500"
          >
            Explore All Opportunities
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <p className="text-center text-xs text-zinc-400 dark:text-zinc-500">
            Hundreds of new roles added every week.
          </p>
        </div>
      </div>
    </section>
  );
}