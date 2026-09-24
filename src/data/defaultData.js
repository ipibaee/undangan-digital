export const initialInvitationData = {
  // Metadata & Settings
  meta: {
    title: "The Wedding of Justin & Sisca",
    quote: "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. (QS. Ar-Rum: 21)",
    quoteSource: "QS. Ar-Rum: 21",
    adminPin: "1234",
    activeTheme: "champagne-floral", // champagne-floral | royal-gold | blush-rose | sage-botanical
    fontFamily: "font-serif-heading",
    accentColor: "#928573",
    qrCheckInEnabled: true, // Fitur aktif/nonaktif QR Code check-in tamu
    bgType: "theme", // theme | solid | gradient
    customBgColor: "#faf6f0",
    customGradient: "linear-gradient(135deg, #fdfbf7 0%, #f4ece1 100%)",
    gradientColor1: "#fdfbf7",
    gradientColor2: "#f4ece1",
    showFloralOrnaments: true,
  },



  // Mempelai Pria & Wanita
  couple: {
    groom: {
      fullName: "Justin Pratama, S.Kom.",
      nickName: "Justin",
      fatherName: "Bpk. Bambang Wijaya",
      motherName: "Ibu Sri Wahyuni",
      childOrder: "Putra Pertama dari",
      instagram: "justinpratama",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
      bio: "Pria yang hangat, penuh dedikasi, dan bersyukur dipertemukan dengan belahan jiwanya."
    },
    bride: {
      fullName: "Fransisca Anggraini, S.E.",
      nickName: "Sisca",
      fatherName: "Bpk. Hendra Gunawan",
      motherName: "Ibu Ratna Dewi",
      childOrder: "Putri Kedua dari",
      instagram: "siscaanggraini",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
      bio: "Wanita yang lembut, ceria, dan siap melangkah bersama menapaki babak baru kehidupan."
    },
    heroImage: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200&auto=format&fit=crop"
  },

  // Countdown & Jadwal Acara
  events: {
    targetDate: "2026-12-28T09:00:00",
    akad: {
      title: "Akad Nikah",
      date: "Minggu, 28 Desember 2026",
      time: "08:00 - 10:00 WIB",
      venueName: "Masjid Agung Al-Barkah",
      address: "Jl. Veteran No. 45, Kebayoran Baru, Jakarta Selatan",
      mapsUrl: "https://maps.google.com/?q=Jakarta",
      mapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126920.28639893979!2d106.759478!3d-6.2297465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x5371bf0fdad786a2!2sJakarta!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
    },
    resepsi: {
      title: "Resepsi Pernikahan",
      date: "Minggu, 28 Desember 2026",
      time: "11:00 - 15:00 WIB",
      venueName: "The Grand Ballroom Hotel Mulia",
      address: "Jl. Asia Afrika Senayan No. 1, Jakarta Pusat",
      mapsUrl: "https://maps.google.com/?q=Hotel+Mulia+Senayan",
      mapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126920.28639893979!2d106.759478!3d-6.2297465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x5371bf0fdad786a2!2sJakarta!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
    }
  },

  // Kisah Cinta / Love Story
  stories: [
    {
      id: "1",
      year: "2020",
      title: "Pertemuan Pertama",
      description: "Pertama kali kami dipertemukan dalam sebuah seminar kampus di Jakarta. Sebuah tatapan singkat dan obrolan tentang buku yang menjadi awal dari kisah panjang kami."
    },
    {
      id: "2",
      year: "2022",
      title: "Menjalin Komitmen",
      description: "Setelah dua tahun saling mengenal dan melewati berbagai momen suka duka, kami memutuskan untuk saling berkomitmen membangun masa depan bersama."
    },
    {
      id: "3",
      year: "2025",
      title: "Momen Lamaran",
      description: "Dengan restu kedua orang tua dan keluarga besar, Justin melamar Sisca dalam suasana penuh haru dan kehangatan keluarga di sebuah senja yang indah."
    },
    {
      id: "4",
      year: "2026",
      title: "Menuju Pelaminan",
      description: "Kini, dengan niat suci dan memohon ridho Allah SWT, kami bersiap mengikat janji suci pernikahan untuk selamanya."
    }
  ],

  // Galeri Foto & Video
  gallery: [
    {
      id: "g1",
      url: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
      caption: "Momen Bahagia Bersama"
    },
    {
      id: "g2",
      url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop",
      caption: "Cinta Dalam Senyuman"
    },
    {
      id: "g3",
      url: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=800&auto=format&fit=crop",
      caption: "Menatap Hari Esok"
    },
    {
      id: "g4",
      url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=800&auto=format&fit=crop",
      caption: "Janji Tulus Kami"
    },
    {
      id: "g5",
      url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=800&auto=format&fit=crop",
      caption: "Langkah Pertama"
    },
    {
      id: "g6",
      url: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=800&auto=format&fit=crop",
      caption: "Satu Cinta Selamanya"
    }
  ],

  // Video Streaming / YouTube
  streaming: {
    enabled: true,
    title: "Live Streaming Pernikahan",
    description: "Bagi keluarga dan sahabat yang belum dapat hadir secara langsung, Anda dapat menyaksikan momen bahagia kami melalui tautan berikut:",
    youtubeId: "dQw4w9WgXcQ", // or wedding highlight video
    streamUrl: "https://youtube.com/live"
  },

  // Amplop Digital & Titip Kado Fisik
  gifts: {
    enabled: true,
    title: "Titip Kado & Amplop Digital",
    description: "Doa restu Anda adalah karunia terindah bagi kami. Namun jika Anda ingin memberikan tanda kasih secara virtual ataupun kado fisik, kami dengan rendah hati menyediakannya di bawah ini:",
    accounts: [
      {
        id: "b1",
        bankName: "BCA",
        accountNumber: "8830192841",
        accountHolder: "Justin Pratama",
        logo: "BCA"
      },
      {
        id: "b2",
        bankName: "Bank Mandiri",
        accountNumber: "1370019283741",
        accountHolder: "Fransisca Anggraini",
        logo: "MANDIRI"
      },
      {
        id: "b3",
        bankName: "DANA / GoPay",
        accountNumber: "081234567890",
        accountHolder: "Justin Pratama",
        logo: "E-WALLET"
      }
    ],
    physicalGift: {
      recipientName: "Justin & Sisca",
      phone: "0812-3456-7890",
      address: "Cluster Harmoni No. B12, Jl. Kenanga Indah, Kebayoran Baru, Jakarta Selatan, 12140",
      notes: "Mohon konfirmasi ke nomor di atas sebelum mengirim paket kado."
    }
  },

  // Musik Latar
  music: {
    enabled: true,
    title: "A Thousand Years (Romantic Acoustic)",
    artist: "Wedding Instrumental",
    url: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-acoustic-112191.mp3"
  },

  // WhatsApp Broadcast & Buku Tamu
  whatsapp: {
    template: `Kepada Yth.
*{nama}*
di Tempat

_Assalamu’alaikum Warahmatullahi Wabarakatuh_
Salam Sejahtera bagi kita semua,

Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami:

*The Wedding of {panggilan_mempelai}*
Tanggal: {tanggal_acara}

Tautan Undangan Resmi & Informasi Acara:
{url_undangan}

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir serta memberikan doa restu kepada kami berdua.

Terima kasih atas perhatian dan doa restunya.

_Wassalamu’alaikum Warahmatullahi Wabarakatuh_
Kami yang berbahagia,
*{panggilan_mempelai}*`,
  },

  // Daftar Tamu Undangan (Guest Book)
  guests: [
    {
      id: "guest-1",
      name: "Bapak Budi & Keluarga",
      phone: "6281234567801",
      category: "VIP",
      sent: true,
      sentAt: "2026-09-24 08:30",
      checkedIn: false
    },
    {
      id: "guest-2",
      name: "Ibu Siti Rahmawati",
      phone: "6281234567802",
      category: "Keluarga",
      sent: true,
      sentAt: "2026-09-24 08:35",
      checkedIn: false
    },
    {
      id: "guest-3",
      name: "Dr. Handoko Pratama, Sp.A",
      phone: "6281234567803",
      category: "VIP",
      sent: false,
      sentAt: null,
      checkedIn: false
    },
    {
      id: "guest-4",
      name: "Dimas & Nadia",
      phone: "6281234567804",
      category: "Sahabat",
      sent: false,
      sentAt: null,
      checkedIn: false
    },
    {
      id: "guest-5",
      name: "Rekan Kerja Tim IT",
      phone: "6281234567805",
      category: "Rekan Kerja",
      sent: false,
      sentAt: null,
      checkedIn: false
    }
  ],

  // RSVP & Ucapan Masuk
  wishes: [
    {
      id: "w1",
      name: "Bapak Budi & Keluarga",
      relation: "Rekan Kerja Orang Tua",
      attendance: "hadir",
      pax: 2,
      message: "Selamat menempuh hidup baru Justin & Sisca. Semoga menjadi keluarga yang sakinah, mawaddah, warahmah serta senantiasa dilimpahi keberkahan dan kebahagiaan.",
      createdAt: "2026-09-24 08:45",
      reply: "Terima kasih banyak Bapak Budi sekeluarga atas doa dan restunya. Sampai jumpa di hari bahagia kami!"
    },
    {
      id: "w2",
      name: "Siti Rahmawati",
      relation: "Keluarga Mempelai Wanita",
      attendance: "hadir",
      pax: 3,
      message: "Alhamdulillah akhirnya hari bahagia tiba! Lancar sampai hari H untuk Sisca & Justin tersayang. Turut berbahagia untuk kalian berdua!",
      createdAt: "2026-09-24 09:00",
      reply: "Aamiin ya rabbal alamin, terima kasih Tante Siti! Kami tunggu kehadirannya yaa."
    },
    {
      id: "w3",
      name: "Dimas Arya",
      relation: "Sahabat Justin",
      attendance: "ragu",
      pax: 1,
      message: "Happy wedding bro Justin & calon istri Sisca! Doa terbaik semoga langgeng sampai kakek nenek. InsyaAllah gue usahakan hadir bro!",
      createdAt: "2026-09-24 09:10",
      reply: "Thanks banget bro Dimas! Wajib hadir pokoknya nanti ngopi bareng!"
    }
  ]
};
