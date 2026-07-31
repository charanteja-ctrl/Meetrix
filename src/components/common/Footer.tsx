import React from 'react';
import { Sparkles, Code, Globe, Share2, ShieldCheck, Cpu } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { setActiveView } = useApp();

  return (
    <footer className="border-t border-white/10 bg-[#0a0b0e] pt-16 pb-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#6c63ff] to-[#00E5A8] p-[1px]">
                <div className="w-full h-full bg-[#0d0e12] rounded-[11px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[#00E5A8]" />
                </div>
              </div>
              <span className="font-heading text-xl font-bold text-white tracking-tight">EventSphere</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              The production-ready, enterprise-grade Event SaaS Platform. Engineered with high-concurrency ticket engine, visual SVG seat map, live QR attendance scanner, Groq AI co-pilot, and Stripe finance.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-[10px] font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                Systems Operational • 99.99% Uptime
              </span>
              <span className="flex items-center gap-1 px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-slate-300 text-[10px] font-mono">
                <Cpu className="w-3 h-3 text-[#6c63ff]" />
                Groq Llama 3 Engine
              </span>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-heading text-sm font-semibold text-white mb-3">Product Modules</h4>
            <ul className="space-y-2 font-sans">
              <li><button onClick={() => setActiveView('explore')} className="hover:text-white transition-colors">Event Discovery</button></li>
              <li><button onClick={() => setActiveView('dashboard')} className="hover:text-white transition-colors">Organizer Studio</button></li>
              <li><button onClick={() => setActiveView('scanner')} className="hover:text-white transition-colors">QR Attendance Kiosk</button></li>
              <li><button onClick={() => setActiveView('networking')} className="hover:text-white transition-colors">AI Matchmaking</button></li>
              <li><button onClick={() => setActiveView('certificates')} className="hover:text-white transition-colors">Certificate Engine</button></li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="font-heading text-sm font-semibold text-white mb-3">Enterprise Roles</h4>
            <ul className="space-y-2 font-sans">
              <li><span className="hover:text-white cursor-pointer">For Tech Conferences</span></li>
              <li><span className="hover:text-white cursor-pointer">For Hackathons & Clash</span></li>
              <li><span className="hover:text-white cursor-pointer">For Concerts & Arenas</span></li>
              <li><span className="hover:text-white cursor-pointer">For Enterprise Agencies</span></li>
              <li><span className="hover:text-white cursor-pointer">White-Label Custom Domains</span></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-heading text-sm font-semibold text-white mb-3">Stay Connected</h4>
            <p className="text-[11px] text-slate-400 mb-3">Subscribe for weekly event management insights & AI features.</p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed to EventSphere Insider!'); }} className="space-y-2">
              <input 
                type="email" 
                placeholder="enter@company.com" 
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#6c63ff]"
              />
              <button 
                type="submit"
                className="w-full py-2 bg-gradient-to-r from-[#6c63ff] to-[#584ee4] text-white rounded-xl font-semibold text-xs hover:shadow-lg hover:shadow-[#6c63ff]/30 transition-all"
              >
                Join EventSphere Insider
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} EventSphere Inc. All rights reserved. Designed with Linear + Stripe + Apple aesthetics.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <ShieldCheck className="w-4 h-4 text-[#00E5A8]" />
            <span>SOC2 Type II Certified</span>
            <span>•</span>
            <Code className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
            <Globe className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
            <Share2 className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
          </div>
        </div>

      </div>
    </footer>
  );
};
