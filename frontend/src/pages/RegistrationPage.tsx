import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, User, Hash, AlertCircle, ShieldAlert, Terminal, Sparkles, Cpu } from 'lucide-react';
import { BitByte3D } from '../components/mascot/BitByte3D';
import { BitByteMood } from '../components/mascot/bitbyteDialogue';
import { ChessBackground } from '../components/ui/ChessBackground';
import { api } from '../services/api';
import { sounds } from '../utils/soundEffects';

export const RegistrationPage: React.FC = () => {
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState('');
  const [participantCode, setParticipantCode] = useState('');
  const [selectedTrack, setSelectedTrack] = useState<'ronaldo' | 'code'>('ronaldo');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'tough' | 'balanced'>('balanced');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [config, setConfig] = useState<{
    quiz_duration_minutes: number;
    require_roll_number: boolean;
  }>({
    quiz_duration_minutes: 5,
    require_roll_number: false,
  });

  useEffect(() => {
    api
      .getConfig()
      .then((cfg) => {
        if (cfg) setConfig(cfg);
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = displayName.trim();
    if (!name) {
      setError('Player callsign / name is required.');
      return;
    }

    if (config.require_roll_number && !participantCode.trim()) {
      setError('College Roll Number is required for this event.');
      return;
    }

    setError(null);
    setLoading(true);
    sounds.playSelect();

    try {
      const data = await api.startQuiz(name, participantCode.trim() || undefined, selectedTrack, selectedDifficulty);
      localStorage.setItem('gkr_active_attempt_id', data.attemptId);
      localStorage.setItem('gkr_player_name', name);
      localStorage.setItem('gkr_active_track', selectedTrack);
      localStorage.setItem('gkr_active_difficulty', selectedDifficulty);
      navigate(`/arena/${data.attemptId}`);
    } catch (err: any) {
      setError(err.message || 'Failed to start quiz. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-carbon-950 text-carbon-50 overflow-hidden">
      <ChessBackground />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-lg p-6 sm:p-8 rounded-2xl border border-white/10 shadow-titanium relative bg-[#101522]"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/15 p-1 flex items-center justify-center">
              <img src="/geekroom-logo.png" alt="Geekroom GTBIT" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-lime/10 text-lime border border-lime/30 font-bold uppercase tracking-wider flex items-center gap-1">
                <span>♟</span> BOARD 01 // SEAT #2026
              </span>
              <div className="text-sm font-black text-white font-display mt-0.5">
                GEEKROOM CODE ARENA
              </div>
            </div>
          </div>
          <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold flex items-center gap-1">
            <span>●</span> BLITZ READY
          </span>
        </div>

        {/* 3D BitByte Coder Greeting */}
        <div className="py-2 border-b border-white/10">
          <BitByte3D
            size="companion"
            mood={displayName.length > 2 ? 'excited' : 'welcome'}
            customMessage={
              displayName.length > 2
                ? `Yo ${displayName}! Think 3 moves ahead and code cleanly!`
                : 'Welcome, engineer! Enter your callsign below to take your terminal seat.'
            }
          />
        </div>

        {/* Heading */}
        <div className="mt-4 mb-4 text-center sm:text-left">
          <h1 className="text-2xl font-black text-white font-display tracking-tight flex items-center gap-2">
            <span>CHALLENGER ADMISSION</span>
            <span className="text-sm font-mono text-lime font-normal">♚</span>
          </h1>
          <p className="text-slate-400 text-xs mt-1 font-mono">
            5 Strategic Moves: ♟ Opening (10p) → ♞ Middlegame (20p) → ♚ The Endgame (30p). 5+0 Rapid Blitz.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-xs text-rose-300 flex items-start gap-2.5 font-mono"
          >
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Arena Track Selector: CR7 & Legends vs Geekroom Tech */}
          <div className="space-y-1.5">
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 flex items-center justify-between">
              <span>SELECT ARENA ARENA MODE</span>
              <span className="text-[10px] text-lime font-bold">5-MIN BLITZ // 90 PTS</span>
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {/* Ronaldo, Hazard & Kanté Legends Track */}
              <button
                type="button"
                onClick={() => {
                  setSelectedTrack('ronaldo');
                  sounds.playSiuuu();
                }}
                className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden ${
                  selectedTrack === 'ronaldo'
                    ? 'bg-gradient-to-br from-amber-500/20 via-blue-900/30 to-black border-amber-400 shadow-[0_0_20px_rgba(254,190,16,0.3)]'
                    : 'bg-[#090D16] border-white/10 hover:border-white/25 opacity-70'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="flex -space-x-1">
                    <img src="/ronaldo-ballondor.jpg" alt="" className="w-5 h-5 rounded-full object-cover border border-amber-400" />
                    <img src="/hazard.jpg" alt="" className="w-5 h-5 rounded-full object-cover border border-blue-400" />
                    <img src="/kante.jpg" alt="" className="w-5 h-5 rounded-full object-cover border border-emerald-400" />
                  </div>
                  <span className="text-[9px] font-mono px-1 py-0.5 rounded bg-amber-400/20 text-amber-300 font-bold">
                    GOAT 🏆
                  </span>
                </div>
                <div className="text-xs font-bold text-white font-display">
                  CR7 & LEGENDS
                </div>
                <div className="text-[10px] text-slate-300 font-sans mt-0.5 line-clamp-1">
                  Ronaldo, Hazard, Kanté, Chelsea & Real Madrid
                </div>
              </button>

              {/* Geekroom Tech Track */}
              <button
                type="button"
                onClick={() => {
                  setSelectedTrack('code');
                  sounds.playSelect();
                }}
                className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden ${
                  selectedTrack === 'code'
                    ? 'bg-lime/10 border-lime shadow-[0_0_20px_rgba(212,255,0,0.25)]'
                    : 'bg-[#090D16] border-white/10 hover:border-white/25 opacity-70'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-sm">💻</span>
                  <span className="text-[9px] font-mono px-1 py-0.5 rounded bg-lime/20 text-lime font-bold">
                    TECH ⌨️
                  </span>
                </div>
                <div className="text-xs font-bold text-white font-display">
                  CODE & CHESS
                </div>
                <div className="text-[10px] text-slate-300 font-sans mt-0.5 line-clamp-1">
                  DSA, Python, SQL, Recurrences & Chess Logic
                </div>
              </button>
            </div>
          </div>

          {/* Difficulty Selector: Easy vs Tough vs Balanced */}
          <div className="space-y-1.5 pt-1">
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 flex items-center justify-between">
              <span>MATCH DIFFICULTY</span>
              <span className="text-[10px] text-amber-400 font-bold">CHOOSE YOUR TIER</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedDifficulty('easy');
                  sounds.playClick();
                }}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  selectedDifficulty === 'easy'
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                    : 'bg-[#090D16] border-white/10 text-slate-400 hover:border-white/20'
                }`}
              >
                <div className="text-base mb-0.5">🟢</div>
                <div className="text-xs font-black uppercase tracking-wider">EASY</div>
                <div className="text-[9px] font-mono text-slate-400 mt-0.5">PL Debut (10-20p)</div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedDifficulty('balanced');
                  sounds.playSelect();
                }}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  selectedDifficulty === 'balanced'
                    ? 'bg-gradient-to-r from-blue-900/40 to-amber-900/40 border-[#FEBE10] text-[#FEBE10] shadow-[0_0_15px_rgba(254,190,16,0.3)]'
                    : 'bg-[#090D16] border-white/10 text-slate-400 hover:border-white/20'
                }`}
              >
                <div className="text-base mb-0.5">⚡</div>
                <div className="text-xs font-black uppercase tracking-wider">BALANCED</div>
                <div className="text-[9px] font-mono text-slate-400 mt-0.5">2E + 2M + 1T</div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedDifficulty('tough');
                  sounds.playSiuuu();
                }}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  selectedDifficulty === 'tough'
                    ? 'bg-rose-500/25 border-rose-500 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.4)]'
                    : 'bg-[#090D16] border-white/10 text-slate-400 hover:border-white/20'
                }`}
              >
                <div className="text-base mb-0.5">🔴</div>
                <div className="text-xs font-black uppercase tracking-wider">TOUGH</div>
                <div className="text-[9px] font-mono text-slate-400 mt-0.5">UCL Final (30p)</div>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 flex items-center justify-between">
              <span>Player Name / Callsign <span className="text-lime">*</span></span>
              <span className="text-[10px] text-slate-500 font-normal">Max 40 chars</span>
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="e.g. Alex Mercer"
                maxLength={40}
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#090D16] border border-white/10 focus:border-lime focus:ring-1 focus:ring-lime text-white text-sm outline-none transition-all placeholder:text-slate-600 font-sans"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 flex items-center justify-between">
              <span>College Roll No. / Participant ID</span>
              <span className="text-[10px] text-slate-500 font-normal">
                {config.require_roll_number ? '(Required)' : '(Optional)'}
              </span>
            </label>
            <div className="relative">
              <Hash className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={participantCode}
                onChange={(e) => setParticipantCode(e.target.value)}
                placeholder="e.g. 02315603124 or GTBIT-01"
                maxLength={30}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#090D16] border border-white/10 focus:border-lime focus:ring-1 focus:ring-lime text-white text-sm outline-none transition-all placeholder:text-slate-600 font-mono text-xs"
              />
            </div>
          </div>

          {/* Rules briefing */}
          <div className="p-3.5 rounded-xl bg-[#090D16] border border-white/10 text-[11px] font-mono text-slate-400 space-y-1">
            <div className="text-xs font-bold text-lime flex items-center gap-1.5 mb-1">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>RULES OF THE BOARD:</span>
            </div>
            <div>• 5 Moves: 2 Opening (10p) → 2 Middlegame (20p) → 1 Endgame (30p)</div>
            <div>• 5+0 Rapid Blitz clock; candidate moves auto-saved continuously</div>
            <div>• Standings: 1) Game Score 2) Clock Time 3) Submission timestamp</div>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl btn-primary text-xs uppercase tracking-wider disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-carbon-950/30 border-t-carbon-950 rounded-full animate-spin" />
                <span>CALCULATING OPENING MOVES...</span>
              </span>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>♟ 1. e4 // INITIATE ARENA CHALLENGE</span>
              </>
            )}
          </motion.button>

          {/* Barcode Strip */}
          <div className="pt-2 text-center font-mono text-[9px] tracking-[0.25em] text-slate-500 select-none">
            ||| |||| | ||||| || |||||| |||| | || [ADMIT-CHALLENGER-ONE]
          </div>
        </form>
      </motion.div>
    </div>
  );
};
