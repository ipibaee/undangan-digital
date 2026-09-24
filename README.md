# 💍 Undangan Digital Pernikahan & Panel Sebar WhatsApp Otomatis

Aplikasi web undangan pernikahan digital modern, elegan, responsif, dan kaya fitur yang terinspirasi dari template premium IndoInvite serta dilengkapi **Panel Pengelola / Editor Khusus** dan **Fitur Sebar Undangan Otomatis ke WhatsApp atas nama tamu**.

---

## 🌟 Fitur Utama (Sesuai Permintaan & Foto Checklist)

### 💌 Tampilan Undangan (Untuk Tamu Undangan)
1. **Cover Pembuka & Sapaan Dinamis (`?kpd=Nama%20Tamu`)**:
   - Menampilkan sapaan resmi: *"Kepada Yth. Bapak/Ibu/Saudara/i: [Nama Tamu]"*.
   - Tombol **"Buka Undangan"** yang membuka undangan secara mulus dan otomatis memutar lagu latar romantis.
2. **Kutipan Suci / Ayat Al-Qur'an**:
   - Teks firman (QS. Ar-Rum: 21) dengan tipografi *serif* elegan.
3. **Profil Mempelai (Pria & Wanita)**:
   - Foto profil bulat dengan ornamen botani berputar halus.
   - Nama lengkap, gelar, nama panggilan, urutan anak, nama kedua orang tua, bio singkat, dan tombol langsung ke akun Instagram.
4. **Hitung Mundur (Countdown Timer) & Simpan ke Kalender**:
   - Menghitung hari, jam, menit, dan detik secara *real-time*.
   - Tombol **"Simpan Ke Google Calendar"** untuk mencatat jadwal acara langsung ke kalender tamu.
5. **Rangkaian Acara (Akad Nikah & Resepsi)**:
   - Jadwal lengkap tanggal, jam, nama gedung/masjid, dan alamat detail.
   - Tombol **"Petunjuk Arah (Google Maps)"** langsung.
   - Peta interaktif **Google Maps Embed**.
6. **Kisah Cinta (Love Story Timeline)**:
   - Rangkaian cerita perjalanan cinta mulai dari pertemuan pertama, komitmen, lamaran, hingga pelaminan.
7. **Galeri Foto HD & Live Streaming Video**:
   - Grid foto dengan efek pembesar (zoom) dan pop-up Lightbox resolusi tinggi.
   - Bagian **Live Streaming / Video YouTube** untuk tamu yang tidak dapat hadir langsung.
8. **Titip Kado & Amplop Digital (Virtual Gift & Kado Fisik)**:
   - Rekening BCA, Bank Mandiri, dan E-Wallet (DANA/GoPay) lengkap dengan tombol **"Salin No. Rekening"** (dengan animasi notifikasi tersalin).
   - Alamat pengiriman kado fisik beserta kontak penerima dan tombol **"Salin Alamat Lengkap"**.
9. **RSVP & Ucapan Doa Restu**:
   - Form konfirmasi kehadiran (*Hadir, Ragu, Tidak Hadir*) dan jumlah tamu yang dibawa.
   - Efek kembang api selebrasi (*Confetti*) saat ucapan berhasil dikirim.
   - Daftar ucapan tamu lengkap dengan badge kehadiran dan **Balasan dari Kedua Mempelai**.
10. **QR Code Check-in Tamu**:
    - Setiap tamu mendapatkan QR Code unik pribadi untuk di-scan oleh penerima tamu di meja resepsi.
11. **Musik Latar (Background Music)**:
    - Pemutar musik berbentuk piringan hitam (*vinyl disc*) melayang di pojok kanan atas yang berputar saat musik aktif, dilengkapi tombol Play/Pause dan indikator audio.
12. **Auto Scroll & Navigasi Melayang (Floating Bar)**:
    - Tombol Auto Scroll untuk menggulir halaman ke bawah secara otomatis.
    - Menu bar melayang di bawah layar untuk melompat antar bagian (*Sampul, Mempelai, Acara, Cerita, Galeri, Kado, Ucapan*).

---

## ⚙️ Panel Pengelola / Editor Khusus (`?panel=admin`)

Panel ini dapat diakses melalui sub-link `http://localhost:5173/?panel=admin` atau dengan mengklik tombol rahasia **"Panel Pengelola Undangan"** di bagian footer paling bawah.

### 🔒 Keamanan Akses
- Dilindungi **PIN Keamanan** (PIN bawaan: `1234`, dapat diubah di menu Pengaturan).

### 📱 1. Fitur Buku Tamu & Sebar WhatsApp Otomatis (Fitur Unggulan!)
- **Sebar WA Langsung 1-Klik**:
  - Tombol **"Kirim WA"** di setiap nama tamu akan langsung membuka WhatsApp (Web di laptop / Aplikasi WA di smartphone) dengan teks undangan yang sudah terisi otomatis atas nama tamu tersebut!
- **Template Pesan WhatsApp Dinamis**:
  - Format pesan dapat diedit sesuai keinginan, mendukung variabel otomatis:
    - `{nama}` ➔ Nama tamu undangan (e.g. Bapak Budi)
    - `{url_undangan}` ➔ Link personal tamu (e.g. `http://.../?kpd=Bapak%20Budi`)
    - `{panggilan_mempelai}` ➔ Justin & Sisca
    - `{tanggal_acara}` ➔ Tanggal pernikahan
- **Import Massal (Paste Sekaligus)**:
  - Bisa copy-paste puluhan nama tamu sekaligus dari Excel/catatan dengan format `Nama, NoWA, Kategori` atau hanya `Nama`.
- **Generator Link Personal**:
  - Tombol untuk menyalin langsung link khusus tamu (`?kpd=...`).
- **Pelacakan Status**:
  - Statistik real-time tamu (*Total, Sudah Dikirim, Belum Dikirim, Tamu Hadir*).
- **Check-in Cepat di Meja Tamu**:
  - Fitur pencarian/scan cepat nama tamu di meja resepsi untuk menandai kehadiran dan mencatat jam kedatangan.

### 🎨 2. Tema & Tampilan Desain
Tersedia 4 pilihan template desain eksklusif yang dapat diganti kapan saja secara *live*:
1. **Classic Floral Champagne (Referensi IndoInvite)**: Nuansa krem keemasan hangat dengan ornamen klasik.
2. **Royal Midnight & Gold**: Kemewahan tema gelap malam dengan sentuhan emas megah.
3. **Romantic Blush & Dusty Rose**: Kelembutan pastel peach dan mawar merah muda.
4. **Earthy Botanical Sage**: Nuansa hijau daun zaitun alami dan elegan.
- Fitur pemilih warna aksen kustom (*Color Picker*).

### ✏️ 3. Pengeditan Lengkap Konten
- **Data Mempelai**: Ubah foto, nama lengkap, gelar, panggilan, orang tua, bio, dan Instagram.
- **Jadwal & Lokasi**: Ubah tanggal Akad, Resepsi, waktu, alamat, link maps, dan embed iframe.
- **Kisah Cinta & Galeri HD**: Tambah, ubah, atau hapus momen cerita dan koleksi foto galeri.
- **Rekening Amplop & Kado**: Tambah rekening bank, e-wallet, dan alamat kado fisik.
- **Musik Latar**: Ganti lagu dari koleksi romantis bawaan atau masukkan URL MP3 sendiri.
- **Moderasi Doa & Balas Ucapan**: Tinjau ucapan yang masuk, hapus spam, dan tulis balasan resmi dari mempelai.
- **Backup & Restore**: Cadangkan seluruh pengaturan ke berkas `.json` dan pulihkan kapan saja.

---

## 🚀 Cara Menjalankan Proyek Secara Lokal

Buka terminal di folder `undangan-digital` dan jalankan:

```bash
cd c:\Users\muama\antigravity\undangan-digital

# Jalankan server pengembangan lokal:
npm run dev
```

Buka peramban (browser):
- **Tampilan Undangan Tamu**:  
  `http://localhost:5173/?kpd=Bapak%20Budi`
- **Panel Pengelola / Sebar WA**:  
  `http://localhost:5173/?panel=admin`  
  *(Masukkan PIN: `1234`)*
