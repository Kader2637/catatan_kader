"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();

  // Hide footer on module pages
  const isModulePage = pathname && pathname.startsWith("/modules/");

  return (
    <footer className={`bg-white dark:bg-zinc-900 border-t border-slate-200 dark:border-zinc-800 py-16 transition-colors duration-300 ${isModulePage ? "hidden" : ""}`}>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* Branding & Summary */}
        <div className="md:col-span-6 space-y-4">
          <Link href="/" className="flex items-center gap-2.5 group w-fit">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-brand-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">
              Catatan Kader
            </span>
          </Link>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md leading-relaxed">
            Platform catatan digital pribadi dan pembelajaran publik untuk mendokumentasikan perjalanan rekayasa perangkat lunak, penyelesaian masalah algoritma, dan desain sistem modern.
          </p>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-3">
          <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">
            Navigasi
          </h4>
          <ul className="space-y-2.5 text-sm font-semibold text-slate-600 dark:text-slate-400">
            <li>
              <Link href="/" className="hover:text-brand-500 dark:hover:text-brand-400 transition-colors">
                Beranda
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-brand-500 dark:hover:text-brand-400 transition-colors">
                Tentang Saya
              </Link>
            </li>
            <li>
              <Link href="/tools" className="hover:text-brand-500 dark:hover:text-brand-400 transition-colors">
                Referensi Tools
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-brand-500 dark:hover:text-brand-400 transition-colors">
                Hubungi Kami
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact/Connect */}
        <div className="md:col-span-3">
          <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">
            Hubungi
          </h4>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
            Malang, Jawa Timur, Indonesia
          </p>
          <div className="flex items-center gap-3">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-700 transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-700 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a 
              href="mailto:abdulkader0126@gmail.com" 
              className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-700 transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-slate-200 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-slate-500 dark:text-slate-400">
        <p>&copy; {new Date().getFullYear()} Catatan Kader. All rights reserved.</p>
        <p>Deployment Active &bull; Managed by Abdul Kader</p>
      </div>
    </footer>
  );
}
