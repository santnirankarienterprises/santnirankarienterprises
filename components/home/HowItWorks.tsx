import { StepCard } from "@/components/step-card";
import { Sparkles } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Create Your Account",
    description:
      "Register with your basic details and create your candidate account in just a few simple steps.",
  },
  {
    step: "02",
    title: "Build Your Profile",
    description:
      "Add your education, skills, experience and career preferences to create a strong candidate profile.",
  },
  {
    step: "03",
    title: "Explore Opportunities",
    description:
      "Discover career opportunities and explore roles that match your profile, skills and preferred location.",
  },
  {
    step: "04",
    title: "Take The Next Step",
    description:
      "Stay prepared, follow the recruitment process and move forward toward your next career opportunity.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-white py-16 sm:py-24 lg:py-32 dark:bg-[#030303]"
    >
      {/* Background Decor */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-blue-600/5 blur-[100px] dark:bg-blue-600/10" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            <Sparkles size={14} />
            <span>Simple Process</span>
          </div>

          <h2 className="mt-4 text-3xl font-serif font-bold tracking-tight text-black sm:text-4xl lg:text-5xl dark:text-white">
            Your journey <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-violet-600 to-emerald-500">starts here.</span>
          </h2>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
            From registration to exploring career opportunities, we keep the
            process simple, clear and focused on your career.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {steps.map((item) => (
            <div key={item.step} className="flex h-full">
              <StepCard
                step={item.step}
                title={item.title}
                description={item.description}
              />
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mx-auto mt-12 max-w-2xl text-center sm:mt-16">
          <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            A straightforward candidate-first process designed to help you
            present yourself professionally and discover your next opportunity.
          </p>
        </div>
      </div>
    </section>
  );
}