import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings,
  Shield,
  HelpCircle,
  Plus,
  Edit,
  Trash2,
  Download,
  AlertTriangle,
  CheckCircle,
  Search,
  X,
  FileSpreadsheet,
  RotateCcw,
  Eye,
  Sliders,
  Sparkles,
  Lock,
} from 'lucide-react';
import { api } from '../services/api';
import { CodeBlock } from '../components/ui/CodeBlock';

export const OrganizerPage: React.FC = () => {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);

  // Active Tab: 'questions' | 'settings' | 'danger'
  const [activeTab, setActiveTab] = useState<'questions' | 'settings' | 'danger'>('questions');

  // Stats
  const [stats, setStats] = useState<any>(null);

  // Question bank state
  const [questions, setQuestions] = useState<any[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loadingQuestions, setLoadingQuestions] = useState(false);

  // Add/Edit Question Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [qText, setQText] = useState('');
  const [qDifficulty, setQDifficulty] = useState<'easy' | 'medium' | 'tough'>('easy');
  const [qCategory, setQCategory] = useState('Fundamentals');
  const [qOptions, setQOptions] = useState(['', '', '', '']);
  const [qCorrect, setQCorrect] = useState('');
  const [qExplanation, setQExplanation] = useState('');
  const [qCode, setQCode] = useState('');

  // Event Config state
  const [config, setConfig] = useState<Record<string, string>>({
    quiz_duration_minutes: '5',
    require_roll_number: 'false',
    allow_multiple_attempts: 'false',
    event_title: 'GEEKROOM // CODE ARENA',
    points_easy: '10',
    points_medium: '20',
    points_tough: '30',
  });
  const [configSuccess, setConfigSuccess] = useState(false);

  // Danger reset state
  const [confirmPhrase, setConfirmPhrase] = useState('');
  const [resetError, setResetError] = useState<string | null>(null);
  const [resetSuccess, setResetSuccess] = useState(false);

  // Check saved session passcode
  useEffect(() => {
    const saved = sessionStorage.getItem('gkr_organizer_passcode');
    if (saved) {
      api
        .organizerVerify(saved)
        .then(() => {
          setIsAuthenticated(true);
          loadAllData();
        })
        .catch(() => {
          sessionStorage.removeItem('gkr_organizer_passcode');
        });
    }
  }, []);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setVerifying(true);
    try {
      await api.organizerVerify(passcode);
      sessionStorage.setItem('gkr_organizer_passcode', passcode);
      setIsAuthenticated(true);
      loadAllData();
    } catch (err: any) {
      setAuthError(err.message || 'Incorrect organizer passcode.');
    } finally {
      setVerifying(false);
    }
  };

  const loadAllData = async () => {
    setLoadingQuestions(true);
    try {
      const [st, qs, cfg] = await Promise.all([
        api.organizerGetStats(),
        api.organizerGetQuestions(selectedDifficulty, searchQuery),
        api.organizerGetConfig(),
      ]);
      setStats(st);
      setQuestions(qs || []);
      if (cfg) setConfig(cfg);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingQuestions(false);
    }
  };

  const handleFilterChange = async (diff: string, query: string) => {
    setSelectedDifficulty(diff);
    setSearchQuery(query);
    setLoadingQuestions(true);
    try {
      const qs = await api.organizerGetQuestions(diff, query);
      setQuestions(qs || []);
    } finally {
      setLoadingQuestions(false);
    }
  };

  const openCreateModal = () => {
    setEditingId(null);
    setQText('');
    setQDifficulty('easy');
    setQCategory('Fundamentals');
    setQOptions(['', '', '', '']);
    setQCorrect('');
    setQExplanation('');
    setQCode('');
    setModalOpen(true);
  };

  const openEditModal = (q: any) => {
    setEditingId(q.id);
    setQText(q.text);
    setQDifficulty(q.difficulty);
    setQCategory(q.category);
    setQOptions(q.options);
    setQCorrect(q.correct_answer);
    setQExplanation(q.explanation);
    setQCode(q.code_snippet || '');
    setModalOpen(true);
  };

  const handleSaveQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        text: qText.trim(),
        difficulty: qDifficulty,
        category: qCategory.trim(),
        options: qOptions.map((o) => o.trim()),
        correct_answer: qCorrect.trim(),
        explanation: qExplanation.trim(),
        code_snippet: qCode.trim() || null,
      };

      if (editingId) {
        await api.organizerUpdateQuestion(editingId, payload);
      } else {
        await api.organizerAddQuestion(payload);
      }

      setModalOpen(false);
      loadAllData();
    } catch (err: any) {
      alert(err.message || 'Failed to save question.');
    }
  };

  const handleToggleActive = async (q: any) => {
    try {
      await api.organizerUpdateQuestion(q.id, { is_active: !q.is_active });
      loadAllData();
    } catch (err: any) {
      alert(err.message || 'Failed to toggle status.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this question?')) return;
    try {
      await api.organizerDeleteQuestion(id);
      loadAllData();
    } catch (err: any) {
      alert(err.message || 'Failed to delete.');
    }
  };

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.organizerUpdateConfig(config);
      setConfigSuccess(true);
      setTimeout(() => setConfigSuccess(false), 3000);
    } catch (err: any) {
      alert(err.message || 'Failed to update config.');
    }
  };

  const handleResetAttempts = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetError(null);
    try {
      await api.organizerResetAttempts(confirmPhrase);
      setResetSuccess(true);
      setConfirmPhrase('');
      loadAllData();
      setTimeout(() => setResetSuccess(false), 4000);
    } catch (err: any) {
      setResetError(err.message || 'Reset failed.');
    }
  };

  const handleExportCSV = () => {
    const code = sessionStorage.getItem('gkr_organizer_passcode');
    window.open(`/api/organizer/export-csv?passcode=${encodeURIComponent(code || '')}`, '_blank');
  };

  const handleLogout = () => {
    sessionStorage.removeItem('gkr_organizer_passcode');
    setIsAuthenticated(false);
  };

  // ── PASSCODE ENTRY SCREEN ──
  if (!isAuthenticated) {
    return (
      <div className="min-h-[calc(100vh-4.5rem)] bg-carbon-950 tech-grid flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="titanium-card w-full max-w-md p-8 border border-white/10 space-y-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-lime-400/10 border border-lime-400/30 flex items-center justify-center text-lime-400">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-lime-400 uppercase tracking-widest">
                CONTROL ROOM
              </div>
              <h1 className="text-xl font-bold text-white font-display">Organizer Access</h1>
            </div>
          </div>

          <p className="text-xs text-carbon-400">
            Enter the organizer passcode to manage the 50-question bank, event timer, and quiz controls.
          </p>

          {authError && (
            <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-xs text-red-300 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase text-carbon-400 mb-1.5">
                Organizer Passcode
              </label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode..."
                required
                className="w-full px-4 py-3 rounded-xl bg-carbon-900 border border-white/10 text-white text-sm outline-none focus:border-lime-400 font-mono transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={verifying}
              className="btn-primary w-full py-3.5 text-xs font-bold uppercase tracking-wider disabled:opacity-50"
            >
              {verifying ? 'Verifying...' : 'Unlock Control Room'}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // ── ORGANIZER DASHBOARD ──
  return (
    <div className="relative min-h-[calc(100vh-4.5rem)] bg-carbon-950 tech-grid py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header HUD */}
        <div className="titanium-card p-5 border border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-lime-400/10 border border-lime-400/30 flex items-center justify-center text-lime-400">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-lime-400 tracking-widest uppercase">
                GEEKROOM GTBIT // CONTROL ROOM
              </div>
              <h1 className="text-lg font-bold text-white font-display">
                Organizer Quiz Administration
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleExportCSV}
              className="btn-secondary flex items-center gap-1.5 px-3 py-2 text-xs font-mono"
            >
              <Download className="w-3.5 h-3.5 text-lime-400" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-xs text-red-300 font-mono transition-colors"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Lock Room</span>
            </button>
          </div>
        </div>

        {/* Breakdown Stats Bar */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
            <div className="titanium-card p-4 border border-lime-500/20">
              <div className="text-[10px] text-lime-400 uppercase">EASY QUESTIONS</div>
              <div className="text-2xl font-bold text-white mt-1">
                {stats.breakdown.easy.active}{' '}
                <span className="text-xs text-carbon-500 font-normal">/ {stats.breakdown.easy.total}</span>
              </div>
            </div>

            <div className="titanium-card p-4 border border-amber-500/20">
              <div className="text-[10px] text-amber-400 uppercase">MEDIUM QUESTIONS</div>
              <div className="text-2xl font-bold text-white mt-1">
                {stats.breakdown.medium.active}{' '}
                <span className="text-xs text-carbon-500 font-normal">/ {stats.breakdown.medium.total}</span>
              </div>
            </div>

            <div className="titanium-card p-4 border border-ember-500/20">
              <div className="text-[10px] text-ember-400 uppercase">TOUGH QUESTIONS</div>
              <div className="text-2xl font-bold text-white mt-1">
                {stats.breakdown.tough.active}{' '}
                <span className="text-xs text-carbon-500 font-normal">/ {stats.breakdown.tough.total}</span>
              </div>
            </div>

            <div className="titanium-card p-4 border border-cyan-500/20">
              <div className="text-[10px] text-cyan-400 uppercase">LIVE ATTEMPTS</div>
              <div className="text-2xl font-bold text-white mt-1">
                {stats.total_completed_attempts}
              </div>
            </div>
          </div>
        )}

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-2 font-mono text-xs">
          {[
            { id: 'questions', label: 'Question Bank (50 Questions)', icon: HelpCircle },
            { id: 'settings', label: 'Timer & Scoring Settings', icon: Sliders },
            { id: 'danger', label: 'Reset Event Attempts', icon: AlertTriangle },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all ${
                  isActive
                    ? 'bg-lime-400/15 text-lime-300 border-lime-400/40 font-bold'
                    : 'bg-carbon-900 text-carbon-400 border-white/10 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ── TAB 1: QUESTION BANK MANAGER ── */}
        {activeTab === 'questions' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2.5 flex-1 max-w-lg">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-carbon-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => handleFilterChange(selectedDifficulty, e.target.value)}
                    placeholder="Search question text or category..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-carbon-900 border border-white/10 text-xs text-white placeholder:text-carbon-500 focus:outline-none focus:border-lime-400 font-mono"
                  />
                </div>

                <select
                  value={selectedDifficulty}
                  onChange={(e) => handleFilterChange(e.target.value, searchQuery)}
                  className="px-3 py-2 rounded-xl bg-carbon-900 border border-white/10 text-xs font-mono text-white"
                >
                  <option value="all">All Tiers</option>
                  <option value="easy">Easy Only</option>
                  <option value="medium">Medium Only</option>
                  <option value="tough">Tough Only</option>
                </select>
              </div>

              <button
                onClick={openCreateModal}
                className="btn-primary flex items-center gap-2 px-4 py-2.5 text-xs font-mono font-bold"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Question</span>
              </button>
            </div>

            {/* Questions List */}
            {loadingQuestions ? (
              <div className="py-16 text-center text-xs font-mono text-carbon-400">
                Loading questions...
              </div>
            ) : questions.length === 0 ? (
              <div className="py-12 text-center text-carbon-400 text-xs font-mono">
                No questions found.
              </div>
            ) : (
              <div className="space-y-3">
                {questions.map((q, idx) => (
                  <div
                    key={q.id}
                    className={`titanium-card p-4 border transition-all ${
                      q.is_active ? 'border-white/10' : 'border-red-500/20 opacity-60'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2 text-[11px] font-mono">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                              q.difficulty === 'easy'
                                ? 'bg-lime-400/20 text-lime-300 border border-lime-400/30'
                                : q.difficulty === 'medium'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                : 'bg-ember-500/20 text-ember-300 border border-ember-500/30'
                            }`}
                          >
                            {q.difficulty}
                          </span>
                          <span className="text-carbon-600">•</span>
                          <span className="text-carbon-400">{q.category}</span>
                          {!q.is_active && (
                            <span className="text-red-400 font-bold">[INACTIVE]</span>
                          )}
                        </div>

                        <h4 className="text-sm font-semibold text-white">
                          <span className="text-carbon-500 font-mono mr-2">#{idx + 1}</span>
                          {q.text}
                        </h4>

                        {/* Options preview */}
                        <div className="grid grid-cols-2 gap-1.5 pt-1 text-xs font-mono text-carbon-400">
                          {q.options.map((opt: string, optI: number) => (
                            <div
                              key={optI}
                              className={`p-1.5 px-2.5 rounded-lg border text-[11px] ${
                                opt === q.correct_answer
                                  ? 'bg-lime-400/10 border-lime-400/40 text-lime-300 font-semibold'
                                  : 'bg-carbon-900 border-white/5'
                              }`}
                            >
                              <span className="text-carbon-500 mr-1.5">
                                {['A', 'B', 'C', 'D'][optI]})
                              </span>
                              {opt}
                            </div>
                          ))}
                        </div>

                        <div className="text-[11px] font-mono text-carbon-400 pt-1">
                          Explanation: {q.explanation}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleToggleActive(q)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-mono ${
                            q.is_active
                              ? 'bg-lime-400/10 text-lime-400 border border-lime-400/30'
                              : 'bg-red-500/10 text-red-400 border border-red-500/30'
                          }`}
                        >
                          {q.is_active ? 'Active' : 'Disabled'}
                        </button>

                        <button
                          onClick={() => openEditModal(q)}
                          className="p-1.5 rounded-lg bg-carbon-900 hover:bg-carbon-800 text-carbon-300 transition-colors"
                          title="Edit Question"
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleDelete(q.id)}
                          className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                          title="Delete Question"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── TAB 2: SETTINGS ── */}
        {activeTab === 'settings' && (
          <div className="titanium-card p-6 border border-white/10 space-y-4 max-w-xl">
            <h3 className="text-base font-bold text-white font-display">Event Configuration</h3>

            {configSuccess && (
              <div className="p-3 rounded-xl bg-lime-400/15 border border-lime-400/30 text-xs text-lime-300 flex items-center gap-2 font-mono">
                <CheckCircle className="w-4 h-4" />
                <span>Settings saved successfully.</span>
              </div>
            )}

            <form onSubmit={handleSaveConfig} className="space-y-4 font-mono text-xs">
              <div>
                <label className="block text-carbon-400 mb-1">Quiz Duration (Minutes)</label>
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={config.quiz_duration_minutes}
                  onChange={(e) =>
                    setConfig((prev) => ({ ...prev, quiz_duration_minutes: e.target.value }))
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-carbon-900 border border-white/10 text-white focus:outline-none focus:border-lime-400"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-carbon-400 mb-1">Easy Points</label>
                  <input
                    type="number"
                    value={config.points_easy}
                    onChange={(e) =>
                      setConfig((prev) => ({ ...prev, points_easy: e.target.value }))
                    }
                    className="w-full px-3 py-2 rounded-xl bg-carbon-900 border border-white/10 text-white focus:outline-none focus:border-lime-400"
                  />
                </div>
                <div>
                  <label className="block text-carbon-400 mb-1">Medium Points</label>
                  <input
                    type="number"
                    value={config.points_medium}
                    onChange={(e) =>
                      setConfig((prev) => ({ ...prev, points_medium: e.target.value }))
                    }
                    className="w-full px-3 py-2 rounded-xl bg-carbon-900 border border-white/10 text-white focus:outline-none focus:border-lime-400"
                  />
                </div>
                <div>
                  <label className="block text-carbon-400 mb-1">Tough Points</label>
                  <input
                    type="number"
                    value={config.points_tough}
                    onChange={(e) =>
                      setConfig((prev) => ({ ...prev, points_tough: e.target.value }))
                    }
                    className="w-full px-3 py-2 rounded-xl bg-carbon-900 border border-white/10 text-white focus:outline-none focus:border-lime-400"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-carbon-900 border border-white/10">
                <div>
                  <div className="font-semibold text-white">Require College Roll Number</div>
                  <div className="text-[11px] text-carbon-400">
                    Enforces roll number on registration screen
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={config.require_roll_number === 'true'}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      require_roll_number: e.target.checked ? 'true' : 'false',
                    }))
                  }
                  className="w-4 h-4 accent-lime-400"
                />
              </div>

              <button
                type="submit"
                className="btn-primary px-6 py-2.5 text-xs font-bold uppercase tracking-wider"
              >
                Save Settings
              </button>
            </form>
          </div>
        )}

        {/* ── TAB 3: DANGER ZONE ── */}
        {activeTab === 'danger' && (
          <div className="titanium-card p-6 border border-red-500/40 space-y-4 max-w-xl bg-red-950/20">
            <div className="flex items-center gap-2.5 text-red-400">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <h3 className="text-base font-bold font-display">Danger Zone: Reset Event Attempts</h3>
            </div>
            <p className="text-xs text-carbon-400 leading-relaxed font-mono">
              Purges all participant records and completed quiz attempts so you start with a clean leaderboard for the live event. The 50 questions in the question bank will remain intact.
            </p>

            {resetError && (
              <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-xs text-red-200 font-mono">
                {resetError}
              </div>
            )}

            {resetSuccess && (
              <div className="p-3 rounded-xl bg-lime-400/20 border border-lime-400/40 text-xs text-lime-300 font-mono">
                All event participants and attempts have been purged!
              </div>
            )}

            <form onSubmit={handleResetAttempts} className="space-y-3 font-mono text-xs">
              <div>
                <label className="block text-carbon-400 mb-1">
                  Type <strong className="text-red-400">RESET ARENA</strong> to confirm:
                </label>
                <input
                  type="text"
                  value={confirmPhrase}
                  onChange={(e) => setConfirmPhrase(e.target.value)}
                  placeholder="RESET ARENA"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-carbon-900 border border-red-500/40 text-white font-mono"
                />
              </div>

              <button
                type="submit"
                disabled={confirmPhrase !== 'RESET ARENA'}
                className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase transition-colors disabled:opacity-40"
              >
                Purge All Attempts
              </button>
            </form>
          </div>
        )}

        {/* ── MODAL: CREATE / EDIT QUESTION ── */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
            <div className="titanium-card w-full max-w-2xl p-6 border border-white/20 shadow-2xl my-8 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h3 className="text-base font-bold text-white font-display">
                  {editingId ? 'Edit Question' : 'Add New Question'}
                </h3>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-1 rounded-lg text-carbon-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveQuestion} className="space-y-4 font-mono text-xs">
                <div>
                  <label className="block text-carbon-400 mb-1">Question Statement</label>
                  <textarea
                    rows={2}
                    value={qText}
                    onChange={(e) => setQText(e.target.value)}
                    required
                    className="w-full p-2.5 rounded-xl bg-carbon-900 border border-white/10 text-white text-xs outline-none focus:border-lime-400 font-sans"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-carbon-400 mb-1">Difficulty</label>
                    <select
                      value={qDifficulty}
                      onChange={(e) => setQDifficulty(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl bg-carbon-900 border border-white/10 text-white text-xs"
                    >
                      <option value="easy">Easy (10 pts)</option>
                      <option value="medium">Medium (20 pts)</option>
                      <option value="tough">Tough (30 pts)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-carbon-400 mb-1">Category</label>
                    <input
                      type="text"
                      value={qCategory}
                      onChange={(e) => setQCategory(e.target.value)}
                      required
                      className="w-full p-2.5 rounded-xl bg-carbon-900 border border-white/10 text-white text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-carbon-400">4 Plausible Answer Options</label>
                  {qOptions.map((opt, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-5 text-center text-carbon-500">
                        {['A', 'B', 'C', 'D'][idx]}
                      </span>
                      <input
                        type="text"
                        value={opt}
                        onChange={(e) => {
                          const updated = [...qOptions];
                          updated[idx] = e.target.value;
                          setQOptions(updated);
                        }}
                        placeholder={`Option ${idx + 1}`}
                        required
                        className="flex-1 p-2 rounded-xl bg-carbon-900 border border-white/10 text-white text-xs font-mono"
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-carbon-400 mb-1">
                    Correct Answer (Must match one option)
                  </label>
                  <select
                    value={qCorrect}
                    onChange={(e) => setQCorrect(e.target.value)}
                    required
                    className="w-full p-2.5 rounded-xl bg-carbon-900 border border-white/10 text-white text-xs"
                  >
                    <option value="">Select correct option...</option>
                    {qOptions.filter(Boolean).map((opt, idx) => (
                      <option key={idx} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-carbon-400 mb-1">Explanation</label>
                  <textarea
                    rows={2}
                    value={qExplanation}
                    onChange={(e) => setQExplanation(e.target.value)}
                    required
                    className="w-full p-2.5 rounded-xl bg-carbon-900 border border-white/10 text-white text-xs outline-none focus:border-lime-400 font-sans"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="btn-secondary px-4 py-2 text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary px-5 py-2 text-xs font-bold"
                  >
                    Save Question
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
