import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Zap, Shield, Sparkles } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

// Initial tactical board state inspired by Chess.com & Chelsea FC Royal pitch
const INITIAL_BOARD = [
  ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
  ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '♙', '', '', '', ''], // 1. e4 played
  ['', '', '♘', '', '', '', '', ''], // 2. Nf3 played
  ['♙', '♙', '♙', '', '♙', '♙', '♙', '♙'],
  ['♖', '', '♗', '♕', '♔', '♗', '♘', '♖'],
];

export const ChessBoardWidget: React.FC = () => {
  const [selectedSquare, setSelectedSquare] = useState<string | null>('e4');
  const [boardEval, setBoardEval] = useState<number>(3.4);

  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

  const handleSquareClick = (file: string, rank: string) => {
    sounds.playClick();
    const pos = `${file}${rank}`;
    setSelectedSquare(pos);
    setBoardEval((prev) => Math.min(9.9, Math.max(0.5, prev + (Math.random() * 0.8 - 0.4))));
  };

  return (
    <div className="w-full max-w-md mx-auto rounded-2xl bg-gradient-to-b from-[#0A1633] via-[#060D20] to-[#040814] border-2 border-blue-600/40 p-4 sm:p-5 shadow-[0_20px_50px_rgba(3,70,148,0.35)] relative overflow-hidden select-none">
      {/* Chelsea Stamford Pitch Glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header: Chelsea FC Pride & Chess.com Eval */}
      <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-blue-500/20">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-lg text-blue-300">
            🦁
          </div>
          <div>
            <div className="text-[10px] font-mono text-blue-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span>CHELSEA FC</span>
              <span className="text-slate-600">•</span>
              <span className="text-amber-400">THE BLUES #26</span>
            </div>
            <div className="text-xs font-bold text-white font-display">
              STAMFORD CHESSBOARD
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-lime/10 text-lime border border-lime/30 font-bold">
            +{boardEval.toFixed(1)} ADVANTAGE
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-600 text-white font-black tracking-wider shadow-[0_0_10px_rgba(37,99,235,0.5)]">
            5+0 BLITZ
          </span>
        </div>
      </div>

      {/* Main Board Container + Chess.com Evaluation Bar */}
      <div className="flex gap-2.5 items-stretch">
        {/* Chess.com Vertical Eval Bar */}
        <div className="flex flex-col items-center justify-between py-2 px-1 rounded-lg bg-[#030816] border border-blue-500/30 w-7 shrink-0 font-mono text-[9px] font-bold">
          <span className="text-lime leading-none">+{boardEval.toFixed(1)}</span>
          <div className="w-2.5 flex-1 bg-slate-800 rounded-full my-1.5 overflow-hidden flex flex-col-reverse">
            <div
              className="w-full bg-gradient-to-t from-lime via-cyan-400 to-white transition-all duration-300"
              style={{ height: `${Math.min(95, Math.max(20, 50 + boardEval * 5))}%` }}
            />
          </div>
          <span className="text-slate-500 text-[8px] leading-none">EVAL</span>
        </div>

        {/* 8x8 Chessboard Grid */}
        <div className="flex-1 aspect-square rounded-xl overflow-hidden border-2 border-blue-500/30 shadow-inner grid grid-cols-8 grid-rows-8 relative">
          {ranks.map((rank, rIdx) =>
            files.map((file, fIdx) => {
              const isDark = (rIdx + fIdx) % 2 === 1;
              const pos = `${file}${rank}`;
              const piece = INITIAL_BOARD[rIdx][fIdx];
              const isSelected = selectedSquare === pos;

              return (
                <div
                  key={pos}
                  onClick={() => handleSquareClick(file, rank)}
                  className={`relative flex items-center justify-center transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-lime/30 shadow-[inset_0_0_12px_rgba(212,255,0,0.4)]'
                      : isDark
                      ? 'bg-[#0E2042]' // Chelsea Stamford Navy Square
                      : 'bg-[#183568]' // Chelsea Stamford Electric Light Square
                  } hover:brightness-125`}
                >
                  {/* Chess piece icon */}
                  {piece && (
                    <motion.span
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className={`text-xl sm:text-2xl select-none transition-transform hover:scale-110 ${
                        rIdx < 2 ? 'text-amber-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]' : 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]'
                      }`}
                    >
                      {piece}
                    </motion.span>
                  )}

                  {/* Rank notation along first column */}
                  {fIdx === 0 && (
                    <span className="absolute top-0.5 left-1 text-[8px] font-mono text-blue-200/50 pointer-events-none">
                      {rank}
                    </span>
                  )}

                  {/* File notation along bottom row */}
                  {rIdx === 7 && (
                    <span className="absolute bottom-0.5 right-1 text-[8px] font-mono text-blue-200/50 pointer-events-none">
                      {file}
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Move History Strip (Chess.com notation) */}
      <div className="mt-3 pt-2.5 border-t border-blue-500/20 flex items-center justify-between text-[11px] font-mono text-slate-300">
        <div className="flex items-center gap-2">
          <span className="text-amber-400 font-bold">1. e4</span>
          <span className="text-slate-400">e5</span>
          <span className="text-amber-400 font-bold">2. Nf3</span>
          <span className="text-slate-400">Nc6</span>
          <span className="text-lime font-bold">3. d4!</span>
        </div>
        <span className="text-blue-400 font-bold text-[10px]">
          [STAMFORD GAMBIT]
        </span>
      </div>
    </div>
  );
};
