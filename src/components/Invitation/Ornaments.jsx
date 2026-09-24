import React from 'react';

export const CornerFlourish = ({ className = '', position = 'top-left', color = '#928573' }) => {
  const getRotation = () => {
    switch (position) {
      case 'top-right': return 'scale-x-[-1]';
      case 'bottom-left': return 'scale-y-[-1]';
      case 'bottom-right': return 'scale-[-1]';
      default: return '';
    }
  };

  return (
    <div className={`pointer-events-none absolute z-10 w-28 sm:w-36 md:w-44 opacity-80 ${getRotation()} ${className}`}>
      <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
        <path d="M10 10 C 50 15, 90 40, 110 80 C 120 100, 130 130, 135 155" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeDasharray="3 3"/>
        <path d="M15 15 C 60 25, 100 55, 120 95 C 130 115, 140 140, 145 155" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M45 18 C 55 12, 68 12, 75 22 C 82 32, 75 42, 65 38 C 55 35, 40 25, 45 18 Z" fill={color} fillOpacity="0.45"/>
        <path d="M85 35 C 98 28, 110 32, 115 45 C 120 58, 110 68, 98 62 C 88 56, 78 42, 85 35 Z" fill={color} fillOpacity="0.45"/>
        <path d="M115 75 C 128 70, 138 78, 140 92 C 142 105, 130 112, 120 105 C 110 98, 108 82, 115 75 Z" fill={color} fillOpacity="0.45"/>
        <circle cx="20" cy="20" r="4" fill={color}/>
        <circle cx="140" cy="140" r="3" fill={color}/>
      </svg>
    </div>
  );
};

export const SectionDivider = ({ color = '#928573' }) => {
  return (
    <div className="flex items-center justify-center my-6 space-x-3 opacity-80">
      <div className="h-[1px] w-12 sm:w-20" style={{ background: `linear-gradient(to left, ${color}, transparent)` }} />
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill={color} fillOpacity="0.8"/>
      </svg>
      <div className="h-[1px] w-12 sm:w-20" style={{ background: `linear-gradient(to right, ${color}, transparent)` }} />
    </div>
  );
};

export const FloralBadge = ({ text, color = '#928573' }) => {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase border border-current/25" style={{ color }}>
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
      {text}
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
    </div>
  );
};
