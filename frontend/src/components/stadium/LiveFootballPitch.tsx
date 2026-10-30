import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { sounds } from '../../utils/soundEffects';
import { wonderwallAudio } from '../../utils/audioPlayer';
import { ChevronLeft, ChevronRight, Volume2, VolumeX, Play, Pause, Film, Image as ImageIcon, Flame, Trophy } from 'lucide-react';

// ─── Curated Ultra-HD Iconic Photos ──────────────────────────────────────────
interface PhotoFrame {
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

const PHOTO_FRAMES: PhotoFrame[] = [
  {
    id: 0,
    photo: '/ronaldo-ucl.jpg',
    player: 'CRISTIANO RONALDO // REAL MADRID',
    tagline: '🏆 UCL KINGS · 5× BALLON D\'OR 🏆',
    sub: '450 Goals in 438 Real Madrid Games · 5 Champions League Titles · Pure GOAT',
    badge: '/real-madrid-logo.svg',
    accent: '#FEBE10',
    accentDark: '#b8860b',
    sound: () => sounds.playSiuuu(),
    confettiColors: ['#FEBE10', '#ffffff', '#000000'],
  },
  {
    id: 1,
    photo: '/hazard-snow.jpg',
    player: 'EDEN HAZARD // CHELSEA FC',
    tagline: '🪄 STAMFORD BRIDGE MAESTRO 🪄',
    sub: 'Ice in his veins · 2× Premier League Champion · The Most Silky Dribbler in PL History',
    badge: '/chelsea-logo.svg',
    accent: '#034694',
    accentDark: '#022a5a',
    sound: () => sounds.playHazardMagic(),
    confettiColors: ['#034694', '#ffffff', '#00ff85'],
  },
  {
    id: 2,
    photo: '/kante-explosion.jpg',
    player: 'N\'GOLO KANTÉ // THE TANK',
    tagline: '💥 70% OF EARTH IS WATER 💥',
    sub: 'The rest 30% is covered by Kanté · UCL Final 2021 MOTM · Premier League Engine',
    badge: '/chelsea-logo.svg',
    accent: '#00ff85',
    accentDark: '#005a2b',
    sound: () => sounds.playKanteTackle(),
    confettiColors: ['#00ff85', '#034694', '#ffffff'],
  },
  {
    id: 3,
    photo: '/ronaldo-ballondor.jpg',
    player: 'CR7 // GOLDEN BALLON D\'OR',
    tagline: '👑 5× BALLON D\'OR WINNER 👑',
    sub: 'Real Madrid All-Time Top Scorer · 900+ Career Goals · The Ultimate Machine',
    badge: '/real-madrid-logo.svg',
    accent: '#FEBE10',
    accentDark: '#806000',
    sound: () => sounds.playSiuuu(),
    confettiColors: ['#FEBE10', '#ffffff', '#ffd700'],
  },
];

// ─── Football Video Clips & Viral Edits ──────────────────────────────────────
interface VideoClip {
  id: string;
  title: string;
  legend: string;
  club: string;
  youtubeId: string;
  badge: string;
  accent: string;
}

const VIDEO_CLIPS: VideoClip[] = [
  {
    id: 'cr7-cold-edit',
    title: 'CR7 4K Cold Moments & Edit',
    legend: 'Cristiano Ronaldo',
    club: 'Real Madrid',
    youtubeId: 'xet6yvy1F0M',
    badge: '/real-madrid-logo.svg',
    accent: '#FEBE10',
  },
  {
    id: 'cr7-siu',
    title: 'CR7 Iconic Siuu & Real Madrid Rockets',
    legend: 'Cristiano Ronaldo',
    club: 'Real Madrid',
    youtubeId: '9cqEp3qDuG4',
    badge: '/real-madrid-logo.svg',
    accent: '#FEBE10',
  },
  {
    id: 'hazard-solo',
    title: 'Hazard Solo Wonder Goal vs Arsenal',
    legend: 'Eden Hazard',
    club: 'Chelsea FC',
    youtubeId: 'wIWqvf60NhM',
    badge: '/chelsea-logo.svg',
    accent: '#034694',
  },
  {
    id: 'kante-engine',
    title: 'Kanté Defensive Masterclass & UCL Final',
    legend: "N'Golo Kanté",
    club: 'Chelsea FC',
    youtubeId: 'bNxHkUXNaBI',
    badge: '/chelsea-logo.svg',
    accent: '#00ff85',
  },
];

const SLIDE_DURATION = 5500;

export const LiveFootballPitch: React.FC = () => {
  const [viewMode, setViewMode] = useState<'photos' | 'videos'>('photos');
  const [frameIdx, setFrameIdx] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [wonderwallActive, setWonderwallActive] = useState(false);

  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const slideRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentFrame = PHOTO_FRAMES[frameIdx];
  const activeVideo = VIDEO_CLIPS[selectedVideo];

  // ── Preload All Heavy Images to Eliminate Stutter/Flicker ─────────────────
  useEffect(() => {
    PHOTO_FRAMES.forEach((frame) => {
      const img = new Image();
      img.src = frame.photo;
    });
    const crowd = new Image();
    crowd.src = '/stadium-crowd.jpg';
  }, []);

  // ── Sync with Wonderwall global audio ─────────────────────────────────────
  useEffect(() => {
    const unsub = wonderwallAudio.subscribe((playing) => {
      setWonderwallActive(playing);
    });
    return unsub;
  }, []);

  // ── Progress bar tick ─────────────────────────────────────────────────────
  const startProgress = useCallback(() => {
    setProgress(0);
    if (progressRef.current) clearInterval(progressRef.current);
    const step = 100 / (SLIDE_DURATION / 50);
    progressRef.current = setInterval(() => {
      setProgress((p) => Math.min(p + step, 100));
    }, 50);
  }, []);

  // ── Seamless Frame transition ─────────────────────────────────────────────
  const goTo = useCallback(
    (idx: number, playSound = true) => {
      const target = ((idx % PHOTO_FRAMES.length) + PHOTO_FRAMES.length) % PHOTO_FRAMES.length;
      setFrameIdx(target);
      startProgress();
      if (playSound) {
        try {
          PHOTO_FRAMES[target].sound();
        } catch {}
        confetti({
          particleCount: 25,
          spread: 60,
          origin: { y: 0.55, x: 0.35 + Math.random() * 0.3 },
          colors: PHOTO_FRAMES[target].confettiColors,
          scalar: 0.75,
        });
      }
    },
    [startProgress]
  );

  // ── Auto advance photos smoothly ──────────────────────────────────────────
  useEffect(() => {
    if (viewMode !== 'photos' || !isPlaying) return;
    if (slideRef.current) clearTimeout(slideRef.current);
    slideRef.current = setTimeout(() => goTo(frameIdx + 1), SLIDE_DURATION);
    return () => {
      if (slideRef.current) clearTimeout(slideRef.current);
    };
  }, [frameIdx, isPlaying, viewMode, goTo]);

  useEffect(() => {
    startProgress();
    return () => {
      if (progressRef.current) clearInterval(progressRef.current);
      if (slideRef.current) clearTimeout(slideRef.current);
    };
  }, [startProgress]);

  const toggleWonderwall = () => {
    wonderwallAudio.toggle();
  };

  return (
    <div
      className="relative w-full h-full min-h-[460px] rounded-3xl overflow-hidden select-none border-2 border-white/15 shadow-2xl"
      style={{ background: '#050811' }}
    >
      {/* ── Mode Switcher Tab Bar (Top Left) ── */}
      <div className="absolute top-4 left-4 z-40 flex items-center gap-1.5 p-1 rounded-2xl bg-black/75 border border-white/20 backdrop-blur-xl shadow-lg">
        <button
          onClick={() => {
            setViewMode('photos');
            startProgress();
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
            viewMode === 'photos'
              ? 'bg-gradient-to-r from-[#034694] to-[#FEBE10] text-black shadow-md'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5" />
          <span>CINEMATICA</span>
        </button>

        <button
          onClick={() => {
            setViewMode('videos');
            if (slideRef.current) clearTimeout(slideRef.current);
            if (progressRef.current) clearInterval(progressRef.current);
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
            viewMode === 'videos'
              ? 'bg-[#00ff85] text-black shadow-md shadow-[#00ff85]/40'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          <Film className="w-3.5 h-3.5" />
          <span>CR7 EDITS ⚽</span>
        </button>
      </div>

      {/* ── Club Badges & Wonderwall Quick Play (Top Right) ── */}
      <div className="absolute top-4 right-4 z-40 flex items-center gap-2">
        {/* Real Madrid + Chelsea Crests */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-black/75 border border-white/20 backdrop-blur-xl">
          <img src="/real-madrid-logo.svg" alt="Real Madrid" className="w-6 h-6 object-contain drop-shadow-md" />
          <span className="text-[10px] font-mono text-slate-400 font-bold">vs</span>
          <img src="/chelsea-logo.svg" alt="Chelsea FC" className="w-6 h-6 object-contain drop-shadow-md" />
        </div>

        {/* Wonderwall Audio Button */}
        <button
          onClick={toggleWonderwall}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all border ${
            wonderwallActive
              ? 'bg-[#FEBE10] text-black border-[#FEBE10] shadow-lg shadow-[#FEBE10]/30 animate-pulse'
              : 'bg-black/75 text-white border-white/20 hover:border-white/40'
          }`}
          title="Play user-uploaded Wonderwall by Oasis"
        >
          {wonderwallActive ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline">Wonderwall</span>
        </button>
      </div>

      {/* ────────────────────────────────────────────────────────────────────────
          MODE 1: CINEMATIC PHOTOS (Seamless Ken-Burns Dissolve, Zero Flicker)
         ──────────────────────────────────────────────────────────────────────── */}
      {viewMode === 'photos' && (
        <>
          {/* Full-bleed Photo with Ken Burns */}
          <AnimatePresence mode="popLayout">
            <motion.div
              key={frameIdx}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1.12 }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 0.75, ease: 'easeInOut' },
                scale: { duration: SLIDE_DURATION / 1000, ease: 'linear' },
              }}
            >
              <img
                src={currentFrame.photo}
                alt={currentFrame.player}
                className="w-full h-full object-cover object-center"
                draggable={false}
              />

              {/* Cinematic Vignette + Dynamic Color Glow */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to top, rgba(5,8,17,0.96) 0%, rgba(5,8,17,0.52) 45%, rgba(5,8,17,0.18) 75%, transparent 100%)',
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(ellipse at center, transparent 40%, rgba(5,8,17,0.7) 100%)',
                }}
              />
              <div
                className="absolute bottom-0 left-0 right-0 h-36 opacity-45 pointer-events-none"
                style={{
                  background: `linear-gradient(to top, ${currentFrame.accent}, transparent)`,
                }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Player Badge and Text Overlay */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${frameIdx}`}
              className="absolute bottom-16 left-0 right-0 px-6 z-20 pointer-events-none"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <img src={currentFrame.badge} alt="Club" className="w-5 h-5 object-contain drop-shadow" />
                <span
                  className="text-[11px] font-black uppercase tracking-[0.25em]"
                  style={{ color: currentFrame.accent, textShadow: `0 0 14px ${currentFrame.accent}` }}
                >
                  {currentFrame.player}
                </span>
              </div>

              <h2
                className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white leading-tight"
                style={{
                  textShadow: `0 0 25px ${currentFrame.accent}, 2px 2px 0 rgba(0,0,0,0.9)`,
                }}
              >
                {currentFrame.tagline}
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1 max-w-lg drop-shadow">
                {currentFrame.sub}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Bottom Controls Bar */}
          <div className="absolute bottom-0 left-0 right-0 z-30 px-6 pb-4">
            {/* Progress bar */}
            <div className="w-full h-1 bg-white/20 rounded-full mb-3 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-75"
                style={{
                  width: `${progress}%`,
                  background: `linear-gradient(to right, ${currentFrame.accent}, #ffffff)`,
                  boxShadow: `0 0 8px ${currentFrame.accent}`,
                }}
              />
            </div>

            <div className="flex items-center justify-between">
              {/* Prev / Next */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => goTo(frameIdx - 1)}
                  className="w-8 h-8 rounded-xl bg-black/70 border border-white/20 text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => goTo(frameIdx + 1)}
                  className="w-8 h-8 rounded-xl bg-black/70 border border-white/20 text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Frame Indicator Pills */}
                <div className="flex items-center gap-1.5 ml-2">
                  {PHOTO_FRAMES.map((f, i) => (
                    <button
                      key={f.id}
                      onClick={() => goTo(i)}
                      className="rounded-full transition-all duration-300"
                      style={{
                        width: i === frameIdx ? 24 : 8,
                        height: 7,
                        background: i === frameIdx ? currentFrame.accent : 'rgba(255,255,255,0.3)',
                      }}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Play / Pause Auto */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-[11px] font-mono font-bold transition-all"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                <span>{isPlaying ? 'PAUSE' : 'AUTOPLAY'}</span>
              </button>
            </div>
          </div>
        </>
      )}

      {/* ────────────────────────────────────────────────────────────────────────
          MODE 2: MATCH DAY VIDEOS & RONALDO EDITS
         ──────────────────────────────────────────────────────────────────────── */}
      {viewMode === 'videos' && (
        <div className="relative w-full h-full flex flex-col justify-between pt-16 pb-4 px-4 sm:px-6 z-20">
          {/* Video Selector Pills */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {VIDEO_CLIPS.map((clip, idx) => (
              <button
                key={clip.id}
                onClick={() => setSelectedVideo(idx)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all border ${
                  selectedVideo === idx
                    ? 'bg-white text-black border-white shadow-lg'
                    : 'bg-black/60 text-slate-300 border-white/15 hover:border-white/30'
                }`}
              >
                <img src={clip.badge} alt="" className="w-4 h-4 object-contain" />
                <span>{clip.legend}</span>
              </button>
            ))}
          </div>

          {/* Embedded High-Adrenaline YouTube Video */}
          <div className="relative w-full flex-1 rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-black min-h-[260px]">
            <iframe
              key={activeVideo.youtubeId}
              src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&mute=0&controls=1&modestbranding=1&rel=0`}
              title={activeVideo.title}
              className="w-full h-full border-0 absolute inset-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Video Caption & Info */}
          <div className="mt-3 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2 text-white">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span className="font-bold">{activeVideo.title}</span>
              <span className="text-slate-500">//</span>
              <span className="text-[#00ff85] font-bold">{activeVideo.club}</span>
            </div>

            <button
              onClick={() => {
                if (selectedVideo === 0 || selectedVideo === 1) sounds.playSiuuu();
                if (selectedVideo === 2) sounds.playHazardMagic();
                if (selectedVideo === 3) sounds.playKanteTackle();
              }}
              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-[10px] uppercase border border-white/20 transition-all"
            >
              TRIGGER FX 🔊
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveFootballPitch;
