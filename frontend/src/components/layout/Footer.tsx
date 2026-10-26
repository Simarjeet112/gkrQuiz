import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Heart, Settings, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-white/10 py-8 px-4 sm:px-6 lg:px-8 bg-[#07090E] text-xs text-slate-500 font-mono select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo and Society */}
        <div className="flex items-center gap-3">
          <img src="/geekroom-logo.png" alt="Geekroom GTBIT" className="w-6 h-6 object-contain" />
          <span className="font-bold text-slate-200">GEEKROOM // CODE ARENA</span>
          <span className="text-slate-600">•</span>
          <span className="text-lime font-semibold">GTBIT Orientation 2026</span>
        </div>

        {/* Attribution */}
        <div className="flex items-center gap-1 text-[11px] text-slate-400">
          <span>Engineered by</span>
          <span className="text-white font-bold ml-1">Geekroom Technical Society</span>
        </div>

        {/* Organizer discreet link */}
        <div className="flex items-center gap-3 text-[11px]">
          <span className="text-slate-500">5 QUESTIONS · 90 PTS MAX</span>
          <span className="text-slate-700">|</span>
          <Link
            to="/organizer"
            className="flex items-center gap-1 text-slate-500 hover:text-lime transition-colors"
            title="Organizer Access"
          >
            <Settings className="w-3 h-3" />
            <span>Organizer Console</span>
          </Link>
        </div>
      </div>
    </footer>
  );
};
