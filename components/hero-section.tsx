// components/hero-section.tsx
import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  ChevronRight,
  Globe,
  Star,
  Users,
} from "lucide-react";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-[90vh] w-full flex-col items-center justify-center overflow-hidden bg-white pt-24 dark:bg-[#030303]"
    >
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[25%] left-[20%] h-[600px] w-[600px] rounded-full bg-blue-600/10 blur-[120px] dark:bg-blue-600/20" />
        <div className="absolute top-[20%] right-[10%] h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[100px] dark:bg-violet-600/20" />
        <div className="absolute bottom-[-10%] left-[50%] h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[120px] dark:bg-emerald-500/15" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] dark:opacity-[0.05]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-4 text-center sm:px-6 lg:px-8">
        
        {/* Badge */}
        <div className="group flex cursor-pointer items-center gap-2 rounded-full border border-black/5 bg-black/5 py-1.5 pl-2 pr-4 text-xs font-medium text-black backdrop-blur-md transition-all hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 sm:text-sm">
          <span className="flex items-center justify-center rounded-full bg-blue-600 px-2 py-0.5 text-[10px] font-bold text-white">
            NEW
          </span>
          <span>Enterprise Recruitment Platform</span>
          <ChevronRight size={14} className="text-zinc-500 transition-transform group-hover:translate-x-0.5" />
        </div>

        {/* Main Heading */}
        <h1 className="mt-8 max-w-5xl font-serif text-[3.5rem] font-bold leading-[1.05] tracking-tight text-black sm:text-6xl md:text-7xl lg:text-[5.5rem] dark:text-white">
          Elevate Your Career with
          <br className="hidden md:block" />
          <span className="inline-block bg-gradient-to-r from-blue-600 via-violet-600 to-emerald-500 bg-clip-text text-transparent pb-2">
            Sant Nirankari
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-8 max-w-2xl text-lg font-medium leading-relaxed text-zinc-600 sm:text-xl dark:text-zinc-400">
          The premier platform connecting top-tier talent with world-class enterprises. 
          Discover opportunities that align with your ambition.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <Link
            href="/register"
            className="group flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-zinc-950 px-8 text-sm font-semibold text-white shadow-[0_0_40px_-10px_rgba(0,0,0,0.4)] transition-all hover:-translate-y-1 hover:shadow-[0_0_50px_-10px_rgba(0,0,0,0.5)] sm:w-auto dark:bg-white dark:text-zinc-950 dark:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] dark:hover:shadow-[0_0_50px_-10px_rgba(255,255,255,0.4)]"
          >
            Start Your Journey
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
          
          <Link
            href="/employer/login"
            className="group flex h-14 w-full items-center justify-center gap-2 rounded-2xl border border-zinc-200 bg-white/50 px-8 text-sm font-semibold text-zinc-900 backdrop-blur-sm transition-all hover:bg-white hover:shadow-lg sm:w-auto dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
          >
            <Briefcase size={16} className="text-blue-600 dark:text-blue-400" />
            Hire Top Talent
          </Link>
        </div>

        {/* Metrics Grid */}
        <div className="mt-20 grid grid-cols-2 gap-4 border-t border-zinc-200 pt-10 sm:grid-cols-4 sm:gap-8 md:gap-12 lg:gap-20 dark:border-white/10">
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
              <Users size={24} strokeWidth={1.5} />
            </div>
            <h3 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">10k+</h3>
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">Candidates</p>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-600 dark:bg-violet-900/20 dark:text-violet-400">
              <Globe size={24} strokeWidth={1.5} />
            </div>
            <h3 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">500+</h3>
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">Enterprises</p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400">
              <Star size={24} strokeWidth={1.5} />
            </div>
            <h3 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">4.9</h3>
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">User Rating</p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400">
              <Briefcase size={24} strokeWidth={1.5} />
            </div>
            <h3 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">95%</h3>
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">Placement Rate</p>
          </div>
        </div>

      </div>
    </section>
  );
}