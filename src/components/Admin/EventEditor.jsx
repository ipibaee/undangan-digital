import React from 'react';
import { useInvitation } from '../../context/InvitationContext';
import { Calendar, Clock, MapPin, Navigation } from 'lucide-react';

export const EventEditor = () => {
  const { data, updateField } = useInvitation();
  const { targetDate, akad, resepsi } = data.events;

  return (
    <div className="space-y-8 text-stone-100">
      
      {/* Target Countdown Date */}
      <div className="p-6 rounded-2xl bg-stone-800 border border-stone-700 space-y-3">
        <h3 className="font-bold text-sm text-white flex items-center gap-2">
          <Clock className="w-4 h-4 text-amber-500" />
          <span>Waktu Target Hitung Mundur (Countdown)</span>
        </h3>
        <p className="text-xs text-stone-400">
          Tentukan tanggal dan jam dimulainya acara untuk timer hitung mundur dan kalender Google.
        </p>

        <div className="max-w-xs text-xs">
          <label className="block text-stone-300 mb-1 font-semibold uppercase tracking-wider">
            Tanggal & Jam Target
          </label>
          <input
            type="datetime-local"
            value={targetDate ? targetDate.substring(0, 16) : ''}
            onChange={(e) => updateField('events.targetDate', e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>
      </div>

      {/* Grid: Akad & Resepsi */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Akad Nikah */}
        <div className="p-6 rounded-2xl bg-stone-800 border border-stone-700 space-y-4 text-xs">
          <div className="flex items-center gap-2 pb-2 border-b border-stone-700">
            <Calendar className="w-4 h-4 text-amber-500" />
            <h4 className="font-bold text-sm text-white">Rangkaian Acara Akad Nikah</h4>
          </div>

          <div>
            <label className="block text-stone-300 mb-1 font-semibold uppercase tracking-wider">
              Judul Acara
            </label>
            <input
              type="text"
              value={akad.title}
              onChange={(e) => updateField('events.akad.title', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-stone-300 mb-1 font-semibold uppercase tracking-wider">
                Hari & Tanggal
              </label>
              <input
                type="text"
                value={akad.date}
                onChange={(e) => updateField('events.akad.date', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-stone-300 mb-1 font-semibold uppercase tracking-wider">
                Waktu Acara
              </label>
              <input
                type="text"
                value={akad.time}
                onChange={(e) => updateField('events.akad.time', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-stone-300 mb-1 font-semibold uppercase tracking-wider">
              Nama Tempat / Gedung / Masjid
            </label>
            <input
              type="text"
              value={akad.venueName}
              onChange={(e) => updateField('events.akad.venueName', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-stone-300 mb-1 font-semibold uppercase tracking-wider">
              Alamat Lengkap
            </label>
            <textarea
              rows={2}
              value={akad.address}
              onChange={(e) => updateField('events.akad.address', e.target.value)}
              className="w-full p-2.5 rounded-xl bg-stone-900 border border-stone-700 text-white focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-stone-300 mb-1 font-semibold uppercase tracking-wider">
              Tautan Google Maps Langsung (Petunjuk Arah)
            </label>
            <input
              type="text"
              value={akad.mapsUrl}
              onChange={(e) => updateField('events.akad.mapsUrl', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-stone-300 mb-1 font-semibold uppercase tracking-wider">
              Google Maps Embed URL (Iframe)
            </label>
            <input
              type="text"
              value={akad.mapsEmbed}
              onChange={(e) => updateField('events.akad.mapsEmbed', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-white focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono text-[11px]"
            />
          </div>
        </div>

        {/* Resepsi Pernikahan */}
        <div className="p-6 rounded-2xl bg-stone-800 border border-stone-700 space-y-4 text-xs">
          <div className="flex items-center gap-2 pb-2 border-b border-stone-700">
            <Calendar className="w-4 h-4 text-amber-500" />
            <h4 className="font-bold text-sm text-white">Rangkaian Acara Resepsi</h4>
          </div>

          <div>
            <label className="block text-stone-300 mb-1 font-semibold uppercase tracking-wider">
              Judul Acara
            </label>
            <input
              type="text"
              value={resepsi.title}
              onChange={(e) => updateField('events.resepsi.title', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-stone-300 mb-1 font-semibold uppercase tracking-wider">
                Hari & Tanggal
              </label>
              <input
                type="text"
                value={resepsi.date}
                onChange={(e) => updateField('events.resepsi.date', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-stone-300 mb-1 font-semibold uppercase tracking-wider">
                Waktu Acara
              </label>
              <input
                type="text"
                value={resepsi.time}
                onChange={(e) => updateField('events.resepsi.time', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-stone-300 mb-1 font-semibold uppercase tracking-wider">
              Nama Tempat / Gedung
            </label>
            <input
              type="text"
              value={resepsi.venueName}
              onChange={(e) => updateField('events.resepsi.venueName', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-stone-300 mb-1 font-semibold uppercase tracking-wider">
              Alamat Lengkap
            </label>
            <textarea
              rows={2}
              value={resepsi.address}
              onChange={(e) => updateField('events.resepsi.address', e.target.value)}
              className="w-full p-2.5 rounded-xl bg-stone-900 border border-stone-700 text-white focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-stone-300 mb-1 font-semibold uppercase tracking-wider">
              Tautan Google Maps Langsung (Petunjuk Arah)
            </label>
            <input
              type="text"
              value={resepsi.mapsUrl}
              onChange={(e) => updateField('events.resepsi.mapsUrl', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-stone-300 mb-1 font-semibold uppercase tracking-wider">
              Google Maps Embed URL (Iframe)
            </label>
            <input
              type="text"
              value={resepsi.mapsEmbed}
              onChange={(e) => updateField('events.resepsi.mapsEmbed', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-white focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono text-[11px]"
            />
          </div>
        </div>

      </div>

    </div>
  );
};
