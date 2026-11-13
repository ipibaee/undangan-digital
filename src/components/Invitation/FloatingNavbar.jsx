import React, { useState, useEffect } from 'react';
import { useInvitation } from '../../context/InvitationContext';
import { Home, Heart, Calendar, Image, MessageSquare } from 'lucide-react';

export const FloatingNavbar = () => {
  const { currentTheme, isOpen } = useInvitation();
  const [activeSection, setActiveSection] = useState('hero');

  if (!isOpen) return null;

  const navItems = [
    { id: 'hero', label: 'Home', icon: Home },
    { id: 'couple', label: 'Mempelai', icon: Heart },
    { id: 'event', label: 'Acara', icon: Calendar },
    { id: 'gallery', label: 'Galeri', icon: Image },
    { id: 'rsvp', label: 'Ucapan', icon: MessageSquare },
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
    <nav className="fixed bottom-4 inset-x-0 z-40 flex justify-center px-4 pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-2 px-3 py-2 rounded-2xl bg-white/95 backdrop-blur-md shadow-2xl border border-stone-200/90 transition-all duration-300">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 cursor-pointer ${
                isActive 
                  ? 'bg-[#A37B69] text-white shadow-md scale-105' 
                  : 'text-stone-500 hover:text-stone-900 hover:bg-stone-100'
              }`}
              title={item.label}
            >
              <Icon className="w-4 h-4 fill-current" />
            </button>
          );
        })}
      </div>
    </nav>
  );
};
