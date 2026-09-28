import { ArrowUpRight, MapPin, Briefcase } from "lucide-react";

type JobCardProps = {
  company: string;
  location: string;
  type: string;
};

export function JobCard({
  company,
  location,
  type,
}: JobCardProps) {
  return (
    <div className="group relative h-full rounded-2xl p-[2px] bg-gradient-to-r from-blue-700 via-violet-700 to-emerald-600 transition-all duration-300 hover:shadow-[0_8px_30px_-12px_rgba(37,99,235,0.4)]">
      <article
        className="
          relative
          flex
          h-full
          flex-col
          overflow-hidden
          rounded-[15px]
          bg-white
          p-4
          dark:bg-zinc-950
          sm:p-5
        "
      >
        <div className="flex flex-1 flex-col">
          {/* Company Logo/Initial */}
          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-zinc-100
              text-lg
              font-semibold
              text-zinc-600
              transition-colors
              group-hover:bg-blue-50
              group-hover:text-blue-600
              dark:bg-white/10
              dark:text-zinc-300
              dark:group-hover:bg-blue-500/20
              dark:group-hover:text-blue-400
              sm:h-12
              sm:w-12
            "
          >
            {company.charAt(0)}
          </div>

          {/* Company Name */}
          <h3
            className="
              mt-4
              line-clamp-2
              text-sm
              font-semibold
              leading-tight
              text-zinc-900
              dark:text-white
              sm:text-base
            "
          >
            {company}
          </h3>

          {/* Details (Location & Type) */}
          <div className="mt-4 flex flex-col gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400 sm:mt-5">
            <div className="flex items-center gap-1.5">
              <MapPin size={14} className="shrink-0" />
              <span className="truncate">{location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Briefcase size={14} className="shrink-0" />
              <span className="truncate">{type}</span>
            </div>
          </div>
        </div>

        {/* Action / View */}
        <div className="mt-6 flex items-center justify-between border-t border-zinc-100 pt-4 dark:border-white/5">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-violet-600 to-emerald-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Apply Now
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-50 text-zinc-400 transition-colors group-hover:bg-blue-50 group-hover:text-blue-600 dark:bg-white/5 dark:text-zinc-500 dark:group-hover:bg-blue-500/20 dark:group-hover:text-blue-400">
            <ArrowUpRight size={16} />
          </span>
        </div>
      </article>
    </div>
  );
}