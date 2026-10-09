"use client";

import { Menu } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  onMenuClick: () => void;
};

export default function AdminNavbar({
  onMenuClick,
}: Props) {
  const router = useRouter();

  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "{}")
      : {};

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200/50 bg-white/80 backdrop-blur-xl shadow-sm lg:ml-64 dark:border-white/10 dark:bg-[#030303]/80">

      <div className="flex h-16 items-center justify-between px-4 md:px-6">

        {/* Left */}

        <div className="flex items-center gap-3">

          <button
            onClick={onMenuClick}
            className="rounded-lg p-2 hover:bg-zinc-100 lg:hidden"
          >
            <Menu size={24} />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-zinc-200 shadow-sm dark:border-zinc-800 lg:hidden">
              <img
                src="/sant-nirankari-enterprise-logo.png"
                alt="Sant Nirankari Enterprise Logo"
                className="h-full w-full object-cover"
              />
            </div>
            <h1 className="bg-gradient-to-r from-blue-600 via-violet-600 to-emerald-500 bg-clip-text text-lg font-extrabold text-transparent sm:text-xl lg:hidden">
              Sant Nirankari
            </h1>
            <h1 className="hidden bg-gradient-to-r from-zinc-800 to-zinc-500 bg-clip-text text-xl font-bold tracking-tight text-transparent lg:block dark:from-white dark:to-zinc-400">
              Admin Dashboard
            </h1>
          </div>

        </div>

        {/* Right */}

        <div className="flex items-center gap-3">

          <div className="hidden text-right md:block">
            <p className="text-sm font-bold text-zinc-900 dark:text-white">
              {user.fullName || "Admin"}
            </p>
            <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
              {user.role || "Admin"}
            </p>
          </div>

          <button
            onClick={logout}
            className="flex items-center gap-2 rounded-xl bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100 hover:text-red-700 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20"
          >
            Logout
          </button>

        </div>

      </div>

    </header>
  );
}