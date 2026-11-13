import React from 'react';
import { useInvitation } from '../../context/InvitationContext';
import { MailOpen, Heart, Calendar, Crown, Sparkles } from 'lucide-react';
import { CornerFlourish } from './Ornaments';
import { motion, AnimatePresence } from 'framer-motion';

export const CoverSplash = () => {
  const { data, currentTheme, guestName, openInvitation, isOpen } = useInvitation();
  const layout = data.meta?.templateLayout || currentTheme.layout || 'punakawan';
  const groomNick = data.couple?.groom?.nickName || 'Febri';
  const brideNick = data.couple?.bride?.nickName || 'Ananta';

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div 
          key="cover-splash"
          initial={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0.95 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-stone-900 shadow-2xl"
        >
          {/* Background Image with Parallax-like feel & Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-1000 ease-out"
            style={{ backgroundImage: `url('${data.couple.coverImage || "https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&auto=format&fit=crop&q=80"}')` }}
          />
          <div className={`absolute inset-0 ${currentTheme.coverOverlay} backdrop-blur-[2px]`} />

          {/* Layout-specific ambient borders */}
          {layout === 'modern-arch' && (
            <div className="absolute inset-4 sm:inset-8 rounded-t-[180px] rounded-b-3xl border border-white/20 pointer-events-none -z-0" />
          )}

          {layout === 'royal-luxury' && (
            <div className="absolute inset-3 sm:inset-6 border-2 border-amber-400/30 rounded-3xl pointer-events-none -z-0 shadow-[inset_0_0_40px_rgba(212,175,55,0.15)]" />
          )}

          {/* Decorative Corner Ornaments (Classic / Punakawan) */}
          {layout === 'punakawan' && (
            <>
              <CornerFlourish position="top-left" className="top-4 left-4" color={data.meta.accentColor || '#bca88e'} />
              <CornerFlourish position="top-right" className="top-4 right-4" color={data.meta.accentColor || '#bca88e'} />
              <CornerFlourish position="bottom-left" className="bottom-4 left-4" color={data.meta.accentColor || '#bca88e'} />
              <CornerFlourish position="bottom-right" className="bottom-4 right-4" color={data.meta.accentColor || '#bca88e'} />
            </>
          )}

          {/* Main Cover Content */}
          <div className="relative z-20 flex flex-col items-center justify-between w-full max-w-md h-full py-12 px-6 text-center text-white">
            
            {/* Top Header */}
            <div className="animate-fade-in space-y-2 mt-4">
              {layout === 'royal-luxury' ? (
                <div className="space-y-1">
                  <Crown className="w-6 h-6 text-amber-300 mx-auto animate-pulse" />
                  <p className="font-cinzel text-xs tracking-[0.35em] uppercase text-amber-200/90 font-bold">
                    Royal Wedding Invitation
                  </p>
                </div>
              ) : layout === 'modern-arch' ? (
                <div className="space-y-1">
                  <span className="inline-block px-3 py-1 rounded-full text-[10px] tracking-[0.25em] uppercase font-bold bg-white/10 backdrop-blur-md text-stone-200 border border-white/20">
                    WEDDING CELEBRATION
                  </span>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="font-cinzel text-xs md:text-sm tracking-[0.3em] uppercase text-stone-200">
                    The Wedding Of
                  </p>
                  <div className="w-16 h-[1px] bg-stone-300/40 mx-auto" />
                </div>
              )}
            </div>

            {/* Couple Calligraphy Names */}
            <div className="my-auto space-y-4">
              {layout === 'modern-arch' ? (
                <h1 className="font-serif-heading text-5xl sm:text-6xl md:text-7xl text-white drop-shadow-md leading-tight tracking-wide font-light">
                  {groomNick} <span className="italic font-normal text-amber-200/90 block sm:inline my-1 sm:my-0">&</span> {brideNick}
                </h1>
              ) : layout === 'royal-luxury' ? (
                <h1 className="font-romantic text-6xl sm:text-7xl md:text-8xl bg-gradient-to-r from-amber-100 via-yellow-200 to-amber-200 bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] leading-tight tracking-wide">
                  {groomNick}
                  <span className="font-script text-4xl sm:text-5xl text-amber-300 block sm:inline my-1 sm:my-0 sm:mx-3">&</span>
                  {brideNick}
                </h1>
              ) : (
                <h1 className="font-romantic text-6xl sm:text-7xl md:text-8xl text-white drop-shadow-md leading-tight tracking-wide">
                  {groomNick}
                  <span className="font-script text-4xl sm:text-5xl text-amber-200/90 block sm:inline my-1 sm:my-0 sm:mx-3">&</span>
                  {brideNick}
                </h1>
              )}

              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-medium tracking-wider text-stone-200">
                <Calendar className="w-3.5 h-3.5 text-amber-300" />
                <span>{data.events?.akad?.date || 'Harmoni Kasih'}</span>
              </div>
            </div>

            {/* Guest Greeting Box & Open Button */}
            <div className="w-full space-y-4 mb-4">
              <div className="p-4 sm:p-5 rounded-2xl bg-black/50 backdrop-blur-md border border-white/20 shadow-2xl text-stone-100">
                <p className="text-xs uppercase tracking-widest text-stone-300 mb-1 font-medium">
                  Kepada Yth. Bapak/Ibu/Saudara/i:
                </p>
                <h2 className="text-xl sm:text-2xl font-bold font-serif-heading text-amber-100 break-words drop-shadow-sm">
                  {guestName}
                </h2>
                <p className="text-[11px] text-stone-300/80 mt-1 italic">
                  *Mohon maaf bila ada kesalahan penulisan nama/gelar
                </p>
              </div>

              {/* Open Invitation Button */}
              <button
                onClick={openInvitation}
                className={`w-full py-3.5 px-6 rounded-2xl font-medium tracking-wide flex items-center justify-center gap-2.5 shadow-xl transition-all duration-300 transform active:scale-95 group cursor-pointer ${currentTheme.primaryBtn}`}
              >
                <MailOpen className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                <span className="text-sm font-semibold tracking-wider uppercase">Buka Undangan</span>
                <Heart className="w-4 h-4 fill-current opacity-80 animate-pulse text-amber-200" />
              </button>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
