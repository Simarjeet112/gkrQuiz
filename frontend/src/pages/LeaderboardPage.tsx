import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Trophy, Crown, Medal, Search, RefreshCw, Play, ShieldAlert, Zap, Radio,
} from 'lucide-react';
import { api } from '../services/api';
import { soundEffects } from '../utils/soundEffects';
import { BitByte3D } from '../components/mascot/BitByte3D';

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
    if (manual) {
      soundEffects.playClick();
      setRefreshing(true);
    }
    try {
      const data = await api.getLeaderboard(100);
      setEntries(data || []);
    } catch (err) {
      console.error('Failed to load leaderboard', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
    if (!autoRefresh) return;
    const t = setInterval(fetchData, 5000);
    return () => clearInterval(t);
  }, [autoRefresh]);

  const toggleAutoRefresh = () => {
    soundEffects.playClick();
    setAutoRefresh((prev) => !prev);
  };

  const filtered = entries.filter((e) =>
    e.display_name.toLowerCase().includes(search.toLowerCase()) ||
    (e.participant_code && e.participant_code.toLowerCase().includes(search.toLowerCase()))
  );
  const top3 = entries.slice(0, 3);

  return (
    <div className="relative min-h-[calc(100vh-4.5rem)] bg-carbon-950 tech-grid py-10 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-lime-400 uppercase tracking-widest mb-1.5">
              <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
              GRANDMASTER TELEMETRY // FIDE ARENA STANDINGS
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-display text-white tracking-wider">
              ARENA LEADERBOARD
            </h1>
            <p className="text-xs font-mono text-carbon-400 mt-1 flex flex-wrap items-center gap-2">
              <span className="text-carbon-500">TIEBREAK PROTOCOL:</span>
              <span className="text-lime-400 font-bold">MAX SCORE [90]</span>
              <span className="text-carbon-600">→</span>
              <span className="text-ember-400 font-bold">RAPID CLOCK [ASC]</span>
              <span className="text-carbon-600">→</span>
              <span className="text-carbon-400">TIMESTAMP</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleAutoRefresh}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono border transition-all ${
                autoRefresh
                  ? 'bg-lime-400/10 text-lime-400 border-lime-400/30'
                  : 'bg-carbon-900 text-carbon-500 border-white/10'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${autoRefresh ? 'bg-lime-400 animate-pulse' : 'bg-carbon-600'}`} />
              {autoRefresh ? 'POLL: 5s' : 'POLL: PAUSED'}
            </button>

            <button
              onClick={() => fetchData(true)}
              disabled={refreshing}
              className="p-2.5 rounded-xl bg-carbon-900 border border-white/10 text-carbon-300 hover:text-lime-400 hover:border-lime-400/40 transition-colors"
              title="Force Refresh"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin text-lime-400' : ''}`} />
            </button>

            <Link
              to="/register"
              onClick={() => soundEffects.playClick()}
              className="btn-primary text-xs flex items-center gap-2 px-5 py-2.5"
            >
              <Play className="w-3.5 h-3.5 fill-carbon-950" />
              <span>Enter Arena</span>
            </Link>
          </div>
        </div>

        {/* ── BITBYTE 3D LEADERBOARD HOST ── */}
        <div className="titanium-card p-4 border border-white/10 bg-gradient-to-r from-carbon-900 via-carbon-900/90 to-carbon-950">
          <BitByte3D
            size="companion"
            mood="leaderboard"
            showSpeech={true}
          />
        </div>

        {/* ── Top 3 Podium (Only shown if real entries exist) ── */}
        {top3.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            {/* 2nd Place */}
            {top3[1] && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="titanium-card p-6 border border-slate-300/20 flex flex-col items-center text-center order-2 md:order-1 relative bg-gradient-to-b from-slate-300/10 via-carbon-900 to-carbon-950"
              >
                <div className="w-13 h-13 rounded-2xl bg-slate-300/10 border border-slate-300/30 flex items-center justify-center text-slate-200 mb-3 text-2xl">
                  ♞
                </div>
                <div className="text-[11px] font-mono text-slate-300 uppercase tracking-widest font-bold">
                  RANK #02 // INTERNATIONAL MASTER
                </div>
                <h3 className="text-xl font-bold font-display text-white mt-1 truncate max-w-full">
                  {top3[1].display_name}
                </h3>
                {top3[1].participant_code && (
                  <span className="text-xs font-mono text-carbon-400 mt-0.5">{top3[1].participant_code}</span>
                )}
                <div className="mt-5 pt-4 border-t border-white/10 w-full flex justify-around font-mono text-xs">
                  <div>
                    <div className="text-carbon-400 text-[10px] uppercase">SCORE</div>
                    <strong className="text-white text-xl font-display">{top3[1].total_score}</strong>
                    <span className="text-carbon-500 text-xs">/90</span>
                  </div>
                  <div>
                    <div className="text-carbon-400 text-[10px] uppercase">TIME</div>
                    <span className="text-slate-300 font-bold text-sm">{fmtTime(top3[1].time_taken_seconds)}</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 1st Place Champion */}
            {top3[0] && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="titanium-card p-7 border-2 border-amber-400/40 flex flex-col items-center text-center order-1 md:order-2 bg-gradient-to-b from-amber-500/15 via-carbon-900 to-carbon-950 relative"
              >
                <div className="absolute -top-3 px-3 py-1 bg-amber-400 text-carbon-950 font-black text-[10px] uppercase tracking-widest font-mono rounded-full flex items-center gap-1">
                  <span>♚</span> GRANDMASTER CHAMPION
                </div>
                <div className="w-16 h-16 rounded-2xl bg-amber-400/15 border border-amber-400/40 flex items-center justify-center text-amber-300 mb-3 text-3xl">
                  ♚
                </div>
                <div className="text-xs font-mono text-amber-400 uppercase tracking-widest font-bold flex items-center gap-1.5">
                  RANK #01 // GRANDMASTER
                </div>
                <h3 className="text-2xl font-black font-display text-white mt-1 truncate max-w-full">
                  {top3[0].display_name}
                </h3>
                {top3[0].participant_code && (
                  <span className="text-xs font-mono text-amber-300/80 mt-0.5">{top3[0].participant_code}</span>
                )}
                <div className="mt-6 pt-4 border-t border-amber-400/20 w-full flex justify-around font-mono text-xs">
                  <div>
                    <div className="text-amber-300/60 text-[10px] uppercase">SCORE</div>
                    <strong className="text-amber-300 text-2xl font-display">{top3[0].total_score}</strong>
                    <span className="text-amber-500/70 text-xs">/90</span>
                  </div>
                  <div>
                    <div className="text-amber-300/60 text-[10px] uppercase">TIME</div>
                    <span className="text-white font-bold text-base">{fmtTime(top3[0].time_taken_seconds)}</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 3rd Place */}
            {top3[2] && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="titanium-card p-6 border border-amber-800/30 flex flex-col items-center text-center order-3 relative bg-gradient-to-b from-amber-900/10 via-carbon-900 to-carbon-950"
              >
                <div className="w-13 h-13 rounded-2xl bg-amber-800/15 border border-amber-800/30 flex items-center justify-center text-amber-600 mb-3 text-2xl">
                  ♜
                </div>
                <div className="text-[11px] font-mono text-amber-600 uppercase tracking-widest font-bold">
                  RANK #03 // CANDIDATE MASTER
                </div>
                <h3 className="text-xl font-bold font-display text-white mt-1 truncate max-w-full">
                  {top3[2].display_name}
                </h3>
                {top3[2].participant_code && (
                  <span className="text-xs font-mono text-amber-600/80 mt-0.5">{top3[2].participant_code}</span>
                )}
                <div className="mt-5 pt-4 border-t border-white/10 w-full flex justify-around font-mono text-xs">
                  <div>
                    <div className="text-carbon-400 text-[10px] uppercase">SCORE</div>
                    <strong className="text-white text-xl font-display">{top3[2].total_score}</strong>
                    <span className="text-carbon-500 text-xs">/90</span>
                  </div>
                  <div>
                    <div className="text-carbon-400 text-[10px] uppercase">TIME</div>
                    <span className="text-amber-500 font-bold text-sm">{fmtTime(top3[2].time_taken_seconds)}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        )}

        {/* ── Table & Search Container ── */}
        <div className="titanium-card p-6 border border-white/10 space-y-5">
          <div className="flex flex-col sm:flex-row items-center gap-3 justify-between">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-carbon-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search challenger or roll no..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-carbon-900 border border-white/10 text-xs text-white placeholder:text-carbon-500 font-mono focus:outline-none focus:border-lime-400 transition-colors"
              />
            </div>
            <div className="text-xs font-mono text-carbon-400">
              <span className="text-lime-400 font-bold">{filtered.length}</span> CHALLENGERS RECORDED
            </div>
          </div>

          {loading ? (
            <div className="py-20 flex flex-col items-center gap-3 text-carbon-400">
              <div className="w-8 h-8 border-2 border-lime-400/20 border-t-lime-400 rounded-full animate-spin" />
              <span className="text-xs font-mono tracking-widest uppercase">FETCHING TELEMETRY...</span>
            </div>
          ) : filtered.length === 0 ? (
            /* Strict Empty State Requirement */
            <div className="py-20 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-carbon-500">
                <Trophy className="w-8 h-8 text-carbon-500" />
              </div>
              <div>
                <p className="text-base font-display font-bold text-slate-300">
                  {search ? 'No challengers match your search query.' : 'No challengers yet. Be the first to enter the arena.'}
                </p>
                <p className="text-xs font-mono text-carbon-500 mt-1">
                  {search ? 'Try clearing your search filter.' : 'Live scoreboard will populate instantly upon first completion.'}
                </p>
              </div>
              {!search && (
                <div className="pt-2">
                  <Link
                    to="/register"
                    onClick={() => soundEffects.playClick()}
                    className="btn-primary inline-flex items-center gap-2 px-6 py-3 text-xs"
                  >
                    <Play className="w-4 h-4 fill-carbon-950" />
                    <span>ENTER THE ARENA</span>
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto -mx-2 sm:mx-0">
              <table className="w-full border-collapse text-left min-w-[550px]">
                <thead>
                  <tr className="border-b border-white/10 text-[11px] font-mono uppercase text-carbon-400 tracking-wider">
                    <th className="py-3 px-4">RANK</th>
                    <th className="py-3 px-4">CHALLENGER</th>
                    <th className="py-3 px-4 text-center">SCORE</th>
                    <th className="py-3 px-4 text-right">TIME</th>
                    <th className="py-3 px-4 text-right hidden sm:table-cell">SUBMITTED</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm font-mono">
                  {filtered.map((item) => (
                    <tr
                      key={item.attempt_id}
                      className={`hover:bg-white/[0.03] transition-colors ${
                        item.rank === 1
                          ? 'bg-amber-400/[0.04]'
                          : item.rank === 2
                          ? 'bg-slate-300/[0.03]'
                          : item.rank === 3
                          ? 'bg-amber-700/[0.03]'
                          : ''
                      }`}
                    >
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-xs font-bold font-mono ${
                            item.rank === 1
                              ? 'bg-amber-400 text-carbon-950 font-black'
                              : item.rank === 2
                              ? 'bg-slate-300 text-carbon-950 font-black'
                              : item.rank === 3
                              ? 'bg-amber-700 text-white font-black'
                              : 'text-carbon-400 bg-white/5 border border-white/5'
                          }`}
                        >
                          {item.rank}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white font-sans text-base">{item.display_name}</span>
                          {item.rank <= 3 && <Crown className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                        </div>
                        {item.participant_code && (
                          <div className="text-[11px] text-carbon-400">{item.participant_code}</div>
                        )}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="font-extrabold text-lime-400 text-lg font-mono">
                          {item.total_score}
                        </span>
                        <span className="text-carbon-500 text-xs"> /90</span>
                      </td>
                      <td className="py-4 px-4 text-right text-carbon-300 text-xs">
                        {fmtTime(item.time_taken_seconds)}
                      </td>
                      <td className="py-4 px-4 text-right text-carbon-500 text-xs hidden sm:table-cell">
                        {new Date(item.submitted_at).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                        })}
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
