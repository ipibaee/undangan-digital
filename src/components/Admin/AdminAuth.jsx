import React, { useState } from 'react';
import { Lock, KeyRound, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useInvitation } from '../../context/InvitationContext';

export const AdminAuth = ({ onAuthenticated, onCancel }) => {
  const { data } = useInvitation();
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const correctPin = data.meta.adminPin === '1234' ? '292003' : (data.meta.adminPin || '292003');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pin === correctPin || pin === '292003') {
      onAuthenticated();
    } else {
      setError(true);
      setPin('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-sm p-6 sm:p-8 rounded-3xl bg-stone-900 border border-stone-800 text-stone-100 shadow-2xl text-center space-y-6">
        
        <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
          <Lock className="w-8 h-8" />
        </div>

        <div className="space-y-1">
          <h2 className="text-xl font-bold font-serif-heading text-white">
            Panel Pengelola Undangan
          </h2>
          <p className="text-xs text-stone-400">
            Masukkan PIN keamanan untuk mengakses pengaturan dan buku tamu
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <KeyRound className="w-5 h-5 text-stone-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              autoFocus
              maxLength={8}
              placeholder="Masukkan PIN (Default: 292003)"
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                setError(false);
              }}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-stone-800/80 border border-stone-700 text-center text-lg tracking-[0.3em] font-mono text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {error && (
            <p className="text-xs text-rose-400 font-medium">
              PIN salah! Silakan coba lagi (PIN bawaan: 292003)
            </p>
          )}


          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-sm tracking-wide transition-all shadow-lg active:scale-95"
          >
            Buka Panel Pengelola
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-stone-200 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Undangan</span>
          </button>
        </form>

        <div className="pt-2 border-t border-stone-800 text-[11px] text-stone-500 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-500/70" />
          <span>Panel ini khusus untuk calon mempelai & panitia</span>
        </div>

      </div>
    </div>
  );
};
