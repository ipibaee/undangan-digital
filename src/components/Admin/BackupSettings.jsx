import React, { useState } from 'react';
import { useInvitation } from '../../context/InvitationContext';
import { Shield, Download, Upload, RotateCcw, Key, AlertTriangle, CloudUpload, CheckCircle2, RefreshCw } from 'lucide-react';

export const BackupSettings = () => {
  const { 
    data, updateField, exportDataJson, importDataJson, resetData, 
    dbStatus = { connected: false }, saveToCloudNow, isSavingCloud, lastSavedCloud 
  } = useInvitation();
  const [newPin, setNewPin] = useState(data.meta.adminPin === '1234' ? '292003' : (data.meta.adminPin || '292003'));
  const [pinSaved, setPinSaved] = useState(false);
  const [cloudSyncMsg, setCloudSyncMsg] = useState(null);

  const handleManualSync = async () => {
    setCloudSyncMsg(null);
    const res = await saveToCloudNow();
    if (res.success) {
      setCloudSyncMsg('✅ Berhasil disinkronkan ke Database Cloud Neon! Tampilan di HP & semua tamu sudah terupdate.');
    } else {
      setCloudSyncMsg('❌ Gagal sinkronisasi: ' + (res.message || 'Cek koneksi internet'));
    }
  };

  const handleSavePin = (e) => {
    e.preventDefault();
    if (!newPin.trim()) return;
    updateField('meta.adminPin', newPin.trim());
    setPinSaved(true);
    setTimeout(() => setPinSaved(false), 3000);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        importDataJson(content);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-8 text-stone-100 text-xs">
      
      {/* Neon Tech Database Connection Status */}
      <div className="p-6 rounded-2xl bg-stone-800 border border-stone-700 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>Database Cloud Neon Tech (Serverless PostgreSQL)</span>
          </h3>
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
            dbStatus.connected 
              ? 'bg-emerald-950 text-emerald-300 border border-emerald-700' 
              : 'bg-stone-700 text-stone-300 border border-stone-600'
          }`}>
            {dbStatus.connected ? 'Terhubung ke Neon Tech' : 'Mode Penyimpanan Lokal'}
          </span>
        </div>

        <p className="text-stone-300 leading-relaxed">
          {dbStatus.connected
            ? 'Aplikasi telah terhubung ke database Neon Tech. Setiap doa restu dari tamu dan perubahan data akan tersimpan langsung di server cloud PostgreSQL.'
            : 'Saat ini berjalan di mode lokal browser. Ketika Anda deploy ke Vercel dan memasukkan DATABASE_URL dari neon.tech, aplikasi akan otomatis beralih ke database Neon Tech tanpa perlu ubah kode.'}
        </p>

        {/* Sync Local to Cloud Button */}
        <div className="p-4 rounded-xl bg-stone-900 border border-emerald-800/50 space-y-3">
          <div className="flex items-center justify-between">
            <p className="font-bold text-stone-200 flex items-center gap-1.5">
              <CloudUpload className="w-4 h-4 text-emerald-400" />
              <span>Sinkronkan Data ke Database Cloud (HP & Tamu)</span>
            </p>
            {lastSavedCloud && (
              <span className="text-emerald-400 font-mono text-[10px]">Tersimpan: {lastSavedCloud}</span>
            )}
          </div>
          <p className="text-stone-400 leading-relaxed">
            Klik tombol di bawah untuk memaksa seluruh data yang baru Anda edit di komputer ini (mempelai, acara, foto, maps) tersimpan ke server database cloud agar HP dan semua tamu undangan langsung melihat versi terbaru.
          </p>
          <button
            type="button"
            onClick={handleManualSync}
            disabled={isSavingCloud}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold flex items-center gap-2 shadow cursor-pointer transition-all active:scale-95"
          >
            {isSavingCloud ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Sedang Mengirim ke Cloud...</span>
              </>
            ) : (
              <>
                <CloudUpload className="w-4 h-4" />
                <span>Kirim & Sinkronkan Sekarang</span>
              </>
            )}
          </button>
          {cloudSyncMsg && (
            <p className="text-xs font-medium p-2.5 rounded-lg bg-stone-800 border border-stone-700 text-stone-200">
              {cloudSyncMsg}
            </p>
          )}
        </div>
      </div>

      {/* PIN Security Settings */}
      <div className="p-6 rounded-2xl bg-stone-800 border border-stone-700 space-y-4">
        <h3 className="font-bold text-sm text-white flex items-center gap-2">
          <Key className="w-4 h-4 text-amber-500" />
          <span>PIN Akses Panel Pengelola</span>
        </h3>
        <p className="text-stone-400">
          Ubah PIN keamanan untuk mengunci panel pengelola ini dari akses umum.
        </p>

        <form onSubmit={handleSavePin} className="flex gap-2 max-w-xs">
          <input
            type="password"
            maxLength={8}
            value={newPin}
            onChange={(e) => setNewPin(e.target.value)}
            className="flex-1 px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-white font-mono text-center tracking-widest text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold shadow"
          >
            {pinSaved ? 'Tersimpan!' : 'Simpan PIN'}
          </button>
        </form>
      </div>


      {/* Backup & Restore */}
      <div className="p-6 rounded-2xl bg-stone-800 border border-stone-700 space-y-4">
        <h3 className="font-bold text-sm text-white flex items-center gap-2">
          <Download className="w-4 h-4 text-amber-500" />
          <span>Cadangkan & Pulihkan Data (Backup & Restore JSON)</span>
        </h3>
        <p className="text-stone-400 leading-relaxed">
          Simpan seluruh data undangan, foto, ucapan, dan daftar buku tamu ke dalam satu file berkas JSON agar aman saat ganti perangkat atau sebagai arsip.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={exportDataJson}
            className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold flex items-center gap-2 shadow"
          >
            <Download className="w-4 h-4" />
            <span>Unduh Cadangan (Export JSON)</span>
          </button>

          <label className="px-5 py-2.5 rounded-xl bg-stone-700 hover:bg-stone-600 text-white font-semibold flex items-center gap-2 cursor-pointer shadow">
            <Upload className="w-4 h-4 text-amber-400" />
            <span>Pulihkan Dari File JSON (Import)</span>
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Reset to Default */}
      <div className="p-6 rounded-2xl bg-rose-950/30 border border-rose-800/50 space-y-4">
        <h3 className="font-bold text-sm text-rose-300 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-rose-500" />
          <span>Reset ke Pengaturan Awal Pabrik</span>
        </h3>
        <p className="text-stone-400">
          Mengembalikan semua konfigurasi, foto, jadwal, dan daftar tamu ke data demo awal (The Wedding of Justin & Sisca).
        </p>

        <button
          onClick={resetData}
          className="px-4 py-2 rounded-xl bg-rose-800 hover:bg-rose-700 text-white font-semibold flex items-center gap-2 shadow"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset Seluruh Data</span>
        </button>
      </div>

    </div>
  );
};
