"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { 
  Search, Sun, Moon, Menu, X, GraduationCap,
  ChevronDown, ChevronRight, BookOpen, Lock
} from "lucide-react";
import { coursesData, isModuleUnlocked } from "@/data/courses";
import SearchModal from "./SearchModal";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Mobile accordion states
  const [mobileCourseOpen, setMobileCourseOpen] = useState(false);
  const [mobileSelectedCourse, setMobileSelectedCourse] = useState<string | null>(null);

  // Completed lessons tracker
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  // Hover state for mega menu on desktop
  const [activeCourseId, setActiveCourseId] = useState(coursesData[0]?.id || "laravel");

  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Avoid Hydration mismatch
  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("catatan_kader_progress");
      if (saved) {
        try {
          setCompletedLessons(JSON.parse(saved));
        } catch (e) {}
      }
    }
  }, []);

  // Handle keyboard shortcut Cmd+K or Ctrl+K
  const isModulePage = pathname && pathname.startsWith("/modules/");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isModulePage) return;
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModulePage]);

  // Close mobile menu and submenus on page change
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileCourseOpen(false);
    setMobileSelectedCourse(null);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isModulePage ? "hidden" : ""
        } ${
          scrolled
            ? "py-3 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md shadow-md border-b border-slate-200/50 dark:border-zinc-800/50"
            : "py-5 bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 flex justify-between items-center relative">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform duration-300">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg md:text-xl tracking-tight text-slate-900 dark:text-white leading-none">
                Catatan Kader
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono tracking-wider">
                DEV LEARNING ACADEMY
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8 font-semibold text-sm">
            <li>
              <Link
                href="/"
                className={`transition-colors relative py-1 ${
                  pathname === "/"
                    ? "text-brand-500 dark:text-brand-400"
                    : "text-slate-600 dark:text-slate-400 hover:text-brand-500 dark:hover:text-brand-400"
                }`}
              >
                Beranda
                {pathname === "/" && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-500 dark:bg-brand-400 rounded-full" />
                )}
              </Link>
            </li>

            {/* Course Nested Dropdown */}
            <li 
              className="relative group py-2"
              onMouseEnter={() => {
                if (typeof window !== "undefined") {
                  const saved = localStorage.getItem("catatan_kader_progress");
                  if (saved) {
                    try {
                      setCompletedLessons(JSON.parse(saved));
                    } catch (e) {}
                  }
                }
              }}
            >
              <button
                className={`flex items-center gap-1 transition-colors relative py-1 outline-none ${
                  pathname.startsWith("/modules")
                    ? "text-brand-500 dark:text-brand-400"
                    : "text-slate-600 dark:text-slate-400 hover:text-brand-500 dark:hover:text-brand-400"
                }`}
              >
                <span>Course</span>
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                {pathname.startsWith("/modules") && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-500 dark:bg-brand-400 rounded-full" />
                )}
              </button>

              {/* Main Course Dropdown Container (with hover bridge) */}
              <div className="opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[620px] z-50">
                <div className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 rounded-2xl shadow-xl p-4 flex gap-4">
                  
                  {/* Left Panel: Course List (Scrollable) */}
                  <div className="w-[260px] flex flex-col border-r border-slate-100 dark:border-zinc-800/80 pr-3 shrink-0">
                    <div className="px-2 pb-2 mb-2 border-b border-slate-150/40 dark:border-zinc-800/40">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-zinc-500">
                        Pilih Kelas ({coursesData.length})
                      </span>
                    </div>
                    
                    <div className="flex-1 max-h-[340px] overflow-y-auto space-y-0.5 scrollbar-none pr-1">
                      {coursesData.map((course) => {
                        const isHovered = activeCourseId === course.id;
                        const isCourseActive = pathname.includes(`/modules/${course.id}-`) || course.modules.some(m => pathname === `/modules/${m.slug}`);
                        
                        return (
                          <div
                            key={course.id}
                            onMouseEnter={() => setActiveCourseId(course.id)}
                            className={`flex items-center justify-between w-full px-3 py-2 rounded-xl text-left text-xs transition-colors cursor-pointer ${
                              isHovered
                                ? "bg-brand-500/10 text-brand-600 dark:text-brand-400 font-bold"
                                : isCourseActive
                                ? "bg-brand-500/5 text-brand-500 font-semibold"
                                : "text-slate-700 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-zinc-800/60 hover:text-brand-500"
                            }`}
                          >
                            <span className="truncate">{course.title}</span>
                            <ChevronRight className={`w-3.5 h-3.5 shrink-0 transition-transform ${isHovered ? "translate-x-0.5 text-brand-500" : "text-slate-400"}`} />
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Panel: Module list of the hovered Course */}
                  <div className="flex-1 flex flex-col min-w-0">
                    {(() => {
                      const selectedCourse = coursesData.find(c => c.id === activeCourseId) || coursesData[0];
                      if (!selectedCourse) return null;
                      
                      return (
                        <>
                          <div className="px-2 pb-2 mb-2 border-b border-slate-150/40 dark:border-zinc-800/40">
                            <span className="text-[9px] font-mono font-bold text-brand-500 block leading-none mb-1">DAFTAR MODUL</span>
                            <h4 className="text-xs font-black text-slate-800 dark:text-slate-200 truncate leading-none">
                              {selectedCourse.title}
                            </h4>
                          </div>
                          
                          <div className="flex-1 max-h-[340px] overflow-y-auto space-y-1 pr-1">
                            {selectedCourse.modules.length === 0 ? (
                              <p className="text-[11px] text-slate-400 dark:text-zinc-555 italic px-2 py-3">Belum ada modul di kelas ini.</p>
                            ) : (
                              selectedCourse.modules.map((mod) => {
                                const isModActive = pathname === `/modules/${mod.slug}`;
                                const isUnlocked = isModuleUnlocked(selectedCourse, mod.slug, completedLessons);
                                
                                if (!isUnlocked) {
                                  return (
                                    <div
                                      key={mod.slug}
                                      className="flex items-start gap-2.5 px-3 py-2 rounded-xl text-left text-slate-400 dark:text-zinc-650 opacity-60 cursor-not-allowed"
                                      title="Selesaikan modul sebelumnya untuk membuka materi ini."
                                    >
                                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 text-slate-400 dark:text-zinc-500 shrink-0 mt-0.5 flex items-center gap-0.5">
                                        <Lock className="w-2.5 h-2.5 shrink-0" /> {mod.moduleNumber}
                                      </span>
                                      <span className="text-[11px] leading-snug mt-0.5 truncate">{mod.title}</span>
                                    </div>
                                  );
                                }

                                return (
                                  <Link
                                    key={mod.slug}
                                    href={`/modules/${mod.slug}`}
                                    className={`flex items-start gap-2.5 px-3 py-2 rounded-xl text-left transition-colors ${
                                      isModActive
                                        ? "bg-brand-500/10 text-brand-500 font-bold"
                                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-zinc-800/40 hover:text-brand-500"
                                    }`}
                                  >
                                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 text-slate-500 shrink-0 mt-0.5">
                                      {mod.moduleNumber}
                                    </span>
                                    <span className="text-[11px] leading-snug mt-0.5 truncate">{mod.title}</span>
                                  </Link>
                                );
                              })
                            )}
                          </div>
                        </>
                      );
                    })()}
                  </div>

                </div>
              </div>
            </li>

            <li>
              <Link
                href="/about"
                className={`transition-colors relative py-1 ${
                  pathname === "/about"
                    ? "text-brand-500 dark:text-brand-400"
                    : "text-slate-600 dark:text-slate-400 hover:text-brand-500 dark:hover:text-brand-400"
                }`}
              >
                Tentang Saya
                {pathname === "/about" && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-500 dark:bg-brand-400 rounded-full" />
                )}
              </Link>
            </li>

            <li>
              <Link
                href="/tools"
                className={`transition-colors relative py-1 ${
                  pathname === "/tools"
                    ? "text-brand-500 dark:text-brand-400"
                    : "text-slate-600 dark:text-slate-400 hover:text-brand-500 dark:hover:text-brand-400"
                }`}
              >
                Referensi Tools
                {pathname === "/tools" && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-500 dark:bg-brand-400 rounded-full" />
                )}
              </Link>
            </li>

            <li>
              <Link
                href="/contact"
                className={`transition-colors relative py-1 ${
                  pathname === "/contact"
                    ? "text-brand-500 dark:text-brand-400"
                    : "text-slate-600 dark:text-slate-400 hover:text-brand-500 dark:hover:text-brand-400"
                }`}
              >
                Hubungi
                {pathname === "/contact" && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-500 dark:bg-brand-400 rounded-full" />
                )}
              </Link>
            </li>
          </ul>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/50 text-xs text-slate-400 dark:text-slate-500 hover:border-slate-300 dark:hover:border-zinc-700 transition-all"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Cari...</span>
              <span className="bg-slate-200 dark:bg-zinc-800 text-[10px] px-1.5 py-0.5 rounded font-mono font-bold ml-1">
                Ctrl+K
              </span>
            </button>

            {/* Mobile Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="sm:hidden p-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-900"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="p-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-900 transition-all duration-300 hover:rotate-12"
              aria-label="Toggle theme"
            >
              {mounted && resolvedTheme === "dark" ? (
                <Sun className="w-5 h-5 text-amber-500" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-900 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-zinc-900 border-b border-slate-200 dark:border-zinc-800 shadow-lg px-6 py-6 flex flex-col gap-4 font-semibold text-slate-700 dark:text-slate-300 max-h-[80vh] overflow-y-auto">
            <Link
              href="/"
              className={`block py-2 ${
                pathname === "/" ? "text-brand-500 dark:text-brand-400 font-bold" : ""
              }`}
            >
              Beranda
            </Link>

            {/* Mobile Course Accordion */}
            <div className="border-b border-slate-150 dark:border-zinc-800/60 pb-2">
              <button
                onClick={() => {
                  setMobileCourseOpen(!mobileCourseOpen);
                  if (typeof window !== "undefined") {
                    const saved = localStorage.getItem("catatan_kader_progress");
                    if (saved) {
                      try {
                        setCompletedLessons(JSON.parse(saved));
                      } catch (e) {}
                    }
                  }
                }}
                className={`flex items-center justify-between w-full py-2 text-left ${
                  pathname.startsWith("/modules") ? "text-brand-500 dark:text-brand-400 font-bold" : ""
                }`}
              >
                <span>Course</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileCourseOpen ? "rotate-180" : ""}`} />
              </button>

              {mobileCourseOpen && (
                <div className="pl-4 mt-2 space-y-2 border-l border-slate-150 dark:border-zinc-800">
                  {coursesData.map((course) => {
                    const isSelected = mobileSelectedCourse === course.id;
                    return (
                      <div key={course.id} className="space-y-1">
                        <button
                          onClick={() => setMobileSelectedCourse(isSelected ? null : course.id)}
                          className="flex items-center justify-between w-full py-1.5 text-xs text-slate-700 dark:text-slate-350 font-bold text-left hover:text-brand-500"
                        >
                          <span>{course.title}</span>
                          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isSelected ? "rotate-180" : ""}`} />
                        </button>

                        {isSelected && (
                          <div className="pl-3 space-y-1">
                            {course.modules.length === 0 ? (
                              <p className="text-[10px] text-slate-400 dark:text-zinc-500 italic py-1">Belum ada modul.</p>
                            ) : (
                              course.modules.map((mod) => {
                                const isUnlocked = isModuleUnlocked(course, mod.slug, completedLessons);
                                
                                if (!isUnlocked) {
                                  return (
                                    <div
                                      key={mod.slug}
                                      className="py-1.5 text-[11px] text-slate-450 dark:text-zinc-600 flex items-center gap-1.5 cursor-not-allowed opacity-60"
                                      title="Selesaikan modul sebelumnya untuk membuka materi ini."
                                    >
                                      <Lock className="w-3.5 h-3.5 text-slate-300 dark:text-zinc-700 shrink-0" />
                                      <span>Modul {mod.moduleNumber}: {mod.title}</span>
                                    </div>
                                  );
                                }

                                return (
                                  <Link
                                    key={mod.slug}
                                    href={`/modules/${mod.slug}`}
                                    className={`block py-1.5 text-[11px] text-slate-500 dark:text-slate-400 hover:text-brand-500 ${
                                      pathname === `/modules/${mod.slug}`
                                        ? "text-brand-500 dark:text-brand-400 font-bold"
                                        : ""
                                    }`}
                                  >
                                    Modul {mod.moduleNumber}: {mod.title}
                                  </Link>
                                );
                              })
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <Link
              href="/about"
              className={`block py-2 ${
                pathname === "/about" ? "text-brand-500 dark:text-brand-400 font-bold" : ""
              }`}
            >
              Tentang Saya
            </Link>

            <Link
              href="/tools"
              className={`block py-2 ${
                pathname === "/tools" ? "text-brand-500 dark:text-brand-400 font-bold" : ""
              }`}
            >
              Referensi Tools
            </Link>

            <Link
              href="/contact"
              className={`block py-2 ${
                pathname === "/contact" ? "text-brand-500 dark:text-brand-400 font-bold" : ""
              }`}
            >
              Hubungi
            </Link>
          </div>
        )}
      </header>

      {/* Unified Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
