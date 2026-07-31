import React, { useState } from 'react';
import type { EventItem, EventCategory, EventFormat } from '../../types/event';
import { useApp } from '../../context/AppContext';
import { Sparkles, ArrowRight, ArrowLeft, CheckCircle2, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export const MultiStepEventWizard: React.FC = () => {
  const { setActiveView, setSelectedEvent } = useApp();
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    title: 'VIT-AP Autonomous AI & Quantum Hackathon 2026',
    category: 'Technical & Hackathons' as EventCategory,
    format: 'Physical (On-Campus)' as EventFormat,
    description: '48-hour competitive coding marathon organized by GDSC, ACM & GFG Chapters in Multipurpose Hall.',
    venueName: 'Multipurpose Hall (MPH)',
    address: 'Student Amenities Complex, VIT-AP University',
    city: 'Amaravati / Vijayawada',
    country: 'India',
    date: '2026-10-20',
    time: '09:00 AM - 05:00 PM',
    price: 199,
    capacity: 500,
    tags: 'VIT-AP, Hackathon, SCOPE, AI, Quantum',
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
      timezone: 'IST (UTC+5:30)',
      location: {
        venueName: formData.venueName,
        address: formData.address,
        city: formData.city,
        country: formData.country,
        lat: 16.4971,
        lng: 80.4992
      },
      banner: formData.banner,
      thumbnail: formData.banner,
      organizer: {
        name: 'GDSC & SCOPE Chapter VIT-AP',
        logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=100&q=80',
        verified: true
      },
      ticketTiers: [
        { id: `t-${Date.now()}`, name: 'Free Student Pass', price: 0, perks: ['Access to MPH Stage', 'Certificate'], capacity: formData.capacity, available: formData.capacity }
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

    setSelectedEvent(newEvt);
    confetti({ particleCount: 150, spread: 90 });
    alert('🎉 Proposal Submitted! Your event has entered the DSW 3-Tier Approval Pipeline (Faculty Review ➔ Collision Engine ➔ DSW Sign-Off).');
    setActiveView('explore');
  };

  return (
    <div className="bg-[#14161d] border border-white/15 rounded-3xl p-6 sm:p-10 space-y-8 font-sans">
      
      {/* Step Indicator Header */}
      <div className="flex items-center justify-between pb-6 border-b border-white/10">
        <div>
          <h2 className="font-heading text-2xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-[#00E5A8]" />
            <span>VIT-AP Event Host Wizard</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1 font-mono">Submit Club & Fest proposals directly to Directorate of Student Welfare (DSW).</p>
        </div>
        <span className="px-3 py-1 bg-[#6c63ff]/20 text-[#00E5A8] border border-[#6c63ff]/40 text-xs font-bold rounded-full font-mono">
          Step {currentStep} of 6
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-[#6c63ff] to-[#00E5A8] transition-all duration-300"
          style={{ width: `${(currentStep / 6) * 100}%` }}
        />
      </div>

      {/* Step Forms */}
      {currentStep === 1 && (
        <div className="space-y-4 font-mono text-xs">
          <h3 className="font-heading text-lg font-bold text-white">Step 1: Event Title & Category</h3>
          <div className="space-y-2">
            <label className="text-slate-300">Event Title:</label>
            <input
              type="text"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-3 bg-white/5 border border-white/10 rounded-2xl text-xs text-white focus:outline-none focus:border-[#6c63ff]"
            />
          </div>
          <div className="space-y-2">
            <label className="text-slate-300">Description:</label>
            <textarea
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full p-3 bg-white/5 border border-white/10 rounded-2xl text-xs text-white focus:outline-none focus:border-[#6c63ff]"
            />
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className="space-y-4 font-mono text-xs">
          <h3 className="font-heading text-lg font-bold text-white">Step 2: VIT-AP Venue Allocation</h3>
          <div className="space-y-2">
            <label className="text-slate-300">Select Venue:</label>
            <select
              value={formData.venueName}
              onChange={e => setFormData({ ...formData, venueName: e.target.value })}
              className="w-full p-3 bg-[#101114] border border-white/10 rounded-2xl text-xs text-white focus:outline-none focus:border-[#6c63ff]"
            >
              <option value="APJ Abdul Kalam Auditorium (AB1)">APJ Abdul Kalam Auditorium (AB1) - 1,200 seats</option>
              <option value="Multipurpose Hall (MPH)">Multipurpose Hall (MPH) - 2,500 capacity</option>
              <option value="Open Air Theatre (OAT)">Open Air Theatre (OAT) - 3,500+ capacity</option>
              <option value="Seminar Hall 1 (AB1)">Seminar Hall 1 & 2 (AB1) - 200 seats</option>
              <option value="Mac Computing Lab (AB2)">Mac Computing Lab (AB2) - 120 workstations</option>
            </select>
          </div>
        </div>
      )}

      {currentStep >= 3 && currentStep <= 5 && (
        <div className="space-y-4 font-mono text-xs">
          <h3 className="font-heading text-lg font-bold text-white">Step {currentStep}: Budget & Hardware Setup</h3>
          <p className="text-slate-300">Configuring hardware tags (PA System, Dual Projectors, Dolby Audio) and requesting university grants...</p>
        </div>
      )}

      {currentStep === 6 && (
        <div className="space-y-4 font-mono text-xs text-center py-6">
          <ShieldCheck className="w-12 h-12 text-[#00E5A8] mx-auto animate-bounce" />
          <h3 className="font-heading text-xl font-bold text-white">Ready for DSW Proposal Submission</h3>
          <p className="text-slate-300 max-w-md mx-auto">
            Review event details: <strong>{formData.title}</strong> at <strong>{formData.venueName}</strong>.
          </p>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-white/10 font-mono">
        <button
          disabled={currentStep === 1}
          onClick={handleBack}
          className="px-5 py-2.5 bg-white/5 border border-white/10 text-slate-300 hover:text-white rounded-xl text-xs disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        {currentStep < 6 ? (
          <button
            onClick={handleNext}
            className="px-6 py-2.5 bg-gradient-to-r from-[#6c63ff] to-[#584ee4] text-white font-bold rounded-xl text-xs hover:shadow-lg hover:shadow-[#6c63ff]/30 transition-all flex items-center gap-1.5"
          >
            <span>Next Step</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handlePublish}
            className="px-8 py-3 bg-[#00E5A8] text-slate-950 font-bold rounded-xl text-xs hover:bg-[#00E5A8]/90 transition-all shadow-xl shadow-[#00E5A8]/20 flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Submit Proposal to DSW</span>
          </button>
        )}
      </div>

    </div>
  );
};
