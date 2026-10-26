import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Trophy,
  Crown,
  Medal,
  Clock,
  Search,
  RefreshCw,
  Play,
  Award,
  Terminal,
  ShieldAlert,
} from 'lucide-react';
import { api } from '../services/api';

interface LeaderboardEntry {
  rank: number;
  attempt_id: string;
  participant_id: string;
  display_name: string;
  participant_code: string | null;
  total_score: number;
  time_taken_seconds: number;
  submitted_at: string;
  status: string;
}

export const LeaderboardPage: React.FC = () => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [autoRefresh, setAutoRefresh] = useState(true);

  const fetchLeaderboard = async (isManual = false) => {
    if (isManual) setRefreshing(true);
    try {
      const data = await api.getLeaderboard(100);
      setEntries(data || []);
    } catch (err) {
      console.error('Failed to load leaderboard:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();

    // Auto-refresh polling every 5 seconds if enabled
    let interval: any = null;
    if (autoRefresh) {
      interval = setInterval(() => {
        fetchLeaderboard();
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [autoRefresh]);

  const filtered = entries.filter((e) =>
    e.display_name.toLowerCase().includes(search.toLowerCase()) ||
    (e.participant_code && e.participant_code.toLowerCase().includes(search.toLowerCase()))
  );

  const top3 = entries.slice(0, 3);
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s}s`;
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] cyber-grid py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-arena-border">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-arena-greenNeon uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-arena-greenNeon animate-pulse" />
              LIVE HALL OF FAME
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
              ARENA LEADERBOARD
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Tie-breaker priority: 1) Highest Score 2) Shortest Time 3) Earliest Submission.
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono border transition-colors ${
                autoRefresh
                  ? 'bg-emerald-500/10 text-arena-greenNeon border-emerald-500/30'
                  : 'bg-arena-card text-slate-400 border-arena-border'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${autoRefresh ? 'bg-arena-greenNeon animate-pulse' : 'bg-slate-600'}`} />
              <span>{autoRefresh ? 'Live Polling: ON' : 'Live Polling: OFF'}</span>
            </button>

            <button
              onClick={() => fetchLeaderboard(true)}
              disabled={refreshing}
              className="p-2 rounded-lg bg-arena-card border border-arena-border text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
              title="Refresh Leaderboard"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin text-arena-violet' : ''}`} />
            </button>

            <Link
              to="/register"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-arena-greenNeon text-slate-950 font-bold text-xs shadow-glow-green hover:bg-emerald-400 transition-colors"
            >
              <Play className="w-3.5 h-3.5 fill-slate-950" />
              <span>Join Arena</span>
            </Link>
          </div>
        </div>

        {/* Top 3 Podium (rendered when there are entries) */}
        {top3.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {/* 2nd Place */}
            {top3[1] && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel rounded-3xl p-5 border border-slate-400/30 flex flex-col items-center text-center relative order-2 md:order-1"
              >
                <div className="w-12 h-12 rounded-2xl bg-slate-300/10 border border-slate-300/30 flex items-center justify-center text-slate-300 mb-3 shadow-md">
                  <Medal className="w-6 h-6" />
                </div>
                <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
                  RANK #2 // SILVER
                </div>
                <h3 className="text-lg font-extrabold text-white mt-1 truncate max-w-full">
                  {top3[1].display_name}
                </h3>
                {top3[1].participant_code && (
                  <span className="text-[11px] font-mono text-slate-500">{top3[1].participant_code}</span>
                )}
                <div className="mt-4 pt-3 border-t border-white/5 w-full flex items-center justify-around font-mono text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 block">SCORE</span>
                    <strong className="text-white text-base">{top3[1].total_score}</strong>/90
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">TIME</span>
                    <span className="text-slate-300">{formatTime(top3[1].time_taken_seconds)}</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 1st Place - Gold Champion */}
            {top3[0] && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel-glow rounded-3xl p-6 border border-amber-400/50 flex flex-col items-center text-center relative order-1 md:order-2 shadow-glow-amber bg-gradient-to-b from-amber-500/10 to-transparent"
              >
                <div className="w-14 h-14 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300 mb-3 shadow-lg">
                  <Crown className="w-8 h-8" />
                </div>
                <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Crown className="w-3.5 h-3.5" />
                  <span>RANK #1 // CHAMPION</span>
                </div>
                <h3 className="text-xl font-extrabold text-white mt-1 truncate max-w-full">
                  {top3[0].display_name}
                </h3>
                {top3[0].participant_code && (
                  <span className="text-xs font-mono text-slate-400">{top3[0].participant_code}</span>
                )}
                <div className="mt-5 pt-3 border-t border-amber-400/20 w-full flex items-center justify-around font-mono text-xs">
                  <div>
                    <span className="text-[10px] text-amber-300/80 block">SCORE</span>
                    <strong className="text-amber-300 text-xl">{top3[0].total_score}</strong>/90
                  </div>
                  <div>
                    <span className="text-[10px] text-amber-300/80 block">TIME</span>
                    <span className="text-slate-200 text-sm font-semibold">{formatTime(top3[0].time_taken_seconds)}</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 3rd Place */}
            {top3[2] && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel rounded-3xl p-5 border border-amber-700/30 flex flex-col items-center text-center relative order-3"
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-700/15 border border-amber-700/30 flex items-center justify-center text-amber-600 mb-3 shadow-md">
                  <Medal className="w-6 h-6" />
                </div>
                <div className="text-xs font-mono font-bold text-amber-600 uppercase tracking-widest">
                  RANK #3 // BRONZE
                </div>
                <h3 className="text-lg font-extrabold text-white mt-1 truncate max-w-full">
                  {top3[2].display_name}
                </h3>
                {top3[2].participant_code && (
                  <span className="text-[11px] font-mono text-slate-500">{top3[2].participant_code}</span>
                )}
                <div className="mt-4 pt-3 border-t border-white/5 w-full flex items-center justify-around font-mono text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 block">SCORE</span>
                    <strong className="text-white text-base">{top3[2].total_score}</strong>/90
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">TIME</span>
                    <span className="text-slate-300">{formatTime(top3[2].time_taken_seconds)}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        )}

        {/* Search Filter & Table */}
        <div className="glass-panel rounded-3xl p-6 border border-arena-border space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search participant name..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#070B13] border border-arena-border text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-arena-violet"
              />
            </div>
            <div className="text-xs font-mono text-slate-400">
              Showing {filtered.length} of {entries.length} participant records
            </div>
          </div>

          {/* Table */}
          {loading ? (
            <div className="py-16 text-center text-xs font-mono text-slate-400">
              <div className="w-8 h-8 border-2 border-arena-violet border-t-white rounded-full animate-spin mx-auto mb-3" />
              Loading real-time ranks...
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-16 text-center text-slate-400 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mx-auto text-slate-500">
                <Trophy className="w-6 h-6" />
              </div>
              <p className="text-sm">No quiz attempts found yet.</p>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-arena-violet text-white text-xs font-semibold hover:bg-arena-violetLight"
              >
                Be the first to compete!
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-arena-border text-[11px] font-mono uppercase text-slate-400">
                    <th className="py-3 px-4">Rank</th>
                    <th className="py-3 px-4">Challenger</th>
                    <th className="py-3 px-4 text-center">Score</th>
                    <th className="py-3 px-4 text-right">Time Taken</th>
                    <th className="py-3 px-4 text-right">Submitted</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm font-mono">
                  {filtered.map((item) => {
                    const isPodium = item.rank <= 3;
                    return (
                      <tr
                        key={item.attempt_id}
                        className={`hover:bg-white/[0.02] transition-colors ${
                          item.rank === 1
                            ? 'bg-amber-500/[0.04]'
                            : item.rank === 2
                            ? 'bg-slate-300/[0.02]'
                            : item.rank === 3
                            ? 'bg-amber-700/[0.02]'
                            : ''
                        }`}
                      >
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold ${
                              item.rank === 1
                                ? 'bg-amber-400 text-slate-950 shadow-glow-amber'
                                : item.rank === 2
                                ? 'bg-slate-300 text-slate-950'
                                : item.rank === 3
                                ? 'bg-amber-700 text-white'
                                : 'text-slate-400'
                            }`}
                          >
                            {item.rank}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-sans">
                          <div className="font-bold text-white flex items-center gap-2">
                            <span>{item.display_name}</span>
                            {isPodium && (
                              <Crown className="w-3.5 h-3.5 text-amber-400 inline shrink-0" />
                            )}
                          </div>
                          {item.participant_code && (
                            <div className="text-[11px] font-mono text-slate-500">
                              {item.participant_code}
                            </div>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span className="font-bold text-arena-greenNeon text-base">
                            {item.total_score}
                          </span>
                          <span className="text-slate-500 text-xs">/90</span>
                        </td>
                        <td className="py-3.5 px-4 text-right text-slate-300 text-xs">
                          {formatTime(item.time_taken_seconds)}
                        </td>
                        <td className="py-3.5 px-4 text-right text-slate-500 text-xs">
                          {new Date(item.submitted_at).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                          })}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
