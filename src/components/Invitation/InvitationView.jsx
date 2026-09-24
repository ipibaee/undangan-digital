import React from 'react';
import { useInvitation } from '../../context/InvitationContext';
import { CoverSplash } from './CoverSplash';
import { HeroSection } from './HeroSection';
import { CoupleSection } from './CoupleSection';
import { CountdownSection } from './CountdownSection';
import { EventSection } from './EventSection';
import { LoveStorySection } from './LoveStorySection';
import { GallerySection } from './GallerySection';
import { GiftSection } from './GiftSection';
import { RsvpSection } from './RsvpSection';
import { GuestQrCodeSection } from './GuestQrCodeSection';
import { MusicPlayer } from './MusicPlayer';
import { FloatingNavbar } from './FloatingNavbar';
import { AutoScrollButton } from './AutoScrollButton';
import { Lock, Heart, Shield } from 'lucide-react';
import { CornerFlourish } from './Ornaments';

export const InvitationView = ({ onOpenAdmin }) => {
  const { data, currentTheme, isOpen } = useInvitation();

  const bgType = data.meta?.bgType || 'theme';
  let customBgStyle = {};
  let bgClass = currentTheme.bgClass;

  if (bgType === 'solid') {
    bgClass = '';
    customBgStyle = { backgroundColor: data.meta?.customBgColor || '#faf7f2' };
  } else if (bgType === 'gradient') {
    bgClass = '';
    customBgStyle = { 
      background: data.meta?.customGradient || 'linear-gradient(135deg, #fdfbf7 0%, #f4ece1 100%)' 
    };
  }

  const floralColor = data.meta?.accentColor || '#928573';
  const showFloral = data.meta?.showFloralOrnaments !== false;

  return (
    <div 
      className={`min-h-screen relative transition-all duration-500 ${bgClass}`}
      style={customBgStyle}
    >
      {/* Pattern Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-30 z-0" 
        style={{ backgroundImage: currentTheme.patternOverlay, backgroundSize: '24px 24px' }} 
      />

      {/* Decorative Floral Ornaments */}
      {showFloral && (
        <>
          <CornerFlourish position="top-left" className="top-2 left-2" color={floralColor} />
          <CornerFlourish position="top-right" className="top-2 right-2" color={floralColor} />
          <CornerFlourish position="bottom-left" className="bottom-2 left-2" color={floralColor} />
          <CornerFlourish position="bottom-right" className="bottom-2 right-2" color={floralColor} />
        </>
      )}


      {/* Cover / Splash Screen before opening */}
      <CoverSplash />

      {/* Floating Audio Player */}
      <MusicPlayer />

      {/* Auto Scroll Button */}
      <AutoScrollButton />

      {/* Floating Bottom Nav */}
      <FloatingNavbar />

      {/* Main Content Sections (Accessible once opened) */}
      <div className={`relative z-10 max-w-xl mx-auto transition-opacity duration-700 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        
        <HeroSection />

        <CoupleSection />

        <CountdownSection />

        <EventSection />

        <LoveStorySection />

        <GallerySection />

        <GiftSection />

        <RsvpSection />

        <GuestQrCodeSection />

        {/* Footer */}
        <footer className="py-16 px-4 text-center space-y-6">
          <div className="space-y-2">
            <h3 className="font-romantic text-4xl sm:text-5xl" style={{ color: data.meta.accentColor }}>
              {data.couple.groom.nickName} & {data.couple.bride.nickName}
            </h3>
            <p className="text-xs text-stone-500 font-serif-heading italic max-w-xs mx-auto">
              Terima kasih atas doa restu dan kehadiran yang tulus dari Anda semua.
            </p>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-xs text-stone-400">
            <span>Dibuat dengan</span>
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>untuk Momen Bahagia</span>
          </div>

          {/* Discreet Admin Entry Button */}
          <div className="pt-4">
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium text-stone-500 hover:text-stone-800 bg-stone-200/50 hover:bg-stone-300/50 border border-stone-300/60 transition-all"
              title="Akses Panel Pengelola Undangan"
            >
              <Lock className="w-3 h-3" />
              <span>Panel Pengelola Undangan</span>
            </button>
          </div>
        </footer>

      </div>

    </div>
  );
};
