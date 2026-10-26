import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Sparkles, Trophy, Zap, ArrowRight, Terminal, Award, Flame, Skull } from 'lucide-react';
import { BitByte3D } from '../components/mascot/BitByte3D';
import { sounds } from '../utils/soundEffects';

const tierCards = [
  {
    tier: 'TIER 01',
    level: 'RECRUIT WARMUP',
    points: '10 PTS EACH',
    color: 'border-emerald-500/30 text-emerald-300',
    bg: 'bg-emerald-500/10',
    glow: 'rgba(0, 255, 136, 0.25)',
    desc: '2 Random Easy questions testing basic algorithms, control flow, and data structure fundamentals.',
    icon: <Sparkles className="w-5 h-5 text-emerald-400" />,
  },
  {
    tier: 'TIER 02',
    level: 'WARRIOR TRIALS',
    points: '20 PTS EACH',
    color: 'border-amber-500/30 text-amber-300',
    bg: 'bg-amber-500/10',
    glow: 'rgba(245, 158, 11, 0.25)',
    desc: '2 Random Medium questions diving into OOP polymorphism, recursion complexity, and tree traversals.',
    icon: <Zap className="w-5 h-5 text-amber-400" />,
  },
  {
    tier: 'TIER 03',
    level: 'BOSS ENCOUNTER',
    points: '30 PTS',
    color: 'border-red-500/40 text-red-300',
    bg: 'bg-red-500/15',
    glow: 'rgba(255, 0, 85, 0.35)',
    desc: '1 Random Tough brain-teaser on LRU cache design, Dijkstra, binary search trees, and CAP theorem.',
    icon: <Flame className="w-5 h-5 text-red-400" />,
  },
];

export const LandingPage: React.FC = () => {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] cyber-grid overflow-hidden">
      {/* Background Lighting Gradients */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-arena-cyan/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-[450px] h-[450px] bg-arena-violet/15 rounded-full blur-[120px] pointer-events-none" />

      {/* ── HERO SECTION ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 lg:pt-16 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Hero Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Geekroom Orientation Event Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full cyber-card border border-arena-cyan/40 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-arena-cyan animate-pulse" />
              <span className="text-white font-bold">GEEKROOM GTBIT</span>
              <span className="text-slate-600">//</span>
              <span className="text-arena-cyan font-semibold">ORIENTATION 2026 ARENA</span>
            </div>

            {/* Main Cyber Gaming Heading */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-none font-display">
                OWN THE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-arena-cyan via-cyan-200 to-arena-violet">
                  CODE ARENA
                </span>
              </h1>
            </div>

            {/* Tagline */}
            <p className="text-lg sm:text-xl font-medium text-arena-cyan font-mono tracking-wide">
              "Think Fast. Code Smart. Own the Arena."
            </p>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans">
              Welcome to the official competitive coding challenge for first-year engineering students. 
              Five questions, three escalating difficulty tiers, and a strict 5-minute countdown. 
              No logins, no friction — prove your skills and claim your place on the live podium.
            </p>

            {/* Progression Pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 font-mono text-xs">
              <div className="px-3 py-1.5 rounded-lg cyber-card border border-emerald-500/30 text-emerald-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                2 Easy (20 pts)
              </div>
              <div className="px-3 py-1.5 rounded-lg cyber-card border border-amber-500/30 text-amber-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                2 Medium (40 pts)
              </div>
              <div className="px-3 py-1.5 rounded-lg cyber-card border border-red-500/30 text-red-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-400" />
                1 Tough (30 pts)
              </div>
              <div className="px-3 py-1.5 rounded-lg cyber-card border border-arena-cyan/40 text-arena-cyan font-bold">
                MAX 90 PTS
              </div>
            </div>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3">
              <Link
                to="/register"
                onClick={() => sounds.playSelect()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-arena-cyan to-arena-cyanDark hover:from-cyan-300 hover:to-arena-cyan text-slate-950 font-bold text-sm uppercase tracking-wider font-mono shadow-glow-cyan transition-all duration-200 hover:scale-105 active:scale-95 group"
              >
                <Play className="w-4 h-4 fill-slate-950 group-hover:translate-x-0.5 transition-transform" />
                <span>START CHALLENGE</span>
              </Link>

              <Link
                to="/leaderboard"
                onClick={() => sounds.playClick()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl cyber-card hover:bg-white/10 text-slate-200 font-semibold text-sm transition-colors border border-arena-border hover:border-arena-cyan/50 font-mono"
              >
                <Trophy className="w-4 h-4 text-arena-cyan" />
                <span>LIVE LEADERBOARD</span>
              </Link>
            </div>
          </motion.div>

          {/* Hero Right: Interactive 3D Mascot Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col items-center justify-center relative"
          >
            <div className="relative w-full max-w-lg cyber-card p-4 sm:p-6 border-2 border-cyan-400/40 shadow-[0_0_40px_rgba(0,240,255,0.2)] overflow-hidden bg-gradient-to-b from-[#090E22]/90 via-[#060914]/95 to-black">
              {/* Header Badge */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-2">
                <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 font-bold">
                  <img src="/geekroom-logo.png" alt="Geekroom" className="w-5 h-5 object-contain" />
                  <span>BITBYTE // GKR-01</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10B981]" />
                  <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                    LIVING MASCOT
                  </span>
                </div>
              </div>

              {/* Three.js 3D Living Mascot */}
              <BitByte3D size="hero" mood="welcome" showSpeech={true} />

              <div className="flex items-center justify-between pt-3 border-t border-white/10 text-[11px] font-mono text-slate-400">
                <span className="text-cyan-400">✨ Click or poke to talk!</span>
                <span className="text-slate-500">Interactive WebGL</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── DIFFICULTY TIER BREAKDOWN SECTION ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 border-t border-arena-border">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-mono text-arena-cyan uppercase tracking-widest mb-1.5">
            [ TIER ESCALATION SYSTEM ]
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            PROGRESSIVE CODING GAUNTLET
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Questions always appear in strict order: Warm up with Easy, level up through Medium, and face the Boss Tough challenge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {tierCards.map((tier, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
              className={`cyber-card p-6 border ${tier.color} relative overflow-hidden group`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  {tier.icon}
                </div>
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-white/5 border border-white/10">
                  {tier.points}
                </span>
              </div>

              <div className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                {tier.tier}
              </div>
              <h3 className="text-lg font-bold text-white mt-1 mb-2 font-display">
                {tier.level}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                {tier.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS SECTION ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 border-t border-arena-border">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="text-xs font-mono text-arena-cyan uppercase tracking-widest mb-1">
            HOW IT WORKS
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            FOUR SIMPLE STEPS
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
          {[
            { num: '01', title: 'Enter Your Name', desc: 'No signup, no password. Just enter your name to claim your seat.' },
            { num: '02', title: '5-Minute Countdown', desc: 'Server starts your timer and generates your 5 custom questions.' },
            { num: '03', title: 'Answer & Review', desc: 'Navigate between questions; answers auto-save as you move.' },
            { num: '04', title: 'Live Rankings', desc: 'Instant score out of 90 with tie-breaking on the event leaderboard.' },
          ].map((step, idx) => (
            <div key={idx} className="cyber-card p-5 border border-arena-border flex flex-col justify-between">
              <div>
                <span className="text-3xl font-extrabold text-arena-cyan/30 font-display">
                  {step.num}
                </span>
                <h4 className="text-sm font-bold text-white mt-2 mb-1">{step.title}</h4>
                <p className="text-xs text-slate-400 font-sans">{step.desc}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center text-[11px] text-arena-cyan">
                <span>STAGE {step.num}</span>
                <ArrowRight className="w-3.5 h-3.5 ml-auto" />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/register"
            onClick={() => sounds.playSelect()}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-arena-cyan hover:bg-cyan-300 text-slate-950 font-bold text-xs uppercase tracking-wider font-mono shadow-glow-cyan transition-all hover:scale-105 active:scale-95"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>ENTER CODE ARENA NOW</span>
          </Link>
        </div>
      </section>
    </div>
  );
};
