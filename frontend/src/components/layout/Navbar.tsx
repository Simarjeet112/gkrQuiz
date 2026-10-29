import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Trophy, Play, Volume2, VolumeX, Menu, X, Terminal, Radio } from 'lucide-react';
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
    <header className="sticky top-0 z-50 w-full bg-[#090D16]/90 backdrop-blur-xl border-b border-white/10 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand with official Geekroom Logo + Real Madrid & Chelsea Giant Badges */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-white/15 bg-[#101522] p-1.5 transition-all group-hover:border-[#00ff85] group-hover:scale-105 shadow-md">
              <img
                src="/geekroom-logo.png"
                alt="Geekroom GTBIT Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold tracking-wider text-base sm:text-lg text-white group-hover:text-[#00ff85] transition-colors font-display">
                  GEEKROOM
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-gradient-to-r from-[#034694] to-[#FEBE10] text-black font-black uppercase tracking-wider shadow-sm">
                  PL × UCL ARENA
                </span>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-slate-400">
                <span className="text-[#FEBE10] font-bold">REAL MADRID</span>
                <span className="text-white/40">⚡</span>
                <span className="text-[#00a5ff] font-bold">CHELSEA FC</span>
                <span className="text-slate-600">//</span>
                <span className="text-[#00ff85] font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00ff85] animate-pulse" />
                  MATCH DAY
                </span>
              </div>
            </div>
          </Link>

          {/* Big Club Badges */}
          <div className="hidden lg:flex items-center gap-2 pl-3 ml-2 border-l border-white/10">
            <div className="w-8 h-8 p-0.5 rounded-lg bg-white/5 border border-amber-400/30 flex items-center justify-center hover:scale-110 transition-transform cursor-pointer" title="Real Madrid CF (15x UCL Champions)">
              <img src="/real-madrid-logo.svg" alt="Real Madrid" className="w-full h-full object-contain drop-shadow" />
            </div>
            <div className="w-8 h-8 p-0.5 rounded-lg bg-white/5 border border-blue-500/30 flex items-center justify-center hover:scale-110 transition-transform cursor-pointer" title="Chelsea FC (Pride of London)">
              <img src="/chelsea-logo.svg" alt="Chelsea FC" className="w-full h-full object-contain drop-shadow" />
            </div>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-5">
          {/* Legend Quick Power Triggers: CR7, Hazard, Kanté */}
          <div className="hidden xl:flex items-center gap-2 px-2.5 py-1.5 rounded-2xl bg-white/5 border border-white/10 font-mono text-[10px]">
            <button
              onClick={() => sounds.playSiuuu()}
              className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition-all active:scale-95 shadow-sm"
              title="Cristiano Ronaldo (Real Madrid 5x Ballon d'Or) - Click for SIUUU!"
            >
              <img src="/ronaldo-ucl.jpg" alt="CR7" className="w-5 h-5 rounded-full object-cover border border-amber-400" />
              <span className="font-black">CR7 ⚽</span>
            </button>

            <button
              onClick={() => sounds.playHazardMagic()}
              className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/30 transition-all active:scale-95 shadow-sm"
              title="Eden Hazard (Chelsea #17 in the Snow) - Click for Silky Dribble!"
            >
              <img src="/hazard-snow.jpg" alt="Hazard" className="w-5 h-5 rounded-full object-cover border border-blue-400" />
              <span className="font-black">HAZARD 🪄</span>
            </button>

            <button
              onClick={() => sounds.playKanteTackle()}
              className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 transition-all active:scale-95 shadow-sm"
              title="N'Golo Kanté (Chelsea Engine // Sunglasses Explosion) - Click for Power Tackle!"
            >
              <img src="/kante-explosion.jpg" alt="Kanté" className="w-5 h-5 rounded-full object-cover border border-emerald-400" />
              <span className="font-black">KANTÉ 💥</span>
            </button>
          </div>

          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 text-xs font-mono font-bold transition-all py-1.5 px-3 rounded-lg ${
                  isActive
                    ? 'text-lime bg-lime/10 border border-lime/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {Icon && <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-lime' : 'text-slate-400'}`} />}
                {link.label}
              </Link>
            );
          })}

          {/* Sound Toggle with Live Equalizer */}
          <button
            onClick={handleToggleSound}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all ${
              isMuted
                ? 'bg-[#101522] text-slate-500 border-white/10 hover:text-slate-300'
                : 'bg-lime/10 text-lime border-lime/40'
            }`}
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            aria-label="Toggle Sound"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <div className="flex items-end gap-0.5 h-3.5">
                <span className="w-0.5 bg-lime rounded-full eq-bar-1" />
                <span className="w-0.5 bg-lime rounded-full eq-bar-2" />
                <span className="w-0.5 bg-lime rounded-full eq-bar-3" />
                <span className="w-0.5 bg-lime rounded-full eq-bar-4" />
              </div>
            )}
            <span className="text-[10px] font-mono uppercase font-bold">
              {isMuted ? 'AUDIO: OFF' : 'AUDIO: ON'}
            </span>
          </button>

          {/* Enter Arena CTA */}
          <Link
            to="/register"
            className="flex items-center gap-2 px-4 py-2 rounded-xl btn-primary text-xs"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>ENTER ARENA</span>
          </Link>
        </nav>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={handleToggleSound}
            className="p-2 rounded-lg bg-[#101522] border border-white/10 text-slate-400"
            aria-label="Toggle Sound"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-lime" />}
          </button>

          <Link
            to="/register"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg btn-primary text-xs"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>JOIN</span>
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg bg-[#101522] border border-white/10 text-slate-400 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0B0F19] px-4 py-4 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2 text-xs font-mono font-bold py-2.5 px-3 rounded-lg w-full ${
                  isActive
                    ? 'text-lime bg-lime/10 border border-lime/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {Icon && <Icon className="w-4 h-4" />}
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};
