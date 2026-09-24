import React from 'react';
import { useInvitation } from '../../context/InvitationContext';
import { MapPin, Calendar, Clock, Navigation } from 'lucide-react';
import { FloralBadge, SectionDivider } from './Ornaments';

const resolveMapEmbed = (embedUrl, address, venueName, mapsUrl) => {
  if (embedUrl && typeof embedUrl === 'string') {
    const iframeMatch = embedUrl.match(/src=["']([^"']+)["']/i);
    if (iframeMatch) {
      return iframeMatch[1];
    }
  }

  // Check if it's the old default Jakarta template coordinates (106.759478 / -6.2297465)
  // while current address has been changed to something outside Jakarta
  const isDefaultJakartaEmbed = embedUrl && embedUrl.includes('106.759478') && embedUrl.includes('-6.2297465');
  const hasCustomAddress = address && !address.toLowerCase().includes('jakarta') && !address.toLowerCase().includes('kebayoran');

  if (isDefaultJakartaEmbed && hasCustomAddress) {
    const query = [venueName, address].filter(Boolean).join(', ');
    return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&hl=id&z=16&output=embed`;
  }

  if (embedUrl && embedUrl.trim()) {
    // If user mistakenly put a non-embed URL like maps.app.goo.gl
    if (embedUrl.includes('goo.gl') || !embedUrl.includes('embed')) {
      const query = [venueName, address].filter(Boolean).join(', ');
      return `https://maps.google.com/maps?q=${encodeURIComponent(query || 'Lokasi Acara')}&hl=id&z=16&output=embed`;
    }
    return embedUrl;
  }

  // Fallback if no embedUrl but address exists
  if (address || venueName) {
    const query = [venueName, address].filter(Boolean).join(', ');
    return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&hl=id&z=16&output=embed`;
  }

  return '';
};

export const EventSection = () => {
  const { data, currentTheme } = useInvitation();
  const { akad, resepsi } = data.events;

  const akadEmbed = resolveMapEmbed(akad.mapsEmbed, akad.address, akad.venueName, akad.mapsUrl);
  const resepsiEmbed = resolveMapEmbed(resepsi.mapsEmbed, resepsi.address, resepsi.venueName, resepsi.mapsUrl);

  return (
    <section id="event" className="relative py-16 sm:py-24 px-4 overflow-hidden">
      <div className="max-w-xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <FloralBadge text="Agenda & Lokasi" color={data.meta.accentColor} />
          <h2 className="font-romantic text-4xl sm:text-5xl" style={{ color: data.meta.accentColor }}>
            Rangkaian Acara
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
            Dengan penuh rasa syukur, kami mengundang kehadiran Bapak/Ibu/Saudara/i dalam rangkaian acara bahagia kami:
          </p>
        </div>

        {/* Event Cards */}
        <div className="space-y-8">
          
          {/* Akad Nikah */}
          <div className={`p-6 sm:p-8 rounded-3xl ${currentTheme.cardBg} space-y-6 shadow-md`}>
            <div className="text-center space-y-2">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${currentTheme.badgeBg}`}>
                {akad.title || 'Akad Nikah'}
              </span>
              <h3 className="font-serif-heading text-2xl font-bold text-stone-800">
                Ikrar Suci Akad Nikah
              </h3>
            </div>

            <div className="space-y-3 text-stone-700 text-sm">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-amber-700 flex-shrink-0" />
                <span className="font-medium">{akad.date}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-amber-700 flex-shrink-0" />
                <span>{akad.time}</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-stone-900">{akad.venueName}</p>
                  <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">{akad.address}</p>
                </div>
              </div>
            </div>

            {/* Google Maps Button */}
            {akad.mapsUrl && (
              <a 
                href={akad.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-2 ${currentTheme.primaryBtn}`}
              >
                <Navigation className="w-4 h-4" />
                <span>Petunjuk Arah (Google Maps)</span>
              </a>
            )}

            {/* Embedded Map */}
            {akadEmbed && (
              <div className="w-full h-48 sm:h-56 rounded-2xl overflow-hidden border border-stone-200 shadow-inner">
                <iframe
                  title="Peta Lokasi Akad"
                  src={akadEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            )}
          </div>

          {/* Resepsi Pernikahan */}
          <div className={`p-6 sm:p-8 rounded-3xl ${currentTheme.cardBg} space-y-6 shadow-md`}>
            <div className="text-center space-y-2">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${currentTheme.badgeBg}`}>
                {resepsi.title || 'Resepsi'}
              </span>
              <h3 className="font-serif-heading text-2xl font-bold text-stone-800">
                Resepsi Pernikahan
              </h3>
            </div>

            <div className="space-y-3 text-stone-700 text-sm">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-amber-700 flex-shrink-0" />
                <span className="font-medium">{resepsi.date}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-amber-700 flex-shrink-0" />
                <span>{resepsi.time}</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-stone-900">{resepsi.venueName}</p>
                  <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">{resepsi.address}</p>
                </div>
              </div>
            </div>

            {/* Google Maps Button */}
            {resepsi.mapsUrl && (
              <a 
                href={resepsi.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-2 ${currentTheme.primaryBtn}`}
              >
                <Navigation className="w-4 h-4" />
                <span>Petunjuk Arah (Google Maps)</span>
              </a>
            )}

            {/* Embedded Map */}
            {resepsiEmbed && (
              <div className="w-full h-48 sm:h-56 rounded-2xl overflow-hidden border border-stone-200 shadow-inner">
                <iframe
                  title="Peta Lokasi Resepsi"
                  src={resepsiEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
