import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Terminal, Trophy, Shield, Play, Menu, X, Code2 } from 'lucide-react';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Leaderboard', path: '/leaderboard', icon: Trophy },
    { label: 'Organizer', path: '/admin', icon: Shield },
  ];

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-arena-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-arena-violet to-arena-violetDark flex items-center justify-center border border-white/10 shadow-glow-violet group-hover:scale-105 transition-transform">
            <Terminal className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-wider text-base sm:text-lg text-white group-hover:text-arena-violetLight transition-colors">
                GEEKROOM
              </span>
              <span className="text-xs px-1.5 py-0.5 rounded bg-arena-violet/20 text-arena-violetLight font-mono border border-arena-violet/30">
                GTBIT
              </span>
            </div>
            <div className="text-[10px] font-mono tracking-widest text-arena-greenNeon">
              CODE ARENA
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 text-sm font-medium transition-colors py-1 px-3 rounded-lg ${
                  isActive
                    ? 'text-white bg-white/5 border border-white/10'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
                }`}
              >
                {Icon && <Icon className="w-4 h-4 text-arena-violet" />}
                {link.label}
              </Link>
            );
          })}

          <Link
            to="/register"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-arena-violet to-arena-violetDark hover:from-arena-violetLight hover:to-arena-violet text-white text-sm font-semibold shadow-glow-violet transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Enter Arena</span>
          </Link>
        </nav>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
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
                  isActive
                    ? 'text-white bg-white/10'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                {Icon && <Icon className="w-4 h-4 text-arena-violet" />}
                {link.label}
              </Link>
            );
          })}
          <Link
            to="/register"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-arena-violet to-arena-violetDark text-white font-semibold text-sm shadow-glow-violet"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Enter Arena</span>
          </Link>
        </div>
      )}
    </header>
  );
};
