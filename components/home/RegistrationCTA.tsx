import Link from "next/link";
import { Sparkles, Check, ArrowRight } from "lucide-react";

export default function RegistrationCTA() {
  return (
    <section
      id="register"
      className="relative overflow-hidden bg-white py-16 dark:bg-[#030303] sm:py-20 lg:py-24"
    >
      {/* Background Decor */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute left-1/4 top-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[120px] dark:bg-blue-600/10" />

        <div className="absolute bottom-0 right-1/4 h-[500px] w-[500px] translate-x-1/2 translate-y-1/2 rounded-full bg-violet-600/10 blur-[120px] dark:bg-violet-600/10" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        {/* Main Card Wrapper */}
        <div className="group relative rounded-3xl bg-gradient-to-r from-blue-700 via-violet-700 to-emerald-600 p-[2px] shadow-2xl transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(59,130,246,0.3)]">

          <div className="overflow-hidden rounded-[22px] bg-white p-8 dark:bg-[#080808] sm:p-12 lg:p-16">

            {/* Top Label */}
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              <Sparkles size={14} />
              <span>Take the Next Career Step</span>
            </div>


            {/* Main Heading */}
            <div className="mt-6">

              <h2 className="max-w-3xl text-3xl font-serif font-bold leading-tight tracking-tight text-black sm:text-4xl lg:text-5xl dark:text-white">

                Discover your next career opportunity
                <br className="hidden sm:block" />

                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-violet-600 to-emerald-500">
                  with a single profile.
                </span>

              </h2>

              <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                Build your candidate profile with Sant Nirankari Enterprise
                and stay connected with suitable employment opportunities
                based on your skills, interests and preferred locations.
              </p>

            </div>


            {/* Fee + Value */}
            <div className="mt-10 grid gap-6 sm:mt-12 sm:grid-cols-[auto_1fr] sm:items-stretch">

              {/* Fee Card */}
              <div className="flex flex-col justify-center gap-4 rounded-2xl bg-gradient-to-br from-blue-600 via-violet-600 to-emerald-500 p-6 text-white shadow-lg sm:min-w-[240px]">

                <div>

                  <p className="text-[10px] font-bold uppercase tracking-widest text-blue-100">
                    Candidate Registration
                  </p>

                  <p className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
                    ₹399
                  </p>

                </div>

                <span className="inline-flex w-fit items-center rounded-full border border-white/10 bg-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-sm">
                  Single Payment
                </span>

              </div>


              {/* Value Proposition */}
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-white/10 dark:bg-white/[0.03] sm:p-8">

                <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                  Included With Registration
                </p>


                <div className="mt-5 flex items-start gap-4">

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-500/20">
                    <Check className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>


                  <div>

                    <h3 className="text-base font-bold text-black dark:text-white">
                      Candidate Access
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      Submit your preferred roles, locations, qualifications
                      and skills to create a profile that can be considered
                      for relevant recruitment opportunities.
                    </p>

                  </div>

                </div>

              </div>

            </div>


            {/* Key Benefits */}
            <div className="mt-10 border-t border-zinc-200 pt-8 dark:border-white/10">

              <div className="grid gap-6 sm:grid-cols-3">

                {/* Benefit 1 */}
                <div className="flex items-start gap-3">

                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-500/20">
                    <Check className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                  </div>

                  <div>

                    <p className="text-sm font-bold text-black dark:text-white">
                      Preferred Roles & Locations
                    </p>

                    <p className="mt-1 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                      Tell us about the positions and areas you are interested in.
                    </p>

                  </div>

                </div>


                {/* Benefit 2 */}
                <div className="flex items-start gap-3">

                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-500/20">
                    <Check className="h-3 w-3 text-violet-600 dark:text-violet-400" />
                  </div>

                  <div>

                    <p className="text-sm font-bold text-black dark:text-white">
                      Candidate Profile
                    </p>

                    <p className="mt-1 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                      Highlight your qualifications, abilities and previous experience.
                    </p>

                  </div>

                </div>


                {/* Benefit 3 */}
                <div className="flex items-start gap-3">

                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-500/20">
                    <Check className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                  </div>

                  <div>

                    <p className="text-sm font-bold text-black dark:text-white">
                      Recruitment Updates
                    </p>

                    <p className="mt-1 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                      Remain connected as suitable recruitment opportunities become available.
                    </p>

                  </div>

                </div>

              </div>

            </div>


            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">

              <Link
                href="/register"
                className="group inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-violet-600 to-emerald-500 px-8 text-sm font-bold text-white shadow-[0_8px_20px_-8px_rgba(37,99,235,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_25px_-8px_rgba(37,99,235,0.8)] sm:min-w-[200px] sm:flex-none"
              >
                Create Your Profile

                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>


              <Link
                href="/login"
                className="inline-flex min-h-12 flex-1 items-center justify-center rounded-xl border-2 border-zinc-200 bg-transparent px-8 text-sm font-bold text-zinc-900 transition-all duration-300 hover:border-zinc-900 hover:bg-zinc-50 dark:border-zinc-800 dark:text-white dark:hover:border-white dark:hover:bg-white/5 sm:min-w-[200px] sm:flex-none"
              >
                Sign In to Your Account
              </Link>

            </div>

          </div>

        </div>


        {/* Bottom Note */}
        <p className="mt-8 text-center text-[10px] font-bold leading-relaxed text-zinc-500 sm:text-xs dark:text-zinc-400">
          * The ₹399 candidate registration charge is non-refundable.
          Registration only creates your candidate profile and does not
          constitute a promise of employment or selection for any specific role.
        </p>

      </div>
    </section>
  );
}