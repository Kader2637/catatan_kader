"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Search, BookOpen, Clock, Calendar, ArrowRight, Code, 
  ShieldAlert, Sparkles, Award, Play, CheckCircle, GraduationCap,
  ChevronLeft, ChevronRight, Lock, ChevronDown
} from "lucide-react";
import { coursesData, allModules, ModuleMetadata, Course, isModuleUnlocked } from "@/data/courses";

export default function HomePage() {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [lastReadSlug, setLastReadSlug] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState<"paths" | "explorer">("paths");
  const [selectedExplorerCategory, setSelectedExplorerCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>(null);

  // Auto-expand course when specific category tab is selected
  useEffect(() => {
    if (selectedExplorerCategory !== "all") {
      setExpandedCourseId(selectedExplorerCategory);
    } else {
      setExpandedCourseId(null);
    }
  }, [selectedExplorerCategory]);
  const itemsPerPage = 6;
  const [currentCoursePage, setCurrentCoursePage] = useState(1);
  const coursesPerPage = 5;

  // Reset page pagination whenever queries/categories change
  useEffect(() => {
    setCurrentPage(1);
    setCurrentCoursePage(1);
  }, [selectedExplorerCategory, searchQuery]);

  // Load completed lessons and last read from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem("catatan_kader_progress");
    if (savedProgress) {
      try {
        setCompletedLessons(JSON.parse(savedProgress));
      } catch (e) {
        console.error(e);
      }
    }

    // Next.js client-side check for last read module
    if (typeof window !== "undefined") {
      const savedModules = allModules.map(m => m.slug);
      // Let's check which is the first uncompleted or just get the last read
      // We can search for the last visited module in localStorage if set, otherwise fallback to first uncompleted
      const lastRead = localStorage.getItem("catatan_kader_last_read");
      if (lastRead && savedModules.includes(lastRead)) {
        setLastReadSlug(lastRead);
      } else {
        // Fallback to first uncompleted module
        const firstUncompleted = allModules.find(m => !completedLessons.includes(m.slug));
        if (firstUncompleted) {
          setLastReadSlug(firstUncompleted.slug);
        } else if (allModules.length > 0) {
          setLastReadSlug(allModules[0].slug);
        }
      }
    }
  }, [completedLessons]);

  const getLastReadModule = (): ModuleMetadata | null => {
    if (!lastReadSlug) return null;
    return allModules.find(m => m.slug === lastReadSlug) || allModules[0] || null;
  };

  const lastReadModule = getLastReadModule();

  // Learning Paths definitions (Dicoding style)
  const learningPaths = [
    {
      id: "backend",
      title: "Alur Belajar Back-End Developer",
      badge: "Utama & Rekomendasi",
      badgeColor: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
      description: "Dirancang untuk membimbing Anda menjadi Software Engineer yang andal dalam membangun arsitektur server, API yang aman, dan database berskala enterprise.",
      level: "Pemula &bull; Menengah &bull; Mahir",
      duration: "135 Jam Belajar",
      courses: [
        coursesData.find(c => c.id === "php")!,
        coursesData.find(c => c.id === "laravel")!,
      ].filter(Boolean) as Course[],
    },
    {
      id: "frontend",
      title: "Alur Belajar Front-End Developer",
      badge: "Pendukung",
      badgeColor: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
      description: "Kuasai pustaka antarmuka modern untuk merancang aplikasi web SPA (Single Page Application) yang reaktif, interaktif, andal, dan berkinerja tinggi.",
      level: "Pemula &bull; Menengah",
      duration: "45 Jam Belajar",
      courses: [
        coursesData.find(c => c.id === "react")!,
        coursesData.find(c => c.id === "vue")!,
      ].filter(Boolean) as Course[],
    },
    {
      id: "fullstack",
      title: "Alur Belajar Full-Stack Developer",
      badge: "Spesialisasi",
      badgeColor: "bg-slate-500/10 text-slate-800 dark:text-slate-200 border-slate-500/20",
      description: "Kuasai teknik integrasi client-server menggunakan framework Next.js untuk merancang web app skala produksi dengan Server Components & Server Actions.",
      level: "Menengah &bull; Mahir",
      duration: "60 Jam Belajar",
      courses: [
        coursesData.find(c => c.id === "next")!,
      ].filter(Boolean) as Course[],
    }
  ];

  // Helper to count modules completed in a path
  const getPathProgress = (pathCourses: Course[]) => {
    const pathModules = pathCourses.flatMap(c => c.modules);
    const total = pathModules.length;
    const completed = pathModules.filter(m => completedLessons.includes(m.slug)).length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { completed, total, percentage };
  };

  // Filter modules for explorer tab
  const getFilteredExplorerModules = () => {
    let filtered = allModules;
    if (selectedExplorerCategory !== "all") {
      filtered = filtered.filter(m => m.category === selectedExplorerCategory);
    }
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter(m => 
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return filtered;
  };

  const filteredExplorerModules = getFilteredExplorerModules();

  const getShortName = (title: string) => {
    return title
      .replace(" Framework", "")
      .replace(" Library", "")
      .replace(" App Router", "")
      .replace(" Programming", "")
      .replace(" Modern", "")
      .replace(" Advanced", "")
      .replace(" Web", "")
      .replace(" Language System", "")
      .replace(" & Container", "")
      .replace(" VCS", "")
      .replace(" & Database Relation", "")
      .replace(" Backend", "")
      .replace(" Layouts", "")
      .replace(" Mobile App", "")
      .replace(" Android Dev", "")
      .replace(" Developer", "")
      .replace(" Spring Boot", "")
      .replace(" Orchestration", "")
      .replace(" OOP & Database", "");
  };

  const getCourseIconUrl = (courseId: string) => {
    const iconMap: Record<string, string> = {
      laravel: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg",
      php: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg",
      react: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
      vue: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg",
      next: "https://cdn.simpleicons.org/nextdotjs/ffffff",
      python: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
      javascript: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
      typescript: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
      golang: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original-wordmark.svg",
      rust: "https://cdn.simpleicons.org/rust/ffffff",
      docker: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
      git: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
      sql: "https://cdn.simpleicons.org/mysql/ffffff",
      nodejs: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
      htmlcss: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
      tailwind: "https://cdn.simpleicons.org/tailwindcss/ffffff",
      flutter: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg",
      kotlin: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg",
      swift: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swift/swift-original.svg",
      java: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
      kubernetes: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg",
    };
    return iconMap[courseId] || "";
  };

  const getCategoryColor = (cat: string) => {
    const colorMap: Record<string, string> = {
      laravel: "bg-red-500/10 text-red-500 border-red-500/20 dark:bg-red-500/20",
      php: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20 dark:bg-indigo-500/20",
      react: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20 dark:bg-cyan-500/20",
      vue: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 dark:bg-emerald-500/20",
      next: "bg-slate-900/10 text-slate-800 dark:bg-slate-800/20 dark:text-slate-200 border-slate-500/20",
      python: "bg-blue-500/10 text-blue-600 border-blue-500/20 dark:bg-blue-500/20",
      javascript: "bg-amber-500/10 text-amber-600 border-amber-500/20 dark:bg-amber-500/20",
      typescript: "bg-blue-600/10 text-blue-700 border-blue-600/20 dark:bg-blue-600/20",
      golang: "bg-sky-500/10 text-sky-655 border-sky-500/20 dark:bg-sky-500/20",
      rust: "bg-orange-850/10 text-amber-700 border-orange-800/20 dark:bg-orange-850/20",
      docker: "bg-blue-500/10 text-blue-600 border-blue-500/20 dark:bg-blue-500/20",
      git: "bg-orange-500/10 text-orange-600 border-orange-500/20 dark:bg-orange-500/20",
      sql: "bg-sky-650/10 text-sky-700 border-sky-650/20 dark:bg-sky-650/20",
      nodejs: "bg-green-500/10 text-green-600 border-green-500/20 dark:bg-green-500/20",
      htmlcss: "bg-orange-500/10 text-orange-600 border-orange-500/20 dark:bg-orange-500/20",
      tailwind: "bg-teal-500/10 text-teal-600 border-teal-500/20 dark:bg-teal-500/20",
      flutter: "bg-sky-500/10 text-sky-600 border-sky-550/20 dark:bg-sky-500/20",
      kotlin: "bg-purple-500/10 text-purple-650 border-purple-550/20 dark:bg-purple-500/20",
      swift: "bg-orange-500/10 text-orange-600 border-orange-555/20 dark:bg-orange-500/20",
      java: "bg-red-500/10 text-red-700 border-red-500/20 dark:bg-red-500/20",
      kubernetes: "bg-blue-600/10 text-blue-600 border-blue-600/20 dark:bg-blue-600/20",
    };
    return colorMap[cat] || "bg-slate-500/10 text-slate-500 border-slate-500/20 dark:bg-slate-500/20";
  };

  const getHoverGlow = (courseId: string) => {
    const glowMap: Record<string, string> = {
      laravel: "hover:shadow-[0_8px_30px_rgba(239,68,68,0.08)] hover:border-red-500/30",
      php: "hover:shadow-[0_8px_30px_rgba(99,102,241,0.08)] hover:border-indigo-500/30",
      react: "hover:shadow-[0_8px_30px_rgba(6,182,212,0.08)] hover:border-cyan-500/30",
      vue: "hover:shadow-[0_8px_30px_rgba(16,185,129,0.08)] hover:border-emerald-500/30",
      next: "hover:shadow-[0_8px_30px_rgba(255,255,255,0.02)] dark:hover:shadow-[0_8px_30px_rgba(255,255,255,0.04)] hover:border-slate-500/30",
      python: "hover:shadow-[0_8px_30px_rgba(59,130,246,0.08)] hover:border-blue-500/30",
      javascript: "hover:shadow-[0_8px_30px_rgba(245,158,11,0.08)] hover:border-amber-500/30",
      typescript: "hover:shadow-[0_8px_30px_rgba(37,99,235,0.08)] hover:border-blue-600/30",
      golang: "hover:shadow-[0_8px_30px_rgba(14,165,233,0.08)] hover:border-sky-500/30",
      rust: "hover:shadow-[0_8px_30px_rgba(194,65,12,0.08)] hover:border-orange-800/30",
      docker: "hover:shadow-[0_8px_30px_rgba(59,130,246,0.08)] hover:border-blue-500/30",
      git: "hover:shadow-[0_8px_30px_rgba(249,115,22,0.08)] hover:border-orange-500/30",
      sql: "hover:shadow-[0_8px_30px_rgba(14,165,233,0.08)] hover:border-sky-655/30",
      nodejs: "hover:shadow-[0_8px_30px_rgba(34,197,94,0.08)] hover:border-green-500/30",
      htmlcss: "hover:shadow-[0_8px_30px_rgba(249,115,22,0.08)] hover:border-orange-500/30",
      tailwind: "hover:shadow-[0_8px_30px_rgba(20,184,166,0.08)] hover:border-teal-500/30",
      flutter: "hover:shadow-[0_8px_30px_rgba(14,165,233,0.08)] hover:border-sky-500/30",
      kotlin: "hover:shadow-[0_8px_30px_rgba(168,85,247,0.08)] hover:border-purple-550/30",
      swift: "hover:shadow-[0_8px_30px_rgba(249,115,22,0.08)] hover:border-orange-500/30",
      java: "hover:shadow-[0_8px_30px_rgba(220,38,38,0.08)] hover:border-red-600/30",
      kubernetes: "hover:shadow-[0_8px_30px_rgba(37,99,235,0.08)] hover:border-blue-600/30",
    };
    return glowMap[courseId] || "hover:shadow-md";
  };

  const getCourseBorderColor = (courseId: string) => {
    const borderMap: Record<string, string> = {
      laravel: "border-l-red-500 dark:border-l-red-500/80",
      php: "border-l-indigo-500 dark:border-l-indigo-500/80",
      react: "border-l-cyan-500 dark:border-l-cyan-500/80",
      vue: "border-l-emerald-500 dark:border-l-emerald-500/80",
      next: "border-l-slate-900 dark:border-l-slate-450",
      python: "border-l-blue-500 dark:border-l-blue-500/80",
      javascript: "border-l-amber-500 dark:border-l-amber-500/80",
      typescript: "border-l-blue-600 dark:border-l-blue-600/80",
      golang: "border-l-sky-500 dark:border-l-sky-500/80",
      rust: "border-l-orange-850 dark:border-l-orange-800/80",
      docker: "border-l-blue-500 dark:border-l-blue-500/80",
      git: "border-l-orange-500 dark:border-l-orange-500/80",
      sql: "border-l-sky-600 dark:border-l-sky-600/80",
      nodejs: "border-l-green-500 dark:border-l-green-500/80",
      htmlcss: "border-l-orange-500 dark:border-l-orange-500/80",
      tailwind: "border-l-teal-500 dark:border-l-teal-500/80",
      flutter: "border-l-sky-500 dark:border-l-sky-500/80",
      kotlin: "border-l-purple-500 dark:border-l-purple-500/80",
      swift: "border-l-orange-500 dark:border-l-orange-500/80",
      java: "border-l-red-500 dark:border-l-red-500/80",
      kubernetes: "border-l-blue-600 dark:border-l-blue-600/80",
    };
    return borderMap[courseId] || "border-l-slate-450";
  };

  return (
    <div className="relative pt-28 pb-20 px-6 bg-slate-50/50 dark:bg-zinc-950/50 min-h-screen overflow-x-hidden w-full max-w-full">
      
      {/* Glow blobs */}
      <div className="absolute top-[-5%] left-[-5%] w-96 h-96 bg-brand-500/5 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute top-[30%] right-[-5%] w-96 h-96 bg-violet-500/5 rounded-full blur-3xl opacity-50 pointer-events-none" />
 
      <div className="max-w-7xl mx-auto relative z-10 space-y-10">
        
        {/* 1. DASHBOARD HEADER WELCOME */}
        <section className="relative overflow-hidden bg-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-800/80 dark:border-zinc-800/85">
          {/* Cyber grid decorative background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-brand-500/20 to-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-500/25 border border-brand-500/30 text-brand-350 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse"></span>
                <span>System Console Online</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Catatan Kader <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-cyan-400">Academy</span>
              </h1>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                Platform pembelajaran dan standardisasi industri perangkat lunak modern. Selesaikan seluruh materi modular terstruktur untuk membangun kecakapan engineering kelas atas.
              </p>
              
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10 max-w-lg">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 block tracking-wider uppercase">KURIKULUM</span>
                  <span className="text-xs font-black text-white mt-1 block">21 Kelas Industri</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400 block tracking-wider uppercase">TOTAL MATERI</span>
                  <span className="text-xs font-black text-white mt-1 block">{allModules.length} Modul Aktif</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400 block tracking-wider uppercase">STANDARDISASI</span>
                  <span className="text-xs font-black text-brand-400 mt-1 block">Software Engineer</span>
                </div>
              </div>
            </div>

            {/* Quick Resume Button */}
            {lastReadModule && (
              <div className="shrink-0 w-full lg:w-auto bg-white/5 border border-white/10 backdrop-blur-md p-4 rounded-2xl flex flex-col sm:flex-row items-center gap-4 shadow-2xl relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="text-center sm:text-left min-w-0 max-w-[200px] relative z-10">
                  <span className="text-[9px] font-mono text-brand-400 block leading-none mb-1.5 tracking-wider uppercase">LANJUTKAN CATATAN</span>
                  <span className="text-xs font-extrabold text-white truncate block">
                    Modul {lastReadModule.moduleNumber}: {lastReadModule.title}
                  </span>
                </div>
                <Link
                  href={`/modules/${lastReadModule.slug}`}
                  className="w-full sm:w-auto px-5 py-3 bg-gradient-to-r from-brand-500 to-indigo-600 hover:from-brand-600 hover:to-indigo-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-brand-500/20 active:scale-95 relative z-10"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Mulai Belajar</span>
                </Link>
              </div>
            )}
          </div>
        </section>
 
        {/* 2. TAB CONTROLLER: ALUR BELAJAR VS EXPLORER */}
        <div className="bg-slate-100 dark:bg-zinc-900/60 p-1.5 rounded-2xl border border-slate-200/50 dark:border-zinc-800/80 flex w-fit gap-1 shadow-xs">
          <button
            onClick={() => setSelectedTab("paths")}
            className={`px-5 py-2.5 text-xs font-extrabold rounded-xl transition-all duration-300 flex items-center gap-2 ${
              selectedTab === "paths"
                ? "bg-white dark:bg-zinc-800 text-brand-600 dark:text-brand-400 shadow-sm border border-slate-200/20 dark:border-zinc-700/50"
                : "text-slate-500 hover:text-slate-800 dark:hover:text-white"
            }`}
          >
            <GraduationCap className="w-4 h-4 text-brand-500 shrink-0" />
            <span>Alur Belajar (Roadmaps)</span>
          </button>
          <button
            onClick={() => setSelectedTab("explorer")}
            className={`px-5 py-2.5 text-xs font-extrabold rounded-xl transition-all duration-300 flex items-center gap-2 ${
              selectedTab === "explorer"
                ? "bg-white dark:bg-zinc-800 text-brand-600 dark:text-brand-400 shadow-sm border border-slate-200/20 dark:border-zinc-700/50"
                : "text-slate-500 hover:text-slate-800 dark:hover:text-white"
            }`}
          >
            <BookOpen className="w-4 h-4 text-cyan-500 shrink-0" />
            <span>Semua Modul Explorer</span>
          </button>
        </div>

        {/* 3. TAB CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-full overflow-hidden">
          
          {/* LEFT: MAIN TAB CONTENT */}
          <main className="lg:col-span-9 space-y-8 max-w-full overflow-hidden">
            
            {/* A. PATHS ROADMAP TAB */}
            {selectedTab === "paths" && (
              <div className="space-y-10">
                {learningPaths.map((path) => {
                  const { completed, total, percentage } = getPathProgress(path.courses);
                  return (
                    <section 
                      key={path.id}
                      className="bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800/80 rounded-3xl p-6 md:p-8 shadow-xs space-y-6"
                    >
                      {/* Path title and badge */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-zinc-800/60 pb-5">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-mono font-bold uppercase border ${path.badgeColor}`}>
                              {path.badge}
                            </span>
                            <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">
                              {path.duration}
                            </span>
                          </div>
                          <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white">
                            {path.title}
                          </h2>
                        </div>
                        
                        {/* Overall Path progress */}
                        <div className="text-left sm:text-right shrink-0 min-w-[120px]">
                          <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">
                            Selesai: <strong>{completed} / {total} Modul</strong>
                          </span>
                          <div className="flex items-center gap-2">
                            <div className="h-1.5 w-24 bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                              <div className="h-full bg-brand-500 rounded-full" style={{ width: `${percentage}%` }} />
                            </div>
                            <span className="text-xs font-mono font-bold text-brand-500">{percentage}%</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                        {path.description}
                      </p>

                      {/* Course lists (Syllabus layout) */}
                      <div className="space-y-6 relative pl-4 border-l-2 border-slate-100 dark:border-zinc-800/80 ml-2 py-2">
                        {path.courses.map((course, cIdx) => {
                          const completedModules = course.modules.filter(m => completedLessons.includes(m.slug)).length;
                          const coursePercent = Math.round((completedModules / course.modules.length) * 100);
                          
                          return (
                            <div key={course.id} className="relative">
                              {/* Step circle */}
                              <div className="absolute w-6 h-6 rounded-full bg-white dark:bg-zinc-950 border-2 border-brand-500 flex items-center justify-center text-[10px] font-mono font-bold -left-[29px] top-1 text-brand-500">
                                0{cIdx + 1}
                              </div>

                              <div className="bg-slate-50/50 dark:bg-zinc-900/30 border border-slate-100 dark:border-zinc-800/50 rounded-2xl p-5 hover:border-slate-200 dark:hover:border-zinc-800 transition-all duration-300">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                                  <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-200">
                                    {course.title}
                                  </h3>
                                  <span className="text-[10px] font-mono text-slate-400">
                                    {completedModules} / {course.modules.length} Modul ({coursePercent}%)
                                  </span>
                                </div>
                                
                                <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed mb-4">
                                  {course.description}
                                </p>

                                {/* Mini modules inline index */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-zinc-800/80">
                                  {course.modules.map((m) => {
                                    const isDone = completedLessons.includes(m.slug);
                                    const isUnlocked = isModuleUnlocked(course, m.slug, completedLessons);
                                    
                                    if (!isUnlocked) {
                                      return (
                                        <div
                                          key={m.slug}
                                          className="flex items-center gap-2 p-2 rounded-xl text-xs text-slate-400 dark:text-zinc-600 bg-slate-50/50 dark:bg-zinc-950/20 cursor-not-allowed opacity-60"
                                          title="Selesaikan modul sebelumnya untuk membuka materi ini."
                                        >
                                          <Lock className="w-3.5 h-3.5 text-slate-300 dark:text-zinc-700 shrink-0" />
                                          <span className="truncate">
                                            Modul {m.moduleNumber}: {m.title}
                                          </span>
                                        </div>
                                      );
                                    }

                                    return (
                                      <Link
                                        key={m.slug}
                                        href={`/modules/${m.slug}`}
                                        className={`flex items-center gap-2 p-2 rounded-xl text-xs hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors ${
                                          isDone 
                                            ? "text-emerald-500 font-medium" 
                                            : "text-slate-600 dark:text-slate-400"
                                        }`}
                                      >
                                        {isDone ? (
                                          <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                        ) : (
                                          <BookOpen className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
                                        )}
                                        <span className="truncate">
                                          Modul {m.moduleNumber}: {m.title}
                                        </span>
                                      </Link>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </section>
                  );
                })}
              </div>
            )}

            {/* B. ALL MODULES EXPLORER TAB */}
            {selectedTab === "explorer" && (
              <div className="space-y-6 max-w-full overflow-hidden">
                
                {/* Search bar & filter tabs inside explorer */}
                <div className="flex flex-col gap-4 bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800/80 p-4 rounded-2xl overflow-hidden max-w-full">
                  
                  <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
                    {/* Category tabs - Horizontal Scroll Row */}
                    <div className="flex-1 min-w-0 overflow-hidden relative">
                      <div className="flex overflow-x-auto gap-2.5 pb-2 scrollbar-none scroll-smooth -mx-2 px-2">
                        {[
                          { id: "all", name: "Semua" },
                          ...coursesData.map(c => ({ id: c.id, name: getShortName(c.title) }))
                        ].map((tab) => {
                          const isActive = selectedExplorerCategory === tab.id;
                          return (
                            <button
                              key={tab.id}
                              onClick={() => setSelectedExplorerCategory(tab.id)}
                              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all duration-200 flex items-center gap-1.5 border ${
                                isActive
                                  ? "bg-gradient-to-r from-brand-500 to-indigo-600 text-white border-transparent shadow-md shadow-brand-500/20"
                                  : "bg-white dark:bg-zinc-900 text-slate-600 dark:text-slate-400 border-slate-200/60 dark:border-zinc-800/80 hover:bg-slate-50 dark:hover:bg-zinc-800"
                              }`}
                            >
                              {tab.id !== "all" && getCourseIconUrl(tab.id) && (
                                <img 
                                  src={getCourseIconUrl(tab.id)} 
                                  alt={tab.name}
                                  className="w-3.5 h-3.5 object-contain shrink-0"
                                  style={{ filter: isActive ? "brightness(0) invert(1)" : "none" }}
                                />
                              )}
                              <span>{tab.name}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Search input */}
                    <div className="relative w-full md:w-60 shrink-0">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Cari modul..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-brand-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Explorer Modules Accordion Grid */}
                {searchQuery.trim() !== "" ? (
                  // Search query is active: Show matching individual lessons flatly
                  filteredExplorerModules.length === 0 ? (
                    <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200 dark:border-zinc-800/80 p-8">
                      <ShieldAlert className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">Tidak Ada Hasil</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Tidak ada modul yang cocok dengan pencarian Anda.</p>
                    </div>
                  ) : (
                    <div className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredExplorerModules
                          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                          .map((m) => {
                            const isDone = completedLessons.includes(m.slug);
                            const parentCourse = coursesData.find(c => c.id === m.category);
                            const isUnlocked = parentCourse ? isModuleUnlocked(parentCourse, m.slug, completedLessons) : true;
                            
                            if (!isUnlocked) {
                              return (
                                <article
                                  key={m.slug}
                                  className="bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800/85 rounded-2xl p-5 shadow-xs flex flex-col justify-between opacity-60 cursor-not-allowed"
                                  title="Selesaikan modul sebelumnya untuk membuka materi ini."
                                >
                                  <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${getCategoryColor(m.category)}`}>
                                        {m.category}
                                      </span>
                                      <span className="text-[10px] font-mono text-amber-500 font-bold flex items-center gap-1">
                                        <Lock className="w-3 h-3" /> Terkunci
                                      </span>
                                    </div>
                                    
                                    <h3 className="text-sm font-extrabold text-slate-400 dark:text-zinc-550 leading-snug">
                                      Modul {m.moduleNumber}: {m.title}
                                    </h3>

                                    <p className="text-slate-500 dark:text-slate-500 text-xs leading-relaxed line-clamp-2">
                                      {m.description}
                                    </p>
                                  </div>

                                  <div className="pt-4 border-t border-slate-100 dark:border-zinc-800/60 mt-4 flex items-center justify-between">
                                    <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                                      <Clock className="w-3.5 h-3.5" />
                                      <span>{m.readTime} baca</span>
                                    </span>
                                    
                                    <span className="text-xs font-bold text-slate-400 dark:text-zinc-650 flex items-center gap-1">
                                      <Lock className="w-3.5 h-3.5" /> Terkunci
                                    </span>
                                  </div>
                                </article>
                              );
                            }

                            return (
                              <article
                                key={m.slug}
                                className="group bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800/85 rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 dark:hover:border-zinc-700 transition-all duration-300 hover:shadow-md"
                              >
                                <div className="space-y-3">
                                  <div className="flex items-center justify-between">
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${getCategoryColor(m.category)}`}>
                                      {m.category}
                                    </span>
                                    <span className="text-[10px] font-mono text-slate-400 font-bold">
                                      Modul {m.moduleNumber}
                                    </span>
                                  </div>
                                  
                                  <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-200 leading-snug group-hover:text-brand-500 transition-colors">
                                    <Link href={`/modules/${m.slug}`}>
                                      {m.title}
                                    </Link>
                                  </h3>

                                  <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed line-clamp-2">
                                    {m.description}
                                  </p>
                                </div>

                                <div className="pt-4 border-t border-slate-100 dark:border-zinc-800/60 mt-4 flex items-center justify-between">
                                  <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                                    {isDone ? (
                                      <>
                                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                                        <span className="text-emerald-500 font-bold">SELESAI</span>
                                      </>
                                    ) : (
                                      <>
                                        <Clock className="w-3.5 h-3.5" />
                                        <span>{m.readTime} baca</span>
                                      </>
                                    )}
                                  </span>
                                  
                                  <Link
                                    href={`/modules/${m.slug}`}
                                    className="text-xs font-bold text-brand-500 flex items-center gap-0.5 hover:gap-1.5 transition-all"
                                  >
                                    Mulai Baca <ArrowRight className="w-3.5 h-3.5" />
                                  </Link>
                                </div>
                              </article>
                            );
                          })}
                      </div>

                      {/* Pagination buttons */}
                      {Math.ceil(filteredExplorerModules.length / itemsPerPage) > 1 && (
                        <div className="flex justify-center items-center gap-2 pt-4">
                          <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="p-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-500 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          
                          {Array.from({ length: Math.ceil(filteredExplorerModules.length / itemsPerPage) }, (_, i) => i + 1).map((page) => (
                            <button
                              key={page}
                              onClick={() => setCurrentPage(page)}
                              className={`w-10 h-10 rounded-xl border text-xs font-bold transition-all ${
                                currentPage === page
                                  ? "bg-brand-500 border-brand-500 text-white shadow-md shadow-brand-500/10"
                                  : "border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-zinc-800"
                              }`}
                            >
                              {page}
                            </button>
                          ))}
                          
                          <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredExplorerModules.length / itemsPerPage)))}
                            disabled={currentPage === Math.ceil(filteredExplorerModules.length / itemsPerPage)}
                            className="p-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-500 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  )
                ) : (
                  // Search query is empty: Group modules under Courses with accordion cards
                  <div className="space-y-6">
                    <div className="space-y-4">
                      {(selectedExplorerCategory === "all"
                        ? coursesData
                        : coursesData.filter((c) => c.id === selectedExplorerCategory)
                      )
                        .slice(
                          (currentCoursePage - 1) * coursesPerPage,
                          currentCoursePage * coursesPerPage
                        )
                        .map((course) => {
                          const isExpanded = expandedCourseId === course.id;
                          const completedInCourse = course.modules.filter((m) =>
                            completedLessons.includes(m.slug)
                          ).length;
                          const totalInCourse = course.modules.length;
                          const percentage =
                            totalInCourse > 0
                              ? Math.round((completedInCourse / totalInCourse) * 100)
                              : 0;

                          return (
                            <div
                              key={course.id}
                              className={`bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800/80 border-l-4 ${getCourseBorderColor(course.id)} rounded-2xl overflow-hidden transition-all duration-300 ${getHoverGlow(course.id)}`}
                            >
                              {/* Course Header Toggle */}
                              <button
                                onClick={() =>
                                  setExpandedCourseId(isExpanded ? null : course.id)
                                }
                                className="w-full p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left hover:bg-slate-50/50 dark:hover:bg-zinc-800/20 transition-colors"
                              >
                                <div className="flex items-center gap-4 min-w-0">
                                  {/* Course Icon/Gradient Circle */}
                                  <div
                                    className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${course.gradient} flex items-center justify-center text-white shrink-0 shadow-md p-2.5`}
                                  >
                                    {getCourseIconUrl(course.id) ? (
                                      <img 
                                        src={getCourseIconUrl(course.id)} 
                                        alt={course.title}
                                        className="w-full h-full object-contain"
                                        style={{ filter: "brightness(0) invert(1)" }}
                                      />
                                    ) : (
                                      <BookOpen className="w-6 h-6" />
                                    )}
                                  </div>
                                  <div className="min-w-0">
                                    <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-200 leading-snug">
                                      {course.title}
                                    </h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                                      {course.description}
                                    </p>
                                  </div>
                                </div>

                                <div className="flex items-center justify-between sm:justify-end gap-6 shrink-0 border-t sm:border-t-0 border-slate-100 dark:border-zinc-800/60 pt-3 sm:pt-0">
                                  {/* Progress indicator */}
                                  <div className="text-left sm:text-right">
                                    <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 block leading-none mb-1">
                                      PROGRESS BELAJAR
                                    </span>
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs font-bold text-slate-700 dark:text-slate-350">
                                        {completedInCourse} / {totalInCourse} Modul
                                      </span>
                                      <div className="h-1.5 w-16 bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                                        <div
                                          className="h-full bg-brand-500 rounded-full"
                                          style={{ width: `${percentage}%` }}
                                        />
                                      </div>
                                      <span className="text-[11px] font-mono font-bold text-brand-500">
                                        {percentage}%
                                      </span>
                                    </div>
                                  </div>

                                  {/* Chevron toggle icon */}
                                  <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-zinc-850 text-slate-500 dark:text-slate-400">
                                    <ChevronDown
                                      className={`w-4 h-4 transition-transform duration-300 ${
                                        isExpanded ? "rotate-180" : ""
                                      }`}
                                    />
                                  </div>
                                </div>
                              </button>

                              {/* Collapsible Sub-modules Grid */}
                              <div
                                className={`transition-all duration-355 ease-in-out overflow-hidden ${
                                  isExpanded
                                    ? "max-h-[1200px] border-t border-slate-100 dark:border-zinc-800/60 p-5 bg-slate-50/30 dark:bg-zinc-950/10"
                                    : "max-h-0"
                                }`}
                              >
                                {course.modules.length === 0 ? (
                                  <p className="text-xs text-slate-400 dark:text-zinc-550 italic py-2">
                                    Materi dalam penyusunan.
                                  </p>
                                ) : (
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {course.modules.map((m) => {
                                      const isDone = completedLessons.includes(m.slug);
                                      const isUnlocked = isModuleUnlocked(
                                        course,
                                        m.slug,
                                        completedLessons
                                      );

                                       if (!isUnlocked) {
                                         return (
                                           <div
                                             key={m.slug}
                                             className="relative overflow-hidden bg-slate-100/20 dark:bg-zinc-900/10 backdrop-blur-xs border border-slate-200/30 dark:border-zinc-850 rounded-xl p-4 flex flex-col justify-between opacity-50 cursor-not-allowed select-none transition-all"
                                             title="Selesaikan modul sebelumnya untuk membuka materi ini."
                                           >
                                            <div className="space-y-2">
                                              <div className="flex items-center justify-between">
                                                <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-200/50 dark:bg-zinc-800/50 text-slate-500 shrink-0">
                                                  Modul {m.moduleNumber}
                                                </span>
                                                <span className="text-[10px] font-mono text-amber-500 font-bold flex items-center gap-1.5">
                                                  <Lock className="w-3.5 h-3.5" /> Terkunci
                                                </span>
                                              </div>
                                              <h4 className="text-xs font-bold text-slate-400 dark:text-zinc-600 leading-tight">
                                                {m.title}
                                              </h4>
                                              <p className="text-[11px] text-slate-400/80 dark:text-zinc-700 line-clamp-2 leading-relaxed">
                                                {m.description}
                                              </p>
                                            </div>
                                          </div>
                                        );
                                      }

                                      return (
                                        <div
                                          key={m.slug}
                                          className="group bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800/80 rounded-xl p-4 flex flex-col justify-between hover:border-slate-355 dark:hover:border-zinc-700 hover:shadow-sm transition-all duration-300"
                                        >
                                          <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                              <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-slate-400 shrink-0">
                                                Modul {m.moduleNumber}
                                              </span>
                                              {isDone && (
                                                <span className="text-[10px] font-mono text-emerald-500 font-bold flex items-center gap-1">
                                                  <CheckCircle className="w-3.5 h-3.5 text-emerald-555" /> Selesai
                                                </span>
                                              )}
                                            </div>
                                            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-250 leading-tight group-hover:text-brand-505 transition-colors">
                                              <Link href={`/modules/${m.slug}`}>
                                                {m.title}
                                              </Link>
                                            </h4>
                                            <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                                              {m.description}
                                            </p>
                                          </div>

                                          <div className="pt-3 border-t border-slate-100 dark:border-zinc-800/60 mt-3 flex items-center justify-between">
                                            <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                                              <Clock className="w-3.5 h-3.5" />
                                              <span>{m.readTime} baca</span>
                                            </span>
                                            <Link
                                              href={`/modules/${m.slug}`}
                                              className="text-[11px] font-bold text-brand-500 flex items-center gap-0.5 hover:gap-1.5 transition-all"
                                            >
                                              Buka Materi{" "}
                                              <ArrowRight className="w-3.5 h-3.5" />
                                            </Link>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                    </div>

                    {/* Course Cards Pagination buttons */}
                    {Math.ceil(
                      (selectedExplorerCategory === "all"
                        ? coursesData
                        : coursesData.filter((c) => c.id === selectedExplorerCategory)
                      ).length / coursesPerPage
                    ) > 1 && (
                      <div className="flex justify-center items-center gap-2 pt-4">
                        <button
                          onClick={() => setCurrentCoursePage((prev) => Math.max(prev - 1, 1))}
                          disabled={currentCoursePage === 1}
                          className="p-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-500 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>

                        {Array.from(
                          {
                            length: Math.ceil(
                              (selectedExplorerCategory === "all"
                                ? coursesData
                                : coursesData.filter(
                                    (c) => c.id === selectedExplorerCategory
                                  )
                              ).length / coursesPerPage
                            ),
                          },
                          (_, i) => i + 1
                        ).map((page) => (
                          <button
                            key={page}
                            onClick={() => setCurrentCoursePage(page)}
                            className={`w-10 h-10 rounded-xl border text-xs font-bold transition-all ${
                              currentCoursePage === page
                                ? "bg-brand-500 border-brand-500 text-white shadow-md shadow-brand-500/10"
                                : "border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-650 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-zinc-800"
                            }`}
                          >
                            {page}
                          </button>
                        ))}

                        <button
                          onClick={() =>
                            setCurrentCoursePage((prev) =>
                              Math.min(
                                prev + 1,
                                Math.ceil(
                                  (selectedExplorerCategory === "all"
                                    ? coursesData
                                    : coursesData.filter(
                                        (c) => c.id === selectedExplorerCategory
                                      )
                                  ).length / coursesPerPage
                                )
                              )
                            )
                          }
                          disabled={
                            currentCoursePage ===
                            Math.ceil(
                              (selectedExplorerCategory === "all"
                                ? coursesData
                                : coursesData.filter(
                                    (c) => c.id === selectedExplorerCategory
                                  )
                              ).length / coursesPerPage
                            )
                          }
                          className="p-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-500 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </main>

          {/* RIGHT SIDEBAR: INSTRUCTOR INFO & ROADMAP STATS */}
          <aside className="lg:col-span-3 space-y-6">
            
            {/* Overall Student stats widget */}
            <div className="bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800/80 rounded-2xl p-6 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-500/5 rounded-full blur-xl" />
              <h3 className="font-extrabold text-slate-900 dark:text-white text-sm mb-4 pb-2 border-b border-slate-100 dark:border-zinc-800/60 flex items-center gap-2">
                <Award className="w-4.5 h-4.5 text-brand-500" />
                Progress Belajar Kamu
              </h3>
              
              <div className="space-y-4 relative z-10">
                <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                  <span>Modul Selesai</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {completedLessons.length} / {allModules.length} Modul
                  </span>
                </div>
                
                {/* Total progress bar */}
                <div className="space-y-1">
                  <div className="h-2 w-full bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                      style={{ width: `${Math.round((completedLessons.length / allModules.length) * 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-end text-[10px] font-mono font-bold text-emerald-500">
                    {Math.round((completedLessons.length / allModules.length) * 100)}% Lengkap
                  </div>
                </div>
              </div>
            </div>

            {/* Profile spotlight */}
            <div className="bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800/80 rounded-2xl p-5 shadow-sm text-center relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-500 via-indigo-500 to-cyan-500" />
              
              <div className="w-20 h-20 mx-auto rounded-full p-1 bg-gradient-to-tr from-brand-500 to-cyan-500 shadow-inner mb-3 group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-white dark:border-zinc-900">
                  <img 
                    src="https://www.abdkader.my.id/assets/foto/im.png" 
                    alt="Abdul Kader" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://ui-avatars.com/api/?name=Abdul+Kader&background=4f46e5&color=fff";
                    }}
                  />
                </div>
              </div>
              
              <div className="inline-flex items-center gap-1 mb-1 px-2.5 py-0.5 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-450 border border-brand-500/15 text-[9px] font-bold tracking-wide uppercase">
                <Sparkles className="w-2.5 h-2.5 fill-current" />
                <span>Verified Educator</span>
              </div>

              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mt-1">
                Abdul Kader
              </h3>
              <p className="text-[10px] text-brand-500 font-semibold mb-3">
                Founder of Aether Nusantara
              </p>
              <p className="text-slate-505 dark:text-slate-400 text-[11px] leading-relaxed text-left mb-4">
                Founder of Aether Nusantara & CTO di PT Kodingin Digital Nusantara. Menulis catatan ini untuk mendokumentasikan standar industri perangkat lunak modern.
              </p>
              <Link 
                href="/about" 
                className="w-full py-2 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-zinc-800 dark:hover:bg-zinc-700/80 text-slate-750 dark:text-slate-300 text-[10px] font-bold border border-slate-200/50 dark:border-zinc-700 transition-colors inline-block"
              >
                Lihat CV & Pengalaman
              </Link>
            </div>

            {/* Core Toolkit Card */}
            <div className="bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800/80 rounded-2xl p-5 shadow-sm">
              <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4 pb-2 border-b border-slate-100 dark:border-zinc-800/80 flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5" />
                Core Toolkits
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: "VS Code", tag: "Editor", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" },
                  { name: "Notion", tag: "Docs", img: "https://cdn.simpleicons.org/notion/000000" },
                  { name: "Github", tag: "Repo", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg", invertDark: true },
                  { name: "Figma", tag: "Design", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" }
                ].map((tool) => (
                  <div
                    key={tool.name}
                    className="flex flex-col items-center p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-zinc-800/40 transition-colors text-center group"
                  >
                    <div className="w-8 h-8 mb-1 bg-slate-50 dark:bg-zinc-800/50 rounded flex items-center justify-center border border-slate-100 dark:border-zinc-800 group-hover:scale-105 transition-transform">
                      <img 
                        src={tool.img} 
                        alt={tool.name} 
                        className={`w-5 h-5 object-contain ${tool.invertDark ? "dark:invert" : ""}`}
                      />
                    </div>
                    <span className="text-[10px] font-bold text-slate-800 dark:text-slate-200 leading-none">
                      {tool.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </aside>

        </div>

      </div>

    </div>
  );
}

// Force Tailwind to compile course gradients and text colors
const tailwindSafelist = [
  // Gradients
  "from-red-500 to-rose-600",
  "from-indigo-500 to-blue-600",
  "from-cyan-400 to-blue-500",
  "from-emerald-400 to-teal-500",
  "from-slate-800 to-zinc-950",
  "from-blue-500 to-yellow-500",
  "from-amber-400 to-orange-500",
  "from-blue-600 to-indigo-700",
  "from-sky-400 to-cyan-600",
  "from-orange-800 to-zinc-800",
  "from-blue-400 to-sky-600",
  "from-orange-500 to-red-650",
  "from-sky-600 to-indigo-800",
  "from-green-500 to-emerald-600",
  "from-orange-400 to-pink-500",
  "from-teal-400 to-cyan-500",
  "from-sky-400 to-blue-500",
  "from-purple-500 to-indigo-600",
  "from-orange-500 to-rose-500",
  "from-red-600 to-orange-700",
  "from-blue-600 to-indigo-800",
  
  // Text Colors
  "text-red-600", "dark:text-red-400",
  "text-indigo-600", "dark:text-indigo-400",
  "text-cyan-600", "dark:text-cyan-400",
  "text-emerald-600", "dark:text-emerald-400",
  "text-slate-900", "dark:text-slate-200",
  "text-blue-600", "dark:text-blue-400",
  "text-amber-500", "dark:text-amber-400",
  "text-blue-700", "dark:text-blue-500",
  "text-sky-500", "dark:text-sky-400",
  "text-amber-800", "dark:text-amber-600",
  "text-orange-600", "dark:text-orange-500",
  "text-sky-700", "dark:text-sky-500",
  "text-green-600", "dark:text-green-500",
  "text-orange-500", "dark:text-orange-450",
  "text-teal-500", "dark:text-teal-400",
  "text-purple-650", "dark:text-purple-500",
  "text-red-750", "dark:text-red-500",
];
