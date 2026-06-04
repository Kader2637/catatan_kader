"use client";

import { useState, useEffect } from "react";
import { 
  Download, Search, ExternalLink, Laptop, ShieldCheck, ArrowLeft,
  ChevronLeft, ChevronRight
} from "lucide-react";
import Link from "next/link";

interface Tool {
  name: string;
  category: "editor" | "server" | "db" | "api" | "design" | "compiler" | "other";
  description: string;
  platforms: ("Windows" | "macOS" | "Linux")[];
  officialUrl: string;
  logo: string;
}

export default function ToolsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Reset to first page when category or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery]);

  const tools: Tool[] = [
    // --- IDE / Editor ---
    {
      name: "Visual Studio Code",
      category: "editor",
      description: "Code editor open-source yang sangat populer dari Microsoft, lengkap dengan ekosistem ekstensi yang sangat luas.",
      platforms: ["Windows", "macOS", "Linux"],
      officialUrl: "https://code.visualstudio.com/",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg"
    },
    {
      name: "Sublime Text",
      category: "editor",
      description: "Text editor super cepat, sangat ringan, dan minimalis untuk kebutuhan edit kode cepat tanpa memakan memori RAM.",
      platforms: ["Windows", "macOS", "Linux"],
      officialUrl: "https://www.sublimetext.com/",
      logo: "https://cdn.simpleicons.org/sublimetext/FF9800"
    },
    {
      name: "PhpStorm",
      category: "editor",
      description: "IDE profesional paling andal untuk PHP dan Laravel buatan JetBrains dengan intelijen kode mendalam, debugging, dan testing terintegrasi.",
      platforms: ["Windows", "macOS", "Linux"],
      officialUrl: "https://www.jetbrains.com/phpstorm/",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/phpstorm/phpstorm-original.svg"
    },
    {
      name: "WebStorm",
      category: "editor",
      description: "IDE paling powerful khusus JavaScript dan TypeScript, sangat dioptimasi untuk framework modern seperti React, Vue, Next.js, dan Angular.",
      platforms: ["Windows", "macOS", "Linux"],
      officialUrl: "https://www.jetbrains.com/webstorm/",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/webstorm/webstorm-original.svg"
    },
    {
      name: "Android Studio",
      category: "editor",
      description: "IDE resmi untuk pengembangan aplikasi Android yang dibangun di atas software IntelliJ IDEA milik JetBrains.",
      platforms: ["Windows", "macOS", "Linux"],
      officialUrl: "https://developer.android.com/studio",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/androidstudio/androidstudio-original.svg"
    },
    {
      name: "IntelliJ IDEA",
      category: "editor",
      description: "IDE Java dan Kotlin skala enterprise paling populer dengan dukungan penuh untuk framework Spring Boot, database tools, dan remote execution.",
      platforms: ["Windows", "macOS", "Linux"],
      officialUrl: "https://www.jetbrains.com/idea/",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/intellij/intellij-original.svg"
    },
    {
      name: "Xcode",
      category: "editor",
      description: "IDE resmi dari Apple untuk seluruh pengembangan software macOS, iOS, iPadOS, watchOS, dan tvOS menggunakan bahasa Swift.",
      platforms: ["macOS"],
      officialUrl: "https://developer.apple.com/xcode/",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/xcode/xcode-original.svg"
    },
    {
      name: "PyCharm",
      category: "editor",
      description: "IDE Python terfavorit untuk pengembangan AI, Data Science, script otomasi, dan web framework seperti Django dan Flask.",
      platforms: ["Windows", "macOS", "Linux"],
      officialUrl: "https://www.jetbrains.com/pycharm/",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pycharm/pycharm-original.svg"
    },

    // --- Local Server & Virtualization ---
    {
      name: "Laravel Herd",
      category: "server",
      description: "Environment development lokal PHP & Laravel super cepat yang tidak memerlukan konfigurasi server manual.",
      platforms: ["Windows", "macOS"],
      officialUrl: "https://herd.laravel.com/",
      logo: "https://cdn.simpleicons.org/laravel/FF2D20"
    },
    {
      name: "Laragon",
      category: "server",
      description: "Environment server lokal Windows yang sangat ringan, andal, dan instan untuk mengelola PHP, Node.js, Apache, Nginx, MySQL, dan PostgreSQL.",
      platforms: ["Windows"],
      officialUrl: "https://laragon.org/",
      logo: "https://cdn.simpleicons.org/apache/D22128"
    },
    {
      name: "XAMPP",
      category: "server",
      description: "Paket bundling web server Apache, PHP interpreter, dan database MariaDB klasik yang mudah digunakan lintas sistem operasi.",
      platforms: ["Windows", "macOS", "Linux"],
      officialUrl: "https://www.apachefriends.org/",
      logo: "https://cdn.simpleicons.org/xampp/FB7A24"
    },
    {
      name: "Docker Desktop",
      category: "server",
      description: "Platform virtualisasi container untuk membangun, menjalankan, dan menguji aplikasi secara konsisten di server lokal maupun production cluster.",
      platforms: ["Windows", "macOS", "Linux"],
      officialUrl: "https://www.docker.com/products/docker-desktop/",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg"
    },
    {
      name: "Oracle VM VirtualBox",
      category: "server",
      description: "Software virtualisasi gratis berbasis hypervisor untuk menjalankan sistem operasi tambahan (seperti Linux server) di dalam mesin lokal Anda.",
      platforms: ["Windows", "macOS", "Linux"],
      officialUrl: "https://www.virtualbox.org/",
      logo: "https://cdn.simpleicons.org/virtualbox/183A60"
    },

    // --- Database GUI ---
    {
      name: "TablePlus",
      category: "db",
      description: "GUI database native yang modern, cepat, dan ramah pengguna untuk mengelola MySQL, PostgreSQL, SQLite, Redis, SQL Server, dan MongoDB.",
      platforms: ["Windows", "macOS", "Linux"],
      officialUrl: "https://tableplus.com/",
      logo: "https://cdn.simpleicons.org/tableplus/2F2F2F"
    },
    {
      name: "DBeaver Community",
      category: "db",
      description: "Database client tools gratis, multiplatform, andal, dan mendukung semua database populer yang menggunakan koneksi JDBC.",
      platforms: ["Windows", "macOS", "Linux"],
      officialUrl: "https://dbeaver.io/",
      logo: "https://cdn.simpleicons.org/dbeaver/372C2B"
    },
    {
      name: "MySQL Workbench",
      category: "db",
      description: "Aplikasi GUI resmi dari Oracle untuk administrasi, desain, pemodelan ER-Diagram, dan kueri database MySQL server.",
      platforms: ["Windows", "macOS", "Linux"],
      officialUrl: "https://www.mysql.com/products/workbench/",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg"
    },
    {
      name: "pgAdmin 4",
      category: "db",
      description: "Platform administrasi dan manajemen web/desktop paling populer untuk database PostgreSQL server secara mendalam.",
      platforms: ["Windows", "macOS", "Linux"],
      officialUrl: "https://www.pgadmin.org/",
      logo: "https://cdn.simpleicons.org/postgresql/4169E1"
    },
    {
      name: "MongoDB Compass",
      category: "db",
      description: "GUI interaktif resmi dari MongoDB untuk melakukan kueri, memvisualisasikan dokumen JSON, mengelola indeks, dan memantau performa kluster database.",
      platforms: ["Windows", "macOS", "Linux"],
      officialUrl: "https://www.mongodb.com/products/tools/compass",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg"
    },
    {
      name: "Beekeeper Studio",
      category: "db",
      description: "Aplikasi SQL editor dan database manager open-source dengan UI modern yang sangat bersih, elegan, dan ramah pemula.",
      platforms: ["Windows", "macOS", "Linux"],
      officialUrl: "https://www.beekeeperstudio.io/",
      logo: "https://cdn.simpleicons.org/beekeeperstudio/FFCD00"
    },

    // --- API Client ---
    {
      name: "Postman",
      category: "api",
      description: "Platform kolaboratif untuk merancang, menguji, mendokumentasikan, mendesain, dan memantau RESTful API secara interaktif.",
      platforms: ["Windows", "macOS", "Linux"],
      officialUrl: "https://www.postman.com/",
      logo: "https://cdn.simpleicons.org/postman/FF6C37"
    },
    {
      name: "Insomnia",
      category: "api",
      description: "API Client yang ramping dan sangat cepat untuk menguji endpoint REST, GraphQL, GRPC, dan SOAP tanpa bloatware tambahan.",
      platforms: ["Windows", "macOS", "Linux"],
      officialUrl: "https://insomnia.rest/",
      logo: "https://cdn.simpleicons.org/insomnia/4000BF"
    },
    {
      name: "Hoppscotch",
      category: "api",
      description: "API Development Suite open-source berbasis web yang sangat ringan, cepat, dan responsif untuk pengujian endpoint API harian.",
      platforms: ["Windows", "macOS", "Linux"],
      officialUrl: "https://hoppscotch.io/",
      logo: "https://cdn.simpleicons.org/hoppscotch/31C48D"
    },

    // --- UI/UX Design ---
    {
      name: "Figma",
      category: "design",
      description: "Alat desain antarmuka grafis kolaboratif berbasis vektor untuk merancang mockup UI/UX website dan aplikasi seluler.",
      platforms: ["Windows", "macOS"],
      officialUrl: "https://www.figma.com/",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg"
    },
    {
      name: "Adobe XD",
      category: "design",
      description: "Alat desain UI/UX vektor klasik buatan Adobe untuk merancang layout aplikasi, wireframing, dan interactive prototyping.",
      platforms: ["Windows", "macOS"],
      officialUrl: "https://www.adobe.com/products/xd.html",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/adobexd/adobexd-plain.svg"
    },
    {
      name: "Sketch",
      category: "design",
      description: "Aplikasi editor grafik vektor legendaris khusus macOS yang dirancang khusus untuk desain produk UI/UX digital.",
      platforms: ["macOS"],
      officialUrl: "https://www.sketch.com/",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sketch/sketch-original.svg"
    },

    // --- Compiler & Runtimes ---
    {
      name: "Node.js runtime",
      category: "compiler",
      description: "Javascript runtime env asinkronus berbasis mesin V8 Chrome yang digunakan untuk menjalankan server js lokal.",
      platforms: ["Windows", "macOS", "Linux"],
      officialUrl: "https://nodejs.org/",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg"
    },
    {
      name: "Python Interpreter",
      category: "compiler",
      description: "Interpreter bahasa Python untuk menjalankan modul scripting, AI training model, backend server, dan utilitas automation.",
      platforms: ["Windows", "macOS", "Linux"],
      officialUrl: "https://www.python.org/",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"
    },
    {
      name: "Golang SDK",
      category: "compiler",
      description: "Compiler resmi bahasa pemrograman Go (Golang) untuk membangun microservice backend berkecepatan tinggi skala enterprise.",
      platforms: ["Windows", "macOS", "Linux"],
      officialUrl: "https://go.dev/",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg"
    },
    {
      name: "Rust Compiler",
      category: "compiler",
      description: "Toolchain Rust (rustc & cargo) untuk pemrograman sistem berkinerja tinggi, aman secara memori, dan bebas dari race-condition.",
      platforms: ["Windows", "macOS", "Linux"],
      officialUrl: "https://www.rust-lang.org/",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg"
    },
    {
      name: "PHP Interpreter",
      category: "compiler",
      description: "Mesin interpreter bahasa pemrograman PHP untuk memproses eksekusi script web dinamis di sisi server backend.",
      platforms: ["Windows", "macOS", "Linux"],
      officialUrl: "https://www.php.net/",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg"
    },

    // --- Dev Utilities ---
    {
      name: "Git VCS",
      category: "other",
      description: "Sistem pengontrol versi terdistribusi gratis dan open-source yang dirancang untuk menangani penulisan sejarah kode project.",
      platforms: ["Windows", "macOS", "Linux"],
      officialUrl: "https://git-scm.com/",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg"
    },
    {
      name: "Composer",
      category: "other",
      description: "Dependency manager resmi untuk PHP untuk menginstal, memperbarui, dan mengelola paket pustaka pihak ketiga di proyek Anda.",
      platforms: ["Windows", "macOS", "Linux"],
      officialUrl: "https://getcomposer.org/",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/composer/composer-line.svg"
    },
    {
      name: "Windows Terminal",
      category: "other",
      description: "Emulator terminal modern, cepat, sangat kustomisasi, dan powerful untuk pengguna baris perintah Windows PowerShell, WSL, dan Command Prompt.",
      platforms: ["Windows"],
      officialUrl: "https://learn.microsoft.com/en-us/windows/terminal/",
      logo: "https://cdn.simpleicons.org/windowsterminal/4D4D4D"
    },
    {
      name: "Termius",
      category: "other",
      description: "SSH client dan SFTP manager native yang modern untuk melakukan remote akses control server VPS secara aman.",
      platforms: ["Windows", "macOS", "Linux"],
      officialUrl: "https://termius.com/",
      logo: "https://cdn.simpleicons.org/gnuterminal/000000"
    },
    {
      name: "FileZilla",
      category: "other",
      description: "Klien FTP, FTPS, dan SFTP open-source lintas platform yang andal dan cepat untuk mengunggah file ke web hosting.",
      platforms: ["Windows", "macOS", "Linux"],
      officialUrl: "https://filezilla-project.org/",
      logo: "https://cdn.simpleicons.org/filezilla/BF0000"
    },
    {
      name: "PuTTY",
      category: "other",
      description: "SSH & Telnet client klasik super ringan untuk Windows untuk melakukan koneksi server console VPS.",
      platforms: ["Windows", "Linux"],
      officialUrl: "https://www.putty.org/",
      logo: "https://cdn.simpleicons.org/putty/0000FF"
    }
  ];

  const categories = [
    { id: "all", name: "Semua Kategori" },
    { id: "editor", name: "IDE / Editor" },
    { id: "compiler", name: "Bahasa & Compiler" },
    { id: "server", name: "Local Server / Virtual" },
    { id: "db", name: "Database GUI" },
    { id: "api", name: "API Client" },
    { id: "design", name: "UI/UX Design" },
    { id: "other", name: "Utilitas Dev" },
  ];

  // Filtering
  const filteredTools = tools.filter(tool => {
    const matchesCategory = activeCategory === "all" || tool.category === activeCategory;
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredTools.length / itemsPerPage);
  const paginatedTools = filteredTools.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="relative pt-28 pb-20 px-6 bg-slate-50/50 dark:bg-zinc-950/50 min-h-screen">
      {/* Background Glow Blobs */}
      <div className="absolute top-[-5%] left-[-5%] w-96 h-96 bg-brand-500/5 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute top-[30%] right-[-5%] w-96 h-96 bg-violet-500/5 rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-10">
        
        {/* Header */}
        <section className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-wider rounded-lg">
            <Laptop className="w-4 h-4" />
            <span>Referensi Aplikasi IT</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            IT Developers Toolkit
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Daftar lengkap aplikasi IDE, lokal server, database manager, API client, compiler bahasa pemrograman, dan utilitas wajib yang menunjang produktivitas software engineering harian.
          </p>
        </section>

        {/* Search & Tabs */}
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-center bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800/80 p-4 rounded-3xl shadow-sm">
          
          {/* Categories */}
          <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
                  activeCategory === cat.id
                    ? "bg-brand-500 text-white shadow-sm shadow-brand-500/10"
                    : "bg-slate-50 hover:bg-slate-100 dark:bg-zinc-800 dark:hover:bg-zinc-700/80 text-slate-600 dark:text-slate-300"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full lg:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              placeholder="Cari tools aplikasi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-brand-500 transition-colors"
            />
          </div>
        </div>

        {/* Tools Grid */}
        {filteredTools.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200/50 dark:border-zinc-800/80 p-8 shadow-xs">
            <ShieldCheck className="w-12 h-12 text-amber-500 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">Aplikasi Tidak Ditemukan</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Tidak ada aplikasi yang cocok dengan pencarian atau filter kategori Anda.</p>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedTools.map((tool) => (
                <div
                  key={tool.name}
                  className="bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 dark:hover:border-zinc-700 transition-all duration-300 hover:shadow-md group"
                >
                  <div className="space-y-4">
                    {/* Tool icon & header */}
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-slate-50/50 dark:bg-zinc-950 flex items-center justify-center border border-slate-150 dark:border-zinc-850 group-hover:scale-105 transition-transform duration-300 shrink-0">
                        <img 
                          src={tool.logo} 
                          alt={tool.name} 
                          className="w-7 h-7 object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(tool.name) + "&background=4f46e5&color=fff";
                          }}
                        />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-200 truncate leading-snug">
                          {tool.name}
                        </h3>
                        <span className="text-[9px] font-mono font-bold uppercase text-brand-500 px-1.5 py-0.5 rounded bg-brand-500/10 border border-brand-500/20">
                          {tool.category === "editor" ? "IDE / Editor" : 
                           tool.category === "server" ? "Local Server" : 
                           tool.category === "db" ? "Database GUI" : 
                           tool.category === "api" ? "API Client" : 
                           tool.category === "design" ? "UI/UX Design" : 
                           tool.category === "compiler" ? "Compiler/SDK" : "Utilitas"}
                        </span>
                      </div>
                    </div>

                    <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed line-clamp-3">
                      {tool.description}
                    </p>
                  </div>

                  {/* Footer specs & link */}
                  <div className="pt-4 border-t border-slate-100 dark:border-zinc-800/80 mt-4 flex items-center justify-between">
                    <div className="flex gap-1">
                      {tool.platforms.map((p) => (
                        <span
                          key={p}
                          className="text-[9px] font-semibold text-slate-400 dark:text-slate-500 px-1.5 py-0.5 rounded bg-slate-50 dark:bg-zinc-850"
                        >
                          {p}
                        </span>
                      ))}
                    </div>

                    <a
                      href={tool.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-brand-600 dark:text-brand-400 flex items-center gap-1 hover:text-brand-700 transition-colors"
                    >
                      <span>Download</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 pt-4">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-500 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-500 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Back Link */}
        <div className="text-center pt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl text-xs font-bold hover:bg-slate-100 transition-all shadow-sm group"
          >
            <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:-translate-x-0.5 transition-transform" />
            <span>Kembali ke Beranda</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
