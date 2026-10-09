"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type MouseEvent } from "react";
import { ArrowRight, Building2, LogIn, LogOut, Menu, Moon, Sun, UserRound, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/#home", section: "home" },
  { label: "About", href: "/#how-it-works", section: "how-it-works" },
  { label: "Companies", href: "/#companies", section: "companies" },
  { label: "Fees", href: "/#register", section: "register" },
  { label: "Stories", href: "/#stories", section: "stories" },
  { label: "Contact", href: "/#contact", section: "contact" },
];

export function SiteNavbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [user, setUser] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  /* Theme */
  useEffect(() => {
    setMounted(true);

    const storedTheme = localStorage.getItem("theme");
    const dark = storedTheme === "dark";

    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
    setIsDark(dark);
  }, []);

  const toggleTheme = () => {
    const dark = !isDark;

    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
    localStorage.setItem("theme", dark ? "dark" : "light");
    setIsDark(dark);
  };

  /* User / Auth */
  useEffect(() => {
    const loadUser = () => {
      try {
        const stored = localStorage.getItem("user");
        setUser(stored ? JSON.parse(stored) : null);
      } catch {
        setUser(null);
      }
    };

    loadUser();
    window.addEventListener("storage", loadUser);
    window.addEventListener("focus", loadUser);

    return () => {
      window.removeEventListener("storage", loadUser);
      window.removeEventListener("focus", loadUser);
    };
  }, [pathname]);

  /* Active sections */
  useEffect(() => {
    if (pathname !== "/") return;

    const sectionIds = ["home", "how-it-works", "companies", "register", "stories", "contact"];

    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;

      let currentSection = "home";

      sections.forEach((section) => {
        if (scrollPosition >= section.offsetTop) {
          currentSection = section.id;
        }
      });

      setActiveSection(currentSection);
    };

    updateActiveSection();

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0, 0.1, 0.25, 0.5, 0.75] }
    );

    sections.forEach((section) => observer.observe(section));

    window.addEventListener("scroll", updateActiveSection, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateActiveSection);
    };
  }, [pathname]);

  /* Close mobile menu on route change */
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  /* Lock body while mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  /* Navigation */
  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    const [path, hash] = href.split("#");

    if (path === "/" && hash && pathname === "/") {
      event.preventDefault();

      setActiveSection(hash);

      const target = document.getElementById(hash);

      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      setIsMobileMenuOpen(false);
      return;
    }

    setIsMobileMenuOpen(false);
  };

  /* Logout */
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    setUser(null);
    setIsMobileMenuOpen(false);
    router.push("/");
    router.refresh();
  };

  const dashboardHref =
    user?.role === "admin"
      ? "/admin"
      : user?.role === "employer"
        ? "/employer/dashboard"
        : "/candidate/dashboard";

  const themeButton = mounted ? (
    <button type="button" onClick={toggleTheme} aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"} title={isDark ? "Switch to light mode" : "Switch to dark mode"} className="group relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-zinc-200 bg-white text-zinc-600 transition-all duration-200 hover:border-violet-300 hover:text-zinc-950 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300 dark:hover:border-violet-500/40 dark:hover:text-white">
      <span className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-violet-500/10 to-emerald-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
      {isDark ? <Sun size={16} strokeWidth={1.8} className="relative" /> : <Moon size={16} strokeWidth={1.8} className="relative" />}
    </button>
  ) : null;

  return (
    <>
      {/* Navbar */}
      <header className="fixed inset-x-0 top-0 z-[100] px-3 pt-3 sm:px-5">
        <div className="relative mx-auto w-full max-w-7xl rounded-2xl bg-gradient-to-r from-blue-500/50 via-violet-500/50 to-emerald-500/50 p-[1px] shadow-[0_10px_40px_-20px_rgba(59,130,246,0.35)]">
          <nav className="relative flex h-[68px] items-center justify-between gap-3 rounded-[15px] bg-white/95 px-3 backdrop-blur-2xl transition-all duration-300 sm:px-5 dark:bg-[#030303]/95">

            {/* Brand */}
            <Link href="/" aria-label="Sant Nirankari Enterprise - Home" onClick={() => setIsMobileMenuOpen(false)} className="group flex min-w-0 shrink items-center gap-2.5 sm:gap-3">
              <div className="relative h-10 w-10 sm:h-12 sm:w-12 shrink-0 overflow-hidden rounded-full border-2 border-white shadow-sm dark:border-zinc-800">
                <Image
                  src="/sant-nirankari-enterprise-logo.png"
                  alt="Sant Nirankari Enterprise Official Logo"
                  fill
                  sizes="(max-width: 640px) 40px, 48px"
                  className="object-cover"
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

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-1 rounded-2xl border border-zinc-200/70 bg-zinc-50/80 p-1 dark:border-white/5 dark:bg-white/[0.03] lg:flex">
              {navLinks.map((link) => {
                const active = pathname === "/" && activeSection === link.section;

                return (
                  <Link key={link.href} href={link.href} onClick={(event) => handleNavClick(event, link.href)} className={`relative rounded-xl px-3 py-2 text-[13px] font-semibold transition-all duration-300 xl:px-3.5 xl:text-sm ${active ? "bg-gradient-to-r from-blue-600 via-violet-600 to-emerald-500 text-white shadow-[0_6px_18px_-8px_rgba(79,70,229,0.7)]" : "text-zinc-500 hover:bg-white hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-white"}`}>
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Desktop Actions */}
            <div className="hidden items-center gap-1.5 lg:flex">
              {themeButton}

              {user ? (
                <>
                  <Link href={dashboardHref} className="ml-1 inline-flex h-9 items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3.5 text-xs font-semibold text-zinc-800 transition-all hover:border-violet-300 hover:bg-zinc-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-violet-500/40 dark:hover:bg-white/10">
                    <UserRound size={14} />
                    Dashboard
                  </Link>

                  <button type="button" onClick={handleLogout} className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-zinc-950 px-3.5 text-xs font-semibold text-white transition-all hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200">
                    <LogOut size={14} />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/employer/login" className="ml-1 inline-flex h-9 items-center gap-1.5 rounded-xl px-3 text-xs font-semibold text-zinc-700 transition-all hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-white/5 dark:hover:text-white">
                    <Building2 size={14} />
                    Employer
                  </Link>

                  <Link href="/login" className="inline-flex h-9 items-center gap-1.5 rounded-xl px-3 text-xs font-semibold text-zinc-700 transition-all hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-white/5 dark:hover:text-white">
                    <LogIn size={14} />
                    Login
                  </Link>

                  <Link href="/register" className="group relative inline-flex h-9 items-center gap-1.5 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-violet-600 to-emerald-500 px-4 text-xs font-semibold text-white shadow-[0_7px_20px_-9px_rgba(79,70,229,0.8)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_25px_-8px_rgba(79,70,229,0.9)]">
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                    <span className="relative">Register</span>
                    <ArrowRight size={14} className="relative transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Controls */}
            <div className="flex shrink-0 items-center gap-1.5 lg:hidden">
              {themeButton}

              <button type="button" onClick={() => setIsMobileMenuOpen((current) => !current)} aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={isMobileMenuOpen} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-900 transition-all duration-200 active:scale-95 dark:border-white/10 dark:bg-white/5 dark:text-white">
                {isMobileMenuOpen ? <X size={19} strokeWidth={1.8} /> : <Menu size={19} strokeWidth={1.8} />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          <button type="button" aria-label="Close navigation menu" onClick={() => setIsMobileMenuOpen(false)} className="fixed inset-0 z-[90] bg-zinc-950/20 backdrop-blur-[2px] lg:hidden dark:bg-black/40" />

          <div className="fixed left-3 right-3 top-[92px] z-[110] origin-top animate-in fade-in zoom-in-95 duration-200 lg:hidden">
            <div className="overflow-hidden rounded-2xl border border-zinc-200/80 bg-white p-2 shadow-[0_25px_70px_-25px_rgba(15,23,42,0.4)] dark:border-white/10 dark:bg-zinc-950 dark:shadow-black/50">

              {/* Mobile Brand */}
              <div className="mb-2 flex items-center gap-3 rounded-xl bg-gradient-to-r from-blue-500/10 via-violet-500/10 to-emerald-500/10 px-3 py-3 dark:from-blue-500/10 dark:via-violet-500/10 dark:to-emerald-500/10">

                <div>
                  <p className="bg-gradient-to-r from-blue-600 via-violet-600 to-emerald-500 bg-clip-text text-sm font-extrabold text-transparent">Sant Nirankari</p>
                  <p className="bg-gradient-to-r from-blue-500 via-violet-500 to-emerald-500 bg-clip-text text-[7px] font-bold uppercase tracking-[0.35em] text-transparent">Enterprise</p>
                </div>
              </div>

              {/* Links */}
              <div className="space-y-1">
                {navLinks.map((link) => {
                  const active = pathname === "/" && activeSection === link.section;

                  return (
                    <Link key={link.href} href={link.href} onClick={(event) => handleNavClick(event, link.href)} className={`flex min-h-11 items-center justify-between rounded-xl px-4 text-sm font-semibold transition-all ${active ? "bg-gradient-to-r from-blue-600 via-violet-600 to-emerald-500 text-white shadow-md" : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-white"}`}>
                      <span>{link.label}</span>
                      {active && <ArrowRight size={15} />}
                    </Link>
                  );
                })}
              </div>

              <div className="my-2 h-px bg-gradient-to-r from-transparent via-zinc-300 to-transparent dark:via-white/10" />

              {/* Mobile User Actions */}
              {user ? (
                <div className="grid grid-cols-2 gap-2">
                  <Link href={dashboardHref} onClick={() => setIsMobileMenuOpen(false)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-zinc-200 px-3 text-xs font-semibold text-zinc-800 dark:border-white/10 dark:text-white">
                    <UserRound size={15} />
                    Dashboard
                  </Link>

                  <button type="button" onClick={handleLogout} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-zinc-950 px-3 text-xs font-semibold text-white dark:bg-white dark:text-zinc-950">
                    <LogOut size={15} />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-2">
                  <Link href="/employer/login" onClick={() => setIsMobileMenuOpen(false)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-zinc-200 px-3 text-xs font-semibold text-zinc-800 dark:border-white/10 dark:text-white">
                    <Building2 size={15} />
                    Employer Portal
                  </Link>

                  <div className="grid grid-cols-2 gap-2">
                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-zinc-200 px-3 text-xs font-semibold text-zinc-800 dark:border-white/10 dark:text-white">
                      <LogIn size={15} />
                      Login
                    </Link>

                    <Link href="/register" onClick={() => setIsMobileMenuOpen(false)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-violet-600 to-emerald-500 px-3 text-xs font-semibold text-white shadow-md">
                      Register
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}