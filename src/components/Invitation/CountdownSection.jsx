import React, { useState, useEffect } from 'react';
import { useInvitation } from '../../context/InvitationContext';
import { Calendar, Clock, Bell } from 'lucide-react';
import { FloralBadge } from './Ornaments';

export const CountdownSection = () => {
  const { data, currentTheme } = useInvitation();
  const targetDateStr = data.events.targetDate || "2026-12-28T09:00:00";

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const difference = +new Date(targetDateStr) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [targetDateStr]);

  // Generate Google Calendar Link
  const handleSaveToCalendar = () => {
    const title = encodeURIComponent(`The Wedding of ${data.couple.groom.nickName} & ${data.couple.bride.nickName}`);
    const details = encodeURIComponent(`Pernikahan ${data.couple.groom.fullName} & ${data.couple.bride.fullName}.\nLokasi: ${data.events.akad.venueName}, ${data.events.akad.address}`);
    const location = encodeURIComponent(`${data.events.akad.venueName}, ${data.events.akad.address}`);
    
    // Format YYYYMMDDTHHmmSSZ
    const d = new Date(targetDateStr);
    const startIso = d.toISOString().replace(/-|:|\.\d\d\d/g,"");
    const end = new Date(d.getTime() + 6 * 3600 * 1000);
    const endIso = end.toISOString().replace(/-|:|\.\d\d\d/g,"");

    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startIso}/${endIso}&details=${details}&location=${location}`;
    window.open(googleCalUrl, '_blank');
  };

  return (
    <section className="relative py-12 px-4 overflow-hidden">
      <div className="max-w-xl mx-auto text-center space-y-8">
        
        <div className="space-y-2">
          <FloralBadge text="Menghitung Hari" color={data.meta.accentColor} />
          <h2 className="font-romantic text-4xl sm:text-5xl" style={{ color: data.meta.accentColor }}>
            Hari Yang Dinanti
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            Waktu bergulir menuju ikrar suci pernikahan kami berdua:
          </p>
        </div>

        {/* 4 Countdown Boxes */}
        <div className="grid grid-cols-4 gap-2 sm:gap-4">
          {[
            { label: 'Hari', value: timeLeft.days },
            { label: 'Jam', value: timeLeft.hours },
            { label: 'Menit', value: timeLeft.minutes },
            { label: 'Detik', value: timeLeft.seconds },
          ].map((item, idx) => (
            <div 
              key={idx}
              className={`p-3 sm:p-5 rounded-2xl ${currentTheme.cardBg} flex flex-col items-center justify-center shadow-lg transition-transform hover:-translate-y-1`}
            >
              <span className="font-cinzel text-2xl sm:text-4xl font-bold tracking-tight text-stone-800">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-stone-500 mt-1">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Save to Calendar Button */}
        <div>
          <button
            onClick={handleSaveToCalendar}
            className={`inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase shadow-md ${currentTheme.secondaryBtn}`}
          >
            <Calendar className="w-4 h-4" />
            <span>Simpan Ke Google Calendar</span>
          </button>
        </div>

      </div>
    </section>
  );
};
