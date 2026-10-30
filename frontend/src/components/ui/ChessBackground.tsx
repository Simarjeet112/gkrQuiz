import React from 'react';
import { motion } from 'framer-motion';

// High-Adrenaline Football Stadium Atmosphere Background
// Features: Roaring Stadium Crowd, Sweep Floodlights, Pitch Turf Lines, Real Madrid & Chelsea Crests
export const ChessBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none bg-[#050811]">
      {/* 1. Real Stadium Crowd Atmosphere Layer (User Uploaded Photo) */}
      <div
        className="absolute inset-0 bg-cover bg-top bg-no-repeat opacity-25 mix-blend-luminosity filter contrast-125"
        style={{
          backgroundImage: "url('/stadium-crowd.jpg')",
        }}
      />

      {/* 2. Stadium Floodlight Fog & Vignette Overlays */}
      {/* Top Floodlight Mist */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 50% 0%, rgba(0, 255, 133, 0.12) 0%, transparent 60%),
            radial-gradient(circle at 15% 10%, rgba(254, 190, 16, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 85% 10%, rgba(3, 70, 148, 0.25) 0%, transparent 55%),
            linear-gradient(to bottom, rgba(5,8,17,0.4) 0%, rgba(5,8,17,0.75) 45%, #050811 100%)
          `,
        }}
      />

      {/* 3. Sweeping Volumetric Stadium Floodlights */}
      {/* Left Floodlight Tower (Bernabéu Gold Beam) */}
      <motion.div
        animate={{
          opacity: [0.15, 0.35, 0.15],
          rotate: [-15, -8, -15],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-40 -left-20 w-[600px] h-[1000px] origin-top-left pointer-events-none"
        style={{
          background: 'conic-gradient(from 40deg at 0% 0%, rgba(254,190,16,0.2) 0deg, rgba(254,190,16,0.02) 30deg, transparent 50deg)',
          filter: 'blur(30px)',
        }}
      />

      {/* Right Floodlight Tower (Stamford Bridge Blue Beam) */}
      <motion.div
        animate={{
          opacity: [0.2, 0.45, 0.2],
          rotate: [15, 8, 15],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-40 -right-20 w-[600px] h-[1000px] origin-top-right pointer-events-none"
        style={{
          background: 'conic-gradient(from 320deg at 100% 0%, rgba(3,70,148,0.3) 0deg, rgba(0,255,133,0.05) 25deg, transparent 45deg)',
          filter: 'blur(35px)',
        }}
      />

      {/* 4. Football Pitch Tactical Markings (Center Circle & Goal Box Grid) */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hex-net" width="36" height="36" patternUnits="userSpaceOnUse" patternTransform="rotate(20)">
            <path
              d="M18 0 L36 10 L36 28 L18 36 L0 28 L0 10 Z"
              fill="none"
              stroke="#00ff85"
              strokeWidth="0.75"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hex-net)" />

        {/* Center Field Tactical Pitch Markings */}
        <circle cx="50%" cy="50%" r="180" fill="none" stroke="#00ff85" strokeWidth="1.5" strokeDasharray="6 4" />
        <circle cx="50%" cy="50%" r="4" fill="#00ff85" />
        <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#00ff85" strokeWidth="1.5" strokeDasharray="8 6" />
      </svg>

      {/* 5. Floating Giant Club Crests Watermarks */}
      {/* Real Madrid Golden 15x Crest (Left Side) */}
      <motion.div
        animate={{ y: [0, -18, 0], rotate: [0, -3, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 -left-12 sm:left-6 w-60 h-60 sm:w-96 sm:h-96 opacity-[0.045] pointer-events-none"
      >
        <img src="/real-madrid-logo.svg" alt="" className="w-full h-full object-contain filter drop-shadow-[0_0_40px_#FEBE10]" />
      </motion.div>

      {/* Chelsea FC Blue Lion Crest (Right Side) */}
      <motion.div
        animate={{ y: [0, 18, 0], rotate: [0, 3, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 -right-12 sm:right-6 w-60 h-60 sm:w-96 sm:h-96 opacity-[0.05] pointer-events-none"
      >
        <img src="/chelsea-logo.svg" alt="" className="w-full h-full object-contain filter drop-shadow-[0_0_40px_#034694]" />
      </motion.div>

      {/* Floating 3D Ballon d'Or Trophy Aura (Center Back) */}
      <motion.div
        animate={{ y: [0, -14, 0], scale: [1, 1.04, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 text-[160px] sm:text-[240px] opacity-[0.035] filter blur-[1px] leading-none text-amber-300 pointer-events-none"
      >
        🏆
      </motion.div>

      {/* 6. Floating Football Action Icons */}
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, 360] }}
        transition={{ y: { duration: 14, repeat: Infinity, ease: 'easeInOut' }, rotate: { duration: 30, repeat: Infinity, ease: 'linear' } }}
        className="absolute top-16 left-[18%] text-4xl sm:text-5xl opacity-[0.07] pointer-events-none"
      >
        ⚽
      </motion.div>

      <motion.div
        animate={{ y: [0, -22, 0], rotate: [360, 0] }}
        transition={{ y: { duration: 16, repeat: Infinity, ease: 'easeInOut' }, rotate: { duration: 32, repeat: Infinity, ease: 'linear' } }}
        className="absolute bottom-28 right-[15%] text-4xl sm:text-6xl opacity-[0.07] pointer-events-none"
      >
        ⚽
      </motion.div>

      <motion.div
        animate={{ y: [0, -12, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-1/3 left-[8%] text-3xl sm:text-4xl opacity-[0.06] text-amber-400 pointer-events-none"
      >
        ⚡
      </motion.div>

      {/* 7. Stadium Matchday Telemetry Borders (Faded Along Edges) */}
      <div className="absolute left-3 top-1/3 hidden lg:flex flex-col gap-6 font-mono text-[9px] text-[#00ff85]/20 font-black tracking-widest uppercase">
        <span>BERNABÉU [81,044]</span>
        <span>STAMFORD BRIDGE</span>
        <span>UCL 15× MADRID</span>
        <span>CHELSEA FC 2×</span>
        <span>CR7 900+ GOALS</span>
      </div>

      <div className="absolute right-3 top-1/3 hidden lg:flex flex-col gap-6 font-mono text-[9px] text-[#FEBE10]/20 font-black tracking-widest text-right uppercase">
        <span>MATCHDAY // 90:00+5'</span>
        <span>VAR TELEMETRY OK</span>
        <span>BALLON D'OR ×5</span>
        <span>HAZARD 110 GOALS</span>
        <span>KANTÉ 100% MOTM</span>
      </div>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-[0.35em] text-white/10 uppercase font-black whitespace-nowrap">
        HALA MADRID Y NADA MÁS • BLUE IS THE COLOUR • SIUUUU! • GEEKROOM 2026
      </div>
    </div>
  );
};
