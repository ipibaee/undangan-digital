/**
 * Default Minimal Schema for Undangan Digital
 * Clean initial data (tanpa base64 dummy besar).
 * Data utama akan dimuat secara penuh dari Database.
 */

export const initialInvitationData = {
  meta: {
    title: "The Wedding Invitation",
    quote: "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. (QS. Ar-Rum: 21)",
    quoteSource: "QS. Ar-Rum: 21",
    bgType: "theme",
    adminPin: "292003",
    fontFamily: "font-serif-heading",
    accentColor: "#527a54",
    activeTheme: "sage-botanical",
    customBgColor: "#edf2ec",
    customGradient: "linear-gradient(135deg, #276858 0%, #46b479 100%)",
    gradientColor1: "#276858",
    gradientColor2: "#46b479",
    qrCheckInEnabled: false,
    showFloralOrnaments: true,
    musicUrl: "https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3",
    musicTitle: "Romantic Wedding Melody"
  },
  couple: {
    groom: {
      fullName: "Mempelai Pria",
      nickName: "Pria",
      fatherName: "Bapak Mempelai Pria",
      motherName: "Ibu Mempelai Pria",
      childOrder: "Putra Pertama dari",
      instagram: "",
      photo: ""
    },
    bride: {
      fullName: "Mempelai Wanita",
      nickName: "Wanita",
      fatherName: "Bapak Mempelai Wanita",
      motherName: "Ibu Mempelai Wanita",
      childOrder: "Putri Pertama dari",
      instagram: "",
      photo: ""
    }
  },
  events: {
    akad: {
      title: "Akad Nikah",
      date: "2026-12-25",
      startTime: "08:00",
      endTime: "10:00",
      locationName: "Lokasi Akad Nikah",
      address: "Alamat lengkap lokasi pelaksanaan akad nikah",
      mapUrl: "https://maps.google.com",
      calendarUrl: "",
      timezone: "WIB"
    },
    resepsi: {
      title: "Resepsi Pernikahan",
      date: "2026-12-25",
      startTime: "11:00",
      endTime: "14:00",
      locationName: "Gedung / Tempat Resepsi",
      address: "Alamat lengkap lokasi pelaksanaan resepsi pernikahan",
      mapUrl: "https://maps.google.com",
      calendarUrl: "",
      timezone: "WIB"
    }
  },
  stories: [],
  gallery: [],
  gifts: {
    enabled: true,
    title: "Titip Kado & Amplop Digital",
    accounts: [],
    qris: {
      enabled: false,
      image: "",
      holderName: "",
      notes: ""
    },
    giftAddress: {
      enabled: false,
      receiverName: "",
      phone: "",
      address: "",
      notes: ""
    }
  },
  streaming: {
    enabled: false,
    platform: "YouTube / Instagram Live",
    url: "",
    title: "Siaran Langsung Acara",
    date: ""
  },
  wishes: [],
  guests: []
};

export const getPresetDataForSlug = (slug) => {
  const base = JSON.parse(JSON.stringify(initialInvitationData));
  if (!slug || slug === 'default') return base;

  if (slug === 'febri-ananta' || slug === 'demo-punakawan') {
    base.meta.title = "The Wedding of Febri & Selly";
    base.meta.activeTheme = "punakawan-terracotta";
    base.meta.accentColor = "#8C533C";
    base.couple.groom.fullName = "Febri Ananta Pratama";
    base.couple.groom.nickName = "Febri";
    base.couple.bride.fullName = "Selly Nur Anggraini";
    base.couple.bride.nickName = "Selly";
    base.events.akad.locationName = "Masjid Raya Grand Wisata";
    base.events.akad.address = "Jl. Celebration Boulevard No. 1, Grand Wisata, Bekasi";
    base.events.resepsi.locationName = "Grand Ballroom Wisata Hall";
    base.events.resepsi.address = "Jl. Celebration Boulevard No. 1, Grand Wisata, Bekasi";
    base.gifts.accounts = [
      { id: "1", bankName: "Bank Central Asia (BCA)", accountNumber: "1234567890", accountHolder: "Febri Ananta" },
      { id: "2", bankName: "Bank Mandiri", accountNumber: "9876543210123", accountHolder: "Selly Nur Anggraini" }
    ];
    base.stories = [
      { id: "1", year: "2020", title: "Pertama Bertemu", description: "Takdir mempertemukan kami pertama kali di sebuah acara kampus dan berlanjut menjadi obrolan hangat." },
      { id: "2", year: "2023", title: "Menjalin Hubungan", description: "Setelah saling mengenal dan berbagi impian, kami berkomitmen merajut masa depan bersama." },
      { id: "3", year: "2026", title: "Menuju Pelaminan", description: "Dengan restu kedua orang tua, kami mengikat janji suci pernikahan untuk melangkah bersama selamanya." }
    ];
    return base;
  }

  if (slug === 'demo-sage') {
    base.meta.title = "The Wedding of Dimas & Sarah";
    base.meta.activeTheme = "sage-botanical";
    base.meta.accentColor = "#657D64";
    base.couple.groom.fullName = "Dimas Wicaksono";
    base.couple.groom.nickName = "Dimas";
    base.couple.bride.fullName = "Sarah Annisa";
    base.couple.bride.nickName = "Sarah";
    return base;
  }

  if (slug === 'demo-royal') {
    base.meta.title = "The Wedding of Arga & Kirana";
    base.meta.activeTheme = "royal-gold";
    base.meta.accentColor = "#D4AF37";
    base.couple.groom.fullName = "Arga Bramantyo";
    base.couple.groom.nickName = "Arga";
    base.couple.bride.fullName = "Kirana Larasati";
    base.couple.bride.nickName = "Kirana";
    return base;
  }

  if (slug === 'demo-champagne') {
    base.meta.title = "The Wedding of Reza & Cindy";
    base.meta.activeTheme = "champagne-floral";
    base.meta.accentColor = "#928573";
    base.couple.groom.fullName = "Reza Fahlevi";
    base.couple.groom.nickName = "Reza";
    base.couple.bride.fullName = "Cindy Paramitha";
    base.couple.bride.nickName = "Cindy";
    return base;
  }

  if (slug === 'demo-rose') {
    base.meta.title = "The Wedding of Kevin & Natasha";
    base.meta.activeTheme = "blush-rose";
    base.meta.accentColor = "#BD7878";
    base.couple.groom.fullName = "Kevin Alexander";
    base.couple.groom.nickName = "Kevin";
    base.couple.bride.fullName = "Natasha Aurelia";
    base.couple.bride.nickName = "Natasha";
    return base;
  }

  if (slug === 'demo-emerald') {
    base.meta.title = "The Wedding of Hendra & Nadia";
    base.meta.activeTheme = "emerald-luxury";
    base.meta.accentColor = "#2D5A43";
    base.couple.groom.fullName = "Hendra Setiawan";
    base.couple.groom.nickName = "Hendra";
    base.couple.bride.fullName = "Nadia Safitri";
    base.couple.bride.nickName = "Nadia";
    return base;
  }

  return base;
};
