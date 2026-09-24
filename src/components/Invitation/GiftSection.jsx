import React, { useState } from 'react';
import { useInvitation } from '../../context/InvitationContext';
import { Gift, CreditCard, Copy, Check, MapPin } from 'lucide-react';
import { FloralBadge } from './Ornaments';

export const GiftSection = () => {
  const { data, currentTheme } = useInvitation();
  const gifts = data.gifts || {};
  const [copiedId, setCopiedId] = useState(null);

  if (!gifts.enabled) return null;

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <section id="gift" className="relative py-16 sm:py-24 px-4 overflow-hidden">
      <div className="max-w-xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <FloralBadge text="Tanda Kasih" color={data.meta.accentColor} />
          <h2 className="font-romantic text-4xl sm:text-5xl" style={{ color: data.meta.accentColor }}>
            {gifts.title || 'Titip Kado & Amplop Digital'}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
            {gifts.description}
          </p>
        </div>

        {/* Bank & E-Wallet Accounts */}
        <div className="space-y-4">
          {gifts.accounts?.map((acc) => (
            <div 
              key={acc.id}
              className={`p-6 rounded-3xl ${currentTheme.cardBg} flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm transition-all duration-300 hover:shadow-md`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-amber-700" />
                  <span className="font-bold text-stone-800 text-sm tracking-wide">
                    {acc.bankName}
                  </span>
                </div>
                <p className="font-mono text-lg font-bold text-stone-900 tracking-wider">
                  {acc.accountNumber}
                </p>
                <p className="text-xs text-stone-500 font-medium">
                  a.n. {acc.accountHolder}
                </p>
              </div>

              <button
                onClick={() => handleCopy(acc.accountNumber, acc.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider flex items-center justify-center gap-1.5 self-start sm:self-center transition-all ${
                  copiedId === acc.id 
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : currentTheme.secondaryBtn
                }`}
              >
                {copiedId === acc.id ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
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
          ))}
        </div>

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
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold tracking-wider flex items-center justify-center gap-1.5 transition-all ${
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

      </div>
    </section>
  );
};
