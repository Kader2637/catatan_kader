"use client";

import { MapPin, Briefcase, Mail, Phone, Calendar, ArrowUpRight, GraduationCap } from "lucide-react";

export default function AboutPage() {
  const stats = [
    { value: "4+ Tahun", label: "Pengalaman Kerja" },
    { value: "25+", label: "Proyek Selesai" },
    { value: "10+", label: "Klien Terbantu" },
  ];

  const primaryStack = [
    "🚀 Laravel - PHP 8 - MySQL",
    "⚛️ React - Next.js - TS",
    "🟢 Node.js - Express",
    "🐘 PostgreSQL - Redis",
    "🐳 Docker - Kubernetes",
    "☁️ AWS - GCP",
  ];

  const experiences = [
    {
      role: "Founder & CEO",
      company: "Aether Nusantara",
      period: "2026 — Sekarang",
      description: "Mendirikan dan memimpin visi Aether Nusantara dalam memperluas literasi teknologi, inovasi digital, serta pengembangan ekosistem talenta software engineering modern.",
    },
    {
      role: "Co-Founder & CTO",
      company: "PT Kodingin Digital Nusantara",
      period: "2025 — Sekarang",
      description: "Memimpin produk & teknologi; orkestrasi roadmap, arsitektur, dan kualitas rilis aplikasi skala enterprise.",
    },
    {
      role: "Senior Developer",
      company: "PT Elshad Teknologi Indonesia",
      period: "2025",
      description: "Pengembangan fitur inti & optimasi performa backend; kolaborasi lintas tim untuk memastikan sistem berjalan andal.",
    },
    {
      role: "HRD & Tech Interviewer",
      company: "PT Kodingin Digital Nusantara",
      period: "2025",
      description: "Melakukan rekrutmen, proses interview teknis, dan mentoring program pengembangan talenta digital.",
    },
    {
      role: "Junior Developer & Mentor",
      company: "PT Humma Teknologi Indonesia",
      period: "2023 — 2024",
      description: "Pengembangan aplikasi web full-stack & mentoring mahasiswa magang; membangun dasar praktik engineering yang baik.",
    },
  ];

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative">
          
          {/* LEFT PANEL: AVATAR CARD */}
          <aside className="lg:col-span-4 lg:sticky lg:top-32 space-y-6">
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-sm border border-slate-200/50 dark:border-zinc-800/80 flex flex-col gap-6">
              
              {/* Photo */}
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 dark:bg-zinc-800 border border-slate-200/50 dark:border-zinc-700/80 group">
                <img 
                  src="https://www.abdkader.my.id/assets/foto/im.png" 
                  alt="Abdul Kader" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://ui-avatars.com/api/?name=Abdul+Kader&background=4f46e5&color=fff";
                  }}
                />
                <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm text-[10px] font-bold text-slate-700 dark:text-slate-300 rounded-lg shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Open to remote & on-site
                  </span>
                </div>
              </div>

              {/* Bio Fields */}
              <ul className="flex flex-col gap-4 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-center gap-3">
                  <MapPin className="w-4.5 h-4.5 text-slate-400 dark:text-slate-500 shrink-0" />
                  <span>Malang, Jawa Timur, Indonesia</span>
                </li>
                <li className="flex items-center gap-3">
                  <Briefcase className="w-4.5 h-4.5 text-slate-400 dark:text-slate-500 shrink-0" />
                  <span>Founder @ Aether Nusantara & CTO @ PT Kodingin</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4.5 h-4.5 text-slate-400 dark:text-slate-500 shrink-0" />
                  <a href="mailto:abdulkader0126@gmail.com" className="hover:text-brand-500 transition-colors">
                    abdulkader0126@gmail.com
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4.5 h-4.5 text-slate-400 dark:text-slate-500 shrink-0" />
                  <span>0895-4281-83064</span>
                </li>
              </ul>

              {/* Counter Grid */}
              <div className="grid grid-cols-3 gap-2 py-4 border-y border-slate-100 dark:border-zinc-800">
                {stats.map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <h5 className="font-extrabold text-lg text-slate-900 dark:text-white leading-none mb-1">
                      {stat.value}
                    </h5>
                    <p className="text-[10px] text-slate-500 font-medium">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Talk buttons */}
              <a 
                href="mailto:abdulkader0126@gmail.com"
                className="w-full bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md shadow-brand-600/10 hover:shadow-lg"
              >
                Hubungi Saya
              </a>

            </div>
          </aside>

          {/* RIGHT PANEL: EXPERIENCE & SKILLS */}
          <main className="lg:col-span-8 space-y-12">
            
            {/* Header info */}
            <section className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Abdul Kader
              </h1>
              <h2 className="text-lg md:text-xl font-semibold text-brand-600 dark:text-brand-400">
                Founder of Aether Nusantara &bull; CTO @ Kodingin
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base">
                Lebih dari <strong className="text-slate-900 dark:text-white">4 tahun</strong> mendedikasikan diri membangun solusi perangkat lunak yang <strong className="text-slate-900 dark:text-white">terukur, aman,</strong> dan <strong className="text-slate-900 dark:text-white">berdampak langsung bagi bisnis</strong>. Memiliki spesialisasi dalam siklus hidup rekayasa penuh mulai dari penemuan masalah, arsitektur sistem, implementasi kode bersih, hingga jaminan observabilitas pasca-rilis.
              </p>
            </section>

            {/* Core Values */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { 
                  title: "Performance & DX", 
                  desc: "Optimasi Web Vitals, caching agresif, dan pembentukan alur kerja pengembang (Developer Experience) yang efisien."
                },
                {
                  title: "Security & Reliability",
                  desc: "Implementasi standar otentikasi ganda, logging transaksi yang presisi, rate-limiting, dan strategi rollback tanggap."
                },
                {
                  title: "Scalable Architecture",
                  desc: "Merancang transisi yang mulus dari monolitik terstruktur rapi ke arsitektur layanan mikro (microservices) modular."
                }
              ].map((value, idx) => (
                <div 
                  key={idx} 
                  className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-200/50 dark:border-zinc-800/80 shadow-sm"
                >
                  <h4 className="font-extrabold text-slate-900 dark:text-white text-sm mb-2">
                    {value.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {value.desc}
                  </p>
                </div>
              ))}
            </section>

            {/* Technology Stack Tags */}
            <section className="space-y-4">
              <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                Primary Stack
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {primaryStack.map((stack) => (
                  <span 
                    key={stack}
                    className="px-4 py-2 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 shadow-sm"
                  >
                    {stack}
                  </span>
                ))}
              </div>
            </section>

            {/* Timeline Experience */}
            <section className="space-y-6">
              <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                Riwayat Pengalaman
              </h3>
              <div className="relative border-l-2 border-slate-200 dark:border-zinc-800 ml-3 pl-6 space-y-8">
                {experiences.map((exp, idx) => (
                  <div key={idx} className="relative">
                    {/* Timeline bullet indicator */}
                    <div className="absolute w-3 h-3 bg-brand-500 rounded-full -left-[31px] top-1.5 ring-4 ring-slate-50 dark:ring-zinc-950" />
                    
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-1 gap-1">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {exp.role} <span className="text-slate-400 dark:text-slate-500 font-normal">| {exp.company}</span>
                      </h4>
                      <span className="flex items-center gap-1.5 text-xs text-slate-400 font-mono shrink-0">
                        <Calendar className="w-3.5 h-3.5" />
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-2 max-w-2xl">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Quick Action Button Box */}
            <section className="pt-6 border-t border-slate-200 dark:border-zinc-800 flex flex-wrap gap-4">
              <a
                href="mailto:abdulkader0126@gmail.com"
                className="px-6 py-3 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 hover:border-brand-500 dark:hover:border-brand-400 text-slate-700 dark:text-slate-300 text-sm font-semibold rounded-xl transition-all duration-300 shadow-sm flex items-center gap-2 group"
              >
                <span>Jadwalkan Diskusi</span>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-brand-500 dark:group-hover:text-brand-400 transition-colors" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 hover:border-brand-500 dark:hover:border-brand-400 text-slate-700 dark:text-slate-300 text-sm font-semibold rounded-xl transition-all duration-300 shadow-sm flex items-center gap-2 group"
              >
                <span>Lihat Portofolio GitHub</span>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-brand-500 dark:group-hover:text-brand-400 transition-colors" />
              </a>
            </section>

          </main>

        </div>
      </div>
    </div>
  );
}
