## Middleware & Proteksi Route di Next.js App Router

Keamanan rute (*route protection*) dan pengelolaan sesi otentikasi adalah aspek krusial dalam website dinamis. Next.js menyediakan berkas `middleware.ts` yang berjalan di sisi Edge Server untuk mencegat permintaan sebelum mencapai server/halaman utama.

---

## 1. Mengenal Next.js Middleware

Middleware di Next.js memungkinkan Anda menjalankan kode server sebelum sebuah permintaan diselesaikan:
- Berjalan di level Edge (sangat cepat dan dekat dengan pengguna).
- Dapat membaca, menulis, dan mengubah header permintaan (*request headers*) serta cookies.
- Sangat ideal untuk otentikasi sesi, redirect rute dinamis, A/B Testing, dan Geo-targeting.

> [!NOTE]
> File middleware wajib diletakkan langsung di dalam direktori `src/` (sejajar dengan folder `app/`) dengan nama file `middleware.ts`.

---

## 2. Implementasi Proteksi Route Dasar

Berikut adalah contoh skema proteksi rute halaman admin dashboard. Jika pengguna belum memiliki token otentikasi di dalam cookie, middleware akan langsung melakukan pengalihan (*redirect*) ke halaman login.

### Contoh Berkas `src/middleware.ts`:
```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 1. Ambil session token dari cookies
  const token = request.cookies.get('session_token')?.value;

  // 2. Evaluasi apakah pengguna mengakses rute yang dilindungi
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');

  if (isAdminRoute && !token) {
    // Redirect paksa ke halaman login jika token kosong
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Lanjutkan request jika otentikasi lolos
  return NextResponse.next();
}

// 3. Konfigurasi Matcher untuk menyaring rute yang perlu diproses
export const config = {
  matcher: ['/admin/:path*'],
};
```

---

## 3. Optimasi Security Header di Middleware

Selain proteksi rute, Middleware juga sering digunakan untuk menyuntikkan security headers secara global guna memproteksi aplikasi dari serangan XSS (Cross-Site Scripting) dan clickjacking.

### Contoh Menyuntikkan Security Headers:
```typescript
export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Set Content Security Policy & Security Headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  return response;
}
```

> [!WARNING]
> Harap hindari pemrosesan komputasi berat, kueri database besar, atau pembacaan file lokal (fs) di dalam `middleware.ts` karena middleware harus berkinerja sangat cepat untuk mencegah terjadinya latensi tinggi pada waktu muat halaman (*page load latency*).
