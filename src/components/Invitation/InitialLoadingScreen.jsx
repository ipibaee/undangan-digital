import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

export const InitialLoadingScreen = ({ isFadingOut, couple }) => {
  const groom = couple?.groom?.nickName || 'Ipi';
  const bride = couple?.bride?.nickName || 'Seli';

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-[#edf2ec] transition-opacity duration-700 ease-in-out ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        backgroundImage: `radial-gradient(circle at center, rgba(82, 122, 84, 0.08) 0%, rgba(237, 242, 236, 1) 75%)`,
      }}
    >
      <div className="flex flex-col items-center max-w-sm text-center space-y-6">
        {/* Decorative Ring & Heart Monogram */}
        <div className="relative w-20 h-20 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-emerald-700/30 animate-ping opacity-25" />
          <div className="w-16 h-16 rounded-full bg-emerald-800/10 border border-emerald-700/40 flex items-center justify-center shadow-inner">
            <Heart className="w-8 h-8 text-emerald-800 fill-emerald-800/20" />
          </div>
          <Sparkles className="w-4 h-4 text-amber-500 absolute -top-1 -right-1 animate-bounce" />
        </div>

        {/* Wedding Title */}
        <div className="space-y-1">
          <p className="text-[11px] uppercase tracking-[0.3em] text-emerald-900/60 font-semibold">
            The Wedding of
          </p>
          <h1 className="font-romantic text-4xl sm:text-5xl text-emerald-900 tracking-wide font-normal">
            {groom} & {bride}
          </h1>
        </div>

        {/* Loading Indicator */}
        <div className="flex flex-col items-center space-y-2 pt-2">
          <div className="w-32 h-1 bg-emerald-900/15 rounded-full overflow-hidden">
            <div className="w-full h-full bg-emerald-700 rounded-full animate-pulse" />
          </div>
          <p className="text-xs text-emerald-900/70 italic font-serif">
            Mempersiapkan lembaran bahagia...
          </p>
        </div>
      </div>
    </div>
  );
};
