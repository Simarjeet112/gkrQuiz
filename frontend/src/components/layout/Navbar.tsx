import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Trophy, Play, Volume2, VolumeX, Menu, X, Terminal } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(sounds.getMuted());

  const handleToggleSound = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
    if (!muted) sounds.playClick();
  };

  const navLinks = [
    { label: 'Arena Home', path: '/' },
    { label: 'Leaderboard', path: '/leaderboard', icon: Trophy },
  ];

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-arena-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand with official Geekroom Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-arena-cyan/40 bg-[#0B0F19] p-1 shadow-glow-cyan group-hover:scale-105 transition-all">
            <img
              src="/geekroom-logo.png"
              alt="Geekroom GTBIT Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-wider text-base sm:text-lg text-white group-hover:text-arena-cyan transition-colors font-sans">
                GEEKROOM
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-arena-cyan/15 text-arena-cyan font-mono border border-arena-cyan/30">
                GTBIT 2026
              </span>
            </div>
            <div className="text-[10px] font-mono tracking-widest text-arena-greenNeon">
              CODE ARENA
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-5">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 text-xs font-mono font-medium transition-colors py-1.5 px-3 rounded-lg ${
                  isActive
                    ? 'text-arena-cyan bg-arena-cyan/10 border border-arena-cyan/30 shadow-glow-cyan'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5 text-arena-cyan" />}
                {link.label}
              </Link>
            );
          })}

          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            className={`p-2 rounded-xl border transition-colors ${
              isMuted
                ? 'bg-white/5 text-slate-500 border-white/10 hover:text-slate-300'
                : 'bg-arena-cyan/10 text-arena-cyan border-arena-cyan/30 shadow-glow-cyan'
            }`}
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            aria-label="Toggle Sound"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Enter Arena CTA */}
          <Link
            to="/register"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-arena-cyan to-arena-cyanDark hover:from-cyan-300 hover:to-arena-cyan text-slate-950 text-xs font-mono font-bold shadow-glow-cyan transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <Play className="w-3.5 h-3.5 fill-slate-950" />
            <span>ENTER ARENA</span>
          </Link>
        </nav>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={handleToggleSound}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
            aria-label="Toggle Sound"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-arena-cyan" />}
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden glass-panel border-b border-arena-border px-4 py-4 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive ? 'text-arena-cyan bg-arena-cyan/10' : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                {Icon && <Icon className="w-4 h-4 text-arena-cyan" />}
                {link.label}
              </Link>
            );
          })}

          <Link
            to="/register"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-arena-cyan text-slate-950 font-bold text-xs shadow-glow-cyan"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>ENTER ARENA</span>
          </Link>
        </div>
      )}
    </header>
  );
};
