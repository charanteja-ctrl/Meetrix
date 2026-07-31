import React, { createContext, useContext, useState, useEffect } from 'react';
import type { UserProfile, UserRole } from '../types/event';

interface AuthContextType {
  user: UserProfile;
  setRole: (role: UserRole) => void;
  updateUser: (fields: Partial<UserProfile>) => void;
  addXP: (amount: number) => void;
  groqApiKey: string;
  setGroqApiKey: (key: string) => void;
  supabaseUrl: string;
  setSupabaseUrl: (url: string) => void;
  supabaseAnonKey: string;
  setSupabaseAnonKey: (key: string) => void;
}

const DEFAULT_USER: UserProfile = {
  id: 'usr-9921',
  name: 'Alex Rivera',
  email: 'alex.rivera@eventsphere.io',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  role: 'Organizer',
  bio: 'Lead Event Architect & Staff Systems Engineer.',
  company: 'EventSphere Core',
  title: 'Senior Event Producer',
  xp: 2450,
  badges: ['VIP Founder', 'Event Pro', 'Early Adopter', 'Verified Host'],
  mfaEnabled: true,
  walletBalance: 1450.00
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('eventsphere_user');
    return saved ? JSON.parse(saved) : DEFAULT_USER;
  });

  const [groqApiKey, setGroqApiKey] = useState<string>(() => {
    return localStorage.getItem('eventsphere_groq_key') || '';
  });

  const [supabaseUrl, setSupabaseUrl] = useState<string>(() => {
    return localStorage.getItem('eventsphere_sb_url') || '';
  });

  const [supabaseAnonKey, setSupabaseAnonKey] = useState<string>(() => {
    return localStorage.getItem('eventsphere_sb_key') || '';
  });

  useEffect(() => {
    localStorage.setItem('eventsphere_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('eventsphere_groq_key', groqApiKey);
  }, [groqApiKey]);

  useEffect(() => {
    localStorage.setItem('eventsphere_sb_url', supabaseUrl);
  }, [supabaseUrl]);

  useEffect(() => {
    localStorage.setItem('eventsphere_sb_key', supabaseAnonKey);
  }, [supabaseAnonKey]);

  const setRole = (role: UserRole) => {
    setUser(prev => ({ ...prev, role }));
  };

  const updateUser = (fields: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...fields }));
  };

  const addXP = (amount: number) => {
    setUser(prev => ({ ...prev, xp: prev.xp + amount }));
  };

  return (
    <AuthContext.Provider value={{
      user,
      setRole,
      updateUser,
      addXP,
      groqApiKey,
      setGroqApiKey,
      supabaseUrl,
      setSupabaseUrl,
      supabaseAnonKey,
      setSupabaseAnonKey
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
