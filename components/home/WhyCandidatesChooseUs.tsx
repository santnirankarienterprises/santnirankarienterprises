"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { Sparkles, ArrowRight } from "lucide-react";

const benefits = [
  { step: "01", title: "Registration", description: "Pay a nominal fee starting at ₹499 to create your candidate profile.", hoverClass: "hover:shadow-[0_0_25px_rgba(239,68,68,0.5)]", dotColor: "bg-red-500" },
  { step: "02", title: "Preferences", description: "Tell us your preferred role, industry, skills and location.", hoverClass: "hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]", dotColor: "bg-blue-500" },
  { step: "03", title: "Industries", description: "Explore opportunities across automotive, manufacturing, EV and more.", hoverClass: "hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]", dotColor: "bg-emerald-500" },
  { step: "04", title: "Locations", description: "Discover opportunities across Haridwar, SIDCUL, Pantnagar.", hoverClass: "hover:shadow-[0_0_25px_rgba(139,92,246,0.5)]", dotColor: "bg-violet-500" },
  { step: "05", title: "Profile", description: "Build a structured profile presenting your education and skills.", hoverClass: "hover:shadow-[0_0_25px_rgba(249,115,22,0.5)]", dotColor: "bg-orange-500" },
  { step: "06", title: "Interviews", description: "We arrange interview opportunities based on your skills and experience.", hoverClass: "hover:shadow-[0_0_25px_rgba(234,179,8,0.5)]", dotColor: "bg-yellow-500" },
];

const testimonials = [
  { name: "Ayush Negi", role: "Production Supervisor", location: "SIDCUL, Haridwar" },
  { name: "Vivek Rawat", role: "HR Executive", location: "Haridwar" },
  { name: "Deepak Chauhan", role: "Electrical Maintenance", location: "Bhagwanpur" },
  { name: "Sandeep Saini", role: "Forklift & Logistics Executive", location: "Haridwar" },
  { name: "Amit Verma", role: "Store & Inventory Incharge", location: "SIDCUL" },
  { name: "Kuldeep Tyagi", role: "Security Supervisor", location: "Haridwar" },
  { name: "Sunil Kumar", role: "Facility & Housekeeping Staff", location: "Roorkee" },
  { name: "Pooja Rawat", role: "HR Executive", location: "Dehradun" },
  { name: "Pankaj Sharma", role: "Quality Control (QC)", location: "SIDCUL, Haridwar" },
  { name: "Kavita Bisht", role: "Staff Nurse / Healthcare", location: "Haridwar" },
  { name: "Mohit Pandey", role: "Accountant", location: "Haridwar" },
  { name: "Shalini Joshi", role: "HR Recruiter", location: "Roorkee" },
  { name: "Rohit Bhatt", role: "Back Office & MIS Executive", location: "Haridwar" },
  { name: "Ankit Kashyap", role: "IT & Network Support", location: "Dehradun" },
  { name: "Gaurav Rajput", role: "Customer Support Executive", location: "Haridwar" },
  { name: "Preeti Tomar", role: "Field Sales & Marketing", location: "Roorkee" },
  { name: "Shivam Sharma", role: "Web developer", location: "Haridwar" },
  { name: "Nitin Dhiman", role: "Retail Store Executive", location: "SIDCUL" },
  { name: "Mohammad Faisal", role: "Automobile Technician", location: "Haridwar" },
  { name: "Harsh Vardhan", role: "Solar & Panel Wireman", location: "Bhagwanpur" },
];

function CandidateSlider() {
  const candidateTicker = [...testimonials, ...testimonials];

  return (
    <div className="relative mt-12 py-10">
      <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-12 bg-gradient-to-r from-zinc-50 to-transparent dark:from-[#030303] sm:w-32" />
      <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-12 bg-gradient-to-l from-zinc-50 to-transparent dark:from-[#030303] sm:w-32" />

      <div className="overflow-hidden">
        <div className="flex w-max animate-marquee items-center gap-6 sm:gap-8 hover:[animation-play-state:paused]">
          {candidateTicker.map((candidate, index) => {
            // Stagger the vertical alignment slightly for a masonry/wave effect
            const isOffset = index % 2 !== 0;
            return (
              <div
                key={`${candidate.name}-${index}`}
                className={`group relative flex w-[280px] shrink-0 rounded-3xl p-[2px] bg-gradient-to-r from-blue-700/50 via-violet-700/50 to-emerald-600/50 transition-all duration-300 hover:scale-105 hover:from-blue-500 hover:via-violet-500 hover:to-emerald-400 hover:shadow-[0_0_40px_-10px_rgba(37,99,235,0.4)] ${isOffset ? 'translate-y-4' : '-translate-y-4'}`}
              >
                <div className="relative flex w-full flex-col gap-4 overflow-hidden rounded-[22px] bg-white p-6 shadow-sm dark:bg-zinc-900/80 backdrop-blur-md">
                  {/* Decorative glowing orb in card */}
                  <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-blue-500/10 blur-xl transition-all duration-500 group-hover:bg-blue-500/30" />
                  
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 via-violet-600 to-emerald-500 text-lg font-bold text-white shadow-lg">
                      {candidate.name.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="truncate font-serif text-lg font-bold text-zinc-900 dark:text-white">{candidate.name}</h4>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        <p className="truncate text-xs font-medium text-zinc-500">Placed</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 rounded-xl bg-zinc-50 p-3 dark:bg-black/40">
                    <p className="truncate text-sm font-semibold text-zinc-800 dark:text-zinc-200">{candidate.role}</p>
                    <p className="mt-1 truncate text-xs text-zinc-500 dark:text-zinc-400">{candidate.location}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function WhyCandidatesChooseUs() {
  const [hoveredStep, setHoveredStep] = useState<string | null>(null);

  return (
    <section id="stories" className="relative overflow-hidden bg-zinc-50 py-20 dark:bg-[#030303] sm:py-32">
      {/* Background Decor */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-full overflow-hidden" aria-hidden="true">
        <div className="absolute -left-1/4 top-1/4 h-[600px] w-[600px] rounded-full bg-blue-500/5 blur-[120px] dark:bg-blue-500/10" />
        <div className="absolute -right-1/4 bottom-1/4 h-[500px] w-[500px] rounded-full bg-violet-500/5 blur-[100px] dark:bg-violet-500/10" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 dark:bg-white/5">
            <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">Candidate First</span>
          </div>

          <h2 className="mt-6 max-w-3xl text-4xl font-serif font-bold leading-tight tracking-tight text-black sm:text-5xl lg:text-6xl dark:text-white">
            Discover Your Next <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-violet-600 to-emerald-500">Career Milestone.</span>
          </h2>
          
          <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-500 dark:text-zinc-400 sm:text-lg">
            We provide a transparent, structured pathway for candidates to connect with leading enterprises and secure meaningful roles.
          </p>
        </div>

        {/* Horizontal Timeline Benefits */}
        <div className="mt-16 sm:mt-24 w-full overflow-x-auto pb-12 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <style>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          
          <div className="relative flex snap-x snap-mandatory gap-6 px-4 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-2 min-w-max sm:min-w-[1000px] lg:min-w-full">
            {/* Timeline Line (Desktop Only) */}
            <div className="hidden sm:block absolute left-[8.33%] right-[8.33%] top-7 h-[2px] -translate-y-1/2 bg-zinc-200 dark:bg-zinc-800" />
            
            {benefits.map((b) => (
              <div 
                key={b.step}
                className="group flex flex-col items-center gap-8 w-[75vw] max-w-[280px] shrink-0 snap-center sm:w-auto sm:max-w-none"
              >
                {/* Step Circle */}
                <div 
                  className="cursor-pointer relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-[2px] border-zinc-200 bg-white dark:border-zinc-800 dark:bg-[#080808] text-zinc-400 transition-all duration-300 group-hover:border-transparent group-hover:text-white group-hover:-translate-y-1 group-hover:shadow-lg"
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 via-violet-600 to-emerald-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="relative z-10 text-xs font-semibold">{b.step}</span>
                </div>

                {/* Benefit Card */}
                <div 
                  className={`relative w-full h-full rounded-[20px] p-[2px] bg-gradient-to-r from-blue-700 via-violet-700 to-emerald-600 transition-all duration-500 group-hover:-translate-y-2 ${b.hoverClass.replace('hover:', 'group-hover:')}`}
                >
                  <div className="relative flex h-full flex-col rounded-[18px] bg-white p-5 sm:p-6 dark:bg-[#080808]">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">STEP {b.step}</span>
                      <ArrowRight className="h-3 w-3 text-zinc-400 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                    
                    <div className={`mt-8 sm:mt-10 h-2.5 w-2.5 rounded-full shadow-sm ${b.dotColor}`} />
                    
                    <h3 className="mt-4 sm:mt-5 text-base sm:text-lg font-bold tracking-tight text-zinc-900 dark:text-white">
                      {b.title}
                    </h3>
                    
                    <p className="mt-2 sm:mt-3 text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-400">
                      {b.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Slider Section */}
        <div className="mt-32">
          <div className="flex flex-col items-center text-center">
            <h3 className="text-3xl font-serif font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
              Success <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-violet-600 to-emerald-500">Stories</span>
            </h3>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 sm:text-base">
              Thousands of candidates have successfully navigated their career paths with us across multiple industries and locations.
            </p>
          </div>

          <CandidateSlider />
        </div>

        {/* Final CTA Banner */}
        <div className="group relative mt-20 overflow-hidden rounded-3xl p-[2px] bg-gradient-to-r from-blue-700 via-violet-700 to-emerald-600 shadow-[0_20px_40px_-15px_rgba(37,99,235,0.4)] sm:mt-32 transition-transform duration-500 hover:scale-[1.02]">
          <div className="relative flex flex-col items-center justify-between gap-8 rounded-[22px] bg-zinc-950 px-8 py-12 sm:flex-row sm:px-12 dark:bg-[#030303]">
            {/* Animated background glow inside the banner */}
            <div className="absolute inset-0 overflow-hidden rounded-[22px]">
              <div className="absolute -left-1/4 top-0 h-[200px] w-[200px] animate-pulse rounded-full bg-blue-500/20 blur-[80px]" />
              <div className="absolute -right-1/4 bottom-0 h-[200px] w-[200px] animate-pulse rounded-full bg-emerald-500/20 blur-[80px]" />
            </div>

            <div className="relative z-10 text-center sm:text-left">
              <h3 className="text-3xl font-serif font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-violet-400 to-emerald-400 sm:text-4xl">
                Ready to accelerate your career?
              </h3>
              <p className="mt-3 text-zinc-400">Join our talent network and start exploring opportunities.</p>
            </div>

            <div className="relative z-10 shrink-0">
              <button className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-blue-600 px-8 text-sm font-bold text-white transition-all hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(37,99,235,0.5)]">
                Create Your Profile
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}