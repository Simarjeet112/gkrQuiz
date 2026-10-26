import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Heart, Settings } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-arena-border py-8 px-4 sm:px-6 lg:px-8 bg-[#04060A]/90 text-xs text-slate-500 font-mono">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo and Society */}
        <div className="flex items-center gap-3">
          <img src="/geekroom-logo.png" alt="Geekroom GTBIT" className="w-6 h-6 object-contain" />
          <span className="font-semibold text-slate-300">GEEKROOM // CODE ARENA</span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-400">GTBIT Orientation 2026</span>
        </div>

        {/* Attribution */}
        <div className="flex items-center gap-1 text-[11px]">
          <span>Engineered with</span>
          <Heart className="w-3.5 h-3.5 text-arena-cyan fill-arena-cyan mx-1 inline" />
          <span>by Geekroom Technical Society</span>
        </div>

        {/* Organizer discreet link */}
        <div className="flex items-center gap-3 text-[11px]">
          <span className="text-slate-600">5 QUESTIONS · 90 PTS</span>
          <span className="text-slate-700">|</span>
          <Link
            to="/organizer"
            className="flex items-center gap-1 text-slate-500 hover:text-arena-cyan transition-colors"
            title="Organizer Access"
          >
            <Settings className="w-3 h-3" />
            <span>Organizer Settings</span>
          </Link>
        </div>
      </div>
    </footer>
  );
};
