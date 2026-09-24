import React from 'react';
import { useInvitation } from '../../context/InvitationContext';
import { Heart, User, Image } from 'lucide-react';
import { InstagramIcon } from '../common/SocialIcons';
import { ImageUploadInput } from '../common/ImageUploadInput';

export const CoupleEditor = () => {
  const { data, updateField } = useInvitation();
  const { groom, bride, coverImage, heroImage } = data.couple;

  return (
    <div className="space-y-8 text-stone-100">
      
      {/* Top Banner Photos */}
      <div className="p-6 rounded-2xl bg-stone-800 border border-stone-700 space-y-4">
        <h3 className="font-bold text-sm text-white flex items-center gap-2">
          <Image className="w-4 h-4 text-amber-500" />
          <span>Foto Sampul & Banner Utama</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
          <ImageUploadInput
            label="Foto Sampul Depan (Cover Splash)"
            value={coverImage}
            onChange={(val) => updateField('couple.coverImage', val)}
            previewAspect="aspect-[16/9]"
          />

          <ImageUploadInput
            label="Foto Banner Beranda (Hero Arch)"
            value={heroImage}
            onChange={(val) => updateField('couple.heroImage', val)}
            previewAspect="aspect-[16/9]"
          />
        </div>
      </div>


      {/* Groom & Bride Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Mempelai Pria */}
        <div className="p-6 rounded-2xl bg-stone-800 border border-stone-700 space-y-4 text-xs">
          <div className="flex items-center gap-2 pb-2 border-b border-stone-700">
            <User className="w-4 h-4 text-amber-500" />
            <h4 className="font-bold text-sm text-white">Profil Mempelai Pria</h4>
          </div>

          <div>
            <label className="block text-stone-300 mb-1 font-semibold uppercase tracking-wider">
              Nama Lengkap & Gelar
            </label>
            <input
              type="text"
              value={groom.fullName}
              onChange={(e) => updateField('couple.groom.fullName', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-stone-300 mb-1 font-semibold uppercase tracking-wider">
                Nama Panggilan
              </label>
              <input
                type="text"
                value={groom.nickName}
                onChange={(e) => updateField('couple.groom.nickName', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-stone-300 mb-1 font-semibold uppercase tracking-wider">
                Urutan Anak
              </label>
              <input
                type="text"
                placeholder="Contoh: Putra Pertama dari"
                value={groom.childOrder}
                onChange={(e) => updateField('couple.groom.childOrder', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-stone-300 mb-1 font-semibold uppercase tracking-wider">
                Nama Ayah
              </label>
              <input
                type="text"
                value={groom.fatherName}
                onChange={(e) => updateField('couple.groom.fatherName', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-stone-300 mb-1 font-semibold uppercase tracking-wider">
                Nama Ibu
              </label>
              <input
                type="text"
                value={groom.motherName}
                onChange={(e) => updateField('couple.groom.motherName', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>

          <ImageUploadInput
            label="Foto Profil Mempelai Pria"
            value={groom.photo}
            onChange={(val) => updateField('couple.groom.photo', val)}
            previewAspect="aspect-square"
            maxWidth={800}
          />


          <div>
            <label className="block text-stone-300 mb-1 font-semibold uppercase tracking-wider">
              Akun Instagram (Tanpa @)
            </label>
            <input
              type="text"
              value={groom.instagram}
              onChange={(e) => updateField('couple.groom.instagram', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-stone-300 mb-1 font-semibold uppercase tracking-wider">
              Deskripsi Singkat / Bio
            </label>
            <textarea
              rows={2}
              value={groom.bio}
              onChange={(e) => updateField('couple.groom.bio', e.target.value)}
              className="w-full p-2.5 rounded-xl bg-stone-900 border border-stone-700 text-white focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none"
            />
          </div>
        </div>

        {/* Mempelai Wanita */}
        <div className="p-6 rounded-2xl bg-stone-800 border border-stone-700 space-y-4 text-xs">
          <div className="flex items-center gap-2 pb-2 border-b border-stone-700">
            <Heart className="w-4 h-4 text-pink-500" />
            <h4 className="font-bold text-sm text-white">Profil Mempelai Wanita</h4>
          </div>

          <div>
            <label className="block text-stone-300 mb-1 font-semibold uppercase tracking-wider">
              Nama Lengkap & Gelar
            </label>
            <input
              type="text"
              value={bride.fullName}
              onChange={(e) => updateField('couple.bride.fullName', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-stone-300 mb-1 font-semibold uppercase tracking-wider">
                Nama Panggilan
              </label>
              <input
                type="text"
                value={bride.nickName}
                onChange={(e) => updateField('couple.bride.nickName', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-stone-300 mb-1 font-semibold uppercase tracking-wider">
                Urutan Anak
              </label>
              <input
                type="text"
                placeholder="Contoh: Putri Kedua dari"
                value={bride.childOrder}
                onChange={(e) => updateField('couple.bride.childOrder', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-stone-300 mb-1 font-semibold uppercase tracking-wider">
                Nama Ayah
              </label>
              <input
                type="text"
                value={bride.fatherName}
                onChange={(e) => updateField('couple.bride.fatherName', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-stone-300 mb-1 font-semibold uppercase tracking-wider">
                Nama Ibu
              </label>
              <input
                type="text"
                value={bride.motherName}
                onChange={(e) => updateField('couple.bride.motherName', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>

          <ImageUploadInput
            label="Foto Profil Mempelai Wanita"
            value={bride.photo}
            onChange={(val) => updateField('couple.bride.photo', val)}
            previewAspect="aspect-square"
            maxWidth={800}
          />


          <div>
            <label className="block text-stone-300 mb-1 font-semibold uppercase tracking-wider">
              Akun Instagram (Tanpa @)
            </label>
            <input
              type="text"
              value={bride.instagram}
              onChange={(e) => updateField('couple.bride.instagram', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-stone-300 mb-1 font-semibold uppercase tracking-wider">
              Deskripsi Singkat / Bio
            </label>
            <textarea
              rows={2}
              value={bride.bio}
              onChange={(e) => updateField('couple.bride.bio', e.target.value)}
              className="w-full p-2.5 rounded-xl bg-stone-900 border border-stone-700 text-white focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none"
            />
          </div>
        </div>

      </div>

    </div>
  );
};
