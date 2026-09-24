import React, { useState } from 'react';
import { useInvitation } from '../../context/InvitationContext';
import { BookHeart, Image, Video, Plus, Trash2, Edit3, Upload, CheckCircle2, XCircle, Film } from 'lucide-react';
import { YoutubeIcon } from '../common/SocialIcons';
import { ImageUploadInput } from '../common/ImageUploadInput';

const cleanYoutubeInput = (input) => {
  if (!input) return '';
  const trimmed = input.trim();
  const match = trimmed.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|live\/|shorts\/))([\w-]{11})/);
  if (match) return match[1];
  return trimmed;
};

export const StoryGalleryEditor = () => {
  const { data, updateField } = useInvitation();
  const stories = data.stories || [];
  const gallery = data.gallery || [];
  const streaming = data.streaming || {};

  const [activeSubTab, setActiveSubTab] = useState('all');

  // New Story state
  const [newStory, setNewStory] = useState({ year: '', title: '', description: '' });
  // New Photo state
  const [newPhoto, setNewPhoto] = useState({ url: '', caption: '' });

  const handleAddStory = (e) => {
    e.preventDefault();
    if (!newStory.year || !newStory.title) return;
    const item = { ...newStory, id: 'story-' + Date.now() };
    updateField('stories', [...stories, item]);
    setNewStory({ year: '', title: '', description: '' });
  };

  const handleDeleteStory = (id) => {
    updateField('stories', stories.filter(s => s.id !== id));
  };

  const handleAddPhoto = (e) => {
    e.preventDefault();
    if (!newPhoto.url) return;
    const item = { ...newPhoto, id: 'g-' + Date.now() };
    updateField('gallery', [...gallery, item]);
    setNewPhoto({ url: '', caption: '' });
  };

  const handleDeletePhoto = (id) => {
    updateField('gallery', gallery.filter(g => g.id !== id));
  };

  const isStreamingActive = !!streaming.enabled;

  return (
    <div className="space-y-8 text-stone-100">
      
      {/* Sub-tab Navigation */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-stone-900 border border-stone-800">
        <button
          type="button"
          onClick={() => setActiveSubTab('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeSubTab === 'all'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'text-stone-400 hover:text-white hover:bg-stone-800'
          }`}
        >
          Semua Pengaturan
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('gallery')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
            activeSubTab === 'gallery'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'text-stone-400 hover:text-white hover:bg-stone-800'
          }`}
        >
          <Image className="w-3.5 h-3.5" />
          <span>Galeri Foto ({gallery.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('story')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
            activeSubTab === 'story'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'text-stone-400 hover:text-white hover:bg-stone-800'
          }`}
        >
          <BookHeart className="w-3.5 h-3.5" />
          <span>Kisah Cinta ({stories.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('streaming')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
            activeSubTab === 'streaming'
              ? 'bg-rose-700 text-white shadow-sm'
              : 'text-stone-400 hover:text-white hover:bg-stone-800'
          }`}
        >
          <Video className="w-3.5 h-3.5 text-rose-400" />
          <span>Live Streaming</span>
          <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
            isStreamingActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-stone-800 text-stone-500'
          }`}>
            {isStreamingActive ? 'ON' : 'OFF'}
          </span>
        </button>
      </div>
      
      {/* Love Story Section */}
      {(activeSubTab === 'all' || activeSubTab === 'story') && (
        <div className="p-6 rounded-2xl bg-stone-800 border border-stone-700 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <BookHeart className="w-4 h-4 text-amber-500" />
              <span>Kisah Cinta (Love Story Timeline)</span>
            </h3>
            <span className="text-xs text-stone-400">{stories.length} Cerita</span>
          </div>

          {/* Existing Stories */}
          <div className="space-y-3">
            {stories.map((story) => (
              <div key={story.id} className="p-4 rounded-xl bg-stone-900 border border-stone-700/80 flex items-start justify-between gap-3 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold">
                      {story.year}
                    </span>
                    <span className="font-bold text-sm text-white">{story.title}</span>
                  </div>
                  <p className="text-stone-400 leading-relaxed">{story.description}</p>
                </div>

                <button
                  onClick={() => handleDeleteStory(story.id)}
                  className="p-1.5 rounded-lg bg-stone-800 hover:bg-rose-900 text-stone-400 hover:text-rose-200 transition-all"
                  title="Hapus Cerita"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Add New Story Form */}
          <form onSubmit={handleAddStory} className="p-4 rounded-xl bg-stone-900/50 border border-stone-700/50 space-y-3 text-xs">
            <p className="font-bold text-stone-300 flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5 text-amber-500" />
              <span>Tambah Babak Kisah Baru</span>
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-stone-400 mb-1">Tahun / Waktu</label>
                <input
                  type="text"
                  placeholder="Contoh: 2023"
                  value={newStory.year}
                  onChange={(e) => setNewStory({ ...newStory, year: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-800 border border-stone-700 text-white focus:outline-none"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-stone-400 mb-1">Judul Momen</label>
                <input
                  type="text"
                  placeholder="Contoh: Pertama Kali Bertemu"
                  value={newStory.title}
                  onChange={(e) => setNewStory({ ...newStory, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-800 border border-stone-700 text-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-stone-400 mb-1">Cerita Singkat</label>
              <textarea
                rows={2}
                placeholder="Ceritakan momen indah perjalanan cinta Anda..."
                value={newStory.description}
                onChange={(e) => setNewStory({ ...newStory, description: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-stone-800 border border-stone-700 text-white focus:outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold shadow"
            >
              Simpan Momen
            </button>
          </form>
        </div>
      )}

      {/* Gallery Section */}
      {(activeSubTab === 'all' || activeSubTab === 'gallery') && (
        <div className="p-6 rounded-2xl bg-stone-800 border border-stone-700 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Image className="w-4 h-4 text-amber-500" />
              <span>Galeri Foto [HD]</span>
            </h3>
            <span className="text-xs text-stone-400">{gallery.length} Foto</span>
          </div>

          {/* Existing Photos Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {gallery.map((photo) => (
              <div key={photo.id} className="relative group rounded-xl overflow-hidden border border-stone-700 bg-stone-900 aspect-square">
                <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity p-2 flex flex-col justify-between text-xs">
                  <p className="text-white text-[11px] truncate">{photo.caption || 'Tanpa keterangan'}</p>
                  <button
                    onClick={() => handleDeletePhoto(photo.id)}
                    className="p-1 rounded bg-rose-600 text-white self-end hover:bg-rose-500"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add Photo Form */}
          <form onSubmit={handleAddPhoto} className="p-5 rounded-2xl bg-stone-900/70 border border-stone-700/70 space-y-4 text-xs">
            <p className="font-bold text-sm text-stone-200 flex items-center gap-1.5">
              <Plus className="w-4 h-4 text-amber-500" />
              <span>Tambah Foto Baru ke Galeri</span>
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ImageUploadInput
                label="Pilih Foto (Upload / URL)"
                value={newPhoto.url}
                onChange={(val) => setNewPhoto({ ...newPhoto, url: val })}
                previewAspect="aspect-square"
                maxWidth={1000}
              />

              <div className="flex flex-col justify-between space-y-3">
                <div>
                  <label className="block text-stone-300 mb-1 font-semibold uppercase tracking-wider">
                    Keterangan / Caption Foto
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Momen Bersama di Senja Hari"
                    value={newPhoto.caption}
                    onChange={(e) => setNewPhoto({ ...newPhoto, caption: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-800 border border-stone-700 text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                  <p className="text-[11px] text-stone-500 mt-1">
                    Caption akan ditampilkan saat tamu mengeklik foto untuk melihat dalam resolusi penuh (HD).
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={!newPhoto.url}
                  className="w-full py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold flex items-center justify-center gap-2 shadow"
                >
                  <Plus className="w-4 h-4" />
                  <span>Simpan ke Galeri Foto</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      )}


      {/* Video Streaming Section */}
      {(activeSubTab === 'all' || activeSubTab === 'streaming') && (
        <div className={`p-6 rounded-2xl border transition-all space-y-4 text-xs ${
          isStreamingActive
            ? 'bg-rose-950/20 border-rose-800/40 text-stone-200'
            : 'bg-stone-800/60 border-stone-700 text-stone-300'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                isStreamingActive ? 'bg-rose-500/20 text-rose-400' : 'bg-stone-700/60 text-stone-400'
              }`}>
                <Video className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-white">Fitur Live Streaming (Siaran Langsung)</h4>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    isStreamingActive 
                      ? 'bg-rose-900/60 text-rose-300 border border-rose-700/50' 
                      : 'bg-stone-700 text-stone-400 border border-stone-600'
                  }`}>
                    {isStreamingActive ? 'Aktif di Undangan' : 'Nonaktif (Disembunyikan)'}
                  </span>
                </div>
                <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                  {isStreamingActive 
                    ? 'Bagian siaran langsung YouTube saat ini ditampilkan di website undangan.' 
                    : 'Bagian live streaming saat ini dinonaktifkan dan disembunyikan sepenuhnya dari tampilan undangan.'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => updateField('streaming.enabled', !isStreamingActive)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 self-start sm:self-center cursor-pointer ${
                isStreamingActive 
                  ? 'bg-rose-900/50 hover:bg-rose-900/80 text-rose-200 border border-rose-700/60' 
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white'
              }`}
            >
              {isStreamingActive ? (
                <>
                  <XCircle className="w-4 h-4" />
                  <span>Nonaktifkan Streaming</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Aktifkan Streaming</span>
                </>
              )}
            </button>
          </div>

          {isStreamingActive && (
            <div className="space-y-4 pt-4 border-t border-stone-700/60">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-stone-300 mb-1 font-semibold uppercase tracking-wider">
                    Link Video / ID YouTube
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: https://youtube.com/watch?v=... atau ID YouTube"
                    value={streaming.youtubeId || ''}
                    onChange={(e) => updateField('streaming.youtubeId', cleanYoutubeInput(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-white focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono text-[11px]"
                  />
                  <span className="text-[11px] text-stone-400 mt-1 block">
                    Bisa tempelkan link lengkap YouTube atau hanya kode ID-nya.
                  </span>
                </div>

                <div>
                  <label className="block text-stone-300 mb-1 font-semibold uppercase tracking-wider">
                    Judul Bagian Siaran
                  </label>
                  <input
                    type="text"
                    value={streaming.title || ''}
                    onChange={(e) => updateField('streaming.title', e.target.value)}
                    placeholder="Contoh: Live Streaming Pernikahan"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-300 mb-1 font-semibold uppercase tracking-wider">
                  Keterangan / Pesan untuk Tamu
                </label>
                <textarea
                  rows={2}
                  value={streaming.description || ''}
                  onChange={(e) => updateField('streaming.description', e.target.value)}
                  placeholder="Keterangan tambahan..."
                  className="w-full p-2.5 rounded-xl bg-stone-900 border border-stone-700 text-white focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none"
                />
              </div>

              {streaming.youtubeId && (
                <div className="pt-2">
                  <p className="text-[11px] font-semibold text-stone-400 mb-2">Pratinjau Video YouTube:</p>
                  <div className="max-w-md aspect-video rounded-xl overflow-hidden border border-stone-700 bg-black">
                    <iframe
                      title="Preview YouTube"
                      src={`https://www.youtube.com/embed/${cleanYoutubeInput(streaming.youtubeId)}`}
                      className="w-full h-full"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
