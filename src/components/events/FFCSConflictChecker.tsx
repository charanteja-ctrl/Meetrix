import React, { useState } from 'react';
import { CheckCircle2, ShieldAlert } from 'lucide-react';
import { FFCS_SLOTS } from '../../data/vitapData';

interface FFCSConflictCheckerProps {
  eventDate: string;
  eventTime: string;
}

export const FFCSConflictChecker: React.FC<FFCSConflictCheckerProps> = () => {
  // Mock student's registered timetable slots
  const [studentSlots] = useState<string[]>(['A1', 'B1', 'L1+L2']);

  // Check if event time overlaps with A1/B1 slots
  const conflictingSlots = FFCS_SLOTS.filter(slot => studentSlots.includes(slot.code));
  const hasConflict = conflictingSlots.length > 0;

  return (
    <div className={`p-4 rounded-2xl border font-mono text-xs transition-all ${
      hasConflict 
        ? 'bg-amber-500/10 border-amber-500/30 text-amber-200' 
        : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
    }`}>
      <div className="flex items-start gap-3">
        {hasConflict ? (
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        ) : (
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        )}

        <div className="space-y-1.5 flex-1">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              {hasConflict ? '⚠️ FFCS Timetable Slot Collision Detected' : '✅ FFCS Timetable Clear'}
            </h4>
            <span className="px-2 py-0.5 bg-black/40 text-[10px] rounded-md text-slate-300">
              VTOP Timetable Sync
            </span>
          </div>

          {hasConflict ? (
            <div className="space-y-1 text-slate-300">
              <p>
                This event schedule overlaps with your enrolled lecture/lab slots:
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {conflictingSlots.map(s => (
                  <span key={s.code} className="px-2.5 py-1 bg-amber-500/20 text-amber-300 font-bold rounded-lg border border-amber-500/40">
                    Slot {s.code} ({s.day} {s.startTime} - {s.endTime})
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-amber-400 font-bold mt-1">
                💡 Tip: Attend &gt;80% of the event duration to automatically claim your VTOP On-Duty (OD) pass!
              </p>
            </div>
          ) : (
            <p className="text-slate-300">
              No conflicts found with your enrolled FFCS slots (A1, B1, L1+L2). You are free during this event time!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
