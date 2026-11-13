import React from 'react';
import { useInvitation } from '../../context/InvitationContext';
import { SectionDivider, FloralBadge } from './Ornaments';
import { Quote } from 'lucide-react';
import { FadeIn, ZoomIn, Floating } from '../common/MotionWrapper';

export const HeroSection = () => {
  const { data, currentTheme } = useInvitation();

  return (
    <section id="hero" className="relative py-16 sm:py-24 px-4 text-center overflow-hidden">
      <div className="max-w-xl mx-auto space-y-8">
        
        {/* Top Tagline */}
        <FadeIn direction="down" duration={0.8}>
          <div className="space-y-3">
            <FloralBadge text="Walimatul 'Ursy" color={data.meta.accentColor} />
            <h2 className="font-cinzel text-xs sm:text-sm tracking-[0.25em] uppercase text-stone-500 font-semibold">
              Pernikahan Suci
            </h2>
            <h1 className="font-romantic text-5xl sm:text-6xl md:text-7xl leading-tight" style={{ color: data.meta.accentColor }}>
              {data.couple.groom.nickName} & {data.couple.bride.nickName}
            </h1>
          </div>
        </FadeIn>

        {/* Arch Shaped Hero Photo with Floating effect */}
        <ZoomIn delay={0.2} duration={0.9}>
          <Floating duration={4} y={5}>
            <div className="relative mx-auto w-64 h-80 sm:w-72 sm:h-96 rounded-t-full rounded-b-3xl overflow-hidden shadow-2xl p-2 bg-gradient-to-b from-[#e8dfd2] to-transparent border border-white/60">
              <div className="w-full h-full rounded-t-full rounded-b-2xl overflow-hidden relative group">
                <img 
                  src={data.couple.heroImage || "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=80"} 
                  alt="Mempelai" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            </div>
          </Floating>
        </ZoomIn>

        <SectionDivider color={data.meta.accentColor} />

        {/* Sacred Quote Card */}
        <FadeIn direction="up" delay={0.3} duration={0.8}>
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
        </FadeIn>

      </div>
    </section>
  );
};
