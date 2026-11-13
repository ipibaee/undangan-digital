import React from 'react';
import { useInvitation } from '../../context/InvitationContext';
import { SectionDivider, FloralBadge } from './Ornaments';
import { Quote } from 'lucide-react';
import { FadeIn, ZoomIn, Floating } from '../common/MotionWrapper';

export const HeroSection = () => {
  const { data, currentTheme } = useInvitation();
  const groomNick = data.couple?.groom?.nickName || 'Febri';
  const brideNick = data.couple?.bride?.nickName || 'Ananta';

  return (
    <section id="hero" className="relative py-14 sm:py-20 px-4 text-center overflow-hidden">
      <div className="max-w-xl mx-auto space-y-7">
        
        {/* Top Tagline */}
        <FadeIn direction="down" duration={0.8}>
          <div className="space-y-2">
            <p className="font-cinzel text-xs sm:text-sm tracking-[0.3em] uppercase text-stone-500 font-bold">
              THE WEDDING OF
            </p>
          </div>
        </FadeIn>

        {/* Circular Floral Prewedding Photo Frame */}
        <ZoomIn delay={0.2} duration={0.9}>
          <Floating duration={4} y={5}>
            <div className="relative mx-auto w-52 h-52 sm:w-64 sm:h-64 my-2">
              {/* Outer decorative ring */}
              <div 
                className="absolute inset-0 rounded-full border-2 border-dashed opacity-40 animate-spin-slow pointer-events-none"
                style={{ borderColor: data.meta.accentColor || '#8C533C' }}
              />
              
              {/* Circular Photo Container with Warm Shadow */}
              <div className="w-full h-full p-2.5">
                <div className="w-full h-full rounded-full overflow-hidden shadow-2xl border-4 border-white relative group bg-[#FAF8F5]">
                  <img 
                    src={data.couple.heroImage || "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=80"} 
                    alt="Mempelai" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </Floating>
        </ZoomIn>

        {/* Calligraphy Names */}
        <FadeIn direction="up" delay={0.3} duration={0.8}>
          <div className="space-y-1">
            <h1 className="font-romantic text-5xl sm:text-6xl md:text-7xl leading-tight tracking-wide drop-shadow-sm" style={{ color: data.meta.accentColor || '#8C533C' }}>
              {groomNick} & {brideNick}
            </h1>
          </div>
        </FadeIn>

        <SectionDivider color={data.meta.accentColor || '#8C533C'} />

        {/* Sacred Quote Card */}
        <FadeIn direction="up" delay={0.4} duration={0.8}>
          <div className={`p-6 sm:p-8 rounded-3xl relative ${currentTheme.cardBg} shadow-sm border border-stone-200/80`}>
            <Quote className="w-7 h-7 mx-auto mb-3 opacity-30 text-current" />
            <p className="font-serif-heading text-xs sm:text-sm leading-relaxed italic text-stone-700">
              "{data.meta.quote}"
            </p>
            {data.meta.quoteSource && (
              <p className="mt-3 text-[11px] font-semibold tracking-wider uppercase text-stone-500 font-cinzel">
                — {data.meta.quoteSource} —
              </p>
            )}
          </div>
        </FadeIn>

      </div>
    </section>
  );
};
