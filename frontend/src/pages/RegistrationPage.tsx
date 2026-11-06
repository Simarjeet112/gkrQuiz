import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, User, Hash, AlertCircle, Sparkles, Clock, Compass } from 'lucide-react';
import { BitByte3D } from '../components/mascot/BitByte3D';
import { BitByteMood } from '../components/mascot/bitbyteDialogue';
import { ChessBackground } from '../components/ui/ChessBackground';
import { api } from '../services/api';
import { sounds } from '../utils/soundEffects';

export const RegistrationPage: React.FC = () => {
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState('');
  const [participantCode, setParticipantCode] = useState('');
  const [selectedTrack, setSelectedTrack] = useState<'ronaldo' | 'dark' | 'code'>('ronaldo');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'tough' | 'balanced'>('balanced');
  const [selectedCount, setSelectedCount] = useState<number>(5);
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
      const data = await api.startQuiz(
        name,
        participantCode.trim() || undefined,
        selectedTrack,
        selectedDifficulty,
        selectedCount
      );
      localStorage.setItem('gkr_active_attempt_id', data.attemptId);
      localStorage.setItem('gkr_player_name', name);
      localStorage.setItem('gkr_active_track', selectedTrack);
      localStorage.setItem('gkr_active_difficulty', selectedDifficulty);
      localStorage.setItem('gkr_active_count', String(selectedCount));
      navigate(`/arena/${data.attemptId}`);
    } catch (err: any) {
      setError(err.message || 'Failed to start quiz. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const questionCountOptions = [
    { count: 5, label: '5Q Blitz', desc: '5 mins • Sprint' },
    { count: 10, label: '10Q Rapid', desc: '10 mins • Standard' },
    { count: 20, label: '20Q Half-Match', desc: '20 mins • Deep Dive' },
    { count: 30, label: '30Q Full 90’', desc: '30 mins • High Stakes' },
    { count: 50, label: '50Q Marathon', desc: '50 mins • Legendary' },
  ];

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-charcoal text-warmCream overflow-hidden">
      <ChessBackground />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-xl p-6 sm:p-8 rounded-3xl border-2 border-emerald-500/30 shadow-2xl relative bg-gradient-to-b from-forestGreen/90 via-charcoal/95 to-charcoal backdrop-blur-xl"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-black border border-emerald-400/40 p-1 flex items-center justify-center shadow-md">
              <img src="/dark-triquetra.png" alt="Code Arena" className="w-full h-full object-cover rounded-lg" />
            </div>
            <div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold uppercase tracking-wider flex items-center gap-1">
                <span>👑</span> SANTIAGO BERNABÉU × STAMFORD BRIDGE
              </span>
              <div className="text-sm font-black text-warmCream font-display mt-0.5">
                CODE ARENA // 2026
              </div>
            </div>
          </div>
          <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold flex items-center gap-1">
            <span>●</span> POSTGRES / NEON DB
          </span>
        </div>

        {/* 3D BitByte Coder Greeting */}
        <div className="py-2 border-b border-white/10">
          <BitByte3D
            mood={selectedTrack === 'ronaldo' ? 'victory' : selectedTrack === 'dark' ? 'thinking' : 'excited'}
            customMessage={
              selectedTrack === 'ronaldo'
                ? "SIUUU! Real Madrid & Chelsea brotherhood awaits. Prepare for football tactics and legendary history!"
                : selectedTrack === 'dark'
                ? "Sic Mundus Creatus Est. What we know is a drop, what we don't know is an ocean. Jonas & Martha await."
                : "Welcome to Code Arena! Algorithmic depth, system design, and Grandmaster chess logic loaded."
            }
            size="companion"
            showSpeech={true}
          />
        </div>

        {/* Error Alert */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="my-3 p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-xs text-rose-200 flex items-start gap-2.5 font-mono"
          >
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* 1. Track Selector: 3 Tracks */}
          <div className="space-y-1.5">
            <label className="block text-xs font-mono uppercase tracking-wider text-warmCream/80 flex items-center justify-between">
              <span>1. SELECT MATCHDAY TRACK</span>
              <span className="text-[10px] text-amber-400 font-bold">3 THEMATIC PATHS</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {/* Track A: CR7 & Football Legends */}
              <button
                type="button"
                onClick={() => {
                  setSelectedTrack('ronaldo');
                  sounds.playSiuuu();
                }}
                className={`p-3 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                  selectedTrack === 'ronaldo'
                    ? 'bg-gradient-to-br from-amber-500/25 via-emerald-950/60 to-charcoal border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.35)]'
                    : 'bg-black/30 border-white/10 hover:border-white/25 opacity-75'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-base">⚽ 👑</span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 font-bold">
                      GOAT
                    </span>
                  </div>
                  <div className="text-xs font-bold text-warmCream font-display">
                    CR7 & FOOTBALL
                  </div>
                  <div className="text-[10px] text-warmCream/70 font-sans mt-0.5">
                    Ronaldo, Hazard, Kanté, Madrid & Chelsea
                  </div>
                </div>
              </button>

              {/* Track B: Netflix DARK Winden Knot */}
              <button
                type="button"
                onClick={() => {
                  setSelectedTrack('dark');
                  sounds.playClick();
                }}
                className={`p-3 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                  selectedTrack === 'dark'
                    ? 'bg-gradient-to-br from-emerald-600/30 via-emerald-950/70 to-black border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.35)]'
                    : 'bg-black/30 border-white/10 hover:border-white/25 opacity-75'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-base">⏳ 🌀</span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-400/20 text-emerald-300 font-bold">
                      SIC MUNDUS
                    </span>
                  </div>
                  <div className="text-xs font-bold text-warmCream font-display">
                    NETFLIX DARK
                  </div>
                  <div className="text-[10px] text-warmCream/70 font-sans mt-0.5">
                    Jonas, Martha, Winden Caves & Tannhaus
                  </div>
                </div>
              </button>

              {/* Track C: Geekroom Code & Chess */}
              <button
                type="button"
                onClick={() => {
                  setSelectedTrack('code');
                  sounds.playSelect();
                }}
                className={`p-3 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                  selectedTrack === 'code'
                    ? 'bg-gradient-to-br from-cyan-600/25 via-slate-900/60 to-black border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)]'
                    : 'bg-black/30 border-white/10 hover:border-white/25 opacity-75'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-base">💻 ♟️</span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-400/20 text-cyan-300 font-bold">
                      TECH
                    </span>
                  </div>
                  <div className="text-xs font-bold text-warmCream font-display">
                    CODE & CHESS
                  </div>
                  <div className="text-[10px] text-warmCream/70 font-sans mt-0.5">
                    DSA, Python, SQL, OOP & Grandmaster Chess
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* 2. Question Count Selector: 5, 10, 20, 30, 50 */}
          <div className="space-y-1.5 pt-1">
            <label className="block text-xs font-mono uppercase tracking-wider text-warmCream/80 flex items-center justify-between">
              <span>2. SELECT QUESTION COUNT (LIMIT)</span>
              <span className="text-[10px] text-emerald-400 font-bold">
                PROPORTIONAL TIMER • EA FC FUT CARD UPON COMPLETION
              </span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
              {questionCountOptions.map((opt) => (
                <button
                  key={opt.count}
                  type="button"
                  onClick={() => {
                    setSelectedCount(opt.count);
                    sounds.playClick();
                  }}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    selectedCount === opt.count
                      ? 'bg-amber-500/25 border-amber-400 text-amber-300 font-bold shadow-md shadow-amber-500/20 scale-[1.02]'
                      : 'bg-black/25 border-white/10 text-warmCream/70 hover:border-white/20'
                  }`}
                >
                  <div className="text-xs font-bold leading-tight">{opt.label}</div>
                  <div className="text-[9px] text-warmCream/60 font-mono mt-0.5 leading-tight">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Difficulty Bias: Balanced, Easy, Tough */}
          <div className="space-y-1.5 pt-1">
            <label className="block text-xs font-mono uppercase tracking-wider text-warmCream/80 flex items-center justify-between">
              <span>3. DIFFICULTY FOCUS</span>
              <span className="text-[10px] text-amber-400 font-bold">ADAPTIVE CURVE</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedDifficulty('easy');
                  sounds.playClick();
                }}
                className={`p-2 rounded-xl border text-center transition-all ${
                  selectedDifficulty === 'easy'
                    ? 'bg-emerald-500/25 border-emerald-400 text-emerald-300 font-bold'
                    : 'bg-black/20 border-white/10 text-warmCream/60 hover:border-white/20'
                }`}
              >
                <div className="text-xs font-bold">🌱 Easy Opening</div>
                <div className="text-[9px] font-mono text-warmCream/60">Rapid Warmup</div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedDifficulty('balanced');
                  sounds.playClick();
                }}
                className={`p-2 rounded-xl border text-center transition-all ${
                  selectedDifficulty === 'balanced'
                    ? 'bg-amber-500/25 border-amber-400 text-amber-300 font-bold'
                    : 'bg-black/20 border-white/10 text-warmCream/60 hover:border-white/20'
                }`}
              >
                <div className="text-xs font-bold">⚖️ Balanced</div>
                <div className="text-[9px] font-mono text-warmCream/60">Standard FUT Split</div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedDifficulty('tough');
                  sounds.playClick();
                }}
                className={`p-2 rounded-xl border text-center transition-all ${
                  selectedDifficulty === 'tough'
                    ? 'bg-rose-500/25 border-rose-400 text-rose-300 font-bold'
                    : 'bg-black/20 border-white/10 text-warmCream/60 hover:border-white/20'
                }`}
              >
                <div className="text-xs font-bold">🔥 Tough Focus</div>
                <div className="text-[9px] font-mono text-warmCream/60">Grandmaster / UCL</div>
              </button>
            </div>
          </div>

          {/* 4. Player Name Input */}
          <div className="space-y-1.5 pt-1">
            <label className="block text-xs font-mono uppercase tracking-wider text-warmCream/80 flex items-center justify-between">
              <span>4. PLAYER CALLSIGN // DISPLAY NAME</span>
              <span className="text-[10px] text-amber-400 font-bold">FUT CARD HOLDER</span>
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-warmCream/40" />
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="e.g. Cristiano Ronaldo, Eden Hazard, Jonas..."
                maxLength={40}
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-warmCream text-sm placeholder:text-warmCream/30 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all font-sans"
              />
            </div>
          </div>

          {/* 5. Roll Number / Participant Code */}
          <div className="space-y-1.5">
            <label className="block text-xs font-mono uppercase tracking-wider text-warmCream/80 flex items-center justify-between">
              <span>PARTICIPANT ID / ROLL NUMBER (OPTIONAL)</span>
              <span className="text-[10px] text-emerald-400 font-bold">BATCH '26 ADAPTIVE</span>
            </label>
            <div className="relative">
              <Hash className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-warmCream/40" />
              <input
                type="text"
                value={participantCode}
                onChange={(e) => setParticipantCode(e.target.value)}
                placeholder="e.g. 06213202726 or CR7-BERNABÉU"
                maxLength={30}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-warmCream text-sm placeholder:text-warmCream/30 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all font-mono"
              />
            </div>
          </div>

          {/* Submit Kickoff Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-3 btn-burnt-orange py-3.5 px-6 rounded-xl font-black text-sm tracking-wide uppercase flex items-center justify-center gap-2.5 shadow-xl hover:shadow-burntOrange/40 transition-all disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                <span>Entering The Arena...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Start {selectedCount}Q Challenge • Kickoff</span>
              </>
            )}
          </button>
        </form>

        {/* Footer Oasis & Real Madrid × Chelsea Brotherhood Banner */}
        <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-warmCream/60 font-mono">
          <div className="flex items-center gap-1.5">
            <span className="text-amber-400">🎸 Oasis Vibe</span>
            <span>• Wonderwall</span>
          </div>
          <div className="flex items-center gap-1">
            <span>💙 Chelsea FC × Real Madrid 🤍</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
