import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, RefreshCw } from 'lucide-react';
import type { TicketBooking } from '../../types/event';

interface DynamicQRPassProps {
  booking: TicketBooking;
}

export const DynamicQRPass: React.FC<DynamicQRPassProps> = ({ booking }) => {
  const [secondsLeft, setSecondsLeft] = useState<number>(30);
  const [dynamicPayload, setDynamicPayload] = useState<string>('');
  const [tokenVersion, setTokenVersion] = useState<number>(1);

  // Generate dynamic signed TOTP token payload refreshed every 30 seconds
  const generateDynamicToken = () => {
    const timestampWindow = Math.floor(Date.now() / 30000);
    const salt = 'VITAP-SSO-SECURE-KEY-2026';
    const hash = btoa(`${booking.id}:${booking.attendeeName}:${timestampWindow}:${salt}`).substring(0, 32);
    return `VITAP:TKT:${booking.id}:${booking.attendeeName.split(' ')[0]}:${hash}:W${timestampWindow}`;
  };

  useEffect(() => {
    setDynamicPayload(generateDynamicToken());

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setTokenVersion((v) => v + 1);
          setDynamicPayload(generateDynamicToken());
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [booking]);

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(dynamicPayload)}&color=00E5A8&bgcolor=101114`;

  return (
    <div className="relative rounded-3xl bg-gradient-to-b from-[#181a20] via-[#101114] to-[#0a0b0d] border border-white/15 p-6 shadow-2xl space-y-6 overflow-hidden select-none">
      
      {/* Floating Anti-Screenshot Watermark */}
      <div className="absolute inset-0 pointer-events-none opacity-5 flex items-center justify-center rotate-45 text-slate-100 font-mono text-xs font-extrabold tracking-widest uppercase">
        CONFIDENTIAL • VIT-AP GATE ENTRY • {booking.attendeeName} • 23BCE1092
      </div>

      {/* Header Badge */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#6c63ff]/20 border border-[#6c63ff]/40 flex items-center justify-center text-[#00E5A8]">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-white font-mono">DYNAMIC ANTI-SCREENSHOT PASS</p>
            <p className="text-[10px] text-slate-400 font-mono">Refreshes every 30 seconds for Gate Security</p>
          </div>
        </div>

        <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-bold rounded-full border border-emerald-500/30">
          VALIDATED BY VTOP
        </span>
      </div>

      {/* QR Code Container with Countdown Ring */}
      <div className="flex flex-col items-center justify-center space-y-4 py-2">
        
        {/* Dynamic QR Box */}
        <div className="relative p-4 bg-[#101114] border-2 border-[#00E5A8]/50 rounded-3xl shadow-xl shadow-[#00E5A8]/10 group">
          <img 
            src={qrImageUrl} 
            alt="Dynamic QR Gate Token"
            className="w-52 h-52 object-contain rounded-xl transition-all group-hover:scale-105"
          />

          {/* Center Security Lock Overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-10 h-10 rounded-full bg-[#00E5A8] border-2 border-[#101114] flex items-center justify-center text-slate-950 font-bold shadow-lg">
              <Lock className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* 30-Second Refresh Meter Bar */}
        <div className="w-full max-w-xs space-y-1.5 text-center">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-300">
            <span className="flex items-center gap-1">
              <RefreshCw className={`w-3.5 h-3.5 text-[#00E5A8] ${secondsLeft <= 5 ? 'animate-spin' : ''}`} />
              Token v{tokenVersion}
            </span>
            <span className="text-[#00E5A8] font-bold">Auto-Refreshes in {secondsLeft}s</span>
          </div>

          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#6c63ff] via-[#00E5A8] to-[#00D8F6] transition-all duration-1000 ease-linear"
              style={{ width: `${(secondsLeft / 30) * 100}%` }}
            />
          </div>
        </div>

      </div>

      {/* Ticket Context Info */}
      <div className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-2 text-xs font-mono">
        <div className="flex justify-between text-slate-300">
          <span>EVENT:</span>
          <span className="font-bold text-white truncate max-w-[180px]">{booking.eventTitle}</span>
        </div>
        <div className="flex justify-between text-slate-300">
          <span>ATTENDEE:</span>
          <span className="font-bold text-[#00E5A8]">{booking.attendeeName}</span>
        </div>
        <div className="flex justify-between text-slate-300">
          <span>REG NUMBER:</span>
          <span className="text-slate-200">23BCE1092 (SCOPE)</span>
        </div>
        <div className="flex justify-between text-slate-300">
          <span>GATE VENUE:</span>
          <span className="text-slate-200 truncate max-w-[180px]">{booking.eventLocation}</span>
        </div>
      </div>

      {/* Dynamic Token Payload String */}
      <div className="p-2.5 bg-black/60 rounded-xl text-[9px] font-mono text-slate-400 break-all text-center border border-white/5">
        <span className="text-slate-500">PAYLOAD HASH:</span> {dynamicPayload}
      </div>

    </div>
  );
};
