import React, { useState } from 'react';
import { useInvitation } from '../../context/InvitationContext';
import { MessageSquare, Send, CheckCircle2, HelpCircle, XCircle, User, Users, HeartHandshake, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { FloralBadge } from './Ornaments';
import { FadeIn } from '../common/MotionWrapper';

export const RsvpSection = () => {
  const { data, currentTheme, guestName, addWish } = useInvitation();
  const wishes = data.wishes || [];

  const [form, setForm] = useState({
    name: guestName !== 'Tamu Undangan' ? guestName : '',
    relation: 'Sahabat',
    attendance: 'hadir',
    pax: 1,
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) {
      alert('Mohon isi nama dan ucapan Anda.');
      return;
    }

    addWish(form);
    setSubmitted(true);

    // Fire confetti celebration!
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {}

    // Reset message
    setForm(prev => ({ ...prev, message: '' }));
    setTimeout(() => setSubmitted(false), 5000);
  };

  const getAttendanceBadge = (status) => {
    switch (status) {
      case 'hadir':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Hadir
          </span>
        );
      case 'ragu':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-800 border border-amber-300">
            <HelpCircle className="w-3 h-3 text-amber-600" />
            Masih Ragu
          </span>
        );
      case 'tidak_hadir':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-100 text-rose-800 border border-rose-300">
            <XCircle className="w-3 h-3 text-rose-600" />
            Tidak Hadir
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <section id="rsvp" className="relative py-16 sm:py-24 px-4 overflow-hidden">
      <div className="max-w-xl mx-auto space-y-12">
        
        {/* Header */}
        <FadeIn direction="up">
          <div className="text-center space-y-3">
            <FloralBadge text="RSVP & Doa Restu" color={data.meta.accentColor} />
            <h2 className="font-romantic text-4xl sm:text-5xl" style={{ color: data.meta.accentColor }}>
              Ucapan & Konfirmasi Kehadiran
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
              Kehadiran dan doa restu Bapak/Ibu/Saudara/i merupakan kado terindah bagi kami berdua.
            </p>
          </div>
        </FadeIn>

        {/* RSVP Form Card */}
        <FadeIn direction="up" delay={0.15}>
          <div className={`p-6 sm:p-8 rounded-3xl ${currentTheme.cardBg} space-y-6 shadow-md`}>
            <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Name Input */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                Nama Lengkap
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="Masukkan nama Anda..."
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-stone-300 text-sm bg-white/80 focus:outline-none focus:ring-2 focus:ring-stone-400 text-stone-800"
                />
              </div>
            </div>

            {/* Konfirmasi Kehadiran: Tombol Hadir & Tidak Hadir */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                Konfirmasi Kehadiran ?
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setForm({ ...form, attendance: 'hadir' })}
                  className={`py-2.5 px-3 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                    form.attendance === 'hadir'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-sm ring-2 ring-emerald-500/30'
                      : 'bg-white border-stone-300 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Hadir</span>
                </button>

                <button
                  type="button"
                  onClick={() => setForm({ ...form, attendance: 'tidak_hadir' })}
                  className={`py-2.5 px-3 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                    form.attendance === 'tidak_hadir'
                      ? 'bg-rose-50 border-rose-500 text-rose-700 shadow-sm ring-2 ring-rose-500/30'
                      : 'bg-white border-stone-300 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  <XCircle className="w-4 h-4 text-rose-600" />
                  <span>Tidak Hadir</span>
                </button>
              </div>
            </div>

            {/* Message Input */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                Berikan Ucapan & Do'a
              </label>
              <textarea
                required
                rows={4}
                placeholder="Tuliskan ucapan dan doa terbaik Anda untuk kedua mempelai..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full p-3.5 rounded-2xl border border-stone-300 text-xs sm:text-sm bg-white/90 focus:outline-none focus:ring-2 focus:ring-[#8C533C] text-stone-800 leading-relaxed"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-full font-bold text-xs uppercase tracking-wider text-white bg-[#8C533C] hover:bg-[#72412E] shadow-md transition-all cursor-pointer"
            >
              Kirim
            </button>

            {submitted && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs text-center flex items-center justify-center gap-2 animate-fade-in">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Terima kasih! Ucapan dan konfirmasi kehadiran Anda telah terkirim.</span>
              </div>
            )}
          </form>
        </div>
      </FadeIn>

        {/* Wishes Feed List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="font-serif-heading text-lg font-bold text-stone-800 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-amber-700" />
              <span>Doa & Ucapan ({wishes.length})</span>
            </h3>
            <span className="text-xs text-stone-500">Tersimpan</span>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
            {wishes.map((wish) => (
              <div 
                key={wish.id}
                className={`p-4 sm:p-5 rounded-2xl ${currentTheme.cardBg} space-y-2 shadow-sm text-stone-800 transition-all`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-stone-900">{wish.name}</span>
                    {wish.relation && (
                      <span className="text-[11px] text-stone-500 font-medium">({wish.relation})</span>
                    )}
                  </div>
                  {getAttendanceBadge(wish.attendance)}
                </div>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                  "{wish.message}"
                </p>

                <div className="flex items-center justify-between text-[11px] text-stone-400 pt-1">
                  <span>{wish.createdAt}</span>
                </div>

                {/* Balasan Mempelai (Host Reply) */}
                {wish.reply && (
                  <div className="mt-3 p-3 rounded-xl bg-amber-50/80 border border-amber-200/80 text-xs text-stone-800 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-amber-900">
                      <HeartHandshake className="w-3.5 h-3.5 text-amber-700" />
                      <span>Balasan dari {data.couple.groom.nickName} & {data.couple.bride.nickName}:</span>
                    </div>
                    <p className="text-stone-700 pl-5 italic">
                      "{wish.reply}"
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick Notice for Host */}
          <div className="pt-2 text-center">
            <p className="text-[11px] text-stone-500 italic">
              *Mempelai dapat membalas setiap doa & ucapan tamu melalui <strong>Panel Pengelola</strong>.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

