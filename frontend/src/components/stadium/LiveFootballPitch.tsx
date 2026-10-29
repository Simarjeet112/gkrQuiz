import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { sounds } from '../../utils/soundEffects';
import { ChevronLeft, ChevronRight, Volume2, VolumeX, Play, Pause } from 'lucide-react';

// ─── Frame Definitions ────────────────────────────────────────────────────────
interface Frame {
  id: number;
  photo: string;
  player: string;
  tagline: string;
  sub: string;
  badge: string;
  accent: string;
  accentDark: string;
  sound: () => void;
  confettiColors: string[];
}

const FRAMES: Frame[] = [
  {
    id: 0,
    photo: '/ronaldo-ballondor.jpg',
    player: 'CRISTIANO RONALDO',
    tagline: '⚽ GOAAALL! SIUUUUU! ⚽',
    sub: "5× Ballon d'Or · Real Madrid Legend · 900+ Career Goals",
    badge: '/real-madrid-logo.svg',
    accent: '#FEBE10',
    accentDark: '#b8860b',
    sound: () => sounds.playSiuuu(),
    confettiColors: ['#FEBE10', '#ffffff', '#d4ff00'],
  },
  {
    id: 1,
    photo: '/hazard.jpg',
    player: 'EDEN HAZARD',
    tagline: '🪄 SILKY MAGIC 🪄',
    sub: 'Chelsea FC Icon · PL Player of the Season · Pure Footballer',
    badge: '/chelsea-logo.svg',
    accent: '#034694',
    accentDark: '#022a5a',
    sound: () => sounds.playHazardMagic(),
    confettiColors: ['#034694', '#ffffff', '#d4ff00'],
  },
  {
    id: 2,
    photo: '/kante.jpg',
    player: "N'GOLO KANTÉ",
    tagline: '⚡ 100% KANTÉ ⚡',
    sub: '70% of Earth is water · The rest is covered by Kanté · PL Champion',
    badge: '/chelsea-logo.svg',
    accent: '#00a550',
    accentDark: '#005a2b',
    sound: () => sounds.playKanteTackle(),
    confettiColors: ['#00a550', '#034694', '#ffffff'],
  },
];

const SLIDE_DURATION = 5500; // ms per frame

// ─── Wonderwall Synth (Web Audio API) ─────────────────────────────────────────
// Am7 → G → Dsus4 → A7sus4 acoustic guitar triangle-wave approximation
let _wonderCtx: AudioContext | null = null;
let _wonderTimer: ReturnType<typeof setTimeout> | null = null;
let _wonderActive = false;

function getWonderCtx(): AudioContext | null {
  try {
    if (!_wonderCtx) {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      _wonderCtx = new AC();
    }
    if (_wonderCtx.state === 'suspended') _wonderCtx.resume().catch(() => {});
    return _wonderCtx;
  } catch {
    return null;
  }
}

function playWonderwallLoop() {
  if (_wonderActive) return;
  _wonderActive = true;
  const chords: number[][] = [
    [220.00, 261.63, 329.63, 392.00], // Am7
    [196.00, 246.94, 293.66, 392.00], // G
    [293.66, 370.00, 440.00, 493.88], // Dsus4
    [220.00, 277.18, 329.63, 415.30], // A7sus4
  ];
  let ci = 0;

  function tick() {
    if (!_wonderActive) return;
    const ctx = getWonderCtx();
    if (!ctx) return;
    const chord = chords[ci % chords.length];
    const now = ctx.currentTime;
    chord.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const t = now + i * 0.14;
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.055, t + 0.025);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.72);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.74);
    });
    ci++;
    _wonderTimer = setTimeout(tick, 820);
  }
  tick();
}

function stopWonderwallLoop() {
  _wonderActive = false;
  if (_wonderTimer) { clearTimeout(_wonderTimer); _wonderTimer = null; }
}

// ─── Main Component ────────────────────────────────────────────────────────────
export const LiveFootballPitch: React.FC = () => {
  const [frameIdx, setFrameIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [audioOn, setAudioOn] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const slideRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const playingRef = useRef(true);

  const currentFrame = FRAMES[frameIdx];

  // ── Start progress bar tick ───────────────────────────────────────────────
  const startProgress = useCallback(() => {
    setProgress(0);
    if (progressRef.current) clearInterval(progressRef.current);
    const step = 100 / (SLIDE_DURATION / 50);
    progressRef.current = setInterval(() => {
      setProgress((p) => Math.min(p + step, 100));
    }, 50);
  }, []);

  // ── Go to frame ───────────────────────────────────────────────────────────
  const goTo = useCallback((idx: number, playSound = true) => {
    const target = ((idx % FRAMES.length) + FRAMES.length) % FRAMES.length;
    setShowFlash(true);
    setTimeout(() => setShowFlash(false), 130);
    setFrameIdx(target);
    startProgress();
    if (playSound) {
      if (audioOn) { try { FRAMES[target].sound(); } catch {} }
      confetti({
        particleCount: 28,
        spread: 55,
        origin: { y: 0.55, x: 0.3 + Math.random() * 0.4 },
        colors: FRAMES[target].confettiColors,
        scalar: 0.75,
      });
    }
  }, [audioOn, startProgress]);

  // ── Auto-advance ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isPlaying) return;
    if (slideRef.current) clearTimeout(slideRef.current);
    slideRef.current = setTimeout(() => goTo(frameIdx + 1), SLIDE_DURATION);
    return () => { if (slideRef.current) clearTimeout(slideRef.current); };
  }, [frameIdx, isPlaying, goTo]);

  // ── Mount / unmount ───────────────────────────────────────────────────────
  useEffect(() => {
    startProgress();
    return () => {
      if (progressRef.current) clearInterval(progressRef.current);
      if (slideRef.current) clearTimeout(slideRef.current);
      stopWonderwallLoop();
    };
  }, [startProgress]);

  // ── Toggle Wonderwall audio ───────────────────────────────────────────────
  const toggleAudio = () => {
    if (audioOn) { stopWonderwallLoop(); setAudioOn(false); }
    else { playWonderwallLoop(); setAudioOn(true); }
  };

  // ── Toggle play/pause ─────────────────────────────────────────────────────
  const togglePlay = () => {
    playingRef.current = !playingRef.current;
    setIsPlaying((p) => {
      if (p) {
        if (slideRef.current) clearTimeout(slideRef.current);
        if (progressRef.current) clearInterval(progressRef.current);
      } else {
        startProgress();
      }
      return !p;
    });
  };

  return (
    <div
      className="relative w-full h-full min-h-[420px] rounded-2xl overflow-hidden select-none"
      style={{ background: '#0a0a0a' }}
    >
      {/* ── White flash on transition ── */}
      <AnimatePresence>
        {showFlash && (
          <motion.div
            key="flash"
            className="absolute inset-0 z-50 pointer-events-none"
            style={{ background: 'rgba(255,255,255,0.45)' }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.13 }}
          />
        )}
      </AnimatePresence>

      {/* ── Full-bleed photo with Ken Burns zoom ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={frameIdx}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1.16 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{
            opacity: { duration: 0.65, ease: 'easeInOut' },
            scale: { duration: SLIDE_DURATION / 1000, ease: 'linear' },
          }}
        >
          <img
            src={currentFrame.photo}
            alt={currentFrame.player}
            className="w-full h-full object-cover object-top"
            draggable={false}
          />

          {/* Bottom gradient */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to top, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.52) 38%, rgba(0,0,0,0.1) 62%, transparent 100%)',
            }}
          />
          {/* Radial vignette */}
          <div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse at center, transparent 48%, rgba(0,0,0,0.65) 100%)' }}
          />
          {/* Accent color glow at bottom */}
          <div
            className="absolute bottom-0 left-0 right-0 h-28 opacity-35"
            style={{ background: `linear-gradient(to top, ${currentFrame.accent}, transparent)` }}
          />
          {/* Film grain */}
          <div
            className="absolute inset-0 opacity-[0.035] pointer-events-none"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              backgroundSize: '128px',
            }}
          />
          {/* Scanlines */}
          <div
            className="absolute inset-0 opacity-[0.055] pointer-events-none"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,1) 2px, rgba(0,0,0,1) 4px)',
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Top bar ── */}
      <div className="absolute top-3 left-0 right-0 flex items-center justify-between px-4 z-20">
        <motion.img
          key={`badge-${frameIdx}`}
          src={currentFrame.badge}
          alt="Club"
          className="h-8 w-8 object-contain drop-shadow-lg"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.35 }}
        />

        <div className="flex gap-[6px] items-center">
          {FRAMES.map((f, i) => (
            <button
              key={f.id}
              onClick={() => goTo(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === frameIdx ? 22 : 8,
                height: 8,
                background: i === frameIdx ? currentFrame.accent : 'rgba(255,255,255,0.28)',
                boxShadow: i === frameIdx ? `0 0 8px ${currentFrame.accent}` : 'none',
              }}
            />
          ))}
        </div>

        <span
          className="text-[9px] font-black uppercase tracking-widest px-2 py-[3px] rounded"
          style={{ background: 'rgba(0,0,0,0.65)', color: '#d4ff00', border: '1px solid #d4ff00' }}
        >
          GEEKROOM
        </span>
      </div>

      {/* ── Text overlay ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`text-${frameIdx}`}
          className="absolute bottom-16 left-0 right-0 px-5 z-20"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.48, ease: 'easeOut' }}
        >
          <motion.p
            className="text-[10px] font-black uppercase tracking-[0.3em] mb-[3px]"
            style={{ color: currentFrame.accent, textShadow: `0 0 14px ${currentFrame.accent}` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.18 }}
          >
            {currentFrame.player}
          </motion.p>

          <motion.h2
            className="text-2xl md:text-[28px] font-black uppercase leading-tight"
            style={{
              color: '#ffffff',
              textShadow: `0 0 22px ${currentFrame.accent}, 2px 2px 0 rgba(0,0,0,0.85)`,
              WebkitTextStroke: `0.5px ${currentFrame.accentDark}`,
            }}
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.28, duration: 0.38 }}
          >
            {currentFrame.tagline}
          </motion.h2>

          <motion.p
            className="text-[11px] text-white/65 mt-[5px] font-medium tracking-wide max-w-[280px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.48 }}
          >
            {currentFrame.sub}
          </motion.p>
        </motion.div>
      </AnimatePresence>

      {/* ── Bottom controls ── */}
      <div className="absolute bottom-0 left-0 right-0 z-20 px-4 pb-3">
        {/* Progress bar */}
        <div className="w-full h-[3px] bg-white/15 rounded-full mb-3 overflow-hidden">
          <div
            className="h-full rounded-full transition-none"
            style={{
              width: `${progress}%`,
              background: `linear-gradient(to right, ${currentFrame.accent}, #fff)`,
              boxShadow: `0 0 6px ${currentFrame.accent}`,
              transition: 'width 0.05s linear',
            }}
          />
        </div>

        {/* Buttons row */}
        <div className="flex items-center justify-between">
          {/* Left: prev/next */}
          <div className="flex gap-2">
            <button
              onClick={() => goTo(frameIdx - 1)}
              className="w-7 h-7 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)' }}
            >
              <ChevronLeft size={14} color="#fff" />
            </button>
            <button
              onClick={() => goTo(frameIdx + 1)}
              className="w-7 h-7 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)' }}
            >
              <ChevronRight size={14} color="#fff" />
            </button>
          </div>

          {/* Center: play/pause */}
          <button
            onClick={togglePlay}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
            style={{
              background: currentFrame.accent,
              boxShadow: `0 0 14px ${currentFrame.accent}`,
            }}
          >
            {isPlaying ? <Pause size={13} color="#000" /> : <Play size={13} color="#000" />}
          </button>

          {/* Right: Wonderwall toggle */}
          <button
            onClick={toggleAudio}
            className="flex items-center gap-1 px-2 py-1 rounded-full text-[9px] font-black uppercase tracking-wide hover:scale-105 transition-transform"
            style={{
              background: audioOn ? currentFrame.accent : 'rgba(255,255,255,0.1)',
              color: audioOn ? '#000' : '#fff',
              border: `1px solid ${audioOn ? currentFrame.accent : 'rgba(255,255,255,0.22)'}`,
              boxShadow: audioOn ? `0 0 10px ${currentFrame.accent}` : 'none',
            }}
          >
            {audioOn ? <Volume2 size={10} /> : <VolumeX size={10} />}
            <span>Wonderwall</span>
          </button>
        </div>
      </div>

      {/* ── Ghost watermark ── */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none whitespace-nowrap"
        style={{ color: 'rgba(255,255,255,0.035)', fontSize: '60px', fontWeight: 900, letterSpacing: '0.2em' }}
      >
        CINEMATICA
      </div>
    </div>
  );
};

export default LiveFootballPitch;
