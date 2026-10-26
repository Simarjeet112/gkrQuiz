import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Trophy,
  Terminal,
  ShieldCheck,
  Code2,
  Coins,
  Crown,
  Sparkles,
} from 'lucide-react';
import { BitByte3D } from '../components/mascot/BitByte3D';
import { MascotType } from '../components/mascot/bitbyteDialogue';
import { sounds } from '../utils/soundEffects';

const tierCards = [
  {
    tier: 'STAGE 01',
    level: '♟ OPENING TACTICS',
    points: '10 PTS EACH',
    color: 'border-white/10 hover:border-lime/40',
    bg: 'bg-[#101522]',
    tag: 'bg-lime text-carbon-950',
    desc: 'Questions 1 & 2: Rapid opening logic on algorithms, control flow, loops, and Python/SQL fundamentals.',
    icon: <span className="text-xl text-lime font-bold">♟</span>,
  },
  {
    tier: 'STAGE 02',
    level: '♞ TACTICAL MIDDLEGAME',
    points: '20 PTS EACH',
    color: 'border-white/10 hover:border-ember/40',
    bg: 'bg-[#101522]',
    tag: 'bg-ember text-white',
    desc: 'Questions 3 & 4: Deep calculations on OOP polymorphism, Tower of Hanoi recurrence, BFS/DFS, and data structures.',
    icon: <span className="text-xl text-ember font-bold">♞</span>,
  },
  {
    tier: 'STAGE 03',
    level: '♚ GRANDMASTER ENDGAME',
    points: '30 PTS',
    color: 'border-rose-500/30 hover:border-rose-500/60',
    bg: 'bg-[#15101A]',
    tag: 'bg-rose-500 text-white',
    desc: 'Question 5: High-stakes endgame challenge on cache architecture, graph shortest paths, or core data structures.',
    icon: <span className="text-xl text-rose-400 font-bold">♚</span>,
  },
];

export const LandingPage: React.FC = () => {
  const [tokenInserted, setTokenInserted] = useState(false);
  const [tokenToast, setTokenToast] = useState(false);
  const [selectedMascot, setSelectedMascot] = useState<MascotType>('coder');

  const handleInsertToken = () => {
    sounds.playTierUp();
    setTokenInserted(true);
    setTokenToast(true);
    setTimeout(() => setTokenToast(false), 2400);
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] chessboard-grid overflow-hidden bg-carbon-950 text-carbon-50">
      {/* Background Lighting Gradients */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-lime/5 rounded-full blur-[140px] pointer-events-none" />

      {/* ── 1. ARCHITECTURAL TOP TICKER TAPE ── */}
      <div className="w-full bg-[#101522] text-slate-300 py-2.5 overflow-hidden font-mono text-xs border-y border-white/10 select-none">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8">
          <span className="text-lime font-bold">♟ 1. e4 THINK 3 MOVES AHEAD</span>
          <span className="text-slate-600">•</span>
          <span>GEEKROOM GTBIT // CODE ARENA 2026</span>
          <span className="text-slate-600">•</span>
          <span>5-MINUTE BLITZ FORMAT // 90 PTS MAX</span>
          <span className="text-slate-600">•</span>
          <span className="text-ember font-bold">♞ OPENING → MIDDLEGAME → ENDGAME</span>
          <span className="text-slate-600">•</span>
          <span>MASCOT COMPANIONS: BITBYTE (CODER) × LEO #26 (CHELSEA GM)</span>
          <span className="text-slate-600">•</span>
          <span className="text-lime font-bold">♚ CHECKMATE THE LEADERBOARD</span>
          <span className="text-slate-600">•</span>
          <span>INSTANT ENROLLMENT ENTRY</span>
        </div>
      </div>

      {/* ── 2. HERO EDITORIAL SECTION ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-14 lg:pt-16 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Hero Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Clean Architectural Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-lime/10 text-lime font-mono text-xs font-bold border border-lime/30">
                <Code2 className="w-3.5 h-3.5 text-lime" />
                <span>GEEKROOM GTBIT</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-950/70 text-blue-300 font-mono text-xs font-bold border border-blue-500/30">
                <span>🦁</span>
                <span>MASCOT DUO: CODER × CHELSEA GM</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#161D2E] text-slate-300 font-mono text-xs font-bold border border-white/10">
                <span>⏱️</span>
                <span>5-MIN BLITZ</span>
              </span>
            </div>

            {/* Editorial Headline */}
            <div className="space-y-1">
              <div className="text-xs font-mono text-lime tracking-[0.25em] uppercase font-bold flex items-center justify-center lg:justify-start gap-2">
                <span>[ FASTEST FINGERS // TIMED CHALLENGE ]</span>
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[0.95] font-display">
                OWN THE <br />
                <span className="text-lime">
                  CODE ARENA.
                </span>
              </h1>
            </div>

            {/* Tagline */}
            <div className="space-y-2">
              <p className="text-lg sm:text-xl font-bold text-slate-200 font-mono tracking-wide">
                “Think 3 Moves Ahead. Code Smart. Climb the Ranks.”
              </p>
              <div className="font-mono text-[9px] tracking-[0.25em] text-slate-500 select-none hidden sm:block">
                ||| |||| | ||||| || |||||| |||| | || [GEEKROOM-DUAL-MASCOT-ENGINE-2026]
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans">
              The premier competitive coding challenge for first-year engineering students. 
              Five algorithmic moves, opening theory through the endgame, and a 5-minute blitz clock. 
              Solve with precision, choose your mascot companion, and lift the trophy at the top of the leaderboard.
            </p>

            {/* Progression Pills (Opening, Middlegame, Endgame) */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-1 font-mono text-xs">
              <div className="px-3.5 py-1.5 rounded-xl bg-[#101522] border border-white/10 text-slate-300 flex items-center gap-2">
                <span className="text-sm text-lime">♟</span>
                <span>2 Opening (20p)</span>
              </div>
              <div className="px-3.5 py-1.5 rounded-xl bg-[#101522] border border-white/10 text-slate-300 flex items-center gap-2">
                <span className="text-sm text-ember">♞</span>
                <span>2 Middlegame (40p)</span>
              </div>
              <div className="px-3.5 py-1.5 rounded-xl bg-[#101522] border border-rose-500/30 text-rose-300 flex items-center gap-2">
                <span className="text-sm text-rose-400">♚</span>
                <span>1 Endgame (30p)</span>
              </div>
              <div className="px-3.5 py-1.5 rounded-xl bg-lime/10 border border-lime/40 text-lime font-bold">
                MAX 90 PTS // LIVE TELEMETRY
              </div>
            </div>

            {/* Call to Action Buttons + Interactive Arcade Coin */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3">
              <Link
                to="/register"
                onClick={() => sounds.playSelect()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl btn-primary text-sm uppercase tracking-wider"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>ENTER THE ARENA</span>
              </Link>

              <Link
                to="/leaderboard"
                onClick={() => sounds.playClick()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl btn-secondary text-sm font-mono"
              >
                <Trophy className="w-4 h-4 text-lime" />
                <span>LIVE LEADERBOARD</span>
              </Link>

              {/* Interactive Arcade Coin */}
              <button
                onClick={handleInsertToken}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-[#101522] border border-white/15 text-slate-300 hover:border-lime/40 transition-all text-xs font-mono font-bold active:scale-95"
                title="Click to insert arcade token!"
              >
                <Coins className={`w-4 h-4 ${tokenInserted ? 'text-lime animate-spin' : 'text-slate-400'}`} />
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
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-lime text-carbon-950 font-mono text-xs font-black shadow-lg"
                >
                  <span>🪙 ARCADE TOKEN INSERTED! CHALLENGER READY!</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Hero Right: Dual 3D Mascot Console (Coding Bot & Chelsea Chess Mascot) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col items-center justify-center relative w-full"
          >
            {/* Mascot Switcher Pill */}
            <div className="flex items-center gap-1.5 mb-3 bg-[#0A101D] p-1.5 rounded-xl border border-white/10 font-mono text-xs w-full max-w-md justify-center shadow-lg">
              <button
                onClick={() => {
                  sounds.playClick();
                  setSelectedMascot('coder');
                }}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg font-bold transition-all text-xs ${
                  selectedMascot === 'coder'
                    ? 'bg-lime text-carbon-950 font-black shadow-[0_0_15px_rgba(212,255,0,0.4)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>💻</span>
                <span>BITBYTE (CODER)</span>
              </button>
              <button
                onClick={() => {
                  sounds.playClick();
                  setSelectedMascot('chelsea_chess');
                }}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg font-bold transition-all text-xs ${
                  selectedMascot === 'chelsea_chess'
                    ? 'bg-blue-600 text-white font-black shadow-[0_0_15px_rgba(37,99,235,0.5)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>🦁</span>
                <span>LEO #26 (CHELSEA GM)</span>
              </button>
            </div>

            {/* Mascot 3D Showcase Console */}
            <div className={`relative w-full max-w-lg rounded-2xl p-5 sm:p-6 border shadow-titanium overflow-hidden transition-colors ${
              selectedMascot === 'chelsea_chess'
                ? 'bg-[#081329] border-blue-500/30 shadow-[0_0_30px_rgba(3,70,148,0.25)]'
                : 'bg-[#101522] border-white/15'
            }`}>
              {/* Header Badge */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-2">
                <div className="flex items-center gap-2.5 font-mono text-xs font-bold">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center p-1 border ${
                    selectedMascot === 'chelsea_chess'
                      ? 'bg-blue-900/60 border-blue-400/40 text-lg'
                      : 'bg-white/10 border-white/15'
                  }`}>
                    {selectedMascot === 'chelsea_chess' ? (
                      '🦁'
                    ) : (
                      <img src="/geekroom-logo.png" alt="Geekroom" className="w-full h-full object-contain" />
                    )}
                  </div>
                  <div>
                    <div className="leading-tight text-white font-display">
                      {selectedMascot === 'chelsea_chess' ? 'LEO // CFC-26' : 'BITBYTE // GKR-01'}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      {selectedMascot === 'chelsea_chess' ? 'CHELSEA CHESS GRANDMASTER' : 'CODER BOT COMPANION'}
                    </div>
                  </div>
                </div>

                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border ${
                  selectedMascot === 'chelsea_chess'
                    ? 'bg-blue-900/70 border-blue-400/40 text-blue-300'
                    : 'bg-lime/10 border-lime/30 text-lime'
                }`}>
                  <span className={`w-2 h-2 rounded-full animate-pulse ${
                    selectedMascot === 'chelsea_chess' ? 'bg-blue-400' : 'bg-lime'
                  }`} />
                  <span>{selectedMascot === 'chelsea_chess' ? 'MATCHDAY' : 'ONLINE'}</span>
                </div>
              </div>

              {/* Three.js 3D Living Mascot (Switches smoothly between Coder & Chelsea GM) */}
              <BitByte3D
                key={selectedMascot}
                size="hero"
                mood="welcome"
                mascotType={selectedMascot}
                showSpeech={true}
              />

              {/* Console Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-white/10 text-[11px] font-mono text-slate-400">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <Terminal className={`w-3.5 h-3.5 ${selectedMascot === 'chelsea_chess' ? 'text-blue-400' : 'text-lime'}`} />
                  <span>Click mascot to trigger voice line</span>
                </span>
                <span className="text-slate-500 text-[10px]">WebGL 60FPS</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 3. ARCHITECTURAL BENTO GAUNTLET GRID ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/10">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-lime uppercase tracking-widest px-3 py-1 rounded-full bg-lime/10 border border-lime/30">
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
          {tierCards.map((tier, idx) => (
            <motion.div
              key={tier.tier}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`rounded-2xl p-6 border ${tier.color} ${tier.bg} flex flex-col justify-between relative overflow-hidden transition-all shadow-titanium`}
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
                  <div className="text-xs font-mono font-bold text-slate-300 mt-0.5">
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

        {/* Bento Row 2: Admission Protocol & Society Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6">
          {/* Ticket Admission Card */}
          <div className="md:col-span-8 rounded-2xl p-6 sm:p-8 bg-[#101522] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-titanium">
            <div className="space-y-2 max-w-md">
              <div className="flex items-center gap-2 text-xs font-mono text-lime font-bold">
                <ShieldCheck className="w-4 h-4 text-lime" />
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
              <div className="px-3 py-1.5 rounded-xl bg-lime text-carbon-950 font-black text-xs font-display uppercase tracking-wider inline-block">
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

          {/* Society & Mascot Duo Card */}
          <div className="md:col-span-4 rounded-2xl p-6 border border-white/15 bg-gradient-to-b from-[#10172A] to-[#0A0E18] flex flex-col justify-between text-center space-y-4 shadow-titanium">
            <div className="flex items-center justify-center gap-3 pt-2">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-2xl shadow-lg">
                🦁
              </div>
              <div className="relative w-12 h-12 rounded-2xl bg-white/5 border border-white/15 p-2 shadow-md">
                <img src="/geekroom-logo.png" alt="Geekroom GTBIT" className="w-full h-full object-contain" />
              </div>
              <div className="w-12 h-12 rounded-2xl bg-lime/10 border border-lime/30 flex items-center justify-center text-2xl shadow-lg">
                🤖
              </div>
            </div>

            <div>
              <div className="text-xs font-mono text-lime font-bold uppercase tracking-wider">
                GEEKROOM GTBIT // 2026
              </div>
              <h4 className="text-lg font-black text-white font-display mt-0.5">
                CODE ARENA TOURNAMENT
              </h4>
              <p className="text-[11px] text-slate-300/80 mt-1 font-sans">
                Engineered for speed, calculation depth, and technical excellence. Supported by BitByte and Leo #26.
              </p>
            </div>

            <Link
              to="/register"
              onClick={() => sounds.playSelect()}
              className="w-full py-3 rounded-xl btn-primary text-xs uppercase tracking-wider"
            >
              LAUNCH QUIZ HUD →
            </Link>
          </div>
        </div>
      </section>

      {/* ── 4. BOTTOM TICKER TAPE ── */}
      <div className="w-full bg-[#0A0E18] text-slate-400 py-3 overflow-hidden font-mono text-xs border-t border-white/10 select-none">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8">
          <span className="text-lime font-bold">⚡ RANKINGS SYNCED EVERY 5 SECONDS</span>
          <span>•</span>
          <span>TIE-BREAKER PROTOCOL: SCORE → TIME → TIMESTAMP</span>
          <span>•</span>
          <span>SERVER AUTHORITATIVE SCORING</span>
          <span>•</span>
          <span className="text-ember font-bold">FINAL BOSS WORTH 30 PTS</span>
          <span>•</span>
          <span>GEEKROOM GTBIT ORIENTATION 2026</span>
          <span>•</span>
          <span className="text-lime font-bold">⚡ RANKINGS SYNCED EVERY 5 SECONDS</span>
          <span>•</span>
          <span>TIE-BREAKER PROTOCOL: SCORE → TIME → TIMESTAMP</span>
          <span>•</span>
          <span>SERVER AUTHORITATIVE SCORING</span>
          <span>•</span>
          <span className="text-ember font-bold">FINAL BOSS WORTH 30 PTS</span>
          <span>•</span>
          <span>GEEKROOM GTBIT ORIENTATION 2026</span>
        </div>
      </div>
    </div>
  );
};
