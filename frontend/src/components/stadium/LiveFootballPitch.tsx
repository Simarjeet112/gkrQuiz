import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { sounds } from '../../utils/soundEffects';
import { Play, Pause, Zap, Sparkles, RefreshCw, Volume2, Trophy } from 'lucide-react';

type MatchPhase = 'idle' | 'kante_tackle' | 'hazard_dribble' | 'ronaldo_shoot' | 'goal_celebration';

export const LiveFootballPitch: React.FC = () => {
  const [phase, setPhase] = useState<MatchPhase>('idle');
  const [autoPlay, setAutoPlay] = useState<boolean>(true);
  const [commentary, setCommentary] = useState<string>(
    'Live Match in Progress: Kanté controls the midfield, Hazard ready to break, CR7 waiting in the box!'
  );
  const [matchTime, setMatchTime] = useState<number>(90);
  const [goalsCount, setGoalsCount] = useState<number>(7);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Ball positions for different phases
  // Pitch is viewed horizontally: Left (Defense/Midfield) -> Right (Goal post)
  const ballPositions = {
    idle: { x: '24%', y: '52%', scale: 1, rotate: 0 },
    kante_tackle: { x: '28%', y: '48%', scale: 1.2, rotate: 180 },
    hazard_dribble: { x: '55%', y: '36%', scale: 1.3, rotate: 540 },
    ronaldo_shoot: { x: '88%', y: '22%', scale: 1.5, rotate: 1080 },
    goal_celebration: { x: '92%', y: '26%', scale: 1.1, rotate: 1440 },
  };

  // Automated Match Director Loop
  useEffect(() => {
    if (!autoPlay) return;

    const runSequence = async () => {
      // Step 1: Kanté Tackle
      setPhase('kante_tackle');
      setCommentary('⚡ N’Golo Kanté slides in with an immaculate tackle! Wins the ball cleanly with 0 fouls!');
      sounds.playKanteTackle();

      await new Promise((r) => setTimeout(r, 1400));
      if (!autoPlay) return;

      // Step 2: Pass to Hazard & Silky Dribble
      setPhase('hazard_dribble');
      setCommentary('🪄 Eden Hazard picks it up! Body-feints past 2 defenders with silky Chelsea magic!');
      sounds.playHazardMagic();

      await new Promise((r) => setTimeout(r, 1600));
      if (!autoPlay) return;

      // Step 3: Cross to Cristiano & Rocket Bicycle Kick
      setPhase('ronaldo_shoot');
      setCommentary('⚽ Cristiano Ronaldo leaps 2.38m in the air! THUNDEROUS BICYCLE KICK INTO THE TOP CORNER!');

      await new Promise((r) => setTimeout(r, 900));
      if (!autoPlay) return;

      // Step 4: GOAAAL & SIUUU Celebration!
      setPhase('goal_celebration');
      setGoalsCount((g) => g + 1);
      setCommentary('🔥 GOOOAAALLL! CR7 SIUUUUUU! 🏆 Real Madrid & Chelsea royalty conquer the arena!');
      sounds.playSiuuu();

      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5, x: 0.7 },
        colors: ['#FEBE10', '#FFFFFF', '#034694', '#10B981', '#D4FF00'],
      });

      await new Promise((r) => setTimeout(r, 3800));
      if (!autoPlay) return;

      // Reset to idle before next play
      setPhase('idle');
      setCommentary('Match continues: Madrid & Chelsea legendary tiki-taka circulating through the pitch...');
    };

    const interval = setInterval(runSequence, 9000);
    // Trigger initial run shortly after mount
    const initialTimeout = setTimeout(runSequence, 1200);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimeout);
    };
  }, [autoPlay]);

  // Match clock increment
  useEffect(() => {
    const clockInterval = setInterval(() => {
      setMatchTime((t) => (t >= 95 ? 90 : t + 1));
    }, 4000);
    return () => clearInterval(clockInterval);
  }, []);

  // Manual Trigger Handlers
  const handleKanteTackleAction = () => {
    setAutoPlay(false);
    setPhase('kante_tackle');
    setCommentary('⚡ N’Golo Kanté slides in with an immaculate tackle! Ball recovered for Chelsea!');
    sounds.playKanteTackle();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6, x: 0.3 },
      colors: ['#10B981', '#34D399', '#FFFFFF'],
    });
  };

  const handleHazardDribbleAction = () => {
    setAutoPlay(false);
    setPhase('hazard_dribble');
    setCommentary('🪄 Eden Hazard turns on a sixpence, dances past the defense into the half-space!');
    sounds.playHazardMagic();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.55, x: 0.55 },
      colors: ['#034694', '#60A5FA', '#FFFFFF'],
    });
  };

  const handleRonaldoSiuuuAction = () => {
    setAutoPlay(false);
    setPhase('ronaldo_shoot');
    setCommentary('⚽ CRISTIANO ROCKET! Ball fired at 120 km/h into the top corner!');

    setTimeout(() => {
      setPhase('goal_celebration');
      setGoalsCount((g) => g + 1);
      setCommentary('🔥 SIUUUUUU! 5x Ballon d’Or victory celebration unleashed!');
      sounds.playSiuuu();
      confetti({
        particleCount: 130,
        spread: 90,
        origin: { y: 0.5, x: 0.8 },
        colors: ['#FEBE10', '#FFFFFF', '#D97706', '#D4FF00'],
      });
    }, 700);
  };

  return (
    <div className="w-full rounded-2xl border-2 border-amber-400/50 bg-[#061019] shadow-2xl overflow-hidden select-none relative">
      {/* ── TOP SCOREBOARD & LIVE MATCH HUD ── */}
      <div className="bg-[#040911]/95 px-3 py-2 sm:px-4 sm:py-2.5 border-b border-white/10 flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          {/* Club Badges */}
          <div className="flex -space-x-1.5 items-center">
            <div className="w-6 h-6 rounded-full bg-amber-950 border border-amber-400/80 p-0.5 flex items-center justify-center shadow-md">
              <img src="/real-madrid-logo.svg" alt="Real Madrid" className="w-full h-full object-contain" />
            </div>
            <div className="w-6 h-6 rounded-full bg-blue-950 border border-blue-400/80 p-0.5 flex items-center justify-center shadow-md">
              <img src="/chelsea-logo.svg" alt="Chelsea" className="w-full h-full object-contain" />
            </div>
          </div>

          <div className="font-mono text-xs font-black text-white flex items-center gap-1.5">
            <span className="text-amber-400 font-display">MADRID & CHELSEA</span>
            <span className="px-1.5 py-0.5 rounded bg-black/80 text-lime font-mono text-xs border border-lime/40">
              {goalsCount}
            </span>
            <span className="text-slate-500">:</span>
            <span className="px-1.5 py-0.5 rounded bg-black/80 text-rose-400 font-mono text-xs border border-rose-500/30">
              0
            </span>
            <span className="text-slate-400 text-[10px] hidden sm:inline">BUGS FC</span>
          </div>
        </div>

        {/* Live Clock & Match Status */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/40 text-[10px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            <span>LIVE</span>
          </div>
          <span className="text-white font-bold text-[11px] tabular-nums">
            {matchTime}':45"
          </span>
          <button
            onClick={() => setAutoPlay(!autoPlay)}
            className={`px-2 py-1 rounded-lg border text-[10px] font-bold transition-all flex items-center gap-1 ${
              autoPlay
                ? 'bg-lime/20 border-lime/60 text-lime'
                : 'bg-white/5 border-white/20 text-slate-400'
            }`}
            title="Toggle Live Match Auto-Play Replay"
          >
            {autoPlay ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            <span className="hidden sm:inline">{autoPlay ? 'AUTO' : 'MANUAL'}</span>
          </button>
        </div>
      </div>

      {/* ── THE LIVE FOOTBALL STADIUM PITCH ── */}
      <div className="relative w-full h-[260px] xs:h-[300px] sm:h-[340px] md:h-[370px] overflow-hidden bg-gradient-to-r from-[#072412] via-[#09351a] to-[#061e0f]">
        {/* Pitch Lawn Mowing Stripes (Vertical Turf Patterns) */}
        <div
          className="absolute inset-0 opacity-25 pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, #0d4622 0px, #0d4622 45px, transparent 45px, transparent 90px)',
          }}
        />

        {/* Stadium Corner Floodlights Glowing Beams */}
        <div className="absolute -top-10 -left-10 w-44 h-44 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-10 -right-10 w-44 h-44 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-yellow-400/20 rounded-full blur-3xl pointer-events-none" />

        {/* Pitch Tactical Markings (Boundary, Center Circle, Boxes) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" stroke="#FFFFFF" strokeWidth="1.5" fill="none">
          {/* Outer Boundary */}
          <rect x="5%" y="6%" width="90%" height="88%" rx="6" />
          {/* Halfway Line */}
          <line x1="50%" y1="6%" x2="50%" y2="94%" />
          {/* Center Circle & Spot */}
          <circle cx="50%" cy="50%" r="42" />
          <circle cx="50%" cy="50%" r="2.5" fill="#FFFFFF" />

          {/* Left Penalty Area (Midfield Defense) */}
          <rect x="5%" y="24%" width="16%" height="52%" />
          <rect x="5%" y="36%" width="7%" height="28%" />
          <path d="M 21% 40% A 20 20 0 0 1 21% 60%" />

          {/* Right Penalty Area (CR7 Attacking Zone & Goal Post) */}
          <rect x="79%" y="22%" width="16%" height="56%" />
          <rect x="88%" y="35%" width="7%" height="30%" />
          <path d="M 79% 38% A 20 20 0 0 0 79% 62%" />
        </svg>

        {/* Chess Tactical Coordinates Watermark Faded onto Pitch */}
        <div className="absolute inset-0 flex items-center justify-between px-6 pointer-events-none opacity-15 font-mono text-[9px] text-white">
          <div className="flex flex-col gap-8">
            <span>♟ 1. e4 (KANTÉ CENTRAL OUTPOST)</span>
            <span>♞ 2. Nf3 (HAZARD HALF-SPACE PIN)</span>
            <span>♚ 3. CHECKMATE (CR7 BICYCLE KICK)</span>
          </div>
          <div className="text-right">
            <span>STAMFORD BRIDGE × BERNABÉU</span>
          </div>
        </div>

        {/* ── GOAL POST NET (Right Side) ── */}
        <motion.div
          animate={
            phase === 'ronaldo_shoot' || phase === 'goal_celebration'
              ? { x: [0, 6, -3, 4, 0], scaleY: [1, 1.05, 0.95, 1] }
              : { x: 0 }
          }
          transition={{ duration: 0.6 }}
          className="absolute right-[3%] top-[25%] bottom-[25%] w-8 rounded-r-md border-r-4 border-y-4 border-white shadow-lg pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)',
            backgroundSize: '7px 7px',
            backgroundColor: 'rgba(255,255,255,0.06)',
          }}
        >
          <div className="absolute -left-2 top-0 bottom-0 w-1 bg-white" />
          <span className="absolute -top-5 right-0 font-mono text-[9px] font-black text-amber-400">
            NET
          </span>
        </motion.div>

        {/* ── PLAYER 1: N'GOLO KANTÉ (Midfield #7) ── */}
        <motion.div
          animate={
            phase === 'kante_tackle'
              ? { x: [0, 45, 20], y: [0, -18, 0], scale: 1.15 }
              : { x: 0, y: [0, -4, 0], scale: 1 }
          }
          transition={
            phase === 'kante_tackle'
              ? { duration: 0.7, ease: 'easeOut' }
              : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
          }
          onClick={handleKanteTackleAction}
          className="absolute left-[16%] top-[40%] z-20 cursor-pointer group flex flex-col items-center"
        >
          <div className="relative">
            {/* Tackle Shockwave Ring */}
            {phase === 'kante_tackle' && (
              <motion.div
                initial={{ scale: 0.8, opacity: 1 }}
                animate={{ scale: 2.2, opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute -inset-3 rounded-full border-2 border-emerald-400"
              />
            )}
            <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.7)] bg-black group-hover:scale-110 transition-transform">
              <img
                src="/kante.jpg"
                alt="N'Golo Kanté"
                className="w-full h-full object-cover object-top filter brightness-110"
              />
            </div>
            {/* Club Tag */}
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-blue-900 border border-emerald-400 flex items-center justify-center p-0.5">
              <img src="/chelsea-logo.svg" alt="" className="w-full h-full object-contain" />
            </div>
          </div>

          <div className="mt-1 px-1.5 py-0.5 rounded bg-black/90 border border-emerald-400/80 text-[10px] font-mono font-black text-emerald-300 shadow">
            #7 KANTÉ ⚡
          </div>
        </motion.div>

        {/* ── PLAYER 2: EDEN HAZARD (Left Winger / Half-Space #10) ── */}
        <motion.div
          animate={
            phase === 'hazard_dribble'
              ? { x: [0, 30, 60, 45], y: [0, -25, 20, 0], scale: 1.2 }
              : { x: 0, y: [0, 4, 0], scale: 1 }
          }
          transition={
            phase === 'hazard_dribble'
              ? { duration: 1.2, ease: 'easeInOut' }
              : { duration: 3.4, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }
          }
          onClick={handleHazardDribbleAction}
          className="absolute left-[42%] top-[25%] z-20 cursor-pointer group flex flex-col items-center"
        >
          <div className="relative">
            {/* Dribble Magic Aura */}
            {phase === 'hazard_dribble' && (
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity }}
                className="absolute -inset-2.5 rounded-full border-2 border-dashed border-blue-400"
              />
            )}
            <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.7)] bg-black group-hover:scale-110 transition-transform">
              <img
                src="/hazard.jpg"
                alt="Eden Hazard"
                className="w-full h-full object-cover object-top filter brightness-110"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-blue-900 border border-blue-400 flex items-center justify-center p-0.5">
              <img src="/chelsea-logo.svg" alt="" className="w-full h-full object-contain" />
            </div>
          </div>

          <div className="mt-1 px-1.5 py-0.5 rounded bg-black/90 border border-blue-400/80 text-[10px] font-mono font-black text-blue-300 shadow">
            #10 HAZARD 🪄
          </div>
        </motion.div>

        {/* ── PLAYER 3: CRISTIANO RONALDO (Striker #7 // Ballon d'Or Winner) ── */}
        <motion.div
          animate={
            phase === 'ronaldo_shoot'
              ? { y: [0, -45, -15], rotate: [0, -25, 10], scale: 1.28 }
              : phase === 'goal_celebration'
              ? { y: [0, -35, 0], scale: [1, 1.25, 1.15] }
              : { x: 0, y: [0, -5, 0], scale: 1 }
          }
          transition={
            phase === 'ronaldo_shoot'
              ? { duration: 0.8, ease: 'easeOut' }
              : phase === 'goal_celebration'
              ? { duration: 1.2, repeat: Infinity, ease: 'easeInOut' }
              : { duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }
          }
          onClick={handleRonaldoSiuuuAction}
          className="absolute right-[22%] top-[32%] z-20 cursor-pointer group flex flex-col items-center"
        >
          <div className="relative">
            {/* Golden 5x Ballon d'Or Flame Aura */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-2.5 rounded-full border-2 border-amber-400/60 shadow-[0_0_25px_rgba(254,190,16,0.8)]"
            />
            <div className="w-15 h-15 sm:w-18 sm:h-18 rounded-full overflow-hidden border-2 border-amber-400 shadow-[0_0_30px_rgba(254,190,16,0.9)] bg-black group-hover:scale-110 transition-transform">
              <img
                src="/ronaldo-ballondor.jpg"
                alt="Cristiano Ronaldo"
                className="w-full h-full object-cover object-top filter brightness-115 contrast-110"
              />
            </div>
            {/* Real Madrid Crest Badge */}
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-amber-950 border border-amber-400 flex items-center justify-center p-0.5">
              <img src="/real-madrid-logo.svg" alt="" className="w-full h-full object-contain" />
            </div>
          </div>

          <div className="mt-1 px-2 py-0.5 rounded bg-black/95 border border-amber-400 text-[10px] font-mono font-black text-amber-300 shadow flex items-center gap-1">
            <span>🏆 CR7</span>
            <span>SIUUU!</span>
          </div>
        </motion.div>

        {/* ── THE ANIMATED FOOTBALL (⚽) ── */}
        <motion.div
          animate={ballPositions[phase]}
          transition={{ duration: 0.85, ease: 'easeInOut' }}
          className="absolute z-30 pointer-events-none"
        >
          {/* Ball Shadow */}
          <div className="w-6 h-2 rounded-full bg-black/60 blur-[2px] translate-y-3" />
          {/* Ball with Fire/Spark Tail */}
          <div className="relative text-2xl filter drop-shadow-[0_0_12px_rgba(254,190,16,0.9)]">
            ⚽
            {phase === 'ronaldo_shoot' && (
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1.5 }}
                className="absolute -left-6 top-0 text-xl"
              >
                🔥
              </motion.span>
            )}
            {phase === 'hazard_dribble' && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute -left-4 top-0 text-blue-400 text-sm font-bold"
              >
                💨
              </motion.span>
            )}
            {phase === 'kante_tackle' && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute -left-4 top-0 text-emerald-400 text-sm font-bold"
              >
                ⚡
              </motion.span>
            )}
          </div>
        </motion.div>

        {/* ── GOAAAL & SIUUU POPUP BANNER ── */}
        <AnimatePresence>
          {phase === 'goal_celebration' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.4, y: 20 }}
              animate={{ opacity: 1, scale: 1.1, y: 0 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="absolute inset-x-0 top-6 z-40 flex flex-col items-center pointer-events-none"
            >
              <div className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-carbon-950 font-black font-display text-xl sm:text-2xl uppercase tracking-wider shadow-[0_0_50px_rgba(254,190,16,0.9)] border-2 border-white flex items-center gap-2 animate-bounce">
                <span>🏆</span>
                <span>GOAAAL! CR7 SIUUUU!</span>
                <span>⚽</span>
              </div>
              <div className="mt-1 px-3 py-1 rounded-full bg-black/90 border border-amber-400 text-amber-300 font-mono text-[10px] font-bold">
                KANTÉ (TACKLE) ➔ HAZARD (MAGIC FLICK) ➔ CR7 (BICYCLE KICK)
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── LIVE COMMENTARY TICKER TAPE ── */}
      <div className="bg-[#050B14] px-4 py-2 border-t border-white/10 flex items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-amber-400 font-bold shrink-0">🎙️ COMMENTARY:</span>
          <span className="text-slate-200 truncate">{commentary}</span>
        </div>
        <span className="text-lime font-bold shrink-0 text-[10px] hidden sm:block">
          GTBIT CODE ARENA
        </span>
      </div>

      {/* ── INTERACTIVE CONTROLS BAR (PLAYERS CAN TRIGGER MOVES) ── */}
      <div className="bg-[#03070E] p-2.5 sm:p-3 border-t border-white/10 grid grid-cols-3 gap-2 font-mono text-xs">
        {/* Kanté Move */}
        <button
          onClick={handleKanteTackleAction}
          className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 font-bold active:scale-95 transition-all shadow-md"
        >
          <span>⚡</span>
          <span className="truncate">Kanté Tackle</span>
        </button>

        {/* Hazard Move */}
        <button
          onClick={handleHazardDribbleAction}
          className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-blue-950/50 hover:bg-blue-900/60 border border-blue-500/40 text-blue-300 font-bold active:scale-95 transition-all shadow-md"
        >
          <span>🪄</span>
          <span className="truncate">Hazard Dribble</span>
        </button>

        {/* CR7 Move */}
        <button
          onClick={handleRonaldoSiuuuAction}
          className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-carbon-950 font-black active:scale-95 transition-all shadow-[0_0_15px_rgba(254,190,16,0.5)]"
        >
          <span>⚽</span>
          <span className="truncate">CR7 SIUUU!</span>
        </button>
      </div>
    </div>
  );
};
