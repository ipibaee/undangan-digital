import React, { useState, useEffect } from 'react';
import { useInvitation } from '../../context/InvitationContext';
import { fetchAllInvitations, saveRemoteData } from '../../services/apiService';
import { 
  Users, Plus, ExternalLink, Edit3, Trash2, Copy, Check, 
  Sparkles, RefreshCw, FolderHeart, ShieldCheck, KeyRound, 
  Send, Dices, Lock
} from 'lucide-react';
import { getPresetDataForSlug } from '../../data/defaultData';
import { themes } from '../../data/themes';

export const ClientInvitationManager = () => {
  const { currentSlug, effectiveSlug } = useInvitation();
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [copiedSlug, setCopiedSlug] = useState(null);
  const [copiedWaSlug, setCopiedWaSlug] = useState(null);

  // Form state untuk buat undangan baru
  const [newSlug, setNewSlug] = useState('');
  const [groomNick, setGroomNick] = useState('');
  const [brideNick, setBrideNick] = useState('');
  const [newPassword, setNewPassword] = useState('123456');
  const [chosenTheme, setChosenTheme] = useState('punakawan-terracotta');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadAll = async () => {
    setLoading(true);
    try {
      const list = await fetchAllInvitations();
      setInvitations(list);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const generateRandomPassword = () => {
    const chars = '0123456789';
    let res = '';
    for (let i = 0; i < 6; i++) {
      res += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewPassword(res);
  };

  const handleCreateNew = async (e) => {
    e.preventDefault();
    const cleanSlug = newSlug.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '-');
    if (!cleanSlug) {
      alert('Mohon masukkan slug URL undangan (misal: dimas-lilis)');
      return;
    }

    setIsSubmitting(true);
    try {
      // Ambil template dasar lalu sesuaikan dengan nama mempelai dan tema yang dipilih
      const templateData = getPresetDataForSlug(cleanSlug);
      templateData.couple.groom.nickName = groomNick || 'Pria';
      templateData.couple.groom.fullName = groomNick ? `Mempelai Pria (${groomNick})` : 'Mempelai Pria';
      templateData.couple.bride.nickName = brideNick || 'Wanita';
      templateData.couple.bride.fullName = brideNick ? `Mempelai Wanita (${brideNick})` : 'Mempelai Wanita';
      templateData.meta.activeTheme = chosenTheme;
      templateData.meta.title = `The Wedding of ${templateData.couple.groom.nickName} & ${templateData.couple.bride.nickName}`;

      const res = await saveRemoteData(templateData, cleanSlug, newPassword.trim() || '123456');
      if (res) {
        alert(`Undangan "${cleanSlug}" dengan password "${newPassword}" berhasil dibuat! Mengalihkan ke panel undangan baru...`);
        window.location.href = `/${cleanSlug}/admin`;
      } else {
        alert('Gagal membuat undangan di database. Cek koneksi server aaPanel.');
      }
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyLink = (slug) => {
    const origin = window.location.origin;
    const url = `${origin}/${slug}?to=Tamu+Undangan`;
    navigator.clipboard.writeText(url);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2500);
  };

  const handleCopyClientWaFormat = (inv) => {
    const origin = window.location.origin;
    const clientPass = inv.client_password || '123456';
    const message = 
`Halo Kakak Mempelai, terima kasih telah memesan undangan digital di IpiInvite! 🎉

Berikut detail akses undangan pernikahan Anda:
🌐 Link Undangan: ${origin}/${inv.slug}
🔑 Panel Pengelola: ${origin}/${inv.slug}/admin
🔒 Password Panel: ${clientPass}

Kakak bisa langsung masuk ke Panel Pengelola untuk melengkapi foto prewedding, rincian acara, nomor rekening kado/amplop digital, serta menyebarkan undangan ke tamu via WhatsApp.

Jika ada yang perlu dibantu, jangan ragu hubungi kami ya. Semoga acaranya lancar dan berkah! ✨`;

    navigator.clipboard.writeText(message);
    setCopiedWaSlug(inv.slug);
    setTimeout(() => setCopiedWaSlug(null), 2500);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-stone-900 border border-stone-800">
        <div className="space-y-1">
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2 font-serif-heading">
            <FolderHeart className="w-5 h-5 text-amber-500" />
            <span>Manajemen Multi-Undangan Klien</span>
          </h2>
          <p className="text-xs text-stone-400">
            Kelola seluruh undangan pernikahan digital klien dalam satu database server VPS aaPanel.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadAll}
            className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 transition-all cursor-pointer"
            title="Segarkan daftar"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Buat Undangan Baru</span>
          </button>
        </div>
      </div>

      {/* List of Invitations */}
      {loading ? (
        <div className="p-12 text-center text-stone-400 space-y-2">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto text-amber-500" />
          <p className="text-xs">Memuat daftar undangan klien dari MySQL...</p>
        </div>
      ) : invitations.length === 0 ? (
        <div className="p-12 rounded-2xl bg-stone-900 border border-stone-800 text-center space-y-4">
          <FolderHeart className="w-10 h-10 text-stone-600 mx-auto" />
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white">Belum Ada Undangan Klien Tambahan</h3>
            <p className="text-xs text-stone-400 max-w-sm mx-auto">
              Klik tombol "Buat Undangan Baru" untuk membuat link undangan kustom untuk klien pertama Anda.
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Buat Sekarang</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {invitations.map((inv) => {
            const isCurrent = (inv.slug === effectiveSlug) || (!currentSlug && inv.slug === 'default');
            const themeInfo = themes[inv.theme_id] || themes['sage-botanical'];

            return (
              <div 
                key={inv.id || inv.slug}
                className={`p-5 rounded-2xl border transition-all space-y-4 ${
                  isCurrent 
                    ? 'bg-stone-900 border-amber-500/60 shadow-lg ring-1 ring-amber-500/30' 
                    : 'bg-stone-900/70 border-stone-800 hover:border-stone-700'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        /{inv.slug}
                      </span>
                      {isCurrent && (
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          Aktif Dipilih
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-sm text-white">
                      {inv.title || 'Undangan Digital'}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-stone-400">
                      <span>Tema: <strong>{themeInfo.name}</strong></span>
                      <div className="flex items-center gap-1 text-amber-300 font-mono bg-stone-950 px-2 py-0.5 rounded border border-stone-800">
                        <Lock className="w-3 h-3 text-amber-400" />
                        <span>Pass: <strong>{inv.client_password || '123456'}</strong></span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-3 border-t border-stone-800 flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => handleCopyClientWaFormat(inv)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                      copiedWaSlug === inv.slug 
                        ? 'bg-emerald-600 text-white' 
                        : 'bg-emerald-800/40 hover:bg-emerald-700/60 text-emerald-300 border border-emerald-500/40'
                    }`}
                    title="Salin rincian akun lengkap untuk dikirimkan ke klien via WhatsApp"
                  >
                    {copiedWaSlug === inv.slug ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Rincian WA Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Salin Akun untuk Klien</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleCopyLink(inv.slug)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1 transition-all cursor-pointer ${
                      copiedSlug === inv.slug 
                        ? 'bg-emerald-600 text-white' 
                        : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                    }`}
                  >
                    {copiedSlug === inv.slug ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Link Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Link</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`/${inv.slug}?to=Tamu+Undangan`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium flex items-center gap-1 transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
                    <span>Lihat</span>
                  </a>

                  <a
                    href={`/${inv.slug}/admin`}
                    className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold flex items-center gap-1 transition-all ml-auto"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Buka Panel</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create New Invitation Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl animate-fade-in text-stone-200">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white flex items-center gap-2 font-serif-heading">
                <Plus className="w-5 h-5 text-amber-500" />
                <span>Buat Undangan Klien Baru</span>
              </h3>
              <p className="text-xs text-stone-400">
                Tentukan slug URL unik (misal: <code>budi-ani</code>) dan password panel untuk klien baru Anda.
              </p>
            </div>

            <form onSubmit={handleCreateNew} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1">
                  Slug URL Undangan (Tanpa spasi / simbol aneh)
                </label>
                <div className="flex items-center">
                  <span className="px-3 py-2.5 rounded-l-xl bg-stone-800 border border-r-0 border-stone-700 text-stone-400 text-xs font-mono">
                    domain.com/
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="contoh: dimas-lilis"
                    value={newSlug}
                    onChange={(e) => setNewSlug(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, '-'))}
                    className="w-full px-3 py-2.5 rounded-r-xl bg-stone-800/80 border border-stone-700 text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1">
                    Panggilan Pria
                  </label>
                  <input
                    type="text"
                    placeholder="Dimas"
                    value={groomNick}
                    onChange={(e) => setGroomNick(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-stone-800/80 border border-stone-700 text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1">
                    Panggilan Wanita
                  </label>
                  <input
                    type="text"
                    placeholder="Lilis"
                    value={brideNick}
                    onChange={(e) => setBrideNick(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-stone-800/80 border border-stone-700 text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300">
                    Password Panel Klien
                  </label>
                  <button
                    type="button"
                    onClick={generateRandomPassword}
                    className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer font-medium"
                  >
                    <Dices className="w-3.5 h-3.5" />
                    <span>Acak 6 Angka</span>
                  </button>
                </div>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="123456"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-stone-800/80 border border-stone-700 text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <p className="text-[10px] text-stone-500 mt-1">
                  *Password ini yang akan diberikan ke klien agar bisa mengedit undangannya sendiri.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1">
                  Pilih Tema Desain Awal
                </label>
                <select
                  value={chosenTheme}
                  onChange={(e) => setChosenTheme(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-stone-800 border border-stone-700 text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  {Object.entries(themes).map(([key, t]) => (
                    <option key={key} value={key}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Menyimpan ke MySQL...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                      <span>Buat Undangan Sekarang</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
