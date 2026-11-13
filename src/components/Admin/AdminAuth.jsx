import React, { useState } from 'react';
import { Lock, KeyRound, ArrowLeft, ShieldCheck, User, RefreshCw, AlertCircle } from 'lucide-react';
import { useInvitation } from '../../context/InvitationContext';
import { loginAuth } from '../../services/apiService';

export const AdminAuth = ({ onAuthenticated, onCancel }) => {
  const { currentSlug } = useInvitation();
  const [username, setUsername] = useState(currentSlug || '');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isSlugSpecific = Boolean(currentSlug && currentSlug !== 'default');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password.trim()) {
      setErrorMessage('Mohon masukkan password / PIN');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const res = await loginAuth({
        username: username.trim(),
        password: password.trim(),
        slug: isSlugSpecific ? currentSlug : username.trim()
      });

      if (res.success || res.ok) {
        // Jika login berhasil sebagai klien dari halaman /admin utama, arahkan ke URL slug klien
        if (!isSlugSpecific && res.role === 'client' && res.slug) {
          window.location.href = `/${res.slug}/admin`;
          return;
        }

        onAuthenticated({
          role: res.role || 'client',
          slug: res.slug || currentSlug || 'default'
        });
      } else {
        setErrorMessage(res.message || 'Login gagal. Periksa kembali username dan password.');
      }
    } catch (err) {
      setErrorMessage('Terjadi kesalahan jaringan: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-sm p-6 sm:p-8 rounded-3xl bg-stone-900 border border-stone-800 text-stone-100 shadow-2xl text-center space-y-6 animate-fade-in">
        
        <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
          <Lock className="w-8 h-8" />
        </div>

        <div className="space-y-1">
          <h2 className="text-xl font-bold font-serif-heading text-white">
            {isSlugSpecific ? `Panel Pengelola /${currentSlug}` : 'Portal Masuk Pengelola'}
          </h2>
          <p className="text-xs text-stone-400">
            {isSlugSpecific 
              ? 'Masukkan password klien Anda untuk mengedit undangan & membalas ucapan'
              : 'Masuk sebagai Super Admin atau Klien Mempelai'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          
          {/* Input Username / Slug (Hanya jika login dari /admin utama) */}
          {!isSlugSpecific && (
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-1">
                Username / Slug Undangan
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="admin atau slug klien (misal: dimas-lilis)"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setErrorMessage('');
                  }}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-800 border border-stone-700 text-xs font-mono text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
          )}

          {/* Input Password */}
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-1">
              Password / PIN
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                autoFocus
                placeholder="Masukkan password..."
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMessage('');
                }}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-800 border border-stone-700 text-sm font-mono text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs tracking-wide transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Memverifikasi...</span>
              </>
            ) : (
              <span>Masuk ke Panel Pengelola</span>
            )}
          </button>

          <div className="text-center pt-1">
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-stone-200 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Halaman Sebelumnya</span>
            </button>
          </div>
        </form>

        <div className="pt-2 border-t border-stone-800 text-[11px] text-stone-500 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-500/70" />
          <span>Keamanan ganda terisolasi per undangan klien</span>
        </div>

      </div>
    </div>
  );
};
