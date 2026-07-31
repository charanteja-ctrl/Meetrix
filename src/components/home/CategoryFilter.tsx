import React from 'react';
import { Sparkles, Cpu, Code, Music, Trophy, Users, Palette, Globe } from 'lucide-react';
import type { EventCategory } from '../../types/event';

interface CategoryFilterProps {
  selectedCategory: EventCategory | 'All';
  onSelectCategory: (cat: EventCategory | 'All') => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, onSelectCategory }) => {
  const categories: { id: EventCategory | 'All'; label: string; icon: React.ReactNode }[] = [
    { id: 'All', label: 'All Campus Events', icon: <Globe className="w-4 h-4" /> },
    { id: 'Flagship Fests (Vitopia & VTAPP)', label: 'Vitopia & VTAPP', icon: <Sparkles className="w-4 h-4 text-[#00E5A8]" /> },
    { id: 'Technical & Hackathons', label: 'Hackathons & Coding', icon: <Code className="w-4 h-4 text-[#6c63ff]" /> },
    { id: 'Cultural & Pro-Nights', label: 'Pro-Nights & Music', icon: <Music className="w-4 h-4 text-pink-400" /> },
    { id: 'Conferences & EDPs', label: 'IEEE & Conferences', icon: <Cpu className="w-4 h-4 text-cyan-400" /> },
    { id: 'Clubs & Societies', label: '70+ Student Clubs', icon: <Users className="w-4 h-4 text-[#00E5A8]" /> },
    { id: 'Sports & Esports', label: 'Sports & Gaming', icon: <Trophy className="w-4 h-4 text-amber-400" /> },
    { id: 'Workshops & FDPs', label: 'Workshops & FDPs', icon: <Palette className="w-4 h-4 text-purple-400" /> },
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
                ? 'bg-gradient-to-r from-[#6c63ff] to-[#584ee4] border-[#6c63ff] text-white shadow-lg shadow-[#6c63ff]/25 scale-105 font-mono' 
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
