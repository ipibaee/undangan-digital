import React, { useState, useRef } from 'react';
import { useInvitation } from '../../context/InvitationContext';
import { 
  Palette, Music, Sparkles, Check, Play, Volume2, Upload, 
  Disc, Layers, Sliders, Eye, RefreshCw 
} from 'lucide-react';
import { themes } from '../../data/themes';
import { readAudioFile } from '../../utils/fileUploadHelper';

export const ThemeMusicEditor = () => {
  const { data, updateField, isPlaying, toggleMusic } = useInvitation();
  const activeThemeKey = data.meta.activeTheme || 'champagne-floral';
  const music = data.music || {};
  const meta = data.meta || {};

  const audioFileInputRef = useRef(null);
  const [isUploadingAudio, setIsUploadingAudio] = useState(false);

  // Background modes: 'theme' | 'solid' | 'gradient'
  const currentBgType = meta.bgType || 'theme';
  const customBgColor = meta.customBgColor || '#faf6f0';
  const customGradient = meta.customGradient || 'linear-gradient(135deg, #fdfbf7 0%, #f4ece1 100%)';
  const gradientColor1 = meta.gradientColor1 || '#fdfbf7';
  const gradientColor2 = meta.gradientColor2 || '#f4ece1';
  const showFloral = meta.showFloralOrnaments !== false;
  const floralAccentColor = meta.accentColor || '#928573';

  // Music Presets
  const musicPresets = [
    {
      title: "Romantic Wedding Acoustic (Bawaan)",
      artist: "Acoustic Melody",
      url: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-acoustic-112191.mp3"
    },
    {
      title: "Sweet Piano & Strings Romance",
      artist: "Classical Elegance",
      url: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c33b8fb359.mp3?filename=romantic-piano-10705.mp3"
    },
    {
      title: "Gentle Guitar & Cello Serenade",
      artist: "Warm Strings",
      url: "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=love-story-romantic-10887.mp3"
    }
  ];

  // Solid Color Presets
  const solidPresets = [
    { name: 'Champagne Ivory', hex: '#faf6f0' },
    { name: 'Warm Cream', hex: '#fdfbf7' },
    { name: 'Soft Linen', hex: '#f5ede4' },
    { name: 'Blush Peach', hex: '#fcf3f2' },
    { name: 'Botanical Sage', hex: '#f2f6f2' },
    { name: 'Pale Olive', hex: '#edf2ec' },
    { name: 'Midnight Velvet', hex: '#0e131a' },
    { name: 'Dark Emerald', hex: '#0a1612' },
  ];

  // Gradient Presets
  const gradientPresets = [
    { 
      name: 'Champagne Warmth', 
      css: 'linear-gradient(135deg, #fdfbf7 0%, #f4ece1 100%)',
      c1: '#fdfbf7', 
      c2: '#f4ece1' 
    },
    { 
      name: 'Romantic Rose Blush', 
      css: 'linear-gradient(135deg, #fdf5f5 0%, #fae6e6 100%)',
      c1: '#fdf5f5', 
      c2: '#fae6e6' 
    },
    { 
      name: 'Botanical Sage Mist', 
      css: 'linear-gradient(135deg, #f4f7f3 0%, #e1e9df 100%)',
      c1: '#f4f7f3', 
      c2: '#e1e9df' 
    },
    { 
      name: 'Golden Sunset Elegance', 
      css: 'linear-gradient(135deg, #fffaf0 0%, #f6ebd8 100%)',
      c1: '#fffaf0', 
      c2: '#f6ebd8' 
    },
    { 
      name: 'Royal Midnight Velvet', 
      css: 'linear-gradient(135deg, #101620 0%, #1c1d19 100%)',
      c1: '#101620', 
      c2: '#1c1d19' 
    },
    { 
      name: 'Dark Emerald Luxury', 
      css: 'linear-gradient(135deg, #091512 0%, #15221b 100%)',
      c1: '#091512', 
      c2: '#15221b' 
    },
  ];

  // Handle custom two-color gradient update
  const handleUpdateTwoColors = (c1, c2) => {
    const css = `linear-gradient(135deg, ${c1} 0%, ${c2} 100%)`;
    updateField('meta.gradientColor1', c1);
    updateField('meta.gradientColor2', c2);
    updateField('meta.customGradient', css);
  };

  // Handle Audio Upload
  const handleAudioUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingAudio(true);
      const audioDataUrl = await readAudioFile(file);
      const fileNameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
      
      updateField('music.title', fileNameWithoutExt);
      updateField('music.artist', 'Audio Kustom (Upload)');
      updateField('music.url', audioDataUrl);
      alert(`Lagu "${fileNameWithoutExt}" berhasil diunggah!`);
    } catch (err) {
      alert('Gagal mengunggah file audio: ' + err.message);
    } finally {
      setIsUploadingAudio(false);
    }
  };

  return (
    <div className="space-y-8 text-stone-100">
      
      {/* 1. Theme Template Selection */}
      <div className="p-6 rounded-2xl bg-stone-800 border border-stone-700 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <Palette className="w-4 h-4 text-amber-500" />
            <span>Pilihan Template Utama</span>
          </h3>
          <span className="text-xs text-stone-400">4 Pilihan Desain</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.entries(themes).map(([key, t]) => {
            const isSelected = activeThemeKey === key;
            return (
              <div
                key={key}
                onClick={() => updateField('meta.activeTheme', key)}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 relative flex flex-col justify-between ${
                  isSelected 
                    ? 'border-amber-500 bg-stone-900 shadow-xl' 
                    : 'border-stone-700 bg-stone-900/60 hover:border-stone-600'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-white">{t.name}</span>
                    {isSelected && (
                      <span className="w-6 h-6 rounded-full bg-amber-500 text-stone-900 flex items-center justify-center">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    {t.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-stone-800">
                  <div className={`w-6 h-6 rounded-full ${t.bgClass} border border-stone-600`} title="Background" />
                  <div className={`w-6 h-6 rounded-full ${t.accentBg}`} title="Accent" />
                  <div className={`flex-1 h-6 rounded-lg bg-gradient-to-r ${t.goldGradient}`} title="Gradient" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Custom Background Settings (Solid Color / Gradient / Default Theme) with Floral Accents */}
      <div className="p-6 rounded-2xl bg-stone-800 border border-stone-700 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-500" />
              <span>Kustomisasi Background Undangan (Solid / Gradient)</span>
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">
              Ubah warna latar belakang setelah undangan dibuka. Aksen ornamen bunga tetap akan muncul di atasnya!
            </p>
          </div>
        </div>

        {/* Mode Selector */}
        <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-stone-900 border border-stone-700 text-xs">
          <button
            type="button"
            onClick={() => updateField('meta.bgType', 'theme')}
            className={`py-2.5 px-3 rounded-xl font-bold transition-all text-center ${
              currentBgType === 'theme' 
                ? 'bg-amber-600 text-white shadow-md' 
                : 'text-stone-400 hover:text-white'
            }`}
          >
            Tema Bawaan
          </button>

          <button
            type="button"
            onClick={() => updateField('meta.bgType', 'solid')}
            className={`py-2.5 px-3 rounded-xl font-bold transition-all text-center ${
              currentBgType === 'solid' 
                ? 'bg-amber-600 text-white shadow-md' 
                : 'text-stone-400 hover:text-white'
            }`}
          >
            Warna Solid
          </button>

          <button
            type="button"
            onClick={() => updateField('meta.bgType', 'gradient')}
            className={`py-2.5 px-3 rounded-xl font-bold transition-all text-center ${
              currentBgType === 'gradient' 
                ? 'bg-amber-600 text-white shadow-md' 
                : 'text-stone-400 hover:text-white'
            }`}
          >
            Gradasi (Gradient)
          </button>
        </div>

        {/* Options for Solid Color */}
        {currentBgType === 'solid' && (
          <div className="p-5 rounded-2xl bg-stone-900/80 border border-stone-700/80 space-y-4 animate-fade-in text-xs">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="font-bold text-white">Pilih Warna Solid</span>
                <p className="text-[11px] text-stone-400">Pilih dari palet warna pernikahan rekomendasi atau pilih warna kustom:</p>
              </div>

              {/* Color Picker */}
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={customBgColor}
                  onChange={(e) => updateField('meta.customBgColor', e.target.value)}
                  className="w-9 h-9 rounded-xl bg-transparent border-0 cursor-pointer"
                />
                <span className="font-mono text-stone-300 font-bold">{customBgColor}</span>
              </div>
            </div>

            {/* Solid Presets */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              {solidPresets.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => updateField('meta.customBgColor', preset.hex)}
                  className={`p-2.5 rounded-xl border flex items-center gap-2.5 text-left transition-all ${
                    customBgColor.toLowerCase() === preset.hex.toLowerCase()
                      ? 'border-amber-500 bg-stone-800 shadow'
                      : 'border-stone-700/80 bg-stone-900/60 hover:border-stone-600'
                  }`}
                >
                  <span className="w-5 h-5 rounded-full border border-stone-500/50 flex-shrink-0" style={{ backgroundColor: preset.hex }} />
                  <span className="text-[11px] font-medium text-stone-200 truncate">{preset.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Options for Gradient */}
        {currentBgType === 'gradient' && (
          <div className="p-5 rounded-2xl bg-stone-900/80 border border-stone-700/80 space-y-4 animate-fade-in text-xs">
            <div>
              <span className="font-bold text-white">Pilih Preset Gradasi Elegan</span>
              <p className="text-[11px] text-stone-400">Gradasi lembut yang mempercantik ornamen bunga dan kartu undangan:</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {gradientPresets.map((gp, idx) => {
                const isSelected = customGradient === gp.css;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      updateField('meta.customGradient', gp.css);
                      updateField('meta.gradientColor1', gp.c1);
                      updateField('meta.gradientColor2', gp.c2);
                    }}
                    className={`p-3 rounded-xl border flex items-center gap-3 text-left transition-all ${
                      isSelected ? 'border-amber-500 bg-stone-800 shadow-md ring-1 ring-amber-500' : 'border-stone-700 bg-stone-900/60 hover:border-stone-600'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg border border-stone-600 shadow-sm flex-shrink-0" style={{ background: gp.css }} />
                    <span className="text-xs font-semibold text-stone-200 truncate">{gp.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Custom 2-Color Gradient Picker */}
            <div className="pt-3 border-t border-stone-800 space-y-2">
              <span className="font-bold text-stone-300">Atau Buat Gradasi Kustom Sendiri (2 Warna):</span>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <label className="text-stone-400 text-[11px]">Warna Awal:</label>
                  <input
                    type="color"
                    value={gradientColor1}
                    onChange={(e) => handleUpdateTwoColors(e.target.value, gradientColor2)}
                    className="w-8 h-8 rounded-lg cursor-pointer"
                  />
                  <span className="font-mono text-stone-300 text-[11px]">{gradientColor1}</span>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-stone-400 text-[11px]">Warna Akhir:</label>
                  <input
                    type="color"
                    value={gradientColor2}
                    onChange={(e) => handleUpdateTwoColors(gradientColor1, e.target.value)}
                    className="w-8 h-8 rounded-lg cursor-pointer"
                  />
                  <span className="font-mono text-stone-300 text-[11px]">{gradientColor2}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Floral Accents Settings */}
        <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-700/60 space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="font-bold text-stone-200">Aksen Bunga & Ornamen Sudut</span>
              <p className="text-[11px] text-stone-400">Ornamen botani sudut yang mempermanis background undangan</p>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showFloral}
                onChange={(e) => updateField('meta.showFloralOrnaments', e.target.checked)}
                className="rounded bg-stone-800 border-stone-600 text-amber-600 focus:ring-0"
              />
              <span className="text-xs font-semibold text-stone-300">Tampilkan Bunga</span>
            </label>
          </div>

          <div className="flex items-center gap-3 pt-1 border-t border-stone-800">
            <span className="text-stone-400">Warna Aksen Bunga / Ornamen:</span>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={floralAccentColor}
                onChange={(e) => updateField('meta.accentColor', e.target.value)}
                className="w-8 h-8 rounded-lg cursor-pointer"
              />
              <span className="font-mono text-stone-300">{floralAccentColor}</span>
            </div>
          </div>
        </div>

      </div>

      {/* 3. Background Music Settings (Presets, Custom URL, and Audio File Upload) */}
      <div className="p-6 rounded-2xl bg-stone-800 border border-stone-700 space-y-5 text-xs">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <Music className="w-4 h-4 text-amber-500" />
            <span>Pengaturan Musik Latar Belakang</span>
          </h3>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={music.enabled}
              onChange={(e) => updateField('music.enabled', e.target.checked)}
              className="rounded bg-stone-900 border-stone-700 text-amber-600 focus:ring-0"
            />
            <span className="font-semibold text-stone-300">Aktifkan Musik</span>
          </label>
        </div>

        {/* Music Presets */}
        <div className="space-y-2">
          <label className="block text-stone-300 font-semibold uppercase tracking-wider">
            Pilihan Musik Bawaan (Bebas Royalti)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {musicPresets.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  updateField('music.title', preset.title);
                  updateField('music.artist', preset.artist);
                  updateField('music.url', preset.url);
                }}
                className={`p-3 rounded-xl border text-left transition-all ${
                  music.url === preset.url
                    ? 'border-amber-500 bg-stone-900 text-white shadow-md'
                    : 'border-stone-700 bg-stone-900/40 text-stone-400 hover:text-white hover:border-stone-600'
                }`}
              >
                <p className="font-bold text-xs truncate text-stone-200">{preset.title}</p>
                <p className="text-[11px] text-stone-500">{preset.artist}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Audio File Upload Box (New Feature!) */}
        <div className="p-4 rounded-xl bg-stone-900/70 border border-stone-700/70 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-white flex items-center gap-1.5">
              <Upload className="w-4 h-4 text-amber-400" />
              <span>Upload Lagu Sendiri dari Laptop / HP</span>
            </span>
            <span className="text-[10px] text-stone-400">MP3, WAV, M4A</span>
          </div>

          <p className="text-stone-400 text-[11px]">
            Anda dapat mengunggah file lagu favorit Anda langsung dari penyimpanan perangkat.
          </p>

          <input
            ref={audioFileInputRef}
            type="file"
            accept="audio/*"
            onChange={handleAudioUpload}
            className="hidden"
          />

          <button
            type="button"
            onClick={() => audioFileInputRef.current?.click()}
            disabled={isUploadingAudio}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white font-semibold flex items-center justify-center gap-2 shadow"
          >
            <Upload className="w-4 h-4" />
            <span>{isUploadingAudio ? 'Sedang Memproses Lagu...' : 'Pilih File Lagu (Upload Musik)'}</span>
          </button>
        </div>

        {/* Current Song Details & Direct URL */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div>
            <label className="block text-stone-300 mb-1 font-semibold uppercase tracking-wider">
              Judul Lagu
            </label>
            <input
              type="text"
              value={music.title || ''}
              onChange={(e) => updateField('music.title', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-stone-300 mb-1 font-semibold uppercase tracking-wider">
              URL File Audio MP3 (Atau Data URL)
            </label>
            <input
              type="text"
              value={music.url?.startsWith('data:') ? '<File Audio Terunggah>' : (music.url || '')}
              onChange={(e) => updateField('music.url', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-white focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono text-[11px]"
            />
          </div>
        </div>

        {/* Test Audio Button */}
        <div className="flex items-center gap-3 pt-1">
          <button
            type="button"
            onClick={toggleMusic}
            className="px-4 py-2 rounded-xl bg-stone-700 hover:bg-stone-600 text-white flex items-center gap-2 font-semibold shadow"
          >
            <Volume2 className="w-4 h-4 text-amber-400" />
            <span>{isPlaying ? 'Jeda Lagu (Pause)' : 'Uji Putar Musik (Play)'}</span>
          </button>
        </div>
      </div>

      {/* 4. Quote Editor */}
      <div className="p-6 rounded-2xl bg-stone-800 border border-stone-700 space-y-4 text-xs">
        <h3 className="font-bold text-sm text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Kutipan Suci / Ayat Al-Qur'an</span>
        </h3>

        <div>
          <label className="block text-stone-300 mb-1 font-semibold uppercase tracking-wider">
            Sumber Kutipan (e.g. QS. Ar-Rum: 21)
          </label>
          <input
            type="text"
            value={meta.quoteSource || ''}
            onChange={(e) => updateField('meta.quoteSource', e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>

        <div>
          <label className="block text-stone-300 mb-1 font-semibold uppercase tracking-wider">
            Teks Ayat / Kutipan Doa Pernikahan
          </label>
          <textarea
            rows={3}
            value={meta.quote || ''}
            onChange={(e) => updateField('meta.quote', e.target.value)}
            className="w-full p-2.5 rounded-xl bg-stone-900 border border-stone-700 text-white focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none"
          />
        </div>
      </div>

    </div>
  );
};
