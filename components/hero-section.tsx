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
      {/* =========================================
          DYNAMIC BACKGROUND ELEMENTS
      ========================================= */}

      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">

        <div className="absolute -top-[25%] left-[20%] h-[600px] w-[600px] rounded-full bg-blue-600/10 blur-[120px] dark:bg-blue-600/20" />

        <div className="absolute right-[10%] top-[20%] h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[100px] dark:bg-violet-600/20" />

        <div className="absolute bottom-[-10%] left-[50%] h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[120px] dark:bg-emerald-500/15" />

        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] dark:opacity-[0.05]" />

      </div>


      {/* =========================================
          MAIN CONTENT
      ========================================= */}

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-4 text-center sm:px-6 lg:px-8">


        {/* =========================================
            BADGE
        ========================================= */}

        <div className="group flex cursor-pointer items-center gap-2 rounded-full border border-black/5 bg-black/5 py-1.5 pl-2 pr-4 text-xs font-medium text-black backdrop-blur-md transition-all hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 sm:text-sm">

          <span className="flex items-center justify-center rounded-full bg-blue-600 px-2 py-0.5 text-[10px] font-bold text-white">
            NEW
          </span>

          <span>Enterprise Recruitment Platform</span>

          <ChevronRight
            size={14}
            className="text-zinc-500 transition-transform group-hover:translate-x-0.5"
          />

        </div>


        {/* =========================================
            MAIN HEADING
        ========================================= */}

        <h1 className="mt-8 max-w-5xl font-serif text-[3.5rem] font-bold leading-[1.05] tracking-tight text-black sm:text-6xl md:text-7xl lg:text-[5.5rem] dark:text-white">

          Elevate Your Career with

          <br className="hidden md:block" />

          <span className="inline-block bg-gradient-to-r from-blue-600 via-violet-600 to-emerald-500 bg-clip-text pb-2 text-transparent">
            Sant Nirankari
          </span>

        </h1>


        {/* =========================================
            SUBTITLE
        ========================================= */}

        <p className="mt-8 max-w-2xl text-lg font-medium leading-relaxed text-zinc-600 sm:text-xl dark:text-zinc-400">
          The premier platform connecting top-tier talent with world-class
          enterprises. Discover opportunities that align with your ambition.
        </p>


        {/* =========================================
            CTA AREA
        ========================================= */}

        <div className="mt-10 flex w-full flex-col items-center justify-center gap-6 sm:flex-row sm:gap-5">


          {/* =====================================
              CANDIDATE CTA
          ===================================== */}

          <Link
            href="/register"
            className="
              group
              flex
              h-14
              w-full
              items-center
              justify-center
              gap-2
              rounded-2xl
              bg-gradient-to-r
              from-blue-600
              via-violet-600
              to-emerald-500
              px-8
              text-sm
              font-bold
              text-white

              shadow-[0_8px_20px_-8px_rgba(37,99,235,0.6)]

              transition-all
              duration-300

              hover:-translate-y-1
              hover:shadow-[0_8px_30px_-8px_rgba(37,99,235,0.8)]

              sm:w-auto
            "
          >

            Start Your Journey

            <ArrowRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />

          </Link>


          {/* =====================================
              EMPLOYER CTA
          ===================================== */}

          <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:gap-4">

            {/* Employer Label */}

            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 sm:text-sm">
              Are you an employer?
            </span>


            {/* Strong Employer Button */}

            <Link
              href="/employer/login"
              className="
                group
                relative
                flex
                h-14
                w-full
                items-center
                justify-center
                overflow-hidden
                rounded-2xl
                bg-white
                px-5
                text-sm
                font-bold
                text-zinc-900

                shadow-[0_8px_30px_-15px_rgba(0,0,0,0.25)]

                ring-1
                ring-zinc-200

                transition-all
                duration-300

                hover:-translate-y-1
                hover:ring-blue-500
                hover:shadow-[0_12px_35px_-12px_rgba(37,99,235,0.35)]

                dark:bg-[#080808]
                dark:text-white
                dark:ring-white/10

                dark:hover:ring-blue-500/70
                dark:hover:bg-white/[0.04]

                sm:w-auto
              "
            >

              {/* Subtle Gradient Hover Background */}

              <span
                className="
                  absolute
                  inset-0
                  -translate-x-full
                  bg-gradient-to-r
                  from-blue-500/10
                  via-violet-500/10
                  to-emerald-500/10

                  transition-transform
                  duration-500

                  group-hover:translate-x-0
                "
              />


              {/* Button Content */}

              <span className="relative z-10 flex items-center gap-3">

                {/* Briefcase */}

                <span
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-lg
                    bg-blue-50
                    text-blue-600

                    transition-all
                    duration-300

                    group-hover:bg-blue-600
                    group-hover:text-white

                    dark:bg-blue-500/10
                    dark:text-blue-400

                    dark:group-hover:bg-blue-500
                    dark:group-hover:text-white
                  "
                >
                  <Briefcase
                    size={16}
                    strokeWidth={2}
                  />
                </span>


                {/* Text */}

                <span>
                  Hire Talent
                </span>


                {/* Arrow */}

                <span
                  className="
                    flex
                    h-7
                    w-7
                    items-center
                    justify-center
                    rounded-full
                    bg-zinc-100
                    text-zinc-600

                    transition-all
                    duration-300

                    group-hover:translate-x-1
                    group-hover:bg-blue-600
                    group-hover:text-white

                    dark:bg-white/10
                    dark:text-zinc-300

                    dark:group-hover:bg-blue-500
                    dark:group-hover:text-white
                  "
                >
                  <ArrowRight
                    size={14}
                    strokeWidth={2.5}
                  />
                </span>

              </span>

            </Link>

          </div>

        </div>


        {/* =========================================
            METRICS GRID
        ========================================= */}

        <div className="mt-20 grid grid-cols-2 gap-4 border-t border-zinc-200 pt-10 dark:border-white/10 sm:grid-cols-4 sm:gap-8 md:gap-12 lg:gap-20">


          {/* =====================================
              CANDIDATES
          ===================================== */}

          <div className="flex flex-col items-center gap-2">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
              <Users
                size={24}
                strokeWidth={1.5}
              />
            </div>

            <h3 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">
              10k+
            </h3>

            <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              Candidates
            </p>

          </div>


          {/* =====================================
              ENTERPRISES
          ===================================== */}

          <div className="flex flex-col items-center gap-2">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-600 dark:bg-violet-900/20 dark:text-violet-400">
              <Globe
                size={24}
                strokeWidth={1.5}
              />
            </div>

            <h3 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">
              500+
            </h3>

            <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              Enterprises
            </p>

          </div>


          {/* =====================================
              USER RATING
          ===================================== */}

          <div className="flex flex-col items-center gap-2">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400">
              <Star
                size={24}
                strokeWidth={1.5}
              />
            </div>

            <h3 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">
              4.9
            </h3>

            <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              User Rating
            </p>

          </div>


          {/* =====================================
              PLACEMENT RATE
          ===================================== */}

          <div className="flex flex-col items-center gap-2">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400">
              <Briefcase
                size={24}
                strokeWidth={1.5}
              />
            </div>

            <h3 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">
              95%
            </h3>

            <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              Placement Rate
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}