type SectionCardProps = {
  title?: string;
  description?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

export function SectionCard({ title, description, children, className = "" }: SectionCardProps) {
  return (
    <section className={`rounded-3xl border border-white/60 dark:border-slate-800/50 bg-white/70 dark:bg-slate-900/70 p-6 sm:p-8 shadow-[0_8px_30px_rgb(255,150,0,0.06)] backdrop-blur-xl ${className}`}>
      {title || description ? (
        <div className="mb-6 border-b border-zinc-200/50 dark:border-zinc-800/50 pb-4">
          {title ? <h2 className="text-xl font-bold text-zinc-900 dark:text-white">{title}</h2> : null}
          {description ? <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{description}</p> : null}
        </div>
      ) : null}
      {children}
    </section>
  );
}
