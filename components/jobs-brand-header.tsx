import Link from "next/link";

export function JobsBrandHeader() {
  return <header className="border-b border-zinc-200 bg-white/95 backdrop-blur dark:border-white/10 dark:bg-[#030303]/95"><div className="mx-auto flex h-24 max-w-7xl items-center px-4 sm:px-6"><Link href="/" className="flex items-center gap-4"><img src="/sant-nirankari-enterprise-logo.png" alt="Sant Nirankari Enterprise" className="h-14 w-14 rounded-full border object-cover shadow-sm"/><div><p className="bg-gradient-to-r from-blue-600 via-violet-600 to-emerald-500 bg-clip-text font-serif text-2xl font-extrabold tracking-tight text-transparent sm:text-3xl">Sant Nirankari</p><p className="mt-0.5 bg-gradient-to-r from-blue-500 via-violet-500 to-emerald-500 bg-clip-text text-[10px] font-bold uppercase tracking-[0.42em] text-transparent">Enterprise</p></div></Link></div></header>;
}
