import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Sparkles, Trophy, Cpu, Zap, Target, ArrowRight, ShieldCheck } from 'lucide-react';
import { Geekroom3DMascot } from '../components/mascot/Geekroom3DMascot';

export const LandingPage: React.FC = () => {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] cyber-grid overflow-hidden">
      {/* Glow Orbs in background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-arena-violet/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-arena-green/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 lg:pt-16 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Live event chip */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-arena-card border border-arena-border text-xs font-mono text-slate-300">
              <span className="w-2 h-2 rounded-full bg-arena-greenNeon animate-pulse" />
              <span className="text-arena-violetLight font-semibold">GEEKROOM GTBIT</span>
              <span className="text-slate-500">•</span>
              <span>ORIENTATION CODE CHALLENGE</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
              WELCOME TO THE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-arena-violetLight via-arena-violet to-arena-greenNeon">
                CODE ARENA
              </span>
            </h1>

            {/* Tagline & Subtext */}
            <p className="text-lg sm:text-xl font-medium text-arena-cyanLight font-mono">
              "Think Fast. Code Smart. Own the Arena."
            </p>
            <p className="text-base text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Five questions. Three difficulty levels. One shot to prove your skills.
              Battle against your fellow first-year engineering peers in a live algorithmic arena.
            </p>

            {/* Quick Rules Pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2 text-xs font-mono">
              <div className="px-3 py-1 rounded-lg bg-arena-card border border-arena-border text-slate-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-arena-greenNeon" />
                2 Easy (20 pts)
              </div>
              <div className="px-3 py-1 rounded-lg bg-arena-card border border-arena-border text-slate-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-arena-amber" />
                2 Medium (40 pts)
              </div>
              <div className="px-3 py-1 rounded-lg bg-arena-card border border-arena-border text-slate-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-arena-violet" />
                1 Hard (30 pts)
              </div>
              <div className="px-3 py-1 rounded-lg bg-arena-card border border-arena-border text-arena-greenNeon">
                MAX 90 PTS
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link
                to="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-arena-violet to-arena-violetDark hover:from-arena-violetLight hover:to-arena-violet text-white font-bold text-base shadow-glow-violet transition-all duration-300 hover:scale-105 active:scale-95 group"
              >
                <Play className="w-5 h-5 fill-white group-hover:translate-x-0.5 transition-transform" />
                <span>Start Your Challenge</span>
              </Link>

              <Link
                to="/leaderboard"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl glass-panel hover:bg-white/10 text-slate-200 font-semibold text-base transition-colors border border-arena-border hover:border-arena-violet/50"
              >
                <Trophy className="w-5 h-5 text-arena-violet" />
                <span>View Leaderboard</span>
              </Link>
            </div>
          </motion.div>

          {/* Hero Right: 3D Geekroom Mascot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col items-center justify-center relative"
          >
            <div className="relative w-full max-w-md glass-panel-glow rounded-3xl p-4 border border-arena-violet/30 overflow-hidden shadow-2xl">
              <div className="absolute top-3 left-4 flex items-center gap-2 font-mono text-[11px] text-arena-violetLight">
                <Cpu className="w-3.5 h-3.5 text-arena-greenNeon" />
                <span>MASCOT // GKR-BOT</span>
              </div>
              <div className="absolute top-3 right-4 font-mono text-[10px] text-slate-500">
                INTERACTIVE 3D
              </div>

              {/* Three.js Mascot Viewport */}
              <Geekroom3DMascot />

              <p className="text-center text-xs text-slate-400 mt-2 font-mono">
                Move your cursor to interact with GKR-01
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-arena-border">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            DESIGNED FOR TRUE CODING COMPETITION
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            No mockups. Real server-validated scoring, randomized questions, and instant rankings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <motion.div
            whileHover={{ y: -5 }}
            className="glass-panel p-6 rounded-2xl border border-arena-border relative overflow-hidden group hover:border-arena-violet/40 transition-colors"
          >
            <div className="w-12 h-12 rounded-xl bg-arena-violet/10 border border-arena-violet/20 flex items-center justify-center mb-5 text-arena-violet group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">1. RANDOMIZED CHALLENGE</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Every participant gets a distinct randomized set of five questions and shuffled options, ensuring fair competition across the hall.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            whileHover={{ y: -5 }}
            className="glass-panel p-6 rounded-2xl border border-arena-border relative overflow-hidden group hover:border-arena-green/40 transition-colors"
          >
            <div className="w-12 h-12 rounded-xl bg-arena-green/10 border border-arena-green/20 flex items-center justify-center mb-5 text-arena-greenNeon group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">2. THREE DIFFICULTY LEVELS</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Start with 2 Easy fundamentals (10 pts), step up to 2 Medium algorithmic problems (20 pts), and finish with 1 Hard brain-teaser (30 pts).
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            whileHover={{ y: -5 }}
            className="glass-panel p-6 rounded-2xl border border-arena-border relative overflow-hidden group hover:border-arena-cyan/40 transition-colors"
          >
            <div className="w-12 h-12 rounded-xl bg-arena-cyan/10 border border-arena-cyan/20 flex items-center justify-center mb-5 text-arena-cyanLight group-hover:scale-110 transition-transform">
              <Trophy className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">3. LIVE COMPETITION</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Compete live with fellow GTBIT freshers. Precision tie-breakers rank by score first, then completion time, then submission timestamp.
            </p>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-arena-border">
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="text-xs font-mono text-arena-violetLight uppercase tracking-widest mb-1">
            HOW IT WORKS
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            FOUR SIMPLE STEPS TO GLORY
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              num: '01',
              title: 'Enter Player Name',
              desc: 'Enter your name and optional roll number to claim your arena ticket.',
            },
            {
              num: '02',
              title: 'Start 5-Min Timer',
              desc: 'Server generates your 5 custom questions and begins the countdown.',
            },
            {
              num: '03',
              title: 'Submit & Review',
              desc: 'Lock in your answers. Review correct explanations and points breakdown.',
            },
            {
              num: '04',
              title: 'Climb Leaderboard',
              desc: 'Check your real-time ranking on the orientation event podium.',
            },
          ].map((step, idx) => (
            <div
              key={idx}
              className="glass-panel p-5 rounded-2xl border border-arena-border flex flex-col justify-between"
            >
              <div>
                <span className="text-3xl font-extrabold text-arena-violet/40 font-mono">
                  {step.num}
                </span>
                <h4 className="text-base font-bold text-white mt-2 mb-1">{step.title}</h4>
                <p className="text-xs text-slate-400">{step.desc}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center text-xs text-arena-violetLight font-mono">
                <span>STAGE {step.num}</span>
                <ArrowRight className="w-3.5 h-3.5 ml-auto" />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/register"
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-xl bg-arena-greenNeon hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-transform hover:scale-105 active:scale-95 shadow-glow-green"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>Ready? Enter Player Name</span>
          </Link>
        </div>
      </section>
    </div>
  );
};
