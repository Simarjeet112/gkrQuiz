import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  Send,
  AlertTriangle,
  HelpCircle,
  Award,
  Zap,
  CheckCircle2,
  Circle,
  Terminal,
} from 'lucide-react';
import { api } from '../services/api';
import { CodeBlock } from '../components/ui/CodeBlock';
import { GeekroomMascotReaction, MascotMood } from '../components/mascot/GeekroomMascotReaction';

interface Question {
  id: string;
  position: number;
  text: string;
  difficulty: 'easy' | 'medium' | 'hard';
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

  // Mascot dynamic commentary
  const [mascotMood, setMascotMood] = useState<MascotMood>('quiz');
  const [mascotMessage, setMascotMessage] = useState<string>('Keep your cool! 5 questions between you and the podium.');

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
          // Attempt already completed, jump to results
          navigate(`/results/${attemptId}`);
          return;
        }

        setQuestions(data.questions || []);
        if (data.selectedAnswers) {
          setSelectedAnswers(data.selectedAnswers);
        }
        if (data.attempt.participant_name) {
          setParticipantName(data.attempt.participant_name);
        }

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

      if (rem <= 60 && rem > 0) {
        setMascotMood('urgent');
        setMascotMessage('Under 60 seconds remaining! Wrap up your answers!');
      } else if (rem === 0 && !isSubmittingRef.current) {
        clearInterval(interval);
        handleAutoSubmit();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [deadlineAt]);

  // Keyboard navigation shortcuts (1-4 to select options, ArrowLeft/ArrowRight to navigate)
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
      } else if (e.key === 'ArrowRight' && currentIndex < questions.length - 1) {
        setCurrentIndex((i) => i + 1);
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        setCurrentIndex((i) => i - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, questions, showConfirmModal, loading, submitting]);

  const handleSelectOption = (questionId: string, option: string) => {
    setSelectedAnswers((prev) => {
      const updated = { ...prev, [questionId]: option };
      // Save progress to backend in background
      api.saveProgress(attemptId!, { [questionId]: option }).catch((err) => {
        console.warn('Background progress save failed:', err);
      });
      return updated;
    });

    setMascotMood('quiz');
    const answeredCount = Object.keys({ ...selectedAnswers, [questionId]: option }).length;
    if (answeredCount === questions.length) {
      setMascotMessage('All 5 questions answered! Review carefully or lock it in!');
    } else {
      setMascotMessage(`Question recorded! ${questions.length - answeredCount} more to go.`);
    }
  };

  const handleAutoSubmit = async () => {
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    setSubmitting(true);

    try {
      await api.submitQuiz(attemptId!, selectedAnswers);
      navigate(`/results/${attemptId}`);
    } catch (err: any) {
      console.error('Auto submit error:', err);
      navigate(`/results/${attemptId}`);
    }
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
      setError(err.message || 'Submission failed. Please try again.');
      setSubmitting(false);
      isSubmittingRef.current = false;
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] cyber-grid flex flex-col items-center justify-center p-4">
        <div className="w-12 h-12 border-4 border-arena-violet border-t-arena-greenNeon rounded-full animate-spin mb-4" />
        <div className="text-sm font-mono text-slate-300">ENTERING TERMINAL ARENA...</div>
      </div>
    );
  }

  if (error || questions.length === 0) {
    return (
      <div className="min-h-[calc(100vh-4rem)] cyber-grid flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full glass-panel p-6 rounded-2xl border border-red-500/30 text-center">
          <AlertTriangle className="w-10 h-10 text-red-400 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-white mb-2">Arena Connection Error</h2>
          <p className="text-xs text-slate-400 mb-6">{error || 'Session could not be loaded.'}</p>
          <button
            onClick={() => navigate('/register')}
            className="px-6 py-2.5 rounded-xl bg-arena-violet text-white text-xs font-semibold hover:bg-arena-violetLight"
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

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return (
          <span className="px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-emerald-500/10 text-arena-greenNeon border border-emerald-500/30 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-arena-greenNeon" />
            EASY (10 PTS)
          </span>
        );
      case 'medium':
        return (
          <span className="px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            MEDIUM (20 PTS)
          </span>
        );
      case 'hard':
        return (
          <span className="px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/30 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-arena-violet" />
            HARD (30 PTS)
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] cyber-grid py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Arena Top Navigation & HUD Bar */}
        <div className="glass-panel rounded-2xl p-4 border border-arena-border flex flex-wrap items-center justify-between gap-4">
          {/* Challenger Identity */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-arena-card border border-arena-border flex items-center justify-center font-mono text-xs font-bold text-arena-greenNeon">
              &gt;_
            </div>
            <div>
              <div className="text-xs font-mono text-slate-400">CHALLENGER</div>
              <div className="text-sm font-bold text-white">{participantName}</div>
            </div>
          </div>

          {/* Question Jump Dots */}
          <div className="flex items-center gap-2">
            {questions.map((q, idx) => {
              const isSelected = currentIndex === idx;
              const hasAnswered = !!selectedAnswers[q.id];
              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-8 h-8 rounded-lg font-mono text-xs font-bold transition-all flex items-center justify-center border ${
                    isSelected
                      ? 'bg-arena-violet text-white border-arena-violetLight shadow-glow-violet scale-110'
                      : hasAnswered
                      ? 'bg-emerald-500/20 text-arena-greenNeon border-emerald-500/40'
                      : 'bg-arena-card text-slate-400 border-arena-border hover:bg-white/5'
                  }`}
                  title={`Question ${idx + 1}: ${hasAnswered ? 'Answered' : 'Unanswered'}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {/* Synchronized Countdown Timer */}
          <div
            className={`flex items-center gap-2.5 px-4 py-2 rounded-xl font-mono border transition-all ${
              isUrgent
                ? 'bg-red-500/20 text-red-400 border-red-500/50 animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                : 'bg-arena-card text-slate-200 border-arena-border'
            }`}
          >
            <Clock className={`w-4 h-4 ${isUrgent ? 'text-red-400' : 'text-arena-violetLight'}`} />
            <div className="text-right">
              <div className="text-[10px] text-slate-400 leading-none">TIME REMAINING</div>
              <div className="text-base font-bold tracking-wider leading-none mt-1">
                {secondsRemaining !== null ? formatTimer(secondsRemaining) : '--:--'}
              </div>
            </div>
          </div>
        </div>

        {/* Mascot Dynamic Companion Banner */}
        <div className="glass-panel rounded-2xl p-3 border border-arena-border flex items-center justify-between">
          <GeekroomMascotReaction
            size="sm"
            mood={mascotMood}
            message={mascotMessage}
            showSpeech={true}
          />
          <div className="hidden sm:flex items-center gap-4 text-xs font-mono text-slate-400 mr-2">
            <span>
              STATUS: <strong className="text-arena-greenNeon">{answeredTotal}/5 ANSWERED</strong>
            </span>
            <span>•</span>
            <span>TOTAL SCORE POSSIBLE: 90 PTS</span>
          </div>
        </div>

        {/* Question Panel */}
        <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 border border-arena-violet/25 shadow-xl relative">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-arena-border">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs px-2.5 py-1 rounded bg-white/5 text-slate-300 border border-white/10">
                QUESTION {currentIndex + 1} OF {questions.length}
              </span>
              <span className="text-xs font-mono text-slate-400">{currentQ.category}</span>
            </div>
            <div>{getDifficultyBadge(currentQ.difficulty)}</div>
          </div>

          {/* Question Text */}
          <div className="my-6">
            <h2 className="text-lg sm:text-xl font-medium text-white leading-relaxed">
              {currentQ.text}
            </h2>

            {/* Optional Syntax-Highlighted Code Snippet */}
            {currentQ.code_snippet && (
              <div className="mt-4">
                <CodeBlock code={currentQ.code_snippet} />
              </div>
            )}
          </div>

          {/* 4 Plausible Options */}
          <div className="space-y-3 pt-2">
            <div className="text-xs font-mono text-slate-400 mb-2 flex items-center justify-between">
              <span>SELECT AN ANSWER:</span>
              <span className="text-[11px] text-slate-500">Keyboard shortcuts: [1] [2] [3] [4]</span>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {currentQ.options.map((option, optIdx) => {
                const isSelected = selectedAnswers[currentQ.id] === option;
                const keyLetter = ['A', 'B', 'C', 'D'][optIdx];

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(currentQ.id, option)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-150 flex items-center justify-between group ${
                      isSelected
                        ? 'bg-arena-violet/20 border-arena-violet shadow-glow-violet text-white'
                        : 'bg-[#090D17] border-arena-border hover:border-slate-600 hover:bg-white/[0.03] text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <span
                        className={`w-7 h-7 rounded-lg font-mono text-xs font-bold flex items-center justify-center border ${
                          isSelected
                            ? 'bg-arena-violet text-white border-white/20'
                            : 'bg-white/5 text-slate-400 border-white/10 group-hover:text-white'
                        }`}
                      >
                        {keyLetter}
                      </span>
                      <span className="font-mono text-sm leading-snug">{option}</span>
                    </div>

                    <div className="ml-3">
                      {isSelected ? (
                        <CheckCircle2 className="w-5 h-5 text-arena-greenNeon shrink-0" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-700 shrink-0 group-hover:text-slate-500" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-8 mt-6 border-t border-arena-border">
            <button
              onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
              disabled={currentIndex === 0}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-arena-border text-xs font-semibold text-slate-300 hover:bg-white/5 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <div className="flex items-center gap-3">
              {currentIndex < questions.length - 1 ? (
                <button
                  onClick={() => setCurrentIndex((i) => Math.min(questions.length - 1, i + 1))}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-colors"
                >
                  <span>Next Question</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setShowConfirmModal(true)}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-arena-greenNeon to-emerald-500 text-slate-950 font-bold text-xs shadow-glow-green hover:scale-105 active:scale-95 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Quiz</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md glass-panel p-6 rounded-3xl border border-arena-border shadow-2xl space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-arena-violet/20 flex items-center justify-center text-arena-violet">
                  <Send className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Final Submission</h3>
                  <p className="text-xs text-slate-400">Locking in your answers</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#090D17] border border-arena-border text-xs space-y-2">
                <div className="flex justify-between text-slate-300">
                  <span>Questions Answered:</span>
                  <strong className="text-arena-greenNeon font-mono">{answeredTotal} of 5</strong>
                </div>
                {answeredTotal < 5 && (
                  <div className="text-amber-400 flex items-center gap-1.5 text-[11px] pt-1">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    <span>
                      {5 - answeredTotal} unanswered question(s) will be scored as 0 points.
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-slate-400 pt-1 border-t border-white/5">
                  <span>Time Remaining:</span>
                  <span className="font-mono">{secondsRemaining !== null ? formatTimer(secondsRemaining) : '--:--'}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowConfirmModal(false)}
                  disabled={submitting}
                  className="w-1/2 py-2.5 rounded-xl border border-arena-border text-xs font-semibold text-slate-300 hover:bg-white/5"
                >
                  Continue Reviewing
                </button>
                <button
                  type="button"
                  onClick={handleManualSubmit}
                  disabled={submitting}
                  className="w-1/2 py-2.5 rounded-xl bg-arena-greenNeon text-slate-950 font-bold text-xs shadow-glow-green hover:bg-emerald-400 transition-colors"
                >
                  {submitting ? 'Submitting...' : 'Yes, Submit Answers'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
