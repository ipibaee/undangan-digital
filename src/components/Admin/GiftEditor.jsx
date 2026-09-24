import React, { useState } from 'react';
import { useInvitation } from '../../context/InvitationContext';
import { Gift, CreditCard, Plus, Trash2, MapPin, QrCode } from 'lucide-react';
import { ImageUploadInput } from '../common/ImageUploadInput';

export const GiftEditor = () => {
  const { data, updateField } = useInvitation();
  const gifts = data.gifts || {};
  const accounts = gifts.accounts || [];
  const qris = gifts.qris || {};


  const [newAcc, setNewAcc] = useState({ bankName: 'BCA', accountNumber: '', accountHolder: '' });

  const handleAddAccount = (e) => {
    e.preventDefault();
    if (!newAcc.accountNumber || !newAcc.accountHolder) return;
    const item = { ...newAcc, id: 'b-' + Date.now() };
    updateField('gifts.accounts', [...accounts, item]);
    setNewAcc({ bankName: 'BCA', accountNumber: '', accountHolder: '' });
  };

  const handleDeleteAccount = (id) => {
    updateField('gifts.accounts', accounts.filter(a => a.id !== id));
  };

  return (
    <div className="space-y-8 text-stone-100">
      
      {/* Enable Toggle & Header */}
      <div className="p-6 rounded-2xl bg-stone-800 border border-stone-700 space-y-4 text-xs">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <Gift className="w-4 h-4 text-amber-500" />
            <span>Fitur Titip Kado & Amplop Digital</span>
          </h3>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={gifts.enabled}
              onChange={(e) => updateField('gifts.enabled', e.target.checked)}
              className="rounded bg-stone-900 border-stone-700 text-amber-600 focus:ring-0"
            />
            <span className="font-semibold text-stone-300">Aktifkan Bagian Kado</span>
          </label>
        </div>

        <div>
          <label className="block text-stone-300 mb-1 font-semibold uppercase tracking-wider">
            Deskripsi / Pengantar Amplop
          </label>
          <textarea
            rows={2}
            value={gifts.description}
            onChange={(e) => updateField('gifts.description', e.target.value)}
            className="w-full p-2.5 rounded-xl bg-stone-900 border border-stone-700 text-white focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none"
          />
        </div>
      </div>

      {/* Bank & E-Wallet Accounts */}
      <div className="p-6 rounded-2xl bg-stone-800 border border-stone-700 space-y-4 text-xs">
        <h3 className="font-bold text-sm text-white flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-amber-500" />
          <span>Daftar Rekening Bank & E-Wallet (Virtual Gift)</span>
        </h3>

        {/* List of Accounts */}
        <div className="space-y-3">
          {accounts.map((acc) => (
            <div key={acc.id} className="p-4 rounded-xl bg-stone-900 border border-stone-700 flex items-center justify-between gap-3">
              <div>
                <span className="px-2 py-0.5 rounded font-bold text-xs bg-stone-800 text-amber-400 mr-2">
                  {acc.bankName}
                </span>
                <span className="font-mono text-white text-sm font-semibold mr-2">{acc.accountNumber}</span>
                <span className="text-stone-400">a.n. {acc.accountHolder}</span>
              </div>

              <button
                onClick={() => handleDeleteAccount(acc.id)}
                className="p-1.5 rounded-lg bg-stone-800 hover:bg-rose-900 text-stone-400 hover:text-rose-200 transition-all"
                title="Hapus Rekening"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Add Account Form */}
        <form onSubmit={handleAddAccount} className="p-4 rounded-xl bg-stone-900/50 border border-stone-700/50 space-y-3 text-xs">
          <p className="font-bold text-stone-300 flex items-center gap-1.5">
            <Plus className="w-3.5 h-3.5 text-amber-500" />
            <span>Tambah Rekening Baru</span>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-stone-400 mb-1">Bank / E-Wallet</label>
              <select
                value={newAcc.bankName}
                onChange={(e) => setNewAcc({ ...newAcc, bankName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-stone-800 border border-stone-700 text-white focus:outline-none"
              >
                <option value="BCA">BCA</option>
                <option value="Bank Mandiri">Bank Mandiri</option>
                <option value="BRI">BRI</option>
                <option value="BNI">BNI</option>
                <option value="Bank Syariah Indonesia (BSI)">BSI</option>
                <option value="Bank Jago">Bank Jago</option>
                <option value="DANA">DANA</option>
                <option value="GoPay">GoPay</option>
                <option value="OVO">OVO</option>
                <option value="ShopeePay">ShopeePay</option>
                <option value="QRIS">QRIS</option>
              </select>
            </div>

            <div>
              <label className="block text-stone-400 mb-1">Nomor Rekening / No HP</label>
              <input
                type="text"
                placeholder="Contoh: 8830192841"
                value={newAcc.accountNumber}
                onChange={(e) => setNewAcc({ ...newAcc, accountNumber: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-stone-800 border border-stone-700 text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-stone-400 mb-1">Atas Nama Pemilik</label>
              <input
                type="text"
                placeholder="Contoh: Justin Pratama"
                value={newAcc.accountHolder}
                onChange={(e) => setNewAcc({ ...newAcc, accountHolder: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-stone-800 border border-stone-700 text-white focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold shadow"
          >
            Simpan Rekening
          </button>
        </form>
      </div>

      {/* QRIS Settings Section */}
      <div className="p-6 rounded-2xl bg-stone-800 border border-stone-700 space-y-4 text-xs">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <QrCode className="w-4 h-4 text-amber-500" />
            <span>Pengaturan QRIS Pembayaran / Amplop Digital</span>
          </h3>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={qris.enabled !== false}
              onChange={(e) => updateField('gifts.qris.enabled', e.target.checked)}
              className="rounded bg-stone-900 border-stone-700 text-amber-600 focus:ring-0"
            />
            <span className="font-semibold text-stone-300">Tampilkan QRIS di Undangan</span>
          </label>
        </div>

        <p className="text-stone-400">
          Upload foto kode QRIS Anda agar para tamu dapat mengirimkan amplop digital via scan dari semua m-Banking dan e-Wallet (BCA, Mandiri, BRI, BNI, GoPay, OVO, DANA, ShopeePay).
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ImageUploadInput
            label="Upload Foto Barcode QRIS"
            value={qris.image || ''}
            onChange={(val) => updateField('gifts.qris.image', val)}
            previewAspect="aspect-square"
            maxWidth={800}
          />

          <div className="space-y-3 flex flex-col justify-between">
            <div>
              <label className="block text-stone-300 mb-1 font-semibold uppercase tracking-wider">
                Judul QRIS
              </label>
              <input
                type="text"
                value={qris.title || ''}
                onChange={(e) => updateField('gifts.qris.title', e.target.value)}
                placeholder="Contoh: QRIS Amplop Digital"
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-stone-300 mb-1 font-semibold uppercase tracking-wider">
                Atas Nama Pemilik QRIS
              </label>
              <input
                type="text"
                value={qris.holderName || ''}
                onChange={(e) => updateField('gifts.qris.holderName', e.target.value)}
                placeholder="Contoh: Justin & Sisca"
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-stone-300 mb-1 font-semibold uppercase tracking-wider">
                Petunjuk Scan / Keterangan
              </label>
              <textarea
                rows={2}
                value={qris.notes || ''}
                onChange={(e) => updateField('gifts.qris.notes', e.target.value)}
                placeholder="Contoh: Scan menggunakan BCA, Mandiri, BRI, BNI, GoPay, OVO, DANA, ShopeePay..."
                className="w-full p-2.5 rounded-xl bg-stone-900 border border-stone-700 text-white focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Physical Gift Delivery Address */}
      <div className="p-6 rounded-2xl bg-stone-800 border border-stone-700 space-y-4 text-xs">

        <h3 className="font-bold text-sm text-white flex items-center gap-2">
          <MapPin className="w-4 h-4 text-amber-500" />
          <span>Alamat Pengiriman Kado Fisik</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-stone-300 mb-1 font-semibold uppercase tracking-wider">
              Nama Penerima Kado
            </label>
            <input
              type="text"
              value={gifts.physicalGift?.recipientName || ''}
              onChange={(e) => updateField('gifts.physicalGift.recipientName', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-stone-300 mb-1 font-semibold uppercase tracking-wider">
              Nomor Telepon / WhatsApp Penerima
            </label>
            <input
              type="text"
              value={gifts.physicalGift?.phone || ''}
              onChange={(e) => updateField('gifts.physicalGift.phone', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-stone-300 mb-1 font-semibold uppercase tracking-wider">
            Alamat Lengkap Pengiriman Paket
          </label>
          <textarea
            rows={2}
            value={gifts.physicalGift?.address || ''}
            onChange={(e) => updateField('gifts.physicalGift.address', e.target.value)}
            className="w-full p-2.5 rounded-xl bg-stone-900 border border-stone-700 text-white focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none"
          />
        </div>

        <div>
          <label className="block text-stone-300 mb-1 font-semibold uppercase tracking-wider">
            Catatan Kurir / Pengirim
          </label>
          <input
            type="text"
            value={gifts.physicalGift?.notes || ''}
            onChange={(e) => updateField('gifts.physicalGift.notes', e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>
      </div>

    </div>
  );
};
