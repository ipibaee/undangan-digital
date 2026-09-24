import React, { useState } from 'react';
import { useInvitation } from '../../context/InvitationContext';
import { Image as ImageIcon, Video, X, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { FloralBadge } from './Ornaments';

export const GallerySection = () => {
  const { data, currentTheme } = useInvitation();
  const gallery = data.gallery || [];
  const streaming = data.streaming || {};

  const [activePhotoIdx, setActivePhotoIdx] = useState(null);

  const openLightbox = (idx) => setActivePhotoIdx(idx);
  const closeLightbox = () => setActivePhotoIdx(null);
  
  const nextPhoto = (e) => {
    e.stopPropagation();
    setActivePhotoIdx((prev) => (prev + 1) % gallery.length);
  };

  const prevPhoto = (e) => {
    e.stopPropagation();
    setActivePhotoIdx((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  return (
    <section id="gallery" className="relative py-16 sm:py-24 px-4 overflow-hidden">
      <div className="max-w-xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <FloralBadge text="Galeri & Video" color={data.meta.accentColor} />
          <h2 className="font-romantic text-4xl sm:text-5xl" style={{ color: data.meta.accentColor }}>
            Momen Bahagia
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
            Potret kebersamaan dan kenangan manis yang kami abadikan dalam bingkai cinta.
          </p>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {gallery.map((photo, idx) => (
            <div 
              key={photo.id || idx}
              onClick={() => openLightbox(idx)}
              className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-md cursor-pointer group bg-stone-200"
            >
              <img 
                src={photo.url} 
                alt={photo.caption || 'Foto Pernikahan'} 
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-3 text-center">
                <p className="text-white text-xs font-medium font-serif-heading drop-shadow-md">
                  {photo.caption || 'Lihat Foto'}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Live Streaming Video Section */}
        {streaming.enabled && (
          <div className={`p-6 sm:p-8 rounded-3xl ${currentTheme.cardBg} space-y-4 shadow-md`}>
            <div className="text-center space-y-2">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${currentTheme.badgeBg}`}>
                <Video className="w-3.5 h-3.5 inline mr-1" />
                Live Streaming
              </span>
              <h3 className="font-serif-heading text-xl font-bold text-stone-800">
                {streaming.title || 'Siaran Langsung Acara'}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {streaming.description}
              </p>
            </div>

            {/* Video Container */}
            <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-inner border border-stone-200 bg-black">
              {streaming.youtubeId ? (
                <iframe
                  title="Streaming Pernikahan"
                  src={`https://www.youtube.com/embed/${streaming.youtubeId}?rel=0`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-white/70 space-y-2">
                  <Play className="w-12 h-12" />
                  <p className="text-xs">Tautan siaran langsung belum dimulai</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Lightbox Modal */}
        {activePhotoIdx !== null && (
          <div 
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <button 
              onClick={closeLightbox}
              className="absolute top-5 right-5 text-white/80 hover:text-white p-2 rounded-full bg-white/10"
            >
              <X className="w-6 h-6" />
            </button>

            <button 
              onClick={prevPhoto}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2 rounded-full bg-white/10"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <div className="max-w-3xl max-h-[80vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
              <img 
                src={gallery[activePhotoIdx]?.url} 
                alt="Foto HD" 
                className="max-h-[75vh] w-auto rounded-lg shadow-2xl object-contain"
              />
              {gallery[activePhotoIdx]?.caption && (
                <p className="text-white/90 text-sm mt-3 font-serif-heading">
                  {gallery[activePhotoIdx]?.caption}
                </p>
              )}
            </div>

            <button 
              onClick={nextPhoto}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2 rounded-full bg-white/10"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
