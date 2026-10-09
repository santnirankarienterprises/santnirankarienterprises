// components/site-footer.tsx

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const links = [
  ["Home", "/#home"],
  ["About", "/#how-it-works"],
  ["Companies", "/#companies"],
  ["Fees", "/#register"],
  ["Stories", "/#stories"],
  ["Contact", "/#contact"],
  ["Register", "/register"],
  ["Login", "/login"],
];

const InstagramIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export function SiteFooter() {
  return (
    <footer className="border-t border-white/20 bg-black text-white dark:border-black/20 dark:bg-white dark:text-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="grid gap-8 py-8 sm:grid-cols-2 lg:grid-cols-3 lg:py-10">

          {/* Brand */}
          <div>
            <Link href="/" className="group inline-flex items-center gap-3">
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-white/20 shadow-sm dark:border-black/20">
                <Image
                  src="/sant-nirankari-enterprise-logo.png"
                  alt="Sant Nirankari Enterprise Official Logo"
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="bg-gradient-to-r from-blue-500 via-violet-500 to-emerald-500 bg-clip-text text-base font-extrabold uppercase tracking-[0.1em] text-transparent">
                  Sant Nirankari
                </p>

                <p className="mt-1 bg-gradient-to-r from-blue-500 via-violet-500 to-emerald-500 bg-clip-text text-[8px] font-bold uppercase tracking-[0.3em] text-transparent">
                  Enterprise
                </p>
              </div>
            </Link>

            <p className="mt-3 max-w-sm text-xs leading-5 text-zinc-300 dark:text-zinc-700">
              Connecting ambitious candidates with meaningful career opportunities through a professional and streamlined recruitment experience.
            </p>

            <Link href="/register" className="group mt-4 inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-xs font-bold text-black transition-all hover:-translate-y-0.5 hover:bg-zinc-200 dark:bg-black dark:text-white dark:hover:bg-zinc-800">
              Build Your Profile
              <ArrowUpRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-600">
              Explore
            </h3>

            <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2">
              {links.map(([label, href]) => (
                <Link key={href} href={href} className="group flex items-center gap-1 text-xs text-zinc-200 transition hover:text-white dark:text-zinc-800 dark:hover:text-black">
                  {label}
                  <ArrowUpRight size={10} className="opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-600">
              Follow Us
            </h3>

            <p className="mt-3 max-w-xs text-xs leading-5 text-zinc-300 dark:text-zinc-700">
              Stay connected with Sant Nirankari Enterprise for updates, opportunities, and recruitment announcements.
            </p>

            <div className="mt-4 flex gap-3">
              <a href="https://www.instagram.com/santnirankarienterprise?stkn=MTh2aXo3Z2R2aWhlbw%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Sant Nirankari Enterprise Instagram" className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 text-[#E4405F] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#E4405F]/50 hover:bg-[#E4405F]/10 dark:border-black/15">
                <InstagramIcon size={16} />
              </a>

              <a href="https://www.facebook.com/share/1Dbw2Y7CJj/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Sant Nirankari Enterprise Facebook" className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 text-[#1877F2] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1877F2]/50 hover:bg-[#1877F2]/10 dark:border-black/15">
                <FacebookIcon size={16} />
              </a>
            </div>

            <div className="mt-5 h-px w-20 bg-gradient-to-r from-blue-500 via-violet-500 to-emerald-500" />
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-3 border-t border-white/20 py-4 text-[10px] text-zinc-400 dark:border-black/20 dark:text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Sant Nirankari Enterprise. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-3">
            <Link href="/terms" className="rounded-md border border-white/40 px-2.5 py-1 font-semibold text-white transition hover:bg-white hover:text-black dark:border-black/30 dark:text-black dark:hover:bg-black dark:hover:text-white">
              Terms & Conditions
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}