import React from 'react';
import { motion } from 'framer-motion';

export type MascotMood =
  | 'idle'
  | 'welcome'
  | 'thinking'
  | 'quiz'
  | 'correct'
  | 'incorrect'
  | 'tough'
  | 'urgent'
  | 'victory';

interface MascotProps {
  mood?: MascotMood;
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showSpeech?: boolean;
}

export const GeekroomMascotReaction: React.FC<MascotProps> = ({
  mood = 'idle',
  message,
  size = 'md',
  className = '',
  showSpeech = true,
}) => {
  const sizeMap = {
    sm: { container: 'w-20 h-20', svg: 72 },
    md: { container: 'w-28 h-28', svg: 104 },
    lg: { container: 'w-44 h-44', svg: 160 },
  };

  // Visor eye shapes based on emotional state
  const renderEyes = () => {
    switch (mood) {
      case 'welcome':
      case 'correct':
      case 'victory':
        // Happy arch eyes (^ ^)
        return (
          <>
            <path d="M 33 46 Q 42 34 51 46" stroke="#00F0FF" strokeWidth="4.5" strokeLinecap="round" fill="none" />
            <path d="M 69 46 Q 78 34 87 46" stroke="#00F0FF" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          </>
        );
      case 'tough':
        // Boss fight / Tough question: Intense glowing red/crimson eyes with laser visor
        return (
          <>
            <polygon points="33,40 52,47 33,52" fill="#FF0055" />
            <polygon points="87,40 68,47 87,52" fill="#FF0055" />
            <circle cx="42" cy="46" r="3" fill="#FFF" />
            <circle cx="78" cy="46" r="3" fill="#FFF" />
            <line x1="28" y1="56" x2="92" y2="56" stroke="#FF0055" strokeWidth="2" strokeDasharray="3 2" className="animate-pulse" />
          </>
        );
      case 'thinking':
        // Scanning laser across visor
        return (
          <>
            <circle cx="42" cy="46" r="6" fill="#00F0FF" />
            <circle cx="78" cy="46" r="6" fill="#00F0FF" />
            <line x1="26" y1="46" x2="94" y2="46" stroke="#00FF88" strokeWidth="2" strokeDasharray="6 4" opacity="0.8" />
          </>
        );
      case 'incorrect':
        // Encouraging soft eyes
        return (
          <>
            <circle cx="42" cy="46" r="5.5" fill="#38BDF8" />
            <circle cx="78" cy="46" r="5.5" fill="#38BDF8" />
            <path d="M 52 56 Q 60 52 68 56" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </>
        );
      case 'urgent':
        // Wide alert eyes
        return (
          <>
            <circle cx="42" cy="46" r="8" fill="#FF0055" />
            <circle cx="78" cy="46" r="8" fill="#FF0055" />
            <circle cx="42" cy="46" r="3.5" fill="#FFF" />
            <circle cx="78" cy="46" r="3.5" fill="#FFF" />
          </>
        );
      case 'quiz':
        // Focused tech eyes
        return (
          <>
            <rect x="34" y="43" width="16" height="6" rx="3" fill="#00FF88" />
            <rect x="70" y="43" width="16" height="6" rx="3" fill="#00FF88" />
            <circle cx="42" cy="46" r="2" fill="#FFF" />
            <circle cx="78" cy="46" r="2" fill="#FFF" />
          </>
        );
      case 'idle':
      default:
        // Luminous circular white eyes (identical to the official Geekroom logo)
        return (
          <>
            <circle cx="42" cy="46" r="7" fill="#FFFFFF" />
            <circle cx="78" cy="46" r="7" fill="#FFFFFF" />
            <circle cx="44" cy="44" r="2" fill="#00F0FF" />
            <circle cx="80" cy="44" r="2" fill="#00F0FF" />
          </>
        );
    }
  };

  const getAuraColor = () => {
    if (mood === 'tough') return 'rgba(255, 0, 85, 0.45)';
    if (mood === 'urgent') return 'rgba(239, 68, 68, 0.45)';
    if (mood === 'correct' || mood === 'victory') return 'rgba(0, 255, 136, 0.4)';
    return 'rgba(0, 240, 255, 0.3)';
  };

  return (
    <div className={`flex items-center gap-3.5 select-none ${className}`}>
      <motion.div
        animate={
          mood === 'victory' || mood === 'correct'
            ? { y: [0, -10, 0, -4, 0], rotate: [0, -3, 3, -1, 0] }
            : mood === 'urgent'
            ? { x: [-3, 3, -3, 3, 0] }
            : mood === 'tough'
            ? { scale: [1, 1.05, 1] }
            : { y: [0, -5, 0] }
        }
        transition={{
          repeat: Infinity,
          duration: mood === 'urgent' ? 0.35 : mood === 'tough' ? 1.5 : 3,
          ease: 'easeInOut',
        }}
        className={`relative ${sizeMap[size].container} flex items-center justify-center shrink-0`}
      >
        {/* Ambient Back Glow */}
        <div
          className="absolute inset-0 rounded-full blur-xl pointer-events-none transition-all duration-500"
          style={{ backgroundColor: getAuraColor() }}
        />

        {/* Mascot SVG Silhouette */}
        <svg
          viewBox="0 0 120 120"
          width="100%"
          height="100%"
          className="relative drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
        >
          {/* Left Geekroom < Bracket Ear */}
          <path
            d="M 22 28 L 6 52 L 22 76"
            stroke="#00F0FF"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Right Geekroom > Bracket Ear */}
          <path
            d="M 98 28 L 114 52 L 98 76"
            stroke="#00F0FF"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Center Robot Helmet Chassis */}
          <rect
            x="24"
            y="22"
            width="72"
            height="62"
            rx="18"
            fill="#090D17"
            stroke={mood === 'tough' ? '#FF0055' : '#00F0FF'}
            strokeWidth="2.5"
          />

          {/* Inner Dark Visor Bezel */}
          <rect
            x="29"
            y="30"
            width="62"
            height="44"
            rx="12"
            fill="#020408"
            stroke="#151E32"
            strokeWidth="1.5"
          />

          {/* Expressive Visor Eyes */}
          {renderEyes()}

          {/* Center Orange Keyboard Slash / Collar Stripe from Geekroom Logo */}
          <path
            d="M 58 10 L 62 10 L 62 24 L 58 24 Z"
            fill="#FF6B00"
          />
          <circle cx="60" cy="8" r="4.5" fill={mood === 'tough' ? '#FF0055' : '#FF6B00'} className="animate-pulse" />

          {/* Robot Neck Base */}
          <rect x="50" y="84" width="20" height="7" rx="2" fill="#151E32" />

          {/* Lower Torso / Chest with <G/> Terminal Badge */}
          <path
            d="M 38 91 L 82 91 L 76 114 L 44 114 Z"
            fill="#090D17"
            stroke={mood === 'tough' ? '#FF0055' : '#8B5CF6'}
            strokeWidth="2"
          />

          {/* Center Orange Keyboard Slash on Chest */}
          <line x1="60" y1="94" x2="60" y2="111" stroke="#FF6B00" strokeWidth="3" strokeDasharray="2 2" />

          {/* Logo Terminal Text */}
          <text
            x="60"
            y="105"
            fontSize="8"
            fontWeight="bold"
            fontFamily="monospace"
            fill="#00F0FF"
            textAnchor="middle"
          >
            &lt;G/&gt;
          </text>
        </svg>
      </motion.div>

      {/* Speech Commentary Bubble */}
      {showSpeech && message && (
        <motion.div
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          className={`relative max-w-xs md:max-w-sm px-3.5 py-2.5 rounded-xl border text-xs md:text-sm shadow-xl font-sans ${
            mood === 'tough'
              ? 'bg-[#1C0610] border-red-500/50 text-red-200'
              : 'bg-[#0A0E18] border-arena-border text-slate-200'
          }`}
        >
          {/* Arrow */}
          <div
            className={`absolute top-1/2 -left-2 -translate-y-1/2 w-0 h-0 border-y-4 border-y-transparent border-r-8 ${
              mood === 'tough' ? 'border-r-[#1C0610]' : 'border-r-[#0A0E18]'
            }`}
          />
          <span
            className={`font-semibold mr-1.5 font-mono text-[10px] uppercase tracking-wider ${
              mood === 'tough' ? 'text-red-400' : 'text-arena-cyan'
            }`}
          >
            [BITBYTE]
          </span>
          {message}
        </motion.div>
      )}
    </div>
  );
};
