import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Trophy,
  CheckCircle2,
  XCircle,
  Clock,
  Home,
  Check,
  X,
  Target,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { api } from '../services/api';
import { BitByte3D } from '../components/mascot/BitByte3D';
import { BitByteMood } from '../components/mascot/bitbyteDialogue';
import { sounds } from '../utils/soundEffects';

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

export const ResultsPage: React.FC = () => {
  const { attemptId } = useParams<{ attemptId: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<ResultsData | null>(null);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [siuuuActive, setSiuuuActive] = useState(false);

  const handleSiuuuCelebration = () => {
    sounds.playSiuuu();
    setSiuuuActive(true);
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#F59E0B', '#FBBF24', '#D97706', '#FFFFFF', '#D4FF00'],
    });
    setTimeout(() => setSiuuuActive(false), 3000);
  };

  useEffect(() => {
    if (!attemptId) {
      navigate('/');
      return;
    }

    api
      .getResults(attemptId)
      .then((data) => {
        setResults(data);
        setLoading(false);

        // Smooth score count-up
        const target = data.total_score || 0;
        let curr = 0;
        const step = Math.max(1, Math.ceil(target / 45));
        const t = setInterval(() => {
          curr = Math.min(curr + step, target);
          setAnimatedScore(curr);
          if (curr >= target) {
            clearInterval(t);
            sounds.playVictory();
          }
        }, 22);

        if (target >= 50) {
          setTimeout(() => {
            confetti({
              particleCount: 90,
              spread: 75,
              origin: { y: 0.58 },
              colors: ['#D4FF00', '#FF5C00', '#F8FAFC', '#38BDF8'],
            });
          }, 350);
        }
      })
      .catch((err) => {
        setError(err.message || 'Failed to fetch results.');
        setLoading(false);
      });
  }, [attemptId, navigate]);

  const fmtTime = (s: number) => `${Math.floor(s / 60)}m ${s % 60}s`;

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4.5rem)] bg-carbon-950 tech-grid flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 border-2 border-lime-400/20 border-t-lime-400 rounded-full animate-spin" />
        <p className="text-xs font-mono text-lime-400 tracking-widest uppercase">
          COMPUTING ACCURACY & LEADERBOARD RANK...
        </p>
      </div>
    );
  }

  if (error || !results) {
    return (
      <div className="min-h-[calc(100vh-4.5rem)] bg-carbon-950 tech-grid flex items-center justify-center p-4">
        <div className="titanium-card max-w-md w-full p-8 border border-red-500/30 text-center space-y-4">
          <XCircle className="w-10 h-10 text-red-400 mx-auto" />
          <h2 className="text-lg font-bold text-white font-display">Results Unavailable</h2>
          <p className="text-xs text-carbon-400">{error || 'Session could not be retrieved.'}</p>
          <Link
            to="/"
            className="btn-secondary inline-flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return to Arena</span>
          </Link>
        </div>
      </div>
    );
  }

  const getRankBadge = (score: number) => {
    if (score >= 80) return { title: 'GRANDMASTER (GM) // 2800+ ELO ♚', color: 'text-lime-300 border-lime-400/40 bg-lime-400/10' };
    if (score >= 60) return { title: 'INTERNATIONAL MASTER (IM) // 2400+ ELO ♞', color: 'text-ember-300 border-ember-400/40 bg-ember-500/10' };
    if (score >= 40) return { title: 'CANDIDATE MASTER (CM) // 2000+ ELO ♜', color: 'text-cyan-300 border-cyan-400/40 bg-cyan-500/10' };
    return { title: 'CLUB TACTICIAN // 1500 ELO ♟', color: 'text-slate-300 border-white/20 bg-white/5' };
  };

  const rankBadge = getRankBadge(results.total_score);

  const mascotMood: BitByteMood = results.total_score >= 60 ? 'victory' : results.total_score >= 40 ? 'excited' : 'defeat';
  const mascotMsg =
    results.total_score >= 70
      ? `Phenomenal performance, ${results.participant.display_name}! You conquered the Arena with ${results.total_score} points!`
      : results.total_score >= 40
      ? `Solid execution, ${results.participant.display_name}! ${results.total_score} points locked on the board!`
      : `Good effort, ${results.participant.display_name}! Review the breakdown below to sharpen your edge.`;

  const bd = results.difficulty_breakdown;

  return (
    <div className="relative min-h-[calc(100vh-4.5rem)] bg-carbon-950 tech-grid py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* ── HERO RESULT FINALE CARD ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="titanium-card p-6 sm:p-8 border border-white/10 overflow-hidden space-y-6"
        >
          {/* Top Banner: Mascot + Score Gauge */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div className="w-full sm:w-auto flex-1 max-w-md">
              <BitByte3D mood={mascotMood} customMessage={mascotMsg} size="companion" showSpeech={true} />
            </div>

            <div className="text-center sm:text-right shrink-0">
              <span className={`inline-block px-3 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-widest border mb-2.5 ${rankBadge.color}`}>
                {rankBadge.title}
              </span>

              <div className="text-[10px] font-mono uppercase tracking-widest text-carbon-400">
                TOTAL SCORE
              </div>
              <div className="flex items-baseline justify-center sm:justify-end gap-1.5 my-1 font-mono">
                <span className="text-6xl sm:text-7xl font-extrabold text-lime-400 tabular-nums">
                  {animatedScore}
                </span>
                <span className="text-2xl font-bold text-carbon-500">/90</span>
              </div>

              {results.rank && (
                <div className="inline-flex items-center gap-1.5 text-xs font-mono px-3.5 py-1 rounded-full bg-carbon-900 border border-white/10 text-slate-300">
                  <Trophy className="w-3.5 h-3.5 text-lime-400" />
                  <span>
                    LEADERBOARD RANK: <strong className="text-lime-400">#{results.rank}</strong>
                    {results.total_participants && (
                      <span className="text-carbon-400"> OF {results.total_participants}</span>
                    )}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
            <div className="p-3.5 rounded-xl bg-carbon-900 border border-white/10">
              <div className="flex items-center gap-1.5 text-xs text-lime-400 mb-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>CORRECT</span>
              </div>
              <div className="text-2xl font-bold text-white">
                {results.correct_count} <span className="text-xs text-carbon-500 font-normal">/ 5</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-carbon-900 border border-white/10">
              <div className="flex items-center gap-1.5 text-xs text-red-400 mb-1">
                <XCircle className="w-4 h-4" />
                <span>INCORRECT</span>
              </div>
              <div className="text-2xl font-bold text-white">
                {results.incorrect_count}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-carbon-900 border border-white/10">
              <div className="flex items-center gap-1.5 text-xs text-cyan-400 mb-1">
                <Clock className="w-4 h-4" />
                <span>TIME TAKEN</span>
              </div>
              <div className="text-2xl font-bold text-white">
                {fmtTime(results.time_taken_seconds)}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-carbon-900 border border-white/10">
              <div className="flex items-center gap-1.5 text-xs text-ember-400 mb-1">
                <Target className="w-4 h-4" />
                <span>ACCURACY</span>
              </div>
              <div className="text-2xl font-bold text-white">
                {Math.round((results.correct_count / 5) * 100)}%
              </div>
            </div>
          </div>

          {/* Difficulty Tier Performance Bars (Opening, Middlegame, Endgame) */}
          <div className="p-4 rounded-xl bg-carbon-900 border border-white/10 space-y-3 font-mono">
            <div className="text-xs uppercase tracking-wider text-carbon-400 flex justify-between">
              <span>GAME EVALUATION // MOVES AUDIT</span>
              <span>POINTS EARNED</span>
            </div>

            {[
              {
                label: 'Move 1-2 // ♟ Opening Theory (10 pts each)',
                b: bd.easy,
                color: 'bg-lime-400',
                text: 'text-lime-300',
              },
              {
                label: 'Move 3-4 // ♞ Tactical Middlegame (20 pts each)',
                b: bd.medium,
                color: 'bg-amber-400',
                text: 'text-amber-300',
              },
              {
                label: 'Move 5 // ♚ Grandmaster Endgame (30 pts)',
                b: bd.tough,
                color: 'bg-ember-500',
                text: 'text-ember-300',
              },
            ].map(({ label, b, color, text }, idx) => {
              const maxP = b?.max_points || 1;
              const pts = b?.points || 0;
              const pct = (pts / maxP) * 100;
              return (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className={`${text} font-semibold`}>{label}</span>
                    <span className="text-carbon-300">
                      {pts} / {maxP} pts ({b?.correct || 0}/{b?.total || 0})
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-carbon-800 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8, delay: 0.2 + idx * 0.1 }}
                      className={`h-full rounded-full ${color}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2 font-mono text-xs">
            <Link
              to="/leaderboard"
              onClick={() => sounds.playSelect()}
              className="btn-primary flex-1 flex items-center justify-center gap-2 py-3.5 text-xs font-bold"
            >
              <Trophy className="w-4 h-4" />
              <span>VIEW LIVE LEADERBOARD</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>

            <Link
              to="/"
              onClick={() => sounds.playClick()}
              className="btn-secondary flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold"
            >
              <Home className="w-4 h-4" />
              <span>ARENA HOME</span>
            </Link>
          </div>
        </motion.div>

        {/* ── CR7 BALLON D'OR GOAT OF CODE SHOWCASE ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-r from-[#181308] via-[#120F08] to-[#0A0D14] p-6 shadow-2xl"
        >
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
            {/* Ronaldo Ballon d'Or Image with Golden Aura */}
            <div className="relative group shrink-0">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-yellow-600 rounded-2xl blur-md opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse" />
              <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-xl overflow-hidden border-2 border-amber-400/80 shadow-2xl bg-black">
                <img
                  src="/ronaldo-ballondor.jpg"
                  alt="Cristiano Ronaldo Ballon d'Or"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-1.5 text-center">
                  <span className="text-[10px] font-mono font-black text-amber-300 uppercase tracking-widest">
                    CR7 5x BALLON D'OR
                  </span>
                </div>
              </div>
            </div>

            {/* Showcase Message & Stats */}
            <div className="flex-1 text-center sm:text-left space-y-2.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 font-mono text-[10px] font-bold uppercase tracking-wider">
                <span>🏆 GOAT OF CODE ARENA CELEBRATION</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white font-display">
                {results.total_score >= 60 ? "CHAMPIONS MENTALITY // SIUUUU!" : "CALMA, CALMA! ARENA COMPLETED!"}
              </h3>

              <p className="text-xs text-slate-300 font-sans leading-relaxed max-w-xl">
                {results.total_score >= 60
                  ? "You delivered a world-class Ballon d'Or worthy performance in the Geekroom Arena! Unleash the celebration!"
                  : "Every champion starts with rigorous practice. Sharpen your algorithmic reflexes and return stronger!"}
              </p>

              {/* Siuuu Action Button */}
              <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-3">
                <button
                  onClick={handleSiuuuCelebration}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-carbon-950 font-mono text-xs font-black uppercase tracking-wider shadow-[0_0_20px_rgba(245,158,11,0.5)] hover:shadow-[0_0_25px_rgba(245,158,11,0.8)] active:scale-95 transition-all"
                >
                  <span className="text-base">⚽</span>
                  <span>CELEBRATE SIUUUU! 🏆</span>
                </button>

                {siuuuActive && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="px-3.5 py-2 rounded-xl bg-black/90 border border-amber-400 text-amber-300 font-mono text-xs font-bold animate-pulse flex items-center gap-1.5"
                  >
                    <span>🔥</span>
                    <span>SIUUUUUU! 5x BALLON D'OR ENERGY!</span>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── QUESTION REVIEW SECTION ── */}
        <div className="space-y-3">
          <div className="flex items-center justify-between font-mono">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-lime-400" />
              <span>CHALLENGE VERIFICATION & EXPLANATIONS</span>
            </h3>
            <span className="text-xs text-carbon-400">5 QUESTIONS REVIEWED</span>
          </div>

          {results.questions.map((q) => {
            const isOpen = expanded[q.id] !== false;
            const isBoss = q.difficulty === 'tough';

            return (
              <div
                key={q.id}
                className={`titanium-card border overflow-hidden transition-colors ${
                  q.is_correct
                    ? 'border-lime-500/30'
                    : q.selected_answer
                    ? 'border-red-500/30'
                    : 'border-white/10'
                }`}
              >
                {/* Header Toggle */}
                <button
                  onClick={() => setExpanded((p) => ({ ...p, [q.id]: !isOpen }))}
                  className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold shrink-0 ${
                        q.is_correct
                          ? 'bg-lime-400/20 text-lime-300 border border-lime-400/40'
                          : q.selected_answer
                          ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                          : 'bg-carbon-800 text-carbon-400 border border-white/10'
                      }`}
                    >
                      {q.position}
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white truncate font-sans">
                        {q.text}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5 font-mono text-[11px]">
                        <span
                          className={`uppercase font-bold ${
                            isBoss ? 'text-ember-400' : q.difficulty === 'medium' ? 'text-amber-400' : 'text-lime-400'
                          }`}
                        >
                          {q.difficulty}
                        </span>
                        <span className="text-carbon-600">•</span>
                        <span className="text-carbon-400">{q.category}</span>
                        <span className="text-carbon-600">•</span>
                        <span className={q.is_correct ? 'text-lime-400 font-bold' : 'text-carbon-400'}>
                          +{q.points_awarded}/{q.max_points} PTS
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 font-mono text-xs">
                    {q.is_correct ? (
                      <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-lime-400/15 border border-lime-400/40 text-lime-300 font-bold font-mono text-[11px]">
                        <span>{q.position === 5 ? '!!' : q.position >= 3 ? '!!' : '!'}</span>
                        <span>{q.position === 5 ? 'BRILLIANT CHECKMATE' : q.position >= 3 ? 'BRILLIANT MOVE' : 'BEST MOVE'}</span>
                      </span>
                    ) : q.selected_answer ? (
                      <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-red-500/15 border border-red-500/40 text-red-300 font-bold font-mono text-[11px]">
                        <span>??</span>
                        <span>BLUNDER</span>
                      </span>
                    ) : (
                      <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-carbon-800 border border-white/10 text-carbon-400 font-mono text-[11px]">
                        <span>?!</span>
                        <span>MISSED MOVE</span>
                      </span>
                    )}
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-carbon-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-carbon-400" />
                    )}
                  </div>
                </button>

                {/* Body Details */}
                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 space-y-3 border-t border-white/5 pt-4">
                    {/* Options Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs">
                      {q.options.map((opt, optI) => {
                        const isSelected = q.selected_answer === opt;
                        const isCorrectOpt = q.correct_answer === opt;

                        return (
                          <div
                            key={optI}
                            className={`p-3 rounded-xl border flex items-center justify-between gap-2 ${
                              isCorrectOpt
                                ? 'bg-lime-400/10 border-lime-400/50 text-lime-200 font-semibold'
                                : isSelected && !isCorrectOpt
                                ? 'bg-red-500/10 border-red-500/50 text-red-300 line-through'
                                : 'bg-carbon-900 border-white/10 text-carbon-400'
                            }`}
                          >
                            <span>{opt}</span>
                            {isCorrectOpt && (
                              <span className="text-[10px] font-bold text-lime-400 uppercase">
                                ✓ Correct
                              </span>
                            )}
                            {isSelected && !isCorrectOpt && (
                              <span className="text-[10px] font-bold text-red-400 uppercase">
                                Your Choice
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    <div className="p-3.5 rounded-xl bg-carbon-900 border border-white/10 text-xs text-carbon-300 space-y-1">
                      <div className="text-[10px] font-mono font-bold text-lime-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3" />
                        <span>EXPLANATION</span>
                      </div>
                      <p className="leading-relaxed font-sans text-carbon-200">{q.explanation}</p>
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
