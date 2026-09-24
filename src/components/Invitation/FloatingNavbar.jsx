import React, { useState, useEffect } from 'react';
import { useInvitation } from '../../context/InvitationContext';
import { Home, Users, Calendar, BookHeart, Image, Gift, MessageSquareHeart } from 'lucide-react';

export const FloatingNavbar = () => {
  const { currentTheme, isOpen } = useInvitation();
  const [activeSection, setActiveSection] = useState('hero');

  if (!isOpen) return null;

  const navItems = [
    { id: 'hero', label: 'Sampul', icon: Home },
    { id: 'couple', label: 'Mempelai', icon: Users },
    { id: 'event', label: 'Acara', icon: Calendar },
    { id: 'story', label: 'Cerita', icon: BookHeart },
    { id: 'gallery', label: 'Galeri', icon: Image },
    { id: 'gift', label: 'Kado', icon: Gift },
    { id: 'rsvp', label: 'Ucapan', icon: MessageSquareHeart },
  ];

  const scrollTo = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed bottom-5 inset-x-0 z-40 flex justify-center px-4 pointer-events-none">
      <div className={`pointer-events-auto flex items-center gap-1 sm:gap-2 px-3 py-2 rounded-full shadow-2xl backdrop-blur-lg border border-white/20 transition-all ${currentTheme.navBg}`}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`p-2 sm:px-3 sm:py-1.5 rounded-full flex flex-col sm:flex-row items-center gap-1 text-[10px] sm:text-xs font-medium transition-all ${
                isActive 
                  ? 'bg-white text-stone-900 shadow-md font-bold' 
                  : 'hover:bg-white/20 text-white/90'
              }`}
              title={item.label}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden md:inline">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
