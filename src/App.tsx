import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/common/Navbar';
import { CommandPalette } from './components/common/CommandPalette';
import { QRScannerModal } from './components/scanner/QRScannerModal';
import { Hero } from './components/home/Hero';
import { ExploreView } from './views/ExploreView';
import { EventDetailView } from './views/EventDetailView';
import { MultiStepEventWizard } from './components/studio/MultiStepEventWizard';
import { PassCard3D } from './components/ticket/PassCard3D';
import { OrganizerMetrics } from './components/dashboard/OrganizerMetrics';
import { SystemCommandCenter } from './components/admin/SystemCommandCenter';
import { ODAndCertificatesView } from './views/ODAndCertificatesView';
import { NetworkingView } from './views/NetworkingView';
import { ApprovalPipelineManager } from './components/admin/ApprovalPipelineManager';
import { LiveGateOccupancy } from './components/dashboard/LiveGateOccupancy';
import { QrCode } from 'lucide-react';

const AppContent: React.FC = () => {
  const { activeView, bookings, setScannerModalOpen } = useApp();

  return (
    <div className="min-h-screen bg-[#0d0e12] text-slate-100 flex flex-col justify-between selection:bg-[#00E5A8] selection:text-slate-950">
      
      {/* Top Header Navbar */}
      <Navbar />

      {/* Main View Router */}
      <main className="flex-1 pb-16">
        {activeView === 'home' && (
          <div className="space-y-16">
            <Hero />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
              {/* Live Gate Occupancy Widget */}
              <LiveGateOccupancy />

              {/* DSW Approval Pipeline Widget */}
              <ApprovalPipelineManager />

              {/* Main Events Grid Preview */}
              <ExploreView />
            </div>
          </div>
        )}

        {activeView === 'explore' && <ExploreView />}

        {activeView === 'event-detail' && (
          <div className="space-y-6">
            <EventDetailView />
          </div>
        )}

        {activeView === 'create-event' && (
          <div className="max-w-5xl mx-auto px-4 py-10">
            <MultiStepEventWizard />
          </div>
        )}

        {activeView === 'tickets' && (
          <div className="max-w-5xl mx-auto px-4 py-10 space-y-8 font-sans">
            <div className="text-center space-y-2">
              <h1 className="font-heading text-3xl font-extrabold text-white">My Dynamic Campus Passes</h1>
              <p className="text-xs text-slate-400 font-mono">
                Dynamic 30-Second Rolling TOTP QR Passes • Anti-Screenshot Security • Apple & Google Wallet Ready
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {bookings.map(b => (
                <PassCard3D key={b.id} booking={b} />
              ))}
            </div>
          </div>
        )}

        {activeView === 'dashboard' && (
          <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
            <OrganizerMetrics />
            <LiveGateOccupancy />
          </div>
        )}

        {activeView === 'scanner' && (
          <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
            <div className="p-8 bg-[#14161d] border border-white/10 rounded-3xl space-y-4">
              <QrCode className="w-16 h-16 text-[#00E5A8] mx-auto animate-bounce" />
              <h2 className="font-heading text-2xl font-bold text-white">VIT-AP Gate Scanner Kiosk</h2>
              <p className="text-xs text-slate-400 max-w-md mx-auto font-mono">
                Volunteer Access Control Terminal. Scans student 30s dynamic QR passes, verifies SSO identity, and logs timestamped gate entries.
              </p>
              <button
                onClick={() => setScannerModalOpen(true)}
                className="px-8 py-3.5 bg-gradient-to-r from-[#6c63ff] to-[#00E5A8] text-slate-950 font-extrabold rounded-2xl text-xs hover:scale-105 transition-all shadow-xl font-mono"
              >
                Launch Gate Scanner Kiosk
              </button>
            </div>
          </div>
        )}

        {activeView === 'certificates' && <ODAndCertificatesView />}
        {activeView === 'od-certificates' && <ODAndCertificatesView />}
        {activeView === 'networking' && <NetworkingView />}
        {activeView === 'approvals' && <ApprovalPipelineManager />}
        {activeView === 'admin' && <SystemCommandCenter />}
      </main>

      {/* Global Command Palette & Modals */}
      <CommandPalette />
      <QRScannerModal />

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#0a0b0d] py-10 text-xs text-slate-400 font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00E5A8]"></span>
            <span className="font-bold text-white font-heading">EventSphere VIT-AP</span>
            <span>— Institutional Event Management Platform</span>
          </div>

          <p className="text-slate-500 text-[11px]">
            Engineered for VIT-AP University • Powered by Next.js, Supabase & Vercel
          </p>
        </div>
      </footer>

    </div>
  );
};

export function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppProvider>
          <AppContent />
        </AppProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
