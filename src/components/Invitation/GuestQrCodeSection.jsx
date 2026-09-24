import React from 'react';
import { useInvitation } from '../../context/InvitationContext';
import { QRCodeSVG } from 'qrcode.react';
import { QrCode, Sparkles, CheckCircle } from 'lucide-react';
import { FloralBadge } from './Ornaments';

export const GuestQrCodeSection = () => {
  const { data, currentTheme, guestName } = useInvitation();

  // Jika dinonaktifkan oleh admin di panel pengelola, jangan tampilkan bagian ini
  if (data.meta?.qrCheckInEnabled === false) return null;

  const qrPayload = JSON.stringify({
    event: `${data.couple.groom.nickName} & ${data.couple.bride.nickName} Wedding`,
    guest: guestName,
    date: data.events.akad.date,
    id: `guest-${encodeURIComponent(guestName)}`
  });


  return (
    <section className="relative py-12 px-4 overflow-hidden">
      <div className="max-w-xl mx-auto space-y-6">
        
        <div className={`p-6 sm:p-8 rounded-3xl ${currentTheme.cardBg} text-center space-y-4 shadow-md`}>
          <FloralBadge text="Check-In Tamu" color={data.meta.accentColor} />
          
          <h3 className="font-serif-heading text-xl sm:text-2xl font-bold text-stone-800">
            QR Code Kehadiran Tamu
          </h3>
          
          <p className="text-xs text-stone-600 max-w-sm mx-auto leading-relaxed">
            Tunjukkan kode QR ini kepada penerima tamu di meja resepsi untuk verifikasi kehadiran Anda:
          </p>

          <div className="p-4 bg-white rounded-2xl shadow-inner border border-stone-200 inline-block mx-auto">
            <QRCodeSVG 
              value={qrPayload}
              size={160}
              level="H"
              includeMargin={true}
              fgColor="#292524"
            />
          </div>

          <div className="space-y-1">
            <p className="font-bold text-sm text-stone-800">{guestName}</p>
            <p className="text-[11px] text-stone-500 font-mono tracking-wide">
              ID: {encodeURIComponent(guestName).slice(0, 16)}
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Siap Digunakan di Meja Resepsi</span>
          </div>
        </div>

      </div>
    </section>
  );
};
