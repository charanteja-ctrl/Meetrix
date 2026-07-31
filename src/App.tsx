import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { CommandPalette } from './components/common/CommandPalette';
import { NotificationDrawer } from './components/common/NotificationDrawer';

import { HomeView } from './views/HomeView';
import { ExploreView } from './views/ExploreView';
import { EventDetailView } from './views/EventDetailView';
import { DashboardView } from './views/DashboardView';
import { MultiStepEventWizard } from './components/studio/MultiStepEventWizard';
import { TicketsView } from './views/TicketsView';
import { ScannerView } from './views/ScannerView';
import { AdminView } from './views/AdminView';
import { CertificatesView } from './views/CertificatesView';
import { NetworkingView } from './views/NetworkingView';

const MainContent: React.FC = () => {
  const { activeView } = useApp();

  return (
    <main className="min-h-screen">
      {activeView === 'home' && <HomeView />}
      {activeView === 'explore' && <ExploreView />}
      {activeView === 'event-detail' && <EventDetailView />}
      {activeView === 'dashboard' && <DashboardView />}
      {activeView === 'create-event' && <div className="py-10 max-w-7xl mx-auto px-4"><MultiStepEventWizard /></div>}
      {activeView === 'tickets' && <TicketsView />}
      {activeView === 'scanner' && <ScannerView />}
      {activeView === 'admin' && <AdminView />}
      {activeView === 'certificates' && <CertificatesView />}
      {activeView === 'networking' && <NetworkingView />}
    </main>
  );
};

export function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppProvider>
          <div className="min-h-screen flex flex-col bg-[#0d0e12] text-slate-100 selection:bg-[#6c63ff] selection:text-white">
            <Navbar />
            <div className="flex-1">
              <MainContent />
            </div>
            <Footer />

            {/* Overlays & Global Modals */}
            <CommandPalette />
            <NotificationDrawer />
          </div>
        </AppProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
