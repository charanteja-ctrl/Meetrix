import React, { useState } from 'react';
import { MapPin, Calendar, Star, Zap, Bookmark, ShieldCheck, ArrowRight } from 'lucide-react';
import type { EventItem } from '../../types/event';
import { useApp } from '../../context/AppContext';

interface EventCardProps {
  event: EventItem;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { setSelectedEvent, setActiveView } = useApp();
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <div className="group relative rounded-3xl bg-[#14161d] border border-white/10 overflow-hidden hover:border-[#6c63ff]/60 transition-all duration-300 hover:shadow-2xl hover:shadow-[#6c63ff]/15 flex flex-col justify-between">
      
      {/* Image & Badges Container */}
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <img 
          src={event.thumbnail} 
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#14161d] via-transparent to-black/40" />

        {/* Category Pill */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md border border-white/15 text-white text-[10px] font-bold rounded-full font-code">
            {event.category}
          </span>
          {event.isFeatured && (
            <span className="px-2.5 py-1 bg-[#00E5A8] text-slate-950 text-[10px] font-bold rounded-full font-code">
              FEATURED
            </span>
          )}
        </div>

        {/* Bookmark Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setBookmarked(!bookmarked);
          }}
          className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md border transition-all ${
            bookmarked 
              ? 'bg-[#6c63ff] border-[#6c63ff] text-white' 
              : 'bg-black/40 border-white/15 text-slate-300 hover:text-white'
          }`}
          title="Bookmark Event"
        >
          <Bookmark className="w-4 h-4" />
        </button>

        {/* Format Badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <span className="px-2 py-0.5 bg-white/10 backdrop-blur-md rounded-lg text-[10px] text-slate-200 font-mono">
            {event.format}
          </span>
          <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded-lg border border-emerald-500/20">
            <Zap className="w-3 h-3 animate-pulse" />
            {event.seatsLeft} Seats Left
          </span>
        </div>

      </div>

      {/* Content Info */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-mono">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#6c63ff]" />
              {event.date}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#00E5A8]" />
              {event.location.city}
            </span>
          </div>

          <h3 className="font-heading text-lg font-bold text-white group-hover:text-[#00E5A8] transition-colors line-clamp-1">
            {event.title}
          </h3>

          <p className="text-slate-400 text-xs mt-1.5 line-clamp-2 leading-relaxed">
            {event.description}
          </p>
        </div>

        {/* Organizer & Rating */}
        <div className="pt-3 border-t border-white/10 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <img src={event.organizer.logo} alt={event.organizer.name} className="w-5 h-5 rounded-full" />
              <span className="text-slate-300 font-medium text-[11px] truncate max-w-[120px]">
                {event.organizer.name}
              </span>
              {event.organizer.verified && <ShieldCheck className="w-3.5 h-3.5 text-[#00E5A8]" />}
            </div>
            
            <div className="flex items-center gap-1 text-amber-400 text-[11px] font-mono">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{event.rating}</span>
              <span className="text-slate-500">({event.reviewCount})</span>
            </div>
          </div>

          {/* Pricing & CTA */}
          <div className="flex items-center justify-between pt-1">
            <div>
              <p className="text-[10px] text-slate-400 font-mono">TIERS FROM</p>
              <p className="font-heading text-base font-extrabold text-white">
                {event.priceFrom === 0 ? <span className="text-[#00E5A8]">Free</span> : `$${event.priceFrom}`}
              </p>
            </div>

            <button
              onClick={() => {
                setSelectedEvent(event);
                setActiveView('event-detail');
              }}
              className="px-4 py-2 bg-gradient-to-r from-[#6c63ff] to-[#584ee4] text-white rounded-xl text-xs font-bold hover:shadow-lg hover:shadow-[#6c63ff]/30 transition-all flex items-center gap-1.5"
            >
              <span>View & Book</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
