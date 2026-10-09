"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { UserCircle2, Menu, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ChevronDown } from "lucide-react";

export function DashboardNav() {
  const router = useRouter();
  const pathname = usePathname();
  const [name, setName] = useState("Candidate");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (user.fullName) {
      setName(user.fullName);
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    router.replace("/login");
  };

  return (
    <header className="fixed inset-x-0 top-0 z-[100] px-3 pt-3 sm:px-5">
      <div className="relative mx-auto w-full max-w-7xl rounded-2xl bg-gradient-to-r from-blue-500/50 via-violet-500/50 to-emerald-500/50 p-[1px] shadow-[0_10px_40px_-20px_rgba(59,130,246,0.35)]">
        <nav className="relative flex h-[68px] items-center justify-between gap-3 rounded-[15px] bg-white/95 px-3 backdrop-blur-2xl transition-all duration-300 sm:px-5 dark:bg-[#030303]/95">
          {/* Logo */}
          <Link
            href="/candidate/dashboard"
            className="group flex min-w-0 shrink items-center gap-2.5 sm:gap-3"
          >
            <div className="relative h-10 w-10 sm:h-12 sm:w-12 shrink-0 overflow-hidden rounded-full border-2 border-white shadow-sm dark:border-zinc-800">
              <img
                src="/sant-nirankari-enterprise-logo.png"
                alt="Sant Nirankari Enterprise Official Logo"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="truncate bg-gradient-to-r from-blue-600 via-violet-600 to-emerald-500 bg-clip-text font-serif text-[19px] font-extrabold leading-none tracking-[-0.035em] text-transparent sm:text-[23px]">
                Sant Nirankari
              </p>
              <p className="mt-1 bg-gradient-to-r from-blue-500 via-violet-500 to-emerald-500 bg-clip-text text-[7px] font-bold uppercase leading-none tracking-[0.42em] text-transparent sm:text-[8px]">
                Enterprise
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden items-center gap-6 md:flex">
            <Link
              href="/candidate/dashboard"
              className={`text-sm ${
                pathname === "/candidate/dashboard"
                  ? "bg-gradient-to-r from-blue-600 via-violet-600 to-emerald-500 bg-clip-text text-transparent font-bold"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
              }`}
            >
              Dashboard
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-xl border border-zinc-200/70 dark:border-white/10 bg-zinc-50/80 dark:bg-white/[0.03] px-3 py-1.5 hover:bg-white dark:hover:bg-white/10 transition-all">
                  <UserCircle2 size={24} className="text-zinc-600 dark:text-zinc-300" />
                  <div className="text-left hidden sm:block">
                    <p className="text-xs font-semibold text-zinc-900 dark:text-white leading-tight">
                      {name}
                    </p>
                    <p className="text-[10px] text-zinc-500 dark:text-zinc-400 leading-tight">
                      Candidate
                    </p>
                  </div>
                  <ChevronDown size={14} className="text-zinc-500 ml-1" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 rounded-xl border border-zinc-200 dark:border-white/10 bg-white/95 dark:bg-[#030303]/95 backdrop-blur-xl">
                <DropdownMenuItem
                  onClick={logout}
                  className="text-red-600 focus:bg-red-50 focus:text-red-700 dark:focus:bg-red-500/10 cursor-pointer font-medium"
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex shrink-0 items-center gap-1.5 md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-900 transition-all duration-200 active:scale-95 dark:border-white/10 dark:bg-white/5 dark:text-white">
                  <Menu size={19} strokeWidth={1.8} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 rounded-xl border border-zinc-200 dark:border-white/10 bg-white/95 dark:bg-[#030303]/95 backdrop-blur-xl p-2">
                <DropdownMenuItem asChild className="rounded-lg mb-1">
                  <Link href="/candidate/dashboard" className="font-medium cursor-pointer">
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <div className="h-px bg-zinc-200 dark:bg-white/10 my-1" />
                <DropdownMenuItem
                  onClick={logout}
                  className="text-red-600 focus:bg-red-50 focus:text-red-700 dark:focus:bg-red-500/10 cursor-pointer font-medium rounded-lg"
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>
      </div>
    </header>
  );
}