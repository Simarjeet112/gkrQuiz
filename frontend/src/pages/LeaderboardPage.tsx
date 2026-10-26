import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Trophy, Crown, Medal, Clock, Search, RefreshCw, Play,
} from 'lucide-react';
import { api } from '../services/api';

interface LeaderboardEntry {
  rank: number;
  attempt_id: string;
  display_name: string;
  participant_code: string | null;
  total_score: number;
  time_taken_seconds: number;
  submitted_at: string;
  status: string;
}

const fmtTime = (s: number) => `${Math.floor(s / 60)}m ${s % 60}s`;

export const LeaderboardPage: React.FC = () => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [autoRefresh, setAutoRefresh] = useState(true);

  const fetchData = async (manual = false) => {
    if (manual) setRefreshing(true);
    try {
      const data = await api.getLeaderboard(100);
      setEntries(data || []);
    } catch {}
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    fetchData();
    if (!autoRefresh) return;
    const t = setInterval(fetchData, 5000);
    return () => clearInterval(t);
  }, [autoRefresh]);

  const filtered = entries.filter((e) =>
    e.display_name.toLowerCase().includes(search.toLowerCase()) ||
    (e.participant_code && e.participant_code.toLowerCase().includes(search.toLowerCase()))
  );
  const top3 = entries.slice(0, 3);

  return (
    <div className="relative min-h-[calc(100vh-4rem)] cyber-grid py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-arena-greenNeon uppercase tracking-widest mb-1">
              <span className="w-2 h-2 rounded-full bg-arena-greenNeon animate-pulse" />
              Live Rankings
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">ARENA LEADERBOARD</h1>
            <p className="text-xs text-slate-400 mt-1">
              Ranked by: Score → Time → Submission timestamp
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => setAutoRefresh(!autoRefresh)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono border transition-colors ${
                autoRefresh ? 'bg-emerald-500/10 text-arena-greenNeon border-emerald-500/30'
                : 'bg-arena-card text-slate-400 border-arena-border'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${autoRefresh ? 'bg-arena-greenNeon animate-pulse' : 'bg-slate-600'}`} />
              {autoRefresh ? 'Live: ON' : 'Live: OFF'}
            </button>

            <button onClick={() => fetchData(true)} disabled={refreshing}
              className="p-2 rounded-lg bg-arena-card border border-arena-border text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              title="Refresh"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin text-arena-violet' : ''}`} />
            </button>

            <Link to="/register"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-arena-greenNeon text-slate-950 font-bold text-xs shadow-glow-green hover:bg-emerald-400 transition-colors"
            >
              <Play className="w-3.5 h-3.5 fill-slate-950" /> Join
            </Link>
          </div>
        </div>

        {/* ── Top 3 Podium ── */}
        {top3.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 2nd */}
            {top3[1] && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="glass-panel rounded-3xl p-5 border border-slate-400/25 flex flex-col items-center text-center order-2 md:order-1"
              >
                <div className="w-12 h-12 rounded-2xl bg-slate-400/10 border border-slate-400/25 flex items-center justify-center text-slate-300 mb-3">
                  <Medal className="w-6 h-6" />
                </div>
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">2nd Place · Silver</div>
                <h3 className="text-lg font-extrabold text-white mt-1 truncate max-w-full">{top3[1].display_name}</h3>
                {top3[1].participant_code && <span className="text-[11px] font-mono text-slate-500">{top3[1].participant_code}</span>}
                <div className="mt-4 pt-3 border-t border-white/5 w-full flex justify-around font-mono text-xs">
                  <div><div className="text-slate-500 mb-0.5">Score</div><strong className="text-white text-lg">{top3[1].total_score}</strong><span className="text-slate-600">/90</span></div>
                  <div><div className="text-slate-500 mb-0.5">Time</div><span className="text-slate-300">{fmtTime(top3[1].time_taken_seconds)}</span></div>
                </div>
              </motion.div>
            )}

            {/* 1st */}
            {top3[0] && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                className="glass-panel-glow rounded-3xl p-6 border border-amber-400/40 flex flex-col items-center text-center order-1 md:order-2 bg-gradient-to-b from-amber-500/8 to-transparent shadow-glow-amber"
              >
                <div className="w-14 h-14 rounded-2xl bg-amber-400/15 border border-amber-400/35 flex items-center justify-center text-amber-300 mb-3 shadow-lg">
                  <Crown className="w-8 h-8" />
                </div>
                <div className="text-xs font-mono text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Crown className="w-3.5 h-3.5" /> Champion
                </div>
                <h3 className="text-xl font-extrabold text-white mt-1 truncate max-w-full">{top3[0].display_name}</h3>
                {top3[0].participant_code && <span className="text-xs font-mono text-slate-400">{top3[0].participant_code}</span>}
                <div className="mt-5 pt-3 border-t border-amber-400/15 w-full flex justify-around font-mono text-xs">
                  <div><div className="text-amber-300/60 mb-0.5">Score</div><strong className="text-amber-300 text-2xl">{top3[0].total_score}</strong><span className="text-amber-500/60">/90</span></div>
                  <div><div className="text-amber-300/60 mb-0.5">Time</div><span className="text-slate-200 font-semibold">{fmtTime(top3[0].time_taken_seconds)}</span></div>
                </div>
              </motion.div>
            )}

            {/* 3rd */}
            {top3[2] && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                className="glass-panel rounded-3xl p-5 border border-amber-700/20 flex flex-col items-center text-center order-3"
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-700/10 border border-amber-700/25 flex items-center justify-center text-amber-700 mb-3">
                  <Medal className="w-6 h-6" />
                </div>
                <div className="text-xs font-mono text-amber-700 uppercase tracking-wider">3rd Place · Bronze</div>
                <h3 className="text-lg font-extrabold text-white mt-1 truncate max-w-full">{top3[2].display_name}</h3>
                {top3[2].participant_code && <span className="text-[11px] font-mono text-slate-500">{top3[2].participant_code}</span>}
                <div className="mt-4 pt-3 border-t border-white/5 w-full flex justify-around font-mono text-xs">
                  <div><div className="text-slate-500 mb-0.5">Score</div><strong className="text-white text-lg">{top3[2].total_score}</strong><span className="text-slate-600">/90</span></div>
                  <div><div className="text-slate-500 mb-0.5">Time</div><span className="text-slate-300">{fmtTime(top3[2].time_taken_seconds)}</span></div>
                </div>
              </motion.div>
            )}
          </div>
        )}

        {/* ── Full Table ── */}
        <div className="glass-panel rounded-2xl border border-arena-border p-5 space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-3 justify-between">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#070B13] border border-arena-border text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-arena-violet"
              />
            </div>
            <span className="text-xs font-mono text-slate-500">{filtered.length} participants</span>
          </div>

          {loading ? (
            <div className="py-16 flex flex-col items-center gap-3 text-slate-500">
              <div className="w-8 h-8 border-2 border-arena-violet/30 border-t-arena-violet rounded-full animate-spin" />
              <span className="text-xs font-mono">Loading rankings...</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mx-auto text-slate-600">
                <Trophy className="w-6 h-6" />
              </div>
              <p className="text-sm text-slate-400">{search ? 'No participants match your search.' : 'No completed attempts yet.'}</p>
              {!search && (
                <Link to="/register" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-arena-violet text-white text-xs font-semibold hover:bg-arena-violetLight transition-colors">
                  Be the first to compete!
                </Link>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto -mx-1">
              <table className="w-full border-collapse text-left min-w-[500px]">
                <thead>
                  <tr className="border-b border-arena-border text-[11px] font-mono uppercase text-slate-500">
                    <th className="py-2.5 px-3">Rank</th>
                    <th className="py-2.5 px-3">Participant</th>
                    <th className="py-2.5 px-3 text-center">Score</th>
                    <th className="py-2.5 px-3 text-right">Time</th>
                    <th className="py-2.5 px-3 text-right hidden sm:table-cell">Submitted</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04] text-sm">
                  {filtered.map((item) => (
                    <tr key={item.attempt_id} className={`hover:bg-white/[0.02] transition-colors ${
                      item.rank === 1 ? 'bg-amber-500/[0.04]'
                      : item.rank === 2 ? 'bg-slate-300/[0.02]'
                      : item.rank === 3 ? 'bg-amber-700/[0.02]'
                      : ''
                    }`}>
                      <td className="py-3.5 px-3">
                        <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold font-mono ${
                          item.rank === 1 ? 'bg-amber-400 text-slate-900 shadow-glow-amber'
                          : item.rank === 2 ? 'bg-slate-300 text-slate-900'
                          : item.rank === 3 ? 'bg-amber-700 text-white'
                          : 'text-slate-500'
                        }`}>{item.rank}</span>
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-white font-sans">{item.display_name}</span>
                          {item.rank <= 3 && <Crown className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                        </div>
                        {item.participant_code && <div className="text-[11px] font-mono text-slate-500">{item.participant_code}</div>}
                      </td>
                      <td className="py-3.5 px-3 text-center">
                        <span className="font-bold text-arena-greenNeon text-base font-mono">{item.total_score}</span>
                        <span className="text-slate-600 text-xs">/90</span>
                      </td>
                      <td className="py-3.5 px-3 text-right text-slate-400 text-xs font-mono">
                        {fmtTime(item.time_taken_seconds)}
                      </td>
                      <td className="py-3.5 px-3 text-right text-slate-600 text-xs font-mono hidden sm:table-cell">
                        {new Date(item.submitted_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
