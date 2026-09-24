import React, { useState, useEffect, useRef } from 'react';
import { useInvitation } from '../../context/InvitationContext';
import { ArrowDownCircle, PauseCircle } from 'lucide-react';

export const AutoScrollButton = () => {
  const { isOpen } = useInvitation();
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollIntervalRef = useRef(null);

  const toggleAutoScroll = () => {
    if (isScrolling) {
      clearInterval(scrollIntervalRef.current);
      setIsScrolling(false);
    } else {
      setIsScrolling(true);
      scrollIntervalRef.current = setInterval(() => {
        window.scrollBy({ top: 2, behavior: 'smooth' });
        // Stop if reached bottom
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
          clearInterval(scrollIntervalRef.current);
          setIsScrolling(false);
        }
      }, 30);
    }
  };

  useEffect(() => {
    return () => {
      if (scrollIntervalRef.current) clearInterval(scrollIntervalRef.current);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-5 z-40">
      <button
        onClick={toggleAutoScroll}
        className="px-3 py-2 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white text-xs font-medium shadow-xl flex items-center gap-1.5 hover:bg-black/90 transition-all cursor-pointer"
        title={isScrolling ? "Hentikan Auto Scroll" : "Mulai Auto Scroll"}
      >
        {isScrolling ? (
          <>
            <PauseCircle className="w-4 h-4 text-amber-300 animate-pulse" />
            <span className="hidden sm:inline">Stop</span>
          </>
        ) : (
          <>
            <ArrowDownCircle className="w-4 h-4 text-amber-300" />
            <span className="hidden sm:inline">Auto Scroll</span>
          </>
        )}
      </button>
    </div>
  );
};
