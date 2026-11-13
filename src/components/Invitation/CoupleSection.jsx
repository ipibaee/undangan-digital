import React from 'react';
import { useInvitation } from '../../context/InvitationContext';
import { Heart, Sparkles, Crown } from 'lucide-react';
import { InstagramIcon } from '../common/SocialIcons';
import { SectionDivider, FloralBadge } from './Ornaments';
import { FadeIn, ZoomIn, Floating } from '../common/MotionWrapper';

export const CoupleSection = () => {
  const { data, currentTheme } = useInvitation();
  const { groom, bride } = data.couple;
  const layout = data.meta?.templateLayout || currentTheme.layout || 'punakawan';
  const accentColor = data.meta?.accentColor || currentTheme.accentText?.replace('text-[', '').replace(']', '') || '#8C533C';

  // Helper render foto profil mempelai berdasarkan layout
  const renderCouplePhoto = (photo, name, isGroom) => {
    if (layout === 'modern-arch') {
      // Modern Arch Dome Portrait
      return (
        <div className="relative mx-auto w-40 h-52 sm:w-48 sm:h-60 mb-6">
          <div className="absolute -inset-2 rounded-t-[100px] rounded-b-xl border border-stone-300 pointer-events-none" />
          <div className="w-full h-full rounded-t-[90px] rounded-b-xl overflow-hidden shadow-xl border-2 border-white relative bg-stone-100 group">
            <img 
              src={photo} 
              alt={name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute top-2 inset-x-0 mx-auto w-fit px-2.5 py-0.5 rounded-full bg-stone-900/70 backdrop-blur-md text-[9px] font-bold tracking-widest uppercase text-white">
              {isGroom ? 'THE GROOM' : 'THE BRIDE'}
            </div>
          </div>
        </div>
      );
    }

    if (layout === 'royal-luxury') {
      // Royal Diamond / Rhombus Gilded Portrait
      return (
        <div className="relative mx-auto w-36 h-36 sm:w-44 sm:h-44 my-6 flex items-center justify-center">
          <div className="absolute inset-0 rotate-45 border-2 border-amber-400/50 rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.3)] animate-pulse pointer-events-none" />
          <div className="w-32 h-32 sm:w-38 sm:h-38 rotate-45 rounded-lg overflow-hidden border-2 border-amber-200/90 shadow-xl relative bg-stone-900 group">
            <img 
              src={photo} 
              alt={name} 
              className="w-full h-full object-cover -rotate-45 scale-135 transition-transform duration-700 group-hover:scale-145"
            />
          </div>
        </div>
      );
    }

    // Default Punakawan Boho: Circular Wreath with Rotating Ring
    return (
      <div className="relative mx-auto w-40 h-40 sm:w-48 sm:h-48 mb-6">
        <div 
          className="absolute inset-0 rounded-full border-2 border-dashed opacity-50 animate-spin-slow pointer-events-none" 
          style={{ borderColor: accentColor }}
        />
        <div className="w-full h-full p-2">
          <img 
            src={photo} 
            alt={name} 
            className="w-full h-full rounded-full object-cover shadow-lg border-2 border-white"
          />
        </div>
      </div>
    );
  };

  return (
    <section id="couple" className="relative py-16 sm:py-24 px-4 overflow-hidden">
      <div className="max-w-xl mx-auto text-center space-y-12">
        
        {/* Section Header */}
        <FadeIn direction="up">
          <div className="space-y-3">
            {layout === 'royal-luxury' ? (
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-[10px] tracking-[0.25em] uppercase text-amber-300 font-bold">
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                <span>MEMPELAI NINGRAT</span>
              </div>
            ) : layout === 'modern-arch' ? (
              <span className="inline-block px-3 py-1 rounded-full text-[10px] tracking-[0.25em] uppercase font-bold bg-stone-200/80 text-stone-700">
                THE HAPPY COUPLE
              </span>
            ) : (
              <FloralBadge text="Sang Mempelai" color={accentColor} />
            )}

            <h2 
              className={`text-4xl sm:text-5xl ${layout === 'modern-arch' ? 'font-serif-heading font-semibold text-stone-900' : 'font-romantic'}`}
              style={{ color: layout === 'royal-luxury' ? '#E5C158' : layout === 'modern-arch' ? undefined : accentColor }}
            >
              Mempelai Pengantin
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
              Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan. Dengan memohon ridho dan rahmat-Nya, kami bermaksud mengikat janji suci.
            </p>
          </div>
        </FadeIn>

        {/* Groom & Bride Cards */}
        <div className="space-y-12 sm:space-y-16">
          
          {/* Groom Card */}
          <FadeIn direction="right" duration={0.8}>
            <div className={`p-6 sm:p-8 rounded-3xl ${currentTheme.cardBg} transition-all duration-300 hover:shadow-xl relative overflow-hidden`}>
              {renderCouplePhoto(groom.photo || "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80", groom.fullName, true)}

              <h3 className={`text-2xl sm:text-3xl font-bold ${layout === 'modern-arch' ? 'font-serif tracking-tight text-stone-900' : 'font-serif-heading text-stone-800'}`}>
                {groom.fullName}
              </h3>
              <p className={`text-2xl mb-2 ${layout === 'modern-arch' ? 'font-serif italic text-stone-500 text-lg' : 'font-script text-amber-700/80'}`}>
                ({groom.nickName})
              </p>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-medium">
                {groom.childOrder}
              </p>
              <p className="text-sm font-semibold text-stone-800">
                {groom.fatherName} & {groom.motherName}
              </p>

              {groom.bio && (
                <p className="text-xs text-stone-500 italic mt-3 max-w-sm mx-auto">
                  "{groom.bio}"
                </p>
              )}

              {groom.instagram && (
                <a 
                  href={`https://instagram.com/${groom.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-5 px-4 py-1.5 rounded-full text-xs font-medium border border-stone-300 text-stone-700 hover:bg-stone-100 transition-colors shadow-sm"
                >
                  <InstagramIcon className="w-3.5 h-3.5 text-pink-600" />
                  <span>@{groom.instagram.replace('@', '')}</span>
                </a>
              )}
            </div>
          </FadeIn>

          {/* Center Connector */}
          <ZoomIn delay={0.2}>
            <Floating duration={2.5} y={4} className="flex items-center justify-center my-4">
              {layout === 'royal-luxury' ? (
                <div className="w-12 h-12 rounded-full bg-stone-900 shadow-lg border border-amber-400/40 flex items-center justify-center text-amber-400">
                  <Crown className="w-5 h-5 fill-current" />
                </div>
              ) : layout === 'modern-arch' ? (
                <div className="w-12 h-12 rounded-2xl bg-white shadow-md border border-stone-200 flex items-center justify-center text-stone-800 font-serif font-bold text-xl">
                  &
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full bg-white shadow-md border border-stone-200 flex items-center justify-center text-amber-600">
                  <Heart className="w-6 h-6 fill-current text-rose-500" />
                </div>
              )}
            </Floating>
          </ZoomIn>

          {/* Bride Card */}
          <FadeIn direction="left" duration={0.8}>
            <div className={`p-6 sm:p-8 rounded-3xl ${currentTheme.cardBg} transition-all duration-300 hover:shadow-xl relative overflow-hidden`}>
              {renderCouplePhoto(bride.photo || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80", bride.fullName, false)}

              <h3 className={`text-2xl sm:text-3xl font-bold ${layout === 'modern-arch' ? 'font-serif tracking-tight text-stone-900' : 'font-serif-heading text-stone-800'}`}>
                {bride.fullName}
              </h3>
              <p className={`text-2xl mb-2 ${layout === 'modern-arch' ? 'font-serif italic text-stone-500 text-lg' : 'font-script text-amber-700/80'}`}>
                ({bride.nickName})
              </p>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-medium">
                {bride.childOrder}
              </p>
              <p className="text-sm font-semibold text-stone-800">
                {bride.fatherName} & {bride.motherName}
              </p>

              {bride.bio && (
                <p className="text-xs text-stone-500 italic mt-3 max-w-sm mx-auto">
                  "{bride.bio}"
                </p>
              )}

              {bride.instagram && (
                <a 
                  href={`https://instagram.com/${bride.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-5 px-4 py-1.5 rounded-full text-xs font-medium border border-stone-300 text-stone-700 hover:bg-stone-100 transition-colors shadow-sm"
                >
                  <InstagramIcon className="w-3.5 h-3.5 text-pink-600" />
                  <span>@{bride.instagram.replace('@', '')}</span>
                </a>
              )}
            </div>
          </FadeIn>

        </div>

      </div>
    </section>
  );
};
