import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Phone, DollarSign, HelpCircle, Sparkles, 
  Plus, Trash2, CheckCircle2, RefreshCw, ExternalLink, Save, 
  Palette, MessageSquare, AlertCircle
} from 'lucide-react';
import { defaultLandingSettings } from '../../data/defaultLandingSettings';
import { fetchPlatformSettings, savePlatformSettings } from '../../services/apiService';

export const LandingPageEditor = () => {
  const [settings, setSettings] = useState(defaultLandingSettings);
  const [activeSection, setActiveSection] = useState('kontak');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveToast, setSaveToast] = useState(null);

  useEffect(() => {
    const loadSettings = async () => {
      setIsLoading(true);
      try {
        const remote = await fetchPlatformSettings();
        if (remote) {
          setSettings({
            ...defaultLandingSettings,
            ...remote,
            pricingPackages: remote.pricingPackages || defaultLandingSettings.pricingPackages,
            faqs: remote.faqs || defaultLandingSettings.faqs
          });
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    loadSettings();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const ok = await savePlatformSettings(settings);
      if (ok) {
        setSaveToast('Pengaturan Landing Page Berhasil Disimpan!');
        setTimeout(() => setSaveToast(null), 3500);
      } else {
        alert('Gagal menyimpan ke server. Cek koneksi MySQL aaPanel.');
      }
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  // Helper untuk update field top-level
  const updateField = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  // Helper untuk update paket harga
  const updatePackage = (index, key, value) => {
    setSettings(prev => {
      const next = [...prev.pricingPackages];
      next[index] = { ...next[index], [key]: value };
      return { ...prev, pricingPackages: next };
    });
  };

  const updatePackageFeatures = (index, textValue) => {
    const lines = textValue.split('\n').filter(line => line.trim().length > 0);
    setSettings(prev => {
      const next = [...prev.pricingPackages];
      next[index] = { ...next[index], features: lines };
      return { ...prev, pricingPackages: next };
    });
  };

  const addPackage = () => {
    setSettings(prev => ({
      ...prev,
      pricingPackages: [
        ...prev.pricingPackages,
        {
          name: "Paket Baru",
          price: "50.000",
          popular: false,
          features: ["Masa Aktif 3 Bulan", "Pilihan 1 Tema", "Buku Tamu & RSVP"]
        }
      ]
    }));
  };

  const deletePackage = (index) => {
    if (confirm('Yakin ingin menghapus paket harga ini?')) {
      setSettings(prev => ({
        ...prev,
        pricingPackages: prev.pricingPackages.filter((_, i) => i !== index)
      }));
    }
  };

  // Helper untuk FAQ
  const updateFaq = (index, key, value) => {
    setSettings(prev => {
      const next = [...prev.faqs];
      next[index] = { ...next[index], [key]: value };
      return { ...prev, faqs: next };
    });
  };

  const addFaq = () => {
    setSettings(prev => ({
      ...prev,
      faqs: [
        ...prev.faqs,
        { q: "Pertanyaan baru...", a: "Jawaban penjelasan di sini..." }
      ]
    }));
  };

  const deleteFaq = (index) => {
    setSettings(prev => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index)
    }));
  };

  if (isLoading) {
    return (
      <div className="p-12 text-center text-stone-400 space-y-2">
        <RefreshCw className="w-6 h-6 animate-spin mx-auto text-amber-500" />
        <p className="text-xs">Memuat pengaturan halaman depan dari MySQL...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Top Header Card */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-stone-900 border border-stone-800">
        <div className="space-y-1">
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2 font-serif-heading">
            <LayoutDashboard className="w-5 h-5 text-amber-500" />
            <span>Pengelola Landing Page & Paket Harga</span>
          </h2>
          <p className="text-xs text-stone-400">
            Ubah teks halaman depan, nomor WhatsApp pemesanan, paket harga, dan FAQ yang tampil ke pembeli secara dinamis.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
            <span>Lihat Web Depan</span>
          </a>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`px-4 py-2 rounded-xl text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer ${
              saveToast ? 'bg-emerald-600' : 'bg-amber-600 hover:bg-amber-500'
            }`}
          >
            {isSaving ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Menyimpan...</span>
              </>
            ) : saveToast ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-200" />
                <span>{saveToast}</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Simpan Perubahan</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Sub Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-stone-900/90 border border-stone-800">
        {[
          { id: 'kontak', label: 'Kontak & WhatsApp', icon: Phone },
          { id: 'hero', label: 'Teks Banner Hero', icon: Sparkles },
          { id: 'harga', label: 'Paket Harga (Price List)', icon: DollarSign },
          { id: 'faq', label: 'Tanya Jawab (FAQ)', icon: HelpCircle },
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeSection === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                active 
                  ? 'bg-amber-600 text-white shadow-sm' 
                  : 'text-stone-400 hover:text-white hover:bg-stone-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Section 1: Kontak & WhatsApp */}
      {activeSection === 'kontak' && (
        <div className="p-6 rounded-2xl bg-stone-900/60 border border-stone-800 space-y-5">
          <div className="space-y-1 border-b border-stone-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>Identitas Brand & Nomor WhatsApp Pemesanan</span>
            </h3>
            <p className="text-xs text-stone-400">
              Nomor WhatsApp ini akan otomatis menerima chat order setiap kali pengunjung mengklik tombol pesan paket.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1">
                Nama Brand / Web
              </label>
              <input
                type="text"
                value={settings.brandName || ''}
                onChange={(e) => updateField('brandName', e.target.value)}
                placeholder="IpiInvite"
                className="w-full px-3 py-2 rounded-xl bg-stone-800 border border-stone-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1">
                Slogan / Tagline
              </label>
              <input
                type="text"
                value={settings.brandTagline || ''}
                onChange={(e) => updateField('brandTagline', e.target.value)}
                placeholder="Digital Wedding Platform"
                className="w-full px-3 py-2 rounded-xl bg-stone-800 border border-stone-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1">
              Nomor WhatsApp Admin (Gunakan format 62, contoh: 6281234567890)
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={settings.waNumber || ''}
                onChange={(e) => updateField('waNumber', e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="6281234567890"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-stone-800 border border-stone-700 text-white text-sm font-mono focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
            <p className="text-[11px] text-stone-500 mt-1">
              *Pastikan diawali kode negara 62 tanpa spasi dan tanpa tanda strip (-).
            </p>
          </div>
        </div>
      )}

      {/* Section 2: Teks Banner Hero */}
      {activeSection === 'hero' && (
        <div className="p-6 rounded-2xl bg-stone-900/60 border border-stone-800 space-y-5">
          <div className="space-y-1 border-b border-stone-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Teks Banner Utama (Hero Section)</span>
            </h3>
            <p className="text-xs text-stone-400">
              Sesuaikan kata-kata sambutan pada banner utama di halaman depan.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1">
              Badge Promo Teratas
            </label>
            <input
              type="text"
              value={settings.heroBadge || ''}
              onChange={(e) => updateField('heroBadge', e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-stone-800 border border-stone-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1">
              Judul Utama Banner
            </label>
            <input
              type="text"
              value={settings.heroTitle || ''}
              onChange={(e) => updateField('heroTitle', e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-stone-800 border border-stone-700 text-white text-sm font-bold focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1">
              Deskripsi Singkat
            </label>
            <textarea
              rows={3}
              value={settings.heroDescription || ''}
              onChange={(e) => updateField('heroDescription', e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-stone-800 border border-stone-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none leading-relaxed"
            />
          </div>
        </div>
      )}

      {/* Section 3: Paket Harga (Price List) */}
      {activeSection === 'harga' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-stone-900 border border-stone-800">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-amber-400" />
                <span>Daftar Paket Harga & Fitur</span>
              </h3>
              <p className="text-xs text-stone-400">
                Atur harga, nama paket, dan daftar centang fitur yang diperoleh pembeli.
              </p>
            </div>
            <button
              onClick={addPackage}
              className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Paket</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {(settings.pricingPackages || []).map((pkg, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-stone-500">#{idx + 1}</span>
                    <button
                      onClick={() => deletePackage(idx)}
                      className="text-stone-500 hover:text-rose-400 transition-colors p-1"
                      title="Hapus paket ini"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase text-stone-400 mb-1">
                      Nama Paket
                    </label>
                    <input
                      type="text"
                      value={pkg.name}
                      onChange={(e) => updatePackage(idx, 'name', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-stone-800 border border-stone-700 text-white text-xs font-bold focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase text-stone-400 mb-1">
                      Harga (Format angka ribuan, misal: 79.000)
                    </label>
                    <div className="flex items-center">
                      <span className="px-2.5 py-1.5 rounded-l-lg bg-stone-800 border border-r-0 border-stone-700 text-stone-400 text-xs font-bold">
                        Rp
                      </span>
                      <input
                        type="text"
                        value={pkg.price}
                        onChange={(e) => updatePackage(idx, 'price', e.target.value)}
                        className="w-full px-3 py-1.5 rounded-r-lg bg-stone-800 border border-stone-700 text-white text-xs font-mono font-bold focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={pkg.popular || false}
                        onChange={(e) => updatePackage(idx, 'popular', e.target.checked)}
                        className="rounded border-stone-700 text-amber-600 focus:ring-amber-500 w-4 h-4"
                      />
                      <span className="text-xs text-stone-300 font-semibold">
                        Tandai sebagai "Paling Populer" (Badge Khusus)
                      </span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase text-stone-400 mb-1">
                      Daftar Fitur (1 baris per fitur)
                    </label>
                    <textarea
                      rows={6}
                      value={(pkg.features || []).join('\n')}
                      onChange={(e) => updatePackageFeatures(idx, e.target.value)}
                      placeholder="Masa Aktif 6 Bulan&#10;Bebas Ganti Tema&#10;Kirim WA 1-Klik"
                      className="w-full px-3 py-2 rounded-lg bg-stone-800 border border-stone-700 text-white text-xs font-mono leading-relaxed focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-2 text-[10px] text-stone-500 text-center border-t border-stone-800/80">
                  {(pkg.features || []).length} poin fitur aktif
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Section 4: Tanya Jawab (FAQ) */}
      {activeSection === 'faq' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-stone-900 border border-stone-800">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-400" />
                <span>Pertanyaan yang Sering Diajukan (FAQ)</span>
              </h3>
              <p className="text-xs text-stone-400">
                Kelola tanya jawab untuk menjawab keraguan calon pembeli di halaman depan.
              </p>
            </div>
            <button
              onClick={addFaq}
              className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah FAQ</span>
            </button>
          </div>

          <div className="space-y-3">
            {(settings.faqs || []).map((faq, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-xl bg-stone-900/80 border border-stone-800 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400">Pertanyaan #{idx + 1}</span>
                  <button
                    onClick={() => deleteFaq(idx)}
                    className="text-stone-500 hover:text-rose-400 transition-colors p-1"
                    title="Hapus FAQ"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <input
                    type="text"
                    value={faq.q}
                    onChange={(e) => updateFaq(idx, 'q', e.target.value)}
                    placeholder="Pertanyaan..."
                    className="w-full px-3 py-2 rounded-lg bg-stone-800 border border-stone-700 text-white text-xs font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <textarea
                    rows={2}
                    value={faq.a}
                    onChange={(e) => updateFaq(idx, 'a', e.target.value)}
                    placeholder="Jawaban penjelasan..."
                    className="w-full px-3 py-2 rounded-lg bg-stone-800 border border-stone-700 text-stone-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none leading-relaxed"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
