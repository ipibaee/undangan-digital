import React, { useState } from 'react';
import { 
  Sparkles, Heart, Smartphone, Send, MessageSquare, Gift, Music, 
  CheckCircle2, ArrowRight, ExternalLink, Shield, Star, HelpCircle, 
  ChevronRight, Phone, Eye, Palette
} from 'lucide-react';
import { FadeIn, ZoomIn, Floating } from '../common/MotionWrapper';
import { themes } from '../../data/themes';

export const LandingPage = ({ onSelectSlug, onOpenAdmin }) => {
  const [selectedThemePreview, setSelectedThemePreview] = useState(null);
  const [searchSlug, setSearchSlug] = useState('');

  // Nomor WA Admin untuk pemesanan (bisa disesuaikan pengguna)
  const WA_NUMBER = "6281234567890"; // Format internasional tanpa tanda +
  const createWaOrderLink = (packageName, themeName = '') => {
    const text = encodeURIComponent(
      `Halo Admin, saya tertarik untuk memesan Undangan Digital Website.\n\n` +
      `📦 Paket: ${packageName}\n` +
      (themeName ? `🎨 Pilihan Tema: ${themeName}\n` : '') +
      `Mohon info langkah selanjutnya dan form pengisian data mempelai ya. Terima kasih!`
    );
    return `https://wa.me/${WA_NUMBER}?text=${text}`;
  };

  const themeList = [
    {
      id: "punakawan-terracotta",
      name: "Punakawan Terracotta & Warm Sand",
      badge: "Best Seller / Referensi",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
      description: "Nuansa earth-tone terakota hangat dan krem pasir terinspirasi dari Punakawan Digital. Elegan, modern, dan penuh kehangatan.",
      colorHex: "#8C533C",
      demoSlug: "febri-ananta",
      previewBg: "from-[#8C533C]/20 via-[#FBF9F5] to-[#B77B63]/20"
    },
    {
      id: "sage-botanical",
      name: "Earthy Botanical Sage",
      badge: "Trending 2026",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
      description: "Harmonisasi warna hijau sage daun zaitun dengan nuansa alam yang menyejukkan hati dan berkesan sangat bersih.",
      colorHex: "#657D64",
      demoSlug: "demo-sage",
      previewBg: "from-[#657D64]/20 via-[#F5F7F4] to-[#8FA88E]/20"
    },
    {
      id: "royal-gold",
      name: "Royal Midnight & Gold",
      badge: "Luxury Dark",
      badgeColor: "bg-yellow-100 text-yellow-800 border-yellow-300",
      description: "Kemewahan magis tema gelap malam berpadu taburan aksen emas murni. Memberikan impresi eksklusif dan glamor.",
      colorHex: "#D4AF37",
      demoSlug: "demo-royal",
      previewBg: "from-[#0D1217] via-[#151C24] to-[#252210]"
    },
    {
      id: "champagne-floral",
      name: "Classic Floral Champagne",
      badge: "Timeless Classic",
      badgeColor: "bg-stone-200 text-stone-800 border-stone-300",
      description: "Keanggunan klasik warna krem keemasan berhias ornamen botani floral lembut. Pilihan tepat untuk konsep pernikahan formal.",
      colorHex: "#928573",
      demoSlug: "demo-champagne",
      previewBg: "from-[#FAF7F2] via-[#F4EFE8] to-[#928573]/20"
    },
    {
      id: "blush-rose",
      name: "Romantic Blush & Dusty Rose",
      badge: "Most Romantic",
      badgeColor: "bg-rose-100 text-rose-800 border-rose-300",
      description: "Sentuhan romansa bunga mawar berpadu warna pink pastel yang manis dan penuh kehangatan cinta.",
      colorHex: "#BD7878",
      demoSlug: "demo-rose",
      previewBg: "from-[#FCF8F8] via-[#FDF0F0] to-[#BD7878]/20"
    },
    {
      id: "emerald-luxury",
      name: "Emerald & Vintage Gold",
      badge: "Royal Vintage",
      badgeColor: "bg-teal-100 text-teal-800 border-teal-300",
      description: "Pesona hijau zamrud klasik dipadu sentuhan emas anggun berkelas untuk nuansa pernikahan agung dan mempesona.",
      colorHex: "#2D5A43",
      demoSlug: "demo-emerald",
      previewBg: "from-[#F4F7F5] via-[#E5EFE9] to-[#2D5A43]/20"
    }
  ];

  const pricingPackages = [
    {
      name: "Paket Hemat (Silver)",
      price: "49.000",
      popular: false,
      features: [
        "Masa Aktif 1 Bulan",
        "Pilihan 1 Tema Favorit",
        "Personalisasi Nama Tamu (?to=)",
        "Background Musik Latar Romantis",
        "Hitung Mundur Acara (Countdown)",
        "Maksimal 10 Foto Galeri",
        "Kolom Doa & Ucapan Tamu",
        "Integrasi Google Maps Lokasi"
      ]
    },
    {
      name: "Paket Populer (Gold)",
      price: "79.000",
      popular: true,
      features: [
        "Masa Aktif 6 Bulan",
        "Bebas Ganti Semua 6 Tema Eksklusif",
        "Personalisasi Nama Tamu Tanpa Batas",
        "Kirim WhatsApp Otomatis 1-Klik",
        "Fitur Amplop Digital & QRIS",
        "Salin Nomor Rekening 1-Klik",
        "Galeri Foto Tanpa Batas + Video",
        "Cerita Perjalanan Cinta (Timeline)",
        "Kolom Ucapan & Balas Ucapan Tamu",
        "Integrasi Google Calendar"
      ]
    },
    {
      name: "Paket Eksklusif (Platinum)",
      price: "99.000",
      popular: false,
      features: [
        "Masa Aktif SELAMANYA",
        "Semua Fitur di Paket Gold",
        "Fitur Check-in Tamu QR Code",
        "Prioritas Pengerjaan 1x24 Jam Selesai",
        "Revisi Sepuasnya Sampai Hari H",
        "Akses Panel Pengelola Mandiri",
        "Bebas Custom Lagu Favorit Sendiri",
        "Customer Service VIP WhatsApp"
      ]
    }
  ];

  const handleOpenDemo = (slug) => {
    window.location.href = `/${slug}?to=Selly`;
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchSlug.trim()) {
      window.location.href = `/${searchSlug.trim()}`;
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-800 font-sans selection:bg-amber-500 selection:text-white">
      
      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200/80 px-4 sm:px-8 py-4 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#8C533C] to-[#5C3424] flex items-center justify-center text-white shadow-md shadow-amber-950/20">
              <Heart className="w-5 h-5 fill-current" />
            </div>
            <div>
              <span className="font-serif-heading font-extrabold text-lg sm:text-xl text-stone-900 tracking-tight">
                Ipi<span className="text-[#8C533C]">Invite</span>
              </span>
              <p className="text-[10px] text-stone-400 font-medium tracking-widest uppercase">
                Digital Wedding Platform
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-stone-600">
            <a href="#katalog" className="hover:text-[#8C533C] transition-colors">Katalog Tema</a>
            <a href="#fitur" className="hover:text-[#8C533C] transition-colors">Fitur Unggulan</a>
            <a href="#harga" className="hover:text-[#8C533C] transition-colors">Paket Harga</a>
            <a href="#faq" className="hover:text-[#8C533C] transition-colors">FAQ</a>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenAdmin}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border border-stone-300 text-stone-700 hover:bg-stone-100 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5 text-stone-500" />
              <span>Login Admin</span>
            </button>
            <a
              href="#katalog"
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-[#8C533C] hover:bg-[#72412E] text-white shadow-md shadow-amber-900/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              <span>Pilih Tema</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-12 pb-20 sm:pt-20 sm:pb-32 px-4 overflow-hidden">
        {/* Aesthetic background glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-amber-200/40 via-orange-100/30 to-rose-200/40 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center space-y-6">
          <FadeIn direction="up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-amber-200 shadow-sm text-xs font-bold text-[#8C533C] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-spin" />
              <span>Platform Undangan Digital Modern & Full Animasi</span>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.1}>
            <h1 className="font-serif-heading text-4xl sm:text-6xl font-extrabold text-stone-900 tracking-tight leading-[1.15]">
              Bagikan Momen Bahagiamu dengan Undangan Digital Menawan
            </h1>
          </FadeIn>

          <FadeIn direction="up" delay={0.2}>
            <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
              Buat undangan online interaktif dengan musik romantis, efek animasi scroll 60 FPS, RSVP realtime, dan bagikan ke ribuan tamu langsung melalui WhatsApp cukup dengan 1 klik.
            </p>
          </FadeIn>

          <FadeIn direction="up" delay={0.3}>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <a
                href="#katalog"
                className="px-6 py-3.5 rounded-2xl bg-[#8C533C] hover:bg-[#72412E] text-white font-bold text-sm sm:text-base shadow-xl shadow-amber-950/20 flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
              >
                <span>Lihat Katalog Tema</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href={createWaOrderLink("Paket Populer (Gold)")}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 rounded-2xl bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 font-bold text-sm sm:text-base shadow-sm flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>Konsultasi Pemesanan WA</span>
              </a>
            </div>
          </FadeIn>

          {/* Cari Undangan Klien Input */}
          <FadeIn direction="up" delay={0.4}>
            <div className="pt-6 max-w-md mx-auto">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Ketik slug undangan klien (contoh: febri-ananta atau ipi-seli)..."
                  value={searchSlug}
                  onChange={(e) => setSearchSlug(e.target.value)}
                  className="w-full pl-4 pr-24 py-3 rounded-2xl border border-stone-300 bg-white/90 shadow-sm text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#8C533C] text-stone-800"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold tracking-wide transition-all cursor-pointer"
                >
                  Buka
                </button>
              </form>
            </div>
          </FadeIn>

          {/* Social Proof Badges */}
          <FadeIn direction="up" delay={0.5}>
            <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-stone-500 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Tanpa Batas Tamu</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Bebas Custom Lagu</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Amplop Digital & QRIS</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Proses Cepat 1 Hari</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </header>

      {/* KATALOG TEMA SECTION */}
      <section id="katalog" className="py-20 px-4 bg-white border-y border-stone-200/60">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-[#8C533C]">
              Koleksi Desain Eksklusif
            </span>
            <h2 className="font-serif-heading text-3xl sm:text-4xl font-extrabold text-stone-900">
              Pilihan Tema Undangan Digital
            </h2>
            <p className="text-sm text-stone-600">
              Setiap tema dirancang secara profesional dengan estetika visual tinggi, tipografi menawan, dan animasi scroll yang memikat.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {themeList.map((item, index) => (
              <FadeIn key={item.id} direction="up" delay={index * 0.1}>
                <div className="group rounded-3xl bg-[#FAF8F5] border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                  
                  {/* Theme Preview Card Banner */}
                  <div className={`relative h-48 bg-gradient-to-br ${item.previewBg} p-6 flex flex-col justify-between border-b border-stone-200/60 overflow-hidden`}>
                    <div className="flex items-center justify-between">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${item.badgeColor}`}>
                        {item.badge}
                      </span>
                      <div 
                        className="w-5 h-5 rounded-full border-2 border-white shadow-sm"
                        style={{ backgroundColor: item.colorHex }}
                        title={`Warna Utama: ${item.colorHex}`}
                      />
                    </div>

                    <div className="space-y-1 text-center">
                      <p className="text-[11px] font-serif tracking-widest uppercase opacity-70">The Wedding of</p>
                      <h4 className="font-serif-heading text-xl font-bold tracking-tight text-stone-900">
                        {item.id === 'punakawan-terracotta' ? 'Febri & Ananta' : 'Mempelai Pria & Wanita'}
                      </h4>
                    </div>

                    <div className="text-center">
                      <span className="inline-block px-3 py-1 rounded-full bg-white/70 backdrop-blur-sm text-[10px] font-semibold text-stone-700 shadow-sm">
                        Animasi Scroll • Musik • RSVP
                      </span>
                    </div>
                  </div>

                  {/* Theme Info */}
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h3 className="font-serif-heading text-lg font-bold text-stone-900 group-hover:text-[#8C533C] transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-stone-200/80 flex items-center gap-2">
                      <button
                        onClick={() => handleOpenDemo(item.demoSlug)}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-white border border-stone-300 text-stone-800 hover:bg-stone-100 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
                      >
                        <Eye className="w-3.5 h-3.5 text-stone-600" />
                        <span>Lihat Demo Live</span>
                      </button>
                      <a
                        href={createWaOrderLink("Paket Populer (Gold)", item.name)}
                        target="_blank"
                        rel="noreferrer"
                        className="py-2.5 px-3.5 rounded-xl bg-[#8C533C] hover:bg-[#72412E] text-white font-semibold text-xs flex items-center justify-center gap-1 transition-all shadow-sm cursor-pointer"
                        title="Pesan Tema Ini via WhatsApp"
                      >
                        <span>Pesan</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                </div>
              </FadeIn>
            ))}
          </div>

        </div>
      </section>

      {/* FITUR UNGGULAN SECTION */}
      <section id="fitur" className="py-20 px-4">
        <div className="max-w-6xl mx-auto space-y-14">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
              Kelebihan Platform
            </span>
            <h2 className="font-serif-heading text-3xl sm:text-4xl font-extrabold text-stone-900">
              Fitur Lengkap untuk Momen Spesial
            </h2>
            <p className="text-sm text-stone-600">
              Semua kebutuhan undangan pernikahan masa kini telah tersedia dan siap digunakan tanpa ribet.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Smartphone,
                title: "Personalisasi Nama Tamu",
                desc: "Ketik nama tamu di URL (?to=NamaTamu) untuk menyapa setiap tamu secara personal dan eksklusif."
              },
              {
                icon: Send,
                title: "Kirim WhatsApp 1-Klik",
                desc: "Sebar undangan langsung ke kontak WA dengan teks pesan otomatis yang rapi dan siap kirim."
              },
              {
                icon: Sparkles,
                title: "Animasi Halus 60 FPS",
                desc: "Setiap elemen foto, kutipan, dan jadwal acara muncul anggun saat layar digulir (scroll)."
              },
              {
                icon: MessageSquare,
                title: "Doa & RSVP Realtime",
                desc: "Tamu dapat mengonfirmasi kehadiran dan menulis ucapan, pengantin bisa membalas langsung."
              },
              {
                icon: Gift,
                title: "Amplop Digital & QRIS",
                desc: "Tombol 1-klik salin nomor rekening bank atau scan barcode QRIS untuk tamu yang ingin memberi kado."
              },
              {
                icon: Music,
                title: "Pemutar Musik Latar",
                desc: "Lagu romantis yang berputar otomatis dengan pemutar piringan hitam elegan yang bisa di-pause."
              }
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <FadeIn key={idx} direction="up" delay={idx * 0.1}>
                  <div className="p-6 rounded-3xl bg-white border border-stone-200/80 shadow-sm hover:shadow-md transition-all space-y-3">
                    <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#8C533C]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif-heading text-base font-bold text-stone-900">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>

        </div>
      </section>

      {/* PRICING / PAKET HARGA SECTION */}
      <section id="harga" className="py-20 px-4 bg-white border-y border-stone-200/60">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-100 text-rose-800">
              Transparan & Terjangkau
            </span>
            <h2 className="font-serif-heading text-3xl sm:text-4xl font-extrabold text-stone-900">
              Pilihan Paket Undangan
            </h2>
            <p className="text-sm text-stone-600">
              Pilih paket yang paling sesuai dengan kebutuhan perayaan pernikahan Anda. Tanpa biaya tersembunyi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {pricingPackages.map((pkg, idx) => (
              <FadeIn key={pkg.name} direction="up" delay={idx * 0.15}>
                <div 
                  className={`h-full rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                    pkg.popular
                      ? 'bg-gradient-to-b from-stone-900 to-stone-950 text-white shadow-2xl ring-2 ring-[#8C533C] scale-105 z-10'
                      : 'bg-[#FAF8F5] border border-stone-200 text-stone-800 shadow-sm'
                  }`}
                >
                  {pkg.popular && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-[#8C533C] text-white shadow-md">
                      Paling Banyak Dipilih
                    </span>
                  )}

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h3 className={`font-serif-heading text-lg font-bold ${pkg.popular ? 'text-white' : 'text-stone-900'}`}>
                        {pkg.name}
                      </h3>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xs font-bold text-stone-400">Rp</span>
                        <span className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${pkg.popular ? 'text-white' : 'text-stone-900'}`}>
                          {pkg.price}
                        </span>
                        <span className="text-xs text-stone-400 font-normal">/ acara</span>
                      </div>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-stone-200/40">
                      {pkg.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2.5 text-xs">
                          <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${pkg.popular ? 'text-amber-400' : 'text-emerald-600'}`} />
                          <span className={pkg.popular ? 'text-stone-300' : 'text-stone-600'}>
                            {feat}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-8">
                    <a
                      href={createWaOrderLink(pkg.name)}
                      target="_blank"
                      rel="noreferrer"
                      className={`w-full py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                        pkg.popular
                          ? 'bg-[#8C533C] hover:bg-[#72412E] text-white'
                          : 'bg-stone-900 hover:bg-stone-800 text-white'
                      }`}
                    >
                      <Phone className="w-4 h-4" />
                      <span>Pesan Paket Ini via WA</span>
                    </a>
                  </div>

                </div>
              </FadeIn>
            ))}
          </div>

        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-20 px-4">
        <div className="max-w-3xl mx-auto space-y-10">
          
          <div className="text-center space-y-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-stone-200 text-stone-800">
              Pertanyaan Umum
            </span>
            <h2 className="font-serif-heading text-3xl font-extrabold text-stone-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Berapa lama proses pembuatan undangan digital?",
                a: "Proses pengerjaan normal memakan waktu 1x24 jam setelah data mempelai, foto, dan jadwal acara lengkap dikirimkan via WhatsApp."
              },
              {
                q: "Bagaimana cara menyebarkan undangan ke tamu via WhatsApp?",
                a: "Melalui Panel Pengelola, Anda cukup memasukkan daftar nama dan nomor WhatsApp tamu. Sistem akan otomatis membuatkan link khusus dan teks ucapan yang bisa dikirimkan hanya dalam 1 klik."
              },
              {
                q: "Apakah tema dan lagu bisa diganti setelah undangan jadi?",
                a: "Tentu saja! Anda memiliki akses ke Panel Pengelola untuk mengganti tema visual, memutar musik berbeda, dan mengedit jadwal acara kapan saja tanpa biaya tambahan."
              },
              {
                q: "Bagaimana jika ada tamu yang belum mengisi konfirmasi hadir (RSVP)?",
                a: "Anda dapat memantau daftar konfirmasi hadir secara realtime di buku tamu digital, termasuk jumlah tamu yang hadir dan yang berhalangan."
              }
            ].map((faq, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white border border-stone-200/80 space-y-2 shadow-sm">
                <h4 className="font-serif-heading font-bold text-sm text-stone-900 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#8C533C]" />
                  <span>{faq.q}</span>
                </h4>
                <p className="text-xs text-stone-600 pl-6 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-stone-900 text-stone-400 py-12 px-4 border-t border-stone-800 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <p className="font-serif-heading text-base font-bold text-white">
              Ipi<span className="text-[#8C533C]">Invite</span> — Undangan Pernikahan Digital
            </p>
            <p className="text-[11px] text-stone-500">
              Platform undangan online modern, elegan, dan siap digunakan untuk menyambut hari bahagia.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a href="#katalog" className="hover:text-white transition-colors">Katalog Tema</a>
            <a href="#harga" className="hover:text-white transition-colors">Harga</a>
            <button onClick={onOpenAdmin} className="text-amber-400 hover:text-amber-300 transition-colors cursor-pointer">
              Panel Pengelola
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-stone-800 text-center text-[10px] text-stone-600">
          © {new Date().getFullYear()} IpiInvite. Hak Cipta Dilindungi.
        </div>
      </footer>

    </div>
  );
};
