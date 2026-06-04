## Optimasi Website Next.js: Image, Font, & SEO

Membangun website dengan performa optimal dan visibilitas SEO yang prima merupakan hal wajib di era web modern. Next.js menyediakan fitur bawaan kelas dunia untuk menangani optimasi media, tipografi, dan mesin pencari (SEO) secara otomatis.

---

## 1. Optimasi Gambar dengan `next/image`

Komponen `<Image />` bawaan Next.js memperluas tag HTML `<img>` standar dengan fitur optimasi otomatis:
- **Resizing Otomatis**: Menyajikan ukuran gambar yang sesuai berdasarkan viewport pengguna.
- **Modern Format**: Mengubah gambar menjadi format modern (seperti WebP atau AVIF) secara dinamis.
- **Lazy Loading**: Hanya mengunduh gambar ketika akan masuk ke dalam viewport layar.
- **Visual Stability**: Mencegah terjadinya *Layout Shift* (CLS) saat gambar dimuat.

### Contoh Implementasi:
```tsx
import Image from 'next/image';

export default function HeroSection() {
  return (
    <div className="hero-container">
      <Image
        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f"
        alt="Analitik SEO dan Optimasi Website"
        width={800}
        height={500}
        priority // memuat gambar hero secara instan (tanpa lazy loading)
        className="rounded-2xl object-cover"
      />
    </div>
  );
}
```

> [!NOTE]
> Properti `priority` wajib ditambahkan pada gambar yang muncul di atas lipatan layar (*above the fold*) seperti banner utama atau gambar hero agar LCP (Largest Contentful Paint) bernilai maksimal.

---

## 2. Optimasi Font dengan `next/font`

Next.js mengintegrasikan Google Fonts secara lokal tanpa perlu memuat script pihak ketiga di browser:
- Font diunduh saat build-time dan disimpan di server lokal Anda.
- Nol request jaringan tambahan ke server Google Fonts di browser, mencegah render blocking.
- Pengaturan fallback CSS otomatis (`swap`).

### Contoh Integrasi Font di Root Layout (`layout.tsx`):
```tsx
import { Plus_Jakarta_Sans } from 'next/font/google';

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jakarta',
});

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={jakartaSans.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
```

---

## 3. Konfigurasi Metadata & SEO API

Next.js App Router menyederhanakan konfigurasi SEO dengan Metadata API. Anda dapat mendefinisikan meta tag statis maupun dinamis secara native.

### Konfigurasi Metadata Statis:
```typescript
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Panduan Optimasi Next.js - Catatan Kader',
  description: 'Pelajari dasar-dasar optimasi Core Web Vitals, Image, Font, dan SEO di Next.js App Router.',
  openGraph: {
    title: 'Panduan Optimasi Next.js',
    description: 'Tingkatkan performa web Anda.',
    images: ['/images/og-image.jpg'],
  },
};
```

> [!WARNING]
> Metadata API hanya dapat dieksekusi di dalam berkas **Server Components** (bukan Client Components dengan `"use client"`).
