import React from 'react';
import { motion } from 'framer-motion';

// Subtle, atmospheric chess vibes in the background
export const ChessBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none">
      {/* 1. Subtle Dark-Mode Grandmaster Chess Grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(45deg, #ffffff 25%, transparent 25%),
            linear-gradient(-45deg, #ffffff 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #ffffff 75%),
            linear-gradient(-45deg, transparent 75%, #ffffff 75%)
          `,
          backgroundSize: '96px 96px',
          backgroundPosition: '0 0, 0 48px, 48px -48px, -48px 0px',
        }}
      />

      {/* 2. Soft Ambient Radial Vignettes */}
      <div className="absolute -top-32 -left-32 w-[650px] h-[650px] rounded-full bg-lime/5 blur-[160px]" />
      <div className="absolute top-1/2 -right-32 w-[700px] h-[700px] rounded-full bg-blue-500/5 blur-[180px]" />
      <div className="absolute -bottom-32 left-1/3 w-[600px] h-[600px] rounded-full bg-amber-500/5 blur-[160px]" />

      {/* 3. Floating Atmospheric Chess Pieces (Low-Opacity Watermarks) */}
      {/* Top Left: King */}
      <motion.div
        animate={{ y: [0, -14, 0], rotate: [0, 3, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-16 left-8 sm:left-20 text-[120px] sm:text-[180px] font-serif text-white/[0.03] leading-none"
      >
        ♚
      </motion.div>

      {/* Top Right: Knight */}
      <motion.div
        animate={{ y: [0, 16, 0], rotate: [0, -4, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-28 right-10 sm:right-28 text-[140px] sm:text-[210px] font-serif text-white/[0.03] leading-none"
      >
        ♞
      </motion.div>

      {/* Mid Left: Queen */}
      <motion.div
        animate={{ y: [0, 18, 0], rotate: [0, -2, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[48%] left-4 sm:left-12 text-[130px] sm:text-[190px] font-serif text-white/[0.025] leading-none"
      >
        ♛
      </motion.div>

      {/* Mid Right: Rook */}
      <motion.div
        animate={{ y: [0, -16, 0], rotate: [0, 2, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[55%] right-6 sm:right-16 text-[120px] sm:text-[170px] font-serif text-white/[0.025] leading-none"
      >
        ♜
      </motion.div>

      {/* Bottom Center-Left: Bishop */}
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [0, -3, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-16 left-1/4 text-[110px] sm:text-[160px] font-serif text-white/[0.025] leading-none"
      >
        ♝
      </motion.div>

      {/* Bottom Right: Pawn */}
      <motion.div
        animate={{ y: [0, 12, 0], rotate: [0, 4, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-20 right-1/4 text-[100px] sm:text-[140px] font-serif text-white/[0.03] leading-none"
      >
        ♟
      </motion.div>

      {/* Golden Ballon d'Or Trophy Floating Aura */}
      <motion.div
        animate={{ y: [0, -18, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 text-[150px] sm:text-[230px] opacity-[0.025] filter blur-[1px] leading-none text-amber-300 pointer-events-none"
      >
        🏆
      </motion.div>

      {/* 4. Subtle Grandmaster Coordinate Ranks & Files Faded Along Margins */}
      <div className="absolute left-3 top-1/4 flex flex-col gap-8 font-mono text-[10px] text-white/[0.06] font-bold">
        <span>8</span>
        <span>7</span>
        <span>6</span>
        <span>5</span>
        <span>4</span>
        <span>3</span>
        <span>2</span>
        <span>1</span>
      </div>

      <div className="absolute bottom-3 left-1/4 right-1/4 flex justify-between font-mono text-[10px] text-white/[0.06] font-bold">
        <span>a</span>
        <span>b</span>
        <span>c</span>
        <span>d</span>
        <span>e</span>
        <span>f</span>
        <span>g</span>
        <span>h</span>
      </div>

      {/* 5. Subtle Faded Tactical Notation Watermark */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-[0.4em] text-white/[0.04] uppercase">
        1. e4 e5 • 2. Nf3 Nc6 • 3. Bc4 Bc5 • 4. c3 Nf6 • 5. d4
      </div>
    </div>
  );
};
