import React from 'react';
import { Sparkles, Cpu, Code, Music, Trophy, Users, Palette, Layers, Globe } from 'lucide-react';
import type { EventCategory } from '../../types/event';

interface CategoryFilterProps {
  selectedCategory: EventCategory | 'All';
  onSelectCategory: (cat: EventCategory | 'All') => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, onSelectCategory }) => {
  const categories: { id: EventCategory | 'All'; label: string; icon: React.ReactNode }[] = [
    { id: 'All', label: 'All Events', icon: <Globe className="w-4 h-4" /> },
    { id: 'AI & Web3', label: 'AI & Web3', icon: <Cpu className="w-4 h-4" /> },
    { id: 'Tech Conferences', label: 'Tech Conferences', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'Hackathons', label: 'Hackathons', icon: <Code className="w-4 h-4" /> },
    { id: 'Design', label: 'Design & UX', icon: <Palette className="w-4 h-4" /> },
    { id: 'Concerts', label: 'Concerts', icon: <Music className="w-4 h-4" /> },
    { id: 'Sports', label: 'Sports & Gaming', icon: <Trophy className="w-4 h-4" /> },
    { id: 'Networking', label: 'Networking', icon: <Users className="w-4 h-4" /> },
    { id: 'Workshops', label: 'Workshops', icon: <Layers className="w-4 h-4" /> },
  ];

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar">
      {categories.map(cat => {
        const isSelected = selectedCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all duration-200 border ${
              isSelected 
                ? 'bg-gradient-to-r from-[#6c63ff] to-[#584ee4] border-[#6c63ff] text-white shadow-lg shadow-[#6c63ff]/25 scale-105' 
                : 'bg-white/5 border-white/10 text-slate-300 hover:text-white hover:bg-white/10 hover:border-white/20'
            }`}
          >
            {cat.icon}
            <span>{cat.label}</span>
          </button>
        );
      })}
    </div>
  );
};
