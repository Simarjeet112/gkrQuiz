import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, User, Hash, AlertCircle, ShieldAlert } from 'lucide-react';
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
  }>({
    quiz_duration_minutes: 5,
    require_roll_number: false,
  });

  useEffect(() => {
    api.getConfig()
      .then((cfg) => { if (cfg) setConfig(cfg); })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const name = displayName.trim();
    if (!name) { setError('Player name is required.'); return; }
    if (config.require_roll_number && !participantCode.trim()) {
      setError('College Roll Number is required for this event.'); return;
    }

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
    <div className="relative min-h-[calc(100vh-4rem)] cyber-grid-dense flex items-center justify-center p-4">
      {/* Background glow */}
      <div className="absolute w-96 h-96 bg-arena-violet/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass-panel-glow rounded-3xl p-6 sm:p-8 border border-arena-violet/30 shadow-2xl relative"
      >
        {/* Mascot greeting */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pb-6 border-b border-arena-border">
          <GeekroomMascotReaction mood="welcome" size="md"
            message="Ready to prove your skills? Enter your name and let's begin!" />
        </div>

        {/* Heading */}
        <div className="mt-5 mb-5 text-center sm:text-left">
          <div className="text-[11px] font-mono text-arena-greenNeon uppercase tracking-[0.2em] mb-1">
            PLAYER REGISTRATION
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            READY TO ENTER<br />THE ARENA?
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1.5">
            {config.quiz_duration_minutes} minutes. 5 randomized challenges. One shot.
          </p>
        </div>

        {/* Error */}
        {error && (
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
            className="mb-5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-2.5 text-xs text-red-300"
          >
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
              Your Name <span className="text-arena-greenNeon">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)}
                placeholder="e.g. Alex Mercer" maxLength={40} required
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#060A12] border border-arena-border focus:border-arena-violet focus:ring-1 focus:ring-arena-violet/50 text-white text-sm outline-none transition-all placeholder:text-slate-600 font-sans"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5 flex items-center justify-between">
              <span>Roll No. / ID</span>
              <span className="text-[10px] text-slate-600 font-normal normal-case">
                {config.require_roll_number ? 'Required' : 'Optional'}
              </span>
            </label>
            <div className="relative">
              <Hash className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input type="text" value={participantCode} onChange={(e) => setParticipantCode(e.target.value)}
                placeholder="e.g. 02315603124" maxLength={30}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#060A12] border border-arena-border focus:border-arena-violet focus:ring-1 focus:ring-arena-violet/50 text-white text-sm outline-none transition-all placeholder:text-slate-600"
              />
            </div>
          </div>

          {/* Rules brief */}
          <div className="p-3.5 rounded-xl bg-arena-card/50 border border-arena-border text-[11px] font-mono text-slate-500 space-y-1.5">
            <div className="text-xs font-bold text-slate-300 flex items-center gap-1.5 mb-2">
              <ShieldAlert className="w-3.5 h-3.5 text-arena-violet" />
              RULES OF ENGAGEMENT
            </div>
            <div className="grid grid-cols-1 gap-1">
              <div>→ 2 Easy (10 pts each) + 2 Medium (20 pts each) + 1 Tough (30 pts)</div>
              <div>→ {config.quiz_duration_minutes}-minute countdown, synced to server</div>
              <div>→ Auto-submits when time expires. Answers saved as you go.</div>
              <div>→ Ranking: Score → Time → Submission timestamp</div>
            </div>
          </div>

          <motion.button type="submit" disabled={loading} whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-arena-violet to-arena-violetDark hover:from-arena-violetLight hover:to-arena-violet text-white font-bold text-sm shadow-glow-violet transition-all duration-200 disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generating your challenge...
              </span>
            ) : (
              <><Play className="w-4 h-4 fill-white" /> Enter Code Arena</>
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};
