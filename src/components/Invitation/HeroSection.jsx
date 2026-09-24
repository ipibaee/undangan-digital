import React from 'react';
import { useInvitation } from '../../context/InvitationContext';
import { SectionDivider, FloralBadge } from './Ornaments';
import { Quote } from 'lucide-react';

export const HeroSection = () => {
  const { data, currentTheme } = useInvitation();

  return (
    <section id="hero" className="relative py-16 sm:py-24 px-4 text-center overflow-hidden">
      <div className="max-w-xl mx-auto space-y-8">
        
        {/* Top Tagline */}
        <div className="space-y-3">
          <FloralBadge text="Walimatul 'Ursy" color={data.meta.accentColor} />
          <h2 className="font-cinzel text-xs sm:text-sm tracking-[0.25em] uppercase text-stone-500 font-semibold">
            Pernikahan Suci
          </h2>
          <h1 className="font-romantic text-5xl sm:text-6xl md:text-7xl leading-tight" style={{ color: data.meta.accentColor }}>
            {data.couple.groom.nickName} & {data.couple.bride.nickName}
          </h1>
        </div>

        {/* Arch Shaped Hero Photo */}
        <div className="relative mx-auto w-64 h-80 sm:w-72 sm:h-96 rounded-t-full rounded-b-3xl overflow-hidden shadow-2xl p-2 bg-gradient-to-b from-[#e8dfd2] to-transparent border border-white/60">
          <div className="w-full h-full rounded-t-full rounded-b-2xl overflow-hidden relative group">
            <img 
              src={data.couple.heroImage} 
              alt="Mempelai" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
        </div>

        <SectionDivider color={data.meta.accentColor} />

        {/* Sacred Quote Card */}
        <div className={`p-6 sm:p-8 rounded-2xl relative ${currentTheme.cardBg}`}>
          <Quote className="w-8 h-8 mx-auto mb-3 opacity-30 text-current" />
          <p className="font-serif-heading text-sm sm:text-base leading-relaxed italic text-stone-700">
            "{data.meta.quote}"
          </p>
          {data.meta.quoteSource && (
            <p className="mt-3 text-xs font-semibold tracking-wider uppercase text-stone-500 font-cinzel">
              — {data.meta.quoteSource} —
            </p>
          )}
        </div>

      </div>
    </section>
  );
};
