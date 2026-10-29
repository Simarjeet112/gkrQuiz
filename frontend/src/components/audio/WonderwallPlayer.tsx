import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Music, Disc3, Radio } from 'lucide-react';
import { wonderwallAudio } from '../../utils/audioPlayer';

export const WonderwallPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const unsub = wonderwallAudio.subscribe((playing, vol) => {
      setIsPlaying(playing);
      setVolume(vol);
    });
    return unsub;
  }, []);

  const handleToggle = () => {
    wonderwallAudio.toggle();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    wonderwallAudio.setVolume(val);
  };

  return (
    <div className="fixed bottom-4 left-4 z-50 select-none">
      <div className="relative group">
        {/* Glow ambient background */}
        <div
          className={`absolute -inset-1 rounded-2xl opacity-75 blur-md transition duration-500 ${
            isPlaying
              ? 'bg-gradient-to-r from-[#034694] via-[#FEBE10] to-[#00ff85]'
              : 'bg-white/10'
          }`}
        />

        <div className="relative flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-[#090D16]/95 border border-white/20 backdrop-blur-xl shadow-2xl">
          {/* Vinyl Disc Icon */}
          <button
            onClick={handleToggle}
            className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-[#034694] to-[#FEBE10] text-black shadow-lg hover:scale-105 transition-all active:scale-95"
            title={isPlaying ? 'Pause Wonderwall' : 'Play Wonderwall by Oasis'}
          >
            <Disc3
              className={`w-6 h-6 text-white ${isPlaying ? 'animate-spin' : ''}`}
              style={{ animationDuration: '3s' }}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 hover:opacity-100 transition-opacity">
              {isPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white fill-current ml-0.5" />}
            </div>
          </button>

          {/* Track Info & Visualizer */}
          <div className="flex flex-col min-w-[140px]">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-black uppercase tracking-wider text-white truncate max-w-[150px]">
                Wonderwall · Oasis
              </span>
            </div>

            <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 mt-0.5">
              <span className="text-[#FEBE10] font-bold">MATCH ANTHEM</span>
              {/* Equalizer bars */}
              {isPlaying ? (
                <div className="flex items-end gap-0.5 h-2.5 ml-2">
                  <span className="w-0.5 bg-[#00ff85] rounded-full animate-bounce h-2" style={{ animationDelay: '0ms' }} />
                  <span className="w-0.5 bg-[#FEBE10] rounded-full animate-bounce h-2.5" style={{ animationDelay: '150ms' }} />
                  <span className="w-0.5 bg-[#034694] rounded-full animate-bounce h-1.5" style={{ animationDelay: '300ms' }} />
                  <span className="w-0.5 bg-[#d4ff00] rounded-full animate-bounce h-2.5" style={{ animationDelay: '100ms' }} />
                </div>
              ) : (
                <span className="text-slate-500">PAUSED</span>
              )}
            </div>
          </div>

          {/* Volume slider */}
          <div className="hidden sm:flex items-center gap-1.5 pl-2 border-l border-white/10">
            {volume === 0 ? (
              <VolumeX className="w-3.5 h-3.5 text-slate-500" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-slate-300" />
            )}
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-14 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#FEBE10]"
            />
          </div>

          {/* Quick Play/Pause Button */}
          <button
            onClick={handleToggle}
            className={`px-2.5 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${
              isPlaying
                ? 'bg-[#FEBE10] text-black shadow-md shadow-[#FEBE10]/30 hover:scale-105'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {isPlaying ? 'PAUSE' : 'PLAY'}
          </button>
        </div>
      </div>
    </div>
  );
};
