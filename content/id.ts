/**
 * Indonesian copy.
 *
 * Written as Indonesian, not as English with the words swapped: the owner is a
 * native speaker, so the sentences are rebuilt around how the thought would
 * actually be said. Technical terms that Indonesian developers use verbatim
 * (machine learning, computer vision, layout, repo) stay as they are;
 * translating them into bureaucratic Indonesian would read worse, not better.
 *
 * Proper nouns — Bimbel KAIFA, RoastMate, Polinema, PBL, and every technology
 * name — are untouched.
 */

import type { Dictionary } from "@/content/site";

export const id: Dictionary = {
  meta: {
    title: "Ahmad Kevin — Kepin · Mahasiswa Informatika & Developer",
    description:
      "Portofolio Ahmad Kevin (Kepin), mahasiswa Informatika di Polinema yang membangun proyek web dan mobile.",
    ogDescription:
      "Mahasiswa Informatika & Developer. Proyek web dan mobile, serta pengalaman di baliknya.",
  },

  ui: {
    opensInNewTab: "(terbuka di tab baru)",
  },

  nav: {
    ariaLabel: "Bagian",
    skipToProjects: "Langsung ke proyek",
    languageLabel: "Bahasa",
    labels: {
      about: "Tentang",
      work: "Karya",
      arsenal: "Keahlian",
      beyond: "Cerita",
      contact: "Kontak",
    },
  },

  hero: {
    eyebrow: "Mahasiswa Informatika — Portofolio",
    knownAs: "dikenal sebagai",
    intro:
      "Saya suka mempelajari hal baru, mudah beradaptasi, dan selalu terbuka untuk obrolan seru, fakta menarik yang tak terduga, atau secangkir kopi.",
    roleLabel: "Peran",
    baseLabel: "Domisili",
    role: "Mahasiswa Informatika & Developer",
    cta: "Jelajahi Proyek",
    nameAria: (fullName, nickname) => `${fullName}, dikenal sebagai ${nickname}`,
  },

  about: {
    eyebrow: "Sedikit tentang saya",
    heading: "Hai, saya Kevin.",
    paragraphs: [
      "Saya selalu penasaran bagaimana sesuatu bekerja, entah itu teknologi baru, masalah yang belum pernah saya temui, atau fakta acak yang menarik untuk digali. Saya suka belajar lewat eksperimen, menyesuaikan diri dengan situasi baru, dan mengubah ide menjadi sesuatu yang praktis.",
      "Di luar coding, saya pernah memandu acara, mengajar, dan terlibat dengan berbagai komunitas. Pengalaman itu mengajari saya berkomunikasi dengan orang yang berbeda-beda, tetap luwes, dan melihat tantangan dari sudut pandang lain. Pola pikir itu yang saya bawa saat belajar, berkolaborasi, dan membangun sesuatu.",
    ],
    seeWork: "Lihat karya",
    getInTouch: "Hubungi saya",
    portraitLabel: "potret",
  },

  manifesto: {
    words: ["INOVASI", "DENGAN", "TUJUAN"],
    kicker:
      "Sebuah fitur pantas dibuat kalau dia menjawab pertanyaan yang benar-benar ditanyakan orang. Itu standar yang saya pegang.",
  },

  projects: {
    eyebrow: "Proyek pilihan",
    headingLead: "Yang sedang saya bangun,",
    headingTail: "dan sudah sampai mana.",
    note: "Bimbel KAIFA sudah tayang. RoastMate masih dalam pengembangan.",
    liveDemo: "Demo langsung",
    items: {
      kaifa: {
        kind: "Platform web",
        status: "Tayang",
        summary:
          "Situs web Bimbel KAIFA, sebuah bimbingan belajar: halaman publik, plus panel admin untuk urusan operasional harian.",
        sections: [
          {
            label: "Halaman publik",
            body: "Program, fasilitas, dan FAQ, dengan pendaftaran lewat WhatsApp.",
          },
          {
            label: "Panel admin",
            body: "Data siswa, pengajar, sesi kelas, absensi, dan pembayaran dalam satu tempat.",
          },
        ],
        shots: {
          "/images/kaifa/kaifa-home.png": {
            caption: "Halaman Publik",
            alt: "Halaman depan Bimbel KAIFA: judul \u201cBelajar lebih percaya diri, bertumbuh setiap hari\u201d di samping foto siswa yang sedang belajar, dengan tombol pendaftaran WhatsApp.",
          },
          "/images/kaifa/kaifa-admin.png": {
            caption: "Dasbor Admin",
            alt: "Dasbor admin Bimbel KAIFA: jumlah pengajar, siswa, dan kelas, daftar sesi hari ini, serta menu samping untuk absensi, laporan, dan bank soal.",
          },
          "/images/kaifa/kaifa-admin-kas.png": {
            caption: "Manajemen Kas",
            alt: "Halaman kas Bimbel KAIFA: total pemasukan, total pengeluaran, dan sisa saldo di atas tabel transaksi yang bisa difilter berdasarkan kategori dan nominal.",
          },
        },
      },
      roastmate: {
        kind: "Aplikasi mobile",
        status: "Dalam pengembangan",
        summary:
          "Aplikasi Flutter untuk memeriksa biji kopi dengan computer vision. Antarmuka kamera dan layar pemindaian sudah jadi; sisi machine learning-nya masih dikembangkan.",
        sections: [
          {
            label: "Yang sudah jalan",
            body: "Kerangka aplikasi, navigasi, dan layar pemindaian sudah jadi. Plugin kamera membuka viewfinder langsung, dan hasil jepretan tersimpan di perangkat.",
          },
          {
            label: "Machine learning",
            body: "Classifier tingkat sangrai sudah dilatih dengan empat kelas dan diekspor ke TensorFlow Lite, tapi belum tersambung ke aplikasi. Belum ada inferensi yang berjalan pada foto hasil jepretan.",
          },
          {
            label: "Belum dibuat",
            body: "Deteksi cacat dan klasifikasi per biji masih direncanakan, belum diimplementasikan. Layar riwayat masih membaca data placeholder, bukan dari basis data.",
          },
        ],
        shots: {
          "/images/roastmate/roastmate-camera.png": {
            caption: "Antarmuka Kamera",
            alt: "Antarmuka kamera RoastMate di Android: viewfinder langsung di dalam bingkai pemindaian, dengan label mode pindai, penanda pencahayaan, tingkat zoom, tombol galeri dan flash, serta tombol jepret.",
          },
          "/images/roastmate/roastmate-home.png": {
            caption: "Beranda Aplikasi",
            alt: "Beranda RoastMate di Android: sapaan, kartu komposisi biji kopi dengan diagram donat, dua kartu ringkasan, panel \u201cScan Batch Baru\u201d dengan tombol kamera, dan bilah bawah Beranda, Analisis, dan Seduh. Angka di layar ini masih nilai placeholder, bukan hasil analisis.",
          },
        },
      },
    },
  },

  gallery: {
    navLabel: "Navigasi tangkapan layar",
    previousAria: "Gambar sebelumnya",
    nextAria: "Gambar selanjutnya",
    groupAria: (projectName) => `Tangkapan layar ${projectName}`,
    counter: (current, total, caption) =>
      `Tangkapan layar ${current} dari ${total}: ${caption}`,
  },

  arsenal: {
    eyebrow: "Arsenal teknis",
    heading: "Indeksnya.",
    description:
      "Setiap entri ditandai posisinya: sudah digunakan, masih disiapkan, terbukti lewat eksperimen, atau baru direncanakan.",
    statusKeyLabel: "Keterangan status teknologi",
    statusLabels: {
      used: "Digunakan",
      "in-progress": "Sedang dikerjakan",
      experiment: "Eksperimen",
      planned: "Direncanakan",
    },
    toolsLabel: "Alat & Alur Kerja",
    toolsNote:
      "Mengelola perubahan kode dengan Git dan berkolaborasi melalui GitHub.",
    atlas: {
      eyebrow: "Atlas teknologi",
      hint: "Jelajahi per domain",
      entriesLabel: "entri",
      domainsLabel: "domain",
      categoriesAria: "Kategori teknologi",
      rangeOf: "dari",
      categories: {
        web: {
          title: "Pengembangan Web",
          note: "Antarmuka, layout, dan animasi.",
        },
        mobile: {
          title: "Pengembangan Mobile",
          note: "RoastMate, aplikasi Flutter yang masih dikembangkan.",
        },
        ml: {
          title: "Machine Learning & Computer Vision",
          note: "Riset RoastMate: sudah dilatih dan dievaluasi, belum dirilis. Performanya buruk pada foto di luar data latih.",
        },
        backend: {
          title: "Data & Backend",
          note: "Pekerjaan sisi server di dua proyek.",
        },
      },
      contexts: {
        "Next.js": "App Router, situs ini",
        React: "Arsitektur komponen",
        TypeScript: "Strict mode, props bertipe",
        "Tailwind CSS": "Token desain, layout",
        GSAP: "Koreografi scroll",
        ScrollTrigger: "Timeline yang di-scrub",
        Flutter: "Kerangka aplikasi, layar, tema",
        Dart: "Bahasa aplikasi",
        Riverpod: "State dan dependency injection",
        camera: "Pratinjau langsung, simpan ke file",
        sqflite: "Skema dan seed selesai; riwayat masih data mock",
        Python: "Skrip pelatihan dan evaluasi",
        "YOLOv8n-cls": "Classifier sangrai, empat kelas",
        "Image classification": "Fine-tuning backbone terlatih",
        "Model evaluation": "Macro-F1, confusion matrix, set eksternal",
        "Dataset curation": "Pembersihan duplikat dan hampir duplikat",
        "TensorFlow Lite": "File INT8 sudah diekspor, belum tersambung ke aplikasi",
        "Object detection": "Direncanakan — detektor biji belum dibuat",
        OpenCV: "Direncanakan — analisis bentuk belum dimulai",
        Laravel: "Framework aplikasi",
        PHP: "Bahasa sisi server",
        Filament: "Panel admin dan pengajar",
        MySQL: "Data aplikasi",
        PostgreSQL: "Data konten dan admin",
        Prisma: "Skema, migrasi, client bertipe",
      },
    },
  },

  beyond: {
    eyebrow: "Di luar kode",
    headingLead: "Hal-hal yang",
    headingTail: "tak masuk ke dalam repo.",
    lede: "Tiga bidang kerja yang terjadi di luar editor.",
    chapters: {
      communication: {
        title: "Komunikasi & Pendidikan",
        lede: "Mengajar, berbicara di depan banyak orang, dan memandu acara.",
        entries: [
          {
            title: "Pembawa acara",
            body: "Saya memandu acara sebagai MC, memperkenalkan pembicara dan menjaga jadwal tetap sesuai.",
          },
          {
            title: "Khotbah di beberapa masjid",
            body: "Saya menyampaikan khotbah di beberapa masjid dengan honor saat masih SMA.",
          },
          {
            title: "Mengajar siswa sekolah dasar",
            body: "Saya mengajar siswa SD di sebuah bimbingan belajar saat masih SMA.",
          },
          {
            title: "Polinema Mengajar",
            body: "Aktif mengajar di berbagai rumah belajar dan panti asuhan.",
          },
        ],
      },
      leadership: {
        title: "Kepemimpinan & Organisasi",
        lede: "Kerja koordinasi: hubungan eksternal, acara, dan manajemen tim.",
        entries: [
          {
            title: "Staf Divisi Eksternal — Hubungan Masyarakat",
            body: "Sebagai staf di sub-divisi Hubungan Masyarakat, saya sering bertugas sebagai MC sekaligus menangani komunikasi dan negosiasi dengan pihak eksternal.",
          },
          {
            title: "Project Manager — Project-Based Learning",
            body: "Saya menjadi Project Manager untuk proyek PBL semester 3 dan semester 4.",
          },
          {
            title: "Kepanitiaan Orientasi — 2025",
            body: "Saya tergabung di komisi keamanan dan kesehatan pada orientasi himpunan mahasiswa Informatika 2025.",
          },
        ],
      },
      technology: {
        title: "Teknologi & Komunitas",
        lede: "Konten, audiens, dan sisi teknis dari proyek yang sedang berjalan.",
        entries: [
          {
            title: "Google Student Ambassador — 2026",
            body: "Terpilih di semester empat. Programnya sebagian besar berisi pembuatan konten: belajar memahami kebutuhan audiens dan bagaimana produk Google bisa menjawabnya. Ini juga jadi cara membangun relasi dengan orang dari latar belakang yang berbeda.",
          },
          {
            title: "Machine Learning — proyek PBL saat ini",
            body: "Saya bertanggung jawab atas bagian machine learning di proyek PBL saya saat ini.",
          },
        ],
      },
    },
  },

  contact: {
    eyebrow: "Mari terhubung",
    headingLead: "Punya ide",
    headingTail: "yang ingin diwujudkan?",
    body: "Terbuka untuk magang, posisi junior, dan proyek tempat saya bisa belajar sesuatu yang nyata.",
    github: "GitHub",
    instagram: "Instagram",
    linkedin: "LinkedIn",
    downloadCv: "CV",
    backToTop: "Kembali ke atas",
  },
};
