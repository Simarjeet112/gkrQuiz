import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { sounds } from '../../utils/soundEffects';
import { Sparkles, X, ChevronUp, ChevronDown } from 'lucide-react';

export const LegendsFloatBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeLegend, setActiveLegend] = useState<string | null>(null);

  const triggerRonaldo = () => {
    sounds.playSiuuu();
    setActiveLegend('ronaldo');
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.8, x: 0.85 },
      colors: ['#FEBE10', '#FFFFFF', '#D97706', '#D4FF00'],
    });
    setTimeout(() => setActiveLegend(null), 3000);
  };

  const triggerHazard = () => {
    sounds.playHazardMagic();
    setActiveLegend('hazard');
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.8, x: 0.85 },
      colors: ['#034694', '#0070F3', '#60A5FA', '#FFFFFF'],
    });
    setTimeout(() => setActiveLegend(null), 3000);
  };

  const triggerKante = () => {
    sounds.playKanteTackle();
    setActiveLegend('kante');
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.8, x: 0.85 },
      colors: ['#10B981', '#034694', '#34D399', '#FFFFFF'],
    });
    setTimeout(() => setActiveLegend(null), 3000);
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 select-none">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="rounded-2xl border border-white/20 bg-[#0A0E1A]/95 backdrop-blur-xl shadow-2xl p-3.5 max-w-sm w-full space-y-3"
            style={{
              boxShadow: '0 10px 40px -10px rgba(3, 70, 148, 0.4), 0 0 20px rgba(254, 190, 16, 0.2)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1.5 items-center">
                  <div className="w-5 h-5 rounded-full border border-blue-400 overflow-hidden bg-blue-900 p-0.5">
                    <img src="/chelsea-logo.svg" alt="Chelsea" className="w-full h-full object-contain" />
                  </div>
                  <div className="w-5 h-5 rounded-full border border-amber-400 overflow-hidden bg-amber-900 p-0.5">
                    <img src="/real-madrid-logo.svg" alt="Real Madrid" className="w-full h-full object-contain" />
                  </div>
                  <div className="w-5 h-5 rounded-full border border-lime overflow-hidden bg-carbon-900 p-0.5">
                    <img src="/geekroom-logo.png" alt="Geekroom" className="w-full h-full object-contain" />
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold text-white uppercase tracking-wider">
                  FOOTBALL × CHESS LEGENDS
                </span>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10"
                title="Minimize legends dock"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 3 Omnipresent Legends: Hazard, Kanté, Ronaldo */}
            <div className="grid grid-cols-3 gap-2">
              {/* Eden Hazard Card */}
              <button
                onClick={triggerHazard}
                className="group relative flex flex-col items-center p-2 rounded-xl border border-blue-500/30 bg-blue-950/30 hover:bg-blue-900/40 hover:border-blue-400 transition-all active:scale-95 text-center"
              >
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-blue-400 shadow-md mb-1.5 group-hover:scale-105 transition-transform">
                  <img src="/hazard.jpg" alt="Eden Hazard" className="w-full h-full object-cover object-top" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500 rounded-full border border-white" />
                </div>
                <span className="text-[11px] font-bold text-blue-200 font-sans leading-tight">
                  Eden Hazard
                </span>
                <span className="text-[9px] font-mono text-blue-300 font-semibold mt-0.5">
                  #10 Magician 🪄
                </span>
                <span className="text-[8px] font-mono text-slate-400 leading-tight">
                  2x PL • 110 Goals
                </span>
              </button>

              {/* N'Golo Kanté Card */}
              <button
                onClick={triggerKante}
                className="group relative flex flex-col items-center p-2 rounded-xl border border-emerald-500/30 bg-emerald-950/30 hover:bg-emerald-900/40 hover:border-emerald-400 transition-all active:scale-95 text-center"
              >
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-400 shadow-md mb-1.5 group-hover:scale-105 transition-transform">
                  <img src="/kante.jpg" alt="N'Golo Kanté" className="w-full h-full object-cover object-top" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border border-white" />
                </div>
                <span className="text-[11px] font-bold text-emerald-200 font-sans leading-tight">
                  N'Golo Kanté
                </span>
                <span className="text-[9px] font-mono text-emerald-300 font-semibold mt-0.5">
                  100% Engine ⚡
                </span>
                <span className="text-[8px] font-mono text-slate-400 leading-tight">
                  70% Earth • UCL MOTM
                </span>
              </button>

              {/* Cristiano Ronaldo Card */}
              <button
                onClick={triggerRonaldo}
                className="group relative flex flex-col items-center p-2 rounded-xl border border-amber-500/30 bg-amber-950/30 hover:bg-amber-900/40 hover:border-amber-400 transition-all active:scale-95 text-center"
              >
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-amber-400 shadow-md mb-1.5 group-hover:scale-105 transition-transform">
                  <img src="/ronaldo-ballondor.jpg" alt="Cristiano Ronaldo" className="w-full h-full object-cover object-top" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-amber-400 rounded-full border border-white" />
                </div>
                <span className="text-[11px] font-bold text-amber-200 font-sans leading-tight">
                  Cristiano
                </span>
                <span className="text-[9px] font-mono text-amber-300 font-semibold mt-0.5">
                  5x Ballon d'Or 🏆
                </span>
                <span className="text-[8px] font-mono text-slate-400 leading-tight">
                  Real Madrid 450G
                </span>
              </button>
            </div>

            {/* Active Celebration Toast */}
            {activeLegend && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-1 px-2.5 rounded-lg text-center font-mono text-[10px] font-bold tracking-wide border shadow-md animate-pulse"
                style={{
                  backgroundColor:
                    activeLegend === 'ronaldo'
                      ? 'rgba(254, 190, 16, 0.2)'
                      : activeLegend === 'hazard'
                      ? 'rgba(3, 70, 148, 0.3)'
                      : 'rgba(16, 185, 129, 0.25)',
                  borderColor:
                    activeLegend === 'ronaldo'
                      ? '#FEBE10'
                      : activeLegend === 'hazard'
                      ? '#60A5FA'
                      : '#34D399',
                  color: '#FFFFFF',
                }}
              >
                {activeLegend === 'ronaldo' && "⚽ SIUUUUU! 5x BALLON D'OR GOAT ENERGY!"}
                {activeLegend === 'hazard' && "🪄 EDEN HAZARD DANCING PAST 4 DEFENDERS!"}
                {activeLegend === 'kante' && "⚡ N'GOLO KANTÉ WON THE TACKLE & RECOVERED THE BALL!"}
              </motion.div>
            )}

            {/* Footer Tag */}
            <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 pt-1 border-t border-white/5">
              <span>CHELSEA 💙 × MADRID 🤍 × GEEKROOM 💚</span>
              <span className="text-lime font-bold">CHESS GM ELO</span>
            </div>
          </motion.div>
        ) : (
          <motion.button
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-full border border-white/20 bg-[#0A0E1A]/95 text-white font-mono text-xs font-bold shadow-xl hover:border-lime transition-all"
            style={{
              boxShadow: '0 0 15px rgba(3, 70, 148, 0.4)',
            }}
          >
            <div className="flex -space-x-1">
              <img src="/hazard.jpg" alt="" className="w-5 h-5 rounded-full object-cover border border-blue-400" />
              <img src="/kante.jpg" alt="" className="w-5 h-5 rounded-full object-cover border border-emerald-400" />
              <img src="/ronaldo-ballondor.jpg" alt="" className="w-5 h-5 rounded-full object-cover border border-amber-400" />
            </div>
            <span>HAZARD & KANTÉ ⚽</span>
            <ChevronUp className="w-3.5 h-3.5 text-lime" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
