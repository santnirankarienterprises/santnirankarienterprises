"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  Building2,
  Zap,
} from "lucide-react";

function AdminSidebarContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const logout = async () => {
    try {
      await fetch("/api/logout", {
        method: "POST",
      });

      localStorage.removeItem("user");
      localStorage.removeItem("userId");

      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  const menus = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Paid Candidates",
      href: "/admin/candidates?type=paid",
      icon: Users, // You can use a different icon like 'Crown' if imported
    },
    {
      name: "Unpaid Candidates",
      href: "/admin/candidates?type=unpaid",
      icon: Users,
    },
    {
      name: "Fast Applicants",
      href: "/admin/fast-applicants",
      icon: Zap,
    },
    {
      name: "Employers",
      href: "/admin/employers",
      icon: Building2,
    },
    {
      name: "Employer Demands",
      href: "/admin/employer-requirements",
      icon: Users,
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ];

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 border-r bg-white shadow-sm lg:flex lg:flex-col">

      {/* Logo */}
      <div className="border-b border-zinc-200/50 bg-white/50 px-6 py-5 backdrop-blur-xl dark:border-white/10 dark:bg-[#030303]/50">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-zinc-200 shadow-sm dark:border-zinc-800">
            <img
              src="/sant-nirankari-enterprise-logo.png"
              alt="Sant Nirankari Enterprise Official Logo"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <h1 className="truncate bg-gradient-to-r from-blue-600 via-violet-600 to-emerald-500 bg-clip-text font-serif text-[18px] font-extrabold leading-none tracking-[-0.035em] text-transparent">
              Sant Nirankari
            </h1>
            <p className="mt-1 bg-gradient-to-r from-blue-500 via-violet-500 to-emerald-500 bg-clip-text text-[8px] font-bold uppercase leading-none tracking-[0.42em] text-transparent">
              Enterprise
            </p>
          </div>
        </Link>
      </div>

      {/* Menu */}

      <nav className="flex-1 space-y-2 overflow-y-auto p-4">

        {menus.map((menu) => {
          const Icon = menu.icon;

          const typeParam = searchParams.get("type");
          let currentHref = pathname;
          if (typeParam) currentHref += `?type=${typeParam}`;
          
          const active = currentHref === menu.href;

          return (
            <Link
              key={menu.href}
              href={menu.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-[14px] font-semibold transition-all duration-200 ${
                active
                  ? "bg-gradient-to-r from-blue-500/10 via-violet-500/10 to-emerald-500/10 text-blue-700 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] ring-1 ring-inset ring-blue-500/20"
                  : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
              }`}
            >
              <Icon size={18} className={active ? "text-blue-600" : "text-zinc-400"} />
              <span>{menu.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}

      <div className="border-t p-4">

        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-medium text-red-600 transition hover:bg-red-50"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>

      </div>

    </aside>
  );
}

export default function AdminSidebar() {
  return (
    <Suspense fallback={<aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 border-r bg-white shadow-sm lg:flex lg:flex-col"></aside>}>
      <AdminSidebarContent />
    </Suspense>
  );
}