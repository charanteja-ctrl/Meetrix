import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  Bell, 
  Sun, 
  Moon, 
  UserCheck, 
  Calendar, 
  Ticket, 
  BarChart3, 
  ShieldAlert, 
  QrCode, 
  Users, 
  Award,
  ChevronDown
} from 'lucide-react';
import { useApp, type ViewTab } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import type { UserRole } from '../../types/event';

export const Navbar: React.FC = () => {
  const { activeView, setActiveView, setCommandPaletteOpen, notifications, setNotificationsDrawerOpen } = useApp();
  const { user, setRole } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const roles: UserRole[] = ['Guest', 'Attendee', 'Organizer', 'Volunteer', 'Vendor', 'Sponsor', 'Admin', 'Super Admin'];

  const navItems: { id: ViewTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'explore', label: 'Explore Events', icon: <Calendar className="w-4 h-4" /> },
    { id: 'tickets', label: 'My Tickets', icon: <Ticket className="w-4 h-4" /> },
    { id: 'dashboard', label: 'Organizer Studio', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'networking', label: 'Networking', icon: <Users className="w-4 h-4" /> },
    { id: 'scanner', label: 'QR Scanner', icon: <QrCode className="w-4 h-4" /> },
    { id: 'certificates', label: 'Certificates', icon: <Award className="w-4 h-4" /> },
    { id: 'admin', label: 'Command Center', icon: <ShieldAlert className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/10 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveView('home')} 
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#6c63ff] via-[#00E5A8] to-[#9D4EDD] p-[1.5px] transition-transform duration-300 group-hover:scale-105">
            <div className="w-full h-full bg-[#0d0e12] rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#00E5A8] animate-pulse-slow" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-heading text-lg font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
                EventSphere
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-[#6c63ff]/20 text-[#6c63ff] border border-[#6c63ff]/40 rounded-full font-code">
                PRO
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono tracking-wider">ENTERPRISE SAAS</p>
          </div>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/5 border border-white/10 rounded-full p-1">
          {navItems.map(item => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  isActive 
                    ? 'bg-gradient-to-r from-[#6c63ff] to-[#584ee4] text-white shadow-lg shadow-[#6c63ff]/25 scale-[1.02]' 
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Tools & Role Switcher */}
        <div className="flex items-center gap-3">
          
          {/* Quick Command Palette Button (Ctrl + K) */}
          <button
            onClick={() => setCommandPaletteOpen(true)}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Open Command Palette (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span>Search...</span>
            <kbd className="px-1.5 py-0.5 text-[10px] bg-white/10 rounded text-slate-300 font-mono">⌘K</kbd>
          </button>

          {/* Notifications Trigger */}
          <button
            onClick={() => setNotificationsDrawerOpen(true)}
            className="relative p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FF5A76] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            title="Toggle Light/Dark Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
          </button>

          {/* Role Switcher Menu */}
          <div className="relative">
            <button
              onClick={() => setRoleMenuOpen(!roleMenuOpen)}
              className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-white/10 to-white/5 border border-white/15 rounded-xl text-xs text-white hover:border-[#6c63ff] transition-all"
            >
              <UserCheck className="w-3.5 h-3.5 text-[#00E5A8]" />
              <span className="font-semibold">{user.role}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {roleMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#14161d] border border-white/10 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95">
                <div className="px-3 py-1.5 border-b border-white/10 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                  Switch Active Role
                </div>
                {roles.map(r => (
                  <button
                    key={r}
                    onClick={() => {
                      setRole(r);
                      setRoleMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors ${
                      user.role === r 
                        ? 'bg-[#6c63ff]/20 text-[#00E5A8] font-semibold' 
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span>{r}</span>
                    {user.role === r && <span className="w-1.5 h-1.5 rounded-full bg-[#00E5A8]"></span>}
                  </button>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
