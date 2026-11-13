import React, { useState } from 'react';
import { useInvitation } from '../../context/InvitationContext';
import { Gift, CreditCard, Copy, Check, MapPin, QrCode, ExternalLink, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { FloralBadge } from './Ornaments';
import { FadeIn, ZoomIn } from '../common/MotionWrapper';
import { motion, AnimatePresence } from 'framer-motion';

export const GiftSection = () => {
  const { data, currentTheme } = useInvitation();
  const gifts = data.gifts || {};
  const [copiedId, setCopiedId] = useState(null);
  const [isOpenGifts, setIsOpenGifts] = useState(false);

  if (!gifts.enabled) return null;

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const getBankStyle = (bankName = '') => {
    const name = bankName.toUpperCase();
    if (name.includes('BCA')) {
      return {
        brand: 'BCA',
        bg: 'from-[#f8f9fa] via-[#e9ecef] to-[#dee2e6]',
        textColor: 'text-blue-900',
        chip: 'from-amber-300 via-yellow-400 to-amber-600',
        logoBg: 'text-blue-800 font-extrabold font-sans'
      };
    }
    if (name.includes('BRI')) {
      return {
        brand: 'BRI',
        bg: 'from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0]',
        textColor: 'text-blue-950',
        chip: 'from-amber-300 via-yellow-400 to-amber-600',
        logoBg: 'text-blue-700 font-black tracking-tight'
      };
    }
    if (name.includes('MANDIRI')) {
      return {
        brand: 'MANDIRI',
        bg: 'from-[#fefefe] via-[#f8fafc] to-[#eef2f6]',
        textColor: 'text-blue-950',
        chip: 'from-amber-300 via-yellow-400 to-amber-600',
        logoBg: 'text-yellow-600 font-extrabold'
      };
    }
    if (name.includes('DANA')) {
      return {
        brand: 'DANA',
        bg: 'from-[#f0f9ff] via-[#e0f2fe] to-[#bae6fd]',
        textColor: 'text-sky-950',
        chip: 'from-amber-300 via-yellow-400 to-amber-600',
        logoBg: 'text-sky-600 font-bold'
      };
    }
    return {
      brand: bankName,
      bg: 'from-[#ffffff] via-[#fcfbf9] to-[#f4efe8]',
      textColor: 'text-stone-900',
      chip: 'from-amber-300 via-yellow-400 to-amber-600',
      logoBg: 'text-stone-800 font-bold'
    };
  };

  return (
    <section id="gift" className="relative py-16 sm:py-24 px-4 overflow-hidden">
      <div className="max-w-xl mx-auto space-y-8 text-center">
        
        {/* Header */}
        <FadeIn direction="up">
          <div className="space-y-3">
            <FloralBadge text="Tanda Kasih" color={data.meta.accentColor} />
            <h2 className="font-romantic text-4xl sm:text-5xl" style={{ color: data.meta.accentColor }}>
              {gifts.title || 'Amplop Digital'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
              {gifts.description || 'Doa restu Anda merupakan karunia yang sangat berarti bagi kami, dan jika memberi adalah ungkapan tanda kasih, Anda dapat memberi kado secara cashless.'}
            </p>
          </div>
        </FadeIn>

        {/* Trigger Button: [ 🎁 Kirim Hadiah ] */}
        <FadeIn direction="up" delay={0.15}>
          <div className="pt-2">
            <button
              onClick={() => setIsOpenGifts(!isOpenGifts)}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide text-white bg-[#8C533C] hover:bg-[#72412E] shadow-xl hover:shadow-2xl transition-all duration-300 transform active:scale-95 cursor-pointer"
            >
              <Gift className="w-4 h-4 text-amber-200 animate-bounce" />
              <span>{isOpenGifts ? 'Tutup Pilihan Rekening' : 'Kirim Hadiah (Amplop Digital)'}</span>
              {isOpenGifts ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </FadeIn>

        {/* Expandable ATM Cards & QRIS Section */}
        <AnimatePresence>
          {isOpenGifts && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden space-y-6 pt-4 text-left"
            >
              
              {/* ATM / Debit Cards */}
              <div className="space-y-5">
                {(gifts.accounts || []).map((acc, index) => {
                  const style = getBankStyle(acc.bankName);
                  return (
                    <motion.div
                      key={acc.id || index}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className={`relative rounded-3xl p-6 sm:p-7 shadow-xl border border-stone-200/80 bg-gradient-to-br ${style.bg} overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-0.5`}
                    >
                      {/* Subtle Decorative Card Watermark Waves */}
                      <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-stone-900/[0.03] pointer-events-none" />
                      <div className="absolute right-8 -top-8 w-32 h-32 rounded-full bg-stone-900/[0.03] pointer-events-none" />

                      {/* Card Top Row: EMV Chip & Bank Name */}
                      <div className="flex items-center justify-between mb-6">
                        {/* Realistic Gold EMV Chip */}
                        <div className="w-12 h-9 rounded-lg bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 border border-amber-300 shadow-sm flex items-center justify-center relative overflow-hidden">
                          <div className="w-8 h-[1px] bg-amber-700/40 absolute" />
                          <div className="h-6 w-[1px] bg-amber-700/40 absolute" />
                          <div className="w-5 h-4 border border-amber-700/40 rounded-sm" />
                        </div>

                        {/* Bank Name / Logo */}
                        <div className={`text-base sm:text-lg font-black tracking-wider ${style.logoBg}`}>
                          {acc.bankName}
                        </div>
                      </div>

                      {/* Card Middle: Account Number */}
                      <div className="space-y-1 mb-5">
                        <p className="text-[10px] uppercase font-bold tracking-widest text-stone-500">
                          Nomor Rekening / No. HP
                        </p>
                        <p className="font-mono text-xl sm:text-2xl font-bold tracking-[0.14em] text-stone-900 select-all drop-shadow-sm">
                          {acc.accountNumber}
                        </p>
                      </div>

                      {/* Card Bottom Row: Account Holder & Copy Button */}
                      <div className="flex items-end justify-between gap-3 pt-2 border-t border-stone-300/40">
                        <div>
                          <p className="text-[9px] uppercase font-bold tracking-widest text-stone-400">
                            Nama Pemilik
                          </p>
                          <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-stone-800">
                            {acc.accountHolder}
                          </p>
                        </div>

                        <button
                          onClick={() => handleCopy(acc.accountNumber, acc.id)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wider flex items-center gap-1.5 shadow-sm transition-all cursor-pointer ${
                            copiedId === acc.id
                              ? 'bg-emerald-600 text-white'
                              : 'bg-white hover:bg-stone-900 hover:text-white text-stone-800 border border-stone-300'
                          }`}
                        >
                          {copiedId === acc.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-white" />
                              <span>Tersalin!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Salin No. Rekening</span>
                            </>
                          )}
                        </button>
                      </div>

                    </motion.div>
                  );
                })}
              </div>

              {/* QRIS Amplop Digital */}
              {gifts.qris?.enabled !== false && gifts.qris?.image && (
                <div className={`p-6 sm:p-8 rounded-3xl ${currentTheme.cardBg} text-center space-y-4 shadow-md`}>
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-100 text-rose-800 border border-rose-200">
                      <QrCode className="w-3.5 h-3.5 text-rose-600" />
                      <span>{gifts.qris.title || 'QRIS Amplop Digital'}</span>
                    </div>
                    {gifts.qris.holderName && (
                      <h4 className="font-bold text-sm text-stone-800 pt-1">
                        a.n. {gifts.qris.holderName}
                      </h4>
                    )}
                  </div>

                  <div className="p-3 bg-white rounded-2xl shadow-inner border border-stone-200 inline-block mx-auto max-w-[220px]">
                    <img
                      src={gifts.qris.image}
                      alt="QRIS Pembayaran"
                      className="w-full h-auto object-contain rounded-xl cursor-pointer hover:scale-[1.02] transition-transform"
                      onClick={() => window.open(gifts.qris.image, '_blank')}
                      title="Klik untuk memperbesar gambar QRIS"
                    />
                  </div>

                  {gifts.qris.notes && (
                    <p className="text-xs text-stone-500 max-w-sm mx-auto leading-relaxed">
                      {gifts.qris.notes}
                    </p>
                  )}
                </div>
              )}

              {/* Physical Gift Delivery Address */}
              {gifts.physicalGift?.address && (
                <div className={`p-6 sm:p-8 rounded-3xl ${currentTheme.cardBg} space-y-4 shadow-sm`}>
                  <div className="flex items-center gap-2.5">
                    <Gift className="w-5 h-5 text-amber-700" />
                    <h3 className="font-serif-heading text-lg font-bold text-stone-800">
                      Kirim Kado Fisik
                    </h3>
                  </div>

                  <div className="space-y-2 text-stone-700 text-xs sm:text-sm">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-stone-900">
                          Penerima: {gifts.physicalGift.recipientName} ({gifts.physicalGift.phone})
                        </p>
                        <p className="text-stone-600 leading-relaxed mt-1">
                          {gifts.physicalGift.address}
                        </p>
                        {gifts.physicalGift.notes && (
                          <p className="text-stone-400 italic text-[11px] mt-1">
                            *{gifts.physicalGift.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopy(gifts.physicalGift.address, 'address')}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      copiedId === 'address' 
                        ? 'bg-emerald-600 text-white' 
                        : currentTheme.secondaryBtn
                    }`}
                  >
                    {copiedId === 'address' ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Alamat Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin Alamat Lengkap</span>
                      </>
                    )}
                  </button>
                </div>
              )}

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
