import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, User, Hash, AlertCircle, ShieldAlert, Terminal, Sparkles } from 'lucide-react';
import { GeekroomMascotReaction } from '../components/mascot/GeekroomMascotReaction';
import { api } from '../services/api';
import { sounds } from '../utils/soundEffects';

export const RegistrationPage: React.FC = () => {
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState('');
  const [participantCode, setParticipantCode] = useState('');
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
    setError(null);

    const name = displayName.trim();
    if (!name) {
      setError('Player name is required.');
      return;
    }
    if (config.require_roll_number && !participantCode.trim()) {
      setError('College Roll Number is required for this event.');
      return;
    }

    sounds.playSelect();
    setLoading(true);
    try {
      const data = await api.startQuiz(name, participantCode.trim() || undefined);
      localStorage.setItem('gkr_active_attempt_id', data.attemptId);
      localStorage.setItem('gkr_player_name', name);
      navigate(`/arena/${data.attemptId}`);
    } catch (err: any) {
      setError(err.message || 'Failed to start quiz. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] cyber-grid flex items-center justify-center p-4">
      {/* Background Lighting Aura */}
      <div className="absolute w-[500px] h-[500px] bg-arena-cyan/10 rounded-full blur-[140px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="cyber-card w-full max-w-lg p-6 sm:p-8 border border-arena-cyan/40 shadow-glow-cyan relative"
      >
        {/* Top HUD Brand Stripe */}
        <div className="flex items-center justify-between pb-5 border-b border-arena-border">
          <div className="flex items-center gap-3">
            <img src="/geekroom-logo.png" alt="Geekroom GTBIT" className="w-8 h-8 object-contain" />
            <div>
              <div className="text-[10px] font-mono text-arena-cyan uppercase tracking-widest">
                PLAYER TERMINAL
              </div>
              <div className="text-xs font-bold text-white font-mono">
                GEEKROOM CODE ARENA 2026
              </div>
            </div>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-arena-green/10 text-arena-greenNeon border border-arena-green/30">
            [ READY ]
          </span>
        </div>

        {/* Mascot Greeting */}
        <div className="py-4 border-b border-arena-border">
          <GeekroomMascotReaction
            mood="welcome"
            size="md"
            message="Welcome to the Arena! Enter your name below to claim your terminal seat."
          />
        </div>

        {/* Heading */}
        <div className="mt-4 mb-4 text-center sm:text-left">
          <h1 className="text-2xl font-bold text-white font-display">
            CHALLENGER REGISTRATION
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            5 questions: 2 Easy (10p) → 2 Medium (20p) → 1 Tough (30p). 5 minutes total.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-4 p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-xs text-red-300 flex items-start gap-2.5 font-mono"
          >
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 flex items-center justify-between">
              <span>Player Name <span className="text-arena-cyan">*</span></span>
              <span className="text-[10px] text-slate-500">Will appear on leaderboard</span>
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
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#060A12] border border-arena-border focus:border-arena-cyan focus:ring-1 focus:ring-arena-cyan/50 text-white text-sm outline-none transition-all placeholder:text-slate-600 font-sans"
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
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#060A12] border border-arena-border focus:border-arena-cyan focus:ring-1 focus:ring-arena-cyan/50 text-white text-sm outline-none transition-all placeholder:text-slate-600 font-mono text-xs"
              />
            </div>
          </div>

          {/* Rules briefing */}
          <div className="p-3.5 rounded-xl bg-[#080C16] border border-arena-border text-[11px] font-mono text-slate-400 space-y-1">
            <div className="text-xs font-bold text-arena-cyan flex items-center gap-1.5 mb-1">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>RULES OF ENGAGEMENT:</span>
            </div>
            <div>• Strict order: 2 Easy (10p) → 2 Medium (20p) → 1 Tough (30p)</div>
            <div>• 5-Minute timer runs on server; progress auto-saves as you move</div>
            <div>• Ties broken by: 1) Score 2) Time taken 3) Submission timestamp</div>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-arena-cyan to-arena-cyanDark hover:from-cyan-300 hover:to-arena-cyan text-slate-950 font-bold text-xs font-mono uppercase tracking-wider shadow-glow-cyan transition-all duration-200 disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                <span>INITIALIZING ARENA SESSION...</span>
              </span>
            ) : (
              <>
                <Play className="w-4 h-4 fill-slate-950" />
                <span>INITIATE ARENA CHALLENGE</span>
              </>
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};
