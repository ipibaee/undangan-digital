import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Link as LinkIcon, Check, Loader2 } from 'lucide-react';
import { compressImage } from '../../utils/fileUploadHelper';

export const ImageUploadInput = ({ 
  label, 
  value, 
  onChange, 
  previewAspect = "aspect-video",
  maxWidth = 1200 
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Mohon pilih file gambar (JPG, PNG, WEBP).');
      return;
    }

    try {
      setIsUploading(true);
      const compressedDataUrl = await compressImage(file, maxWidth);
      onChange(compressedDataUrl);
    } catch (err) {
      console.error('Failed processing image:', err);
      alert('Gagal memproses gambar: ' + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-2 text-xs">
      {label && (
        <label className="block text-stone-300 font-semibold uppercase tracking-wider">
          {label}
        </label>
      )}

      {/* Preview Box & Upload Button */}
      <div className="relative group rounded-2xl overflow-hidden border border-stone-700 bg-stone-900">
        {value ? (
          <div className={`relative ${previewAspect} w-full overflow-hidden bg-stone-950`}>
            <img 
              src={value} 
              alt="Preview" 
              className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold flex items-center gap-1.5 shadow"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Ganti Foto</span>
              </button>

              <button
                type="button"
                onClick={() => setShowUrlInput(!showUrlInput)}
                className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-600 font-medium flex items-center gap-1.5"
              >
                <LinkIcon className="w-3.5 h-3.5" />
                <span>Ganti URL</span>
              </button>
            </div>
          </div>
        ) : (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`p-6 ${previewAspect} flex flex-col items-center justify-center text-center border-2 border-dashed border-stone-700 hover:border-amber-500 cursor-pointer transition-colors`}
          >
            <div className="w-10 h-10 rounded-xl bg-stone-800 text-stone-400 flex items-center justify-center mb-2">
              <ImageIcon className="w-5 h-5 text-amber-500" />
            </div>
            <p className="font-semibold text-white">Klik untuk Upload Foto</p>
            <p className="text-[11px] text-stone-400 mt-0.5">JPG, PNG, WEBP dari Laptop atau HP</p>
          </div>
        )}

        {/* Loading Spinner */}
        {isUploading && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center gap-2 text-white">
            <Loader2 className="w-6 h-6 animate-spin text-amber-400" />
            <span className="text-xs font-semibold">Mengompres & Mengunggah...</span>
          </div>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Action Buttons Below Box */}
      <div className="flex items-center justify-between text-[11px] text-stone-400">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Upload dari File / Galeri HP</span>
        </button>

        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-stone-400 hover:text-stone-200 underline"
        >
          {showUrlInput ? 'Tutup URL' : 'Atau Tempel Link URL'}
        </button>
      </div>

      {/* URL Input collapse */}
      {showUrlInput && (
        <div className="pt-1 animate-fade-in">
          <input
            type="text"
            placeholder="https://..."
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-white font-mono text-[11px] focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>
      )}
    </div>
  );
};
