import Link from "next/link";
import Image from "next/image";

export function Logo() {
  return (
    <Link
      href="/"
      aria-label="Sant Nirankari Enterprise - Home"
      className="group flex items-center gap-3"
    >
      <div className="hidden sm:block">
        <div className="leading-none">
          <p className="text-[13px] font-bold tracking-[0.18em] text-zinc-950 dark:text-white">
            SANT NIRANKARI
          </p>

          <p className="mt-1 text-[9px] font-medium uppercase tracking-[0.24em] text-zinc-500 dark:text-zinc-400">
            Multi Service
          </p>
        </div>
      </div>
    </Link>
  );
}