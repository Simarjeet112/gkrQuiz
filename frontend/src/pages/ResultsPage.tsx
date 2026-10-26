import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Trophy, CheckCircle2, XCircle, Clock, Home, Check, X,
  Target, ChevronDown, ChevronUp, RotateCcw, Sparkles,
} from 'lucide-react';
import { api } from '../services/api';
import { GeekroomMascotReaction, MascotMood } from '../components/mascot/GeekroomMascotReaction';

interface QuestionReviewItem {
  id: string;
  position: number;
  text: string;
  difficulty: 'easy' | 'medium' | 'tough';
  category: string;
  options: string[];
  selected_answer?: string | null;
  correct_answer: string;
  is_correct: boolean;
  points_awarded: number;
  max_points: number;
  explanation: string;
}

interface ResultsData {
  attempt_id: string;
  participant: { id: string; display_name: string; participant_code?: string | null };
  status: string;
  total_score: number;
  max_score: number;
  time_taken_seconds: number;
  time_allowed_seconds: number;
  submitted_at: string;
  total_questions: number;
  correct_count: number;
  incorrect_count: number;
  unanswered_count: number;
  difficulty_breakdown: {
    easy: { correct: number; total: number; points: number; max_points: number };
    medium: { correct: number; total: number; points: number; max_points: number };
    tough: { correct: number; total: number; points: number; max_points: number };
  };
  rank?: number;
  total_participants?: number;
  questions: QuestionReviewItem[];
}

const DifficultyPip = ({ d }: { d: 'easy' | 'medium' | 'tough' }) => {
  if (d === 'easy') return <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-emerald-500/20 text-emerald-300 uppercase">Easy</span>;
  if (d === 'medium') return <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-amber-500/20 text-amber-300 uppercase">Medium</span>;
  return <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-red-500/20 text-red-300 uppercase">Tough</span>;
};

export const ResultsPage: React.FC = () => {
  const { attemptId } = useParams<{ attemptId: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<ResultsData | null>(null);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [allowMultiple, setAllowMultiple] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!attemptId) { navigate('/'); return; }

    api.getResults(attemptId).then((data) => {
      setResults(data);
      setLoading(false);

      // Score count-up
      const target = data.total_score || 0;
      let curr = 0;
      const step = Math.max(1, Math.ceil(target / 50));
      const t = setInterval(() => {
        curr = Math.min(curr + step, target);
        setAnimatedScore(curr);
        if (curr >= target) clearInterval(t);
      }, 20);

      if (target >= 50) {
        setTimeout(() => confetti({ particleCount: 100, spread: 80, origin: { y: 0.55 }, colors: ['#8B5CF6', '#00FF88', '#38BDF8', '#F59E0B'] }), 350);
      }
    }).catch((err) => { setError(err.message || 'Failed to fetch results.'); setLoading(false); });

    api.getConfig().then((cfg) => { if (cfg) setAllowMultiple(cfg.allow_multiple_attempts); }).catch(() => {});
  }, [attemptId, navigate]);

  const fmt = (s: number) => `${Math.floor(s / 60)}m ${s % 60}s`;

  if (loading) return (
    <div className="min-h-[calc(100vh-4rem)] cyber-grid flex flex-col items-center justify-center gap-4">
      <div className="w-12 h-12 border-4 border-arena-violet/30 border-t-arena-violet rounded-full animate-spin" />
      <p className="text-sm font-mono text-slate-400 tracking-widest">COMPUTING RESULTS...</p>
    </div>
  );

  if (error || !results) return (
    <div className="min-h-[calc(100vh-4rem)] cyber-grid flex items-center justify-center p-4">
      <div className="max-w-md w-full glass-panel p-8 rounded-2xl border border-red-500/30 text-center space-y-4">
        <XCircle className="w-10 h-10 text-red-400 mx-auto" />
        <h2 className="text-lg font-bold text-white">Results Unavailable</h2>
        <p className="text-xs text-slate-400">{error || 'Session could not be retrieved.'}</p>
        <Link to="/" className="inline-block px-6 py-2.5 rounded-xl bg-arena-violet text-white text-xs font-semibold hover:bg-arena-violetLight transition-colors">
          Return to Arena
        </Link>
      </div>
    </div>
  );

  const isHighScorer = results.total_score >= 50;
  const mascotMood: MascotMood = results.total_score >= 70 ? 'victory' : isHighScorer ? 'correct' : 'idle';
  const mascotMsg = results.total_score >= 70
    ? `Outstanding, ${results.participant.display_name}! ${results.total_score} points — you crushed the Arena! 🏆`
    : isHighScorer
    ? `Solid run, ${results.participant.display_name}! ${results.total_score} pts. Keep sharpening!`
    : `Good effort, ${results.participant.display_name}! Review the explanations below and come back stronger.`;

  const bd = results.difficulty_breakdown;

  return (
    <div className="relative min-h-[calc(100vh-4rem)] cyber-grid py-10 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* ── Hero Score Card ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          className="glass-panel-glow rounded-3xl border border-arena-violet/25 shadow-2xl overflow-hidden"
        >
          {/* Top rainbow stripe */}
          <div className="h-1.5 w-full bg-gradient-to-r from-arena-violet via-arena-cyanLight to-arena-greenNeon" />

          <div className="p-6 sm:p-8 space-y-6">
            {/* Mascot + Score Hero */}
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <GeekroomMascotReaction mood={mascotMood} size="lg" message={mascotMsg} />

              <div className="text-center sm:text-right flex-1">
                <div className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-1">Final Score</div>
                <div className="flex items-baseline justify-center sm:justify-end gap-1.5">
                  <span className="text-6xl sm:text-7xl font-extrabold font-mono text-transparent bg-clip-text bg-gradient-to-r from-arena-greenNeon via-emerald-300 to-arena-cyanLight tabular-nums">
                    {animatedScore}
                  </span>
                  <span className="text-2xl font-bold text-slate-600 font-mono">/90</span>
                </div>
                {results.rank && (
                  <div className="mt-2 inline-flex items-center gap-2 text-xs font-mono px-3 py-1 rounded-full bg-arena-card border border-arena-border text-slate-300">
                    <Trophy className="w-3.5 h-3.5 text-amber-400" />
                    Rank <strong className="text-arena-greenNeon font-bold">#{results.rank}</strong>
                    {results.total_participants && <span className="text-slate-500"> of {results.total_participants}</span>}
                  </div>
                )}
              </div>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Correct', value: results.correct_count, sub: '/ 5', color: 'text-emerald-400', icon: <CheckCircle2 className="w-4 h-4" /> },
                { label: 'Incorrect', value: results.incorrect_count, sub: '', color: 'text-red-400', icon: <XCircle className="w-4 h-4" /> },
                { label: 'Time Taken', value: fmt(results.time_taken_seconds), sub: '', color: 'text-arena-cyanLight', icon: <Clock className="w-4 h-4" /> },
                { label: 'Accuracy', value: `${Math.round((results.correct_count / 5) * 100)}%`, sub: '', color: 'text-arena-violetLight', icon: <Target className="w-4 h-4" /> },
              ].map((m, i) => (
                <div key={i} className="bg-[#090D17] border border-arena-border rounded-2xl p-4">
                  <div className={`flex items-center gap-1.5 text-xs font-mono mb-2 ${m.color}`}>{m.icon} {m.label}</div>
                  <div className="text-2xl font-bold font-mono text-white">{m.value} <span className="text-xs text-slate-500 font-normal">{m.sub}</span></div>
                </div>
              ))}
            </div>

            {/* Difficulty Breakdown Bars */}
            <div className="bg-[#090D17] border border-arena-border rounded-2xl p-4 space-y-3.5">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400">Difficulty Breakdown</div>
              {[
                { label: 'Easy (10 pts each)', key: 'easy' as const, color: 'bg-emerald-400', textColor: 'text-emerald-300' },
                { label: 'Medium (20 pts each)', key: 'medium' as const, color: 'bg-amber-400', textColor: 'text-amber-300' },
                { label: 'Tough (30 pts)', key: 'tough' as const, color: 'bg-red-400', textColor: 'text-red-300' },
              ].map(({ label, key, color, textColor }) => {
                const b = bd[key] || { correct: 0, total: 0, points: 0, max_points: 0 };
                const pct = b.max_points > 0 ? (b.points / b.max_points) * 100 : 0;
                return (
                  <div key={key} className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className={`${textColor} font-semibold`}>{label}</span>
                      <span className="text-slate-400">{b.points}/{b.max_points} pts ({b.correct}/{b.total})</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, delay: 0.3 }}
                        className={`h-full rounded-full ${color}`} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link to="/leaderboard" className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-arena-violet to-arena-violetDark hover:from-arena-violetLight hover:to-arena-violet text-white font-bold text-sm shadow-glow-violet transition-all hover:scale-[1.01]">
                <Trophy className="w-4 h-4" /> View Leaderboard
              </Link>
              <Link to="/" className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-arena-border text-slate-300 hover:text-white hover:bg-white/5 text-sm font-semibold transition-colors">
                <Home className="w-4 h-4" /> Home
              </Link>
              {allowMultiple && (
                <Link to="/register" className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10 text-sm font-semibold transition-colors">
                  <RotateCcw className="w-4 h-4" /> Retry
                </Link>
              )}
            </div>
          </div>
        </motion.div>

        {/* ── Question Review ── */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-arena-violet" /> Question Review & Explanations
            </h3>
            <span className="text-xs font-mono text-slate-500">5 Questions</span>
          </div>

          {results.questions.map((q) => {
            const isOpen = expanded[q.id] !== false; // default open
            return (
              <div key={q.id} className={`glass-panel rounded-2xl border overflow-hidden transition-colors ${
                q.is_correct ? 'border-emerald-500/25' : q.selected_answer ? 'border-red-500/25' : 'border-slate-700/50'
              }`}>
                {/* Accordion trigger */}
                <button onClick={() => setExpanded((p) => ({ ...p, [q.id]: !isOpen }))}
                  className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold shrink-0 ${
                      q.is_correct ? 'bg-emerald-500/20 text-emerald-300'
                      : q.selected_answer ? 'bg-red-500/20 text-red-400'
                      : 'bg-slate-800 text-slate-500'
                    }`}>{q.position}</div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white truncate">{q.text}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <DifficultyPip d={q.difficulty} />
                        <span className="text-[11px] font-mono text-slate-500">{q.category}</span>
                        <span className={`text-[11px] font-mono font-bold ${q.is_correct ? 'text-emerald-400' : 'text-slate-600'}`}>
                          +{q.points_awarded}/{q.max_points}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {q.is_correct ? <span className="hidden sm:flex items-center gap-1 text-xs font-mono text-emerald-400"><Check className="w-3 h-3" />Correct</span>
                      : q.selected_answer ? <span className="hidden sm:flex items-center gap-1 text-xs font-mono text-red-400"><X className="w-3 h-3" />Incorrect</span>
                      : <span className="hidden sm:text-xs sm:flex font-mono text-slate-500">Unanswered</span>
                    }
                    {isOpen ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                  </div>
                </button>

                {/* Expanded content */}
                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 space-y-3 border-t border-white/5 pt-4">
                    {/* Options */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs">
                      {q.options.map((opt, i) => {
                        const isSelected = q.selected_answer === opt;
                        const isCorrectOpt = q.correct_answer === opt;
                        return (
                          <div key={i} className={`p-3 rounded-xl border flex items-center justify-between gap-2 ${
                            isCorrectOpt ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-200'
                            : isSelected && !isCorrectOpt ? 'bg-red-500/15 border-red-500/40 text-red-300 line-through opacity-70'
                            : 'bg-[#080B14] border-arena-border text-slate-500'
                          }`}>
                            <span className="flex-1">{opt}</span>
                            {isCorrectOpt && <span className="text-[10px] font-bold text-emerald-400 uppercase shrink-0">✓ Correct</span>}
                            {isSelected && !isCorrectOpt && <span className="text-[10px] font-bold text-red-400 uppercase shrink-0">Your pick</span>}
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    <div className="p-3.5 rounded-xl bg-arena-card/60 border border-arena-border text-xs text-slate-300 space-y-1">
                      <div className="text-[11px] font-mono font-bold text-arena-violetLight uppercase tracking-wider">💡 Explanation</div>
                      <p className="leading-relaxed">{q.explanation}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
