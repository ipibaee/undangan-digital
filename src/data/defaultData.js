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
