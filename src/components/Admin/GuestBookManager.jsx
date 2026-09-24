import React, { useState } from 'react';
import { useInvitation } from '../../context/InvitationContext';
import { 
  Users, MessageCircle, Send, CheckCircle2, Clock, Search, Plus, 
  Trash2, Copy, Check, QrCode, FileText, Upload, Sparkles, ExternalLink, RefreshCw, XCircle
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export const GuestBookManager = () => {
  const { data, updateField, addGuest, deleteGuest, toggleGuestSent, bulkAddGuests, checkInGuest } = useInvitation();
  const guests = data.guests || [];
  const couple = data.couple;
  const events = data.events;
  const isQrEnabled = data.meta?.qrCheckInEnabled !== false;


  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all'); // all | sent | unsent | checked_in

  // Modals & Forms
  const [showAddSingle, setShowAddSingle] = useState(false);
  const [showBulkAdd, setShowBulkAdd] = useState(false);
  const [showQrModal, setShowQrModal] = useState(null); // guest object
  const [showTemplateEditor, setShowTemplateEditor] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  // Single Guest Form State
  const [newGuest, setNewGuest] = useState({ name: '', phone: '', category: 'Sahabat' });
  const [bulkText, setBulkText] = useState('');

  // Quick Check-in input
  const [checkInQuery, setCheckInQuery] = useState('');
  const [checkInResult, setCheckInResult] = useState(null);

  // Template text
  const currentTemplate = data.whatsapp?.template || '';

  // Get current website base url
  const getGuestUrl = (guestName) => {
    const origin = window.location.origin + window.location.pathname;
    return `${origin}?kpd=${encodeURIComponent(guestName)}`;
  };

  // Generate personalized WhatsApp message for a guest
  const generateWaMessage = (guest) => {
    let msg = currentTemplate;
    const coupleNicknames = `${couple.groom.nickName} & ${couple.bride.nickName}`;
    const guestUrl = getGuestUrl(guest.name);
    const eventDate = events.akad.date;

    msg = msg.replace(/\{nama\}/g, guest.name);
    msg = msg.replace(/\{url_undangan\}/g, guestUrl);
    msg = msg.replace(/\{panggilan_mempelai\}/g, coupleNicknames);
    msg = msg.replace(/\{tanggal_acara\}/g, eventDate);

    return msg;
  };

  // Send WA directly via wa.me link
  const handleSendWa = (guest) => {
    if (!guest.phone) {
      alert(`Nomor WhatsApp untuk ${guest.name} belum diisi.`);
      return;
    }

    // Clean phone number (format Indonesian 08xx -> 628xx)
    let cleanPhone = guest.phone.replace(/[^0-9]/g, '');
    if (cleanPhone.startsWith('0')) {
      cleanPhone = '62' + cleanPhone.slice(1);
    } else if (!cleanPhone.startsWith('62')) {
      cleanPhone = '62' + cleanPhone;
    }

    const message = generateWaMessage(guest);
    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;

    // Auto mark as sent
    if (!guest.sent) {
      toggleGuestSent(guest.id);
    }

    window.open(waUrl, '_blank');
  };

  const handleCopyMessage = (guest) => {
    const message = generateWaMessage(guest);
    navigator.clipboard.writeText(message);
    setCopiedId('msg-' + guest.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleCopyUrl = (guest) => {
    const url = getGuestUrl(guest.name);
    navigator.clipboard.writeText(url);
    setCopiedId('url-' + guest.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Add single guest submit
  const handleAddSingle = (e) => {
    e.preventDefault();
    if (!newGuest.name.trim()) return;
    addGuest(newGuest);
    setNewGuest({ name: '', phone: '', category: 'Sahabat' });
    setShowAddSingle(false);
  };

  // Bulk add submit
  const handleBulkAdd = (e) => {
    e.preventDefault();
    if (!bulkText.trim()) return;
    const addedCount = bulkAddGuests(bulkText);
    alert(`Berhasil menambahkan ${addedCount} tamu!`);
    setBulkText('');
    setShowBulkAdd(false);
  };

  // Check-in search
  const handleCheckIn = (e) => {
    e.preventDefault();
    if (!checkInQuery.trim()) return;
    const matched = checkInGuest(checkInQuery.trim());
    if (matched) {
      setCheckInResult({ success: true, guest: matched });
      setCheckInQuery('');
    } else {
      setCheckInResult({ success: false, query: checkInQuery });
    }
  };

  // Filtered Guests
  const filteredGuests = guests.filter((g) => {
    const matchSearch = g.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        (g.phone && g.phone.includes(searchQuery));
    const matchCategory = filterCategory === 'all' || g.category === filterCategory;
    const matchStatus = 
      filterStatus === 'all' ? true :
      filterStatus === 'sent' ? g.sent :
      filterStatus === 'unsent' ? !g.sent :
      filterStatus === 'checked_in' ? g.checkedIn : true;

    return matchSearch && matchCategory && matchStatus;
  });

  // Stats
  const totalCount = guests.length;
  const sentCount = guests.filter(g => g.sent).length;
  const unsentCount = totalCount - sentCount;
  const checkedInCount = guests.filter(g => g.checkedIn).length;

  return (
    <div className="space-y-8">
      
      {/* Top Banner / Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-stone-800 border border-stone-700 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xl font-bold text-white">{totalCount}</p>
            <p className="text-xs text-stone-400">Total Tamu</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-stone-800 border border-stone-700 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xl font-bold text-emerald-400">{sentCount}</p>
            <p className="text-xs text-stone-400">Sudah Disebar</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-stone-800 border border-stone-700 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xl font-bold text-amber-300">{unsentCount}</p>
            <p className="text-xs text-stone-400">Belum Dikirim</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-stone-800 border border-stone-700 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
            <QrCode className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xl font-bold text-blue-400">{checkedInCount}</p>
            <p className="text-xs text-stone-400">Tamu Hadir</p>
          </div>
        </div>
      </div>

      {/* QR Code Check-In Enable / Disable Control Banner */}
      <div className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
        isQrEnabled 
          ? 'bg-emerald-950/20 border-emerald-800/40 text-stone-200' 
          : 'bg-stone-800/50 border-stone-700 text-stone-300'
      }`}>
        <div className="flex items-start sm:items-center gap-3.5">
          <div className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 ${
            isQrEnabled ? 'bg-emerald-500/20 text-emerald-400' : 'bg-stone-700/60 text-stone-400'
          }`}>
            <QrCode className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-sm text-white">Fitur QR Code Daftar Hadir Tamu</h4>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                isQrEnabled 
                  ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-700/50' 
                  : 'bg-stone-700 text-stone-400 border border-stone-600'
              }`}>
                {isQrEnabled ? 'Aktif di Undangan' : 'Nonaktif (Disembunyikan)'}
              </span>
            </div>
            <p className="text-xs text-stone-400 mt-1 leading-relaxed">
              {isQrEnabled 
                ? 'Bagian QR Code ditampilkan di undangan tamu untuk scan kehadiran di meja resepsi.' 
                : 'Bagian QR Code saat ini disembunyikan dan tidak akan muncul di tampilan undangan tamu.'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => updateField('meta.qrCheckInEnabled', !isQrEnabled)}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 self-start sm:self-center cursor-pointer ${
            isQrEnabled 
              ? 'bg-rose-900/50 hover:bg-rose-900/80 text-rose-200 border border-rose-700/60' 
              : 'bg-emerald-600 hover:bg-emerald-500 text-white'
          }`}
        >
          {isQrEnabled ? (
            <>
              <XCircle className="w-4 h-4" />
              <span>Nonaktifkan QR Code</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-4 h-4" />
              <span>Aktifkan QR Code</span>
            </>
          )}
        </button>
      </div>


      {/* Reception Check-In Scanner Tool */}
      <div className="p-5 rounded-2xl bg-stone-800/90 border border-stone-700 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-stone-200 font-bold text-sm">
            <QrCode className="w-4 h-4 text-amber-400" />
            <span>Check-in Cepat Meja Tamu</span>
          </div>
          <span className="text-[11px] text-stone-400">Scan QR / Ketik Nama Tamu</span>
        </div>

        <form onSubmit={handleCheckIn} className="flex gap-2">
          <input
            type="text"
            placeholder="Masukkan Nama Tamu atau Scan QR..."
            value={checkInQuery}
            onChange={(e) => setCheckInQuery(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow"
          >
            Check-In Hadir
          </button>
        </form>

        {checkInResult && (
          <div className={`p-3 rounded-xl text-xs flex items-center gap-2 ${checkInResult.success ? 'bg-emerald-900/40 text-emerald-300 border border-emerald-700' : 'bg-rose-900/40 text-rose-300 border border-rose-700'}`}>
            {checkInResult.success ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>
                  <strong>{checkInResult.guest.name}</strong> berhasil check-in pada {checkInResult.guest.checkInTime || 'baru saja'}!
                </span>
              </>
            ) : (
              <span>Tamu "{checkInResult.query}" tidak ditemukan dalam daftar tamu.</span>
            )}
          </div>
        )}
      </div>

      {/* Action Toolbar: Add Guest, Bulk Import, Edit WA Template */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowAddSingle(true)}
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs tracking-wider uppercase flex items-center gap-1.5 transition-all shadow"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Tamu</span>
          </button>

          <button
            onClick={() => setShowBulkAdd(true)}
            className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 font-semibold text-xs tracking-wider uppercase flex items-center gap-1.5 transition-all"
          >
            <Upload className="w-4 h-4 text-amber-400" />
            <span>Import Massal</span>
          </button>

          <button
            onClick={() => setShowTemplateEditor(!showTemplateEditor)}
            className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 font-semibold text-xs tracking-wider uppercase flex items-center gap-1.5 transition-all"
          >
            <FileText className="w-4 h-4 text-emerald-400" />
            <span>Template WhatsApp</span>
          </button>
        </div>

        {/* Search & Category Filter */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-60">
            <Search className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari nama / no wa..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-stone-800 border border-stone-700 text-xs text-white placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 rounded-xl bg-stone-800 border border-stone-700 text-xs text-stone-200 focus:outline-none"
          >
            <option value="all">Semua Status</option>
            <option value="unsent">Belum Dikirim</option>
            <option value="sent">Sudah Dikirim</option>
            <option value="checked_in">Sudah Hadir</option>
          </select>
        </div>
      </div>

      {/* WhatsApp Template Editor Accordion */}
      {showTemplateEditor && (
        <div className="p-6 rounded-2xl bg-stone-800 border border-stone-700 space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm text-white flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Kustomisasi Format Pesan WhatsApp</span>
            </h4>
            <span className="text-[11px] text-stone-400">Variabel: {'{nama}'}, {'{url_undangan}'}, {'{panggilan_mempelai}'}, {'{tanggal_acara}'}</span>
          </div>

          <textarea
            rows={8}
            value={currentTemplate}
            onChange={(e) => updateField('whatsapp.template', e.target.value)}
            className="w-full p-4 rounded-xl bg-stone-900 border border-stone-700 font-mono text-xs text-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <div className="p-3 rounded-xl bg-stone-900/60 border border-stone-700/80 text-xs text-stone-400 flex items-center justify-between">
            <span>Variabel akan otomatis tergantikan sesuai nama masing-masing tamu saat disebar.</span>
            <button
              onClick={() => setShowTemplateEditor(false)}
              className="px-3 py-1 rounded-lg bg-emerald-600 text-white text-xs font-semibold"
            >
              Simpan Template
            </button>
          </div>
        </div>
      )}

      {/* Guest List Cards / Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-stone-400 px-2 font-medium">
          <span>Daftar Tamu Undangan ({filteredGuests.length})</span>
          <span>Aksi Sebar Otomatis</span>
        </div>

        {filteredGuests.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-stone-800/40 border border-stone-800 text-stone-500 text-xs">
            Tidak ada tamu yang cocok dengan filter pencarian.
          </div>
        ) : (
          filteredGuests.map((guest) => {
            const hasPhone = Boolean(guest.phone);
            const isMsgCopied = copiedId === 'msg-' + guest.id;
            const isUrlCopied = copiedId === 'url-' + guest.id;

            return (
              <div 
                key={guest.id}
                className="p-4 sm:p-5 rounded-2xl bg-stone-800/90 border border-stone-700/80 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:border-stone-600 shadow-sm"
              >
                {/* Guest Info */}
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-sm sm:text-base text-white">
                      {guest.name}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-stone-700 text-stone-300">
                      {guest.category}
                    </span>
                    {guest.sent ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-900/50 text-emerald-400 border border-emerald-700/50 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Terkirim
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-900/40 text-amber-300 border border-amber-700/50">
                        Belum Terkirim
                      </span>
                    )}
                    {guest.checkedIn && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-900/50 text-blue-300 border border-blue-700/50">
                        Sudah Hadir
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-stone-400 font-mono">
                    <span>WA: {guest.phone || '<Belum Diisi>'}</span>
                    <span className="text-stone-600">•</span>
                    <span className="truncate max-w-xs text-amber-400/80" title={getGuestUrl(guest.name)}>
                      ?kpd={encodeURIComponent(guest.name)}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-2 self-start md:self-center">
                  
                  {/* WhatsApp Direct Send Button */}
                  <button
                    onClick={() => handleSendWa(guest)}
                    className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs tracking-wide flex items-center gap-1.5 shadow-md transition-all active:scale-95"
                    title="Kirim pesan langsung ke WhatsApp tamu"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Kirim WA</span>
                  </button>

                  {/* Copy Custom Message */}
                  <button
                    onClick={() => handleCopyMessage(guest)}
                    className={`px-3 py-2 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-all ${
                      isMsgCopied 
                        ? 'bg-emerald-700 text-white border-emerald-600'
                        : 'bg-stone-700/60 hover:bg-stone-700 text-stone-200 border-stone-600'
                    }`}
                    title="Salin teks pesan WhatsApp yang sudah terformat"
                  >
                    {isMsgCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isMsgCopied ? 'Tersalin' : 'Pesan'}</span>
                  </button>

                  {/* Copy Link Only */}
                  <button
                    onClick={() => handleCopyUrl(guest)}
                    className={`px-3 py-2 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-all ${
                      isUrlCopied 
                        ? 'bg-emerald-700 text-white border-emerald-600'
                        : 'bg-stone-700/60 hover:bg-stone-700 text-stone-200 border-stone-600'
                    }`}
                    title="Salin tautan undangan untuk tamu ini"
                  >
                    {isUrlCopied ? <Check className="w-3.5 h-3.5" /> : <ExternalLink className="w-3.5 h-3.5" />}
                    <span>{isUrlCopied ? 'Tersalin' : 'Link'}</span>
                  </button>

                  {/* QR Code Modal Trigger */}
                  <button
                    onClick={() => setShowQrModal(guest)}
                    className="p-2 rounded-xl bg-stone-700/60 hover:bg-stone-700 text-stone-300 border border-stone-600 transition-all"
                    title="Lihat QR Code Check-in Tamu"
                  >
                    <QrCode className="w-4 h-4" />
                  </button>

                  {/* Toggle Sent Status */}
                  <button
                    onClick={() => toggleGuestSent(guest.id)}
                    className={`p-2 rounded-xl border transition-all ${
                      guest.sent 
                        ? 'bg-emerald-900/40 text-emerald-400 border-emerald-700'
                        : 'bg-stone-700/40 text-stone-400 border-stone-600 hover:text-white'
                    }`}
                    title={guest.sent ? "Tandai Belum Terkirim" : "Tandai Sudah Terkirim"}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>

                  {/* Delete Guest */}
                  <button
                    onClick={() => {
                      if (window.confirm(`Hapus ${guest.name} dari daftar tamu?`)) {
                        deleteGuest(guest.id);
                      }
                    }}
                    className="p-2 rounded-xl bg-stone-700/30 hover:bg-rose-900/60 text-stone-400 hover:text-rose-300 border border-stone-600/40 transition-all"
                    title="Hapus tamu"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal: Tambah Tamu Satuan */}
      {showAddSingle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 rounded-3xl bg-stone-900 border border-stone-800 text-white space-y-4 shadow-2xl">
            <h3 className="font-bold text-base flex items-center gap-2">
              <Plus className="w-4 h-4 text-amber-500" />
              <span>Tambah Tamu Undangan</span>
            </h3>

            <form onSubmit={handleAddSingle} className="space-y-4 text-xs">
              <div>
                <label className="block text-stone-300 mb-1 font-semibold uppercase tracking-wider">
                  Nama Tamu / Keluarga
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Bapak Ir. H. Bambang & Keluarga"
                  value={newGuest.name}
                  onChange={(e) => setNewGuest({ ...newGuest, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-800 border border-stone-700 text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-stone-300 mb-1 font-semibold uppercase tracking-wider">
                  Nomor WhatsApp
                </label>
                <input
                  type="text"
                  placeholder="Contoh: 08123456789 atau 628123456789"
                  value={newGuest.phone}
                  onChange={(e) => setNewGuest({ ...newGuest, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-800 border border-stone-700 text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-stone-300 mb-1 font-semibold uppercase tracking-wider">
                  Kategori
                </label>
                <select
                  value={newGuest.category}
                  onChange={(e) => setNewGuest({ ...newGuest, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-800 border border-stone-700 text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                >
                  <option value="VIP">VIP</option>
                  <option value="Keluarga">Keluarga</option>
                  <option value="Sahabat">Sahabat</option>
                  <option value="Rekan Kerja">Rekan Kerja</option>
                  <option value="Teman Sekolah">Teman Sekolah</option>
                  <option value="Umum">Umum</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddSingle(false)}
                  className="px-4 py-2 rounded-xl bg-stone-800 text-stone-400 hover:text-white"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold shadow"
                >
                  Simpan Tamu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Bulk Import Tamu */}
      {showBulkAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg p-6 rounded-3xl bg-stone-900 border border-stone-800 text-white space-y-4 shadow-2xl">
            <h3 className="font-bold text-base flex items-center gap-2">
              <Upload className="w-4 h-4 text-amber-500" />
              <span>Import Banyak Tamu Sekaligus</span>
            </h3>

            <p className="text-xs text-stone-400">
              Tempel daftar nama tamu per baris. Format yang didukung:
              <br />• <code>Nama, NoWA, Kategori</code>
              <br />• atau cukup tulis <code>Nama Tamu</code> di setiap baris.
            </p>

            <form onSubmit={handleBulkAdd} className="space-y-4 text-xs">
              <textarea
                rows={10}
                required
                placeholder="Contoh:&#10;Bapak Hendra Gunawan, 08123456789, VIP&#10;Ibu Ratna Dewi, 08129876543, Keluarga&#10;Dimas & Partner, 08567890123, Sahabat&#10;dr. Faisal, , Teman Kantor"
                value={bulkText}
                onChange={(e) => setBulkText(e.target.value)}
                className="w-full p-3.5 rounded-xl bg-stone-800 border border-stone-700 font-mono text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
              />

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowBulkAdd(false)}
                  className="px-4 py-2 rounded-xl bg-stone-800 text-stone-400 hover:text-white"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold shadow"
                >
                  Import Sekarang
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: QR Code Check-in Tamu */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-xs p-6 rounded-3xl bg-stone-900 border border-stone-800 text-white text-center space-y-4 shadow-2xl">
            <h3 className="font-bold text-sm flex items-center justify-center gap-1.5 text-amber-400">
              <QrCode className="w-4 h-4" />
              <span>QR Code Tamu</span>
            </h3>

            <div className="p-4 bg-white rounded-2xl inline-block shadow-inner">
              <QRCodeSVG 
                value={JSON.stringify({
                  event: `${couple.groom.nickName} & ${couple.bride.nickName} Wedding`,
                  guest: showQrModal.name,
                  id: showQrModal.id
                })}
                size={160}
                level="H"
                fgColor="#1c1917"
              />
            </div>

            <div>
              <p className="font-bold text-base">{showQrModal.name}</p>
              <p className="text-xs text-stone-400">{showQrModal.category}</p>
            </div>

            <button
              onClick={() => setShowQrModal(null)}
              className="w-full py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-xs font-semibold"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
