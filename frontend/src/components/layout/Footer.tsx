import React from 'react';
import { Terminal, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-arena-border py-8 px-4 sm:px-6 lg:px-8 bg-arena-bg/80 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-arena-violet" />
          <span className="font-semibold text-slate-400">GEEKROOM // CODE ARENA</span>
          <span>•</span>
          <span>GTBIT Orientation Edition</span>
        </div>

        <div className="flex items-center gap-1">
          <span>Engineered with</span>
          <Heart className="w-3.5 h-3.5 text-arena-greenNeon fill-arena-greenNeon mx-1 inline" />
          <span>by Geekroom GTBIT Technical Society</span>
        </div>

        <div className="text-[11px] font-mono text-slate-600">
          MAX_SCORE: 90 // 5 QUESTIONS // 1 SHOT
        </div>
      </div>
    </footer>
  );
};
