import React, { useState } from 'react';
import { OrganizerMetrics } from '../components/dashboard/OrganizerMetrics';
import { GroqAICoPilotStudio } from '../components/studio/GroqAICoPilotStudio';
import { MultiStepEventWizard } from '../components/studio/MultiStepEventWizard';
import { BarChart3, Sparkles, Calendar } from 'lucide-react';

export const DashboardView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'metrics' | 'ai-studio' | 'wizard'>('metrics');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Dashboard Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="font-heading text-3xl font-extrabold text-white">Organizer Control Studio</h1>
          <p className="text-xs text-slate-400 mt-1 font-mono">Realtime gross revenue, attendance pacing, Stripe payouts & AI content generator.</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-white/5 border border-white/10 p-1 rounded-2xl self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('metrics')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'metrics' ? 'bg-[#6c63ff] text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Revenue & Pacing</span>
          </button>

          <button
            onClick={() => setActiveTab('ai-studio')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'ai-studio' ? 'bg-[#6c63ff] text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#00E5A8]" />
            <span>Groq AI Studio</span>
          </button>

          <button
            onClick={() => setActiveTab('wizard')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'wizard' ? 'bg-[#6c63ff] text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>Event Creator</span>
          </button>
        </div>
      </div>

      {/* Tab Views */}
      {activeTab === 'metrics' && <OrganizerMetrics />}
      {activeTab === 'ai-studio' && <GroqAICoPilotStudio />}
      {activeTab === 'wizard' && <MultiStepEventWizard />}

    </div>
  );
};
