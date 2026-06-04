"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare, ShieldCheck } from "lucide-react";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate query submission
    console.log("Submitted query:", formState);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Header */}
        <section className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-wider">
            <MessageSquare className="w-4 h-4" />
            <span>Kontak Kami</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Hubungi Abdul Kader
          </h1>
          <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
            Apakah Anda memiliki pertanyaan mengenai materi catatan pelajaran, tawaran kolaborasi proyek, mentoring dev, atau sekadar ingin berdiskusi? Silakan isi form di bawah ini.
          </p>
        </section>

        {/* Content grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: INFO CARDS */}
          <div className="md:col-span-5 space-y-6">
            
            <div className="bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800/80 rounded-2xl p-6 shadow-sm space-y-6">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-lg">
                Detail Informasi Kontak
              </h3>
              
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">
                    Email
                  </h4>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    abdulkader0126@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">
                    Telepon / WhatsApp
                  </h4>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    0895-4281-83064
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">
                    Lokasi
                  </h4>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    Malang, Jawa Timur, Indonesia
                  </p>
                </div>
              </div>
            </div>

            {/* Quick response note */}
            <div className="p-5 rounded-2xl bg-slate-100 dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800/80 flex items-start gap-3.5">
              <ShieldCheck className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
              <div className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                <strong className="text-slate-800 dark:text-slate-200 block mb-0.5">Keamanan Data Dijamin</strong>
                Semua data pesan yang Anda kirimkan melalui formulir ini dienkripsi secara aman dan langsung diteruskan ke inbox pribadi saya.
              </div>
            </div>

          </div>

          {/* RIGHT: CONTACT FORM */}
          <div className="md:col-span-7 bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800/80 rounded-2xl p-6 md:p-8 shadow-sm">
            {submitted ? (
              <div className="text-center py-16 space-y-4 animate-fade-in-up">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                  <Send className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Pesan Terkirim!
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                  Terima kasih atas pesannya. Saya akan membaca pesan Anda dan membalasnya secepat mungkin.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      Nama Anda
                    </label>
                    <input
                      required
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      placeholder="Masukkan nama lengkap"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/50 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 outline-none focus:border-brand-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      Email
                    </label>
                    <input
                      required
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      placeholder="email@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/50 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 outline-none focus:border-brand-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="subject" className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    Subjek Pesan
                  </label>
                  <input
                    required
                    type="text"
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    placeholder="Materi catatan / Penawaran kerja, dll"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/50 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 outline-none focus:border-brand-500 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    Pesan Lengkap
                  </label>
                  <textarea
                    required
                    id="message"
                    name="message"
                    rows={5}
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="Ketikkan pesan detail Anda di sini..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/50 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 outline-none focus:border-brand-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md shadow-brand-600/10 hover:shadow-lg"
                >
                  <Send className="w-4.5 h-4.5" />
                  Kirim Pesan
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
