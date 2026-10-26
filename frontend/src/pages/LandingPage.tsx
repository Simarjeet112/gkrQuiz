import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Sparkles,
  Trophy,
  Zap,
  ArrowRight,
  Terminal,
  Award,
  Flame,
  ShieldCheck,
  Clock,
  Code2,
  Cpu,
  Coins,
} from 'lucide-react';
import { BitByte3D } from '../components/mascot/BitByte3D';
import { sounds } from '../utils/soundEffects';

const tierCards = [
  {
    tier: 'STAGE 01',
    level: 'RECRUIT WARMUP',
    points: '10 PTS EACH',
    color: 'border-emerald-400/40 text-emerald-300',
    bg: 'from-emerald-500/15 via-black/80 to-black',
    tag: 'bg-emerald-400 text-slate-950',
    desc: '2 Random Easy questions on core algorithms, control flow, loops, and fundamental data structures.',
    icon: <Sparkles className="w-5 h-5 text-emerald-400" />,
  },
  {
    tier: 'STAGE 02',
    level: 'WARRIOR TRIALS',
    points: '20 PTS EACH',
    color: 'border-amber-400/40 text-amber-300',
    bg: 'from-amber-500/15 via-black/80 to-black',
    tag: 'bg-amber-400 text-slate-950',
    desc: '2 Random Medium questions on OOP polymorphism, Tower of Hanoi recurrence, BFS/DFS, and dynamic allocation.',
    icon: <Zap className="w-5 h-5 text-amber-400" />,
  },
  {
    tier: 'STAGE 03',
    level: 'BOSS ENCOUNTER',
    points: '30 PTS',
    color: 'border-rose-500/50 text-rose-300',
    bg: 'from-rose-500/20 via-black/80 to-black',
    tag: 'bg-rose-500 text-white',
    desc: '1 Random Tough challenge on LRU cache architecture, Dijkstra, CAP theorem trade-offs, and deadlock theory.',
    icon: <Flame className="w-5 h-5 text-rose-400" />,
  },
];

export const LandingPage: React.FC = () => {
  const [tokenInserted, setTokenInserted] = useState(false);
  const [tokenToast, setTokenToast] = useState(false);

  const handleInsertToken = () => {
    sounds.playTierUp();
    setTokenInserted(true);
    setTokenToast(true);
    setTimeout(() => setTokenToast(false), 2400);
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] cyber-grid overflow-hidden selection:bg-cyan-400 selection:text-black">
      {/* Background Lighting Gradients */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-[550px] h-[550px] bg-violet-600/15 rounded-full blur-[140px] pointer-events-none" />

      {/* ── 1. PINTEREST EDITORIAL TOP MARQUEE TAPE ── */}
      <div className="w-full bg-cyan-400 text-slate-950 py-1.5 overflow-hidden font-mono text-[11px] font-black uppercase tracking-widest border-y border-black select-none z-20 shadow-[0_0_20px_rgba(0,240,255,0.4)]">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-6">
          <span>★ GEEKROOM CODE ARENA 2026</span>
          <span>•</span>
          <span>GTBIT ORIENTATION EVENT</span>
          <span>•</span>
          <span>5 QUESTIONS • 5 MINUTES • 90 POINTS MAX</span>
          <span>•</span>
          <span>NO LOGINS • INSTANT COMPETITION</span>
          <span>•</span>
          <span>MEET BITBYTE: LIVING 3D COMPANION</span>
          <span>•</span>
          <span>THINK FAST • CODE SMART • OWN THE ARENA</span>
          <span>•</span>
          <span>★ GEEKROOM CODE ARENA 2026</span>
          <span>•</span>
          <span>GTBIT ORIENTATION EVENT</span>
          <span>•</span>
          <span>5 QUESTIONS • 5 MINUTES • 90 POINTS MAX</span>
          <span>•</span>
          <span>NO LOGINS • INSTANT COMPETITION</span>
          <span>•</span>
          <span>MEET BITBYTE: LIVING 3D COMPANION</span>
          <span>•</span>
          <span>THINK FAST • CODE SMART • OWN THE ARENA</span>
        </div>
      </div>

      {/* ── 2. HERO EDITORIAL COLLAGE SECTION ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-14 lg:pt-16 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Hero Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Pinterest Angled Tactile Stickers */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-1">
              <span className="pinterest-sticker bg-cyan-400 text-slate-950 -rotate-2 border border-black">
                <Cpu className="w-3.5 h-3.5" /> GTBIT TECH ORIENTATION 2026
              </span>
              <span className="pinterest-sticker bg-[#101728] text-cyan-300 border border-cyan-400/40 rotate-1 shadow-[0_0_12px_rgba(0,240,255,0.2)]">
                <Code2 className="w-3.5 h-3.5 text-orange-400" /> OFFICIAL GEEKROOM SOCIETY
              </span>
              <span className="pinterest-sticker bg-rose-500 text-white -rotate-1 hidden sm:inline-flex">
                ⚡ 100% PURE LOGIC • NO AI
              </span>
            </div>

            {/* Giant Editorial Headline */}
            <div className="space-y-1 relative">
              <div className="text-xs font-mono text-cyan-400 tracking-[0.3em] uppercase font-bold">
                [ DIVISION 01 // COMPETITIVE ARENA ]
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[0.95] font-display">
                OWN THE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-200 to-violet-400">
                  CODE ARENA.
                </span>
              </h1>
            </div>

            {/* Sub-quote Tagline with Barcode */}
            <div className="space-y-2">
              <p className="text-lg sm:text-xl font-bold text-cyan-300 font-mono tracking-wide">
                “Think Fast. Code Smart. Own the Arena.”
              </p>
              <div className="font-mono text-[9px] tracking-[0.25em] text-slate-500 select-none hidden sm:block">
                ||| |||| | ||||| || |||||| |||| | || [GKR-GTBIT-2026-CHALLENGE]
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans">
              Welcome to the official competitive coding gauntlet for first-year engineering students. 
              Five questions, strict progressive difficulty order, and a 5-minute countdown clock. 
              No logins, zero friction — test your algorithms acumen and claim the live podium.
            </p>

            {/* Progression Pills with Tactile Beads */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-1 font-mono text-xs">
              <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 flex items-center gap-2 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>2 Easy (20 pts)</span>
              </div>
              <div className="px-3.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-400/30 text-amber-300 flex items-center gap-2 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span>2 Medium (40 pts)</span>
              </div>
              <div className="px-3.5 py-1.5 rounded-xl bg-rose-500/10 border border-rose-400/40 text-rose-300 flex items-center gap-2 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
                <span>1 Tough (30 pts)</span>
              </div>
              <div className="px-3.5 py-1.5 rounded-xl bg-cyan-400/15 border border-cyan-400/40 text-cyan-300 font-bold">
                MAX 90 PTS
              </div>
            </div>

            {/* Call to Action Buttons + Interactive Arcade Coin */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3">
              <Link
                to="/register"
                onClick={() => sounds.playSelect()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 text-slate-950 font-black text-sm uppercase tracking-wider font-display shadow-[0_0_30px_rgba(0,240,255,0.4)] arcade-btn transition-all duration-200 group"
              >
                <Play className="w-4 h-4 fill-slate-950 group-hover:translate-x-0.5 transition-transform" />
                <span>ENTER ARENA</span>
              </Link>

              <Link
                to="/leaderboard"
                onClick={() => sounds.playClick()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-[#090E1D] hover:bg-white/10 text-slate-200 font-bold text-sm transition-colors border border-cyan-400/30 hover:border-cyan-400 font-mono shadow-sm"
              >
                <Trophy className="w-4 h-4 text-cyan-400" />
                <span>LIVE PODIUM</span>
              </Link>

              {/* Interactive Arcade Coin Flip Widget */}
              <button
                onClick={handleInsertToken}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-amber-400/15 border border-amber-400/40 text-amber-300 hover:bg-amber-400/25 transition-all text-xs font-mono font-bold active:scale-95 shadow-[0_0_15px_rgba(251,191,36,0.2)]"
                title="Click to insert arcade token!"
              >
                <Coins className={`w-4 h-4 ${tokenInserted ? 'text-amber-400 animate-spin' : 'text-amber-300'}`} />
                <span>{tokenInserted ? 'TOKEN ACTIVE 🪙' : 'INSERT TOKEN'}</span>
              </button>
            </div>

            {/* Token Toast */}
            <AnimatePresence>
              {tokenToast && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-mono text-xs font-black shadow-lg"
                >
                  <span>🪙 ARCADE TOKEN INSERTED! CHALLENGER SLOT VERIFIED!</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Hero Right: Pinterest Arcade Console Card with 3D BitByte */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col items-center justify-center relative"
          >
            {/* Pinterest Tape Accents on Corners */}
            <div className="absolute -top-3 -left-3 w-12 h-5 bg-cyan-400/60 rotate-[-12deg] z-20 backdrop-blur-sm pointer-events-none border border-black/40" />
            <div className="absolute -bottom-3 -right-3 w-12 h-5 bg-orange-500/60 rotate-[-8deg] z-20 backdrop-blur-sm pointer-events-none border border-black/40" />

            <div className="relative w-full max-w-lg rounded-3xl p-4 sm:p-6 border-2 border-cyan-400/40 shadow-[0_0_45px_rgba(0,240,255,0.25)] overflow-hidden bg-gradient-to-b from-[#0B1226]/95 via-[#060A16]/95 to-black">
              {/* Header Badge */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-2">
                <div className="flex items-center gap-2.5 font-mono text-xs text-cyan-400 font-bold">
                  <div className="w-7 h-7 rounded-lg bg-cyan-400/20 border border-cyan-400/40 flex items-center justify-center p-0.5">
                    <img src="/geekroom-logo.png" alt="Geekroom" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <div className="leading-tight text-white font-display">BITBYTE // GKR-01</div>
                    <div className="text-[10px] text-cyan-400 font-normal">OFFICIAL JERSEY • RETRO TERMINAL</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-[10px] font-mono text-emerald-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>ONLINE</span>
                </div>
              </div>

              {/* Three.js 3D Living Mascot with Mini Laptop */}
              <BitByte3D size="hero" mood="welcome" showSpeech={true} />

              {/* Console Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-white/10 text-[11px] font-mono text-slate-400">
                <span className="text-cyan-400 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Tap BitByte or speech to interact!</span>
                </span>
                <span className="text-slate-500 text-[10px]">WebGL 60FPS</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 3. PINTEREST BENTO DISCOVERY GRID ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/10">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30">
            [ THE ARENA BLUEPRINT // BENTO DISCOVERY ]
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white font-display">
            HOW THE ARENA WORKS
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            Structured progressive difficulty. No random luck — purely your speed and technical precision.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: 3-Stage Gauntlet */}
          {tierCards.map((tier, idx) => (
            <motion.div
              key={tier.tier}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`rounded-3xl p-6 border ${tier.color} bg-gradient-to-b ${tier.bg} flex flex-col justify-between relative overflow-hidden group hover:scale-[1.02] transition-all`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-black uppercase ${tier.tag}`}>
                    {tier.tier}
                  </span>
                  <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                    {tier.icon}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-black text-white font-display tracking-wide">
                    {tier.level}
                  </h3>
                  <div className="text-xs font-mono font-bold text-cyan-400 mt-0.5">
                    {tier.points}
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {tier.desc}
                </p>
              </div>

              <div className="pt-6 border-t border-white/10 mt-6 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>STRICT ORDER PROGRESSION</span>
                <span className="text-white font-bold">Q{idx === 0 ? '1-2' : idx === 1 ? '3-4' : '5'}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bento Row 2: Perforated Ticket Stub Rules + Community Seal */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6">
          {/* Ticket Stub Card */}
          <div className="md:col-span-8 ticket-stub rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_0_30px_rgba(0,240,255,0.1)]">
            <div className="space-y-2 max-w-md">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>CHALLENGER ADMISSION PROTOCOL</span>
              </div>
              <h3 className="text-2xl font-black text-white font-display">
                ZERO PASSWORDS. NO ACCOUNTS.
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Simply enter your callsign / college roll number to claim a terminal seat. 
                Answers auto-save continuously to the server. If your browser closes, your timer persists safely.
              </p>
              <div className="pt-2 font-mono text-[9px] tracking-widest text-slate-500">
                GTBIT-ORIENTATION-CODE-ARENA-SECTOR-2026
              </div>
            </div>

            <div className="shrink-0 text-center sm:text-right border-t sm:border-t-0 sm:border-l border-white/10 pt-4 sm:pt-0 sm:pl-6 space-y-2">
              <div className="px-3 py-1.5 rounded-xl bg-cyan-400 text-slate-950 font-black text-xs font-display uppercase tracking-wider inline-block">
                INSTANT ENTRY
              </div>
              <div className="text-xs font-mono text-slate-400">
                TIME LIMIT: <strong className="text-white">5 MINUTES</strong>
              </div>
              <div className="text-xs font-mono text-slate-400">
                QUESTIONS: <strong className="text-white">5 RANDOMIZED</strong>
              </div>
            </div>
          </div>

          {/* Community Seal Card */}
          <div className="md:col-span-4 rounded-3xl p-6 border border-cyan-400/30 bg-gradient-to-b from-[#0A1226]/90 to-black flex flex-col justify-between text-center space-y-4">
            <div className="flex items-center justify-center pt-2">
              <div className="relative w-16 h-16 rounded-2xl bg-cyan-400/15 border-2 border-cyan-400/40 p-2 shadow-[0_0_20px_rgba(0,240,255,0.3)]">
                <img src="/geekroom-logo.png" alt="Geekroom GTBIT" className="w-full h-full object-contain" />
              </div>
            </div>

            <div>
              <div className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                BUILT BY GEEKROOM
              </div>
              <h4 className="text-lg font-black text-white font-display mt-0.5">
                GTBIT TECHNICAL SOCIETY
              </h4>
              <p className="text-[11px] text-slate-400 mt-1 font-sans">
                Empowering first-year students to code, build, and innovate.
              </p>
            </div>

            <Link
              to="/register"
              onClick={() => sounds.playSelect()}
              className="w-full py-3 rounded-xl bg-cyan-400 text-slate-950 font-black text-xs font-display uppercase tracking-wider arcade-btn hover:bg-cyan-300 transition-colors"
            >
              LAUNCH QUIZ HUD →
            </Link>
          </div>
        </div>
      </section>

      {/* ── 4. BOTTOM MARQUEE TICKER TAPE ── */}
      <div className="w-full bg-[#080D1A] text-slate-400 py-2.5 overflow-hidden font-mono text-xs border-t border-white/10 select-none">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8">
          <span className="text-cyan-400 font-bold">⚡ RANKINGS SYNCED EVERY 5 SECONDS</span>
          <span>•</span>
          <span>TIE-BREAKER: SCORE → TIME → TIMESTAMP</span>
          <span>•</span>
          <span>SERVER AUTHORITATIVE SCORING</span>
          <span>•</span>
          <span className="text-amber-400 font-bold">FINAL BOSS WORTH 30 PTS</span>
          <span>•</span>
          <span>GEEKROOM GTBIT ORIENTATION 2026</span>
          <span>•</span>
          <span className="text-cyan-400 font-bold">⚡ RANKINGS SYNCED EVERY 5 SECONDS</span>
          <span>•</span>
          <span>TIE-BREAKER: SCORE → TIME → TIMESTAMP</span>
          <span>•</span>
          <span>SERVER AUTHORITATIVE SCORING</span>
          <span>•</span>
          <span className="text-amber-400 font-bold">FINAL BOSS WORTH 30 PTS</span>
          <span>•</span>
          <span>GEEKROOM GTBIT ORIENTATION 2026</span>
        </div>
      </div>
    </div>
  );
};
