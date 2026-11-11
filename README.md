# EVER AFTER — Digital Wedding Invitation Website

Website undangan pernikahan digital modern, elegan, interaktif, dan responsif yang dibangun menggunakan **HTML5**, **CSS3**, dan **Vanilla JavaScript**.

---

## 🎨 Konsep & Desain

- **Konsep:** *EVER AFTER — Modern Elegant Wedding*
- **Karakter:** Minimalis, Mewah (Luxury Editorial), Romantis, Halus (Soft Transitions), Ornamen Floral Organik.
- **Palet Warna:**
  - **Ivory:** `#F8F5EF`
  - **Champagne Gold:** `#C6A66B`
  - **Sage Green:** `#A3AA91`
  - **Soft Beige:** `#E8DFD2`
  - **Dark Brown:** `#51463B`
- **Tipografi:**
  - Heading: *Cormorant Garamond*
  - Body: *Montserrat*
  - Dekoratif: *Great Vibes*

---

## 📂 Struktur File

```
ever-after-wedding/
├── index.html          # Struktur semantic HTML5 lengkap
├── style.css           # Desain CSS3 murni, animasi, responsive mobile-first
├── script.js           # Vanilla JS, WEDDING_CONFIG, countdown, RSVP, music, lightbox
├── assets/
│   ├── audio/
│   │   └── wedding-melody.wav   # File audio melodi romantis lokal
│   └── images/
└── README.md           # Panduan penggunaan & konfigurasi
```

---

## 🚀 Cara Menjalankan Website

1. **Buka Langsung di Browser:**
   - Cukup klik dua kali (double click) file `index.html`, atau drag & drop ke browser (Google Chrome, Safari, Edge, Firefox).
   - Website langsung siap digunakan tanpa memerlukan instalasi node modules, build process, atau compiler.

2. **Uji Coba Nama Tamu Dinamis (URL Parameter):**
   Tambahkan parameter `?to=Nama+Tamu` pada URL browser:
   ```text
   file:///.../ever-after-wedding/index.html?to=Bapak+Budi+Santoso
   file:///.../ever-after-wedding/index.html?to=Sarah+%26+Partner
   file:///.../ever-after-wedding/index.html?to=Keluarga+Besar+Hendra
   ```
   Nama tamu akan otomatis tampil di amplop pembuka dan terisi pada formulir RSVP.

---

## ⚙️ Cara Mengubah Data Pernikahan (Customization)

Seluruh konfigurasi utama tersentralisasi pada objek `WEDDING_CONFIG` di baris paling atas file `script.js`:

```javascript
const WEDDING_CONFIG = {
  groom: {
    fullName: "Raditya Pratama, S.T.",
    nickName: "Radit",
    father: "Ir. Bambang Suryo",
    mother: "Ratna Dewi",
    instagram: "@radityapratama"
  },
  bride: {
    fullName: "Amanda Putri Kirana, S.I.Kom.",
    nickName: "Amanda",
    father: "Dr. Hendra Gunawan",
    mother: "Siti Aminah",
    instagram: "@amandakirana"
  },
  targetDate: "2026-12-12T08:00:00+07:00", // Format target countdown
  // ... events, gifts, initial wishes
};
```

---

## ✨ Fitur-Fitur Utama

1. **Amplop Undangan (Opening Envelope):**
   - Animasi 3D pembuka amplop dan segel lilin (wax seal).
   - Kartu undangan bergeser keluar dengan transisi lembut ke halaman utama.
   - Memenuhi aturan browser autoplay: musik instrumental romantis otomatis diputar saat tamu menekan "Buka Undangan".
2. **Hero Section:**
   - Fullscreen editorial dengan efek slow zoom (Ken Burns) dan kelopak bunga melayang.
3. **Couple Section:**
   - Desain simetris dengan bingkai lengkung bertabur aksen emas dan kutipan suci QS. Ar-Rum: 21.
4. **Love Story Timeline:**
   - Perjalanan cinta kedua mempelai dengan animasi scroll-reveal dan foto pendukung.
5. **Real-time Countdown:**
   - Menghitung mundur Hari, Jam, Menit, dan Detik secara akurat menuju hari pernikahan.
   - Tombol integrasi langsung ke Google Calendar.
6. **Wedding Event Cards:**
   - Dua kartu terpisah untuk Akad Nikah & Resepsi dengan jam, tanggal, lokasi, dresscode, dan tombol navigasi langsung ke Google Maps.
7. **Interactive Photo Gallery & Lightbox:**
   - Tampilan masonry grid foto prewedding dengan efek hover.
   - Lightbox fullscreen dengan navigasi Next, Prev, tombol Tutup, keyboard arrow keys, dan touch swipe di smartphone.
8. **RSVP & Buku Tamu (Wishes Wall):**
   - Formulir validasi kehadiran lengkap dengan penyimpanan di `localStorage`.
   - Ucapan baru langsung muncul seketika di daftar ucapan secara real-time.
   - Dilengkapi fungsi hook untuk integrasi ke Google Sheets / Firebase.
9. **Tanda Kasih (Wedding Gift):**
   - Kartu rekening BCA & Mandiri dengan tombol "Salin Nomor Rekening" (JavaScript Clipboard API) dan notifikasi toast.
   - Opsi pengiriman kado fisik dengan salin alamat lengkap.
10. **Music Player:**
    - Tombol piringan hitam (vinyl) di sudut bawah yang berputar saat musik aktif.
    - Dilengkapi fallback Web Audio API synthesizer jika file audio offline.
11. **Floating Navigation Dock:**
    - Menu navigasi praktis di bagian bawah dengan indikator aktif yang mengikuti posisi scroll layar.
