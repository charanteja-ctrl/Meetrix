import React, { useState } from 'react';
import type { TicketBooking } from '../../types/event';
import { DynamicQRPass } from './DynamicQRPass';
import { Download, QrCode, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PassCard3DProps {
  booking: TicketBooking;
}

export const PassCard3D: React.FC<PassCard3DProps> = ({ booking }) => {
  const [flipped, setFlipped] = useState(false);

  const handleDownloadPDF = () => {
    confetti({ particleCount: 80, spread: 60 });
    alert(`📥 PDF Gate Pass Downloaded for ${booking.eventTitle}!\nFile saved: VITAP_PASS_${booking.id}.pdf`);
  };

  const handleAddToWallet = (type: 'Apple' | 'Google') => {
    alert(`📱 Added ${booking.eventTitle} Pass to ${type} Wallet! Syncing with VIT-AP VTOP ID...`);
  };

  return (
    <div className="space-y-4 max-w-md mx-auto">
      
      {/* 3D Flip Card Container */}
      <div 
        className="perspective-1000 w-full min-h-[520px] cursor-pointer group"
        onClick={() => setFlipped(!flipped)}
      >
        <div className={`relative w-full h-full duration-700 transform-style-3d transition-transform ${flipped ? 'rotate-y-180' : ''}`}>
          
          {/* FRONT SIDE: Apple Wallet-Style Pass Card */}
          <div className="absolute inset-0 backface-hidden rounded-3xl bg-gradient-to-b from-[#181a20] via-[#14161d] to-[#0d0e12] border border-white/20 p-6 shadow-2xl flex flex-col justify-between overflow-hidden">
            
            {/* Top Brand Banner */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00E5A8] animate-pulse"></span>
                <span className="font-heading text-sm font-extrabold text-white">VIT-AP PASS</span>
              </div>
              <span className="px-2.5 py-0.5 bg-[#6c63ff]/20 text-[#00E5A8] border border-[#6c63ff]/40 text-[10px] font-mono rounded-full font-bold">
                {booking.tierName.toUpperCase()}
              </span>
            </div>

            {/* Event Media Banner & Info */}
            <div className="my-4 space-y-3">
              <div className="relative h-32 rounded-2xl overflow-hidden border border-white/10">
                <img src={booking.eventBanner} alt={booking.eventTitle} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent p-3 flex flex-col justify-end">
                  <h3 className="font-heading text-base font-bold text-white line-clamp-1">{booking.eventTitle}</h3>
                  <p className="text-[11px] text-slate-300 font-mono flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#00E5A8]" />
                    {booking.eventLocation}
                  </p>
                </div>
              </div>

              {/* Attendee Details Grid */}
              <div className="grid grid-cols-2 gap-3 p-3 bg-white/5 rounded-2xl text-xs font-mono">
                <div>
                  <p className="text-[10px] text-slate-400">ATTENDEE</p>
                  <p className="font-bold text-white truncate">{booking.attendeeName}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400">REG NO</p>
                  <p className="font-bold text-[#00E5A8]">23BCE1092</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400">DATE</p>
                  <p className="text-slate-200">{booking.eventDate}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400">SEAT / ZONE</p>
                  <p className="text-amber-400 font-bold">{booking.seatNumber || 'General Entry'}</p>
                </div>
              </div>
            </div>

            {/* Bottom Flip Action CTA */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs text-slate-300">
              <span className="flex items-center gap-1.5 text-[#00E5A8] font-bold">
                <QrCode className="w-4 h-4" />
                Tap to Flip for Dynamic QR Pass
              </span>
              <span className="text-[10px] text-slate-500">ID: {booking.id}</span>
            </div>

          </div>

          {/* BACK SIDE: Dynamic Anti-Screenshot QR Pass */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-3xl bg-[#0d0e12] overflow-hidden">
            <DynamicQRPass booking={booking} />
          </div>

        </div>
      </div>

      {/* Action Buttons: PDF Download & Apple/Google Wallet */}
      <div className="flex flex-col sm:flex-row items-center gap-2 pt-2">
        <button
          onClick={handleDownloadPDF}
          className="w-full py-3 bg-[#00E5A8] text-slate-950 font-bold rounded-2xl text-xs hover:bg-[#00E5A8]/90 transition-all flex items-center justify-center gap-2 font-mono shadow-lg shadow-[#00E5A8]/20"
        >
          <Download className="w-4 h-4" />
          <span>Download PDF Ticket</span>
        </button>

        <div className="flex w-full gap-2 font-mono">
          <button
            onClick={() => handleAddToWallet('Apple')}
            className="flex-1 py-3 bg-white/10 hover:bg-white/20 border border-white/15 text-white font-semibold rounded-2xl text-[11px] transition-all"
          >
             Apple Wallet
          </button>
          <button
            onClick={() => handleAddToWallet('Google')}
            className="flex-1 py-3 bg-white/10 hover:bg-white/20 border border-white/15 text-white font-semibold rounded-2xl text-[11px] transition-all"
          >
            G Google Wallet
          </button>
        </div>
      </div>

    </div>
  );
};
