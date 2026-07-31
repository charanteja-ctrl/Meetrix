import React, { useState } from 'react';
import type { EventItem, EventCategory, EventFormat } from '../../types/event';
import { useApp } from '../../context/AppContext';
import { Sparkles, ArrowRight, ArrowLeft, CheckCircle2, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export const MultiStepEventWizard: React.FC = () => {
  const { addNewEvent, setActiveView } = useApp();
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    title: 'Future AI Infrastructure Expo 2026',
    category: 'AI & Web3' as EventCategory,
    format: 'Hybrid' as EventFormat,
    description: 'The definitive event for distributed systems, GPU cluster optimization, and sub-millisecond AI inference pipelines.',
    venueName: 'Palace of Tech & Innovation',
    address: '100 Silicon Way',
    city: 'San Francisco',
    country: 'USA',
    date: '2026-10-20',
    time: '09:00 AM - 05:00 PM',
    price: 199,
    capacity: 500,
    tags: 'AI, Cloud, GPUs, Web3',
    banner: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=80',
  });

  const handleNext = () => {
    if (currentStep < 6) setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  const handlePublish = () => {
    const newEvt: EventItem = {
      id: `evt-${Date.now()}`,
      slug: formData.title.toLowerCase().replace(/\s+/g, '-'),
      title: formData.title,
      description: formData.description,
      category: formData.category,
      tags: formData.tags.split(',').map(t => t.trim()),
      format: formData.format,
      date: formData.date,
      time: formData.time,
      timezone: 'PST (UTC-8)',
      location: {
        venueName: formData.venueName,
        address: formData.address,
        city: formData.city,
        country: formData.country,
        lat: 37.7749,
        lng: -122.4194
      },
      banner: formData.banner,
      thumbnail: formData.banner,
      organizer: {
        name: 'Alex Rivera (EventSphere Pro)',
        logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=100&q=80',
        verified: true
      },
      ticketTiers: [
        { id: `t-1-${Date.now()}`, name: 'Standard', price: formData.price, perks: ['Mainstage Access', 'Swag'], capacity: formData.capacity, available: formData.capacity }
      ],
      speakers: [],
      sponsors: [],
      agenda: [],
      rating: 5.0,
      reviewCount: 1,
      seatsLeft: formData.capacity,
      totalCapacity: formData.capacity,
      liveViewersCount: 42,
      priceFrom: formData.price
    };

    addNewEvent(newEvt);
    confetti({ particleCount: 120, spread: 80 });
    setActiveView('explore');
  };

  const steps = [
    { num: 1, label: 'Basic Info' },
    { num: 2, label: 'Location' },
    { num: 3, label: 'Schedule' },
    { num: 4, label: 'Ticketing' },
    { num: 5, label: 'Seat Map' },
    { num: 6, label: 'Publish' },
  ];

  return (
    <div className="max-w-4xl mx-auto bg-[#14161d] border border-white/10 rounded-3xl p-6 sm:p-10 space-y-8 shadow-2xl">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="px-3 py-1 bg-[#6c63ff]/20 text-[#00E5A8] border border-[#6c63ff]/40 text-[10px] font-mono font-bold rounded-full uppercase">
          EVENT CREATION STUDIO
        </span>
        <h2 className="font-heading text-3xl font-extrabold text-white">Publish New Enterprise Event</h2>
        <p className="text-xs text-slate-400">Complete 6 guided steps to launch your event with seat maps and instant checkout.</p>
      </div>

      {/* Stepper Progress Bar */}
      <div className="flex items-center justify-between relative px-2">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 -z-0 -translate-y-1/2"></div>
        {steps.map(s => {
          const isDone = currentStep > s.num;
          const isCurrent = currentStep === s.num;
          return (
            <div key={s.num} className="relative z-10 flex flex-col items-center gap-2">
              <div className={`w-9 h-9 rounded-full font-mono text-xs flex items-center justify-center font-bold transition-all ${
                isDone 
                  ? 'bg-[#00E5A8] text-slate-950 shadow-lg shadow-[#00E5A8]/30' 
                  : isCurrent 
                  ? 'bg-[#6c63ff] text-white shadow-lg shadow-[#6c63ff]/40 ring-4 ring-[#6c63ff]/20' 
                  : 'bg-[#101114] border border-white/20 text-slate-400'
              }`}>
                {isDone ? <CheckCircle2 className="w-5 h-5" /> : s.num}
              </div>
              <span className={`text-[10px] font-mono hidden sm:inline ${isCurrent ? 'text-white font-bold' : 'text-slate-500'}`}>
                {s.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Form Content by Step */}
      <div className="p-6 bg-[#0d0e12] border border-white/10 rounded-2xl space-y-4">
        
        {currentStep === 1 && (
          <div className="space-y-4 animate-in fade-in">
            <h3 className="font-heading text-base font-bold text-white">Step 1: Event Essentials</h3>
            
            <div>
              <label className="text-xs font-mono text-slate-300">Event Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                className="w-full mt-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#6c63ff]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-slate-300">Category</label>
                <select
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full mt-1 px-4 py-2.5 bg-[#14161d] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#6c63ff]"
                >
                  <option value="AI & Web3">AI & Web3</option>
                  <option value="Tech Conferences">Tech Conferences</option>
                  <option value="Hackathons">Hackathons</option>
                  <option value="Design">Design & UX</option>
                  <option value="Concerts">Concerts</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-mono text-slate-300">Format</label>
                <select
                  value={formData.format}
                  onChange={e => setFormData({ ...formData, format: e.target.value as any })}
                  className="w-full mt-1 px-4 py-2.5 bg-[#14161d] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#6c63ff]"
                >
                  <option value="Physical">Physical</option>
                  <option value="Virtual">Virtual</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-mono text-slate-300">Description</label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                className="w-full mt-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#6c63ff]"
              />
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4 animate-in fade-in">
            <h3 className="font-heading text-base font-bold text-white">Step 2: Location & Venue Details</h3>
            
            <div>
              <label className="text-xs font-mono text-slate-300">Venue Name</label>
              <input
                type="text"
                value={formData.venueName}
                onChange={e => setFormData({ ...formData, venueName: e.target.value })}
                className="w-full mt-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#6c63ff]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-slate-300">City</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={e => setFormData({ ...formData, city: e.target.value })}
                  className="w-full mt-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#6c63ff]"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-300">Country</label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={e => setFormData({ ...formData, country: e.target.value })}
                  className="w-full mt-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#6c63ff]"
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-4 animate-in fade-in">
            <h3 className="font-heading text-base font-bold text-white">Step 3: Schedule & Dates</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-slate-300">Event Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={e => setFormData({ ...formData, date: e.target.value })}
                  className="w-full mt-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#6c63ff]"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-300">Time Window</label>
                <input
                  type="text"
                  value={formData.time}
                  onChange={e => setFormData({ ...formData, time: e.target.value })}
                  className="w-full mt-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#6c63ff]"
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-4 animate-in fade-in">
            <h3 className="font-heading text-base font-bold text-white">Step 4: Ticket Tiers & Capacity</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-slate-300">Base Pass Price ($ USD)</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                  className="w-full mt-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#6c63ff]"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-300">Maximum Capacity</label>
                <input
                  type="number"
                  value={formData.capacity}
                  onChange={e => setFormData({ ...formData, capacity: Number(e.target.value) })}
                  className="w-full mt-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#6c63ff]"
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div className="space-y-4 animate-in fade-in text-center py-6">
            <h3 className="font-heading text-base font-bold text-white">Step 5: Visual Seat Map Configuration</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              EventSphere has automatically configured an 8x6 SVG grid map with VIP front-row seats and accessibility controls for {formData.venueName}.
            </p>
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl inline-block text-emerald-400 text-xs font-mono">
              ✓ SVG Grid Map Linked & Synchronized
            </div>
          </div>
        )}

        {currentStep === 6 && (
          <div className="space-y-4 animate-in fade-in text-center py-6">
            <ShieldCheck className="w-12 h-12 text-[#00E5A8] mx-auto animate-bounce" />
            <h3 className="font-heading text-xl font-bold text-white">Ready for Instant Global Publishing!</h3>
            <p className="text-xs text-slate-300 max-w-lg mx-auto">
              Your event "{formData.title}" will be published with instant SEO indexing, dynamic QR tickets, Stripe checkout integration, and AI Co-pilot assistant.
            </p>
          </div>
        )}

      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4">
        <button
          onClick={handleBack}
          disabled={currentStep === 1}
          className="px-5 py-2.5 bg-white/5 border border-white/10 text-white rounded-xl text-xs font-semibold hover:bg-white/10 disabled:opacity-30 transition-all flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        {currentStep < 6 ? (
          <button
            onClick={handleNext}
            className="px-6 py-2.5 bg-gradient-to-r from-[#6c63ff] to-[#584ee4] text-white font-bold rounded-xl text-xs hover:shadow-lg hover:shadow-[#6c63ff]/30 transition-all flex items-center gap-2"
          >
            <span>Continue to Step {currentStep + 1}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handlePublish}
            className="px-8 py-3 bg-[#00E5A8] text-slate-950 font-extrabold rounded-xl text-xs hover:bg-[#00E5A8]/90 transition-all shadow-xl shadow-[#00E5A8]/20 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Publish Event Now</span>
          </button>
        )}
      </div>

    </div>
  );
};
