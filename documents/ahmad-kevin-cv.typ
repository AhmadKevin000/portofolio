// CV Ahmad Kevin Malik Zakaria — Bahasa Indonesia.
// Catatan: bagian [isi ...] adalah placeholder dari owner; sengaja TIDAK ditampilkan
// di PDF. Isi datanya di bawah lalu hapus komentar TODO.

#set page(paper: "a4", margin: (
  top: 1.6cm,
  bottom: 1.6cm,
  left: 1.7cm,
  right: 1.7cm,
))
#set text(font: "New Computer Modern", size: 9.2pt, lang: "id")
#set par(justify: true, leading: 0.62em)

#let section(title) = {
  v(0.45em)
  block(
    width: 100%,
    inset: (top: 0.35em, bottom: 0.35em),
    stroke: (bottom: 0.7pt + black),
    text(weight: "bold", size: 10.5pt, title),
  )
  v(0.25em)
}

#let entry(title, period) = grid(
  columns: (1fr, auto),
  align(right, text(weight: "bold", period)),
  align(left, text(weight: "bold", title)),
)

#let sub(text_) = text(size: 8.8pt, text_)

#align(center)[#text(weight: "bold", size: 17pt)[AHMAD KEVIN MALIK ZAKARIA]]
#align(center)[
  Malang, East Java, Indonesia | +62 896 0130 2560 | ahmadkevinmalik01\@gmail.com |
  github.com/AhmadKevin000 | portofolio-kepin.vercel.app
]

#section[Ringkasan Profesional]
Mahasiswa Teknik Informatika di Politeknik Negeri Malang dengan pengalaman memimpin tim,
mengembangkan website dan aplikasi mobile, serta berkomunikasi dengan mitra eksternal.
Terbiasa bekerja di lapangan maupun di balik layar.

#section[Kompetensi Inti]
Manajemen Proyek · Koordinasi Tim · Public Speaking · Negosiasi · Hubungan Eksternal ·
Web Development · Mobile Development · Berpikir Kritis

#section[Pengalaman Proyek]

#entry[Backend Developer, Website Profil Lab Business Analytics][Agustus – Desember 2025]
#sub[Tim 5 orang, Politeknik Negeri Malang]
- Mengembangkan website profil untuk Lab Business Analytics Polinema bersama tim lima orang,
  dengan peran utama di sisi backend.

#entry[Manajer Proyek & Frontend Developer, Project-Based Learning][Februari – Juni 2026]
#sub[Tim 4 orang, Politeknik Negeri Malang]
- Memimpin tim empat orang dalam pengembangan proyek berbasis pembelajaran, mulai dari
  pembagian tugas, pengaturan progres, hingga penyelesaian hasil akhir.
- Mengembangkan bagian frontend dan memastikan proyek selesai tepat waktu, kemudian
  dipresentasikan di depan dosen pembimbing.

#entry[Anggota Tim Machine Learning & Mobile Developer, Project-Based Learning][2026 – Sekarang]
- Berkontribusi pada pengembangan bagian machine learning dalam proyek tim yang sedang berjalan.
- Membantu pengembangan aplikasi mobile menggunakan Flutter dan Dart.

#section[Pengalaman Organisasi & Kepemimpinan]

#entry[Google Student Ambassador][2026]
- Membuat 20 konten dan mempelajari kebutuhan audiens untuk memperkenalkan produk Google yang
  relevan.
- Membangun relasi dengan sesama ambassador dan komunitas.

#entry[Staf Divisi Eksternal, Subdivisi Hubungan Masyarakat, Polinema Mengajar][2025 – 2026]
- Menjadi pembawa acara kegiatan organisasi dan menjalin komunikasi dengan pihak eksternal.
- Mendukung negosiasi dan koordinasi dengan 4 mitra eksternal untuk kebutuhan kegiatan.

#entry[Koordinator Lapangan, Seminar Nasional, Polinema Mengajar][2026]
- Mengoordinasikan tim lapangan sekitar 14 orang dan operasional untuk seminar nasional dengan
  60 peserta.

#section[Keahlian Teknis]
#text[
  *Bahasa Pemrograman:* JavaScript, TypeScript, Dart, Python, Java, PHP \
  *Web & Mobile:* React, Next.js, Flutter, Laravel, Filament, Tailwind CSS, HTML, CSS \
  *Tools:* Git, GitHub, Figma, Visual Studio Code, Android Studio
]

#section[Pendidikan]
#entry[Politeknik Negeri Malang — Sarjana Terapan Teknik Informatika][2024 – Sekarang]

#section[Bahasa]
Indonesia — Native \
Inggris — Intermediate
