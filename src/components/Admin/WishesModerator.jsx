import React, { useState } from 'react';
import { useInvitation } from '../../context/InvitationContext';
import { 
  MessageSquare, HeartHandshake, Trash2, CheckCircle2, HelpCircle, 
  XCircle, Send, Edit3, Sparkles, Check, MessageCircle, Clock 
} from 'lucide-react';

export const WishesModerator = () => {
  const { data, replyWish, deleteWish } = useInvitation();
  const wishes = data.wishes || [];

  const [replyInputs, setReplyInputs] = useState({});
  const [editingReplyId, setEditingReplyId] = useState(null);
  const [filter, setFilter] = useState('all'); // all | unreplied | replied | hadir | ragu | tidak_hadir

  // Quick reply preset templates
  const quickTemplates = [
    "Aamiin ya rabbal alamin, terima kasih banyak atas doa dan restunya! 🙏",
    "Terima kasih banyak yaa sudah mendoakan kami berdua! ❤️",
    "Aamiin, terima kasih banyak! Sampai jumpa di hari bahagia kami yaa! ✨",
    "Terima kasih atas doa tulusnya! Semoga kebaikan juga berlimpah untuk Anda. 🌸"
  ];

  const handleReplyChange = (id, text) => {
    setReplyInputs(prev => ({ ...prev, [id]: text }));
  };

  const handleApplyTemplate = (id, templateText) => {
    setReplyInputs(prev => ({ ...prev, [id]: templateText }));
  };

  const handleSendReply = (id) => {
    const text = replyInputs[id];
    if (!text || !text.trim()) {
      alert('Tuliskan balasan terlebih dahulu.');
      return;
    }
    replyWish(id, text.trim());
    setReplyInputs(prev => ({ ...prev, [id]: '' }));
    setEditingReplyId(null);
  };

  const handleStartEdit = (wish) => {
    setEditingReplyId(wish.id);
    setReplyInputs(prev => ({ ...prev, [wish.id]: wish.reply || '' }));
  };

  // Stats
  const hadirCount = wishes.filter(w => w.attendance === 'hadir').length;
  const raguCount = wishes.filter(w => w.attendance === 'ragu').length;
  const tidakHadirCount = wishes.filter(w => w.attendance === 'tidak_hadir').length;
  const totalPax = wishes.filter(w => w.attendance === 'hadir').reduce((sum, w) => sum + (Number(w.pax) || 1), 0);
  
  const unrepliedCount = wishes.filter(w => !w.reply).length;
  const repliedCount = wishes.filter(w => Boolean(w.reply)).length;

  const filteredWishes = wishes.filter(w => {
    if (filter === 'all') return true;
    if (filter === 'unreplied') return !w.reply;
    if (filter === 'replied') return Boolean(w.reply);
    return w.attendance === filter;
  });

  return (
    <div className="space-y-8 text-stone-100">
      
      {/* RSVP & Reply Stats Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <div className="p-4 rounded-2xl bg-stone-800 border border-stone-700">
          <p className="text-xl font-bold text-white">{wishes.length}</p>
          <p className="text-stone-400">Total Doa & Ucapan</p>
        </div>
        <div className="p-4 rounded-2xl bg-stone-800 border border-stone-700">
          <p className="text-xl font-bold text-amber-400">{unrepliedCount}</p>
          <p className="text-stone-400">Belum Dibalas</p>
        </div>
        <div className="p-4 rounded-2xl bg-stone-800 border border-stone-700">
          <p className="text-xl font-bold text-emerald-400">{repliedCount}</p>
          <p className="text-stone-400">Sudah Dibalas</p>
        </div>
        <div className="p-4 rounded-2xl bg-stone-800 border border-stone-700">
          <p className="text-xl font-bold text-blue-400">{hadirCount} ({totalPax} Pax)</p>
          <p className="text-stone-400">Konfirmasi Hadir</p>
        </div>
      </div>

      {/* Guide Banner */}
      <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs space-y-1">
        <div className="flex items-center gap-2 font-bold text-amber-300 text-sm">
          <HeartHandshake className="w-4 h-4 text-amber-400" />
          <span>Cara Membalas Pesan Tamu:</span>
        </div>
        <p className="text-stone-300 leading-relaxed">
          Pilih pesan tamu di bawah, ketik balasan atau klik salah satu <strong>Template Balasan Cepat</strong>, lalu klik tombol <strong>"Kirim Balasan"</strong>. Balasan Anda akan otomatis muncul tepat di bawah pesan tamu pada halaman undangan digital!
        </p>
      </div>

      {/* Wishes Feed & Replies */}
      <div className="p-6 rounded-2xl bg-stone-800 border border-stone-700 space-y-4">
        
        {/* Filter Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-stone-700">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-amber-500" />
            <span>Daftar Ucapan & Doa Tamu</span>
          </h3>

          <div className="flex flex-wrap items-center gap-1.5 bg-stone-900 p-1.5 rounded-xl text-xs">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filter === 'all' ? 'bg-amber-600 text-white font-bold shadow' : 'text-stone-400 hover:text-white'
              }`}
            >
              Semua ({wishes.length})
            </button>
            <button
              onClick={() => setFilter('unreplied')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
                filter === 'unreplied' ? 'bg-amber-500 text-stone-950 font-bold shadow' : 'text-amber-300 hover:text-white'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Belum Dibalas ({unrepliedCount})</span>
            </button>
            <button
              onClick={() => setFilter('replied')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
                filter === 'replied' ? 'bg-emerald-600 text-white font-bold shadow' : 'text-emerald-400 hover:text-white'
              }`}
            >
              <Check className="w-3.5 h-3.5" />
              <span>Sudah Dibalas ({repliedCount})</span>
            </button>
          </div>
        </div>

        {/* Wishes List */}
        <div className="space-y-4 pt-2">
          {filteredWishes.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-stone-900/40 border border-stone-700/60 text-stone-400 text-xs">
              Tidak ada ucapan pada kategori ini.
            </div>
          ) : (
            filteredWishes.map((wish) => {
              const isReplying = editingReplyId === wish.id;
              const hasReply = Boolean(wish.reply);
              const currentInputText = replyInputs[wish.id] || '';

              return (
                <div 
                  key={wish.id} 
                  className={`p-4 sm:p-5 rounded-2xl border space-y-3 text-xs transition-all ${
                    hasReply 
                      ? 'bg-stone-900/90 border-stone-700' 
                      : 'bg-amber-950/20 border-amber-800/40 shadow-sm'
                  }`}
                >
                  {/* Guest Info Row */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-white">{wish.name}</span>
                      <span className="text-stone-400">({wish.relation || 'Tamu'})</span>
                      
                      {wish.attendance === 'hadir' && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-900/60 text-emerald-400 font-semibold border border-emerald-700/60">
                          Hadir ({wish.pax || 1} Pax)
                        </span>
                      )}
                      {wish.attendance === 'ragu' && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-900/60 text-amber-300 font-semibold border border-amber-700/60">
                          Ragu
                        </span>
                      )}
                      {wish.attendance === 'tidak_hadir' && (
                        <span className="px-2 py-0.5 rounded-full bg-rose-900/60 text-rose-300 font-semibold border border-rose-700/60">
                          Tidak Hadir
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {hasReply ? (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 text-[10px] font-bold border border-emerald-700/50 flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          Sudah Dibalas
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-amber-900/50 text-amber-300 text-[10px] font-bold border border-amber-700/50 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Menunggu Balasan
                        </span>
                      )}

                      <button
                        onClick={() => {
                          if (window.confirm(`Hapus ucapan dari ${wish.name}?`)) {
                            deleteWish(wish.id);
                          }
                        }}
                        className="p-1 rounded text-stone-500 hover:text-rose-400 transition-colors"
                        title="Hapus Ucapan"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Guest Wish Message */}
                  <div className="p-3 rounded-xl bg-stone-950/60 border border-stone-800 text-stone-200">
                    <p className="italic text-sm leading-relaxed">
                      "{wish.message}"
                    </p>
                    <p className="text-[10px] text-stone-500 mt-2 font-mono">{wish.createdAt}</p>
                  </div>

                  {/* Existing Reply Display */}
                  {hasReply && !isReplying && (
                    <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-700/40 text-stone-200 space-y-1.5">
                      <div className="flex items-center justify-between text-amber-400 font-bold text-xs">
                        <span className="flex items-center gap-1.5">
                          <HeartHandshake className="w-4 h-4 text-amber-400" />
                          <span>Balasan Anda (Tampil di Undangan):</span>
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleStartEdit(wish)}
                            className="text-stone-300 hover:text-white text-[11px] font-semibold flex items-center gap-1 bg-stone-800 px-2 py-0.5 rounded-md"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>Edit Balasan</span>
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm('Hapus balasan ini?')) {
                                replyWish(wish.id, '');
                              }
                            }}
                            className="text-stone-400 hover:text-rose-300 text-[11px]"
                          >
                            Hapus
                          </button>
                        </div>
                      </div>
                      <p className="italic text-stone-300 text-xs pl-5">
                        "{wish.reply}"
                      </p>
                    </div>
                  )}

                  {/* Reply Input Box (If not yet replied or currently editing) */}
                  {(!hasReply || isReplying) && (
                    <div className="p-4 rounded-xl bg-stone-900 border border-stone-700 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-stone-200 flex items-center gap-1.5">
                          <MessageCircle className="w-4 h-4 text-amber-400" />
                          <span>{isReplying ? 'Ubah Balasan Pesan:' : 'Tulis Balasan untuk Tamu:'}</span>
                        </span>
                        {isReplying && (
                          <button
                            onClick={() => setEditingReplyId(null)}
                            className="text-[11px] text-stone-400 hover:text-white"
                          >
                            Batal Edit
                          </button>
                        )}
                      </div>

                      {/* Quick Templates Buttons */}
                      <div className="space-y-1">
                        <p className="text-[11px] text-stone-400">Pilihan Cepat (Klik untuk memilih template):</p>
                        <div className="flex flex-wrap gap-1.5">
                          {quickTemplates.map((template, tIdx) => (
                            <button
                              key={tIdx}
                              type="button"
                              onClick={() => handleApplyTemplate(wish.id, template)}
                              className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white text-[11px] transition-all text-left border border-stone-700/60"
                            >
                              {template.slice(0, 38)}...
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Textarea Input & Send Button */}
                      <div className="flex flex-col sm:flex-row gap-2 pt-1">
                        <input
                          type="text"
                          placeholder="Ketik balasan Anda di sini..."
                          value={currentInputText}
                          onChange={(e) => handleReplyChange(wish.id, e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSendReply(wish.id);
                          }}
                          className="flex-1 px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 text-xs"
                        />
                        <button
                          type="button"
                          onClick={() => handleSendReply(wish.id)}
                          className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all text-xs"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>{isReplying ? 'Simpan Balasan' : 'Kirim Balasan'}</span>
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              );
            })
          )}
        </div>

      </div>

    </div>
  );
};
