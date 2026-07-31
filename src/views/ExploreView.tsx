import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EventCard } from '../components/events/EventCard';
import { CategoryFilter } from '../components/home/CategoryFilter';
import type { EventCategory } from '../types/event';
import { Search, Map, Grid, Calendar as CalendarIcon, SlidersHorizontal, MapPin } from 'lucide-react';

export const ExploreView: React.FC = () => {
  const { events, searchQuery, setSearchQuery, setSelectedEvent, setActiveView } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | 'All'>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'map' | 'calendar'>('grid');
  const [priceMax, setPriceMax] = useState<number>(2000);

  const filteredEvents = events.filter(evt => {
    const matchesSearch = evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          evt.location.venueName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          evt.organizer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          evt.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || evt.category === selectedCategory;
    const matchesPrice = evt.priceFrom <= priceMax;
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Search Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="font-heading text-3xl font-extrabold text-white">Explore VIT-AP Campus Events</h1>
          <p className="text-xs text-slate-400 mt-1 font-mono">Discover Vitopia, VTAPP, GDSC Hackathons, IEEE Conferences & Club Events.</p>
        </div>

        {/* View Mode Toggle Switcher */}
        <div className="flex items-center gap-1 bg-white/5 border border-white/10 p-1 rounded-2xl self-start md:self-auto font-mono">
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              viewMode === 'grid' ? 'bg-[#6c63ff] text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Grid className="w-4 h-4" />
            <span>Grid</span>
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              viewMode === 'map' ? 'bg-[#6c63ff] text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Map className="w-4 h-4" />
            <span>Campus Map</span>
          </button>
          <button
            onClick={() => setViewMode('calendar')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              viewMode === 'calendar' ? 'bg-[#6c63ff] text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <CalendarIcon className="w-4 h-4" />
            <span>Calendar</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 bg-[#14161d] border border-white/10 rounded-2xl flex flex-col md:flex-row items-center gap-4">
        
        {/* Search Input */}
        <div className="relative flex-1 w-full font-mono">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search AB1 Auditorium, MPH, GDSC, Vitopia, ACM, GFG..."
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#6c63ff]"
          />
        </div>

        {/* Price Slider Filter */}
        <div className="flex items-center gap-3 w-full md:w-auto text-xs font-mono text-slate-300">
          <SlidersHorizontal className="w-4 h-4 text-[#00E5A8]" />
          <span>Max Pass Fee: ₹{priceMax} INR</span>
          <input
            type="range"
            min="0"
            max="2000"
            step="100"
            value={priceMax}
            onChange={(e) => setPriceMax(Number(e.target.value))}
            className="accent-[#00E5A8] cursor-pointer"
          />
        </div>

      </div>

      {/* Category Pills */}
      <CategoryFilter
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* VIEW MODES */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(evt => (
            <EventCard key={evt.id} event={evt} />
          ))}
        </div>
      )}

      {viewMode === 'map' && (
        <div className="relative h-[500px] bg-slate-950 border border-white/10 rounded-3xl overflow-hidden flex items-center justify-center p-6 text-center">
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#6c63ff_1px,transparent_1px)] [background-size:16px_16px]"></div>
          
          <div className="relative z-10 space-y-4 max-w-md">
            <MapPin className="w-12 h-12 text-[#00E5A8] mx-auto animate-bounce" />
            <h3 className="font-heading text-xl font-bold text-white">VIT-AP Interactive Campus Map Active</h3>
            <p className="text-xs text-slate-400 font-mono">
              Pin clusters loaded for AB1 Kalam Auditorium, AB2 Seminar Halls, Multipurpose Hall (MPH), and Open Air Theatre (OAT).
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {filteredEvents.map(e => (
                <button
                  key={e.id}
                  onClick={() => {
                    setSelectedEvent(e);
                    setActiveView('event-detail');
                  }}
                  className="px-3 py-1.5 bg-[#6c63ff] text-white rounded-xl text-xs font-bold font-mono hover:scale-105 transition-transform"
                >
                  📍 {e.location.venueName.split(' ')[0]} ({e.title})
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {viewMode === 'calendar' && (
        <div className="p-6 bg-[#14161d] border border-white/10 rounded-3xl space-y-4 font-mono">
          <h3 className="font-heading text-lg font-bold text-white">VIT-AP Event Calendar Stream</h3>
          <div className="space-y-3">
            {filteredEvents.map(e => (
              <div 
                key={e.id}
                onClick={() => {
                  setSelectedEvent(e);
                  setActiveView('event-detail');
                }}
                className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between cursor-pointer hover:border-[#6c63ff] transition-all"
              >
                <div>
                  <span className="text-xs text-[#00E5A8]">{e.date} • {e.time}</span>
                  <h4 className="font-heading text-base font-bold text-white mt-0.5">{e.title}</h4>
                  <p className="text-xs text-slate-400">{e.location.venueName}</p>
                </div>
                <span className="px-3 py-1.5 bg-[#6c63ff] text-white rounded-xl text-xs font-bold">
                  View Pass
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
