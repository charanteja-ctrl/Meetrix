import React, { useState } from 'react';
import { Hero } from '../components/home/Hero';
import { CategoryFilter } from '../components/home/CategoryFilter';
import { EventCard } from '../components/events/EventCard';
import { GroqAICoPilotStudio } from '../components/studio/GroqAICoPilotStudio';
import { useApp } from '../context/AppContext';
import type { EventCategory } from '../types/event';
import { Sparkles, ArrowRight } from 'lucide-react';

export const HomeView: React.FC = () => {
  const { events, setActiveView } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | 'All'>('All');

  const filteredEvents = selectedCategory === 'All' 
    ? events 
    : events.filter(e => e.category === selectedCategory);

  return (
    <div className="space-y-16 pb-20">
      
      {/* Aurora Hero Section */}
      <Hero />

      {/* Main Events Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#00E5A8] uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" /> Discover Premier Experiences
            </div>
            <h2 className="font-heading text-3xl font-extrabold text-white">Featured & Trending Events</h2>
          </div>

          <button
            onClick={() => setActiveView('explore')}
            className="text-xs font-bold text-[#6c63ff] hover:text-[#00E5A8] transition-colors flex items-center gap-1 self-start sm:self-auto font-mono"
          >
            <span>View All ({events.length} Events)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Category Pills */}
        <CategoryFilter 
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(evt => (
            <EventCard key={evt.id} event={evt} />
          ))}
        </div>

      </section>

      {/* AI Studio Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <GroqAICoPilotStudio />
      </section>

    </div>
  );
};
