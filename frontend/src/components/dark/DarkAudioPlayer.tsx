import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, Radio, Disc } from 'lucide-react';

export const DarkAudioPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleEnded = () => {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch((err) => {
        console.warn('Audio play restricted by browser:', err);
      });
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-black/80 border-2 border-emerald-500/40 p-4 shadow-[0_0_30px_rgba(16,185,129,0.2)] text-warmCream backdrop-blur-xl">
      <audio ref={audioRef} src="/dark-theme-goodbye.mp3" preload="auto" loop />

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Track Details */}
        <div className="flex items-center gap-3 min-w-0">
          <div className={`w-12 h-12 rounded-xl bg-forestGreen border border-emerald-400/50 p-1 flex items-center justify-center shrink-0 shadow-lg ${isPlaying ? 'animate-spin-slow' : ''}`}>
            <img src="/dark-triquetra.png" alt="Triquetra" className="w-full h-full object-cover rounded-lg" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold tracking-wider uppercase border border-emerald-500/30">
                OFFICIAL SOUNDTRACK
              </span>
              <span className="text-[10px] font-mono text-warmCream/60 hidden sm:inline">
                APPARAT
              </span>
            </div>
            <div className="text-sm font-bold text-warmCream font-display truncate mt-0.5">
              Goodbye (Dark Theme Song)
            </div>
            <div className="text-[11px] text-emerald-400 font-mono truncate">
              Ed Lopes & Kachas Bootleg Rework • Sic Mundus Audio
            </div>
          </div>
        </div>

        {/* Audio Controls */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Animated Waveform Bars */}
          {isPlaying && (
            <div className="flex items-end gap-1 h-5 px-2">
              <span className="w-1 bg-emerald-400 rounded-full animate-pulse h-3" />
              <span className="w-1 bg-emerald-400 rounded-full animate-pulse h-5" />
              <span className="w-1 bg-emerald-400 rounded-full animate-pulse h-4" />
              <span className="w-1 bg-emerald-400 rounded-full animate-pulse h-2" />
            </div>
          )}

          <button
            onClick={togglePlay}
            className="px-5 py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/50 text-emerald-300 font-mono text-xs font-bold flex items-center gap-2 shadow-lg transition-all active:scale-95"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>PAUSE THEME</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>PLAY "GOODBYE" 🎵</span>
              </>
            )}
          </button>

          <button
            onClick={toggleMute}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-warmCream/70 hover:text-warmCream transition-colors"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Track Progress Bar */}
      <div className="mt-3 w-full h-1 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-300 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
