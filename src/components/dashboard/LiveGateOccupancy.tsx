import React, { useState, useEffect } from 'react';
import { Activity, MapPin, AlertTriangle } from 'lucide-react';
import { VITAP_VENUES } from '../../data/vitapData';

export const LiveGateOccupancy: React.FC = () => {
  const [occupancyData, setOccupancyData] = useState([
    { venueId: 'V-AB1-AUD', current: 1056, capacity: 1200, status: '88% Occupied' },
    { venueId: 'V-MPH-01', current: 1840, capacity: 2500, status: '73% Occupied' },
    { venueId: 'V-OAT-01', current: 2980, capacity: 3500, status: '85% Occupied' },
  ]);

  // Simulate real-time WebSocket gate scan updates
  useEffect(() => {
    const interval = setInterval(() => {
      setOccupancyData(prev => prev.map(v => ({
        ...v,
        current: Math.min(v.capacity, v.current + Math.floor(Math.random() * 5) - 2)
      })));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 bg-[#14161d] border border-white/10 rounded-3xl space-y-6 font-mono">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h3 className="font-heading text-lg font-bold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#00E5A8] animate-pulse" />
            <span>Live Gate Occupancy & Safety Monitor</span>
          </h3>
          <p className="text-xs text-slate-400">WebSocket real-time gate scanner feed across VIT-AP auditoriums and outdoor venues.</p>
        </div>

        <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold rounded-full self-start sm:self-auto flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          LIVE GATE FEEDS
        </span>
      </div>

      {/* Venue Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {occupancyData.map(occ => {
          const venue = VITAP_VENUES.find(v => v.id === occ.venueId);
          const percent = Math.round((occ.current / occ.capacity) * 100);
          const isHigh = percent >= 85;

          return (
            <div key={occ.venueId} className="p-5 bg-white/5 border border-white/10 rounded-2xl space-y-4">
              
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#00E5A8]" />
                  {venue?.name.split('(')[0]}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                  isHigh ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'bg-emerald-500/20 text-emerald-300'
                }`}>
                  {percent}% CAPACITY
                </span>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Current Attendees:</span>
                  <span className="font-bold text-white">{occ.current} / {occ.capacity}</span>
                </div>

                <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ${
                      isHigh ? 'bg-gradient-to-r from-amber-500 to-rose-500' : 'bg-gradient-to-r from-[#6c63ff] to-[#00E5A8]'
                    }`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400">
                <span>Hardware: {venue?.hardware[0]}</span>
                {isHigh && <span className="text-rose-400 font-bold flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Safety Alert</span>}
              </div>

            </div>
          );
        })}
      </div>

      {/* Demographic Student Distribution Summary */}
      <div className="p-4 bg-black/40 border border-white/10 rounded-2xl space-y-2 text-xs">
        <p className="font-bold text-white">Live Student Demographic Breakdown across Venues:</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-300">
          <div className="p-2 bg-white/5 rounded-xl">SCOPE (CSE): 64%</div>
          <div className="p-2 bg-white/5 rounded-xl">SENSE (ECE): 18%</div>
          <div className="p-2 bg-white/5 rounded-xl">SAS (Sciences): 10%</div>
          <div className="p-2 bg-white/5 rounded-xl">VSB / Law: 8%</div>
        </div>
      </div>

    </div>
  );
};
