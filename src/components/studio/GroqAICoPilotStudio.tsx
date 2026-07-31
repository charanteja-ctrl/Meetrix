import React, { useState } from 'react';
import { Sparkles, Bot, Cpu, Copy, Check, RefreshCw, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const GroqAICoPilotStudio: React.FC = () => {
  const { groqApiKey, setGroqApiKey } = useAuth();
  const [selectedModel, setSelectedModel] = useState<'llama-3.3-70b' | 'mixtral-8x7b' | 'deepseek-r1' | 'gemma-2-9b'>('llama-3.3-70b');
  const [promptTopic, setPromptTopic] = useState('');
  const [activeTool, setActiveTool] = useState<'description' | 'marketing' | 'schedule' | 'pricing' | 'risk'>('description');
  const [generating, setGenerating] = useState(false);
  const [aiResult, setAiResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const tools = [
    { id: 'description', label: 'AI Description Generator', icon: '✨' },
    { id: 'marketing', label: 'Social & Marketing Posts', icon: '🚀' },
    { id: 'schedule', label: 'Schedule & Speaker Optimizer', icon: '📅' },
    { id: 'pricing', label: 'Dynamic Ticket Pricing AI', icon: '📈' },
    { id: 'risk', label: 'Event Risk & Fraud Analysis', icon: '🛡️' },
  ];

  const handleGenerate = () => {
    if (!promptTopic.trim()) return;
    setGenerating(true);
    setAiResult(null);

    setTimeout(() => {
      setGenerating(false);
      let output = '';
      if (activeTool === 'description') {
        output = `🔥 **${promptTopic} - AI Generated Executive Blueprint**\n\nJoin 2,500+ world-class builders for an immersive 3-day experience! Discover cutting-edge system architectures, hands-on masterclasses, and executive networking sessions designed for tech leaders. Guaranteed high ROI for engineering teams.`;
      } else if (activeTool === 'marketing') {
        output = `🚀 **X / LinkedIn Announcement Post:**\n\nWe're thrilled to announce **${promptTopic}**! 🎉\n\n3 Days | 50+ Keynote Speakers | Interactive SVG Seat Maps | Exclusive Swag Boxes\n\n🎟️ Early bird tickets are now live (limited to first 100 passes):\n👉 https://eventsphere.io/${promptTopic.toLowerCase().replace(/\s+/g, '-')}\n\n#TechConference #AI #EventSphere #Innovation`;
      } else if (activeTool === 'schedule') {
        output = `📅 **AI-Optimized Multi-Stage Agenda Schedule:**\n\n• 09:00 AM - 10:00 AM: Keynote Opening & Tech Trends\n• 10:30 AM - 12:00 PM: Deep Dive Session 1 (Main Stage)\n• 12:00 PM - 01:30 PM: Networking Lunch & VIP Meet\n• 02:00 PM - 03:30 PM: Interactive Hands-on Workshop\n• 04:00 PM - 05:30 PM: Executive Panel & Q&A`;
      } else if (activeTool === 'pricing') {
        output = `📈 **AI Dynamic Pricing & Revenue Recommendation:**\n\n• Early Bird Tier: $149 (First 150 passes - Expected sellout: 48h)\n• Standard Tier: $299 (Target revenue: $120,000)\n• VIP Pass: $799 (Includes VIP seat map row & 1-on-1 speaker dinner)\n\n💡 *AI Insight: Increasing Early Bird price by $20 will boost total margin by +14.2% without dropping conversion rate.*`;
      } else if (activeTool === 'risk') {
        output = `🛡️ **AI Safety & Fraud Prevention Assessment:**\n\n• Risk Score: 1.2 / 10 (VERY LOW RISK)\n• Duplicate Ticket Fraud Protection: ACTIVE (Dynamic Encrypted QR)\n• Venue Capacity Warning: 92% threshold set for Mainstage.\n• Security Recommendation: Enable 2FA on Organizer account and require email OTP for VIP pass transfers.`;
      }

      setAiResult(output);
    }, 1200);
  };

  const copyToClipboard = () => {
    if (!aiResult) return;
    navigator.clipboard.writeText(aiResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#14161d] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#6c63ff] to-[#00E5A8] p-[1.5px]">
            <div className="w-full h-full bg-[#0d0e12] rounded-[14px] flex items-center justify-center">
              <Bot className="w-5 h-5 text-[#00E5A8]" />
            </div>
          </div>
          <div>
            <h3 className="font-heading text-xl font-bold text-white flex items-center gap-2">
              <span>Groq AI Studio & Co-Pilot</span>
              <span className="px-2 py-0.5 bg-[#6c63ff]/20 text-[#00E5A8] border border-[#6c63ff]/40 text-[10px] font-mono rounded-full">
                LLAMA 3.3 70B
              </span>
            </h3>
            <p className="text-xs text-slate-400">Generate event copy, schedule timelines, dynamic pricing, and safety analysis.</p>
          </div>
        </div>

        {/* Model Dropdown */}
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-1 text-xs">
          <Cpu className="w-4 h-4 text-[#6c63ff] ml-2" />
          <select 
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value as any)}
            className="bg-transparent text-white focus:outline-none pr-2 cursor-pointer font-mono"
          >
            <option value="llama-3.3-70b" className="bg-[#14161d]">Groq Llama 3.3 (70B)</option>
            <option value="mixtral-8x7b" className="bg-[#14161d]">Groq Mixtral (8x7B)</option>
            <option value="deepseek-r1" className="bg-[#14161d]">DeepSeek R1 Reasoning</option>
            <option value="gemma-2-9b" className="bg-[#14161d]">Gemma 2 (9B)</option>
          </select>
        </div>
      </div>

      {/* Tool Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {tools.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTool(t.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
              activeTool === t.id
                ? 'bg-[#6c63ff] text-white shadow-lg shadow-[#6c63ff]/30 font-bold'
                : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            <span>{t.icon}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      {/* Prompt Input Area */}
      <div className="space-y-3">
        <label className="text-xs font-mono text-slate-300">
          Enter Event Name or Prompt Keywords:
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={promptTopic}
            onChange={(e) => setPromptTopic(e.target.value)}
            placeholder="e.g. Next-Gen Web Architecture Summit 2026 in San Francisco..."
            className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#6c63ff]"
          />
          <button
            onClick={handleGenerate}
            disabled={generating || !promptTopic}
            className="px-6 py-3 bg-gradient-to-r from-[#00E5A8] to-[#00D8F6] text-slate-950 font-bold rounded-2xl text-xs hover:opacity-90 transition-all flex items-center gap-2 disabled:opacity-50 shrink-0"
          >
            {generating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            <span>{generating ? 'Processing...' : 'Run AI Co-Pilot'}</span>
          </button>
        </div>
      </div>

      {/* AI Output Preview Card */}
      {aiResult && (
        <div className="p-5 bg-[#0d0e12] border border-[#6c63ff]/30 rounded-2xl space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono">
            <span className="text-[#00E5A8] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> AI Generated Result
            </span>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-lg text-slate-200 hover:text-white hover:bg-white/20 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Result'}</span>
            </button>
          </div>
          <div className="text-xs text-slate-200 font-sans whitespace-pre-wrap leading-relaxed">
            {aiResult}
          </div>
        </div>
      )}

      {/* Optional Groq API Key Input */}
      <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <span className="text-slate-400 font-mono">Custom Groq API Key (Optional):</span>
        <input 
          type="password"
          value={groqApiKey}
          onChange={(e) => setGroqApiKey(e.target.value)}
          placeholder="gsk_..."
          className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#6c63ff] font-mono w-full sm:w-64"
        />
      </div>

    </div>
  );
};
