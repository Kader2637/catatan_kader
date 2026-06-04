"use client";

import { useEffect, useState, useRef } from "react";
import { Search, X, FileText, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { allModules } from "@/data/courses";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const filtered = query.trim() === "" 
    ? [] 
    : allModules.filter(m => 
        m.title.toLowerCase().includes(query.toLowerCase()) ||
        m.description.toLowerCase().includes(query.toLowerCase()) ||
        m.category.toLowerCase().includes(query.toLowerCase())
      );

  const getCategoryColor = (cat: string) => {
    const colorMap: Record<string, string> = {
      laravel: "bg-red-500/10 text-red-500 border-red-500/20",
      php: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
      react: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
      vue: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      next: "bg-slate-900/10 text-slate-800 dark:bg-slate-800/20 dark:text-slate-200 border-slate-500/20",
      python: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      javascript: "bg-amber-500/10 text-amber-500 border-amber-500/20",
      typescript: "bg-blue-600/10 text-blue-600 border-blue-600/20",
      golang: "bg-sky-500/10 text-sky-550 border-sky-500/20",
      rust: "bg-orange-800/10 text-orange-600 border-orange-800/20",
      docker: "bg-blue-500/10 text-blue-550 border-blue-500/20",
      git: "bg-orange-500/10 text-orange-550 border-orange-500/20",
      sql: "bg-sky-650/10 text-sky-550 border-sky-650/20",
      nodejs: "bg-green-500/10 text-green-550 border-green-500/20",
      htmlcss: "bg-orange-500/10 text-orange-500 border-orange-500/20",
      tailwind: "bg-teal-500/10 text-teal-550 border-teal-500/20",
      flutter: "bg-sky-500/10 text-sky-550 border-sky-500/20",
      kotlin: "bg-purple-500/10 text-purple-500 border-purple-500/20",
      swift: "bg-orange-500/10 text-orange-500 border-orange-500/20",
      java: "bg-red-500/10 text-red-550 border-red-500/20",
      kubernetes: "bg-blue-600/10 text-blue-600 border-blue-600/20",
    };
    return colorMap[cat] || "bg-slate-500/10 text-slate-500 border-slate-500/20";
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center pt-24 px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-2xl overflow-hidden flex flex-col max-h-[60vh] animate-fade-in-up">
        {/* Search Input bar */}
        <div className="flex items-center px-4 py-4 border-b border-slate-200 dark:border-zinc-800">
          <Search className="w-5 h-5 text-slate-400 dark:text-slate-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Cari materi catatan (misal: Laravel, PDO, Vue, dst)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none pl-3 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-base"
          />
          <button 
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-400 dark:text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto p-4">
          {query.trim() === "" ? (
            <div className="text-center py-10 text-slate-400 dark:text-slate-500 text-sm">
              Ketikkan sesuatu untuk mencari materi pelajaran.
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-10 text-slate-400 dark:text-slate-500 text-sm">
              Tidak ditemukan hasil untuk &ldquo;<span className="font-semibold text-slate-600 dark:text-slate-300">{query}</span>&rdquo;.
            </div>
          ) : (
            <div className="space-y-2">
              <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-2 mb-2">
                Ditemukan ({filtered.length}) Materi
              </div>
              {filtered.map((m) => (
                <div
                  key={m.slug}
                  onClick={() => {
                    router.push(`/modules/${m.slug}`);
                    onClose();
                  }}
                  className="flex items-start gap-4 p-3 rounded-2xl border border-transparent hover:border-slate-200 dark:hover:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800/40 cursor-pointer transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${getCategoryColor(m.category)}`}>
                        {m.category}
                      </span>
                      <span className="text-[11px] text-slate-400 dark:text-slate-500">
                        Modul {m.moduleNumber}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 leading-snug group-hover:text-brand-500 transition-colors">
                      {m.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                      {m.description}
                    </p>
                  </div>
                  <div className="self-center p-1 rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-400 dark:text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
