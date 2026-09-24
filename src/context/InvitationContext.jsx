import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { initialInvitationData } from '../data/defaultData';
import { themes } from '../data/themes';
import { 
  checkDbStatus, fetchRemoteData, saveRemoteData, 
  submitRemoteWish, replyRemoteWish, deleteRemoteWish 
} from '../services/apiService';

const STORAGE_KEY = 'undangan_digital_data_v1';

const InvitationContext = createContext(null);

const isTemplateData = (d) => {
  if (!d || !d.couple) return true;
  const isDefaultGroom = d.couple?.groom?.fullName === "Justin Pratama, S.Kom." && d.couple?.groom?.nickName === "Justin";
  const isDefaultBride = d.couple?.bride?.fullName === "Fransisca Anggraini, S.E." && d.couple?.bride?.nickName === "Sisca";
  const isDefaultAddress = d.events?.akad?.address?.includes("Kebayoran Baru");
  return Boolean(isDefaultGroom && isDefaultBride && isDefaultAddress);
};

export const InvitationProvider = ({ children }) => {
  // Load initial data from localStorage if exists
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed reading stored data', e);
    }
    return initialInvitationData;
  });

  // Database status (Neon Tech Serverless Postgres)
  const [dbStatus, setDbStatus] = useState({ connected: false, provider: 'checking' });
  const [isSavingCloud, setIsSavingCloud] = useState(false);
  const [lastSavedCloud, setLastSavedCloud] = useState(null);

  // Initial cloud loading state to prevent showing old template before DB loads
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // Invitation open state (splash screen passed)
  const [isOpen, setIsOpen] = useState(false);
  
  // Background music audio control
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Guest name extracted from URL query (?kpd=... or ?to=...)
  const [guestName, setGuestName] = useState('Tamu Undangan');

  // Manual or on-demand push to Neon cloud
  const saveToCloudNow = async (explicitData) => {
    const payload = explicitData || data;
    setIsSavingCloud(true);
    try {
      const ok = await saveRemoteData(payload);
      if (ok) {
        const timeStr = new Date().toLocaleTimeString('id-ID');
        setLastSavedCloud(timeStr);
        setDbStatus(prev => ({ ...prev, connected: true }));
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
        } catch (e) {}
        return { success: true, time: timeStr };
      }
      return { success: false, message: 'Server database gagal menyimpan' };
    } catch (err) {
      return { success: false, message: err.message };
    } finally {
      setIsSavingCloud(false);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const kpdParam = params.get('kpd') || params.get('to');
    if (kpdParam) {
      setGuestName(decodeURIComponent(kpdParam));
    }

    // Safety timeout to ensure loading screen never hangs longer than 2.5s
    const safetyTimer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 2500);

    // Check Neon Tech cloud database connection
    const syncCloudDb = async () => {
      try {
        const status = await checkDbStatus();
        setDbStatus(status);
        if (status.connected) {
          const remoteData = await fetchRemoteData();
          if (remoteData && remoteData.couple) {
            setData(remoteData);
            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify(remoteData));
            } catch (e) {}
          }
        }
      } catch (err) {
        setDbStatus({ connected: false, provider: 'local' });
      } finally {
        setIsInitialLoading(false);
        clearTimeout(safetyTimer);
      }
    };
    syncCloudDb();

    return () => clearTimeout(safetyTimer);
  }, []);

  // Save to localStorage whenever data changes + sync to Neon if connected
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      if (dbStatus.connected) {
        const timer = setTimeout(() => {
          saveRemoteData(data).then(ok => {
            if (ok) setLastSavedCloud(new Date().toLocaleTimeString('id-ID'));
          });
        }, 1500);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      console.error('Failed to save data', e);
    }
  }, [data, dbStatus.connected]);


  // Audio setup
  useEffect(() => {
    if (!audioRef.current && data.music?.url) {
      audioRef.current = new Audio(data.music.url);
      audioRef.current.loop = true;
    } else if (audioRef.current && data.music?.url) {
      if (audioRef.current.src !== data.music.url) {
        const wasPlaying = isPlaying;
        audioRef.current.src = data.music.url;
        if (wasPlaying) {
          audioRef.current.play().catch(() => {});
        }
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [data.music?.url]);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.warn('Audio play prevented:', err);
      });
    }
  };

  const openInvitation = () => {
    setIsOpen(true);
    // Auto play audio upon user interaction
    if (audioRef.current && data.music?.enabled) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.warn('Audio play restricted by browser:', err);
      });
    }
  };

  // Helper to deep update fields by dotted string path, e.g. "couple.groom.fullName"
  const updateField = (path, value) => {
    setData(prev => {
      const copy = JSON.parse(JSON.stringify(prev));
      const parts = path.split('.');
      let current = copy;
      for (let i = 0; i < parts.length - 1; i++) {
        if (!current[parts[i]]) current[parts[i]] = {};
        current = current[parts[i]];
      }
      current[parts[parts.length - 1]] = value;
      return copy;
    });
  };

  const updateFullData = (newData) => {
    setData(newData);
  };

  const resetData = () => {
    if (window.confirm('Apakah Anda yakin ingin mereset seluruh data kembali ke pengaturan awal (The Wedding of Justin & Sisca)?')) {
      setData(initialInvitationData);
      localStorage.removeItem(STORAGE_KEY);
      alert('Data berhasil direset ke pengaturan awal!');
    }
  };

  const exportDataJson = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `undangan_digital_${data.couple.groom.nickName}_${data.couple.bride.nickName}_backup.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importDataJson = (jsonStr) => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.couple && parsed.events) {
        setData(parsed);
        alert('Data undangan berhasil diimpor!');
        return true;
      } else {
        alert('Format file JSON tidak valid!');
        return false;
      }
    } catch (e) {
      alert('Gagal membaca file JSON: ' + e.message);
      return false;
    }
  };

  // Guest Management
  const addGuest = (guest) => {
    const newGuest = {
      id: 'guest-' + Date.now(),
      name: guest.name.trim(),
      phone: guest.phone ? guest.phone.replace(/[^0-9]/g, '') : '',
      category: guest.category || 'Umum',
      sent: false,
      sentAt: null,
      checkedIn: false
    };
    setData(prev => ({
      ...prev,
      guests: [newGuest, ...prev.guests]
    }));
  };

  const deleteGuest = (id) => {
    setData(prev => ({
      ...prev,
      guests: prev.guests.filter(g => g.id !== id)
    }));
  };

  const toggleGuestSent = (id) => {
    setData(prev => ({
      ...prev,
      guests: prev.guests.map(g => {
        if (g.id === id) {
          const nextSent = !g.sent;
          return {
            ...g,
            sent: nextSent,
            sentAt: nextSent ? new Date().toLocaleString('id-ID') : null
          };
        }
        return g;
      })
    }));
  };

  const bulkAddGuests = (textLines) => {
    const lines = textLines.split('\n').map(l => l.trim()).filter(Boolean);
    const newItems = [];
    for (const line of lines) {
      // Formats supported: "Nama, NoWA, Kategori" or "Nama - NoWA" or just "Nama"
      let name = line;
      let phone = '';
      let category = 'Umum';

      if (line.includes(',')) {
        const parts = line.split(',');
        name = parts[0]?.trim() || '';
        phone = parts[1]?.trim().replace(/[^0-9]/g, '') || '';
        category = parts[2]?.trim() || 'Umum';
      } else if (line.includes('-')) {
        const parts = line.split('-');
        name = parts[0]?.trim() || '';
        phone = parts[1]?.trim().replace(/[^0-9]/g, '') || '';
      }

      if (name) {
        newItems.push({
          id: 'guest-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
          name,
          phone,
          category,
          sent: false,
          sentAt: null,
          checkedIn: false
        });
      }
    }

    if (newItems.length > 0) {
      setData(prev => ({
        ...prev,
        guests: [...newItems, ...prev.guests]
      }));
      return newItems.length;
    }
    return 0;
  };

  const checkInGuest = (identifier) => {
    let matched = null;
    setData(prev => {
      const nextGuests = prev.guests.map(g => {
        if (g.id === identifier || g.name.toLowerCase() === identifier.toLowerCase()) {
          matched = g;
          return { ...g, checkedIn: true, checkInTime: new Date().toLocaleTimeString('id-ID') };
        }
        return g;
      });
      return { ...prev, guests: nextGuests };
    });
    return matched;
  };

  // Wishes / RSVP Management
  const addWish = (wish) => {
    const newWish = {
      id: 'w-' + Date.now(),
      name: wish.name || guestName || 'Anonim',
      relation: wish.relation || 'Tamu',
      attendance: wish.attendance || 'hadir',
      pax: Number(wish.pax) || 1,
      message: wish.message || '',
      createdAt: new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }),
      reply: ''
    };
    setData(prev => ({
      ...prev,
      wishes: [newWish, ...prev.wishes]
    }));
    if (dbStatus.connected) {
      submitRemoteWish(newWish);
    }
  };

  const replyWish = (id, replyText) => {
    setData(prev => ({
      ...prev,
      wishes: prev.wishes.map(w => w.id === id ? { ...w, reply: replyText } : w)
    }));
    if (dbStatus.connected) {
      replyRemoteWish(id, replyText);
    }
  };

  const deleteWish = (id) => {
    setData(prev => ({
      ...prev,
      wishes: prev.wishes.filter(w => w.id !== id)
    }));
    if (dbStatus.connected) {
      deleteRemoteWish(id);
    }
  };

  // Get current active theme config
  const currentTheme = themes[data.meta.activeTheme] || themes['champagne-floral'];

  return (
    <InvitationContext.Provider
      value={{
        data,
        setData,
        dbStatus,
        guestName,
        setGuestName,
        currentTheme,

        isOpen,
        openInvitation,
        isPlaying,
        toggleMusic,
        updateField,
        updateFullData,
        resetData,
        exportDataJson,
        importDataJson,
        addGuest,
        deleteGuest,
        toggleGuestSent,
        bulkAddGuests,
        checkInGuest,
        addWish,
        replyWish,
        deleteWish,
        saveToCloudNow,
        isSavingCloud,
        lastSavedCloud,
        isInitialLoading,
      }}
    >
      {children}
    </InvitationContext.Provider>
  );
};

export const useInvitation = () => {
  const context = useContext(InvitationContext);
  if (!context) {
    throw new Error('useInvitation must be used within an InvitationProvider');
  }
  return context;
};
