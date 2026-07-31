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
  ChevronDown,
  Menu,
  X,
  MapPin
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const roles: UserRole[] = [
    'Guest',
    'Student Attendee',
    'Club Lead & Organizer',
    'Volunteer',
    'Faculty Coordinator',
    'Sponsor & Vendor',
    'Admin',
    'Super Admin'
  ];

  const mainNavItems: { id: ViewTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Sparkles className="w-4 h-4 text-[#00E5A8]" /> },
    { id: 'explore', label: 'Explore Events', icon: <Calendar className="w-4 h-4 text-[#6c63ff]" /> },
    { id: 'tickets', label: 'My Passes', icon: <Ticket className="w-4 h-4 text-cyan-400" /> },
    { id: 'dashboard', label: 'Clubs & Studio', icon: <BarChart3 className="w-4 h-4 text-amber-400" /> },
    { id: 'scanner', label: 'QR Scanner', icon: <QrCode className="w-4 h-4 text-emerald-400" /> },
  ];

  const secondaryNavItems: { id: ViewTab; label: string; icon: React.ReactNode }[] = [
    { id: 'networking', label: 'Student Networking', icon: <Users className="w-4 h-4 text-purple-400" /> },
    { id: 'certificates', label: 'Certificates', icon: <Award className="w-4 h-4 text-[#00E5A8]" /> },
    { id: 'admin', label: 'Command Center', icon: <ShieldAlert className="w-4 h-4 text-[#FF5A76]" /> },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/10 backdrop-blur-xl transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        
        {/* Brand & Campus Title */}
        <div 
          onClick={() => setActiveView('home')} 
          className="flex items-center gap-3.5 cursor-pointer group select-none shrink-0"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#6c63ff] via-[#00E5A8] to-[#9D4EDD] p-[1.5px] shadow-lg shadow-[#6c63ff]/20 transition-transform duration-300 group-hover:scale-105">
            <div className="w-full h-full bg-[#0d0e12] rounded-[13px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#00E5A8] animate-pulse-slow" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-300">
                EventSphere
              </span>
              <span className="px-2 py-0.5 text-[9px] font-bold bg-[#6c63ff]/20 text-[#00E5A8] border border-[#6c63ff]/40 rounded-full font-code uppercase">
                VIT-AP EDITION
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono tracking-wide flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-[#00E5A8]" />
              VIT-AP Campus • <span className="text-[#00E5A8] font-bold">Dev: G. Charan Teja</span>
            </p>
          </div>
        </div>

        {/* Clean Center Navigation Bar */}
        <nav className="hidden xl:flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full p-1.5 backdrop-blur-md">
          {mainNavItems.map(item => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                  isActive 
                    ? 'bg-gradient-to-r from-[#6c63ff] to-[#584ee4] text-white shadow-md shadow-[#6c63ff]/30 scale-[1.03]' 
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
        <div className="flex items-center gap-3 shrink-0">
          
          {/* Quick Command Palette Button (Ctrl + K) */}
          <button
            onClick={() => setCommandPaletteOpen(true)}
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-slate-300 hover:text-white hover:border-[#6c63ff] hover:bg-white/10 transition-all"
            title="Open Command Palette (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 text-[#00E5A8]" />
            <span className="font-mono">Search Campus...</span>
            <kbd className="px-1.5 py-0.5 text-[10px] bg-white/10 rounded text-slate-300 font-mono">⌘K</kbd>
          </button>

          {/* Notifications Trigger */}
          <button
            onClick={() => setNotificationsDrawerOpen(true)}
            className="relative p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4 text-cyan-400" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FF5A76] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            title="Toggle Light/Dark Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
          </button>

          {/* Role Switcher Menu */}
          <div className="relative">
            <button
              onClick={() => setRoleMenuOpen(!roleMenuOpen)}
              className="flex items-center gap-2 px-3.5 py-2 bg-gradient-to-r from-white/10 to-white/5 border border-white/15 rounded-xl text-xs text-white hover:border-[#6c63ff] transition-all font-mono"
            >
              <UserCheck className="w-3.5 h-3.5 text-[#00E5A8]" />
              <span className="font-semibold truncate max-w-[130px]">{user.role}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {roleMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-[#14161d] border border-white/15 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95">
                <div className="px-3 py-1.5 border-b border-white/10 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                  Select Role Context
                </div>
                {roles.map(r => (
                  <button
                    key={r}
                    onClick={() => {
                      setRole(r);
                      setRoleMenuOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between transition-colors ${
                      user.role === r 
                        ? 'bg-[#6c63ff]/20 text-[#00E5A8] font-bold' 
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

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#14161d] border-b border-white/10 p-4 space-y-2 animate-in slide-in-from-top">
          <div className="grid grid-cols-2 gap-2">
            {[...mainNavItems, ...secondaryNavItems].map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveView(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-semibold ${
                  activeView === item.id 
                    ? 'bg-[#6c63ff] text-white font-bold' 
                    : 'bg-white/5 text-slate-300 hover:bg-white/10'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

    </header>
  );
};
