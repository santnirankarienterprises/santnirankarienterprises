type InfoCardProps = {
  label: string;
  value: string;
};

export function InfoCard({ label, value }: InfoCardProps) {
  return (
    <div className="rounded-2xl border border-white/60 dark:border-slate-800/50 bg-white/50 dark:bg-slate-900/50 p-5 backdrop-blur-md shadow-sm transition hover:bg-white/70 dark:hover:bg-slate-800/70">
      <p className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">{label}</p>
      <p className="mt-2 text-lg font-bold text-zinc-900 dark:text-white">{value}</p>
    </div>
  );
}
