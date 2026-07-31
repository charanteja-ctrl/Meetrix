import React, { useState } from 'react';
import { Award, CheckCircle2, FileText, Star, ShieldCheck, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CertificateItem {
  id: string;
  eventTitle: string;
  category: string;
  issuedDate: string;
  issuerName: string;
  verificationHash: string;
  attendancePercent: number;
  odEligible: boolean;
  odApproved: boolean;
}

export const ODAndCertificatesView: React.FC = () => {
  const [certificates] = useState<CertificateItem[]>([
    {
      id: 'cert-vtapp-001',
      eventTitle: 'VTAPP 2026 — Annual National Tech Fest',
      category: 'Technical Hackathon',
      issuedDate: '2026-10-16',
      issuerName: 'SCOPE & Student Welfare Office',
      verificationHash: '0x8f2a991b72e004a',
      attendancePercent: 94,
      odEligible: true,
      odApproved: true,
    },
    {
      id: 'cert-vitopia-002',
      eventTitle: 'Vitopia 2026 — International Cultural Fest',
      category: 'Flagship Fest',
      issuedDate: '2026-09-26',
      issuerName: 'Vitopia Student Welfare Board',
      verificationHash: '0x3c990a12e8812f',
      attendancePercent: 88,
      odEligible: true,
      odApproved: true,
    },
    {
      id: 'cert-ic4ai-003',
      eventTitle: 'IC4AI 2026 — IEEE AI Conference',
      category: 'IEEE Conference',
      issuedDate: '2026-11-06',
      issuerName: 'IEEE Student Branch & SCOPE',
      verificationHash: '0x7b11c9942a101d',
      attendancePercent: 78,
      odEligible: false,
      odApproved: false,
    }
  ]);

  const [feedbackRating, setFeedbackRating] = useState<number>(5);
  const [feedbackComments, setFeedbackComments] = useState<string>('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState<boolean>(false);

  const handleExportODSheet = (cert: CertificateItem) => {
    confetti({ particleCount: 100, spread: 70 });
    const csvContent = `data:text/csv;charset=utf-8,VIT-AP VTOP ON-DUTY APPROVAL SHEET\nEvent,Reg No,Name,School,Gate Entry,Gate Exit,Duration %,Status\n"${cert.eventTitle}","23BCE1092","Alex Rivera","SCOPE","09:00 AM","05:30 PM","${cert.attendancePercent}%","VERIFIED DSW OD"`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `VTOP_OD_SHEET_${cert.id}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    alert(`📄 VTOP On-Duty Sheet exported for ${cert.eventTitle}! Ready for academic submission.`);
  };

  const handleDownloadCertificate = (cert: CertificateItem) => {
    confetti({ particleCount: 120, spread: 80 });
    alert(`📜 E-Certificate ${cert.id} downloaded!\nVerification Signature: ${cert.verificationHash}`);
  };

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackSubmitted(true);
    confetti({ particleCount: 140, spread: 90 });
    alert('🎉 Post-event feedback recorded! Your verified E-Certificate has been unlocked.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 font-sans">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="font-heading text-3xl font-extrabold text-white flex items-center gap-3">
            <Award className="w-8 h-8 text-[#00E5A8]" />
            <span>On-Duty (OD) & E-Certificates Hub</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Automated &gt;80% attendance validation via gate scan logs • VTOP OD export sheets • Signed PDF certificates.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs bg-white/5 border border-white/10 p-2.5 rounded-2xl">
          <ShieldCheck className="w-4 h-4 text-[#00E5A8]" />
          <span className="text-slate-300">Student: Alex Rivera (23BCE1092)</span>
        </div>
      </div>

      {/* Post-Event Feedback Unlocking Section */}
      <div className="p-6 bg-gradient-to-r from-[#6c63ff]/15 via-[#14161d] to-[#00E5A8]/15 border border-white/15 rounded-3xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>Unlock Pending Certificate & OD Claim</span>
          </h3>
          <span className="px-2.5 py-1 bg-amber-500/10 text-amber-300 text-[10px] font-mono rounded-full border border-amber-500/30">
            FEEDBACK REQUIRED
          </span>
        </div>

        {!feedbackSubmitted ? (
          <form onSubmit={handleSubmitFeedback} className="space-y-4 font-mono text-xs">
            <p className="text-slate-300">Complete quick feedback for <strong>VTAPP 2026 SCOPE Hackathon</strong> to claim your OD sheet & certificate:</p>
            
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Rate Event Experience:</span>
              <div className="flex gap-1 text-amber-400">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFeedbackRating(star)}
                    className="p-1 hover:scale-125 transition-transform"
                  >
                    <Star className={`w-5 h-5 ${star <= feedbackRating ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}`} />
                  </button>
                ))}
              </div>
            </div>

            <textarea
              value={feedbackComments}
              onChange={(e) => setFeedbackComments(e.target.value)}
              placeholder="What did you learn from this workshop? Share your feedback for SCOPE & DSW..."
              className="w-full p-3 bg-white/5 border border-white/10 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00E5A8]"
              rows={2}
            />

            <button
              type="submit"
              className="px-6 py-2.5 bg-[#00E5A8] text-slate-950 font-bold rounded-xl text-xs hover:bg-[#00E5A8]/90 transition-all shadow-lg shadow-[#00E5A8]/20 flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Submit Feedback & Unlock Certificate</span>
            </button>
          </form>
        ) : (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-xs font-mono text-emerald-300 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>Thank you! Feedback recorded. Certificate and VTOP OD Export are now unlocked below.</span>
          </div>
        )}
      </div>

      {/* Certificates & OD Table */}
      <div className="space-y-4 font-mono">
        <h3 className="font-heading text-xl font-bold text-white">Issued E-Certificates & VTOP OD Sheets</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map(cert => (
            <div key={cert.id} className="p-6 bg-[#14161d] border border-white/10 rounded-3xl space-y-4 hover:border-[#6c63ff]/60 transition-all">
              
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
                <span className="px-2.5 py-0.5 bg-[#6c63ff]/20 text-[#00E5A8] border border-[#6c63ff]/30 text-[10px] rounded-full">
                  {cert.category}
                </span>
                <span className="text-[10px] text-slate-400">{cert.issuedDate}</span>
              </div>

              <div>
                <h4 className="font-heading text-base font-bold text-white line-clamp-1">{cert.eventTitle}</h4>
                <p className="text-xs text-slate-400 mt-1">Issued by: {cert.issuerName}</p>
              </div>

              {/* Attendance & OD Status */}
              <div className="p-3 bg-white/5 rounded-2xl space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Gate Scan Duration:</span>
                  <span className="font-bold text-[#00E5A8]">{cert.attendancePercent}% (&gt;80% req)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">VTOP OD Status:</span>
                  <span className={`font-bold ${cert.odApproved ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {cert.odApproved ? 'APPROVED BY DSW' : 'PENDING REVIEW'}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => handleDownloadCertificate(cert)}
                  className="w-full py-2.5 bg-gradient-to-r from-[#6c63ff] to-[#584ee4] text-white font-bold rounded-xl text-xs hover:shadow-lg hover:shadow-[#6c63ff]/30 transition-all flex items-center justify-center gap-2"
                >
                  <Award className="w-4 h-4 text-[#00E5A8]" />
                  <span>Download E-Certificate</span>
                </button>

                {cert.odEligible && (
                  <button
                    onClick={() => handleExportODSheet(cert)}
                    className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/15 text-slate-200 font-semibold rounded-xl text-xs transition-all flex items-center justify-center gap-2"
                  >
                    <FileText className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Export VTOP OD Sheet (CSV)</span>
                  </button>
                )}
              </div>

              <p className="text-[9px] text-center text-slate-500 font-mono break-all">
                HASH: {cert.verificationHash}
              </p>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
