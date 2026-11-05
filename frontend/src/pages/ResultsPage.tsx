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
import { ChessBackground } from '../components/ui/ChessBackground';
import { FifaPlayerCard } from '../components/ui/FifaPlayerCard';
import { AiScoutingReport, AIReportData } from '../components/ui/AiScoutingReport';

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
  track?: string;
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

  // Gemini AI Analysis State
  const [aiReport, setAiReport] = useState<AIReportData | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

  const handleSiuuuCelebration = () => {
    sounds.playSiuuu();
    setSiuuuActive(true);
    confetti({
      particleCount: 140,
      spread: 110,
      origin: { y: 0.6 },
      colors: ['#F59E0B', '#10B981', '#EA580C', '#FFFFFF', '#D4FF00'],
    });
    setTimeout(() => setSiuuuActive(false), 3000);
  };

  const loadAiReport = (id: string) => {
    setAiLoading(true);
    api
      .getAiAnalysis(id)
      .then((data) => {
        setAiReport(data);
      })
      .catch((err) => {
        console.warn('AI analysis load notice:', err.message);
      })
      .finally(() => {
        setAiLoading(false);
      });
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

        if (target >= 40) {
          setTimeout(() => {
            confetti({
              particleCount: 100,
              spread: 80,
              origin: { y: 0.58 },
              colors: ['#F59E0B', '#10B981', '#EA580C', '#FFFFFF', '#064E3B'],
            });
          }, 350);
        }

        // Trigger AI Scouting Report in background
        loadAiReport(attemptId);
      })
      .catch((err) => {
        setError(err.message || 'Failed to fetch results.');
        setLoading(false);
      });
  }, [attemptId, navigate]);

  const fmtTime = (s: number) => `${Math.floor(s / 60)}m ${s % 60}s`;

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4.5rem)] bg-charcoal tech-grid flex flex-col items-center justify-center gap-4 text-warmCream">
        <div className="w-12 h-12 border-3 border-amber-400/20 border-t-amber-400 rounded-full animate-spin" />
        <p className="text-xs font-mono text-amber-300 tracking-widest uppercase">
          CALCULATING SCORES, LEADERBOARD RANK & FIFA FUT CARD...
        </p>
      </div>
    );
  }

  if (error || !results) {
    return (
      <div className="min-h-[calc(100vh-4.5rem)] bg-charcoal tech-grid flex items-center justify-center p-4 text-warmCream">
        <div className="card-charcoal-orange max-w-md w-full p-8 border border-red-500/30 text-center space-y-4">
          <XCircle className="w-10 h-10 text-red-400 mx-auto" />
          <h2 className="text-lg font-bold text-warmCream font-display">Results Unavailable</h2>
          <p className="text-xs text-warmCream/70">{error || 'Session could not be retrieved.'}</p>
          <Link to="/" className="btn-forest-cream inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold">
            <Home className="w-4 h-4" />
            <span>Return to Arena</span>
          </Link>
        </div>
      </div>
    );
  }

  const getRankBadge = (score: number, max: number) => {
    const pct = max > 0 ? (score / max) * 100 : 0;
    if (pct >= 85) return { title: "BALLON D'OR CONTENDER // 95+ OVR 👑", color: 'text-amber-300 border-amber-400/50 bg-amber-500/15' };
    if (pct >= 65) return { title: 'BERNABÉU FIRST TEAM // 88+ OVR ⚽', color: 'text-emerald-300 border-emerald-400/40 bg-emerald-500/15' };
    if (pct >= 45) return { title: 'STAMFORD BRIDGE PLAYMAKER // 82+ OVR 🪄', color: 'text-cyan-300 border-cyan-400/40 bg-cyan-500/15' };
    return { title: 'RISING ACADEMY PROSPECT // 75+ OVR ⚡', color: 'text-warmCream/80 border-white/20 bg-white/5' };
  };

  const rankBadge = getRankBadge(results.total_score, results.max_score);

  const mascotMood: BitByteMood = results.total_score >= 60 ? 'victory' : results.total_score >= 40 ? 'excited' : 'defeat';
  const mascotMsg =
    results.total_score >= 70
      ? `Phenomenal performance, ${results.participant.display_name}! You conquered the Arena with ${results.total_score} points!`
      : results.total_score >= 40
      ? `Solid execution, ${results.participant.display_name}! ${results.total_score} points locked on the board!`
      : `Good effort, ${results.participant.display_name}! Review the breakdown below to sharpen your edge.`;

  const bd = results.difficulty_breakdown;
  const isFootball = results.track === 'ronaldo' || results.track === 'football' || results.track === 'legends';
  const isDark = results.track === 'dark' || results.track === 'winden';

  return (
    <div className="relative min-h-[calc(100vh-4.5rem)] bg-charcoal text-warmCream py-10 px-4 sm:px-6 overflow-hidden">
      <ChessBackground />
      <div className="max-w-4xl mx-auto space-y-8 relative z-10">

        {/* ── HERO RESULT FINALE CARD ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl p-6 sm:p-8 border-2 border-emerald-500/30 bg-gradient-to-b from-forestGreen/90 via-charcoal/95 to-charcoal shadow-2xl overflow-hidden space-y-6"
        >
          {/* Top Banner: Mascot + Score Gauge */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div className="w-full sm:w-auto flex-1 max-w-md">
              <BitByte3D mood={mascotMood} customMessage={mascotMsg} size="companion" showSpeech={true} />
            </div>

            <div className="text-center sm:text-right shrink-0">
              <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-widest border mb-2.5 ${rankBadge.color}`}>
                {rankBadge.title}
              </span>

              <div className="text-[10px] font-mono uppercase tracking-widest text-warmCream/60">
                TOTAL ARENA SCORE
              </div>
              <div className="flex items-baseline justify-center sm:justify-end gap-1.5 my-1 font-mono">
                <span className="text-6xl sm:text-7xl font-black text-amber-400 tabular-nums">
                  {animatedScore}
                </span>
                <span className="text-2xl font-bold text-warmCream/50">/{results.max_score}</span>
              </div>

              {results.rank && (
                <div className="inline-flex items-center gap-1.5 text-xs font-mono px-3.5 py-1 rounded-full bg-black/40 border border-white/15 text-warmCream">
                  <Trophy className="w-3.5 h-3.5 text-amber-400" />
                  <span>
                    LEADERBOARD RANK: <strong className="text-amber-400 font-bold">#{results.rank}</strong>
                    {results.total_participants && (
                      <span className="text-warmCream/60"> OF {results.total_participants}</span>
                    )}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
            <div className="p-3.5 rounded-2xl bg-black/30 border border-emerald-500/30">
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 mb-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>CORRECT</span>
              </div>
              <div className="text-2xl font-bold text-warmCream">
                {results.correct_count} <span className="text-xs text-warmCream/50 font-normal">/ {results.total_questions}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-black/30 border border-rose-500/30">
              <div className="flex items-center gap-1.5 text-xs text-rose-400 mb-1">
                <XCircle className="w-4 h-4" />
                <span>INCORRECT</span>
              </div>
              <div className="text-2xl font-bold text-warmCream">
                {results.incorrect_count}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-black/30 border border-cyan-500/30">
              <div className="flex items-center gap-1.5 text-xs text-cyan-400 mb-1">
                <Clock className="w-4 h-4" />
                <span>TIME TAKEN</span>
              </div>
              <div className="text-2xl font-bold text-warmCream">
                {fmtTime(results.time_taken_seconds)}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-black/30 border border-amber-500/30">
              <div className="flex items-center gap-1.5 text-xs text-amber-400 mb-1">
                <Target className="w-4 h-4" />
                <span>ACCURACY</span>
              </div>
              <div className="text-2xl font-bold text-warmCream">
                {results.total_questions > 0 ? Math.round((results.correct_count / results.total_questions) * 100) : 0}%
              </div>
            </div>
          </div>

          {/* Difficulty Tier Performance Bars */}
          <div className="p-4 rounded-2xl bg-black/30 border border-white/10 space-y-3 font-mono">
            <div className="text-xs uppercase tracking-wider text-warmCream/70 flex justify-between">
              <span>TIER EVALUATION // AUDIT BREAKDOWN</span>
              <span>POINTS EARNED</span>
            </div>

            {[
              {
                label: '🌱 Easy Opening Tier (10 pts each)',
                b: bd.easy,
                color: 'bg-emerald-400',
                text: 'text-emerald-300',
              },
              {
                label: '⚔️ Medium Tactical Tier (20 pts each)',
                b: bd.medium,
                color: 'bg-amber-400',
                text: 'text-amber-300',
              },
              {
                label: '🔥 Tough UCL / Boss Tier (30 pts each)',
                b: bd.tough,
                color: 'bg-burntOrange',
                text: 'text-burntOrange',
              },
            ].map(({ label, b, color, text }, idx) => {
              const maxP = b?.max_points || 1;
              const pts = b?.points || 0;
              const pct = (pts / maxP) * 100;
              return (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className={`${text} font-semibold`}>{label}</span>
                    <span className="text-warmCream/70">
                      {pts} / {maxP} pts ({b?.correct || 0}/{b?.total || 0})
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-black/40 overflow-hidden border border-white/5">
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

          {/* Action Links */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2 font-mono text-xs">
            <Link
              to="/leaderboard"
              onClick={() => sounds.playSelect()}
              className="btn-burnt-orange flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-xs font-black shadow-lg"
            >
              <Trophy className="w-4 h-4" />
              <span>VIEW NEON POSTGRES LEADERBOARD</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>

            <Link
              to="/"
              onClick={() => sounds.playClick()}
              className="btn-forest-cream flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-bold"
            >
              <Home className="w-4 h-4" />
              <span>ARENA HOME</span>
            </Link>
          </div>
        </motion.div>

        {/* ── 🌟 OFFICIAL EA FC / FIFA FUT PLAYER CARD SHOWCASE ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-charcoal via-forestGreen/40 to-charcoal border-2 border-amber-500/40 shadow-2xl text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono text-xs font-bold uppercase tracking-wider">
            <span>✨ EA SPORTS FC • DYNAMIC FUT CARD GENERATOR</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-warmCream font-display">
            YOUR ARENA ULTIMATE TEAM PLAYER CARD
          </h3>
          <p className="text-xs sm:text-sm text-warmCream/70 max-w-xl mx-auto">
            Rendered live based on your match precision, completion speed, and tactical stamina. Download as high-res PNG or copy your card rating!
          </p>

          <div className="pt-4 flex justify-center">
            <FifaPlayerCard
              playerName={results.participant.display_name}
              score={results.total_score}
              maxScore={results.max_score}
              timeTakenSeconds={results.time_taken_seconds}
              totalQuestions={results.total_questions}
              track={results.track}
              rank={results.rank}
              aiCardTitle={aiReport?.fifaCardTitle}
            />
          </div>
        </motion.div>

        {/* ── 🧠 AI MATCH SCOUTING REPORT (GEMINI 2.5 FLASH × OASIS VIBE) ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <AiScoutingReport
            report={aiReport}
            loading={aiLoading}
            onRefresh={() => loadAiReport(results.attempt_id)}
          />
        </motion.div>

        {/* ── CR7 BALLON D'OR & CHELSEA × REAL MADRID BROTHERHOOD ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="relative overflow-hidden rounded-3xl border-2 border-amber-500/30 bg-gradient-to-r from-charcoal via-forestGreen/30 to-charcoal p-6 shadow-2xl"
        >
          <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
            {/* Ronaldo Ballon d'Or Image */}
            <div className="relative group shrink-0">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-yellow-600 rounded-2xl blur-md opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse" />
              <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-2xl bg-black">
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
                <span>🏆 CR7 BALLON D'OR & OASIS SOUNDTRACK</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-warmCream font-display">
                {results.total_score >= 60 ? "CHAMPIONS MENTALITY // SIUUUU!" : "CALMA, CALMA! ARENA COMPLETED!"}
              </h3>

              <p className="text-xs text-warmCream/80 font-sans leading-relaxed max-w-xl">
                {results.total_score >= 60
                  ? "You delivered a world-class Ballon d'Or worthy performance in the Geekroom Arena! Unleash the celebration with Oasis Wonderwall in the stadium background!"
                  : "Every champion starts with relentless practice. Re-enter the tunnel, study the tactical review below, and return stronger!"}
              </p>

              {/* Siuuu Action Button */}
              <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-3">
                <button
                  onClick={handleSiuuuCelebration}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl btn-burnt-orange text-xs font-black uppercase tracking-wider shadow-lg hover:shadow-burntOrange/40 active:scale-95 transition-all"
                >
                  <span className="text-base">⚽</span>
                  <span>CELEBRATE SIUUUU! 🏆</span>
                </button>

                <Link
                  to="/cr7-goat"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl btn-forest-cream text-xs font-bold transition-all"
                >
                  <span>Read CR7 GOAT Dossier 📖</span>
                </Link>

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

        {/* ── CHELSEA 💙 × REAL MADRID 🤍 BROTHERHOOD ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {/* Hazard Card */}
          <div className="rounded-2xl border border-blue-500/40 bg-gradient-to-br from-[#061838] to-charcoal p-4 flex items-center gap-4 shadow-xl">
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-blue-400 shadow-md shrink-0">
              <img src="/hazard.jpg" alt="Eden Hazard" className="w-full h-full object-cover object-top" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-blue-400 font-bold">
                <img src="/chelsea-logo.svg" alt="" className="w-3.5 h-3.5 inline object-contain" />
                <span>EDEN HAZARD // #10</span>
              </div>
              <div className="text-sm font-bold text-warmCream truncate font-display">THE ART OF DRIBBLING</div>
              <p className="text-[11px] text-warmCream/70 font-sans mt-0.5 line-clamp-1">
                “Played with technical mastery and joy.”
              </p>
            </div>
            <button
              onClick={() => {
                sounds.playHazardMagic();
                confetti({ particleCount: 50, spread: 60, colors: ['#034694', '#60A5FA', '#FFFFFF'] });
              }}
              className="p-2.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/40 text-xs font-mono font-bold active:scale-95 transition-all"
              title="Play Hazard Magic Chime"
            >
              🪄
            </button>
          </div>

          {/* Kanté Card */}
          <div className="rounded-2xl border border-emerald-500/40 bg-gradient-to-br from-forestGreen to-charcoal p-4 flex items-center gap-4 shadow-xl">
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-emerald-400 shadow-md shrink-0">
              <img src="/kante.jpg" alt="N'Golo Kanté" className="w-full h-full object-cover object-top" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 font-bold">
                <img src="/chelsea-logo.svg" alt="" className="w-3.5 h-3.5 inline object-contain" />
                <span>N'GOLO KANTÉ // 100%</span>
              </div>
              <div className="text-sm font-bold text-warmCream truncate font-display">THE MIDFIELD MACHINE</div>
              <p className="text-[11px] text-warmCream/70 font-sans mt-0.5 line-clamp-1">
                “Covered every inch of the pitch with 0 excuses.”
              </p>
            </div>
            <button
              onClick={() => {
                sounds.playKanteTackle();
                confetti({ particleCount: 50, spread: 60, colors: ['#10B981', '#34D399', '#FFFFFF'] });
              }}
              className="p-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold active:scale-95 transition-all"
              title="Play Kanté Energy Pulse"
            >
              ⚡
            </button>
          </div>
        </motion.div>

        {/* ── QUESTION REVIEW SECTION ── */}
        <div className="space-y-3">
          <div className="flex items-center justify-between font-mono">
            <h3 className="text-sm font-bold text-warmCream flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>CHALLENGE VERIFICATION & EXPLANATIONS</span>
            </h3>
            <span className="text-xs text-warmCream/60">{results.questions.length} QUESTIONS REVIEWED</span>
          </div>

          {results.questions.map((q) => {
            const isOpen = expanded[q.id] !== false;
            const isBoss = q.difficulty === 'tough';

            return (
              <div
                key={q.id}
                className={`rounded-2xl border overflow-hidden transition-colors ${
                  q.is_correct
                    ? 'border-emerald-500/40 bg-forestGreen/30'
                    : q.selected_answer
                    ? 'border-rose-500/40 bg-rose-950/20'
                    : 'border-white/10 bg-black/30'
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
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/50'
                          : q.selected_answer
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                          : 'bg-black/50 text-warmCream/50 border border-white/10'
                      }`}
                    >
                      {q.position}
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-medium text-warmCream truncate font-sans">
                        {q.text}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5 font-mono text-[11px]">
                        <span
                          className={`uppercase font-bold ${
                            isBoss ? 'text-burntOrange' : q.difficulty === 'medium' ? 'text-amber-400' : 'text-emerald-400'
                          }`}
                        >
                          {q.difficulty}
                        </span>
                        <span className="text-warmCream/30">•</span>
                        <span className="text-warmCream/70">{q.category}</span>
                        <span className="text-warmCream/30">•</span>
                        <span className={q.is_correct ? 'text-emerald-400 font-bold' : 'text-warmCream/60'}>
                          +{q.points_awarded}/{q.max_points} PTS
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 font-mono text-xs">
                    {q.is_correct ? (
                      <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-bold font-mono text-[11px]">
                        <span>✓</span>
                        <span>CORRECT MOVE</span>
                      </span>
                    ) : q.selected_answer ? (
                      <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-rose-500/20 border border-rose-500/40 text-rose-300 font-bold font-mono text-[11px]">
                        <span>✗</span>
                        <span>MISSED TACTIC</span>
                      </span>
                    ) : (
                      <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-warmCream/50 font-mono text-[11px]">
                        UNANSWERED
                      </span>
                    )}

                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-warmCream/50" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-warmCream/50" />
                    )}
                  </div>
                </button>

                {/* Expanded Details */}
                {isOpen && (
                  <div className="px-5 pb-5 pt-2 border-t border-white/5 space-y-4 text-xs font-sans bg-black/20">
                    <p className="text-sm text-warmCream leading-relaxed font-sans">{q.text}</p>

                    {/* Options list */}
                    <div className="space-y-1.5">
                      {q.options.map((opt, idx) => {
                        const isCorrectOpt = opt === q.correct_answer;
                        const isUserSelected = opt === q.selected_answer;

                        let style = 'bg-black/30 border-white/10 text-warmCream/70';
                        if (isCorrectOpt) {
                          style = 'bg-emerald-950/40 border-emerald-400/50 text-emerald-300 font-semibold';
                        } else if (isUserSelected && !isCorrectOpt) {
                          style = 'bg-rose-950/40 border-rose-400/50 text-rose-300';
                        }

                        return (
                          <div
                            key={idx}
                            className={`p-3 rounded-xl border flex items-center justify-between text-xs ${style}`}
                          >
                            <span className="flex items-center gap-2">
                              <span className="font-mono text-[10px] opacity-60">
                                {String.fromCharCode(65 + idx)})
                              </span>
                              <span>{opt}</span>
                            </span>

                            <span className="font-mono text-[11px] font-bold flex items-center gap-1">
                              {isCorrectOpt && (
                                <span className="text-emerald-400 flex items-center gap-1">
                                  <Check className="w-3.5 h-3.5" /> Correct Answer
                                </span>
                              )}
                              {isUserSelected && !isCorrectOpt && (
                                <span className="text-rose-400 flex items-center gap-1">
                                  <X className="w-3.5 h-3.5" /> Your Choice
                                </span>
                              )}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    {q.explanation && (
                      <div className="p-3.5 rounded-xl bg-forestGreen/40 border border-emerald-500/25 text-warmCream/90 font-sans text-xs leading-relaxed">
                        <span className="font-mono font-bold text-amber-400 uppercase tracking-wider block mb-1">
                          Tactical Explanation:
                        </span>
                        {q.explanation}
                      </div>
                    )}
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
