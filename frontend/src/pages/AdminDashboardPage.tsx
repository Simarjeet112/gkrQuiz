import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Users,
  Trophy,
  HelpCircle,
  Settings,
  Download,
  Trash2,
  Edit,
  Plus,
  RefreshCw,
  LogOut,
  AlertTriangle,
  CheckCircle,
  Eye,
  X,
  FileSpreadsheet,
} from 'lucide-react';
import { api } from '../services/api';
import { CodeBlock } from '../components/ui/CodeBlock';

export const AdminDashboardPage: React.FC = () => {
  // Auth state
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('gkr_admin_token'));
  const [loginEmail, setLoginEmail] = useState('admin@geekroom.in');
  const [loginPassword, setLoginPassword] = useState('GeekroomAdmin2025!');
  const [authError, setAuthError] = useState<string | null>(null);
  const [loggingIn, setLoggingIn] = useState(false);

  // Active tab
  const [activeTab, setActiveTab] = useState<'metrics' | 'attempts' | 'questions' | 'config'>('metrics');

  // Metrics
  const [metrics, setMetrics] = useState<any>(null);

  // Attempts
  const [attempts, setAttempts] = useState<any[]>([]);
  const [attemptSearch, setAttemptSearch] = useState('');
  const [selectedAttemptDetail, setSelectedAttemptDetail] = useState<any | null>(null);

  // Questions
  const [questions, setQuestions] = useState<any[]>([]);
  const [filterDifficulty, setFilterDifficulty] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<any | null>(null);

  // Question Form
  const [qText, setQText] = useState('');
  const [qDifficulty, setQDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [qCategory, setQCategory] = useState('Fundamentals');
  const [qOptions, setQOptions] = useState(['', '', '', '']);
  const [qCorrect, setQCorrect] = useState('');
  const [qExplanation, setQExplanation] = useState('');
  const [qCode, setQCode] = useState('');

  // Event Config
  const [configs, setConfigs] = useState<Record<string, string>>({
    quiz_duration_minutes: '5',
    allow_multiple_attempts: 'false',
    require_roll_number: 'false',
    event_title: 'GEEKROOM // CODE ARENA',
  });
  const [configSuccess, setConfigSuccess] = useState(false);

  // Danger Zone Reset
  const [resetConfirmPhrase, setResetConfirmPhrase] = useState('');
  const [resetPassword, setResetPassword] = useState('');
  const [resetError, setResetError] = useState<string | null>(null);
  const [resetSuccess, setResetSuccess] = useState(false);

  // Initial load
  useEffect(() => {
    if (token) {
      loadAllAdminData();
    }
  }, [token]);

  const loadAllAdminData = async () => {
    try {
      const [m, atts, qs, cfg] = await Promise.all([
        api.adminGetMetrics(),
        api.adminGetAttempts(),
        api.adminGetQuestions(filterDifficulty, filterCategory),
        api.adminGetConfig(),
      ]);
      setMetrics(m);
      setAttempts(atts || []);
      setQuestions(qs || []);
      if (cfg) setConfigs(cfg);
    } catch (err: any) {
      console.error('Failed to load admin data:', err);
      if (err.message?.includes('Unauthorized')) {
        handleLogout();
      }
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setLoggingIn(true);
    try {
      const data = await api.adminLogin(loginEmail, loginPassword);
      localStorage.setItem('gkr_admin_token', data.token);
      setToken(data.token);
    } catch (err: any) {
      setAuthError(err.message || 'Login failed.');
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('gkr_admin_token');
    setToken(null);
  };

  const handleSaveQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        text: qText,
        difficulty: qDifficulty,
        category: qCategory,
        options: qOptions,
        correct_answer: qCorrect,
        explanation: qExplanation,
        code_snippet: qCode.trim() || null,
      };

      if (editingQuestion) {
        await api.adminUpdateQuestion(editingQuestion.id, payload);
      } else {
        await api.adminAddQuestion(payload);
      }

      setShowQuestionModal(false);
      setEditingQuestion(null);
      resetQuestionForm();
      const qs = await api.adminGetQuestions(filterDifficulty, filterCategory);
      setQuestions(qs || []);
    } catch (err: any) {
      alert(err.message || 'Failed to save question.');
    }
  };

  const resetQuestionForm = () => {
    setQText('');
    setQDifficulty('easy');
    setQCategory('Fundamentals');
    setQOptions(['', '', '', '']);
    setQCorrect('');
    setQExplanation('');
    setQCode('');
  };

  const openEditModal = (q: any) => {
    setEditingQuestion(q);
    setQText(q.text);
    setQDifficulty(q.difficulty);
    setQCategory(q.category);
    setQOptions(q.options);
    setQCorrect(q.correct_answer);
    setQExplanation(q.explanation);
    setQCode(q.code_snippet || '');
    setShowQuestionModal(true);
  };

  const handleToggleQuestionActive = async (q: any) => {
    try {
      await api.adminUpdateQuestion(q.id, { is_active: !q.is_active });
      const qs = await api.adminGetQuestions(filterDifficulty, filterCategory);
      setQuestions(qs || []);
    } catch (err: any) {
      alert(err.message || 'Failed to toggle status.');
    }
  };

  const handleDeleteQuestion = async (id: string) => {
    if (!confirm('Are you sure you want to delete this question?')) return;
    try {
      await api.adminDeleteQuestion(id);
      const qs = await api.adminGetQuestions(filterDifficulty, filterCategory);
      setQuestions(qs || []);
    } catch (err: any) {
      alert(err.message || 'Failed to delete question.');
    }
  };

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.adminUpdateConfig(configs);
      setConfigSuccess(true);
      setTimeout(() => setConfigSuccess(false), 3000);
    } catch (err: any) {
      alert(err.message || 'Failed to update configurations.');
    }
  };

  const handleResetArena = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetError(null);
    try {
      await api.adminResetData(resetPassword, resetConfirmPhrase);
      setResetSuccess(true);
      setResetConfirmPhrase('');
      setResetPassword('');
      loadAllAdminData();
      setTimeout(() => setResetSuccess(false), 4000);
    } catch (err: any) {
      setResetError(err.message || 'Reset failed.');
    }
  };

  const handleExportCSV = () => {
    window.open('/api/admin/export-csv?token=' + token, '_blank');
  };

  // If not logged in, render login screen
  if (!token) {
    return (
      <div className="min-h-[calc(100vh-4rem)] cyber-grid flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md glass-panel-glow rounded-3xl p-8 border border-arena-violet/30 shadow-2xl space-y-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-arena-violet/20 border border-arena-violet/30 flex items-center justify-center text-arena-violet">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-arena-greenNeon uppercase tracking-wider">
                ORGANIZER PORTAL
              </div>
              <h1 className="text-xl font-bold text-white">Administrator Access</h1>
            </div>
          </div>

          {authError && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">
                Admin Email or Username
              </label>
              <input
                type="text"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#070B13] border border-arena-border text-white text-xs outline-none focus:border-arena-violet"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">
                Admin Password
              </label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#070B13] border border-arena-border text-white text-xs outline-none focus:border-arena-violet"
              />
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] text-slate-400 font-mono">
              Default Event Admin: <br />
              <strong className="text-slate-200">admin@geekroom.in</strong> / <strong className="text-slate-200">GeekroomAdmin2025!</strong>
            </div>

            <button
              type="submit"
              disabled={loggingIn}
              className="w-full py-3 rounded-xl bg-arena-violet hover:bg-arena-violetLight text-white font-bold text-xs shadow-glow-violet transition-colors disabled:opacity-50"
            >
              {loggingIn ? 'Authenticating...' : 'Sign In to Organizer Panel'}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative min-h-[calc(100vh-4rem)] cyber-grid py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top Organizer Header */}
        <div className="glass-panel rounded-2xl p-4 sm:p-6 border border-arena-border flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-arena-violet/20 border border-arena-violet/40 flex items-center justify-center text-arena-violet">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-arena-greenNeon">
                GEEKROOM GTBIT // ORGANIZER PORTAL
              </div>
              <h1 className="text-xl font-bold text-white">Event Administration & Control</h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 font-medium transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-arena-greenNeon" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-xs text-red-300 font-medium transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-arena-border font-mono text-xs">
          {[
            { id: 'metrics', label: 'Overview Metrics', icon: Trophy },
            { id: 'attempts', label: 'Participants & Attempts', icon: Users },
            { id: 'questions', label: 'Question Bank', icon: HelpCircle },
            { id: 'config', label: 'Settings & Danger Zone', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all shrink-0 ${
                  isActive
                    ? 'bg-arena-violet text-white border-arena-violetLight shadow-glow-violet'
                    : 'bg-arena-card text-slate-400 border-arena-border hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Overview Metrics */}
        {activeTab === 'metrics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="glass-panel p-5 rounded-2xl border border-arena-border">
                <div className="text-xs font-mono text-slate-400">TOTAL PARTICIPANTS</div>
                <div className="text-3xl font-extrabold text-white mt-2 font-mono">
                  {metrics?.total_participants || 0}
                </div>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-arena-border">
                <div className="text-xs font-mono text-slate-400">COMPLETED ATTEMPTS</div>
                <div className="text-3xl font-extrabold text-arena-greenNeon mt-2 font-mono">
                  {metrics?.completed_attempts || 0}
                </div>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-arena-border">
                <div className="text-xs font-mono text-slate-400">AVERAGE SCORE</div>
                <div className="text-3xl font-extrabold text-arena-violetLight mt-2 font-mono">
                  {metrics?.average_score || 0} <span className="text-xs text-slate-500 font-normal">/90</span>
                </div>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-arena-border">
                <div className="text-xs font-mono text-slate-400">HIGHEST SCORE</div>
                <div className="text-3xl font-extrabold text-amber-400 mt-2 font-mono">
                  {metrics?.highest_score || 0} <span className="text-xs text-slate-500 font-normal">/90</span>
                </div>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-arena-border flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white">Download Event Report</h3>
                <p className="text-xs text-slate-400">
                  Export complete rankings, participant roll numbers, scores, and completion timestamps in CSV format.
                </p>
              </div>
              <button
                onClick={handleExportCSV}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-arena-greenNeon text-slate-950 font-bold text-xs shadow-glow-green hover:bg-emerald-400 transition-colors"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Export CSV Report</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Attempts & Participants */}
        {activeTab === 'attempts' && (
          <div className="glass-panel rounded-2xl p-6 border border-arena-border space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <input
                type="text"
                value={attemptSearch}
                onChange={(e) => setAttemptSearch(e.target.value)}
                placeholder="Search participant name or roll number..."
                className="w-full sm:w-80 px-3.5 py-2 rounded-xl bg-[#070B13] border border-arena-border text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-arena-violet"
              />
              <span className="text-xs font-mono text-slate-400">
                {attempts.length} Total Submissions Recorded
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs font-mono">
                <thead>
                  <tr className="border-b border-arena-border text-slate-400 uppercase">
                    <th className="py-2.5 px-3">Player</th>
                    <th className="py-2.5 px-3">Roll / ID</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-center">Score</th>
                    <th className="py-2.5 px-3 text-right">Time</th>
                    <th className="py-2.5 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {attempts
                    .filter(
                      (a) =>
                        a.display_name.toLowerCase().includes(attemptSearch.toLowerCase()) ||
                        (a.participant_code && a.participant_code.toLowerCase().includes(attemptSearch.toLowerCase()))
                    )
                    .map((a) => (
                      <tr key={a.id} className="hover:bg-white/[0.02]">
                        <td className="py-3 px-3 font-sans font-semibold text-white">
                          {a.display_name}
                        </td>
                        <td className="py-3 px-3 text-slate-400">{a.participant_code || '-'}</td>
                        <td className="py-3 px-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                              a.status === 'completed'
                                ? 'bg-emerald-500/20 text-arena-greenNeon'
                                : a.status === 'expired'
                                ? 'bg-amber-500/20 text-amber-400'
                                : 'bg-slate-700 text-slate-300'
                            }`}
                          >
                            {a.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center font-bold text-white text-sm">
                          {a.total_score}/90
                        </td>
                        <td className="py-3 px-3 text-right text-slate-300">
                          {a.time_taken_seconds ? `${a.time_taken_seconds}s` : '-'}
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={async () => {
                              try {
                                const det = await api.adminGetAttemptDetail(a.id);
                                setSelectedAttemptDetail(det);
                              } catch (err: any) {
                                alert(err.message || 'Failed to load details');
                              }
                            }}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300"
                            title="Inspect Attempt Answers"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Question Bank Manager */}
        {activeTab === 'questions' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <select
                  value={filterDifficulty}
                  onChange={(e) => {
                    setFilterDifficulty(e.target.value);
                    api.adminGetQuestions(e.target.value, filterCategory).then((q) => setQuestions(q || []));
                  }}
                  className="px-3 py-2 rounded-xl bg-arena-card border border-arena-border text-xs text-white"
                >
                  <option value="">All Difficulties</option>
                  <option value="easy">Easy (10 pts)</option>
                  <option value="medium">Medium (20 pts)</option>
                  <option value="hard">Hard (30 pts)</option>
                </select>

                <select
                  value={filterCategory}
                  onChange={(e) => {
                    setFilterCategory(e.target.value);
                    api.adminGetQuestions(filterDifficulty, e.target.value).then((q) => setQuestions(q || []));
                  }}
                  className="px-3 py-2 rounded-xl bg-arena-card border border-arena-border text-xs text-white"
                >
                  <option value="">All Categories</option>
                  <option value="Fundamentals">Fundamentals</option>
                  <option value="Data Structures">Data Structures</option>
                  <option value="Algorithms">Algorithms</option>
                  <option value="Debugging">Debugging</option>
                  <option value="Complexity">Complexity</option>
                  <option value="Logical Reasoning">Logical Reasoning</option>
                </select>
              </div>

              <button
                onClick={() => {
                  setEditingQuestion(null);
                  resetQuestionForm();
                  setShowQuestionModal(true);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-arena-violet hover:bg-arena-violetLight text-white font-bold text-xs shadow-glow-violet transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Question</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {questions.map((q) => (
                <div
                  key={q.id}
                  className={`glass-panel p-4 rounded-2xl border transition-all ${
                    q.is_active ? 'border-arena-border' : 'border-red-500/20 opacity-60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2 font-mono text-[11px]">
                        <span
                          className={`px-2 py-0.5 rounded uppercase font-bold ${
                            q.difficulty === 'easy'
                              ? 'bg-emerald-500/20 text-arena-greenNeon'
                              : q.difficulty === 'medium'
                              ? 'bg-amber-500/20 text-amber-400'
                              : 'bg-purple-500/20 text-purple-300'
                          }`}
                        >
                          {q.difficulty}
                        </span>
                        <span className="text-slate-400">•</span>
                        <span className="text-slate-400">{q.category}</span>
                        {!q.is_active && (
                          <span className="text-red-400 font-bold">[DISABLED]</span>
                        )}
                      </div>

                      <h4 className="text-sm font-semibold text-white">{q.text}</h4>

                      {q.code_snippet && (
                        <div className="max-w-xl mt-2">
                          <CodeBlock code={q.code_snippet} />
                        </div>
                      )}

                      <div className="text-xs font-mono text-emerald-400 pt-1">
                        Correct Answer: <strong className="text-white">{q.correct_answer}</strong>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleToggleQuestionActive(q)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium border ${
                          q.is_active
                            ? 'bg-emerald-500/10 text-arena-greenNeon border-emerald-500/30'
                            : 'bg-red-500/10 text-red-400 border-red-500/30'
                        }`}
                      >
                        {q.is_active ? 'Active' : 'Disabled'}
                      </button>

                      <button
                        onClick={() => openEditModal(q)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300"
                        title="Edit question"
                      >
                        <Edit className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDeleteQuestion(q.id)}
                        className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                        title="Delete question"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Config & Danger Zone */}
        {activeTab === 'config' && (
          <div className="space-y-8">
            {/* Event Settings */}
            <div className="glass-panel rounded-2xl p-6 border border-arena-border space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Settings className="w-4 h-4 text-arena-violet" />
                <span>Event Configuration</span>
              </h3>

              {configSuccess && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-arena-greenNeon flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Configuration saved successfully.</span>
                </div>
              )}

              <form onSubmit={handleSaveConfig} className="space-y-4 max-w-xl">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Quiz Duration (Minutes)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={configs.quiz_duration_minutes}
                    onChange={(e) =>
                      setConfigs((prev) => ({ ...prev, quiz_duration_minutes: e.target.value }))
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-[#070B13] border border-arena-border text-xs text-white"
                  />
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                  <div>
                    <div className="text-xs font-semibold text-white">Allow Multiple Attempts</div>
                    <div className="text-[11px] text-slate-400">
                      When disabled, each participant can only submit one attempt.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={configs.allow_multiple_attempts === 'true'}
                    onChange={(e) =>
                      setConfigs((prev) => ({
                        ...prev,
                        allow_multiple_attempts: e.target.checked ? 'true' : 'false',
                      }))
                    }
                    className="w-4 h-4 accent-arena-violet"
                  />
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                  <div>
                    <div className="text-xs font-semibold text-white">Require College Roll Number</div>
                    <div className="text-[11px] text-slate-400">
                      Enforces college roll number entry before quiz initiation.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={configs.require_roll_number === 'true'}
                    onChange={(e) =>
                      setConfigs((prev) => ({
                        ...prev,
                        require_roll_number: e.target.checked ? 'true' : 'false',
                      }))
                    }
                    className="w-4 h-4 accent-arena-violet"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-arena-violet hover:bg-arena-violetLight text-white font-bold text-xs shadow-glow-violet transition-colors"
                >
                  Save Settings
                </button>
              </form>
            </div>

            {/* Danger Zone: Reset Event Data */}
            <div className="glass-panel rounded-2xl p-6 border border-red-500/30 space-y-4">
              <h3 className="text-base font-bold text-red-400 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <span>Danger Zone: Reset Event Data</span>
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
                This will permanently purge all participants, attempts, and leaderboard scores.
                The question bank will remain intact. This action cannot be undone.
              </p>

              {resetError && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300">
                  {resetError}
                </div>
              )}

              {resetSuccess && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-arena-greenNeon">
                  All event attempts and participants reset successfully.
                </div>
              )}

              <form onSubmit={handleResetArena} className="space-y-3 max-w-md">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Type <strong className="text-red-400">RESET ARENA</strong> to confirm:
                  </label>
                  <input
                    type="text"
                    value={resetConfirmPhrase}
                    onChange={(e) => setResetConfirmPhrase(e.target.value)}
                    placeholder="RESET ARENA"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#070B13] border border-red-500/30 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Admin Password Confirmation:
                  </label>
                  <input
                    type="password"
                    value={resetPassword}
                    onChange={(e) => setResetPassword(e.target.value)}
                    placeholder="Admin password"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#070B13] border border-red-500/30 text-xs text-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={resetConfirmPhrase !== 'RESET ARENA' || !resetPassword}
                  className="px-6 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold text-xs transition-colors disabled:opacity-40"
                >
                  Permanently Reset Event Data
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Add/Edit Question */}
        {showQuestionModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <div className="w-full max-w-2xl glass-panel p-6 rounded-3xl border border-arena-border shadow-2xl my-8">
              <div className="flex items-center justify-between pb-4 border-b border-arena-border">
                <h3 className="text-base font-bold text-white">
                  {editingQuestion ? 'Edit Question' : 'Add New Question'}
                </h3>
                <button
                  onClick={() => setShowQuestionModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveQuestion} className="space-y-4 pt-4 text-xs font-mono">
                <div>
                  <label className="block text-slate-300 mb-1">Question Text</label>
                  <textarea
                    rows={2}
                    value={qText}
                    onChange={(e) => setQText(e.target.value)}
                    required
                    className="w-full p-2.5 rounded-xl bg-[#070B13] border border-arena-border text-white text-xs outline-none focus:border-arena-violet"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 mb-1">Difficulty</label>
                    <select
                      value={qDifficulty}
                      onChange={(e) => setQDifficulty(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl bg-[#070B13] border border-arena-border text-white text-xs"
                    >
                      <option value="easy">Easy (10 pts)</option>
                      <option value="medium">Medium (20 pts)</option>
                      <option value="hard">Hard (30 pts)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1">Category</label>
                    <input
                      type="text"
                      value={qCategory}
                      onChange={(e) => setQCategory(e.target.value)}
                      required
                      className="w-full p-2.5 rounded-xl bg-[#070B13] border border-arena-border text-white text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Code Snippet (Optional)</label>
                  <textarea
                    rows={4}
                    value={qCode}
                    onChange={(e) => setQCode(e.target.value)}
                    placeholder="#include <iostream>..."
                    className="w-full p-2.5 rounded-xl bg-[#070B13] border border-arena-border text-white text-xs outline-none font-mono"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-slate-300">4 Plausible Answer Options</label>
                  {qOptions.map((opt, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-5 text-center text-slate-500">{['A', 'B', 'C', 'D'][idx]}</span>
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
                        className="flex-1 p-2 rounded-xl bg-[#070B13] border border-arena-border text-white text-xs"
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Correct Answer (Must match exactly one option)</label>
                  <select
                    value={qCorrect}
                    onChange={(e) => setQCorrect(e.target.value)}
                    required
                    className="w-full p-2.5 rounded-xl bg-[#070B13] border border-arena-border text-white text-xs"
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
                  <label className="block text-slate-300 mb-1">Explanation</label>
                  <textarea
                    rows={2}
                    value={qExplanation}
                    onChange={(e) => setQExplanation(e.target.value)}
                    required
                    className="w-full p-2.5 rounded-xl bg-[#070B13] border border-arena-border text-white text-xs outline-none focus:border-arena-violet"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-arena-border">
                  <button
                    type="button"
                    onClick={() => setShowQuestionModal(false)}
                    className="px-4 py-2 rounded-xl border border-arena-border text-slate-300 hover:bg-white/5"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-arena-violet hover:bg-arena-violetLight text-white font-bold text-xs"
                  >
                    Save Question
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: View Participant Attempt Detail */}
        {selectedAttemptDetail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <div className="w-full max-w-3xl glass-panel p-6 rounded-3xl border border-arena-border shadow-2xl my-8 space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-arena-border">
                <div>
                  <h3 className="text-base font-bold text-white">
                    Attempt Audit: {selectedAttemptDetail.participant.display_name}
                  </h3>
                  <div className="text-xs font-mono text-slate-400">
                    Score: {selectedAttemptDetail.total_score}/90 • Time: {selectedAttemptDetail.time_taken_seconds}s
                  </div>
                </div>
                <button
                  onClick={() => setSelectedAttemptDetail(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
                {selectedAttemptDetail.questions.map((q: any, idx: number) => (
                  <div
                    key={q.id}
                    className={`p-4 rounded-xl border ${
                      q.is_correct ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-red-500/30 bg-red-500/5'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-mono mb-2">
                      <span className="font-bold text-white">Question {idx + 1} ({q.difficulty.toUpperCase()})</span>
                      <span className={q.is_correct ? 'text-arena-greenNeon font-bold' : 'text-red-400'}>
                        {q.points_awarded}/{q.max_points} PTS
                      </span>
                    </div>

                    <p className="text-xs text-slate-200 mb-2">{q.text}</p>

                    {q.code_snippet && (
                      <div className="mb-2">
                        <CodeBlock code={q.code_snippet} />
                      </div>
                    )}

                    <div className="text-xs font-mono space-y-1">
                      <div>
                        Selected: <span className="font-semibold text-white">{q.selected_answer || '(Unanswered)'}</span>
                      </div>
                      <div className="text-arena-greenNeon">
                        Correct: <span className="font-semibold">{q.correct_answer}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
