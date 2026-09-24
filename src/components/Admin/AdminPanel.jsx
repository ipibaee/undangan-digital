import React, { useState } from 'react';
import { useInvitation } from '../../context/InvitationContext';
import { 
  Users, Calendar, BookHeart, Gift, Palette, MessageSquare, 
  Settings, ExternalLink, ArrowLeft, Shield, Sparkles, Check,
  CloudUpload, CheckCircle2, RefreshCw
} from 'lucide-react';
import { GuestBookManager } from './GuestBookManager';
import { CoupleEditor } from './CoupleEditor';
import { EventEditor } from './EventEditor';
import { StoryGalleryEditor } from './StoryGalleryEditor';
import { GiftEditor } from './GiftEditor';
import { ThemeMusicEditor } from './ThemeMusicEditor';
import { WishesModerator } from './WishesModerator';
import { BackupSettings } from './BackupSettings';

export const AdminPanel = ({ onExitAdmin }) => {
  const { data, dbStatus, saveToCloudNow, isSavingCloud, lastSavedCloud } = useInvitation();
  const [activeTab, setActiveTab] = useState('buku-tamu');
  const [saveToast, setSaveToast] = useState(null);

  const handleManualSave = async () => {
    const res = await saveToCloudNow();
    if (res.success) {
      setSaveToast('Tersimpan di Cloud!');
      setTimeout(() => setSaveToast(null), 3500);
    } else {
      alert('Gagal menyimpan ke cloud: ' + (res.message || 'Cek koneksi internet'));
    }
  };

  const unrepliedCount = (data.wishes || []).filter(w => !w.reply).length;

  const tabs = [
    { id: 'buku-tamu', label: 'Buku Tamu & Sebar WA', icon: Users, badge: 'Utama' },
    { id: 'ucapan', label: 'Balas Ucapan Tamu', icon: MessageSquare, badge: unrepliedCount > 0 ? `${unrepliedCount} Baru` : null, count: unrepliedCount === 0 ? data.wishes?.length : undefined },
    { id: 'mempelai', label: 'Profil Mempelai', icon: Users },
    { id: 'acara', label: 'Jadwal & Lokasi', icon: Calendar },
    { id: 'cerita-galeri', label: 'Galeri, Cerita & Streaming', icon: BookHeart },
    { id: 'kado', label: 'Amplop & Kado', icon: Gift },
    { id: 'tema-musik', label: 'Tema & Musik', icon: Palette },
    { id: 'backup', label: 'Pengaturan & Backup', icon: Settings },
  ];


  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col">
      
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-stone-900/90 backdrop-blur-md border-b border-stone-800 px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-bold text-white flex items-center gap-1.5 font-serif-heading">
              <span>Panel Pengelola</span>
              <span className="text-xs text-amber-400 font-normal">({data.couple?.groom?.nickName} & {data.couple?.bride?.nickName})</span>
            </h1>
            <p className="text-[11px] text-stone-400 flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${dbStatus.connected ? 'bg-emerald-400' : 'bg-amber-400'}`} />
              <span>{dbStatus.connected ? 'Terhubung Database Cloud (Neon)' : 'Penyimpanan Lokal'}</span>
              {lastSavedCloud && <span className="text-emerald-400 font-mono text-[10px]">• Tersimpan {lastSavedCloud}</span>}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Cloud Save Button */}
          <button
            type="button"
            onClick={handleManualSave}
            disabled={isSavingCloud}
            className={`px-3.5 py-2 rounded-xl text-white font-semibold text-xs tracking-wide flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer ${
              saveToast ? 'bg-emerald-600' : 'bg-emerald-700 hover:bg-emerald-600'
            }`}
            title="Simpan data ke server cloud Neon agar langsung tampil di HP dan semua tamu"
          >
            {isSavingCloud ? (
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
                <CloudUpload className="w-3.5 h-3.5 text-emerald-300" />
                <span>Simpan ke Cloud (HP)</span>
              </>
            )}
          </button>

          {/* Back to Invitation preview */}
          <button
            onClick={onExitAdmin}
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs tracking-wide flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Lihat Undangan</span>
          </button>
        </div>
      </header>

      {/* Main Admin Body */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto p-4 sm:p-6 gap-6">
        
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="sticky top-20 p-2 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-1 shadow-lg">
            <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-stone-500">
              Menu Pengaturan
            </p>

            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-medium flex items-center justify-between transition-all ${
                    isActive
                      ? 'bg-amber-600 text-white font-bold shadow-md'
                      : 'text-stone-300 hover:bg-stone-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </div>

                  {tab.badge && (
                    <span className="px-1.5 py-0.2 rounded text-[10px] bg-amber-400 text-stone-900 font-extrabold uppercase">
                      {tab.badge}
                    </span>
                  )}

                  {tab.count !== undefined && !tab.badge && (
                    <span className="text-[11px] text-stone-400 font-mono">
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Tab Content Panel */}
        <main className="flex-1 min-w-0">
          <div className="p-6 sm:p-8 rounded-3xl bg-stone-900/60 border border-stone-800 shadow-xl backdrop-blur-sm">
            {activeTab === 'buku-tamu' && <GuestBookManager />}
            {activeTab === 'mempelai' && <CoupleEditor />}
            {activeTab === 'acara' && <EventEditor />}
            {activeTab === 'cerita-galeri' && <StoryGalleryEditor />}
            {activeTab === 'kado' && <GiftEditor />}
            {activeTab === 'tema-musik' && <ThemeMusicEditor />}
            {activeTab === 'ucapan' && <WishesModerator />}
            {activeTab === 'backup' && <BackupSettings />}
          </div>
        </main>

      </div>

    </div>
  );
};
