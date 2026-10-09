"use client";

import { useRouter } from "next/navigation";

export function EmployerQuickActions() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear();
    router.replace("/employer/login");
  };

  return (
    <div className="flex flex-col gap-3">
      <a 
        href="/"
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white py-3 text-sm font-semibold text-zinc-700 shadow-sm transition-all hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
      >
        Back to Home
      </a>
      <button 
        onClick={handleLogout}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}
