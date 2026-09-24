import React from 'react';
import { useInvitation } from '../../context/InvitationContext';
import { Heart } from 'lucide-react';
import { InstagramIcon } from '../common/SocialIcons';
import { SectionDivider, FloralBadge } from './Ornaments';


export const CoupleSection = () => {
  const { data, currentTheme } = useInvitation();
  const { groom, bride } = data.couple;

  return (
    <section id="couple" className="relative py-16 sm:py-24 px-4 overflow-hidden">
      <div className="max-w-xl mx-auto text-center space-y-12">
        
        {/* Section Header */}
        <div className="space-y-3">
          <FloralBadge text="Sang Mempelai" color={data.meta.accentColor} />
          <h2 className="font-romantic text-4xl sm:text-5xl" style={{ color: data.meta.accentColor }}>
            Mempelai Pengantin
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
            Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan. Dengan memohon ridho dan rahmat-Nya, kami bermaksud mengikat janji suci.
          </p>
        </div>

        {/* Groom & Bride Cards */}
        <div className="space-y-12 sm:space-y-16">
          
          {/* Groom Card */}
          <div className={`p-6 sm:p-8 rounded-3xl ${currentTheme.cardBg} transition-all duration-300 hover:shadow-xl`}>
            {/* Groom Photo with Circular Ornament */}
            <div className="relative mx-auto w-40 h-40 sm:w-48 sm:h-48 mb-6">
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-stone-400/40 animate-spin-slow" />
              <div className="w-full h-full p-2">
                <img 
                  src={groom.photo} 
                  alt={groom.fullName} 
                  className="w-full h-full rounded-full object-cover shadow-lg border-2 border-white"
                />
              </div>
            </div>

            <h3 className="font-serif-heading text-2xl sm:text-3xl font-bold text-stone-800">
              {groom.fullName}
            </h3>
            <p className="font-script text-2xl text-amber-700/80 mb-2">
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

          {/* Heart Connector */}
          <div className="flex items-center justify-center my-4">
            <div className="w-12 h-12 rounded-full bg-white shadow-md border border-stone-200 flex items-center justify-center text-amber-600 animate-pulse">
              <Heart className="w-6 h-6 fill-current text-rose-500" />
            </div>
          </div>

          {/* Bride Card */}
          <div className={`p-6 sm:p-8 rounded-3xl ${currentTheme.cardBg} transition-all duration-300 hover:shadow-xl`}>
            {/* Bride Photo with Circular Ornament */}
            <div className="relative mx-auto w-40 h-40 sm:w-48 sm:h-48 mb-6">
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-stone-400/40 animate-spin-slow" />
              <div className="w-full h-full p-2">
                <img 
                  src={bride.photo} 
                  alt={bride.fullName} 
                  className="w-full h-full rounded-full object-cover shadow-lg border-2 border-white"
                />
              </div>
            </div>

            <h3 className="font-serif-heading text-2xl sm:text-3xl font-bold text-stone-800">
              {bride.fullName}
            </h3>
            <p className="font-script text-2xl text-amber-700/80 mb-2">
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

        </div>

      </div>
    </section>
  );
};
