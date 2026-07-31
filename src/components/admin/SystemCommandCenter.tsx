import React, { useState } from 'react';
import { ShieldAlert, Cpu, ToggleLeft, ToggleRight, Terminal } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const SystemCommandCenter: React.FC = () => {
  const { user } = useAuth();
  
  const [featureFlags, setFeatureFlags] = useState({
    svgSeatMap: true,
    groqAiCopilot: true,
    stripePayouts: true,
    qrAttendanceScanner: true,
    networkingMatchmaker: true,
    certificateEngine: true,
    ticketResaleMarketplace: false,
  });

  const toggleFlag = (flag: keyof typeof featureFlags) => {
    setFeatureFlags(prev => ({ ...prev, [flag]: !prev[flag] }));
  };

  const auditLogs = [
    { time: '10:22:04 AM', actor: 'Alex Rivera (Super Admin)', action: 'ENABLED_FEATURE_FLAG: Groq Llama 3.3 Engine', ip: '192.168.1.1' },
    { time: '10:18:40 AM', actor: 'Elena Rostova (Organizer)', action: 'UPDATED_EVENT_SLUG: global-tech-summit-2026', ip: '172.56.21.9' },
    { time: '10:05:12 AM', actor: 'System Auto Guard', action: 'PASSKEY_VERIFIED: MFA Session Validated', ip: '10.0.0.1' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="p-6 bg-[#14161d] border border-[#FF5A76]/40 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-[#FF5A76]/20 border border-[#FF5A76]/40 text-[#FF5A76]">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-heading text-xl font-bold text-white flex items-center gap-2">
              <span>Super Admin & System Command Center</span>
              <span className="px-2 py-0.5 bg-[#FF5A76]/20 text-[#FF5A76] text-[10px] font-mono rounded-full font-bold">
                HIGH PRIVILEGE MODE
              </span>
            </h3>
            <p className="text-xs text-slate-400">Manage global feature toggles, system logs, role permissions & database metrics.</p>
          </div>
        </div>

        <div className="text-right font-mono text-xs text-slate-400">
          <p>Active Session: <span className="text-white font-bold">{user.name}</span></p>
          <p className="text-emerald-400 font-semibold mt-0.5">Role: {user.role}</p>
        </div>
      </div>

      {/* Feature Flags Grid */}
      <div className="p-6 bg-[#14161d] border border-white/10 rounded-3xl space-y-4">
        <h4 className="font-heading text-base font-bold text-white flex items-center gap-2">
          <Cpu className="w-5 h-5 text-[#6c63ff]" />
          <span>Global Feature Flags & Control Toggles</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Object.entries(featureFlags).map(([key, enabled]) => (
            <div 
              key={key}
              onClick={() => toggleFlag(key as any)}
              className="p-3.5 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between cursor-pointer hover:border-white/20 transition-all"
            >
              <div>
                <p className="text-xs font-bold text-white font-mono capitalize">
                  {key.replace(/([A-Z])/g, ' $1')}
                </p>
                <p className="text-[10px] text-slate-400">
                  {enabled ? 'Active across all user sessions' : 'Disabled globally for maintenance'}
                </p>
              </div>

              <div className={`p-1.5 rounded-xl ${enabled ? 'text-[#00E5A8]' : 'text-slate-600'}`}>
                {enabled ? <ToggleRight className="w-7 h-7" /> : <ToggleLeft className="w-7 h-7" />}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Audit Stream Logs */}
      <div className="p-6 bg-[#14161d] border border-white/10 rounded-3xl space-y-3">
        <h4 className="font-heading text-base font-bold text-white flex items-center gap-2">
          <Terminal className="w-5 h-5 text-cyan-400" />
          <span>System Audit Logs & Security Traces</span>
        </h4>

        <div className="p-4 bg-[#0d0e12] border border-white/10 rounded-2xl space-y-2 font-mono text-xs">
          {auditLogs.map((log, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 py-1.5 border-b border-white/5 last:border-none">
              <div className="flex items-center gap-2">
                <span className="text-slate-500">{log.time}</span>
                <span className="text-white font-semibold">{log.actor}</span>
              </div>
              <span className="text-[#00E5A8]">{log.action}</span>
              <span className="text-slate-600 text-[10px]">{log.ip}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
