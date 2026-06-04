"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { 
  ChevronRight, ChevronLeft, Menu, X, CheckCircle, 
  Circle, ArrowLeft, ArrowRight, Share2, Sun, Moon, Home, Award, Lock
} from "lucide-react";
import { Course, coursesData, ModuleMetadata, isModuleUnlocked } from "@/data/courses";

interface LessonClientProps {
  currentModule: ModuleMetadata;
  cleanHtml: string;
  toc: { id: string; text: string; depth: number }[];
  prevModule?: ModuleMetadata;
  nextModule?: ModuleMetadata;
}

export default function LessonClient({
  currentModule,
  cleanHtml,
  toc,
  prevModule,
  nextModule,
}: LessonClientProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const { resolvedTheme, setTheme } = useTheme();
  const router = useRouter();

  // Find current course and its modules
  const currentCourse = coursesData.find(c => c.id === currentModule.category);
  const courseModules = currentCourse?.modules || [];

  // Load progress
  useEffect(() => {
    const saved = localStorage.getItem("catatan_kader_progress");
    if (saved) {
      try {
        setCompletedLessons(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Avoid Hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Adjust sidebar default open state
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Format Code blocks and info boxes inside prose
  useEffect(() => {
    if (!contentRef.current) return;
    
    // 1. Process Code Blocks
    const preBlocks = contentRef.current.querySelectorAll("pre");
    preBlocks.forEach((pre) => {
      if (pre.parentElement?.classList.contains("code-block-wrapper")) return;

      const wrapper = document.createElement("div");
      wrapper.className = "relative my-6 rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-zinc-800 bg-[#0f172a] text-slate-200 code-block-wrapper";

      const header = document.createElement("div");
      header.className = "flex items-center justify-between px-4 py-2 bg-slate-900/60 border-b border-slate-800/80";
      
      const lang = pre.querySelector("code")?.className || "code";
      const cleanLang = lang.replace("language-", "").replace("hljs ", "").split(" ")[0] || "code";

      header.innerHTML = `
        <div class="flex gap-1.5 items-center">
          <span class="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
          <span class="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
          <span class="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
          <span class="ml-2 text-[10px] font-mono font-bold text-slate-400 uppercase">${cleanLang}</span>
        </div>
        <button class="copy-btn flex items-center gap-1 text-[10px] font-mono text-slate-400 hover:text-brand-400 transition-colors">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
          <span>Copy</span>
        </button>
      `;

      pre.parentNode?.insertBefore(wrapper, pre);
      pre.className = "p-4 md:p-5 overflow-x-auto font-mono text-xs md:text-sm leading-relaxed text-slate-200 m-0 bg-transparent";
      wrapper.appendChild(header);
      wrapper.appendChild(pre);

      const copyBtn = header.querySelector(".copy-btn");
      copyBtn?.addEventListener("click", () => {
        const codeText = pre.innerText;
        navigator.clipboard.writeText(codeText).then(() => {
          const btnSpan = copyBtn.querySelector("span");
          if (btnSpan) btnSpan.innerText = "Copied!";
          setTimeout(() => {
            if (btnSpan) btnSpan.innerText = "Copy";
          }, 2000);
        });
      });
    });

    // 2. Format Info/Alert boxes to look like Dicoding's callouts
    // Find alert boxes that were div/p in the parsed HTML and style them
    const allDivs = contentRef.current.querySelectorAll("div");
    allDivs.forEach((div) => {
      // Kader Note
      if (div.innerText.includes("Kader Note") || div.innerText.includes("Kader Note (Git & Security):")) {
        div.className = "p-5 bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 rounded-r-xl my-8 text-sm text-slate-700 dark:text-blue-200 shadow-xs";
      }
      // Warning/Alerts
      if (div.innerText.includes("Peringatan Keras") || div.innerText.includes("Warning:")) {
        div.className = "p-5 bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-500 rounded-r-xl my-8 text-sm text-slate-700 dark:text-amber-200 shadow-xs";
      }
    });

  }, [cleanHtml]);

  // Toggle complete lesson status
  const toggleComplete = (slug: string) => {
    let updated: string[];
    if (completedLessons.includes(slug)) {
      updated = completedLessons.filter(s => s !== slug);
    } else {
      updated = [...completedLessons, slug];
    }
    setCompletedLessons(updated);
    localStorage.setItem("catatan_kader_progress", JSON.stringify(updated));
  };

  // Calculate course progress percentage
  const totalLessons = courseModules.length;
  const completedCount = courseModules.filter(m => completedLessons.includes(m.slug)).length;
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  // Evaluate locked state
  const isUnlocked = currentCourse ? isModuleUnlocked(currentCourse, currentModule.slug, completedLessons) : true;

  if (mounted && currentCourse && !isUnlocked) {
    const firstUncompleted = courseModules.find(m => !completedLessons.includes(m.slug));
    
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 flex items-center justify-center p-6 relative overflow-hidden">
        {/* Glow blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-brand-500/10 rounded-full blur-3xl opacity-50 pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-violet-500/10 rounded-full blur-3xl opacity-50 pointer-events-none" />

        <div className="max-w-md w-full bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800/80 rounded-3xl p-8 shadow-xl text-center space-y-6 relative z-10">
          <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/25 rounded-2xl flex items-center justify-center mx-auto text-amber-500 shadow-sm animate-pulse">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-mono font-bold text-amber-500 uppercase tracking-widest block">
              Materi Terkunci
            </span>
            <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white leading-tight">
              Modul Belum Terbuka!
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Anda harus menyelesaikan seluruh modul materi sebelumnya pada kelas <strong>{currentCourse.title}</strong> terlebih dahulu untuk dapat membaca materi ini.
            </p>
          </div>

          {firstUncompleted && (
            <div className="p-4 bg-slate-50/50 dark:bg-zinc-950/40 border border-slate-100 dark:border-zinc-850 rounded-2xl text-left">
              <span className="text-[10px] font-mono text-slate-400 dark:text-zinc-550 block mb-1">LANJUTKAN DI SINI:</span>
              <Link 
                href={`/modules/${firstUncompleted.slug}`}
                className="text-xs font-bold text-brand-500 hover:underline leading-snug block"
              >
                Modul {firstUncompleted.moduleNumber}: {firstUncompleted.title}
              </Link>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              href="/"
              className="flex-1 px-5 py-3 border border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
            >
              <Home className="w-4 h-4 text-slate-450" />
              <span>Ke Beranda</span>
            </Link>
            {firstUncompleted && (
              <Link
                href={`/modules/${firstUncompleted.slug}`}
                className="flex-1 px-5 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-brand-600/10"
              >
                <span>Pelajari Modul</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-800 dark:text-slate-200 transition-colors duration-300">
      
      {/* DICODING HEADER BAR */}
      <header className="fixed top-0 left-0 right-0 h-16 z-50 bg-white dark:bg-zinc-900 border-b border-slate-200 dark:border-zinc-800/80 flex items-center px-4 justify-between">
        
        {/* Left Side: Back button and syllabus toggler */}
        <div className="flex items-center gap-3">
          <Link 
            href="/" 
            className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
            title="Kembali ke Dashboard"
          >
            <Home className="w-5 h-5" />
          </Link>
          
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <Menu className="w-4.5 h-4.5" />
            <span className="hidden sm:inline">Daftar Materi</span>
          </button>
        </div>

        {/* Center Side: Course Title and Progress */}
        <div className="hidden md:flex flex-col items-center max-w-xl flex-1 px-4">
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate max-w-sm">
            {currentCourse?.title}
          </span>
          <div className="flex items-center gap-2.5 w-full max-w-xs mt-1">
            <div className="h-1.5 flex-1 bg-slate-200 dark:bg-zinc-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-brand-500 rounded-full transition-all duration-500" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400">
              {progressPercent}%
            </span>
          </div>
        </div>

        {/* Right Side: Theme switcher & Mark complete */}
        <div className="flex items-center gap-3">
          {/* Quick Mark Complete Button */}
          <button
            onClick={() => toggleComplete(currentModule.slug)}
            className={`p-2 px-3 rounded-lg border text-xs font-bold transition-all flex items-center gap-1.5 ${
              completedLessons.includes(currentModule.slug)
                ? "bg-emerald-500 border-emerald-500 text-white shadow-xs"
                : "border-slate-200 dark:border-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-700 dark:text-slate-300"
            }`}
          >
            {completedLessons.includes(currentModule.slug) ? (
              <>
                <CheckCircle className="w-4 h-4" />
                <span className="hidden sm:inline">Selesai</span>
              </>
            ) : (
              <span>Tandai Selesai</span>
            )}
          </button>

          {/* Theme switcher */}
          <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
          >
            {mounted && resolvedTheme === "dark" ? (
              <Sun className="w-5 h-5 text-amber-500" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </div>
      </header>

      {/* CORE SYLLABUS LAYOUT */}
      <div className="flex flex-1 pt-16 relative">
        
        {/* DICODING LEFT SIDEBAR */}
        <aside 
          className={`fixed inset-y-0 left-0 z-40 w-80 bg-white dark:bg-zinc-900 border-r border-slate-200 dark:border-zinc-800/80 pt-16 flex flex-col transition-transform duration-300 transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Sidebar Course Info */}
          <div className="p-4 border-b border-slate-200 dark:border-zinc-800/80 bg-slate-50/50 dark:bg-zinc-900/40">
            <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">
              Kelas Aktif
            </h3>
            <h4 className="text-sm font-extrabold text-slate-800 dark:text-slate-200 mb-2">
              {currentCourse?.title}
            </h4>
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Modul: {completedCount} / {totalLessons}</span>
              <span className="font-bold">{progressPercent}% Selesai</span>
            </div>
            <div className="h-1.5 w-full bg-slate-200 dark:bg-zinc-800 rounded-full overflow-hidden mt-2">
              <div 
                className="h-full bg-brand-500 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Module lists */}
          <div className="flex-1 overflow-y-auto p-4 space-y-1.5">
            <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-2 mb-2">
              Daftar Modul Belajar
            </div>
            
            {courseModules.map((m) => {
              const isActive = m.slug === currentModule.slug;
              const isDone = completedLessons.includes(m.slug);
              const isUnlocked = currentCourse ? isModuleUnlocked(currentCourse, m.slug, completedLessons) : true;

              if (!isUnlocked) {
                return (
                  <div
                    key={m.slug}
                    className="flex items-start gap-3 p-2.5 rounded-xl text-xs text-slate-400 dark:text-zinc-600 border border-transparent cursor-not-allowed opacity-60"
                    title="Selesaikan modul sebelumnya untuk membuka materi ini."
                  >
                    <div className="shrink-0 mt-0.5">
                      <Lock className="w-4 h-4 text-slate-300 dark:text-zinc-700" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] font-mono text-slate-450 leading-none mb-1">
                        Modul {m.moduleNumber}
                      </div>
                      <div className="truncate pr-1">
                        {m.title}
                      </div>
                    </div>
                  </div>
                );
              }
              
              return (
                <Link
                  key={m.slug}
                  href={`/modules/${m.slug}`}
                  className={`flex items-start gap-3 p-2.5 rounded-xl text-xs transition-all ${
                    isActive
                      ? "bg-brand-500/10 text-brand-600 dark:text-brand-400 font-bold border border-brand-500/20"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-zinc-800/40 border border-transparent"
                  }`}
                >
                  <div className="shrink-0 mt-0.5">
                    {isDone ? (
                      <CheckCircle className="w-4 h-4 text-emerald-500 fill-emerald-500/10" />
                    ) : (
                      <Circle className="w-4 h-4 text-slate-300 dark:text-zinc-700" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono text-slate-400 leading-none mb-1">
                      Modul {m.moduleNumber}
                    </div>
                    <div className="truncate pr-1 text-slate-800 dark:text-slate-200">
                      {m.title}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </aside>

        {/* MAIN FOCUSED READING LAYOUT */}
        <main 
          className={`flex-1 transition-all duration-300 ${
            sidebarOpen ? "lg:pl-80" : "lg:pl-0"
          } flex flex-col bg-white dark:bg-zinc-950`}
        >
          {/* Centered page grid */}
          <div className="max-w-4xl mx-auto w-full px-6 py-10 flex-1">
            
            {/* Header info */}
            <div className="space-y-4 mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-50 dark:bg-brand-950/30 text-brand-600 dark:text-brand-400 border border-brand-100 dark:border-brand-900/50 rounded-lg text-xs font-semibold uppercase tracking-wider">
                Modul {currentModule.moduleNumber}
              </div>
              
              <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                {currentModule.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-xs text-slate-500 dark:text-slate-400 font-mono border-y border-slate-200/60 dark:border-zinc-800/80 py-4">
                <span>Kategori: <strong className="text-slate-700 dark:text-slate-300 uppercase">{currentModule.category}</strong></span>
                <span>&bull;</span>
                <span>Rilis: {currentModule.date}</span>
                <span>&bull;</span>
                <span>Waktu Baca: {currentModule.readTime}</span>
              </div>
            </div>

            {/* Banner image */}
            <div className="w-full h-56 md:h-96 rounded-2xl overflow-hidden mb-10 border border-slate-200 dark:border-zinc-800 shadow-xs bg-slate-100 dark:bg-zinc-900">
              <img 
                src={currentModule.bannerImage} 
                alt={currentModule.title} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800";
                }}
              />
            </div>

            {/* Extracted actual HTML Content */}
            <div 
              ref={contentRef}
              className="prose-custom"
              dangerouslySetInnerHTML={{ __html: cleanHtml }}
            />

            {/* COURSE COMPLETE CONGRATS CONGRATS CARD */}
            {!nextModule && (
              <div className="mt-12 p-8 bg-gradient-to-br from-brand-500 to-indigo-600 rounded-3xl text-white shadow-lg flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
                <div className="absolute right-[-20px] bottom-[-20px] opacity-10">
                  <Award className="w-48 h-48" />
                </div>
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div className="space-y-1 relative z-10 text-center md:text-left">
                  <h3 className="text-xl font-bold">Luar Biasa, Kelas Selesai!</h3>
                  <p className="text-sm text-white/90">
                    Anda telah menyelesaikan modul materi terakhir pada kelas ini. Terus tingkatkan kemampuan coding Anda dengan kelas-kelas materi lainnya!
                  </p>
                </div>
              </div>
            )}

            {/* DICODING SYLLABUS NAVIGATION FOOTER */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-16 pt-8 border-t border-slate-200 dark:border-zinc-800 gap-4">
              {prevModule ? (
                <Link
                  href={`/modules/${prevModule.slug}`}
                  className="w-full sm:w-auto justify-center inline-flex items-center gap-2.5 px-5 py-3.5 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl font-semibold text-slate-700 dark:text-slate-300 hover:border-brand-500 hover:text-brand-600 dark:hover:border-brand-400 transition-all shadow-xs group"
                >
                  <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                  <div className="text-left">
                    <span className="text-[10px] font-mono text-slate-400 block leading-none mb-1">MODUL SEBELUMNYA</span>
                    <span className="text-xs truncate max-w-[200px] block leading-none">{prevModule.title}</span>
                  </div>
                </Link>
              ) : (
                <div />
              )}

              {nextModule ? (
                completedLessons.includes(currentModule.slug) ? (
                  <Link
                    href={`/modules/${nextModule.slug}`}
                    className="w-full sm:w-auto justify-center inline-flex items-center gap-2.5 px-5 py-3.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-semibold transition-all shadow-md shadow-brand-600/10 group"
                  >
                    <div className="text-right">
                      <span className="text-[10px] text-white/70 block leading-none mb-1 font-mono">MODUL SELANJUTNYA</span>
                      <span className="text-xs truncate max-w-[200px] block leading-none">{nextModule.title}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                ) : (
                  <div
                    className="w-full sm:w-auto justify-center inline-flex items-center gap-2.5 px-5 py-3.5 bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-400 dark:text-zinc-600 rounded-xl font-semibold opacity-60 cursor-not-allowed"
                    title="Tandai modul saat ini sebagai selesai untuk membuka modul berikutnya."
                  >
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 dark:text-zinc-550 block leading-none mb-1 font-mono flex items-center gap-1">
                        <Lock className="w-3 h-3" /> SELANJUTNYA TERKUNCI
                      </span>
                      <span className="text-xs truncate max-w-[200px] block leading-none">{nextModule.title}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 dark:text-zinc-650" />
                  </div>
                )
              ) : (
                <div />
              )}
            </div>

          </div>
        </main>

      </div>
    </div>
  );
}
