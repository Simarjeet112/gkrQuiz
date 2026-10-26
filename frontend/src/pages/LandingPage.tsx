import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Sparkles, Trophy, Zap, ArrowRight } from 'lucide-react';
import { Geekroom3DMascot } from '../components/mascot/Geekroom3DMascot';

const featureCards = [
  {
    icon: <Sparkles className="w-6 h-6" />,
    iconBg: 'bg-arena-violet/10 border-arena-violet/20 text-arena-violet',
    hoverBorder: 'hover:border-arena-violet/40',
    title: '1. RANDOMIZED CHALLENGE',
    body: 'Every participant receives a fresh set of 5 questions — 2 Easy, 2 Medium, and 1 Tough — randomly selected and shuffled for every attempt.',
  },
  {
    icon: <Zap className="w-6 h-6" />,
    iconBg: 'bg-arena-green/10 border-arena-green/20 text-arena-greenNeon',
    hoverBorder: 'hover:border-arena-green/40',
    title: '2. THREE DIFFICULTY TIERS',
    body: 'Easy (10 pts), Medium (20 pts), and Tough (30 pts) questions across Algorithms, Data Structures, OOP, Complexity, and more.',
  },
  {
    icon: <Trophy className="w-6 h-6" />,
    iconBg: 'bg-arena-cyan/10 border-arena-cyan/20 text-arena-cyanLight',
    hoverBorder: 'hover:border-arena-cyan/40',
    title: '3. LIVE COMPETITION',
    body: 'Compete in real-time with fellow GTBIT students. Rank by score first, then completion time, then submission timestamp.',
  },
];

const steps = [
  { n: '01', t: 'Enter Your Name', d: 'Just your display name — no login, no signup required.' },
  { n: '02', t: 'Start 5-Min Timer', d: 'Server generates 5 unique questions and your countdown begins.' },
  { n: '03', t: 'Answer & Submit', d: 'Navigate freely, auto-saved answers. Submit before time runs out.' },
  { n: '04', t: 'Climb the Board', d: 'View your score, review explanations, and check the live leaderboard.' },
];

export const LandingPage: React.FC = () => {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] cyber-grid overflow-hidden">
      {/* Background glow orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-arena-violet/12 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-20 right-0 w-[300px] h-[300px] bg-arena-green/8 rounded-full blur-[100px] pointer-events-none" />

      {/* ── Hero Section ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

          {/* Left: copy */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Event chip */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-arena-card border border-arena-border text-xs font-mono text-slate-300">
              <span className="w-2 h-2 rounded-full bg-arena-greenNeon animate-pulse" />
              <span className="text-arena-violetLight font-semibold">GEEKROOM GTBIT</span>
              <span className="text-slate-600">•</span>
              <span>ORIENTATION 2026</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
              WELCOME TO THE<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-arena-violetLight via-arena-violet to-arena-greenNeon">
                CODE ARENA
              </span>
            </h1>

            <p className="text-xl font-medium text-arena-cyanLight font-mono tracking-wide">
              "Think Fast. Code Smart. Own the Arena."
            </p>
            <p className="text-base text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              50 curated CS questions across 3 difficulty levels. Every attempt is uniquely randomized.
              One five-minute window. Compete live with your fellow freshers.
            </p>

            {/* Score pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 font-mono text-xs pt-1">
              {[
                { label: '2 Easy · 20 pts', dot: 'bg-arena-greenNeon' },
                { label: '2 Medium · 40 pts', dot: 'bg-amber-400' },
                { label: '1 Tough · 30 pts', dot: 'bg-red-400' },
                { label: 'MAX 90 PTS', color: 'text-arena-greenNeon border-emerald-500/30' },
              ].map((p, i) => (
                <div key={i} className={`px-3 py-1 rounded-lg bg-arena-card border border-arena-border text-slate-300 flex items-center gap-1.5 ${p.color || ''}`}>
                  {p.dot && <span className={`w-2 h-2 rounded-full ${p.dot}`} />}
                  {p.label}
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link to="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-arena-violet to-arena-violetDark hover:from-arena-violetLight hover:to-arena-violet text-white font-bold text-base shadow-glow-violet transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <Play className="w-5 h-5 fill-white" /> Start Your Challenge
              </Link>
              <Link to="/leaderboard"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl glass-panel hover:bg-white/10 text-slate-200 font-semibold text-base transition-colors border border-arena-border hover:border-arena-violet/50"
              >
                <Trophy className="w-5 h-5 text-arena-violet" /> View Leaderboard
              </Link>
            </div>
          </motion.div>

          {/* Right: 3D Mascot */}
          <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col items-center"
          >
            <div className="relative w-full max-w-md glass-panel-glow rounded-3xl p-4 border border-arena-violet/30 overflow-hidden shadow-2xl">
              <div className="absolute top-3 left-4 flex items-center gap-2 font-mono text-[11px] text-arena-violetLight">
                <span className="w-1.5 h-1.5 rounded-full bg-arena-greenNeon animate-pulse" />
                <span>MASCOT // GKR-01 "BITBYTE"</span>
              </div>
              <div className="absolute top-3 right-4 font-mono text-[10px] text-slate-600">INTERACTIVE 3D</div>

              <Geekroom3DMascot />
              <p className="text-center text-[11px] text-slate-500 mt-2 font-mono">Move your cursor to interact</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Feature Cards ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-arena-border">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">DESIGNED FOR REAL COMPETITION</h2>
          <p className="text-slate-400 text-sm mt-2">Server-validated scoring. Randomized questions. Live rankings.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featureCards.map((c, i) => (
            <motion.div key={i} whileHover={{ y: -4 }} transition={{ duration: 0.2 }}
              className={`glass-panel p-6 rounded-2xl border border-arena-border ${c.hoverBorder} transition-colors group`}
            >
              <div className={`w-12 h-12 rounded-xl ${c.iconBg} border flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                {c.icon}
              </div>
              <h3 className="text-base font-bold text-white mb-2">{c.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{c.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 border-t border-arena-border">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="text-xs font-mono text-arena-violetLight uppercase tracking-widest mb-1">HOW IT WORKS</div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">FOUR STEPS TO GLORY</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s, i) => (
            <div key={i} className="glass-panel p-5 rounded-2xl border border-arena-border flex flex-col justify-between group hover:border-arena-violet/30 transition-colors">
              <div>
                <span className="text-3xl font-extrabold text-arena-violet/30 font-mono">{s.n}</span>
                <h4 className="text-base font-bold text-white mt-2 mb-1">{s.t}</h4>
                <p className="text-xs text-slate-400">{s.d}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center text-xs font-mono text-arena-violetLight">
                <span>STAGE {s.n}</span>
                <ArrowRight className="w-3.5 h-3.5 ml-auto" />
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/register"
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-xl bg-arena-greenNeon hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-glow-green"
          >
            <Play className="w-4 h-4 fill-slate-950" /> Ready? Enter the Arena
          </Link>
        </div>
      </section>
    </div>
  );
};
