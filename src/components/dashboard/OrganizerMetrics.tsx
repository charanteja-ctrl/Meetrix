import React from 'react';
import { DollarSign, Ticket, Users, TrendingUp, ArrowUpRight } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

export const OrganizerMetrics: React.FC = () => {
  const chartData = [
    { day: 'Mon', revenue: 14200, bookings: 45 },
    { day: 'Tue', revenue: 22800, bookings: 78 },
    { day: 'Wed', revenue: 38500, bookings: 120 },
    { day: 'Thu', revenue: 49000, bookings: 165 },
    { day: 'Fri', revenue: 78200, bookings: 240 },
    { day: 'Sat', revenue: 95400, bookings: 310 },
    { day: 'Sun', revenue: 124000, bookings: 420 },
  ];

  return (
    <div className="space-y-6">
      
      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Gross Revenue', value: '$425,800', change: '+24.5%', positive: true, icon: <DollarSign className="w-5 h-5 text-[#00E5A8]" /> },
          { label: 'Total Tickets Sold', value: '4,890 / 5,000', change: '+18.2%', positive: true, icon: <Ticket className="w-5 h-5 text-[#6c63ff]" /> },
          { label: 'Check-in Attendance Rate', value: '94.2%', change: '+3.1%', positive: true, icon: <Users className="w-5 h-5 text-cyan-400" /> },
          { label: 'Conversion Funnel ROI', value: '14.8x', change: '+1.4x', positive: true, icon: <TrendingUp className="w-5 h-5 text-amber-400" /> },
        ].map((m, i) => (
          <div key={i} className="p-5 rounded-2xl bg-[#14161d] border border-white/10 space-y-3 hover:border-white/20 transition-all">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                {m.icon}
              </div>
              <span className={`text-xs font-mono font-semibold flex items-center gap-0.5 px-2 py-0.5 rounded-full ${
                m.positive ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400'
              }`}>
                {m.change}
                <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>

            <div>
              <p className="text-xs text-slate-400 font-mono">{m.label}</p>
              <p className="font-heading text-2xl font-extrabold text-white mt-1">{m.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue & Ticket Sales Graph */}
      <div className="p-6 bg-[#14161d] border border-white/10 rounded-3xl space-y-4 shadow-xl">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <h3 className="font-heading text-lg font-bold text-white">Revenue Growth & Ticket Pacing</h3>
            <p className="text-xs text-slate-400">7-Day Realtime Stripe Payout Stream & VIP Tier Booking Trends</p>
          </div>
          <span className="px-3 py-1 bg-[#6c63ff]/20 text-[#00E5A8] border border-[#6c63ff]/40 text-[10px] font-mono rounded-full">
            STRIPE LIVE SYNC
          </span>
        </div>

        <div className="h-64 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6c63ff" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#6c63ff" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="day" stroke="#64748b" fontSize={12} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0d0e12', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                labelStyle={{ color: '#fff', fontWeight: 'bold' }}
              />
              <Area type="monotone" dataKey="revenue" stroke="#00E5A8" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};
