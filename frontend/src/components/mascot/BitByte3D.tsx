import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Flame,
  Zap,
  HelpCircle,
  AlertTriangle,
  Award,
  Code2,
  Sparkles,
} from 'lucide-react';
import {
  BitByteMood,
  getMascotDialogue,
  getRandomClickDialogue,
} from './bitbyteDialogue';
import { sounds, soundEffects } from '../../utils/soundEffects';

export interface BitByte3DProps {
  mood?: BitByteMood;
  customMessage?: string;
  size?: 'hero' | 'companion' | 'mini';
  className?: string;
  showSpeech?: boolean;
  onMascotClick?: () => void;
  interactive?: boolean;
}

// ── TRIO OF KINGS MASCOT: RONALDO, HAZARD & KANTÉ ──
// Replaces the generic robot with the real photos of Cristiano Ronaldo, Eden Hazard, and N'Golo Kanté
export const BitByte3D: React.FC<BitByte3DProps> = ({
  mood = 'idle',
  customMessage,
  size = 'companion',
  className = '',
  showSpeech = true,
  onMascotClick,
  interactive = true,
}) => {
  const [dialogue, setDialogue] = useState<string>('');
  const [activeLegend, setActiveLegend] = useState<'ronaldo' | 'hazard' | 'kante' | null>(null);

  // Sync Dialogue on Mood or Custom Message Change
  useEffect(() => {
    if (customMessage) {
      setDialogue(customMessage);
    } else {
      setDialogue(getMascotDialogue(mood));
    }
  }, [mood, customMessage]);

  const handleRonaldoClick = () => {
    if (!interactive) return;
    sounds.playSiuuu();
    setActiveLegend('ronaldo');
    setDialogue('SIUUUUUU! 5x Ballon d’Or mentality! Calma and execute with perfection! ⚽');
    confetti({
      particleCount: 75,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#FEBE10', '#FFFFFF', '#D97706', '#D4FF00'],
    });
    if (onMascotClick) onMascotClick();
    setTimeout(() => setActiveLegend(null), 3000);
  };

  const handleHazardClick = () => {
    if (!interactive) return;
    sounds.playHazardMagic();
    setActiveLegend('hazard');
    setDialogue('Eden Hazard: “Stay relaxed, play with freedom and joy, and dance past every challenge!” 🪄');
    confetti({
      particleCount: 75,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#034694', '#0070F3', '#60A5FA', '#FFFFFF'],
    });
    if (onMascotClick) onMascotClick();
    setTimeout(() => setActiveLegend(null), 3000);
  };

  const handleKanteClick = () => {
    if (!interactive) return;
    sounds.playKanteTackle();
    setActiveLegend('kante');
    setDialogue('N’Golo Kanté: “100% effort, 0 complaints. Cover every problem until the task is done!” ⚡');
    confetti({
      particleCount: 75,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#10B981', '#034694', '#34D399', '#FFFFFF'],
    });
    if (onMascotClick) onMascotClick();
    setTimeout(() => setActiveLegend(null), 3000);
  };

  // Mood Badge Icon
  const moodBadge = useMemo(() => {
    switch (mood) {
      case 'excited':
      case 'victory':
        return { label: 'SIUUUU! 5x BALLON D’OR', icon: <Flame className="w-3.5 h-3.5 text-amber-400" /> };
      case 'speed_mode':
        return { label: 'KANTÉ 100% WORK-RATE', icon: <Zap className="w-3.5 h-3.5 text-emerald-400" /> };
      case 'low_time':
        return { label: '90TH MIN DROGBA TIME', icon: <AlertTriangle className="w-3.5 h-3.5 text-rose-400 animate-pulse" /> };
      case 'thinking':
        return { label: 'HAZARD HALF-SPACE TACTIC', icon: <HelpCircle className="w-3.5 h-3.5 text-blue-400" /> };
      case 'leaderboard':
        return { label: 'CHAMPIONS LEADERBOARD', icon: <Award className="w-3.5 h-3.5 text-amber-400" /> };
      default:
        return { label: 'CR7 × HAZARD × KANTÉ', icon: <Code2 className="w-3.5 h-3.5 text-lime" /> };
    }
  }, [mood]);

  return (
    <div className={`relative flex flex-col items-center select-none w-full ${className}`}>
      {/* 1. Dynamic Contextual Speech Bubble */}
      {showSpeech && (
        <AnimatePresence mode="wait">
          <motion.div
            key={dialogue}
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="z-10 mb-3 px-2 pointer-events-auto"
          >
            <div className="relative px-4 py-2.5 rounded-2xl border border-white/15 bg-[#0B0F19]/95 group-hover:border-lime/60 shadow-[0_4px_24px_rgba(0,0,0,0.6)] backdrop-blur-md max-w-sm sm:max-w-md text-center transition-all">
              {/* Speech tail */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 border-r border-b bg-[#0B0F19] border-white/15 transform rotate-45" />

              <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono uppercase tracking-wider font-bold mb-0.5 text-lime">
                {moodBadge.icon}
                <span>{moodBadge.label}</span>
              </div>

              <p className="text-xs sm:text-sm font-display font-bold text-white tracking-wide leading-snug">
                “{dialogue}”
              </p>

              <div className="text-[9px] font-mono text-slate-400 mt-0.5">
                [click any player below to activate their sound & voice]
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      {/* 2. THE TRIO OF KINGS PHOTO SHOWCASE */}
      {size === 'hero' ? (
        /* HERO SIZE: 3-PHOTO STADIUM PODIUM (USED IN LANDING PAGE HERO) */
        <div className="w-full relative py-2">
          {/* Ambient Lighting Gradients */}
          <div className="absolute inset-0 pointer-events-none rounded-3xl blur-3xl bg-[radial-gradient(ellipse_at_center,rgba(254,190,16,0.15)_0%,rgba(3,70,148,0.15)_50%,transparent_75%)]" />

          <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5 relative z-10 items-end">
            {/* 1. EDEN HAZARD (Chelsea Magician #10) */}
            <motion.div
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleHazardClick}
              className={`group cursor-pointer rounded-2xl p-2 sm:p-2.5 border transition-all text-center relative overflow-hidden bg-gradient-to-b from-blue-950/60 to-black/90 shadow-xl ${
                activeLegend === 'hazard'
                  ? 'border-blue-400 shadow-[0_0_25px_rgba(59,130,246,0.5)]'
                  : 'border-blue-500/30 hover:border-blue-400/80'
              }`}
            >
              <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden border border-blue-400/60 mb-2 bg-black shadow-md">
                <img
                  src="/hazard.jpg"
                  alt="Eden Hazard"
                  className="w-full h-full object-cover object-top filter brightness-105 group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute top-1.5 left-1.5 w-5 h-5 rounded-full bg-blue-900/80 p-0.5 border border-blue-400">
                  <img src="/chelsea-logo.svg" alt="Chelsea" className="w-full h-full object-contain" />
                </div>
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/70 to-transparent p-1">
                  <span className="text-[9px] font-mono text-blue-300 font-bold">HAZARD</span>
                </div>
              </div>
              <div className="text-[11px] sm:text-xs font-bold text-white font-display truncate">
                Eden Hazard
              </div>
              <div className="text-[9px] font-mono text-blue-400 font-bold">
                #10 Magician 🪄
              </div>
              <div className="text-[8px] font-mono text-slate-400 hidden sm:block">
                110 Goals • 2x PL
              </div>
            </motion.div>

            {/* 2. CRISTIANO RONALDO (Center Stage 5x Ballon d'Or Trophy) */}
            <motion.div
              whileHover={{ scale: 1.06, y: -6 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRonaldoClick}
              className={`group cursor-pointer rounded-2xl p-2.5 sm:p-3 border transition-all text-center relative overflow-hidden bg-gradient-to-b from-amber-950/70 to-black/95 shadow-2xl ${
                activeLegend === 'ronaldo'
                  ? 'border-amber-400 shadow-[0_0_35px_rgba(254,190,16,0.6)]'
                  : 'border-amber-400/50 hover:border-amber-400'
              }`}
            >
              {/* Crown Banner */}
              <div className="absolute top-0 inset-x-0 py-0.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-carbon-950 font-mono text-[8px] font-black uppercase tracking-widest text-center shadow-sm">
                🏆 5x BALLON D'OR
              </div>

              <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden border-2 border-amber-400/80 mb-2 mt-3 bg-black shadow-lg">
                <img
                  src="/ronaldo-ballondor.jpg"
                  alt="Cristiano Ronaldo"
                  className="w-full h-full object-cover object-top filter brightness-110 contrast-105 group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute top-1.5 left-1.5 w-5 h-5 rounded-full bg-amber-900/80 p-0.5 border border-amber-400">
                  <img src="/real-madrid-logo.svg" alt="Real Madrid" className="w-full h-full object-contain" />
                </div>
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-1">
                  <span className="text-[10px] font-mono text-amber-300 font-black">CRISTIANO</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm font-black text-white font-display truncate">
                Ronaldo CR7
              </div>
              <div className="text-[10px] font-mono text-amber-300 font-bold">
                SIUUUU! ⚽
              </div>
              <div className="text-[8px] font-mono text-slate-400 hidden sm:block">
                450 Madrid Goals
              </div>
            </motion.div>

            {/* 3. N'GOLO KANTÉ (Chelsea & World Champion Engine) */}
            <motion.div
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleKanteClick}
              className={`group cursor-pointer rounded-2xl p-2 sm:p-2.5 border transition-all text-center relative overflow-hidden bg-gradient-to-b from-emerald-950/60 to-black/90 shadow-xl ${
                activeLegend === 'kante'
                  ? 'border-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.5)]'
                  : 'border-emerald-500/30 hover:border-emerald-400/80'
              }`}
            >
              <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden border border-emerald-400/60 mb-2 bg-black shadow-md">
                <img
                  src="/kante.jpg"
                  alt="N'Golo Kanté"
                  className="w-full h-full object-cover object-top filter brightness-105 group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute top-1.5 left-1.5 w-5 h-5 rounded-full bg-emerald-900/80 p-0.5 border border-emerald-400">
                  <img src="/chelsea-logo.svg" alt="Chelsea" className="w-full h-full object-contain" />
                </div>
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/70 to-transparent p-1">
                  <span className="text-[9px] font-mono text-emerald-300 font-bold">KANTÉ</span>
                </div>
              </div>
              <div className="text-[11px] sm:text-xs font-bold text-white font-display truncate">
                N'Golo Kanté
              </div>
              <div className="text-[9px] font-mono text-emerald-400 font-bold">
                100% Engine ⚡
              </div>
              <div className="text-[8px] font-mono text-slate-400 hidden sm:block">
                UCL Final MOTM
              </div>
            </motion.div>
          </div>
        </div>
      ) : size === 'companion' ? (
        /* COMPANION SIZE: SLEEK HORIZONTAL TRIO BANNER (USED IN ARENA HUD, REGISTRATION, RESULTS, LEADERBOARD) */
        <div className="flex items-center justify-center gap-3 py-1">
          {/* Hazard Avatar */}
          <button
            type="button"
            onClick={handleHazardClick}
            className="group relative flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-blue-500/30 bg-blue-950/30 hover:bg-blue-900/40 hover:border-blue-400 transition-all active:scale-95 text-left"
            title="Eden Hazard (Chelsea #10) - Click for Magic Chime"
          >
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-blue-400 shadow-md shrink-0">
              <img src="/hazard.jpg" alt="Hazard" className="w-full h-full object-cover object-top" />
            </div>
            <div className="hidden sm:block">
              <div className="text-[11px] font-bold text-white leading-tight font-display">Hazard #10</div>
              <div className="text-[9px] font-mono text-blue-300">Dribble Flow 🪄</div>
            </div>
          </button>

          {/* Ronaldo Avatar */}
          <button
            type="button"
            onClick={handleRonaldoClick}
            className="group relative flex items-center gap-2 px-3 py-1.5 rounded-xl border-2 border-amber-400/50 bg-amber-950/40 hover:bg-amber-900/50 hover:border-amber-400 transition-all active:scale-95 text-left shadow-lg"
            title="Cristiano Ronaldo (5x Ballon d'Or) - Click for SIUUU!"
          >
            <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-amber-400 shadow-md shrink-0">
              <img src="/ronaldo-ballondor.jpg" alt="CR7" className="w-full h-full object-cover object-top" />
            </div>
            <div className="hidden sm:block">
              <div className="text-[11px] font-black text-amber-300 leading-tight font-display">CR7 ⚽</div>
              <div className="text-[9px] font-mono text-white">Ballon d'Or 🏆</div>
            </div>
          </button>

          {/* Kanté Avatar */}
          <button
            type="button"
            onClick={handleKanteClick}
            className="group relative flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-emerald-500/30 bg-emerald-950/30 hover:bg-emerald-900/40 hover:border-emerald-400 transition-all active:scale-95 text-left"
            title="N'Golo Kanté (Chelsea Engine) - Click for Energy Pulse"
          >
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-emerald-400 shadow-md shrink-0">
              <img src="/kante.jpg" alt="Kanté" className="w-full h-full object-cover object-top" />
            </div>
            <div className="hidden sm:block">
              <div className="text-[11px] font-bold text-white leading-tight font-display">Kanté ⚡</div>
              <div className="text-[9px] font-mono text-emerald-300">100% Stamina</div>
            </div>
          </button>
        </div>
      ) : (
        /* MINI SIZE: COMPACT OVERLAPPING TRIO AVATARS */
        <div className="flex -space-x-2 items-center justify-center p-1 cursor-pointer" onClick={handleRonaldoClick}>
          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-blue-400 shadow-md">
            <img src="/hazard.jpg" alt="Hazard" className="w-full h-full object-cover" />
          </div>
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-amber-400 shadow-lg z-10">
            <img src="/ronaldo-ballondor.jpg" alt="Ronaldo" className="w-full h-full object-cover" />
          </div>
          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-emerald-400 shadow-md">
            <img src="/kante.jpg" alt="Kanté" className="w-full h-full object-cover" />
          </div>
        </div>
      )}
    </div>
  );
};
