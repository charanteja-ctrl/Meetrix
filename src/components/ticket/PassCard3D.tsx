import React, { useState } from 'react';
import type { TicketBooking } from '../../types/event';
import { QrCode, Download, Wallet, Calendar } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PassCard3DProps {
  booking: TicketBooking;
}

export const PassCard3D: React.FC<PassCard3DProps> = ({ booking }) => {
  const [flipped, setFlipped] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleWalletAdd = (type: 'Apple' | 'Google') => {
    confetti({ particleCount: 50, spread: 60 });
    alert(`Pass added to your ${type} Wallet! Syncing offline pass metadata.`);
  };

  const handleExportPDF = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      alert(`PDF Ticket Pass for ${booking.eventTitle} downloaded!`);
    }, 1200);
  };

  return (
    <div className="max-w-md mx-auto perspective-1000">
      
      {/* 3D Flip Container */}
      <div 
        onClick={() => setFlipped(!flipped)}
        className={`relative w-full min-h-[460px] rounded-3xl p-6 glass-card border border-white/20 shadow-2xl cursor-pointer transition-transform duration-700 transform-style-3d ${
          flipped ? 'rotate-y-180' : ''
        }`}
      >
        
        {/* FRONT SIDE OF PASS */}
        <div className="flex flex-col justify-between h-full space-y-6">
          
          {/* Top Banner & Status */}
          <div>
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 bg-[#6c63ff]/20 text-[#00E5A8] border border-[#6c63ff]/40 text-[10px] font-mono font-bold rounded-full">
                EVENTSPHERE DIGITAL PASS
              </span>
              <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                VALID TICKET
              </span>
            </div>

            <h3 className="font-heading text-xl font-extrabold text-white mt-4 leading-snug">
              {booking.eventTitle}
            </h3>
            
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1 font-mono">
              <Calendar className="w-3.5 h-3.5 text-[#6c63ff]" />
              {booking.eventDate}
            </p>
          </div>

          {/* Ticket Details Box */}
          <div className="grid grid-cols-2 gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl text-xs font-mono">
            <div>
              <p className="text-[10px] text-slate-400">ATTENDEE</p>
              <p className="font-bold text-white truncate">{booking.attendeeName}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400">TIER PASS</p>
              <p className="font-bold text-[#00E5A8]">{booking.tierName}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400">ASSIGNED SEAT</p>
              <p className="font-bold text-amber-400">{booking.seatNumber || 'General Admission'}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400">BOOKING ID</p>
              <p className="font-bold text-slate-300">{booking.id}</p>
            </div>
          </div>

          {/* QR Code Section */}
          <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl shadow-inner">
            {/* Visual Encrypted QR Matrix Simulation */}
            <div className="w-36 h-36 bg-slate-950 p-3 rounded-xl flex flex-col justify-between">
              <div className="flex justify-between">
                <div className="w-8 h-8 border-2 border-white bg-white p-1">
                  <div className="w-full h-full bg-black"></div>
                </div>
                <div className="w-8 h-8 border-2 border-white bg-white p-1">
                  <div className="w-full h-full bg-black"></div>
                </div>
              </div>
              <div className="text-center font-mono text-[9px] text-emerald-400 tracking-tighter overflow-hidden">
                {booking.qrCodeValue}
              </div>
              <div className="flex justify-between items-end">
                <div className="w-8 h-8 border-2 border-white bg-white p-1">
                  <div className="w-full h-full bg-black"></div>
                </div>
                <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping"></div>
              </div>
            </div>
            <span className="text-[10px] text-slate-600 font-mono mt-2 flex items-center gap-1">
              <QrCode className="w-3 h-3 text-[#6c63ff]" /> Tap pass to flip for Wallet details
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 pt-2" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => handleWalletAdd('Apple')}
              className="flex-1 py-2 bg-white/10 hover:bg-white/20 border border-white/15 text-white rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
            >
              <Wallet className="w-3.5 h-3.5 text-cyan-400" />
              <span>Apple Wallet</span>
            </button>
            
            <button
              onClick={handleExportPDF}
              className="px-4 py-2 bg-[#6c63ff] hover:bg-[#584ee4] text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{downloading ? 'Exporting...' : 'PDF'}</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
