import React from 'react';

export interface AIReportData {
  headline: string;
  oasisQuote: string;
  managerRating: number;
  managerPersona: string;
  tacticalSummary: string;
  strengths: string[];
  weaknesses: string[];
  fifaCardTitle: string;
  scoutVerdict: string;
}

interface AiScoutingReportProps {
  report: AIReportData | null;
  loading: boolean;
  onRefresh?: () => void;
}

export const AiScoutingReport: React.FC<AiScoutingReportProps> = ({ report, loading, onRefresh }) => {
  if (loading) {
    return (
      <div className="card-forest-cream p-6 rounded-2xl border border-emerald-500/30 text-center animate-pulse">
        <div className="inline-flex items-center gap-3 text-amber-400 font-mono font-bold text-sm">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          <span>Gemini 2.5 Flash Analyzing Match Performance & Oasis Vibe...</span>
        </div>
        <p className="text-xs text-warmCream/60 mt-2">
          Consulting Carlo Ancelotti tactical database and Winden chronological logs...
        </p>
      </div>
    );
  }

  if (!report) {
    return null;
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-charcoal/95 via-forestGreen/60 to-charcoal/90 border-2 border-amber-500/30 p-6 sm:p-8 shadow-2xl text-warmCream">
      {/* Decorative Oasis Vinyl Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Tag */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-[11px] font-black tracking-widest uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono">
            ⚡ AI SCOUTING REPORT • GEMINI 2.5 FLASH
          </span>
          <span className="text-xs text-warmCream/60 font-mono hidden sm:inline">
            Manager: {report.managerPersona}
          </span>
        </div>
        {onRefresh && (
          <button
            onClick={onRefresh}
            className="text-xs text-amber-400/80 hover:text-amber-300 underline font-mono"
          >
            Re-analyze
          </button>
        )}
      </div>

      {/* Oasis Lyric Banner */}
      <div className="my-5 p-4 rounded-xl bg-amber-500/10 border-l-4 border-amber-400">
        <p className="text-sm sm:text-base font-serif italic text-amber-200">
          {report.oasisQuote}
        </p>
      </div>

      {/* Headline & Manager Rating */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2 mb-6">
        <div>
          <h3 className="text-2xl sm:text-3xl font-black text-warmCream tracking-tight leading-snug">
            {report.headline}
          </h3>
          <p className="text-xs font-mono text-emerald-400 mt-1 uppercase tracking-wider">
            HONORARY TITLE: {report.fifaCardTitle}
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0 bg-black/40 px-5 py-3 rounded-2xl border border-white/10">
          <div className="text-right">
            <div className="text-[10px] uppercase font-mono tracking-widest text-warmCream/60">
              Tactical Rating
            </div>
            <div className="text-xs font-bold text-amber-400">First-Team Caliber</div>
          </div>
          <div className="text-4xl font-black text-amber-400 font-mono">
            {report.managerRating}
          </div>
        </div>
      </div>

      {/* Tactical Summary */}
      <div className="text-sm sm:text-base text-warmCream/90 leading-relaxed font-sans bg-black/20 p-4 rounded-xl border border-white/5 mb-6">
        {report.tacticalSummary}
      </div>

      {/* Strengths & Weaknesses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Strengths */}
        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/20">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            </svg>
            <span>Verified Strengths</span>
          </div>
          <ul className="space-y-1.5 text-xs text-warmCream/85">
            {report.strengths.map((str, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Areas to Polish */}
        <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/20">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>Scout Observations / Next Match Focus</span>
          </div>
          <ul className="space-y-1.5 text-xs text-warmCream/85">
            {report.weaknesses.map((wk, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-amber-400 font-bold">→</span>
                <span>{wk}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Scout Verdict */}
      <div className="pt-4 border-t border-white/10 flex items-center justify-between">
        <div className="text-xs text-warmCream/80 italic font-mono">
          <span className="font-bold text-amber-400">Chief Scout Verdict: </span>
          "{report.scoutVerdict}"
        </div>
      </div>
    </div>
  );
};
