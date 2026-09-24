import React from 'react';
import { useInvitation } from '../../context/InvitationContext';
import { MailOpen, Heart, Calendar } from 'lucide-react';
import { CornerFlourish } from './Ornaments';

export const CoverSplash = () => {
  const { data, currentTheme, guestName, openInvitation, isOpen } = useInvitation();

  if (isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-stone-900">
      {/* Background Image with Parallax-like feel & Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-1000 ease-out"
        style={{ backgroundImage: `url('${data.couple.coverImage}')` }}
      />
      <div className={`absolute inset-0 ${currentTheme.coverOverlay} backdrop-blur-[2px]`} />

      {/* Decorative Ornaments */}
      <CornerFlourish position="top-left" className="top-4 left-4" color={data.meta.accentColor || '#bca88e'} />
      <CornerFlourish position="top-right" className="top-4 right-4" color={data.meta.accentColor || '#bca88e'} />
      <CornerFlourish position="bottom-left" className="bottom-4 left-4" color={data.meta.accentColor || '#bca88e'} />
      <CornerFlourish position="bottom-right" className="bottom-4 right-4" color={data.meta.accentColor || '#bca88e'} />

      {/* Main Cover Content */}
      <div className="relative z-20 flex flex-col items-center justify-between w-full max-w-md h-full py-12 px-6 text-center text-white">
        
        {/* Top Header */}
        <div className="animate-fade-in space-y-2 mt-4">
          <p className="font-cinzel text-xs md:text-sm tracking-[0.3em] uppercase text-stone-200">
            The Wedding Of
          </p>
          <div className="w-16 h-[1px] bg-stone-300/40 mx-auto" />
        </div>

        {/* Couple Calligraphy Names */}
        <div className="my-auto space-y-4">
          <h1 className="font-romantic text-6xl sm:text-7xl md:text-8xl text-white drop-shadow-md leading-tight tracking-wide">
            {data.couple.groom.nickName}
            <span className="font-script text-4xl sm:text-5xl text-amber-200/90 block sm:inline my-1 sm:my-0 sm:mx-3">&</span>
            {data.couple.bride.nickName}
          </h1>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-medium tracking-wider text-stone-200">
            <Calendar className="w-3.5 h-3.5 text-amber-300" />
            <span>{data.events.akad.date}</span>
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
            className={`w-full py-3.5 px-6 rounded-xl font-medium tracking-wide flex items-center justify-center gap-2.5 shadow-xl transition-all duration-300 transform active:scale-95 group ${currentTheme.primaryBtn}`}
          >
            <MailOpen className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
            <span className="text-sm font-semibold tracking-wider uppercase">Buka Undangan</span>
            <Heart className="w-4 h-4 fill-current opacity-80 animate-pulse text-amber-200" />
          </button>
        </div>

      </div>
    </div>
  );
};
