import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Trophy,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  ArrowRight,
  RotateCcw,
  Home,
  Check,
  X,
  Target,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { api } from '../services/api';
import { CodeBlock } from '../components/ui/CodeBlock';
import { GeekroomMascotReaction, MascotMood } from '../components/mascot/GeekroomMascotReaction';

interface QuestionReviewItem {
  id: string;
  position: number;
  text: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  code_snippet?: string | null;
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
  participant: {
    id: string;
    display_name: string;
    participant_code?: string | null;
  };
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
    hard: { correct: number; total: number; points: number; max_points: number };
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
  const [allowMultipleAttempts, setAllowMultipleAttempts] = useState(false);
  const [expandedQuestions, setExpandedQuestions] = useState<Record<string, boolean>>({});

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
        let current = 0;
        const step = Math.max(1, Math.ceil(target / 40));
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            setAnimatedScore(target);
            clearInterval(timer);
          } else {
            setAnimatedScore(current);
          }
        }, 25);

        // Fire confetti celebration if high score (e.g. >= 50 out of 90)
        if (target >= 50) {
          setTimeout(() => {
            confetti({
              particleCount: 80,
              spread: 70,
              origin: { y: 0.6 },
              colors: ['#8B5CF6', '#00FF88', '#38BDF8', '#F59E0B'],
            });
          }, 400);
        }
      })
      .catch((err) => {
        setError(err.message || 'Failed to fetch results.');
        setLoading(false);
      });

    api
      .getConfig()
      .then((cfg) => {
        if (cfg) setAllowMultipleAttempts(cfg.allow_multiple_attempts);
      })
      .catch(() => {});
  }, [attemptId, navigate]);

  const toggleExpand = (id: string) => {
    setExpandedQuestions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] cyber-grid flex flex-col items-center justify-center p-4">
        <div className="w-12 h-12 border-4 border-arena-violet border-t-arena-greenNeon rounded-full animate-spin mb-4" />
        <div className="text-sm font-mono text-slate-300">COMPUTING ARENA METRICS & RANKINGS...</div>
      </div>
    );
  }

  if (error || !results) {
    return (
      <div className="min-h-[calc(100vh-4rem)] cyber-grid flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full glass-panel p-6 rounded-2xl border border-red-500/30 text-center">
          <XCircle className="w-10 h-10 text-red-400 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-white mb-2">Results Unavailable</h2>
          <p className="text-xs text-slate-400 mb-6">{error || 'Session could not be retrieved.'}</p>
          <Link
            to="/"
            className="px-6 py-2.5 rounded-xl bg-arena-violet text-white text-xs font-semibold hover:bg-arena-violetLight"
          >
            Return to Arena
          </Link>
        </div>
      </div>
    );
  }

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s}s`;
  };

  const isHighScorer = results.total_score >= 50;
  const mascotMood: MascotMood = isHighScorer ? 'victory' : 'idle';
  const mascotMessage = isHighScorer
    ? `Spectacular run, ${results.participant.display_name}! You conquered the Arena with ${results.total_score} points!`
    : `Solid effort, ${results.participant.display_name}! Review your answers below to sharpen your edge for the next round.`;

  return (
    <div className="relative min-h-[calc(100vh-4rem)] cyber-grid py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Results Hero Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel-glow rounded-3xl p-6 sm:p-10 border border-arena-violet/30 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle Top Gradient Bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-arena-violet via-arena-greenNeon to-arena-cyan" />

          {/* Top Banner: Mascot + Performance Verdict */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-arena-border">
            <GeekroomMascotReaction
              mood={mascotMood}
              size="lg"
              message={mascotMessage}
            />

            {/* Score Reveal Gauge */}
            <div className="text-center md:text-right shrink-0">
              <div className="text-xs font-mono uppercase tracking-widest text-slate-400">
                FINAL ARENA SCORE
              </div>
              <div className="flex items-baseline justify-center md:justify-end gap-1.5 my-1">
                <span className="text-5xl sm:text-6xl font-extrabold tracking-tight font-mono text-transparent bg-clip-text bg-gradient-to-r from-arena-greenNeon via-emerald-300 to-arena-cyan">
                  {animatedScore}
                </span>
                <span className="text-2xl font-bold text-slate-500 font-mono">/ 90</span>
              </div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-full bg-arena-card border border-arena-border text-slate-300">
                <Trophy className="w-3.5 h-3.5 text-arena-violet" />
                <span>
                  LEADERBOARD RANK: <strong className="text-arena-greenNeon font-bold">#{results.rank || 1}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            <div className="p-4 rounded-2xl bg-[#090D17] border border-arena-border">
              <div className="flex items-center gap-2 text-xs text-emerald-400 mb-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>CORRECT</span>
              </div>
              <div className="text-2xl font-bold font-mono text-white">
                {results.correct_count} <span className="text-xs text-slate-500 font-normal">/ 5</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#090D17] border border-arena-border">
              <div className="flex items-center gap-2 text-xs text-red-400 mb-1">
                <XCircle className="w-4 h-4" />
                <span>INCORRECT</span>
              </div>
              <div className="text-2xl font-bold font-mono text-white">
                {results.incorrect_count}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#090D17] border border-arena-border">
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                <Clock className="w-4 h-4" />
                <span>TIME TAKEN</span>
              </div>
              <div className="text-2xl font-bold font-mono text-white">
                {formatTime(results.time_taken_seconds)}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#090D17] border border-arena-border">
              <div className="flex items-center gap-2 text-xs text-arena-cyan mb-1">
                <Target className="w-4 h-4" />
                <span>ACCURACY</span>
              </div>
              <div className="text-2xl font-bold font-mono text-white">
                {Math.round((results.correct_count / results.total_questions) * 100)}%
              </div>
            </div>
          </div>

          {/* Difficulty-wise Performance Breakdown */}
          <div className="mt-6 p-4 rounded-2xl bg-[#090D17] border border-arena-border space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span>DIFFICULTY BREAKDOWN</span>
              <span className="text-[11px] text-slate-500">POINTS EARNED</span>
            </div>

            <div className="space-y-2">
              {/* Easy */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-arena-greenNeon font-semibold">Easy (10 pts each)</span>
                  <span className="text-slate-300">
                    {results.difficulty_breakdown.easy.points} / {results.difficulty_breakdown.easy.max_points} pts ({results.difficulty_breakdown.easy.correct}/2)
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-arena-greenNeon rounded-full transition-all duration-500"
                    style={{
                      width: `${(results.difficulty_breakdown.easy.points / Math.max(1, results.difficulty_breakdown.easy.max_points)) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Medium */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-amber-400 font-semibold">Medium (20 pts each)</span>
                  <span className="text-slate-300">
                    {results.difficulty_breakdown.medium.points} / {results.difficulty_breakdown.medium.max_points} pts ({results.difficulty_breakdown.medium.correct}/2)
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full transition-all duration-500"
                    style={{
                      width: `${(results.difficulty_breakdown.medium.points / Math.max(1, results.difficulty_breakdown.medium.max_points)) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Hard */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-purple-400 font-semibold">Hard (30 pts)</span>
                  <span className="text-slate-300">
                    {results.difficulty_breakdown.hard.points} / {results.difficulty_breakdown.hard.max_points} pts ({results.difficulty_breakdown.hard.correct}/1)
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-arena-violet rounded-full transition-all duration-500"
                    style={{
                      width: `${(results.difficulty_breakdown.hard.points / Math.max(1, results.difficulty_breakdown.hard.max_points)) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-6 mt-6 border-t border-arena-border">
            <Link
              to="/leaderboard"
              className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-arena-violet to-arena-violetDark hover:from-arena-violetLight hover:to-arena-violet text-white font-bold text-sm shadow-glow-violet transition-all hover:scale-[1.01]"
            >
              <Trophy className="w-4 h-4 text-white" />
              <span>View Live Leaderboard</span>
            </Link>

            <Link
              to="/"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-arena-border text-slate-300 hover:text-white hover:bg-white/5 text-sm font-semibold transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>

            {allowMultipleAttempts && (
              <Link
                to="/register"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-arena-green/30 text-arena-greenNeon hover:bg-arena-green/10 text-sm font-semibold transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retry Challenge</span>
              </Link>
            )}
          </div>
        </motion.div>

        {/* Detailed Question Review Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-extrabold text-white">
              CHALLENGE AUDIT & REVIEW
            </h3>
            <span className="text-xs font-mono text-slate-400">
              5 QUESTIONS EVALUATED
            </span>
          </div>

          <div className="space-y-4">
            {results.questions.map((q, idx) => {
              const isExpanded = expandedQuestions[q.id] ?? true;

              return (
                <div
                  key={q.id}
                  className={`glass-panel rounded-2xl border transition-all ${
                    q.is_correct
                      ? 'border-emerald-500/30'
                      : q.selected_answer
                      ? 'border-red-500/30'
                      : 'border-slate-700'
                  }`}
                >
                  {/* Question Accordion Header */}
                  <div
                    onClick={() => toggleExpand(q.id)}
                    className="p-4 sm:p-5 flex items-center justify-between cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold ${
                          q.is_correct
                            ? 'bg-emerald-500/20 text-arena-greenNeon'
                            : q.selected_answer
                            ? 'bg-red-500/20 text-red-400'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {idx + 1}
                      </div>

                      <div>
                        <div className="text-sm font-semibold text-white line-clamp-1">
                          {q.text}
                        </div>
                        <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 mt-0.5">
                          <span className="uppercase">{q.difficulty}</span>
                          <span>•</span>
                          <span>{q.category}</span>
                          <span>•</span>
                          <span
                            className={
                              q.is_correct ? 'text-arena-greenNeon font-bold' : 'text-slate-500'
                            }
                          >
                            +{q.points_awarded}/{q.max_points} PTS
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {q.is_correct ? (
                        <span className="hidden sm:inline-flex items-center gap-1 text-xs font-mono text-arena-greenNeon">
                          <Check className="w-3.5 h-3.5" /> Correct
                        </span>
                      ) : q.selected_answer ? (
                        <span className="hidden sm:inline-flex items-center gap-1 text-xs font-mono text-red-400">
                          <X className="w-3.5 h-3.5" /> Incorrect
                        </span>
                      ) : (
                        <span className="hidden sm:inline-flex items-center gap-1 text-xs font-mono text-slate-500">
                          Unanswered
                        </span>
                      )}
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="px-4 pb-5 sm:px-5 space-y-4 pt-2 border-t border-white/5">
                      {/* Code Snippet if present */}
                      {q.code_snippet && (
                        <div>
                          <CodeBlock code={q.code_snippet} />
                        </div>
                      )}

                      {/* Options Review Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                        {q.options.map((opt, optIdx) => {
                          const isSelected = q.selected_answer === opt;
                          const isCorrectOpt = q.correct_answer === opt;

                          let stateClasses = 'bg-[#080B14] border-arena-border text-slate-400';
                          if (isCorrectOpt) {
                            stateClasses = 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300 font-semibold';
                          } else if (isSelected && !isCorrectOpt) {
                            stateClasses = 'bg-red-500/15 border-red-500/50 text-red-300 line-through';
                          }

                          return (
                            <div
                              key={optIdx}
                              className={`p-3 rounded-xl border flex items-center justify-between ${stateClasses}`}
                            >
                              <span>{opt}</span>
                              {isCorrectOpt && (
                                <span className="text-[10px] uppercase font-bold text-arena-greenNeon">
                                  ✓ Correct
                                </span>
                              )}
                              {isSelected && !isCorrectOpt && (
                                <span className="text-[10px] uppercase font-bold text-red-400">
                                  Your Choice
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Explanation Box */}
                      <div className="p-3.5 rounded-xl bg-arena-card/80 border border-arena-border text-xs text-slate-300 space-y-1">
                        <div className="text-[11px] font-mono font-bold text-arena-violetLight uppercase">
                          💡 EXPLANATION:
                        </div>
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
    </div>
  );
};
