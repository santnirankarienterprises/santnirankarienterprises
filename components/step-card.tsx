type StepCardProps = {
  step: string;
  title: string;
  description: string;
};

export function StepCard({ step, title, description }: StepCardProps) {
  return (
    <div className="group relative flex h-full w-full flex-col rounded-2xl p-[2px] bg-gradient-to-r from-blue-700 via-violet-700 to-emerald-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_-12px_rgba(37,99,235,0.4)]">
      <div
        className="
          relative
          flex
          h-full
          flex-col
          overflow-hidden
          rounded-[14px]
          bg-white
          p-6
          dark:bg-[#030303]
        "
      >
      {/* Step Number */}
      <div
        className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-xl
          bg-blue-50
          text-base
          font-bold
          text-blue-600
          transition-colors
          group-hover:bg-blue-600
          group-hover:text-white
          dark:bg-blue-500/10
          dark:text-blue-400
          dark:group-hover:bg-blue-600
          dark:group-hover:text-white
        "
      >
        {step}
      </div>

      {/* Title */}
      <h3
        className="
          mt-6
          text-lg
          font-semibold
          text-zinc-900
          dark:text-white
        "
      >
        {title}
      </h3>

      {/* Description */}
      <p
        className="
          mt-3
          text-sm
          leading-relaxed
          text-zinc-500
          dark:text-zinc-400
        "
      >
        {description}
      </p>
    </div>
    </div>
  );
}