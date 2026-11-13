import React, { useState } from 'react';
import { useInvitation } from '../../context/InvitationContext';
import { Disc3, Volume2, VolumeX, Music } from 'lucide-react';

export const MusicPlayer = () => {
  const { data, isPlaying, toggleMusic, isOpen } = useInvitation();
  const [showTooltip, setShowTooltip] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2">
      {/* Tooltip Title */}
      {showTooltip && (
        <div className="px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md text-white text-xs font-medium tracking-wide shadow-lg border border-white/20 animate-fade-in flex items-center gap-2">
          <Music className="w-3.5 h-3.5 text-amber-300" />
          <span className="truncate max-w-[150px]">{data.meta?.musicTitle || 'Musik Latar'}</span>
        </div>
      )}

      {/* Vinyl Disc Button */}
      <button
        onClick={toggleMusic}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label="Toggle Musik Latar"
        className="relative w-12 h-12 rounded-full bg-stone-900 border-2 border-stone-200/90 shadow-2xl flex items-center justify-center text-amber-300 transition-transform active:scale-90 hover:scale-105 cursor-pointer"
      >
        {/* Spinning Disc Animation */}
        <div className={`absolute inset-0 flex items-center justify-center ${isPlaying ? 'animate-spin-slow' : ''}`}>
          <Disc3 className="w-10 h-10 text-stone-200 opacity-90" />
        </div>

        {/* Center Play/Pause indicator */}
        <div className="relative z-10 w-4 h-4 rounded-full bg-[#A37B69] text-white flex items-center justify-center shadow">
          {isPlaying ? (
            <Volume2 className="w-2.5 h-2.5 text-white" />
          ) : (
            <VolumeX className="w-2.5 h-2.5 text-white" />
          )}
        </div>
      </button>
    </div>
  );
};
