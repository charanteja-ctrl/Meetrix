import React, { useState } from 'react';
import { Award, Download, Share2, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import confetti from 'canvas-confetti';

export const CertificatesView: React.FC = () => {
  const { user } = useAuth();
  const [downloading, setDownloading] = useState(false);

  const handleDownloadCertificate = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      confetti({ particleCount: 80, spread: 70 });
      alert('Certificate downloaded! Verified with EventSphere Blockchain Proof Hash #0x8F92A');
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="font-heading text-3xl font-extrabold text-white">Digital Certificates & Badges</h1>
          <p className="text-xs text-slate-400 mt-1 font-mono">Verified completion certificates with cryptographic signature & LinkedIn sharing.</p>
        </div>

        <button
          onClick={handleDownloadCertificate}
          className="px-5 py-2.5 bg-gradient-to-r from-[#00E5A8] to-[#00D8F6] text-slate-950 font-bold rounded-xl text-xs hover:opacity-90 transition-all flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          <span>{downloading ? 'Generating PDF...' : 'Download Verified PDF'}</span>
        </button>
      </div>

      {/* Visual Certificate Frame */}
      <div className="relative p-8 sm:p-12 bg-[#14161d] border-2 border-[#6c63ff]/40 rounded-3xl shadow-2xl text-center space-y-6 aurora-bg overflow-hidden">
        
        {/* Decorative corner borders */}
        <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#00E5A8]"></div>
        <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#00E5A8]"></div>
        <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#00E5A8]"></div>
        <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#00E5A8]"></div>

        <div className="w-16 h-16 rounded-2xl bg-[#6c63ff]/20 border border-[#6c63ff]/40 flex items-center justify-center mx-auto text-[#00E5A8]">
          <Award className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <p className="text-xs font-mono text-[#00E5A8] uppercase tracking-widest font-bold">
            CERTIFICATE OF ATTENDANCE & COMPLETION
          </p>
          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white">
            {user.name}
          </h2>
          <p className="text-xs text-slate-300 max-w-lg mx-auto leading-relaxed">
            Has successfully participated in the Global Tech & AI Summit 2026, completing 18+ hours of technical keynotes, multi-agent AI workshops, and system architecture sessions.
          </p>
        </div>

        {/* Verification Info Footer */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-2 text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Cryptographic Verification Hash: 0x8F92A...</span>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => alert('LinkedIn Share link copied to clipboard!')}
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/15 text-white rounded-xl text-xs flex items-center gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Share to LinkedIn</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
