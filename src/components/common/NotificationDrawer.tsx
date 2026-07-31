import React from 'react';
import { X, Bell, Ticket, CheckCircle2, Info, AlertTriangle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const NotificationDrawer: React.FC = () => {
  const { notificationsDrawerOpen, setNotificationsDrawerOpen, notifications, markNotificationAsRead } = useApp();

  if (!notificationsDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end animate-in fade-in">
      <div className="w-full max-w-md bg-[#14161d] border-l border-white/10 h-full p-6 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#00E5A8]" />
            <h3 className="font-heading text-lg font-bold text-white">Notifications Center</h3>
          </div>
          <button 
            onClick={() => setNotificationsDrawerOpen(false)}
            className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {notifications.map(item => (
            <div 
              key={item.id}
              onClick={() => markNotificationAsRead(item.id)}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                item.read 
                  ? 'bg-white/5 border-white/5 opacity-70' 
                  : 'bg-gradient-to-r from-white/10 to-white/5 border-[#6c63ff]/40 shadow-lg shadow-[#6c63ff]/10'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-white/10 shrink-0 mt-0.5">
                  {item.type === 'ticket' && <Ticket className="w-4 h-4 text-[#00E5A8]" />}
                  {item.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  {item.type === 'alert' && <AlertTriangle className="w-4 h-4 text-[#FF5A76]" />}
                  {item.type === 'info' && <Info className="w-4 h-4 text-cyan-400" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-semibold text-white">{item.title}</h4>
                    <span className="text-[10px] text-slate-400 font-mono">{item.timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">{item.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-white/10 text-center">
          <button 
            onClick={() => notifications.forEach(n => markNotificationAsRead(n.id))}
            className="text-xs text-[#00E5A8] hover:underline font-mono"
          >
            Mark all as read
          </button>
        </div>

      </div>
    </div>
  );
};
