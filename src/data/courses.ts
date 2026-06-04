export interface ModuleMetadata {
  slug: string; // matches the .md file name without extension
  title: string;
  description: string;
  category: string;
  moduleNumber: number;
  readTime: string;
  date: string;
  bannerImage: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  color: string;
  gradient: string;
  icon: string;
  modules: ModuleMetadata[];
}

export const coursesData: Course[] = [
  {
    id: "laravel",
    title: "Laravel Framework",
    description: "Kuasai framework PHP paling populer untuk membangun backend aplikasi web modern skala enterprise.",
    color: "text-red-600 dark:text-red-400",
    gradient: "from-red-500 to-rose-600",
    icon: "laravel",
    modules: [
      {
        slug: "laravel-setup",
        title: "Standardisasi Environment Laravel Skala Produksi",
        description: "Langkah-langkah penting optimasi composer, security environment, caching, dan deployment server.",
        category: "laravel",
        moduleNumber: 1,
        readTime: "8 Menit",
        date: "Desember 14, 2025",
        bannerImage: "https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&q=80&w=800"
      },
      {
        slug: "laravel-1",
        title: "Instalasi & Setup Environment",
        description: "Langkah pertama memulai project. Belajar instalasi Composer, mengatur file .env, serta mempersiapkan environment lokal.",
        category: "laravel",
        moduleNumber: 2,
        readTime: "20 Menit",
        date: "Maret 29, 2026",
        bannerImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800"
      },
      {
        slug: "laravel-2",
        title: "Deep Dive: Migration & Eloquent Model",
        description: "Merancang struktur database menggunakan Migration dan memahami bagaimana Model Eloquent berinteraksi dengan tabel.",
        category: "laravel",
        moduleNumber: 3,
        readTime: "25 Menit",
        date: "Maret 30, 2026",
        bannerImage: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=800"
      },
      {
        slug: "laravel-3",
        title: "Menguasai Routing, Controller & Blade Template",
        description: "Menghubungkan alur aplikasi MVC. Mengatur rute URL, logika di Controller, dan merender tampilan dinamis dengan Blade.",
        category: "laravel",
        moduleNumber: 4,
        readTime: "18 Menit",
        date: "Maret 31, 2026",
        bannerImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800"
      },
      {
        slug: "laravel-4",
        title: "Implementasi CRUD: Create & Read Data",
        description: "Mulai mengolah data nyata. Mengambil data dari database (Read) dan membuat form untuk menyisipkan data baru (Create).",
        category: "laravel",
        moduleNumber: 5,
        readTime: "22 Menit",
        date: "April 01, 2026",
        bannerImage: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800"
      },
      {
        slug: "laravel-5",
        title: "Menyelesaikan CRUD: Update, Delete & Validasi",
        description: "Menyempurnakan aplikasi dengan fitur Edit (Update), Hapus (Delete), dan menjaga integritas data menggunakan Form Validation.",
        category: "laravel",
        moduleNumber: 6,
        readTime: "20 Menit",
        date: "April 02, 2026",
        bannerImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800"
      }
    ]
  },
  {
    id: "php",
    title: "PHP OOP & Database",
    description: "Pahami dasar Object-Oriented Programming (OOP) PHP dan interaksi database yang aman dari SQL Injection.",
    color: "text-indigo-600 dark:text-indigo-400",
    gradient: "from-indigo-500 to-blue-600",
    icon: "php",
    modules: [
      {
        slug: "php-1",
        title: "Pondasi OOP PHP",
        description: "Pahami konsep Class, Object, Inheritance, Encapsulation, dan Interface pada PHP. Bekal utama sebelum ke Framework.",
        category: "php",
        moduleNumber: 1,
        readTime: "15 Menit",
        date: "Maret 10, 2026",
        bannerImage: "https://images.unsplash.com/photo-1599507593499-a3f7f7d9a224?auto=format&fit=crop&q=80&w=800"
      },
      {
        slug: "php-2",
        title: "Koneksi Database PDO",
        description: "Belajar menghubungkan PHP ke MySQL secara dinamis menggunakan PDO dan melakukan penarikan data secara efisien.",
        category: "php",
        moduleNumber: 2,
        readTime: "12 Menit",
        date: "Maret 12, 2026",
        bannerImage: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=800"
      },
      {
        slug: "php-3",
        title: "Keamanan & SQL Injection",
        description: "Panduan aman menyimpan data menggunakan Prepared Statements pada PDO untuk menghindari eksploitasi peretas.",
        category: "php",
        moduleNumber: 3,
        readTime: "15 Menit",
        date: "Maret 15, 2026",
        bannerImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800"
      }
    ]
  },
  {
    id: "react",
    title: "React Library",
    description: "Membangun antarmuka modern yang cepat, terstruktur, dan modular menggunakan ekosistem React.",
    color: "text-cyan-600 dark:text-cyan-400",
    gradient: "from-cyan-400 to-blue-500",
    icon: "react",
    modules: [
      {
        slug: "react-vite",
        title: "Modern Frontend Execution: Vite & TypeScript",
        description: "Panduan mendalam arsitektur frontend menggunakan Vite, TypeScript, dan setup environment scale enterprise.",
        category: "react",
        moduleNumber: 1,
        readTime: "15 Menit",
        date: "Maret 26, 2026",
        bannerImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800"
      },
      {
        slug: "react-1",
        title: "Setup React Vite & Fundamental Hooks",
        description: "Menginstal proyek React menggunakan Vite. Memahami konsep dasar komponen, props, dan state melalui useState Hook.",
        category: "react",
        moduleNumber: 2,
        readTime: "18 Menit",
        date: "Maret 28, 2026",
        bannerImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800"
      },
      {
        slug: "react-2",
        title: "Fetching Data API dengan useEffect",
        description: "Belajar memanggil REST API eksternal menggunakan Fetch API & useEffect Hook untuk me-render data ke antarmuka React.",
        category: "react",
        moduleNumber: 3,
        readTime: "15 Menit",
        date: "Maret 30, 2026",
        bannerImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800"
      },
      {
        slug: "react-3",
        title: "Handling Form untuk Create & Update",
        description: "Menguasai Controlled Components pada React. Membaca input user, validasi data, dan mengirimkan payload ke API server.",
        category: "react",
        moduleNumber: 4,
        readTime: "16 Menit",
        date: "April 02, 2026",
        bannerImage: "https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&q=80&w=800"
      }
    ]
  },
  {
    id: "vue",
    title: "Vue.js Framework",
    description: "Pelajari framework progresif Vue 3 dengan Composition API untuk reaktivitas UI yang instan.",
    color: "text-emerald-600 dark:text-emerald-400",
    gradient: "from-emerald-400 to-teal-500",
    icon: "vue",
    modules: [
      {
        slug: "vue-1",
        title: "Pengenalan Vue 3 & Composition API",
        description: "Membangun antarmuka interaktif menggunakan sintaks Composition API Vue 3 yang elegan dan reusable.",
        category: "vue",
        moduleNumber: 1,
        readTime: "14 Menit",
        date: "April 05, 2026",
        bannerImage: "https://images.unsplash.com/photo-1620121692029-d088224ddc74?auto=format&fit=crop&q=80&w=800"
      },
      {
        slug: "vue-2",
        title: "Menampilkan Data via Axios di Vue",
        description: "Implementasi lifecycle onMounted dan pustaka Axios untuk mengambil data API, lalu menampilkannya dengan v-for.",
        category: "vue",
        moduleNumber: 2,
        readTime: "16 Menit",
        date: "April 08, 2026",
        bannerImage: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=800"
      },
      {
        slug: "vue-3",
        title: "Mengirim Data Form & v-model",
        description: "Memanfaatkan two-way data binding dengan v-model. Menangani pengiriman event form POST ke server API.",
        category: "vue",
        moduleNumber: 3,
        readTime: "15 Menit",
        date: "April 10, 2026",
        bannerImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800"
      }
    ]
  },
  {
    id: "next",
    title: "Next.js App Router",
    description: "Pelajari framework React untuk Web skala produksi dengan Server Components, layouts, dan Server Actions.",
    color: "text-slate-900 dark:text-slate-200",
    gradient: "from-slate-800 to-zinc-950",
    icon: "nextjs",
    modules: [
      {
        slug: "next-1",
        title: "Routing & Fetching di App Router",
        description: "Menggunakan fitur React Server Components di Next.js. Menarik data API langsung di sisi server secara aman.",
        category: "next",
        moduleNumber: 1,
        readTime: "15 Menit",
        date: "April 15, 2026",
        bannerImage: "https://images.unsplash.com/photo-1618478539423-c06a4a09b30c?auto=format&fit=crop&q=80&w=800"
      },
      {
        slug: "next-2",
        title: "Mutasi Data dengan Server Actions",
        description: "Melakukan operasi modifikasi data Create, Update, dan Delete di sisi server langsung tanpa router API terpisah.",
        category: "next",
        moduleNumber: 2,
        readTime: "18 Menit",
        date: "April 18, 2026",
        bannerImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800"
      },
      {
        slug: "next-3",
        title: "Optimasi Image, Font, dan SEO di Next.js",
        description: "Belajar implementasi komponen next/image, next/font, metadata API, dan sitemap dinamis untuk optimasi performa dan SEO.",
        category: "next",
        moduleNumber: 3,
        readTime: "12 Menit",
        date: "April 21, 2026",
        bannerImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
      },
      {
        slug: "next-4",
        title: "Middleware & Proteksi Route Next.js",
        description: "Implementasi middleware untuk otentikasi session, rate-limiting, redirect dinamis, dan proteksi route di sisi edge server.",
        category: "next",
        moduleNumber: 4,
        readTime: "15 Menit",
        date: "April 24, 2026",
        bannerImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800"
      }
    ]
  },
  {
    id: "python",
    title: "Python Programming",
    description: "Kuasai dasar scripting, tipe data, fungsi, OOP, dan dasar automasi data menggunakan Python 3.",
    color: "text-blue-600 dark:text-blue-400",
    gradient: "from-blue-500 to-yellow-500",
    icon: "code",
    modules: [
      {
        slug: "python-1",
        title: "Dasar Pemrograman Python",
        description: "Pengenalan variabel, control flow if-else, looping, dan penulisan syntax Python yang bersih dan Pythonic.",
        category: "python",
        moduleNumber: 1,
        readTime: "12 Menit",
        date: "Mei 01, 2026",
        bannerImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800"
      },
      {
        slug: "python-2",
        title: "Scripting & Otomasi dengan Python",
        description: "Cara membaca/menulis berkas lokal, memanipulasi CSV, dan melakukan web scraping dasar secara instan.",
        category: "python",
        moduleNumber: 2,
        readTime: "15 Menit",
        date: "Mei 03, 2026",
        bannerImage: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=800"
      }
    ]
  },
  {
    id: "javascript",
    title: "JavaScript Modern",
    description: "Pahami standardisasi ECMAScript modern (ES6+) untuk pondasi kuat framework JS modern.",
    color: "text-amber-500 dark:text-amber-400",
    gradient: "from-amber-400 to-orange-500",
    icon: "code",
    modules: [
      {
        slug: "js-1",
        title: "Modern ES6+ Features",
        description: "Menguasai let/const, Arrow Functions, Template Literals, Destructuring, dan Rest/Spread operators.",
        category: "javascript",
        moduleNumber: 1,
        readTime: "10 Menit",
        date: "Mei 05, 2026",
        bannerImage: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&q=80&w=800"
      },
      {
        slug: "js-2",
        title: "Asynchronous JavaScript & Promises",
        description: "Memahami callback hell, Promises, serta sintaks Async/Await untuk memanggil API secara efisien.",
        category: "javascript",
        moduleNumber: 2,
        readTime: "14 Menit",
        date: "Mei 07, 2026",
        bannerImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800"
      }
    ]
  },
  {
    id: "typescript",
    title: "TypeScript Advanced",
    description: "Tingkatkan keamanan tipe data kode JS Anda dengan static typing, interfaces, dan generics.",
    color: "text-blue-700 dark:text-blue-500",
    gradient: "from-blue-600 to-indigo-700",
    icon: "code",
    modules: [
      {
        slug: "ts-1",
        title: "Generics & Advanced Types",
        description: "Merancang antarmuka data reusable menggunakan Type Generics, Mapped Types, dan Conditional Types.",
        category: "typescript",
        moduleNumber: 1,
        readTime: "15 Menit",
        date: "Mei 10, 2026",
        bannerImage: "https://images.unsplash.com/photo-1516116211223-5c359a36298a?auto=format&fit=crop&q=80&w=800"
      }
    ]
  },
  {
    id: "golang",
    title: "Go / Golang Web",
    description: "Pelajari sintaks dasar Go, concurrency, dan pembuatan HTTP server native yang super cepat.",
    color: "text-sky-500 dark:text-sky-400",
    gradient: "from-sky-400 to-cyan-600",
    icon: "code",
    modules: [
      {
        slug: "go-1",
        title: "Goroutines & Concurrency",
        description: "Implementasi persaingan komputasi menggunakan Goroutines, Channels, sync.WaitGroup, dan Mutex.",
        category: "golang",
        moduleNumber: 1,
        readTime: "18 Menit",
        date: "Mei 12, 2026",
        bannerImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800"
      }
    ]
  },
  {
    id: "rust",
    title: "Rust Language System",
    description: "Pahami sistem memori teraman tanpa Garbage Collector menggunakan Ownership & Borrowing.",
    color: "text-amber-800 dark:text-amber-600",
    gradient: "from-orange-800 to-zinc-800",
    icon: "code",
    modules: [
      {
        slug: "rust-1",
        title: "Ownership & Borrowing System",
        description: "Menguasai aturan ketat kompilasi Rust mengenai alokasi memori Stack/Heap, references, dan Lifetimes.",
        category: "rust",
        moduleNumber: 1,
        readTime: "20 Menit",
        date: "Mei 15, 2026",
        bannerImage: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&q=80&w=800"
      }
    ]
  },
  {
    id: "docker",
    title: "Docker & Container",
    description: "Standardisasi environment deployment aplikasi menggunakan docker image dan container terisolasi.",
    color: "text-blue-500 dark:text-blue-400",
    gradient: "from-blue-400 to-sky-600",
    icon: "database",
    modules: [
      {
        slug: "docker-1",
        title: "Dockerizing Web Application",
        description: "Menulis Dockerfile, membangun multi-container services dengan Docker Compose, dan optimasi image layers.",
        category: "docker",
        moduleNumber: 1,
        readTime: "15 Menit",
        date: "Mei 18, 2026",
        bannerImage: "https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&q=80&w=800"
      }
    ]
  },
  {
    id: "git",
    title: "Git & GitHub VCS",
    description: "Pahami pengontrol versi kode untuk kolaborasi tim developer yang aman tanpa konflik.",
    color: "text-orange-600 dark:text-orange-500",
    gradient: "from-orange-500 to-red-600",
    icon: "code",
    modules: [
      {
        slug: "git-1",
        title: "Menguasai Git Branching & Merging",
        description: "Logika git checkout, branching workflow, resolve merge conflicts, cherry-pick, dan rebasing.",
        category: "git",
        moduleNumber: 1,
        readTime: "10 Menit",
        date: "Mei 20, 2026",
        bannerImage: "https://images.unsplash.com/photo-1556075798-482a1444a5eb?auto=format&fit=crop&q=80&w=800"
      }
    ]
  },
  {
    id: "sql",
    title: "SQL & Database Relation",
    description: "Rancang skema relational database ternormalisasi dan tulis kueri SQL yang efisien.",
    color: "text-sky-700 dark:text-sky-500",
    gradient: "from-sky-600 to-indigo-800",
    icon: "database",
    modules: [
      {
        slug: "sql-1",
        title: "Optimasi Query & Indexing MySQL",
        description: "Cara mengoptimalkan JOIN query lambat menggunakan index, query analyzer EXPLAIN, dan normalisasi database.",
        category: "sql",
        moduleNumber: 1,
        readTime: "16 Menit",
        date: "Mei 22, 2026",
        bannerImage: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=800"
      }
    ]
  },
  {
    id: "nodejs",
    title: "Node.js Backend",
    description: "Bangun REST API scalable, cepat, dan non-blocking I/O menggunakan runtime Node.js.",
    color: "text-green-600 dark:text-green-500",
    gradient: "from-green-500 to-emerald-600",
    icon: "code",
    modules: [
      {
        slug: "nodejs-1",
        title: "REST API menggunakan Express & TypeScript",
        description: "Membangun boilerplate API server dengan Express, integrasi router, parsing request, middleware, dan validation.",
        category: "nodejs",
        moduleNumber: 1,
        readTime: "18 Menit",
        date: "Mei 25, 2026",
        bannerImage: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&q=80&w=800"
      }
    ]
  },
  {
    id: "htmlcss",
    title: "HTML5 & CSS3 Layouts",
    description: "Pondasi utama layout website responsif dan ramah aksesibilitas menggunakan markup CSS modern.",
    color: "text-orange-500 dark:text-orange-400",
    gradient: "from-orange-400 to-pink-500",
    icon: "code",
    modules: [
      {
        slug: "htmlcss-1",
        title: "Slicing Figma ke HTML/CSS dengan Grid & Flexbox",
        description: "Strategi slicing layout UI mockup dari Figma ke code HTML semantik dan CSS Flexbox/Grid responsif.",
        category: "htmlcss",
        moduleNumber: 1,
        readTime: "15 Menit",
        date: "Mei 27, 2026",
        bannerImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800"
      }
    ]
  },
  {
    id: "tailwind",
    title: "Tailwind CSS Framework",
    description: "Bangun UI interface super cepat tanpa meninggalkan file HTML menggunakan class utility CSS.",
    color: "text-teal-500 dark:text-teal-400",
    gradient: "from-teal-400 to-cyan-500",
    icon: "code",
    modules: [
      {
        slug: "tailwind-1",
        title: "Kustomisasi Tailwind Config & Utility-First Workflow",
        description: "Konfigurasi kustom theme colors, font families, extend spacing, dan optimasi JIT compiler Tailwind.",
        category: "tailwind",
        moduleNumber: 1,
        readTime: "12 Menit",
        date: "Mei 29, 2026",
        bannerImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800"
      }
    ]
  },
  {
    id: "flutter",
    title: "Flutter Mobile App",
    description: "Bangun aplikasi mobile native untuk Android dan iOS secara instan dari satu codebase menggunakan Dart.",
    color: "text-sky-500 dark:text-sky-400",
    gradient: "from-sky-400 to-blue-500",
    icon: "code",
    modules: [
      {
        slug: "flutter-1",
        title: "State Management BLoC & Clean Architecture",
        description: "Arsitektur kode Flutter berskala besar menggunakan BLoC pattern, dependency injection, dan pemisahan data layer.",
        category: "flutter",
        moduleNumber: 1,
        readTime: "22 Menit",
        date: "Juni 01, 2026",
        bannerImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800"
      }
    ]
  },
  {
    id: "kotlin",
    title: "Kotlin Android Dev",
    description: "Pelajari development aplikasi Android modern native menggunakan Kotlin dan Jetpack Compose.",
    color: "text-purple-600 dark:text-purple-500",
    gradient: "from-purple-500 to-indigo-600",
    icon: "code",
    modules: [
      {
        slug: "kotlin-1",
        title: "Modern Android UI dengan Jetpack Compose",
        description: "Cara merancang UI android deklaratif menggunakan Jetpack Compose, state handling, dan navigasi Compose.",
        category: "kotlin",
        moduleNumber: 1,
        readTime: "20 Menit",
        date: "Juni 03, 2026",
        bannerImage: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&q=80&w=800"
      }
    ]
  },
  {
    id: "swift",
    title: "Swift iOS Developer",
    description: "Rancang aplikasi premium Apple modern khusus iOS menggunakan bahasa pemrograman Swift.",
    color: "text-orange-600 dark:text-orange-500",
    gradient: "from-orange-500 to-rose-500",
    icon: "code",
    modules: [
      {
        slug: "swift-1",
        title: "Declarative UI menggunakan SwiftUI",
        description: "Belajar merancang antarmuka responsif, animations, state/bindings, dan integrasi view model di SwiftUI.",
        category: "swift",
        moduleNumber: 1,
        readTime: "18 Menit",
        date: "Juni 05, 2026",
        bannerImage: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=800"
      }
    ]
  },
  {
    id: "java",
    title: "Java Spring Boot",
    description: "Kembangkan backend enterprise microservices scalable dan secure menggunakan Spring Boot.",
    color: "text-red-700 dark:text-red-500",
    gradient: "from-red-600 to-orange-700",
    icon: "code",
    modules: [
      {
        slug: "java-1",
        title: "Arsitektur Microservices dengan Spring Cloud",
        description: "Belajar service discovery, API Gateway, circuit breaker, dan distributed configuration server di Spring.",
        category: "java",
        moduleNumber: 1,
        readTime: "25 Menit",
        date: "Juni 07, 2026",
        bannerImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800"
      }
    ]
  },
  {
    id: "kubernetes",
    title: "Kubernetes Orchestration",
    description: "Kelola deployment container skala raksasa secara terotomasi di cluster Kubernetes (k8s).",
    color: "text-blue-600 dark:text-blue-500",
    gradient: "from-blue-600 to-indigo-800",
    icon: "database",
    modules: [
      {
        slug: "kubernetes-1",
        title: "Orkestrasi Container dengan Pods, Services & Ingress",
        description: "Konfigurasi Kubernetes manifest, scaling pods dinamis, service networking internal, dan routing domain via Ingress.",
        category: "kubernetes",
        moduleNumber: 1,
        readTime: "24 Menit",
        date: "Juni 10, 2026",
        bannerImage: "https://images.unsplash.com/photo-1667372393086-9d4001d51cf1?auto=format&fit=crop&q=80&w=800"
      }
    ]
  }
];

export const allModules = coursesData.flatMap(course => course.modules);

export function getModuleBySlug(slug: string): ModuleMetadata | undefined {
  return allModules.find(m => m.slug === slug);
}

export function getCourseByModuleSlug(slug: string): Course | undefined {
  return coursesData.find(c => c.modules.some(m => m.slug === slug));
}

export function isModuleUnlocked(course: Course, moduleSlug: string, completedLessons: string[]): boolean {
  const modules = [...course.modules].sort((a, b) => a.moduleNumber - b.moduleNumber);
  const targetIndex = modules.findIndex(m => m.slug === moduleSlug);
  if (targetIndex <= 0) return true; // First module is always unlocked
  
  for (let i = 0; i < targetIndex; i++) {
    if (!completedLessons.includes(modules[i].slug)) {
      return false;
    }
  }
  return true;
}
