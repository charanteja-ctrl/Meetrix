import React, { useState } from 'react';
import { QrCode, CheckCircle2, AlertTriangle, X, Camera, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const QRScannerModal: React.FC = () => {
  const { scannerModalOpen, setScannerModalOpen, bookings, updateBookingStatus } = useApp();
  const [manualCode, setManualCode] = useState('');
  const [scanResult, setScanResult] = useState<{
    status: 'success' | 'duplicate' | 'invalid' | 'idle';
    message: string;
    attendeeName?: string;
    regNo?: string;
    timestamp?: string;
  }>({ status: 'idle', message: 'Point camera at student dynamic QR pass or enter Reg No manually.' });

  const [totalScanned, setTotalScanned] = useState<number>(142);
  const [duplicatesBlocked, setDuplicatesBlocked] = useState<number>(3);
  const [scannedRegNos, setScannedRegNos] = useState<Set<string>>(new Set(['23BCE0001', '23BCE0002']));

  // Audio chimes simulation
  const playSound = (type: 'success' | 'error') => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'success') {
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
        osc.frequency.setValueAtTime(880, ctx.currentTime + 0.1); // A5
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      } else {
        osc.frequency.setValueAtTime(220, ctx.currentTime); // A3
        osc.frequency.setValueAtTime(146.83, ctx.currentTime + 0.15); // D3
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      }
    } catch (e) {
      console.log('Audio Context unsupported');
    }
  };

  const processScanPayload = (rawPayload: string) => {
    const time = new Date().toLocaleTimeString();

    // Check if code has already been scanned (Duplicate scan prevention)
    if (scannedRegNos.has(rawPayload) || rawPayload.includes('ALREADY-SCANNED')) {
      playSound('error');
      setDuplicatesBlocked(prev => prev + 1);
      setScanResult({
        status: 'duplicate',
        message: '⚠️ DUPLICATE ENTRY BLOCKED! Pass has already been checked in.',
        attendeeName: 'Alex Rivera',
        regNo: '23BCE1092',
        timestamp: time
      });
      return;
    }

    // Success Check-in
    playSound('success');
    setScannedRegNos(prev => new Set(prev).add(rawPayload));
    setTotalScanned(prev => prev + 1);
    
    // Find matching booking if available
    const matchingBooking = bookings[0];
    if (matchingBooking) {
      updateBookingStatus(matchingBooking.id, 'checked-in');
    }

    setScanResult({
      status: 'success',
      message: '✅ VERIFIED ENTRY GRANTED! Gate gate pass authenticated via SSO.',
      attendeeName: matchingBooking?.attendeeName || 'Alex Rivera',
      regNo: '23BCE1092',
      timestamp: time
    });
  };

  const handleSimulateScanSuccess = () => {
    processScanPayload(`VITAP:TKT:tkt-${Date.now()}:Alex:23BCE1092`);
  };

  const handleSimulateScanDuplicate = () => {
    processScanPayload('ALREADY-SCANNED');
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualCode.trim()) return;
    processScanPayload(manualCode.trim());
    setManualCode('');
  };

  if (!scannerModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-[#14161d] border border-white/15 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#6c63ff] to-[#00E5A8] p-[1px]">
              <div className="w-full h-full bg-[#101114] rounded-[11px] flex items-center justify-center text-[#00E5A8]">
                <QrCode className="w-4 h-4" />
              </div>
            </div>
            <div>
              <h3 className="font-heading text-sm font-bold text-white">VIT-AP Gate Scanner Kiosk</h3>
              <p className="text-[10px] text-slate-400 font-mono">Volunteer Access Control • Sub-Second Validation</p>
            </div>
          </div>

          <button 
            onClick={() => setScannerModalOpen(false)}
            className="p-1.5 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Gate Tally Metrics */}
        <div className="grid grid-cols-2 gap-3 p-4 bg-white/5 border-b border-white/10 text-xs font-mono text-center">
          <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
            <p className="text-[10px] text-emerald-400">TOTAL CHECKED-IN</p>
            <p className="font-heading text-lg font-extrabold text-white mt-0.5">{totalScanned}</p>
          </div>
          <div className="p-2.5 bg-rose-500/10 border border-rose-500/30 rounded-xl">
            <p className="text-[10px] text-rose-400">DUPLICATES BLOCKED</p>
            <p className="font-heading text-lg font-extrabold text-white mt-0.5">{duplicatesBlocked}</p>
          </div>
        </div>

        {/* Camera Viewfinder Simulation */}
        <div className="p-6 space-y-6">
          
          <div className="relative h-64 rounded-2xl bg-slate-950 border-2 border-dashed border-[#6c63ff]/60 overflow-hidden flex flex-col items-center justify-center p-4 text-center group">
            
            {/* Viewfinder Target Laser Line */}
            <div className="absolute inset-x-6 top-1/2 h-0.5 bg-[#00E5A8] shadow-[0_0_15px_#00E5A8] animate-pulse"></div>

            <Camera className="w-10 h-10 text-slate-600 mb-2 group-hover:text-[#00E5A8] transition-colors" />
            <p className="text-xs text-slate-300 font-mono">Camera Feed Active (Live 60 FPS)</p>
            <p className="text-[10px] text-slate-500 font-mono mt-1">Scanning 30-Second Rolling TOTP Payload...</p>

            {/* Quick Demo Trigger Buttons */}
            <div className="absolute bottom-3 flex gap-2">
              <button
                onClick={handleSimulateScanSuccess}
                className="px-3 py-1.5 bg-[#00E5A8] text-slate-950 font-bold text-[10px] rounded-xl font-mono hover:scale-105 transition-transform"
              >
                ⚡ Scan Valid Pass
              </button>
              <button
                onClick={handleSimulateScanDuplicate}
                className="px-3 py-1.5 bg-rose-500 text-white font-bold text-[10px] rounded-xl font-mono hover:scale-105 transition-transform"
              >
                ⚠️ Scan Duplicate
              </button>
            </div>

          </div>

          {/* Scan Result Feedback Banner */}
          <div className={`p-4 rounded-2xl border font-mono text-xs transition-all ${
            scanResult.status === 'success' 
              ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
              : scanResult.status === 'duplicate'
              ? 'bg-rose-500/10 border-rose-500/40 text-rose-300'
              : 'bg-white/5 border-white/10 text-slate-300'
          }`}>
            <div className="flex items-start gap-3">
              {scanResult.status === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />}
              {scanResult.status === 'duplicate' && <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />}
              {scanResult.status === 'idle' && <ShieldCheck className="w-5 h-5 text-[#6c63ff] shrink-0 mt-0.5" />}

              <div className="space-y-1">
                <p className="font-bold">{scanResult.message}</p>
                {scanResult.attendeeName && (
                  <p className="text-[11px] text-white">
                    Student: <span className="font-bold text-[#00E5A8]">{scanResult.attendeeName}</span> ({scanResult.regNo}) • Scanned at {scanResult.timestamp}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Manual Registration Number Fallback Search */}
          <form onSubmit={handleManualSubmit} className="space-y-2">
            <label className="text-[11px] font-mono text-slate-400">Manual Student Reg No Lookup:</label>
            <div className="flex gap-2 font-mono">
              <input
                type="text"
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value)}
                placeholder="e.g. 23BCE1092"
                className="flex-1 px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white uppercase focus:outline-none focus:border-[#6c63ff]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#6c63ff] text-white font-bold rounded-xl text-xs hover:bg-[#584ee4] transition-colors"
              >
                Check In
              </button>
            </div>
          </form>

        </div>

      </div>
    </div>
  );
};
