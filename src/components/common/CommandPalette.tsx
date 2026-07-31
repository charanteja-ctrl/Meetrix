import React, { useState, useEffect } from 'react';
import { Search, BarChart3, Ticket, QrCode, ShieldAlert, Sparkles, X, ArrowRight } from 'lucide-react';
import { useApp, type ViewTab } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import confetti from 'canvas-confetti';

export const CommandPalette: React.FC = () => {
  const { commandPaletteOpen, setCommandPaletteOpen, events, setActiveView, setSelectedEvent } = useApp();
  const { setRole } = useAuth();
  const [query, setQuery] = useState('');
  const [konamiProgress, setKonamiProgress] = useState<string[]>([]);

  // Listen for Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(!commandPaletteOpen);
      }
      if (e.key === 'Escape') {
        setCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [commandPaletteOpen, setCommandPaletteOpen]);

  // Konami Code Easter Egg: Up Up Down Down Left Right Left Right B A
  useEffect(() => {
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    const handleKonami = (e: KeyboardEvent) => {
      const updated = [...konamiProgress, e.key.toLowerCase()];
      if (updated.length > konamiSequence.length) {
        updated.shift();
      }
      setKonamiProgress(updated);

      const isMatch = konamiSequence.every((key, idx) => updated[idx] === key.toLowerCase());
      if (isMatch && updated.length === konamiSequence.length) {
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.6 }
        });
        alert('🎉 Easter Egg Unlocked! You entered the Konami Code on EventSphere!');
        setKonamiProgress([]);
      }
    };
    window.addEventListener('keydown', handleKonami);
    return () => window.removeEventListener('keydown', handleKonami);
  }, [konamiProgress]);

  if (!commandPaletteOpen) return null;

  const filteredEvents = events.filter(e => 
    e.title.toLowerCase().includes(query.toLowerCase()) || 
    e.category.toLowerCase().includes(query.toLowerCase()) ||
    e.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
  );

  const quickActions: { label: string; view: ViewTab; icon: React.ReactNode }[] = [
    { label: 'Create New Event Wizard', view: 'create-event', icon: <Sparkles className="w-4 h-4 text-[#00E5A8]" /> },
    { label: 'Organizer Revenue Analytics', view: 'dashboard', icon: <BarChart3 className="w-4 h-4 text-[#6c63ff]" /> },
    { label: 'QR Ticket Scanner Kiosk', view: 'scanner', icon: <QrCode className="w-4 h-4 text-amber-400" /> },
    { label: 'Command Center & Audit Logs', view: 'admin', icon: <ShieldAlert className="w-4 h-4 text-[#FF5A76]" /> },
    { label: 'View Purchased Pass & Tickets', view: 'tickets', icon: <Ticket className="w-4 h-4 text-cyan-400" /> },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-start justify-center pt-20 px-4 animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#14161d] border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10 gap-3">
          <Search className="w-5 h-5 text-[#6c63ff]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, search VIT-AP events, AB1, Vitopia..."
            className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none font-sans"
            autoFocus
          />
          <button 
            onClick={() => setCommandPaletteOpen(false)}
            className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2 space-y-4 font-mono">
          
          {/* Quick Actions */}
          {!query && (
            <div>
              <div className="px-3 py-1 text-[10px] text-slate-400 uppercase tracking-wider">
                Quick Navigation & Actions
              </div>
              <div className="mt-1 space-y-1">
                {quickActions.map(action => (
                  <button
                    key={action.label}
                    onClick={() => {
                      setActiveView(action.view);
                      setCommandPaletteOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 text-xs text-slate-200 hover:text-white transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      {action.icon}
                      <span className="font-medium">{action.label}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Events Search Matches */}
          <div>
            <div className="px-3 py-1 text-[10px] text-slate-400 uppercase tracking-wider">
              {query ? 'Matching Events' : 'Popular Featured Events'}
            </div>
            <div className="mt-1 space-y-1">
              {filteredEvents.map(evt => (
                <button
                  key={evt.id}
                  onClick={() => {
                    setSelectedEvent(evt);
                    setActiveView('event-detail');
                    setCommandPaletteOpen(false);
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 text-xs text-slate-200 hover:text-white transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <img src={evt.thumbnail} alt={evt.title} className="w-8 h-8 rounded-lg object-cover" />
                    <div className="text-left">
                      <p className="font-semibold text-white group-hover:text-[#00E5A8] transition-colors">{evt.title}</p>
                      <p className="text-[10px] text-slate-400">{evt.category} • {evt.location.venueName.split(' ')[0]}</p>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 bg-white/10 rounded-full text-slate-300">
                    {evt.priceFrom === 0 ? 'Free Pass' : `₹${evt.priceFrom}`}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Role Switch Shortcuts */}
          <div>
            <div className="px-3 py-1 text-[10px] text-slate-400 uppercase tracking-wider">
              Switch Role Context
            </div>
            <div className="grid grid-cols-2 gap-1 mt-1">
              {(['Club Lead & Organizer', 'Admin', 'Student Attendee', 'Sponsor & Vendor'] as const).map(role => (
                <button
                  key={role}
                  onClick={() => {
                    setRole(role);
                    setCommandPaletteOpen(false);
                  }}
                  className="flex items-center justify-between p-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-300 transition-colors"
                >
                  <span className="truncate">{role}</span>
                  <span className="text-[10px] text-slate-500">Role</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Hint */}
        <div className="px-4 py-2 border-t border-white/10 bg-white/[0.02] flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span>Navigate with ↑ ↓ and Enter</span>
          <span className="text-[10px] text-[#00E5A8]">EventSphere VIT-AP v2.4</span>
        </div>

      </div>
    </div>
  );
};
