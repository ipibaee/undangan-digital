import React from 'react';
import { useInvitation } from '../../context/InvitationContext';
import { Heart, Sparkles } from 'lucide-react';
import { FloralBadge } from './Ornaments';

export const LoveStorySection = () => {
  const { data, currentTheme } = useInvitation();
  const stories = data.stories || [];

  if (stories.length === 0) return null;

  return (
    <section id="story" className="relative py-16 sm:py-24 px-4 overflow-hidden">
      <div className="max-w-xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <FloralBadge text="Kisah Cinta" color={data.meta.accentColor} />
          <h2 className="font-romantic text-4xl sm:text-5xl" style={{ color: data.meta.accentColor }}>
            Cerita Bahagia Kami
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
            Setiap perjalanan memiliki cerita, dan inilah sepenggal kisah bagaimana takdir mempertemukan kami berdua.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative border-l-2 border-dashed border-stone-300 ml-4 sm:ml-6 space-y-8 pl-6 sm:pl-8">
          {stories.map((story, idx) => (
            <div key={story.id || idx} className="relative group">
              {/* Dot Icon */}
              <div 
                className="absolute -left-[35px] sm:-left-[43px] top-1 w-8 h-8 rounded-full bg-white border-2 flex items-center justify-center shadow-md transition-transform group-hover:scale-110"
                style={{ borderColor: data.meta.accentColor }}
              >
                <Heart className="w-3.5 h-3.5 fill-current" style={{ color: data.meta.accentColor }} />
              </div>

              {/* Story Content Card */}
              <div className={`p-5 sm:p-6 rounded-2xl ${currentTheme.cardBg} space-y-2 transition-all duration-300 group-hover:shadow-lg`}>
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${currentTheme.badgeBg}`}>
                    {story.year}
                  </span>
                  <Sparkles className="w-3.5 h-3.5 opacity-40 text-amber-500" />
                </div>
                <h3 className="font-serif-heading text-lg font-bold text-stone-800">
                  {story.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {story.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
