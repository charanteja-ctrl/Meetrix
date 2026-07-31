import React from 'react';
import { Sparkles, ArrowRight, Calendar, QrCode, MapPin, Zap } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Hero: React.FC = () => {
  const { setActiveView, setSelectedEvent, events } = useApp();
  const featuredEvent = events[0];

  return (
    <section className="relative min-h-[90vh] pt-12 pb-20 overflow-hidden aurora-bg flex flex-col justify-center">
      
      {/* Background Floating Decorative Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#6c63ff]/20 via-[#00E5A8]/10 to-[#9D4EDD]/20 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Ticker Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/15 text-xs text-slate-200 backdrop-blur-md hover:border-[#6c63ff] transition-all cursor-pointer shadow-lg shadow-black/20"
            onClick={() => setActiveView('create-event')}
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E5A8] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E5A8]"></span>
            </span>
            <span className="font-semibold text-white font-mono">Vitopia 2026 & VTAPP National Fest Live</span>
            <span className="text-slate-400">|</span>
            <span className="text-[#00E5A8] font-mono flex items-center gap-1">
              SVG Seat Map & Groq AI Co-Pilot <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Main Hero Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            VIT-AP University <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6c63ff] via-[#00E5A8] to-[#00D8F6]">
              Events, Fests & Hackathon Hub
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-xl max-w-2xl mx-auto font-sans leading-relaxed">
            The official event platform for VIT-AP student clubs, GDSC, ACM, IEEE & Vitopia. Features APJ Abdul Kalam Auditorium seat booking, OAT Pro-Night QR passes & Groq AI co-pilot.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setActiveView('explore')}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#6c63ff] to-[#584ee4] text-white font-semibold rounded-2xl shadow-xl shadow-[#6c63ff]/30 hover:scale-[1.03] transition-all flex items-center justify-center gap-3 text-sm group"
            >
              <Calendar className="w-5 h-5 text-[#00E5A8]" />
              <span>Explore VIT-AP Events</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => setActiveView('create-event')}
              className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/15 text-white font-semibold rounded-2xl hover:bg-white/10 hover:border-white/30 transition-all flex items-center justify-center gap-3 text-sm backdrop-blur-md"
            >
              <Sparkles className="w-5 h-5 text-[#00E5A8]" />
              <span>Host Club Event & Fest</span>
            </button>
          </div>
        </div>

        {/* Floating Interactive Preview Card Showcase */}
        <div className="mt-16 relative max-w-5xl mx-auto">
          
          {/* Glass Card Backdrop */}
          <div className="relative rounded-3xl p-2 bg-gradient-to-b from-white/15 to-white/5 border border-white/15 shadow-2xl backdrop-blur-2xl overflow-hidden group">
            
            <div className="relative rounded-2xl overflow-hidden bg-[#101114]">
              <img 
                src={featuredEvent.banner} 
                alt="Featured Event Banner" 
                className="w-full h-80 sm:h-96 object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e12] via-[#0d0e12]/60 to-transparent flex flex-col justify-end p-6 sm:p-10">
                
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-[#6c63ff] text-white text-xs font-semibold rounded-full uppercase tracking-wider font-code">
                    {featuredEvent.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-slate-300 bg-black/50 px-3 py-1 rounded-full border border-white/10">
                    <MapPin className="w-3.5 h-3.5 text-[#00E5A8]" />
                    {featuredEvent.location.venueName}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                    <Zap className="w-3.5 h-3.5 animate-bounce" />
                    {featuredEvent.liveViewersCount} Students Browsing
                  </span>
                </div>

                <h3 className="font-heading text-2xl sm:text-4xl font-bold text-white mb-2">
                  {featuredEvent.title}
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm max-w-2xl line-clamp-2 mb-6">
                  {featuredEvent.description}
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-white/15">
                  <div className="flex items-center gap-4">
                    <img src={featuredEvent.organizer.logo} alt="Organizer Logo" className="w-10 h-10 rounded-full border border-white/20" />
                    <div>
                      <p className="text-xs font-semibold text-white flex items-center gap-1">
                        Hosted by {featuredEvent.organizer.name}
                      </p>
                      <p className="text-[11px] text-slate-400 font-mono">{featuredEvent.date} • {featuredEvent.time}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedEvent(featuredEvent);
                      setActiveView('event-detail');
                    }}
                    className="px-6 py-3 bg-[#00E5A8] text-slate-950 font-bold rounded-xl text-xs hover:bg-[#00E5A8]/90 transition-all shadow-lg shadow-[#00E5A8]/20 flex items-center justify-center gap-2 font-mono"
                  >
                    <span>Get Event Pass (₹0 - ₹799)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>

          </div>

          {/* Side Floating Badge 1: Encrypted QR Ticket */}
          <div className="hidden lg:flex absolute -bottom-6 -left-8 bg-[#14161d] border border-white/20 rounded-2xl p-4 shadow-2xl items-center gap-3 backdrop-blur-xl animate-float">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6c63ff] to-[#9D4EDD] p-2 flex items-center justify-center text-white">
              <QrCode className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Encrypted Campus QR Pass</p>
              <p className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                Vitopia & VTAPP Gate Ready
              </p>
            </div>
          </div>

          {/* Side Floating Badge 2: AB1 Auditorium SVG Seat Allocation */}
          <div className="hidden lg:flex absolute -top-6 -right-8 bg-[#14161d] border border-white/20 rounded-2xl p-4 shadow-2xl items-center gap-3 backdrop-blur-xl animate-float" style={{ animationDelay: '2s' }}>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00E5A8] to-[#00D8F6] p-2 flex items-center justify-center text-slate-950 font-bold font-mono">
              AB1
            </div>
            <div>
              <p className="text-xs font-semibold text-white">APJ Kalam Auditorium Map</p>
              <p className="text-[10px] text-slate-400 font-mono">Tiered Seating & VIP Rows</p>
            </div>
          </div>

        </div>

        {/* Key Campus Metrics */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { label: 'Active Campus Clubs', value: '70+' },
            { label: 'Student Passes Issued', value: '45,000+' },
            { label: 'Gate Scan Validation', value: '< 100ms' },
            { label: 'Vitopia Attendees', value: '15,000+' },
          ].map((stat, i) => (
            <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
              <p className="font-heading text-2xl sm:text-3xl font-extrabold text-white">{stat.value}</p>
              <p className="text-xs text-slate-400 mt-1 font-mono">{stat.label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
