import React, { useState } from 'react';
import { QrCode, CheckCircle2, AlertTriangle, RefreshCw, Camera, History } from 'lucide-react';

export const QRScannerModal: React.FC = () => {
  const [scanResult, setScanResult] = useState<{ status: 'valid' | 'duplicate' | 'invalid'; ticketId?: string; name?: string } | null>(null);
  const [scanning, setScanning] = useState(false);
  const [scanLogs, setScanLogs] = useState<{ time: string; code: string; status: string }[]>([
    { time: '10:14:22 AM', code: 'EVENTSPHERE-TKT-8819', status: 'VALID (VIP)' },
    { time: '10:12:05 AM', code: 'EVENTSPHERE-TKT-3341', status: 'VALID (STD)' }
  ]);

  const simulateScan = () => {
    setScanning(true);
    setScanResult(null);

    setTimeout(() => {
      setScanning(false);
      const isSuccess = Math.random() > 0.15;
      if (isSuccess) {
        const result = {
          status: 'valid' as const,
          ticketId: 'TKT-8819',
          name: 'Alex Rivera (VIP Arena - Seat A4)'
        };
        setScanResult(result);
        setScanLogs(prev => [{ time: new Date().toLocaleTimeString(), code: 'EVENTSPHERE-TKT-8819', status: 'VALID (VIP)' }, ...prev]);
      } else {
        setScanResult({ status: 'duplicate' });
      }
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto bg-[#14161d] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h3 className="font-heading text-xl font-bold text-white flex items-center gap-2">
            <span>Volunteer & Staff Attendance Kiosk</span>
            <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              OFFLINE SYNC ACTIVE
            </span>
          </h3>
          <p className="text-xs text-slate-400">Instant QR ticket validation, duplicate entry detection & live check-in logs.</p>
        </div>
      </div>

      {/* Camera Scanner Viewport Simulator */}
      <div className="relative h-64 sm:h-72 bg-slate-950 border-2 border-dashed border-[#6c63ff]/50 rounded-2xl overflow-hidden flex flex-col items-center justify-center p-6 text-center group">
        
        {/* Animated Scan Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00E5A8] to-transparent animate-bounce shadow-lg shadow-[#00E5A8]/50" />

        <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <Camera className="w-10 h-10 text-[#00E5A8] animate-pulse" />
        </div>

        <p className="text-xs font-mono text-white font-semibold">Position QR Pass in Camera Frame</p>
        <p className="text-[11px] text-slate-400 max-w-xs mt-1">Supports physical printed tickets, Apple Wallet passes & smartphone screens.</p>

        <div className="flex items-center gap-3 mt-4">
          <button
            onClick={simulateScan}
            disabled={scanning}
            className="px-6 py-2.5 bg-gradient-to-r from-[#6c63ff] to-[#584ee4] text-white font-bold rounded-xl text-xs hover:shadow-lg hover:shadow-[#6c63ff]/30 transition-all flex items-center gap-2"
          >
            {scanning ? <RefreshCw className="w-4 h-4 animate-spin" /> : <QrCode className="w-4 h-4 text-[#00E5A8]" />}
            <span>{scanning ? 'Validating Pass...' : 'Simulate Camera Scan'}</span>
          </button>
        </div>

      </div>

      {/* Result Status Banner */}
      {scanResult && (
        <div className={`p-4 rounded-2xl border flex items-center gap-4 animate-in fade-in ${
          scanResult.status === 'valid'
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
            : 'bg-[#FF5A76]/10 border-[#FF5A76]/30 text-[#FF5A76]'
        }`}>
          {scanResult.status === 'valid' ? (
            <>
              <CheckCircle2 className="w-8 h-8 shrink-0" />
              <div>
                <p className="text-sm font-bold text-white">ACCESS GRANTED! Valid Pass Detected</p>
                <p className="text-xs font-mono">{scanResult.name} • Status: Entry Recorded</p>
              </div>
            </>
          ) : (
            <>
              <AlertTriangle className="w-8 h-8 shrink-0" />
              <div>
                <p className="text-sm font-bold text-white">DUPLICATE ENTRY / INVALID PASS</p>
                <p className="text-xs font-mono">This QR code was already scanned 4 minutes ago!</p>
              </div>
            </>
          )}
        </div>
      )}

      {/* Live Check-in Log Table */}
      <div className="space-y-3 pt-2">
        <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <History className="w-4 h-4 text-[#6c63ff]" />
          Realtime Attendance Log Stream
        </h4>

        <div className="p-3 bg-[#0d0e12] border border-white/10 rounded-2xl space-y-2">
          {scanLogs.map((log, idx) => (
            <div key={idx} className="flex items-center justify-between text-xs font-mono py-1.5 px-3 bg-white/5 rounded-xl">
              <span className="text-slate-400">{log.time}</span>
              <span className="text-white font-bold">{log.code}</span>
              <span className="text-[#00E5A8] font-bold">{log.status}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
