import React from 'react';
import { useApp } from '../context/AppContext';
import { PassCard3D } from '../components/ticket/PassCard3D';
import { Ticket, ArrowRight } from 'lucide-react';

export const TicketsView: React.FC = () => {
  const { bookings, setActiveView } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="font-heading text-3xl font-extrabold text-white">My Digital Wallet & Passes</h1>
          <p className="text-xs text-slate-400 mt-1 font-mono">Encrypted dynamic QR codes, Apple/Google Wallet sync & offline check-in credentials.</p>
        </div>

        <button
          onClick={() => setActiveView('explore')}
          className="px-4 py-2 bg-[#6c63ff] text-white rounded-xl text-xs font-bold font-mono hover:bg-[#584ee4] transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <span>Find More Events</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Tickets List */}
      {bookings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {bookings.map(b => (
            <PassCard3D key={b.id} booking={b} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 p-8 bg-[#14161d] border border-white/10 rounded-3xl space-y-4">
          <Ticket className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="font-heading text-xl font-bold text-white">No Tickets Booked Yet</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">Browse featured events and reserve your spot to generate your encrypted 3D digital pass.</p>
          <button
            onClick={() => setActiveView('explore')}
            className="px-6 py-2.5 bg-[#00E5A8] text-slate-950 font-bold rounded-xl text-xs hover:bg-[#00E5A8]/90 transition-all inline-block"
          >
            Explore Events Now
          </button>
        </div>
      )}

    </div>
  );
};
