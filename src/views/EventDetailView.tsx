import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SVGSeatMap } from '../components/booking/SVGSeatMap';
import type { Seat, TicketTier } from '../types/event';
import { Ticket } from 'lucide-react';
import confetti from 'canvas-confetti';

export const EventDetailView: React.FC = () => {
  const { selectedEvent, addBooking, setActiveView } = useApp();
  const [showSeatMap, setShowSeatMap] = useState(false);
  const [selectedTier, setSelectedTier] = useState<TicketTier>(selectedEvent?.ticketTiers[0] || { id: 't-1', name: 'Standard', price: 299, perks: [], capacity: 500, available: 100 });
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  if (!selectedEvent) return null;

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'PROMO20' || couponCode.toUpperCase() === 'VIP50') {
      setDiscountPercent(20);
      alert('Coupon Applied! 20% discount granted.');
    } else {
      alert('Invalid coupon code. Try PROMO20');
    }
  };

  const handleSeatsConfirmed = (seats: Seat[]) => {
    const total = seats.reduce((acc, s) => acc + s.price, 0) * (1 - discountPercent / 100);
    const newBooking = {
      id: `tkt-${Math.floor(1000 + Math.random() * 9000)}`,
      eventId: selectedEvent.id,
      eventTitle: selectedEvent.title,
      eventDate: selectedEvent.date,
      eventLocation: `${selectedEvent.location.venueName}, ${selectedEvent.location.city}`,
      eventBanner: selectedEvent.banner,
      tierName: selectedTier.name,
      seatNumber: seats.map(s => `${s.row}${s.number}`).join(', '),
      quantity: seats.length,
      totalAmount: Math.round(total),
      qrCodeValue: `EVENTSPHERE-TKT-${Date.now()}-VALID`,
      purchasedAt: new Date().toISOString(),
      status: 'valid' as const,
      attendeeName: 'Alex Rivera',
      attendeeEmail: 'alex.rivera@eventsphere.io'
    };

    addBooking(newBooking);
    confetti({ particleCount: 150, spread: 90 });
    setShowSeatMap(false);
    setActiveView('tickets');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Hero Media Banner */}
      <div className="relative rounded-3xl overflow-hidden h-72 sm:h-96 border border-white/10 shadow-2xl">
        <img src={selectedEvent.banner} alt={selectedEvent.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e12] via-[#0d0e12]/60 to-transparent flex flex-col justify-end p-6 sm:p-10">
          <span className="px-3 py-1 bg-[#6c63ff] text-white text-xs font-bold rounded-full w-fit mb-3 uppercase tracking-wider font-code">
            {selectedEvent.category}
          </span>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-white leading-tight">
            {selectedEvent.title}
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mt-2 line-clamp-2">
            {selectedEvent.description}
          </p>
        </div>
      </div>

      {/* Main Grid Layout: Left Content & Right Sticky Checkout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Column: Details, Speakers, Agenda */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Quick Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-[#14161d] border border-white/10 rounded-2xl text-xs font-mono">
            <div>
              <p className="text-slate-400">DATE & TIME</p>
              <p className="font-bold text-white mt-0.5">{selectedEvent.date}</p>
            </div>
            <div>
              <p className="text-slate-400">LOCATION</p>
              <p className="font-bold text-[#00E5A8] mt-0.5">{selectedEvent.location.city}, {selectedEvent.location.country}</p>
            </div>
            <div>
              <p className="text-slate-400">FORMAT</p>
              <p className="font-bold text-slate-200 mt-0.5">{selectedEvent.format}</p>
            </div>
            <div>
              <p className="text-slate-400">RATING</p>
              <p className="font-bold text-amber-400 mt-0.5">★ {selectedEvent.rating} / 5</p>
            </div>
          </div>

          {/* Speakers Section */}
          {selectedEvent.speakers.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-heading text-xl font-bold text-white">Featured Keynote Speakers</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedEvent.speakers.map(spk => (
                  <div key={spk.id} className="p-4 bg-[#14161d] border border-white/10 rounded-2xl flex items-center gap-4">
                    <img src={spk.avatar} alt={spk.name} className="w-14 h-14 rounded-2xl object-cover border border-white/20" />
                    <div>
                      <h4 className="font-heading text-sm font-bold text-white">{spk.name}</h4>
                      <p className="text-xs text-[#00E5A8] font-mono">{spk.role} @ {spk.company}</p>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{spk.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interactive SVG Seat Map Trigger or Display */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-xl font-bold text-white">Venue Seating Allocation</h3>
              <button
                onClick={() => setShowSeatMap(!showSeatMap)}
                className="px-4 py-2 bg-gradient-to-r from-[#00E5A8]/20 to-[#00D8F6]/20 border border-[#00E5A8]/40 text-[#00E5A8] rounded-xl text-xs font-bold font-mono"
              >
                {showSeatMap ? 'Hide Seat Map' : 'Open SVG Seat Map'}
              </button>
            </div>

            {showSeatMap && (
              <SVGSeatMap
                selectedTier={selectedTier}
                onConfirmSeats={handleSeatsConfirmed}
              />
            )}
          </div>

        </div>

        {/* Right Sticky Booking Box */}
        <div className="space-y-6">
          <div className="sticky top-24 p-6 bg-[#14161d] border border-white/15 rounded-3xl space-y-6 shadow-2xl">
            
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <p className="text-[10px] text-slate-400 font-mono">RESERVE TICKETS</p>
                <p className="font-heading text-2xl font-extrabold text-[#00E5A8]">
                  {selectedTier.price === 0 ? 'Free Pass' : `$${selectedTier.price} USD`}
                </p>
              </div>
              <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-mono rounded-full border border-emerald-500/30">
                INSTANT ISSUANCE
              </span>
            </div>

            {/* Select Tier */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-300">Select Pass Tier:</label>
              <div className="space-y-2">
                {selectedEvent.ticketTiers.map(t => (
                  <div
                    key={t.id}
                    onClick={() => setSelectedTier(t)}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                      selectedTier.id === t.id
                        ? 'bg-[#6c63ff]/20 border-[#6c63ff] text-white shadow-lg'
                        : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold">{t.name}</span>
                      <span className="font-mono text-[#00E5A8]">{t.price === 0 ? 'Free' : `$${t.price}`}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Coupon Code Input */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-300">Coupon Code:</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={e => setCouponCode(e.target.value)}
                  placeholder="PROMO20"
                  className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white uppercase focus:outline-none focus:border-[#6c63ff]"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="px-3 py-2 bg-white/10 hover:bg-white/20 border border-white/15 text-white rounded-xl text-xs font-mono font-bold"
                >
                  Apply
                </button>
              </div>
            </div>

            {/* Action Checkout */}
            <button
              onClick={() => setShowSeatMap(true)}
              className="w-full py-3.5 bg-gradient-to-r from-[#6c63ff] to-[#584ee4] text-white font-bold rounded-2xl text-xs hover:shadow-xl hover:shadow-[#6c63ff]/30 transition-all flex items-center justify-center gap-2"
            >
              <Ticket className="w-4 h-4 text-[#00E5A8]" />
              <span>Select Seats & Checkout</span>
            </button>

            <p className="text-[10px] text-center text-slate-500 font-mono">
              🔒 Encrypted 256-bit Stripe Checkout • Instant Apple Wallet Sync
            </p>

          </div>
        </div>

      </div>

    </div>
  );
};
