import React from 'react';
import { motion } from 'framer-motion';

export type MascotMood = 'idle' | 'welcome' | 'quiz' | 'correct' | 'incorrect' | 'urgent' | 'victory';

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
    sm: { container: 'w-20 h-20', svg: 70 },
    md: { container: 'w-28 h-28', svg: 100 },
    lg: { container: 'w-44 h-44', svg: 150 },
  };

  const getEyePath = () => {
    switch (mood) {
      case 'welcome':
      case 'correct':
      case 'victory':
        // Happy arch eyes ^ ^
        return (
          <>
            <path d="M 32 44 Q 40 34 48 44" stroke="#00FF88" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M 64 44 Q 72 34 80 44" stroke="#00FF88" strokeWidth="4" strokeLinecap="round" fill="none" />
          </>
        );
      case 'incorrect':
        // Caring soft eyes
        return (
          <>
            <circle cx="40" cy="42" r="5" fill="#38BDF8" />
            <circle cx="72" cy="42" r="5" fill="#38BDF8" />
            <path d="M 48 54 Q 56 50 64 54" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" fill="none" />
          </>
        );
      case 'urgent':
        // Wide alert eyes
        return (
          <>
            <circle cx="40" cy="42" r="7" fill="#EF4444" />
            <circle cx="72" cy="42" r="7" fill="#EF4444" />
            <circle cx="40" cy="42" r="3" fill="#FFF" />
            <circle cx="72" cy="42" r="3" fill="#FFF" />
          </>
        );
      case 'quiz':
        // Focused tech eyes with scanner tick
        return (
          <>
            <rect x="33" y="40" width="16" height="5" rx="2.5" fill="#00FF88" />
            <rect x="63" y="40" width="16" height="5" rx="2.5" fill="#00FF88" />
            <line x1="28" y1="52" x2="84" y2="52" stroke="#8B5CF6" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.7" />
          </>
        );
      case 'idle':
      default:
        // Friendly glowing cyan-green rounded pill eyes
        return (
          <>
            <rect x="34" y="38" width="14" height="9" rx="4.5" fill="#00FF88" />
            <rect x="64" y="38" width="14" height="9" rx="4.5" fill="#00FF88" />
            <circle cx="43" cy="41" r="2" fill="#FFF" />
            <circle cx="73" cy="41" r="2" fill="#FFF" />
          </>
        );
    }
  };

  const getAntennaColor = () => {
    if (mood === 'urgent') return '#EF4444';
    if (mood === 'correct' || mood === 'victory') return '#00FF88';
    return '#8B5CF6';
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <motion.div
        animate={
          mood === 'victory' || mood === 'correct'
            ? { y: [0, -8, 0, -4, 0], rotate: [0, -3, 3, -1, 0] }
            : mood === 'urgent'
            ? { x: [-2, 2, -2, 2, 0] }
            : { y: [0, -4, 0] }
        }
        transition={{
          repeat: Infinity,
          duration: mood === 'urgent' ? 0.3 : 3,
          ease: 'easeInOut',
        }}
        className={`relative ${sizeMap[size].container} flex items-center justify-center shrink-0`}
      >
        {/* Subtle Ambient Aura */}
        <div
          className="absolute inset-0 rounded-full blur-xl opacity-40"
          style={{
            backgroundColor:
              mood === 'urgent' ? '#EF4444' : mood === 'correct' || mood === 'victory' ? '#00FF88' : '#8B5CF6',
          }}
        />

        {/* Mascot SVG Silhouette */}
        <svg
          viewBox="0 0 112 112"
          width="100%"
          height="100%"
          className="relative drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]"
        >
          {/* Top Antenna */}
          <path d="M 56 22 L 56 10" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
          <circle cx="56" cy="8" r="5" fill={getAntennaColor()} className="animate-pulse" />

          {/* Left Ear / Headphone Sensor */}
          <rect x="14" y="36" width="8" height="24" rx="4" fill="#334155" stroke="#8B5CF6" strokeWidth="1.5" />
          <circle cx="18" cy="48" r="2.5" fill="#00FF88" />

          {/* Right Ear / Headphone Sensor */}
          <rect x="90" y="36" width="8" height="24" rx="4" fill="#334155" stroke="#8B5CF6" strokeWidth="1.5" />
          <circle cx="94" cy="48" r="2.5" fill="#00FF88" />

          {/* Outer Cyber Helmet / Head */}
          <rect
            x="20"
            y="20"
            width="72"
            height="58"
            rx="18"
            fill="#0F172A"
            stroke="#8B5CF6"
            strokeWidth="2.5"
          />

          {/* Visor Bezel (Dark Screen) */}
          <rect
            x="26"
            y="28"
            width="60"
            height="38"
            rx="12"
            fill="#030712"
            stroke="#1E293B"
            strokeWidth="1.5"
          />

          {/* Visor Scanline Tint */}
          <rect x="27" y="29" width="58" height="18" rx="6" fill="#8B5CF6" opacity="0.08" />

          {/* Expressive Visor Eyes */}
          {getEyePath()}

          {/* Robot Neck & Collar */}
          <rect x="46" y="78" width="20" height="8" rx="2" fill="#1E293B" stroke="#475569" strokeWidth="1" />

          {/* Robot Chest Plate */}
          <path
            d="M 34 86 L 78 86 L 72 106 L 40 106 Z"
            fill="#0F172A"
            stroke="#8B5CF6"
            strokeWidth="2"
          />

          {/* Chest Badge with Geekroom Emblem "<G/>" */}
          <text
            x="56"
            y="98"
            fontSize="8"
            fontWeight="bold"
            fontFamily="monospace"
            fill="#00FF88"
            textAnchor="middle"
          >
            &lt;G/&gt;
          </text>
        </svg>
      </motion.div>

      {/* Speech Bubble / Message Reaction */}
      {showSpeech && message && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: -6 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          className="relative max-w-xs md:max-w-sm px-3.5 py-2.5 rounded-2xl bg-arena-card border border-arena-border text-xs md:text-sm text-slate-200 shadow-lg"
        >
          {/* Arrow */}
          <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-0 h-0 border-y-4 border-y-transparent border-r-8 border-r-arena-card" />
          <span className="font-semibold text-arena-violetLight mr-1.5 font-mono text-[11px]">
            [GKR-BOT]
          </span>
          {message}
        </motion.div>
      )}
    </div>
  );
};
