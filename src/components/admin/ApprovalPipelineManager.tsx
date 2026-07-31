import React, { useState } from 'react';
import { ShieldAlert, CheckCircle2, AlertTriangle, UserCheck } from 'lucide-react';
import { VITAP_VENUES } from '../../data/vitapData';

export type ApprovalState = 
  | 'Draft' 
  | 'Faculty Coordinator Review' 
  | 'Venue Collision Checking' 
  | 'DSW Final Sign-off' 
  | 'Live Published';

export interface EventProposal {
  id: string;
  title: string;
  clubName: string;
  category: string;
  requestedVenueId: string;
  eventDate: string;
  eventTime: string;
  facultyCoordinator: string;
  estimatedBudget: number;
  grantRequested: number;
  currentStage: ApprovalState;
  collisionDetected: boolean;
  facultyApproved: boolean;
  dswApproved: boolean;
}

export const ApprovalPipelineManager: React.FC = () => {
  const [proposals, setProposals] = useState<EventProposal[]>([
    {
      id: 'prop-vitopia-01',
      title: 'Vitopia 2026 Pro-Night & International Cultural Showcase',
      clubName: 'Vitopia Student Welfare Board',
      category: 'Flagship Fest',
      requestedVenueId: 'V-OAT-01',
      eventDate: '2026-09-24',
      eventTime: '04:00 PM - 11:00 PM',
      facultyCoordinator: 'Dr. S. Chitra (Cultural Convenor)',
      estimatedBudget: 450000,
      grantRequested: 300000,
      currentStage: 'DSW Final Sign-off',
      collisionDetected: false,
      facultyApproved: true,
      dswApproved: false,
    },
    {
      id: 'prop-vtapp-02',
      title: 'VTAPP 2026 SCOPE 48h National Hackathon',
      clubName: 'GDSC & ACM VIT-AP',
      category: 'Technical Hackathon',
      requestedVenueId: 'V-MPH-01',
      eventDate: '2026-10-14',
      eventTime: '09:00 AM - 08:00 PM',
      facultyCoordinator: 'Dr. A. Sudhir (SCOPE)',
      estimatedBudget: 120000,
      grantRequested: 80000,
      currentStage: 'Venue Collision Checking',
      collisionDetected: false,
      facultyApproved: true,
      dswApproved: false,
    },
    {
      id: 'prop-null-03',
      title: 'NULL Humla CTF Security Sprint',
      clubName: 'Null Chapter (Cybersecurity)',
      category: 'Technical Workshop',
      requestedVenueId: 'V-LAB-MAC',
      eventDate: '2026-08-18',
      eventTime: '10:00 AM - 04:00 PM',
      facultyCoordinator: 'Dr. N. Suresh',
      estimatedBudget: 25000,
      grantRequested: 15000,
      currentStage: 'Faculty Coordinator Review',
      collisionDetected: true,
      facultyApproved: false,
      dswApproved: false,
    }
  ]);

  const handleAdvanceStage = (id: string, nextStage: ApprovalState) => {
    setProposals(prev => prev.map(p => {
      if (p.id === id) {
        return {
          ...p,
          currentStage: nextStage,
          facultyApproved: nextStage !== 'Faculty Coordinator Review',
          dswApproved: nextStage === 'Live Published'
        };
      }
      return p;
    }));
    alert(`✅ Event Proposal ${id} advanced to stage: ${nextStage}`);
  };

  const handleRejectProposal = (id: string) => {
    setProposals(prev => prev.filter(p => p.id !== id));
    alert(`❌ Event Proposal ${id} rejected and returned to Club Lead with revisions.`);
  };

  return (
    <div className="p-6 bg-[#14161d] border border-white/10 rounded-3xl space-y-6 font-mono">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h3 className="font-heading text-lg font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-[#6c63ff]" />
            <span>VIT-AP 3-Tier Event Approval Pipeline</span>
          </h3>
          <p className="text-xs text-slate-400">State Machine: Draft ➔ Faculty Review ➔ Venue Collision Check ➔ DSW Sign-Off ➔ Live Publishing.</p>
        </div>

        <span className="px-3 py-1 bg-[#6c63ff]/20 text-[#00E5A8] border border-[#6c63ff]/40 text-xs font-bold rounded-full self-start sm:self-auto">
          DSW GOVERNANCE CONSOLE
        </span>
      </div>

      {/* Proposals List */}
      <div className="space-y-4">
        {proposals.map(prop => {
          const venue = VITAP_VENUES.find(v => v.id === prop.requestedVenueId);

          return (
            <div key={prop.id} className="p-5 bg-white/5 border border-white/10 rounded-2xl space-y-4 hover:border-white/20 transition-all">
              
              {/* Proposal Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-3 border-b border-white/10 text-xs">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-[#6c63ff] text-white text-[10px] font-bold rounded-full">
                    {prop.category}
                  </span>
                  <span className="font-bold text-white text-sm">{prop.title}</span>
                </div>

                <span className="px-3 py-1 bg-amber-500/10 text-amber-300 border border-amber-500/30 text-[11px] font-bold rounded-full">
                  Stage: {prop.currentStage}
                </span>
              </div>

              {/* Grid Metadata */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <p className="text-slate-400">CLUB / APPLICANT:</p>
                  <p className="font-bold text-[#00E5A8]">{prop.clubName}</p>
                </div>
                <div>
                  <p className="text-slate-400">VENUE REQUESTED:</p>
                  <p className="font-bold text-white">{venue?.name || prop.requestedVenueId}</p>
                </div>
                <div>
                  <p className="text-slate-400">DATE & TIME:</p>
                  <p className="text-slate-200">{prop.eventDate}</p>
                </div>
                <div>
                  <p className="text-slate-400">ESTIMATED BUDGET:</p>
                  <p className="font-bold text-amber-400">₹{prop.estimatedBudget.toLocaleString()} INR</p>
                </div>
              </div>

              {/* Collision Check Status */}
              <div className="flex items-center justify-between p-3 bg-black/40 rounded-xl text-xs">
                <span className="text-slate-400">AUTOMATED VENUE COLLISION ENGINE:</span>
                {prop.collisionDetected ? (
                  <span className="text-rose-400 font-bold flex items-center gap-1">
                    <AlertTriangle className="w-4 h-4" /> Collision Detected in {venue?.name}!
                  </span>
                ) : (
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Slot Clear — Zero Schedule Collisions
                  </span>
                )}
              </div>

              {/* Approval Action Pipeline Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <UserCheck className="w-4 h-4 text-[#00E5A8]" />
                  <span>Faculty Coordinator: {prop.facultyCoordinator}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleRejectProposal(prop.id)}
                    className="px-3.5 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 rounded-xl text-xs font-bold transition-all"
                  >
                    Reject Proposal
                  </button>

                  {prop.currentStage === 'Faculty Coordinator Review' && (
                    <button
                      onClick={() => handleAdvanceStage(prop.id, 'Venue Collision Checking')}
                      className="px-4 py-1.5 bg-[#6c63ff] text-white rounded-xl text-xs font-bold hover:bg-[#584ee4] transition-all flex items-center gap-1.5"
                    >
                      <span>Faculty Approve ➔ Run Collision Check</span>
                    </button>
                  )}

                  {prop.currentStage === 'Venue Collision Checking' && (
                    <button
                      onClick={() => handleAdvanceStage(prop.id, 'DSW Final Sign-off')}
                      className="px-4 py-1.5 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs hover:bg-amber-400 transition-all flex items-center gap-1.5"
                    >
                      <span>Confirm Slot ➔ Send to DSW</span>
                    </button>
                  )}

                  {prop.currentStage === 'DSW Final Sign-off' && (
                    <button
                      onClick={() => handleAdvanceStage(prop.id, 'Live Published')}
                      className="px-4 py-1.5 bg-[#00E5A8] text-slate-950 font-bold rounded-xl text-xs hover:bg-[#00E5A8]/90 transition-all flex items-center gap-1.5 shadow-lg shadow-[#00E5A8]/20"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>DSW Approve & Publish Live</span>
                    </button>
                  )}
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
