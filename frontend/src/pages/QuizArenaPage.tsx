import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  Send,
  AlertTriangle,
  CheckCircle2,
  Circle,
  Flame,
  Zap,
  Sparkles,
  Volume2,
  VolumeX,
  HelpCircle,
} from 'lucide-react';
import { api } from '../services/api';
import { BitByte3D } from '../components/mascot/BitByte3D';
import { BitByteMood } from '../components/mascot/bitbyteDialogue';
import { ChessBackground } from '../components/ui/ChessBackground';
import { sounds } from '../utils/soundEffects';

interface Question {
  id: string;
  position: number;
  text: string;
  difficulty: 'easy' | 'medium' | 'tough';
  category: string;
  options: string[];
  code_snippet?: string | null;
  points: number;
}

export const QuizArenaPage: React.FC = () => {
  const { attemptId } = useParams<{ attemptId: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [deadlineAt, setDeadlineAt] = useState<Date | null>(null);
  const [secondsRemaining, setSecondsRemaining] = useState<number | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [participantName, setParticipantName] = useState<string>('Challenger');
  const [isMuted, setIsMuted] = useState(sounds.getMuted());

  // Mascot dynamic state
  const [mascotMood, setMascotMood] = useState<BitByteMood>('thinking');
  const [mascotMessage, setMascotMessage] = useState<string>(
    'Stage 1: Warm up with 2 Easy fundamentals.'
  );
  const questionStartTimeRef = useRef<number>(Date.now());

  const isSubmittingRef = useRef(false);

  // Load attempt on mount or refresh
  useEffect(() => {
    if (!attemptId) {
      navigate('/register');
      return;
    }

    api
      .getAttempt(attemptId)
      .then((data) => {
        if (data.attempt.status === 'completed' || data.attempt.status === 'expired') {
          navigate(`/results/${attemptId}`);
          return;
        }

        setQuestions(data.questions || []);
        if (data.selectedAnswers) setSelectedAnswers(data.selectedAnswers);
        if (data.attempt.participant_name) setParticipantName(data.attempt.participant_name);

        const deadline = new Date(data.attempt.deadline_at);
        setDeadlineAt(deadline);
        const rem = Math.max(0, Math.floor((deadline.getTime() - Date.now()) / 1000));
        setSecondsRemaining(rem);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Failed to load quiz session.');
        setLoading(false);
      });
  }, [attemptId, navigate]);

  // Synchronized countdown timer
  useEffect(() => {
    if (!deadlineAt) return;
    const interval = setInterval(() => {
      const rem = Math.max(0, Math.floor((deadlineAt.getTime() - Date.now()) / 1000));
      setSecondsRemaining(rem);

      if (rem <= 45 && rem > 0) {
        setMascotMood('low_time');
        setMascotMessage('3 seconds left. LOCK IN. CLOCK IS TICKING BRO!');
      }

      if (rem === 0 && !isSubmittingRef.current) {
        clearInterval(interval);
        handleAutoSubmit();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [deadlineAt]);

  // Keyboard navigation & hotkeys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showConfirmModal || loading || submitting) return;
      const currentQ = questions[currentIndex];
      if (!currentQ) return;

      if (['1', '2', '3', '4'].includes(e.key)) {
        const optionIndex = parseInt(e.key, 10) - 1;
        if (currentQ.options[optionIndex]) {
          handleSelectOption(currentQ.id, currentQ.options[optionIndex]);
        }
      } else if (['a', 'b', 'c', 'd', 'A', 'B', 'C', 'D'].includes(e.key)) {
        const map: Record<string, number> = { a: 0, b: 1, c: 2, d: 3, A: 0, B: 1, C: 2, D: 3 };
        const optionIndex = map[e.key];
        if (currentQ.options[optionIndex]) {
          handleSelectOption(currentQ.id, currentQ.options[optionIndex]);
        }
      } else if (e.key === 'ArrowRight' && currentIndex < questions.length - 1) {
        navigateToQuestion(currentIndex + 1);
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        navigateToQuestion(currentIndex - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, questions, showConfirmModal, loading, submitting, selectedAnswers]);

  const navigateToQuestion = (targetIndex: number) => {
    sounds.playClick();
    setCurrentIndex(targetIndex);
    questionStartTimeRef.current = Date.now();

    const targetQ = questions[targetIndex];
    if (!targetQ) return;

    // React to difficulty tier escalation
    if (targetQ.difficulty === 'tough') {
      sounds.playBossWarning();
      setMascotMood('tough');
      setMascotMessage('FINAL BOSS BATTLE! TOUGH QUESTION INCOMING!');
    } else if (targetQ.difficulty === 'medium') {
      sounds.playTierUp();
      setMascotMood('thinking');
      setMascotMessage('Warrior Trials: 20 pts on the line. Examine the logic carefully.');
    } else {
      setMascotMood('thinking');
      setMascotMessage('easy one. don’t overthink it.');
    }
  };

  const handleSelectOption = (questionId: string, option: string) => {
    sounds.playSelect();
    const elapsed = (Date.now() - questionStartTimeRef.current) / 1000;

    if (elapsed < 5) {
      setMascotMood('speed_mode');
      setMascotMessage('WHOA speed demon! ⚡ Instant lock-in!');
    } else {
      setMascotMood('excited');
      setMascotMessage('okayyy that was clean! 🔥 Option locked!');
    }

    setSelectedAnswers((prev) => {
      const updated = { ...prev, [questionId]: option };
      api.saveProgress(attemptId!, { [questionId]: option }).catch(console.warn);

      const answeredCount = Object.keys(updated).length;
      if (answeredCount === questions.length) {
        setMascotMood('excited');
        setMascotMessage("THAT'S MY CHALLENGER! All 5 locked in. Ready to submit?");
      }
      return updated;
    });
  };

  const handleAutoSubmit = async () => {
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    setSubmitting(true);
    try {
      await api.submitQuiz(attemptId!, selectedAnswers);
    } catch {}
    navigate(`/results/${attemptId}`);
  };

  const handleManualSubmit = async () => {
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    setSubmitting(true);
    setShowConfirmModal(false);
    try {
      await api.submitQuiz(attemptId!, selectedAnswers);
      navigate(`/results/${attemptId}`);
    } catch (err: any) {
      setError(err.message || 'Submission failed.');
      setSubmitting(false);
      isSubmittingRef.current = false;
    }
  };

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] cyber-grid flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-arena-cyan/30 border-t-arena-cyan rounded-full animate-spin" />
        <p className="text-sm font-mono text-arena-cyan tracking-widest">
          CONNECTING TO CODE ARENA HUD...
        </p>
      </div>
    );
  }

  if (error || questions.length === 0) {
    return (
      <div className="min-h-[calc(100vh-4rem)] cyber-grid flex items-center justify-center p-4">
        <div className="cyber-card max-w-md w-full p-8 border border-red-500/40 text-center space-y-4">
          <AlertTriangle className="w-10 h-10 text-red-400 mx-auto" />
          <h2 className="text-lg font-bold text-white font-display">Arena Connection Error</h2>
          <p className="text-xs text-slate-400">{error || 'Session could not be loaded.'}</p>
          <button
            onClick={() => navigate('/register')}
            className="px-6 py-2.5 rounded-xl bg-arena-cyan text-slate-950 text-xs font-mono font-bold hover:bg-cyan-300 transition-colors"
          >
            Return to Registration
          </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const answeredTotal = Object.keys(selectedAnswers).length;
  const isUrgent = (secondsRemaining ?? 300) <= 60;
  const isBossTier = currentQ.difficulty === 'tough';

  // Chess.com Engine Evaluation Metric
  const evalScore =
    answeredTotal === 5
      ? '#M1'
      : answeredTotal === 4
      ? '+6.8'
      : answeredTotal === 3
      ? '+4.2'
      : answeredTotal === 2
      ? '+2.1'
      : answeredTotal === 1
      ? '+0.8'
      : '0.0';
  const evalPercent = Math.min(100, Math.max(15, 50 + answeredTotal * 10));

  const getTierInfo = (diff: string) => {
    if (diff === 'easy') return { label: 'OPENING THEORY // ♟ MOVE 1-2', pts: '10 PTS', color: 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10' };
    if (diff === 'medium') return { label: 'TACTICAL MIDDLEGAME // ♞ MOVE 3-4', pts: '20 PTS', color: 'text-amber-400 border-amber-500/40 bg-amber-500/10' };
    return { label: 'GRANDMASTER ENDGAME // ♚ MOVE 5', pts: '30 PTS', color: 'text-rose-400 border-rose-500/50 bg-rose-500/15' };
  };

  const tier = getTierInfo(currentQ.difficulty);

  return (
    <div className="relative min-h-[calc(100vh-4rem)] py-6 px-4 sm:px-6 bg-carbon-950 text-carbon-50 overflow-hidden">
      <ChessBackground />
      <div className="max-w-4xl mx-auto space-y-4">

        {/* ── TOP ARENA HUD BAR ── */}
        <div className="titanium-card px-5 py-3.5 flex items-center justify-between gap-4 flex-wrap border border-white/10">
          {/* Challenger Identity */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center font-mono text-sm font-bold text-lime shrink-0">
              <span className="text-base">🤖</span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 uppercase font-bold">
                <span>GTBIT ARENA</span>
                <span className="text-slate-600">•</span>
                <span>SEAT VERIFIED</span>
              </div>
              <div className="text-sm font-bold text-white font-sans truncate">{participantName}</div>
            </div>
          </div>

          {/* Question Stepper Indicator */}
          <div className="flex items-center gap-2">
            {questions.map((q, idx) => {
              const isActive = currentIndex === idx;
              const isAnswered = !!selectedAnswers[q.id];
              const isQBoss = q.difficulty === 'tough';
              const pieceIcon = idx < 2 ? '♟' : idx < 4 ? '♞' : '♚';

              return (
                <button
                  key={q.id}
                  onClick={() => navigateToQuestion(idx)}
                  className={`h-8 px-2.5 rounded-lg font-mono text-xs font-bold transition-all flex items-center justify-center gap-1 border ${
                    isActive
                      ? isQBoss
                        ? 'bg-rose-500 text-white border-rose-400 scale-105 shadow-[0_0_12px_rgba(244,63,94,0.4)]'
                        : 'bg-lime text-carbon-950 border-lime scale-105 font-black shadow-[0_0_12px_rgba(212,255,0,0.4)]'
                      : isAnswered
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                      : 'bg-[#090D16] text-slate-400 border-white/10 hover:text-white hover:border-white/20'
                  }`}
                  title={`Move ${idx + 1} (${q.difficulty.toUpperCase()}): ${isAnswered ? 'Answered' : 'Unanswered'}`}
                >
                  <span className="text-[11px] opacity-80">{pieceIcon}</span>
                  <span>{idx + 1}</span>
                </button>
              );
            })}
          </div>

          {/* CR7 Calma Mode Motivational Badge */}
          <div
            onClick={() => sounds.playClick()}
            className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-[11px] font-bold cursor-pointer hover:bg-amber-500/20 transition-all select-none"
            title="CR7 Mindset: Focus, execute, no pressure!"
          >
            <span className="text-sm">⚽</span>
            <span>CR7 CALMA MODE // LOCK IN</span>
          </div>

          {/* Synchronized Countdown Timer */}
          <div
            className={`flex items-center gap-2.5 px-4 py-2 rounded-xl font-mono border transition-all shrink-0 ${
              isUrgent
                ? 'bg-rose-500/20 text-rose-300 border-rose-500 animate-pulse shadow-[0_0_15px_rgba(244,63,94,0.3)]'
                : 'bg-[#090D16] text-white border-white/10'
            }`}
          >
            <Clock className={`w-4 h-4 ${isUrgent ? 'text-rose-400' : 'text-lime'}`} />
            <div className="text-right">
              <div className="text-[9px] text-slate-400 uppercase leading-none font-bold">
                {isUrgent ? 'TIME TROUBLE ⚡' : 'BLITZ CLOCK // 5:00'}
              </div>
              <div className="text-base font-extrabold tracking-wider leading-none mt-1 tabular-nums">
                {secondsRemaining !== null ? formatTimer(secondsRemaining) : '--:--'}
              </div>
            </div>
          </div>
        </div>

        {/* ── 3D BITBYTE COMPANION BANNER ── */}
        <div className="titanium-card p-4 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 bg-[#101522]/90 backdrop-blur-md">
          <div className="w-full md:w-auto flex-1">
            <BitByte3D
              size="companion"
              mood={mascotMood}
              customMessage={mascotMessage}
              showSpeech={true}
            />
          </div>

          <div className="hidden lg:flex flex-col items-end gap-1.5 text-xs font-mono text-slate-400 shrink-0 border-l border-white/10 pl-6">
            <span className="text-[10px] text-lime font-bold uppercase tracking-wider">HUD TELEMETRY</span>
            <span>
              STATUS: <strong className="text-white font-display text-sm">{answeredTotal}/5 LOCKED</strong>
            </span>
            <span>TIER: <strong className="text-lime uppercase font-bold">{currentQ.difficulty}</strong></span>
            <span className="text-slate-500 text-[10px]">MAX POSSIBLE: 90 PTS</span>
          </div>
        </div>

        {/* ── QUESTION CARD WITH CHESS.COM EVALUATION BAR ── */}
        <div className="flex gap-3 items-stretch">
          {/* Vertical Chess.com Evaluation Bar */}
          <div className="hidden sm:flex flex-col items-center justify-between py-3 px-1.5 rounded-2xl bg-[#091222] border border-blue-500/20 shrink-0 w-9 shadow-lg select-none">
            <span className="text-[10px] font-mono font-black text-lime">
              {evalScore}
            </span>
            <div className="eval-bar-track flex-1 my-2">
              <div
                className="eval-bar-fill"
                style={{ height: `${evalPercent}%` }}
              />
            </div>
            <span className="text-[8px] font-mono text-blue-400 font-bold uppercase tracking-wider">
              EVAL
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQ.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className={`p-6 sm:p-8 transition-all titanium-card ${
                  isBossTier ? 'border-rose-500/40 bg-[#15101A]' : 'border-blue-900/30 bg-[#0B1324]'
                }`}
              >
                {/* Boss Level Alert Banner */}
                {isBossTier && (
                  <div className="mb-4 p-2.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-200 text-xs font-mono flex items-center justify-between">
                    <span className="flex items-center gap-2 font-bold uppercase tracking-wider">
                      <span className="text-base text-rose-400">♚</span>
                      CRITICAL ENDGAME POSITION // GRANDMASTER PUZZLE
                    </span>
                    <span className="text-rose-300 font-bold">30 POINTS</span>
                  </div>
                )}

                {/* Question Header Meta */}
                <div className="flex items-center justify-between gap-3 pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2.5 font-mono text-xs">
                    <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300">
                      MOVE {currentIndex + 1} OF {questions.length} // {currentIndex < 2 ? 'OPENING' : currentIndex < 4 ? 'MIDDLEGAME' : 'ENDGAME'}
                    </span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-400 uppercase">{currentQ.category}</span>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${tier.color}`}>
                    {tier.label} · {tier.pts}
                  </span>
                </div>

                {/* Question Text */}
                <h2 className="text-lg sm:text-xl font-semibold text-white leading-relaxed my-5 font-sans">
                  {currentQ.text}
                </h2>

                {/* Answer Options */}
                <div className="space-y-3 pt-2">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center justify-between">
                    <span>SELECT AN ANSWER:</span>
                    <span className="text-slate-500">HOTKEYS: [1] [2] [3] [4] or [A] [B] [C] [D]</span>
                  </div>

                  <div className="grid grid-cols-1 gap-2.5">
                    {currentQ.options.map((option, optIdx) => {
                      const isSelected = selectedAnswers[currentQ.id] === option;
                      const keyLetter = ['A', 'B', 'C', 'D'][optIdx];

                      return (
                        <motion.button
                          key={optIdx}
                          whileTap={{ scale: 0.985 }}
                          onClick={() => handleSelectOption(currentQ.id, option)}
                          className={`w-full text-left p-4 rounded-xl border transition-all duration-150 flex items-center justify-between group ${
                            isSelected
                              ? isBossTier
                                ? 'bg-rose-500/20 border-rose-500 text-white'
                                : 'bg-lime/10 border-lime text-white'
                              : 'bg-[#070D1A] border-white/10 hover:border-blue-500/40 text-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-3.5">
                            <span
                              className={`w-7 h-7 rounded-lg font-mono text-xs font-bold flex items-center justify-center border transition-colors ${
                                isSelected
                                  ? isBossTier
                                    ? 'bg-rose-500 text-white border-white/20'
                                    : 'bg-lime text-carbon-950 border-white/20 font-black'
                                  : 'bg-white/5 text-slate-400 border-white/10 group-hover:text-white'
                              }`}
                            >
                              {keyLetter}
                            </span>
                            <span className="font-mono text-sm leading-snug">{option}</span>
                          </div>

                          <div className="ml-3">
                            {isSelected ? (
                              <CheckCircle2
                                className={`w-5 h-5 shrink-0 ${
                                  isBossTier ? 'text-rose-400' : 'text-lime'
                                }`}
                              />
                            ) : (
                              <Circle className="w-5 h-5 text-slate-700 shrink-0 group-hover:text-slate-500" />
                            )}
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Chessboard Coordinates Footer */}
                <div className="pt-4 mt-5 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-600 select-none">
                  <span className="text-blue-400/70 font-bold">RANK {8 - currentIndex}</span>
                  <div className="hidden sm:flex items-center gap-4 text-slate-500">
                    {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map((file) => (
                      <span key={file}>{file}</span>
                    ))}
                  </div>
                  <span>STOCKFISH EVAL: <strong className="text-lime">{evalScore}</strong></span>
                </div>

                {/* Navigation Controls */}
                <div className="flex items-center justify-between pt-6 mt-6 border-t border-white/10">
                  <button
                    onClick={() => navigateToQuestion(currentIndex - 1)}
                    disabled={currentIndex === 0}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl btn-secondary text-xs font-mono disabled:opacity-20 disabled:pointer-events-none"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>PREVIOUS</span>
                  </button>

                  <div className="flex items-center gap-3 font-mono">
                    {currentIndex < questions.length - 1 ? (
                      <button
                        onClick={() => navigateToQuestion(currentIndex + 1)}
                        className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl btn-secondary text-xs font-bold"
                      >
                        <span>NEXT CHALLENGE</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          sounds.playSelect();
                          setShowConfirmModal(true);
                        }}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl btn-primary text-xs uppercase tracking-wider"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>♟ SUBMIT ARENA CHALLENGE</span>
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Quick Submit Floating Bar (when all 5 answered) */}
        {answeredTotal === questions.length && currentIndex < questions.length - 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="titanium-card p-4 border border-lime/40 flex items-center justify-between gap-4 font-mono text-xs bg-[#101522]"
          >
            <div className="flex items-center gap-2 text-lime">
              <CheckCircle2 className="w-4 h-4 text-lime" />
              <span>All 5 questions answered! Ready to lock in your score?</span>
            </div>
            <button
              onClick={() => {
                sounds.playSelect();
                setShowConfirmModal(true);
              }}
              className="px-4 py-2 rounded-lg btn-primary text-xs font-bold shrink-0"
            >
              Submit Now
            </button>
          </motion.div>
        )}
      </div>

      {/* ── CONFIRMATION MODAL ── */}
      <AnimatePresence>
        {showConfirmModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              className="cyber-card w-full max-w-md p-6 border border-arena-cyan/40 shadow-2xl space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-arena-cyan/20 flex items-center justify-center text-arena-cyan">
                  <Send className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-display">Confirm Submission</h3>
                  <p className="text-xs text-slate-400">Locking in your answers on the server</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#080C14] border border-arena-border text-xs space-y-2 font-mono">
                <div className="flex justify-between text-slate-300">
                  <span>Questions Answered:</span>
                  <strong className={answeredTotal === 5 ? 'text-arena-cyan' : 'text-amber-400'}>
                    {answeredTotal} OF 5
                  </strong>
                </div>
                {answeredTotal < 5 && (
                  <div className="text-amber-400 flex items-center gap-1.5 text-[11px] pt-1 border-t border-white/5">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    <span>
                      {5 - answeredTotal} unanswered question(s) will be scored as 0 points.
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-slate-400 pt-1 border-t border-white/5">
                  <span>Time Remaining:</span>
                  <span className="font-bold text-white">
                    {secondsRemaining !== null ? formatTimer(secondsRemaining) : '--:--'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => setShowConfirmModal(false)}
                  disabled={submitting}
                  className="w-1/2 py-2.5 rounded-xl border border-arena-border text-slate-300 hover:bg-white/5"
                >
                  Review More
                </button>
                <button
                  type="button"
                  onClick={handleManualSubmit}
                  disabled={submitting}
                  className="w-1/2 py-2.5 rounded-xl bg-arena-cyan text-slate-950 font-bold shadow-glow-cyan hover:bg-cyan-300 transition-colors"
                >
                  {submitting ? 'Evaluating...' : 'Yes, Submit Answers'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
