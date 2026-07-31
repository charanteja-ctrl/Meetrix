import React, { useState } from 'react';
import { MOCK_SEATS } from '../../data/mockEvents';
import type { Seat, TicketTier } from '../../types/event';
import { CheckCircle, Info, Sparkles } from 'lucide-react';

interface SVGSeatMapProps {
  selectedTier: TicketTier;
  onConfirmSeats: (seats: Seat[]) => void;
}

export const SVGSeatMap: React.FC<SVGSeatMapProps> = ({ onConfirmSeats }) => {
  const [seats] = useState<Seat[]>(MOCK_SEATS);
  const [selectedSeatIds, setSelectedSeatIds] = useState<string[]>([]);
  const [hoveredSeat, setHoveredSeat] = useState<Seat | null>(null);

  const toggleSeat = (seat: Seat) => {
    if (seat.status !== 'available') return;
    if (selectedSeatIds.includes(seat.id)) {
      setSelectedSeatIds(prev => prev.filter(id => id !== seat.id));
    } else {
      setSelectedSeatIds(prev => [...prev, seat.id]);
    }
  };

  const selectedSeats = seats.filter(s => selectedSeatIds.includes(s.id));
  const totalPrice = selectedSeats.reduce((acc, s) => acc + s.price, 0);

  const handleAutoRecommend = () => {
    const bestSeats = seats.filter(s => s.status === 'available' && (s.category === 'VIP' || s.category === 'Front Row')).slice(0, 2);
    setSelectedSeatIds(bestSeats.map(s => s.id));
  };

  return (
    <div className="bg-[#101114] border border-white/10 rounded-3xl p-6 space-y-6">
      
      {/* Header & Legends */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h3 className="font-heading text-lg font-bold text-white flex items-center gap-2">
            <span>Interactive Venue Seat Map</span>
            <span className="px-2 py-0.5 bg-[#6c63ff]/20 text-[#6c63ff] border border-[#6c63ff]/30 text-[10px] font-mono rounded-full">
              LIVE SEAT ALLOCATION
            </span>
          </h3>
          <p className="text-xs text-slate-400">Click any available seat to select your spot in the arena.</p>
        </div>

        <button
          onClick={handleAutoRecommend}
          className="px-3.5 py-2 bg-gradient-to-r from-[#00E5A8]/20 to-[#00D8F6]/20 border border-[#00E5A8]/40 text-[#00E5A8] rounded-xl text-xs font-semibold hover:bg-[#00E5A8]/30 transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Auto-Recommend Best Seats</span>
        </button>
      </div>

      {/* Seat Category Legend */}
      <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded-full bg-[#9D4EDD]"></span>
          <span className="text-slate-300">VIP Zone ($799)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded-full bg-[#00E5A8]"></span>
          <span className="text-slate-300">Front Row ($399)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded-full bg-[#6c63ff]"></span>
          <span className="text-slate-300">Standard ($149)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded-full bg-cyan-400"></span>
          <span className="text-slate-300">Accessible ($149)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded-full bg-slate-700"></span>
          <span className="text-slate-500">Booked</span>
        </div>
      </div>

      {/* Stage Screen Area */}
      <div className="w-full py-2 bg-gradient-to-r from-transparent via-[#6c63ff]/30 to-transparent border-t-2 border-[#6c63ff] rounded-t-full text-center">
        <span className="text-[10px] font-mono text-[#6c63ff] uppercase tracking-widest font-bold">
          ▲ MAINSTAGE & SCREEN AREA ▲
        </span>
      </div>

      {/* Visual Seat Grid Container */}
      <div className="overflow-x-auto py-4 flex justify-center">
        <div className="grid grid-cols-8 gap-2 sm:gap-3 p-4 bg-white/[0.02] border border-white/5 rounded-2xl min-w-[340px]">
          {seats.map(seat => {
            const isSelected = selectedSeatIds.includes(seat.id);
            const isBooked = seat.status === 'booked';
            const isReserved = seat.status === 'reserved';

            let bgColor = 'bg-[#6c63ff]/40 hover:bg-[#6c63ff]';
            if (seat.category === 'VIP') bgColor = 'bg-[#9D4EDD]/40 hover:bg-[#9D4EDD]';
            if (seat.category === 'Front Row') bgColor = 'bg-[#00E5A8]/40 hover:bg-[#00E5A8]';
            if (seat.category === 'Accessible') bgColor = 'bg-cyan-400/40 hover:bg-cyan-400';
            
            if (isBooked) bgColor = 'bg-slate-800 text-slate-600 cursor-not-allowed';
            if (isReserved) bgColor = 'bg-amber-500/20 border border-amber-500/40 cursor-not-allowed';
            if (isSelected) bgColor = 'bg-gradient-to-r from-[#00E5A8] to-[#00D8F6] text-slate-950 font-bold shadow-lg shadow-[#00E5A8]/40 scale-110';

            return (
              <button
                key={seat.id}
                disabled={isBooked || isReserved}
                onClick={() => toggleSeat(seat)}
                onMouseEnter={() => setHoveredSeat(seat)}
                onMouseLeave={() => setHoveredSeat(null)}
                className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl text-xs flex flex-col items-center justify-center transition-all duration-200 ${bgColor}`}
              >
                <span className="font-mono text-[10px] leading-none">{seat.row}{seat.number}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Hover Info Banner */}
      <div className="h-10 flex items-center justify-between px-4 bg-white/5 rounded-xl text-xs font-mono">
        {hoveredSeat ? (
          <span className="text-white flex items-center gap-2">
            <Info className="w-3.5 h-3.5 text-[#00E5A8]" />
            Seat {hoveredSeat.row}-{hoveredSeat.number} • Category: {hoveredSeat.category} • Price: ${hoveredSeat.price}
          </span>
        ) : (
          <span className="text-slate-400">Hover over any seat to view category details & pricing.</span>
        )}
      </div>

      {/* Selected Seat Summary & Confirm Button */}
      {selectedSeatIds.length > 0 && (
        <div className="p-4 bg-gradient-to-r from-[#6c63ff]/20 via-[#14161d] to-[#00E5A8]/20 border border-white/20 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in">
          <div>
            <p className="text-xs font-semibold text-white">
              Selected ({selectedSeats.length}): {selectedSeats.map(s => `${s.row}${s.number}`).join(', ')}
            </p>
            <p className="text-sm font-extrabold text-[#00E5A8] mt-0.5">
              Total: ${totalPrice} USD
            </p>
          </div>

          <button
            onClick={() => onConfirmSeats(selectedSeats)}
            className="px-6 py-2.5 bg-[#00E5A8] text-slate-950 font-bold rounded-xl text-xs hover:bg-[#00E5A8]/90 transition-all shadow-lg shadow-[#00E5A8]/20 flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            <span>Proceed to Checkout</span>
          </button>
        </div>
      )}

    </div>
  );
};
