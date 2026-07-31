import React, { useState } from 'react';
import { MessageSquare, Sparkles, ShieldCheck, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

export const NetworkingView: React.FC = () => {
  const [activeChatUser, setActiveChatUser] = useState<string | null>(null);
  const [messages, setMessages] = useState<string[]>(['Hey Alex! Interested in your session on sub-50ms edge event streaming.']);
  const [inputMsg, setInputMsg] = useState('');

  const attendees = [
    { id: 'att-1', name: 'Dr. Elena Rostova', title: 'Chief AI Architect @ Neural Dynamics', matchScore: '98%', tags: ['Agentic AI', 'PyTorch', 'Distributed Systems'], avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80' },
    { id: 'att-2', name: 'Marcus Vance', title: 'VP of Infrastructure @ Vercel / Stripe', matchScore: '94%', tags: ['Edge Computing', 'Realtime Engines'], avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80' },
    { id: 'att-3', name: 'Sarah Chen', title: 'Design Director @ Linear Studio', matchScore: '91%', tags: ['UI/UX Design', 'Framer Motion'], avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80' }
  ];

  const handleSendMessage = () => {
    if (!inputMsg.trim()) return;
    setMessages(prev => [...prev, inputMsg]);
    setInputMsg('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="font-heading text-3xl font-extrabold text-white">Attendee Networking & AI Matchmaking</h1>
          <p className="text-xs text-slate-400 mt-1 font-mono">Connect with 5,000+ tech leaders, exchange virtual business cards & schedule 1-on-1 meetings.</p>
        </div>
      </div>

      {/* Attendees Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {attendees.map(a => (
          <div key={a.id} className="p-6 bg-[#14161d] border border-white/10 rounded-3xl space-y-4 hover:border-[#6c63ff] transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <img src={a.avatar} alt={a.name} className="w-14 h-14 rounded-2xl object-cover border border-white/20" />
                <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#00E5A8]" />
                  {a.matchScore} AI Match
                </span>
              </div>

              <div>
                <h3 className="font-heading text-base font-bold text-white flex items-center gap-1.5">
                  <span>{a.name}</span>
                  <ShieldCheck className="w-4 h-4 text-[#00E5A8]" />
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">{a.title}</p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {a.tags.map(t => (
                  <span key={t} className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-md text-[10px] font-mono text-slate-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 pt-4 border-t border-white/10">
              <button
                onClick={() => {
                  setActiveChatUser(a.name);
                }}
                className="flex-1 py-2 bg-[#6c63ff] hover:bg-[#584ee4] text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Message</span>
              </button>
              <button
                onClick={() => {
                  confetti({ particleCount: 40 });
                  alert(`Virtual Business Card Exchanged with ${a.name}!`);
                }}
                className="px-3 py-2 bg-white/10 hover:bg-white/20 border border-white/15 text-white rounded-xl text-xs font-mono font-bold"
                title="Exchange Card"
              >
                📇
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Direct Messaging Drawer/Modal */}
      {activeChatUser && (
        <div className="p-6 bg-[#14161d] border border-[#6c63ff]/40 rounded-3xl space-y-4 animate-in fade-in max-w-xl mx-auto shadow-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h4 className="font-heading text-sm font-bold text-white">Chat with {activeChatUser}</h4>
            <button onClick={() => setActiveChatUser(null)} className="text-xs text-slate-400 hover:text-white font-mono">Close</button>
          </div>

          <div className="h-48 overflow-y-auto space-y-2 p-3 bg-[#0d0e12] rounded-2xl border border-white/10 text-xs font-mono">
            {messages.map((m, idx) => (
              <div key={idx} className="p-2 bg-white/5 rounded-xl text-slate-200">
                {m}
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={inputMsg}
              onChange={e => setInputMsg(e.target.value)}
              placeholder="Write a message..."
              className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#6c63ff]"
            />
            <button
              onClick={handleSendMessage}
              className="px-4 py-2 bg-[#00E5A8] text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
