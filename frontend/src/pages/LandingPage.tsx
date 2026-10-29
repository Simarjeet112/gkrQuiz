import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Play,
  Trophy,
  Terminal,
  ShieldCheck,
  Code2,
  Coins,
  Flame,
  Award,
} from 'lucide-react';
import { BitByte3D } from '../components/mascot/BitByte3D';
import { ChessBackground } from '../components/ui/ChessBackground';
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
  const [siuuuActive, setSiuuuActive] = useState(false);
  const [hazardActive, setHazardActive] = useState(false);
  const [kanteActive, setKanteActive] = useState(false);

  const handleInsertToken = () => {
    sounds.playTierUp();
    setTokenInserted(true);
    setTokenToast(true);
    setTimeout(() => setTokenToast(false), 2400);
  };

  const handleSiuuu = () => {
    sounds.playSiuuu();
    setSiuuuActive(true);
    confetti({
      particleCount: 140,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#FFD700', '#F59E0B', '#D4FF00', '#FFFFFF', '#38BDF8'],
    });
    setTimeout(() => setSiuuuActive(false), 3000);
  };

  const handleHazard = () => {
    sounds.playHazardMagic();
    setHazardActive(true);
    confetti({
      particleCount: 130,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#034694', '#0070F3', '#60A5FA', '#FFFFFF'],
    });
    setTimeout(() => setHazardActive(false), 3000);
  };

  const handleKante = () => {
    sounds.playKanteTackle();
    setKanteActive(true);
    confetti({
      particleCount: 130,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#10B981', '#034694', '#34D399', '#FFFFFF'],
    });
    setTimeout(() => setKanteActive(false), 3000);
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-carbon-950 text-carbon-50">
      {/* ── AMBIENT CHESS VIBES IN THE BACKGROUND ── */}
      <ChessBackground />

      {/* ── 1. ARCHITECTURAL TOP TICKER TAPE (CR7, HAZARD, KANTÉ, CHELSEA, MADRID, GEEKROOM, CHESS) ── */}
      <div className="w-full bg-[#0A0E1A]/95 backdrop-blur-md text-slate-300 py-2.5 overflow-hidden font-mono text-xs border-y border-white/10 select-none">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8">
          <span className="text-amber-400 font-bold flex items-center gap-1.5">
            <span>⚽</span> CR7 450 GOALS AT REAL MADRID // 5x BALLON D'OR
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-blue-400 font-bold flex items-center gap-1.5">
            <span>🪄</span> EDEN HAZARD // STAMFORD BRIDGE MAGICIAN #10
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-emerald-400 font-bold flex items-center gap-1.5">
            <span>⚡</span> N'GOLO KANTÉ COVERS 70% OF THE EARTH
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-white font-bold flex items-center gap-1.5">
            <img src="/real-madrid-logo.svg" alt="" className="w-3.5 h-3.5 inline object-contain" />
            REAL MADRID 15x KINGS OF EUROPE
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-blue-400 font-bold flex items-center gap-1.5">
            <img src="/chelsea-logo.svg" alt="" className="w-3.5 h-3.5 inline object-contain" />
            CHELSEA FC 2x UCL KINGS
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-lime font-bold">♚ 1. e4 THINK 3 MOVES AHEAD</span>
          <span className="text-slate-600">•</span>
          <span>GEEKROOM GTBIT // CODE ARENA 2026</span>
          <span className="text-slate-600">•</span>
          <span className="text-amber-300 font-bold">🔥 SIUUUUUU!</span>
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
            {/* Badges: Geekroom, Real Madrid, Chelsea FC, Chess GM */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-lime/10 text-lime font-mono text-xs font-bold border border-lime/30">
                <Code2 className="w-3.5 h-3.5 text-lime" />
                <span>GEEKROOM GTBIT</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-900/30 text-blue-300 font-mono text-xs font-bold border border-blue-500/40">
                <img src="/chelsea-logo.svg" alt="" className="w-3.5 h-3.5 object-contain" />
                <span>CHELSEA FC</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-300 font-mono text-xs font-bold border border-amber-400/40">
                <img src="/real-madrid-logo.svg" alt="" className="w-3.5 h-3.5 object-contain" />
                <span>REAL MADRID 15x</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 text-slate-200 font-mono text-xs font-bold border border-white/10">
                <span className="text-lime">♟</span>
                <span>CHESS GM ELO</span>
              </span>
            </div>

            {/* Editorial Headline */}
            <div className="space-y-1">
              <div className="text-xs font-mono text-lime tracking-[0.25em] uppercase font-bold flex items-center justify-center lg:justify-start gap-2">
                <span>[ CR7 × HAZARD × KANTÉ // THE ARENA OF KINGS ]</span>
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[0.95] font-display">
                CR7 × LEGENDS <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-lime to-blue-400">
                  CODE ARENA.
                </span>
              </h1>
            </div>

            {/* Tagline */}
            <div className="space-y-2">
              <p className="text-base sm:text-lg font-bold text-slate-200 font-mono tracking-wide">
                “Think 3 Moves Ahead like Kasparov. Dribble like Eden Hazard. Intercept like N'Golo Kanté. Finish like Cristiano Ronaldo.”
              </p>
              <div className="font-mono text-[9px] tracking-[0.25em] text-slate-500 select-none hidden sm:block">
                ||| |||| | ||||| || |||||| |||| | || [GTBIT-GEEKROOM-CHELSEA-MADRID-ARENA-2026]
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans">
              The premier competitive coding challenge for first-year engineering students. 
              Five algorithmic moves, opening theory through the endgame, and a 5-minute blitz clock. 
              Solve with precision, calculate before you commit, and lift the trophy at the top of the leaderboard.
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

          {/* Hero Right: 3D BitByte Coder Bot Showcase Console */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col items-center justify-center relative w-full"
          >
            {/* Trio of Kings Showcase Console (Hazard, Kanté, Ronaldo) */}
            <div className="relative w-full max-w-lg rounded-2xl p-5 sm:p-6 border border-white/15 shadow-titanium overflow-hidden bg-[#101522]/90 backdrop-blur-md">
              {/* Header Badge */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-2">
                <div className="flex items-center gap-2.5 font-mono text-xs font-bold">
                  <div className="flex -space-x-1.5 items-center">
                    <div className="w-8 h-8 rounded-lg bg-amber-950/80 border border-amber-400/60 flex items-center justify-center p-1 shadow-md">
                      <img src="/real-madrid-logo.svg" alt="Real Madrid" className="w-full h-full object-contain" />
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-blue-950/80 border border-blue-400/60 flex items-center justify-center p-1 shadow-md">
                      <img src="/chelsea-logo.svg" alt="Chelsea" className="w-full h-full object-contain" />
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-carbon-900 border border-lime/60 flex items-center justify-center p-1 shadow-md">
                      <img src="/geekroom-logo.png" alt="Geekroom" className="w-full h-full object-contain" />
                    </div>
                  </div>
                  <div>
                    <div className="leading-tight text-white font-display text-sm">
                      TRIO OF KINGS // ARENA LEGENDS
                    </div>
                    <div className="text-[10px] text-amber-300 font-mono font-bold">
                      CR7 × EDEN HAZARD × N'GOLO KANTÉ
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border bg-amber-500/10 border-amber-400/40 text-amber-300">
                  <span className="w-2 h-2 rounded-full animate-pulse bg-amber-400" />
                  <span>KINGS ACTIVE</span>
                </div>
              </div>

              {/* Trio of Champions Photo Showcase */}
              <BitByte3D
                size="hero"
                mood="welcome"
                showSpeech={true}
              />

              {/* Console Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-white/10 text-[11px] font-mono text-slate-400">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-lime" />
                  <span>Click any Legend to trigger audio & voice</span>
                </span>
                <span className="text-amber-300 font-bold text-[10px]">CHELSEA 💙 × MADRID 🤍</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CR7 BALLON D'OR GOAT OF CODE SHOWCASE ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="relative rounded-3xl p-6 sm:p-10 border-2 border-amber-400/40 bg-gradient-to-br from-[#1A1405] via-[#0E1322] to-[#0A0D18] shadow-[0_0_60px_rgba(251,191,36,0.22)] overflow-hidden">
          {/* Golden Ambient Particle Glow */}
          <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-amber-400/10 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-lime/10 rounded-full blur-[130px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left: Ronaldo Ballon d'Or Photo Card */}
            <div className="lg:col-span-5 relative group">
              <div className="relative rounded-2xl overflow-hidden border-2 border-amber-400/60 shadow-[0_0_35px_rgba(251,191,36,0.35)] transition-transform duration-500 group-hover:scale-[1.02]">
                <img
                  src="/ronaldo-ballondor.jpg"
                  alt="Cristiano Ronaldo Ballon d'Or"
                  className="w-full h-[320px] sm:h-[400px] object-cover object-top filter brightness-105 contrast-110"
                />
                {/* Golden Badge overlay on image */}
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-amber-400/60 font-mono text-xs font-black text-amber-300 flex items-center gap-2 shadow-xl">
                  <span className="text-base animate-bounce">🏆</span>
                  <span>5× BALLON D'OR WINNER</span>
                </div>

                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-5 text-center sm:text-left">
                  <div className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-black">
                    CR7 GOAT MENTALITY
                  </div>
                  <div className="text-lg font-black text-white font-display">
                    CRISTIANO RONALDO
                  </div>
                </div>
              </div>
            </div>

            {/* Right: GOAT Motivation, Stats, and Interactive SIUUU celebration */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-300 font-mono text-xs font-bold uppercase tracking-wider">
                <span className="animate-pulse">⚽</span>
                <span>BALLON D'OR STANDARD // 50,000+ QUESTION VARIATIONS</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight leading-none">
                CALMA. THINK DEEP. <br />
                <span className="text-amber-400 drop-shadow-[0_0_20px_rgba(251,191,36,0.4)]">
                  LIFT THE BALLON D'OR.
                </span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans max-w-xl">
                “Talent without hard work is nothing.” Like Cristiano raising the Golden Ball at the Bernabéu, this arena tests relentless preparation, precision under time pressure, and zero excuses.
              </p>

              {/* 4 Stat Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 font-mono text-xs">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                  <div className="text-xl font-black text-amber-400 font-display">850+</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">CAREER GOALS</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-amber-400/30 text-center">
                  <div className="text-xl font-black text-amber-300 font-display">5×</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">BALLON D'OR</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-lime/30 text-center">
                  <div className="text-xl font-black text-lime font-display">600M+</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">TEST COMBOS</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                  <div className="text-xl font-black text-white font-display">100%</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">CALMA FOCUS</div>
                </div>
              </div>

              {/* Interactive SIUUU Button with Gold Confetti + Audio */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <button
                  type="button"
                  onClick={handleSiuuu}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-carbon-950 font-black font-display text-sm uppercase tracking-wider shadow-[0_0_30px_rgba(251,191,36,0.5)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                  <span className="text-xl">⚽</span>
                  <span>CELEBRATE SIUUUU! 🏆</span>
                </button>

                {siuuuActive && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="px-4 py-2 rounded-xl bg-black/90 border border-amber-400 text-amber-300 font-mono text-xs font-black animate-pulse flex items-center gap-2"
                  >
                    <span>🔥</span>
                    <span>SIUUUUUU! 5x BALLON D'OR ENERGY UNLEASHED!</span>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* ── HAZARD & KANTÉ CHELSEA & MADRID MASTERCLASS DUAL CARDS ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 pt-8 border-t border-white/10">
            {/* Eden Hazard Card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-2xl border border-blue-500/40 bg-gradient-to-br from-[#041126] via-[#09152E] to-[#0A0E1A] p-6 shadow-2xl flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src="/chelsea-logo.svg" alt="Chelsea" className="w-6 h-6 object-contain" />
                    <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest">
                      CHELSEA FC TALISMAN // #10
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-400/40">
                    REAL MADRID 2019
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-blue-400/80 shadow-xl shrink-0 group">
                    <img
                      src="/hazard.jpg"
                      alt="Eden Hazard"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent p-1 text-center">
                      <span className="text-[9px] font-mono text-blue-300 font-bold">HAZARD #10</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-xl sm:text-2xl font-black text-white font-display">
                      EDEN HAZARD
                    </h3>
                    <p className="text-xs text-blue-200 font-mono font-semibold">
                      “I play with freedom, joy and instinct.”
                    </p>
                    <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                      2x Premier League Champion, 2x Europa League winner, 110 Chelsea goals, and over 900 defenders left behind on the turf.
                    </p>
                  </div>
                </div>

                {/* Hazard Mini Stats */}
                <div className="grid grid-cols-3 gap-2 font-mono text-center pt-2">
                  <div className="p-2 rounded-xl bg-white/5 border border-blue-500/20">
                    <div className="text-base font-bold text-blue-300">110</div>
                    <div className="text-[9px] text-slate-400">CHELSEA GOALS</div>
                  </div>
                  <div className="p-2 rounded-xl bg-white/5 border border-blue-500/20">
                    <div className="text-base font-bold text-blue-300">900+</div>
                    <div className="text-[9px] text-slate-400">DRIBBLES WON</div>
                  </div>
                  <div className="p-2 rounded-xl bg-white/5 border border-blue-500/20">
                    <div className="text-base font-bold text-blue-300">2x</div>
                    <div className="text-[9px] text-slate-400">PREMIER LEAGUE</div>
                  </div>
                </div>
              </div>

              {/* Hazard Button */}
              <div className="pt-4 flex items-center justify-between gap-3 relative z-10 border-t border-white/10 mt-4">
                <button
                  type="button"
                  onClick={handleHazard}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(37,99,235,0.4)] active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <span>🪄</span>
                  <span>SILKY DRIBBLE MAGIC</span>
                </button>
              </div>

              {hazardActive && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 p-2 rounded-lg bg-blue-900/80 border border-blue-400 text-blue-200 text-center font-mono text-[10px] font-bold"
                >
                  ⚡ HAZARD TOOK ON 3 DEFENDERS WITH A BODY FEINT!
                </motion.div>
              )}
            </motion.div>

            {/* N'Golo Kanté Card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-2xl border border-emerald-500/40 bg-gradient-to-br from-[#031c12] via-[#062419] to-[#0A0E1A] p-6 shadow-2xl flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src="/chelsea-logo.svg" alt="Chelsea" className="w-6 h-6 object-contain" />
                    <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
                      CHELSEA FC // THE ENGINE #7
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
                    2021 UCL FINAL MOTM
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-emerald-400/80 shadow-xl shrink-0 group">
                    <img
                      src="/kante.jpg"
                      alt="N'Golo Kanté"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent p-1 text-center">
                      <span className="text-[9px] font-mono text-emerald-300 font-bold">KANTÉ #7</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-xl sm:text-2xl font-black text-white font-display">
                      N'GOLO KANTÉ
                    </h3>
                    <p className="text-xs text-emerald-200 font-mono font-semibold">
                      “70% Earth is water, rest is Kanté.”
                    </p>
                    <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                      World Cup Champion with France, UEFA Champions League Final Man of the Match, back-to-back Premier League winner with zero ego.
                    </p>
                  </div>
                </div>

                {/* Kanté Mini Stats */}
                <div className="grid grid-cols-3 gap-2 font-mono text-center pt-2">
                  <div className="p-2 rounded-xl bg-white/5 border border-emerald-500/20">
                    <div className="text-base font-bold text-emerald-300">100%</div>
                    <div className="text-[9px] text-slate-400">WORK-RATE</div>
                  </div>
                  <div className="p-2 rounded-xl bg-white/5 border border-emerald-500/20">
                    <div className="text-base font-bold text-emerald-300">3x</div>
                    <div className="text-[9px] text-slate-400">UCL KO MOTM</div>
                  </div>
                  <div className="p-2 rounded-xl bg-white/5 border border-emerald-500/20">
                    <div className="text-base font-bold text-emerald-300">2018</div>
                    <div className="text-[9px] text-slate-400">WORLD CUP 🏆</div>
                  </div>
                </div>
              </div>

              {/* Kanté Button */}
              <div className="pt-4 flex items-center justify-between gap-3 relative z-10 border-t border-white/10 mt-4">
                <button
                  type="button"
                  onClick={handleKante}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(16,185,129,0.4)] active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <span>⚡</span>
                  <span>100% TACKLE ENERGY BOOST</span>
                </button>
              </div>

              {kanteActive && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 p-2 rounded-lg bg-emerald-900/80 border border-emerald-400 text-emerald-200 text-center font-mono text-[10px] font-bold"
                >
                  ⚡ KANTÉ DISPOSSESSED THE ENTIRE MIDFIELD WITH 0 FOULS!
                </motion.div>
              )}
            </motion.div>
          </div>
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

          {/* Society Card */}
          <div className="md:col-span-4 rounded-2xl p-6 border border-white/15 bg-gradient-to-b from-[#10172A] to-[#0A0E18] flex flex-col justify-between text-center space-y-4 shadow-titanium">
            <div className="flex items-center justify-center gap-3 pt-2">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/15 p-2.5 shadow-md">
                <img src="/geekroom-logo.png" alt="Geekroom GTBIT" className="w-full h-full object-contain" />
              </div>
              <div className="w-14 h-14 rounded-2xl bg-lime/10 border border-lime/30 flex items-center justify-center text-3xl shadow-lg">
                ♟
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
                Engineered for speed, calculation depth, and technical excellence. Think 3 moves ahead and conquer the board.
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
