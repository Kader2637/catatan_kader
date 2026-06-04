"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, BookOpen, Clock, Calendar, Image as ImageIcon, 
  FileText, Play, CheckCircle2, AlertCircle, Save, Eye, Edit3
} from "lucide-react";
import { saveModuleAction } from "@/app/actions/moduleActions";

// Define the IT Path to Courses mapping
interface CourseOption {
  id: string;
  title: string;
  defaultBanner: string;
}

interface PathOption {
  id: string;
  title: string;
  courses: CourseOption[];
}

const pathOptions: PathOption[] = [
  {
    id: "backend",
    title: "Back-End Developer",
    courses: [
      { id: "php", title: "PHP OOP & Database", defaultBanner: "/asset/image/leangue_pemrograman/php.png" },
      { id: "laravel", title: "Laravel Framework", defaultBanner: "/asset/image/course/laravel/instalasi.jpeg" },
    ],
  },
  {
    id: "frontend",
    title: "Front-End Developer",
    courses: [
      { id: "react", title: "React Library", defaultBanner: "/asset/image/course/react/setup.webp" },
      { id: "vue", title: "Vue.js Framework", defaultBanner: "/asset/image/course/vue/vue.webp" },
    ],
  },
  {
    id: "fullstack",
    title: "Full-Stack Developer",
    courses: [
      { id: "next", title: "Next.js App Router", defaultBanner: "/asset/image/course/next/next.webp" },
    ],
  },
];

export default function NewModulePage() {
  const router = useRouter();
  
  // Form states
  const [selectedPathId, setSelectedPathId] = useState("backend");
  const [selectedCourseId, setSelectedCourseId] = useState("php");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [moduleNumber, setModuleNumber] = useState(1);
  const [readTime, setReadTime] = useState("15 Menit");
  const [date, setDate] = useState("");
  const [bannerImage, setBannerImage] = useState("/asset/image/leangue_pemrograman/php.png");
  const [content, setContent] = useState("");
  
  // UI States
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successSlug, setSuccessSlug] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Set default date to today's date formatted (e.g. Juni 04, 2026)
  useEffect(() => {
    const months = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    const today = new Date();
    const formattedDate = `${months[today.getMonth()]} ${String(today.getDate()).padStart(2, "0")}, ${today.getFullYear()}`;
    setDate(formattedDate);
  }, []);

  // Update sub-select (course) when main path changes
  const handlePathChange = (pathId: string) => {
    setSelectedPathId(pathId);
    const path = pathOptions.find(p => p.id === pathId);
    if (path && path.courses.length > 0) {
      const defaultCourse = path.courses[0];
      setSelectedCourseId(defaultCourse.id);
      setBannerImage(defaultCourse.defaultBanner);
    }
  };

  // Update default banner when course changes
  const handleCourseChange = (courseId: string) => {
    setSelectedCourseId(courseId);
    const path = pathOptions.find(p => p.id === selectedPathId);
    const course = path?.courses.find(c => c.id === courseId);
    if (course) {
      setBannerImage(course.defaultBanner);
    }
  };

  // Basic client-side Markdown rendering for Preview Tab
  const renderMarkdown = (md: string) => {
    if (!md.trim()) {
      return `<p class="text-slate-400 dark:text-zinc-500 italic">Belum ada konten yang ditulis. Tulis konten Markdown Anda di tab "Tulis Konten".</p>`;
    }

    let html = md
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Code Blocks: ```lang ... ```
    html = html.replace(/```([a-z]*)\n([\s\S]*?)```/gi, (match, lang, code) => {
      return `<pre class="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs overflow-x-auto my-4 border border-slate-800"><div class="flex justify-between items-center text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-2 border-b border-slate-800 pb-1"><span>${lang || 'code'}</span></div><code>${code}</code></pre>`;
    });

    // Alert Note Box
    html = html.replace(/^\s*>\s*\[!NOTE\]\s*([\s\S]*?)(?=\n\n|\n[^\s>])/gm, (match, content) => {
      const text = content.replace(/\n/g, "<br />").trim();
      return `<div class="p-5 bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 rounded-r-xl my-6 text-sm text-slate-700 dark:text-blue-200"><strong>Note:</strong> ${text}</div>`;
    });

    // Alert Warning Box
    html = html.replace(/^\s*>\s*\[!WARNING\]\s*([\s\S]*?)(?=\n\n|\n[^\s>])/gm, (match, content) => {
      const text = content.replace(/\n/g, "<br />").trim();
      return `<div class="p-5 bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-500 rounded-r-xl my-6 text-sm text-slate-700 dark:text-amber-200"><strong>Warning:</strong> ${text}</div>`;
    });

    // Generic Blockquotes
    html = html.replace(/^\s*>\s*([\s\S]*?)(?=\n\n|\n[^\s>])/gm, (match, content) => {
      const text = content.replace(/\n/g, "<br />").trim();
      return `<blockquote class="border-l-4 border-slate-300 dark:border-zinc-750 pl-4 italic my-6 text-slate-600 dark:text-slate-400">${text}</blockquote>`;
    });

    // Headers
    let headingIdCounter = 0;
    html = html.replace(/^## (.*?)$/gm, (match, text) => {
      const cleanText = text.trim();
      const id = cleanText.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || `h2-${headingIdCounter++}`;
      return `<h2 id="${id}" class="text-xl font-extrabold text-slate-900 dark:text-white mt-8 mb-4 pb-1 border-b border-slate-100 dark:border-zinc-800">${cleanText}</h2>`;
    });

    html = html.replace(/^### (.*?)$/gm, (match, text) => {
      const cleanText = text.trim();
      const id = cleanText.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || `h3-${headingIdCounter++}`;
      return `<h3 id="${id}" class="text-lg font-bold text-slate-800 dark:text-zinc-200 mt-6 mb-3">${cleanText}</h3>`;
    });

    // Lists
    html = html.replace(/^\s*-\s+(.*?)$/gm, "<li>$1</li>");
    html = html.replace(/(<li>[\s\S]*?<\/li>)+/g, '<ul class="list-disc pl-6 my-4 space-y-1 text-slate-700 dark:text-slate-300">$&</ul>');

    html = html.replace(/^\s*\d+\.\s+(.*?)$/gm, "<li>$1</li>");
    html = html.replace(/(<ul>)?(<li>[\s\S]*?<\/li>)+(<\/ul>)?/g, (match) => {
      if (match.startsWith("<ul")) return match;
      return `<ol class="list-decimal pl-6 my-4 space-y-1 text-slate-700 dark:text-slate-300">${match}</ol>`;
    });

    // Text formatting
    html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");
    html = html.replace(/`([^`]+)`/g, `<code class="bg-slate-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-rose-500 font-mono text-xs font-semibold">$1</code>`);
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" class="text-brand-500 hover:underline">$1</a>');

    // Paragraph wrapping
    const paragraphs = html.split(/\n\n+/);
    const parsedParagraphs = paragraphs.map(p => {
      p = p.trim();
      if (!p) return "";
      if (/^<(pre|ul|ol|div|blockquote|h2|h3)/i.test(p)) {
        return p;
      }
      return `<p class="my-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm">${p.replace(/\n/g, "<br />")}</p>`;
    });

    return parsedParagraphs.join("\n");
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !description.trim()) {
      setErrorMessage("Judul, deskripsi, dan konten Markdown wajib diisi!");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessSlug(null);

    try {
      const response = await saveModuleAction({
        courseId: selectedCourseId,
        title,
        description,
        moduleNumber: Number(moduleNumber),
        readTime,
        date,
        bannerImage,
        content
      });

      if (response.success && response.slug) {
        setSuccessSlug(response.slug);
        // Reset form except defaults
        setTitle("");
        setDescription("");
        setContent("");
        setModuleNumber(prev => prev + 1);
      } else {
        setErrorMessage(response.error || "Gagal menyimpan modul.");
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Terjadi kesalahan sistem saat menyimpan.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get current sub-courses based on active main path
  const currentCourses = pathOptions.find(p => p.id === selectedPathId)?.courses || [];

  return (
    <div className="relative pt-28 pb-20 px-6 bg-slate-50/50 dark:bg-zinc-950/50 min-h-screen">
      {/* Background Glow Blobs */}
      <div className="absolute top-[-5%] left-[-5%] w-96 h-96 bg-brand-500/5 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute top-[30%] right-[-5%] w-96 h-96 bg-violet-500/5 rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-8">
        
        {/* Breadcrumb & Title */}
        <div className="space-y-3">
          <Link 
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-brand-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-8 h-8 text-brand-500" />
                Tambah Modul Pembelajaran
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Tulis modul pembelajaran baru. Konten akan disimpan dalam format **Markdown (.md)** secara native di Next.js.
              </p>
            </div>
          </div>
        </div>

        {/* Success Alert */}
        {successSlug && (
          <div className="p-5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <p className="font-extrabold text-sm">Modul Berhasil Ditambahkan!</p>
                <p className="text-xs opacity-90 mt-0.5">Syllabus data courses.ts telah terupdate dan file markdown berhasil disimpan.</p>
              </div>
            </div>
            <Link
              href={`/modules/${successSlug}`}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors self-start sm:self-center"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              Buka Modul Baru
            </Link>
          </div>
        )}

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 rounded-2xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <p className="font-extrabold text-sm">Gagal Menyimpan Modul</p>
              <p className="text-xs opacity-90 mt-0.5">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Form and Preview Layout */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form Fields */}
          <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800/80 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
            <h2 className="text-sm font-black uppercase tracking-wider text-slate-400 dark:text-zinc-500 pb-2 border-b border-slate-100 dark:border-zinc-800/60">
              Formulir Modul Baru
            </h2>

            {/* Select & Sub-Select for Path/Courses */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Kategori Utama (Alur Belajar IT)
                </label>
                <select
                  value={selectedPathId}
                  onChange={(e) => handlePathChange(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950 text-sm text-slate-800 dark:text-slate-100 outline-none focus:border-brand-500 transition-colors"
                >
                  {pathOptions.map((path) => (
                    <option key={path.id} value={path.id}>
                      {path.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Sub-Kategori (Course)
                </label>
                <select
                  value={selectedCourseId}
                  onChange={(e) => handleCourseChange(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950 text-sm text-slate-800 dark:text-slate-100 outline-none focus:border-brand-500 transition-colors"
                >
                  {currentCourses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Title & Description */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Judul Modul
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Pengenalan Server & Request Lifecycle"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950 text-sm text-slate-800 dark:text-slate-100 outline-none focus:border-brand-500 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Deskripsi Singkat
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="Berikan rangkuman singkat mengenai apa yang dipelajari di modul ini..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950 text-sm text-slate-800 dark:text-slate-100 outline-none focus:border-brand-500 transition-colors resize-none"
                />
              </div>
            </div>

            {/* Module Configs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Nomor Modul (Syllabus Index)
                </label>
                <input
                  type="number"
                  min="0"
                  required
                  value={moduleNumber}
                  onChange={(e) => setModuleNumber(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950 text-sm text-slate-800 dark:text-slate-100 outline-none focus:border-brand-500 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Estimasi Waktu Baca
                </label>
                <input
                  type="text"
                  required
                  placeholder="15 Menit"
                  value={readTime}
                  onChange={(e) => setReadTime(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950 text-sm text-slate-800 dark:text-slate-100 outline-none focus:border-brand-500 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Tanggal Rilis
                </label>
                <input
                  type="text"
                  required
                  placeholder="Juni 04, 2026"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950 text-sm text-slate-800 dark:text-slate-100 outline-none focus:border-brand-500 transition-colors"
                />
              </div>
            </div>

            {/* Banner Image */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <ImageIcon className="w-3.5 h-3.5 text-slate-400" />
                <span>Banner Image (File Path / URL)</span>
              </label>
              <input
                type="text"
                required
                value={bannerImage}
                onChange={(e) => setBannerImage(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950 text-sm text-slate-800 dark:text-slate-100 outline-none focus:border-brand-500 transition-colors"
              />
            </div>

            {/* Markdown Content Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                  <span>Konten Materi (Markdown)</span>
                </label>
                <span className="text-[10px] text-slate-400 font-mono">Mendukung format Markdown standar</span>
              </div>
              <textarea
                required
                rows={12}
                placeholder={`Tulis materi menggunakan format Markdown.\n\nContoh:\n## 1. Pendahuluan\nIni adalah teks pendahuluan. Anda bisa menulis **tebal** atau *miring*.\n\n## 2. Contoh Code\n\`\`\`javascript\nconst test = "Catatan Kader";\nconsole.log(test);\n\`\`\`\n\n> [!NOTE]\n> Ini adalah box catatan berwarna biru.\n\n> [!WARNING]\n> Ini adalah box peringatan berwarna kuning.`}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950 text-sm text-slate-800 dark:text-slate-100 font-mono outline-none focus:border-brand-500 transition-colors"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-2">
              <Link
                href="/"
                className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800 text-xs font-bold text-slate-600 dark:text-slate-300 transition-colors"
              >
                Batalkan
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 disabled:bg-brand-600/60 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-brand-600/10 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Menyimpan...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Simpan Modul</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* Right Column: Interactive Editor Tabs & Live Preview */}
          <div className="lg:col-span-5 space-y-6 sticky top-28">
            
            {/* Live Preview / Tab Controller */}
            <div className="bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800/80 rounded-3xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-800/80 pb-3">
                <span className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-zinc-500">
                  Preview Tampilan Live
                </span>
                
                <div className="flex gap-1.5 p-1 bg-slate-50 dark:bg-zinc-950 border border-slate-200/50 dark:border-zinc-800/50 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setActiveTab("write")}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all flex items-center gap-1 ${
                      activeTab === "write"
                        ? "bg-white dark:bg-zinc-900 text-brand-500 dark:text-brand-400 shadow-sm"
                        : "text-slate-500 hover:text-slate-800 dark:hover:text-white"
                    }`}
                  >
                    <Edit3 className="w-3 h-3" />
                    Tulis
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("preview")}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all flex items-center gap-1 ${
                      activeTab === "preview"
                        ? "bg-white dark:bg-zinc-900 text-brand-500 dark:text-brand-400 shadow-sm"
                        : "text-slate-500 hover:text-slate-800 dark:hover:text-white"
                    }`}
                  >
                    <Eye className="w-3 h-3" />
                    Preview
                  </button>
                </div>
              </div>

              {/* Tab Content Display */}
              {activeTab === "write" ? (
                <div className="space-y-4 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  <p className="font-extrabold text-slate-700 dark:text-slate-300">
                    Panduan Menulis Catatan Modern:
                  </p>
                  <ul className="list-disc pl-4 space-y-1.5">
                    <li>Gunakan <code className="bg-slate-100 dark:bg-zinc-800 px-1 py-0.5 rounded text-rose-500 font-mono">## Judul</code> untuk heading bagian utama.</li>
                    <li>Gunakan <code className="bg-slate-100 dark:bg-zinc-800 px-1 py-0.5 rounded text-rose-500 font-mono">### Subjudul</code> untuk sub-bagian.</li>
                    <li>Untuk membungkus baris kode gunakan block format <code className="bg-slate-100 dark:bg-zinc-800 px-1 py-0.5 rounded text-rose-500 font-mono">```javascript</code> di awal dan <code className="bg-slate-100 dark:bg-zinc-800 px-1 py-0.5 rounded text-rose-500 font-mono">```</code> di akhir.</li>
                    <li>
                      <strong>Note Alert Box:</strong>
                      <pre className="bg-slate-50 dark:bg-zinc-950 p-2 rounded-lg font-mono text-[10px] text-slate-500 border border-slate-100 dark:border-zinc-850 mt-1">
                        {`> [!NOTE]\n> Ini adalah tips atau catatan.`}
                      </pre>
                    </li>
                    <li>
                      <strong>Warning Alert Box:</strong>
                      <pre className="bg-slate-50 dark:bg-zinc-950 p-2 rounded-lg font-mono text-[10px] text-slate-500 border border-slate-100 dark:border-zinc-850 mt-1">
                        {`> [!WARNING]\n> Ini adalah warning.`}
                      </pre>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="bg-slate-50 dark:bg-zinc-950/40 p-4 border border-slate-100 dark:border-zinc-900 rounded-2xl min-h-[300px] max-h-[500px] overflow-y-auto">
                  <article 
                    className="prose prose-sm dark:prose-invert max-w-none text-slate-800 dark:text-zinc-100"
                    dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
                  />
                </div>
              )}
            </div>

            {/* Module Card Preview */}
            <div className="bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800/80 rounded-2xl p-5 shadow-sm space-y-4">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-zinc-500 block">
                Visualisasi Card Explorer
              </span>
              
              <div className="group border border-slate-200/50 dark:border-zinc-800/85 rounded-2xl p-5 bg-slate-50/50 dark:bg-zinc-950/20 shadow-xs flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border bg-brand-500/10 text-brand-500 border-brand-500/20">
                      {selectedCourseId}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      Modul {moduleNumber}
                    </span>
                  </div>
                  
                  <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-200 leading-snug">
                    {title || "Judul Modul Anda"}
                  </h3>

                  <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed line-clamp-2">
                    {description || "Deskripsi modul Anda akan dirender di sini..."}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-zinc-800/60 mt-4 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{readTime} baca</span>
                  </span>
                  
                  <span className="text-xs font-bold text-brand-500 flex items-center gap-0.5">
                    Mulai Baca
                  </span>
                </div>
              </div>
            </div>

          </div>

        </form>

      </div>
    </div>
  );
}
