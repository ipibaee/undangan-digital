import React from 'react';
import { useInvitation } from '../../context/InvitationContext';
import { SectionDivider, FloralBadge } from './Ornaments';
import { Quote, Sparkles, Crown } from 'lucide-react';
import { FadeIn, ZoomIn, Floating } from '../common/MotionWrapper';

export const HeroSection = () => {
  const { data, currentTheme } = useInvitation();
  const groomNick = data.couple?.groom?.nickName || 'Febri';
  const brideNick = data.couple?.bride?.nickName || 'Ananta';
  
  // Deteksi layout aktif (punakawan | modern-arch | royal-luxury)
  const layout = data.meta?.templateLayout || currentTheme.layout || 'punakawan';
  const accentColor = data.meta?.accentColor || currentTheme.accentText?.replace('text-[', '').replace(']', '') || '#8C533C';
  const heroImage = data.couple?.heroImage || "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=80";

  return (
    <section id="hero" className="relative py-14 sm:py-20 px-4 text-center overflow-hidden">
      <div className="max-w-xl mx-auto space-y-7">
        
        {/* ========================================================= */}
        {/* LAYOUT 1: PUNAKAWAN BOHO / RUSTIC (Inspirasi Febri-Ananta) */}
        {/* ========================================================= */}
        {layout === 'punakawan' && (
          <>
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
                    style={{ borderColor: accentColor }}
                  />
                  
                  {/* Circular Photo Container with Warm Shadow */}
                  <div className="w-full h-full p-2.5">
                    <div className="w-full h-full rounded-full overflow-hidden shadow-2xl border-4 border-white relative group bg-[#FAF8F5]">
                      <img 
                        src={heroImage} 
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
                <h1 className="font-romantic text-5xl sm:text-6xl md:text-7xl leading-tight tracking-wide drop-shadow-sm" style={{ color: accentColor }}>
                  {groomNick} & {brideNick}
                </h1>
              </div>
            </FadeIn>
          </>
        )}

        {/* ========================================================= */}
        {/* LAYOUT 2: MODERN ARCH / DOME (Architectural & Editorial)  */}
        {/* ========================================================= */}
        {layout === 'modern-arch' && (
          <>
            <FadeIn direction="down" duration={0.8}>
              <div className="space-y-2">
                <span className="inline-block px-3 py-1 rounded-full text-[10px] tracking-[0.25em] uppercase font-bold bg-stone-200/80 text-stone-700">
                  WEDDING CELEBRATION
                </span>
                <p className="font-serif text-xs tracking-[0.2em] uppercase text-stone-500 font-medium">
                  SAVE THE SPECIAL DATE
                </p>
              </div>
            </FadeIn>

            {/* Tall Arch Window Frame */}
            <ZoomIn delay={0.2} duration={0.9}>
              <div className="relative mx-auto w-56 sm:w-64 my-3">
                {/* Architectural double arch outline */}
                <div 
                  className="absolute -inset-2.5 rounded-t-[140px] rounded-b-2xl border border-stone-300/80 pointer-events-none -z-0"
                />
                
                {/* Arch Photo Container */}
                <div className="relative z-10 w-full h-72 sm:h-80 rounded-t-[130px] rounded-b-2xl overflow-hidden shadow-2xl border-4 border-white group bg-stone-100">
                  <img 
                    src={heroImage} 
                    alt="Mempelai Arch" 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Subtle Date Tag at the bottom of Arch */}
                  <div className="absolute bottom-3 inset-x-0 mx-auto w-fit px-3 py-1 rounded-full bg-white/80 backdrop-blur-md text-[10px] font-bold tracking-widest uppercase text-stone-800 shadow-sm">
                    {data.events?.akad?.date || 'Harmoni Cinta'}
                  </div>
                </div>
              </div>
            </ZoomIn>

            {/* Editorial Modern Serif Names */}
            <FadeIn direction="up" delay={0.3} duration={0.8}>
              <div className="space-y-1">
                <h1 className="font-serif-heading text-4xl sm:text-5xl md:text-6xl tracking-tight text-stone-900 font-semibold">
                  {groomNick} <span className="italic font-normal text-stone-400 font-serif">&</span> {brideNick}
                </h1>
              </div>
            </FadeIn>
          </>
        )}

        {/* ========================================================= */}
        {/* LAYOUT 3: ROYAL MIDNIGHT & GOLD (Dark Luxury & Diamond)   */}
        {/* ========================================================= */}
        {layout === 'royal-luxury' && (
          <>
            <FadeIn direction="down" duration={0.8}>
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-[10px] tracking-[0.3em] uppercase text-amber-300 font-bold">
                  <Crown className="w-3.5 h-3.5 text-amber-400" />
                  <span>ROYAL WEDDING INVITATION</span>
                </div>
              </div>
            </FadeIn>

            {/* Diamond Rhombus Luxury Photo Frame */}
            <ZoomIn delay={0.2} duration={0.9}>
              <Floating duration={5} y={6}>
                <div className="relative mx-auto w-52 h-52 sm:w-60 sm:h-60 my-6 flex items-center justify-center">
                  {/* Outer Shimmer Rhombus Rings */}
                  <div className="absolute inset-0 rotate-45 border-2 border-amber-400/50 rounded-2xl shadow-[0_0_30px_rgba(212,175,55,0.3)] animate-pulse pointer-events-none" />
                  <div className="absolute inset-2 rotate-45 border border-dashed border-amber-300/30 rounded-xl pointer-events-none" />
                  
                  {/* Inner Photo Container */}
                  <div className="w-44 h-44 sm:w-52 sm:h-52 rotate-45 rounded-xl overflow-hidden border-2 border-amber-200/80 shadow-2xl relative bg-stone-900 group">
                    <img 
                      src={heroImage} 
                      alt="Mempelai Royal" 
                      className="w-full h-full object-cover -rotate-45 scale-135 transition-transform duration-700 group-hover:scale-145"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none -rotate-45" />
                  </div>
                </div>
              </Floating>
            </ZoomIn>

            {/* Shimmering Gold Names */}
            <FadeIn direction="up" delay={0.3} duration={0.8}>
              <div className="space-y-1">
                <h1 className="font-romantic text-5xl sm:text-6xl md:text-7xl leading-tight tracking-wide bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-100 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(212,175,55,0.4)]">
                  {groomNick} & {brideNick}
                </h1>
              </div>
            </FadeIn>
          </>
        )}

        <SectionDivider color={accentColor} />

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
