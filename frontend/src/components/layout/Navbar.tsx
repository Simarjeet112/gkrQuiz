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
    { label: '⏳ NETFLIX DARK', path: '/dark' },
    { label: '👑 WHY CR7 > ALL', path: '/cr7-goat' },
    { label: 'Live Leaderboard', path: '/leaderboard', icon: Trophy },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-charcoal/95 backdrop-blur-xl border-b border-emerald-500/20 text-warmCream select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand with Dark Triquetra Logo + Real Madrid & Chelsea Giant Badges */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-emerald-500/40 bg-black p-1 transition-all group-hover:border-amber-400 group-hover:scale-105 shadow-md">
              <img
                src="/dark-triquetra.png"
                alt="Code Arena Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold tracking-wider text-base sm:text-lg text-warmCream group-hover:text-amber-400 transition-colors font-display">
                  CODE ARENA
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-gradient-to-r from-forestGreen to-burntOrange text-warmCream font-black uppercase tracking-wider shadow-sm border border-emerald-500/30">
                  MADRID × CHELSEA
                </span>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-warmCream/70">
                <span className="text-amber-400 font-bold">REAL MADRID</span>
                <span className="text-warmCream/40">💙</span>
                <span className="text-cyan-400 font-bold">CHELSEA FC</span>
                <span className="text-warmCream/30">•</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  POSTGRES LIVE
                </span>
              </div>
            </div>
          </Link>

          {/* Big Club Badges */}
          <div className="hidden lg:flex items-center gap-2 pl-3 ml-2 border-l border-white/10">
            <div className="w-8 h-8 p-0.5 rounded-lg bg-black/40 border border-amber-400/30 flex items-center justify-center hover:scale-110 transition-transform cursor-pointer" title="Real Madrid CF (15x UCL Champions)">
              <img src="/real-madrid-logo.svg" alt="Real Madrid" className="w-full h-full object-contain drop-shadow" />
            </div>
            <div className="w-8 h-8 p-0.5 rounded-lg bg-black/40 border border-blue-500/30 flex items-center justify-center hover:scale-110 transition-transform cursor-pointer" title="Chelsea FC (Pride of London)">
              <img src="/chelsea-logo.svg" alt="Chelsea FC" className="w-full h-full object-contain drop-shadow" />
            </div>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-5">
          {/* Legend Quick Power Triggers: CR7, Hazard, Kanté */}
          <div className="hidden xl:flex items-center gap-2 px-2.5 py-1.5 rounded-2xl bg-black/40 border border-white/10 font-mono text-[10px]">
            <button
              onClick={() => sounds.playSiuuu()}
              className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 transition-all active:scale-95 shadow-sm"
              title="Cristiano Ronaldo (Real Madrid 5x Ballon d'Or) - Click for SIUUU!"
            >
              <img src="/ronaldo-ucl.jpg" alt="CR7" className="w-5 h-5 rounded-full object-cover border border-amber-400" />
              <span className="font-black">CR7 ⚽</span>
            </button>

            <button
              onClick={() => sounds.playHazardMagic()}
              className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-500/15 hover:bg-blue-500/25 text-blue-300 border border-blue-500/30 transition-all active:scale-95 shadow-sm"
              title="Eden Hazard (Chelsea #17 in the Snow) - Click for Silky Dribble!"
            >
              <img src="/hazard-snow.jpg" alt="Hazard" className="w-5 h-5 rounded-full object-cover border border-blue-400" />
              <span className="font-black">HAZARD 🪄</span>
            </button>

            <button
              onClick={() => sounds.playKanteTackle()}
              className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 transition-all active:scale-95 shadow-sm"
              title="N'Golo Kanté (Chelsea Engine) - Click for Power Tackle!"
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
                className={`flex items-center gap-2 text-xs font-mono font-bold transition-all py-1.5 px-3 rounded-xl ${
                  isActive
                    ? 'text-amber-300 bg-amber-500/15 border border-amber-500/40'
                    : 'text-warmCream/70 hover:text-warmCream hover:bg-white/5'
                }`}
              >
                {Icon && <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-warmCream/60'}`} />}
                {link.label}
              </Link>
            );
          })}

          {/* Sound Toggle with Live Equalizer */}
          <button
            onClick={handleToggleSound}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all ${
              isMuted
                ? 'bg-black/40 text-warmCream/40 border-white/10 hover:text-warmCream/70'
                : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40 shadow-sm'
            }`}
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            aria-label="Toggle Sound"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <div className="flex items-end gap-0.5 h-3.5">
                <span className="w-0.5 bg-emerald-400 rounded-full eq-bar-1" />
                <span className="w-0.5 bg-emerald-400 rounded-full eq-bar-2" />
                <span className="w-0.5 bg-emerald-400 rounded-full eq-bar-3" />
                <span className="w-0.5 bg-emerald-400 rounded-full eq-bar-4" />
              </div>
            )}
            <span className="text-[10px] font-mono uppercase font-bold">
              {isMuted ? 'OASIS: OFF' : 'OASIS: ON'}
            </span>
          </button>

          {/* Enter Arena CTA */}
          <Link
            to="/register"
            className="flex items-center gap-2 px-4 py-2 rounded-xl btn-burnt-orange text-xs font-black shadow-md"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>PLAY QUIZ</span>
          </Link>
        </nav>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={handleToggleSound}
            className="p-2 rounded-xl bg-black/40 border border-white/10 text-warmCream/70"
            aria-label="Toggle Sound"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          <Link
            to="/register"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl btn-burnt-orange text-xs font-bold"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>PLAY</span>
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-xl bg-black/40 border border-white/10 text-warmCream/70 hover:text-warmCream"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-charcoal px-4 py-4 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2 text-xs font-mono font-bold py-2.5 px-3 rounded-xl w-full ${
                  isActive
                    ? 'text-amber-300 bg-amber-500/15 border border-amber-500/40'
                    : 'text-warmCream/70 hover:text-warmCream hover:bg-white/5'
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
