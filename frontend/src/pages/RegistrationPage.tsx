import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, User, Hash, AlertCircle, Clock, Award, ShieldAlert } from 'lucide-react';
import { GeekroomMascotReaction } from '../components/mascot/GeekroomMascotReaction';
import { api } from '../services/api';

export const RegistrationPage: React.FC = () => {
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState('');
  const [participantCode, setParticipantCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [config, setConfig] = useState<{
    quiz_duration_minutes: number;
    require_roll_number: boolean;
    allow_multiple_attempts: boolean;
  }>({
    quiz_duration_minutes: 5,
    require_roll_number: false,
    allow_multiple_attempts: false,
  });

  useEffect(() => {
    api
      .getConfig()
      .then((cfg) => {
        if (cfg) setConfig(cfg);
      })
      .catch((err) => console.warn('Could not load config:', err));
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
      setError('College Roll Number / Participant ID is required by the organizer.');
      return;
    }

    setLoading(true);

    try {
      const data = await api.startQuiz(name, participantCode.trim() || undefined);
      // Store attemptId in localStorage for refresh persistence
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
      {/* Glow aura */}
      <div className="absolute w-96 h-96 bg-arena-violet/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg glass-panel-glow rounded-3xl p-6 sm:p-8 border border-arena-violet/30 shadow-2xl relative"
      >
        {/* Mascot Greeting */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pb-6 border-b border-arena-border">
          <GeekroomMascotReaction
            mood="welcome"
            size="md"
            message="Hey challenger! Ready to show off your coding logic in the Arena?"
          />
        </div>

        {/* Heading */}
        <div className="mt-6 mb-6 text-center sm:text-left">
          <div className="text-xs font-mono text-arena-greenNeon uppercase tracking-widest">
            AUTHENTICATION
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            READY TO ENTER THE ARENA?
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Claim your terminal seat. Answer 5 randomized challenges in {config.quiz_duration_minutes} minutes.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-2.5 text-xs text-red-300"
          >
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-red-200">Registration Error: </span>
              {error}
            </div>
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
              Player Name <span className="text-arena-greenNeon">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="e.g. Alex Mercer"
                maxLength={40}
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#070B13] border border-arena-border focus:border-arena-violet focus:ring-1 focus:ring-arena-violet text-white text-sm outline-none transition-all placeholder:text-slate-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 flex items-center justify-between">
              <span>College Roll No. / ID</span>
              <span className="text-[10px] text-slate-500 font-normal">
                {config.require_roll_number ? '(Required)' : '(Optional for certificate)'}
              </span>
            </label>
            <div className="relative">
              <Hash className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={participantCode}
                onChange={(e) => setParticipantCode(e.target.value)}
                placeholder="e.g. 02315603124 or GTBIT-01"
                maxLength={30}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#070B13] border border-arena-border focus:border-arena-violet focus:ring-1 focus:ring-arena-violet text-white text-sm outline-none transition-all placeholder:text-slate-600"
              />
            </div>
          </div>

          {/* Rules Briefing Box */}
          <div className="p-3.5 rounded-xl bg-arena-card/60 border border-arena-border text-xs text-slate-400 space-y-1.5 font-mono">
            <div className="text-[11px] font-bold text-arena-violetLight flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>RULES OF ENGAGEMENT:</span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-[11px]">
              <li>5 questions total: 2 Easy (10p), 2 Medium (20p), 1 Hard (30p).</li>
              <li>Timer: {config.quiz_duration_minutes} minutes countdown starts immediately.</li>
              <li>Auto-submits on timeout. Answers are saved as you move.</li>
              <li>Ties broken by shortest completion time and earliest submission.</li>
            </ul>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-arena-violet to-arena-violetDark hover:from-arena-violetLight hover:to-arena-violet text-white font-bold text-sm shadow-glow-violet transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Generating Arena Challenges...</span>
              </span>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span>Enter Code Arena</span>
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};
