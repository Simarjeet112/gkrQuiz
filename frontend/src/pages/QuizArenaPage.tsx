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
} from 'lucide-react';
import { api } from '../services/api';
import { GeekroomMascotReaction, MascotMood } from '../components/mascot/GeekroomMascotReaction';

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
  const [mascotMood, setMascotMood] = useState<MascotMood>('quiz');
  const [mascotMessage, setMascotMessage] = useState<string>('Stay focused! 5 questions between you and glory.');

  const isSubmittingRef = useRef(false);

  useEffect(() => {
    if (!attemptId) { navigate('/register'); return; }

    api.getAttempt(attemptId).then((data) => {
      if (data.attempt.status === 'completed' || data.attempt.status === 'expired') {
        navigate(`/results/${attemptId}`); return;
      }
      setQuestions(data.questions || []);
      if (data.selectedAnswers) setSelectedAnswers(data.selectedAnswers);
      if (data.attempt.participant_name) setParticipantName(data.attempt.participant_name);

      const deadline = new Date(data.attempt.deadline_at);
      setDeadlineAt(deadline);
      setSecondsRemaining(Math.max(0, Math.floor((deadline.getTime() - Date.now()) / 1000)));
      setLoading(false);
    }).catch((err) => {
      setError(err.message || 'Failed to load quiz session.');
      setLoading(false);
    });
  }, [attemptId, navigate]);

  // Timer countdown
  useEffect(() => {
    if (!deadlineAt) return;
    const interval = setInterval(() => {
      const rem = Math.max(0, Math.floor((deadlineAt.getTime() - Date.now()) / 1000));
      setSecondsRemaining(rem);
      if (rem <= 60 && rem > 0) {
        setMascotMood('urgent');
        setMascotMessage('Under 60 seconds! Lock in your answers NOW!');
      }
      if (rem === 0 && !isSubmittingRef.current) {
        clearInterval(interval);
        handleAutoSubmit();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [deadlineAt]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showConfirmModal || loading || submitting) return;
      const currentQ = questions[currentIndex];
      if (!currentQ) return;
      if (['1', '2', '3', '4'].includes(e.key)) {
        const optionIndex = parseInt(e.key, 10) - 1;
        if (currentQ.options[optionIndex]) handleSelectOption(currentQ.id, currentQ.options[optionIndex]);
      } else if (e.key === 'ArrowRight' && currentIndex < questions.length - 1) setCurrentIndex((i) => i + 1);
      else if (e.key === 'ArrowLeft' && currentIndex > 0) setCurrentIndex((i) => i - 1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, questions, showConfirmModal, loading, submitting, selectedAnswers]);

  const handleSelectOption = (questionId: string, option: string) => {
    setSelectedAnswers((prev) => {
      const updated = { ...prev, [questionId]: option };
      api.saveProgress(attemptId!, { [questionId]: option }).catch(console.warn);
      const count = Object.keys(updated).length;
      setMascotMood('quiz');
      if (count === questions.length) setMascotMessage('All 5 answered! Review or submit when ready.');
      else setMascotMessage(`Good choice! ${questions.length - count} more to go.`);
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

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Easy · 10 pts
        </span>
      );
      case 'medium': return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono bg-amber-500/15 text-amber-300 border border-amber-500/30 uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          Medium · 20 pts
        </span>
      );
      case 'tough': return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono bg-red-500/15 text-red-300 border border-red-500/30 uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
          Tough · 30 pts
        </span>
      );
      default: return null;
    }
  };

  if (loading) return (
    <div className="min-h-[calc(100vh-4rem)] cyber-grid flex flex-col items-center justify-center gap-4">
      <div className="w-12 h-12 border-4 border-arena-violet/30 border-t-arena-violet rounded-full animate-spin" />
      <p className="text-sm font-mono text-slate-400 tracking-widest">LOADING ARENA SESSION...</p>
    </div>
  );

  if (error || questions.length === 0) return (
    <div className="min-h-[calc(100vh-4rem)] cyber-grid flex items-center justify-center p-4">
      <div className="max-w-md w-full glass-panel p-8 rounded-2xl border border-red-500/30 text-center space-y-4">
        <AlertTriangle className="w-10 h-10 text-red-400 mx-auto" />
        <h2 className="text-lg font-bold text-white">Arena Connection Error</h2>
        <p className="text-xs text-slate-400">{error || 'Session could not be loaded.'}</p>
        <button onClick={() => navigate('/register')} className="px-6 py-2.5 rounded-xl bg-arena-violet text-white text-xs font-semibold hover:bg-arena-violetLight transition-colors">
          Return to Registration
        </button>
      </div>
    </div>
  );

  const currentQ = questions[currentIndex];
  const answeredTotal = Object.keys(selectedAnswers).length;
  const isUrgent = (secondsRemaining ?? 300) <= 60;

  return (
    <div className="min-h-[calc(100vh-4rem)] cyber-grid-dense py-5 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-4">

        {/* ── HUD Bar ── */}
        <div className="glass-panel rounded-2xl px-4 py-3 border border-arena-border flex items-center justify-between gap-3 flex-wrap">
          {/* Player */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-arena-card border border-arena-border flex items-center justify-center font-mono text-xs font-bold text-arena-greenNeon shrink-0">&gt;_</div>
            <div className="min-w-0">
              <div className="text-[10px] font-mono text-slate-500 uppercase">Challenger</div>
              <div className="text-sm font-bold text-white truncate">{participantName}</div>
            </div>
          </div>

          {/* Question dots */}
          <div className="flex items-center gap-1.5">
            {questions.map((q, idx) => {
              const isActive = currentIndex === idx;
              const answered = !!selectedAnswers[q.id];
              return (
                <button key={q.id} onClick={() => setCurrentIndex(idx)}
                  className={`w-7 h-7 rounded-lg font-mono text-xs font-bold transition-all flex items-center justify-center border ${
                    isActive ? 'bg-arena-violet text-white border-arena-violetLight scale-110 shadow-glow-violet'
                    : answered ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-arena-card text-slate-500 border-arena-border hover:text-white'
                  }`} title={`Q${idx + 1}: ${answered ? 'Answered' : 'Unanswered'}`}
                >{idx + 1}</button>
              );
            })}
          </div>

          {/* Timer */}
          <div className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-mono border transition-all shrink-0 ${
            isUrgent ? 'bg-red-500/20 text-red-300 border-red-500/50 animate-pulse shadow-[0_0_20px_rgba(239,68,68,0.25)]'
            : 'bg-arena-card text-white border-arena-border'
          }`}>
            <Clock className={`w-4 h-4 ${isUrgent ? 'text-red-400' : 'text-arena-violetLight'}`} />
            <span className="text-lg font-bold tracking-wider tabular-nums">
              {secondsRemaining !== null ? formatTimer(secondsRemaining) : '--:--'}
            </span>
          </div>
        </div>

        {/* ── Mascot Companion ── */}
        <div className="glass-panel rounded-xl px-4 py-2.5 border border-arena-border flex items-center justify-between gap-3">
          <GeekroomMascotReaction size="sm" mood={mascotMood} message={mascotMessage} showSpeech />
          <div className="hidden sm:flex items-center gap-3 text-xs font-mono text-slate-500 shrink-0">
            <span className="text-arena-greenNeon font-semibold">{answeredTotal}/5</span>
            <span>answered</span>
            <span className="text-slate-700">|</span>
            <span>Max score: <strong className="text-white">90 pts</strong></span>
          </div>
        </div>

        {/* ── Question Card ── */}
        <AnimatePresence mode="wait">
          <motion.div key={currentQ.id}
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="glass-panel-glow rounded-2xl border border-arena-violet/20 overflow-hidden shadow-xl"
          >
            {/* Card header stripe */}
            <div className="h-1 w-full bg-gradient-to-r from-arena-violet via-arena-cyanLight to-arena-greenNeon" />

            <div className="p-5 sm:p-7 space-y-5">
              {/* Meta row */}
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2 font-mono text-xs text-slate-500">
                  <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-slate-400">
                    Q{currentIndex + 1} / {questions.length}
                  </span>
                  <span>•</span>
                  <span>{currentQ.category}</span>
                </div>
                {getDifficultyBadge(currentQ.difficulty)}
              </div>

              {/* Question text */}
              <h2 className="text-base sm:text-lg font-semibold text-white leading-relaxed">
                {currentQ.text}
              </h2>

              {/* Options */}
              <div className="space-y-2.5 pt-1">
                <p className="text-[11px] font-mono uppercase tracking-wider text-slate-500 flex items-center justify-between">
                  <span>Select your answer</span>
                  <span className="text-slate-600">Keyboard: [1] [2] [3] [4]</span>
                </p>

                <div className="grid gap-2.5">
                  {currentQ.options.map((option, optIdx) => {
                    const isSelected = selectedAnswers[currentQ.id] === option;
                    const letter = ['A', 'B', 'C', 'D'][optIdx];
                    return (
                      <motion.button
                        key={optIdx} whileTap={{ scale: 0.98 }}
                        onClick={() => handleSelectOption(currentQ.id, option)}
                        className={`w-full text-left p-4 rounded-xl border transition-all duration-150 flex items-center gap-3.5 group ${
                          isSelected
                            ? 'bg-arena-violet/20 border-arena-violet shadow-glow-violet text-white'
                            : 'bg-[#090D17] border-arena-border hover:border-slate-600 hover:bg-white/[0.03] text-slate-300'
                        }`}
                      >
                        <span className={`w-7 h-7 rounded-lg font-mono text-xs font-bold flex items-center justify-center border shrink-0 transition-colors ${
                          isSelected ? 'bg-arena-violet text-white border-white/20'
                          : 'bg-white/5 text-slate-500 border-white/10 group-hover:text-slate-200 group-hover:border-white/20'
                        }`}>{letter}</span>
                        <span className="font-mono text-sm leading-snug flex-1">{option}</span>
                        {isSelected
                          ? <CheckCircle2 className="w-5 h-5 text-arena-greenNeon shrink-0" />
                          : <Circle className="w-5 h-5 text-slate-700 group-hover:text-slate-500 shrink-0 transition-colors" />
                        }
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <button onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
                  disabled={currentIndex === 0}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-arena-border text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/5 disabled:opacity-25 disabled:pointer-events-none transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>

                {currentIndex < questions.length - 1 ? (
                  <button onClick={() => setCurrentIndex((i) => Math.min(questions.length - 1, i + 1))}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-white/8 hover:bg-white/12 border border-white/10 text-xs font-semibold text-white transition-colors"
                  >
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button onClick={() => setShowConfirmModal(true)}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-arena-greenNeon hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-glow-green transition-all hover:scale-105 active:scale-95"
                  >
                    <Send className="w-3.5 h-3.5" /> Submit Quiz
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── Quick Submit CTA (visible when all answered) ── */}
        {answeredTotal === questions.length && currentIndex < questions.length - 1 && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className="glass-panel rounded-xl p-4 border border-emerald-500/30 flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-2.5 text-xs">
              <CheckCircle2 className="w-5 h-5 text-arena-greenNeon" />
              <span className="text-slate-300">All questions answered. Ready to submit?</span>
            </div>
            <button onClick={() => setShowConfirmModal(true)}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-arena-greenNeon text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors shrink-0"
            >
              <Send className="w-3.5 h-3.5" /> Submit Now
            </button>
          </motion.div>
        )}
      </div>

      {/* ── Confirm Submit Modal ── */}
      <AnimatePresence>
        {showConfirmModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }}
              className="w-full max-w-md glass-panel p-6 rounded-2xl border border-arena-border shadow-2xl space-y-5"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-arena-greenNeon/10 flex items-center justify-center text-arena-greenNeon">
                  <Send className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Final Submission</h3>
                  <p className="text-xs text-slate-400">You cannot change answers after submission.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#090D17] border border-arena-border text-xs space-y-2.5 font-mono">
                <div className="flex justify-between text-slate-300">
                  <span>Questions Answered</span>
                  <strong className={answeredTotal === 5 ? 'text-arena-greenNeon' : 'text-amber-400'}>{answeredTotal} / 5</strong>
                </div>
                {answeredTotal < 5 && (
                  <div className="flex items-start gap-2 text-amber-300 text-[11px] pt-1 border-t border-white/5">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span>{5 - answeredTotal} unanswered question(s) will score 0 points.</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-500 pt-1 border-t border-white/5">
                  <span>Time remaining</span>
                  <span>{secondsRemaining !== null ? formatTimer(secondsRemaining) : '--:--'}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setShowConfirmModal(false)} disabled={submitting}
                  className="flex-1 py-2.5 rounded-xl border border-arena-border text-xs font-semibold text-slate-300 hover:bg-white/5 transition-colors"
                >
                  Review More
                </button>
                <button onClick={handleManualSubmit} disabled={submitting}
                  className="flex-1 py-2.5 rounded-xl bg-arena-greenNeon text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors"
                >
                  {submitting ? 'Submitting...' : 'Lock In Answers'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
