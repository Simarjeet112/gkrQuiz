import React, { useState, useRef } from 'react';
import { Download, Share2, Sparkles, Check } from 'lucide-react';

export interface DarkCharacter {
  name: string;
  role: string;
  ovr: number;
  position: string;
  era: string;
  imageUrl: string;
  tim: number; // Temporal Agility
  par: number; // Paradox IQ
  knt: number; // Knot Manipulation
  rad: number; // Cesium Resistance
  det: number; // Determination
  clu: number; // Clutch Across Cycles
  quote: string;
}

export const PRESET_DARK_CHARACTERS: DarkCharacter[] = [
  {
    name: 'JONAS KAHNWALD',
    role: 'The Traveler / Time Savior',
    ovr: 99,
    position: 'TS',
    era: '2019 • 2052',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=400&auto=format&fit=crop',
    tim: 98,
    par: 96,
    knt: 99,
    rad: 95,
    det: 99,
    clu: 97,
    quote: 'We are not free in what we do, because we are not free in what we desire.',
  },
  {
    name: 'MARTHA NIELSEN',
    role: 'Alt-World Savior / Eva',
    ovr: 97,
    position: 'EVA',
    era: '2019 • World 2',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
    tim: 96,
    par: 97,
    knt: 98,
    rad: 92,
    det: 97,
    clu: 96,
    quote: 'You and I are perfect for each other. Never believe anything else.',
  },
  {
    name: 'CLAUDIA TIEDEMANN',
    role: 'The White Devil / Knot Breaker',
    ovr: 99,
    position: 'WD',
    era: '1953 • 1986 • 2020',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop',
    tim: 99,
    par: 99,
    knt: 100,
    rad: 98,
    det: 99,
    clu: 99,
    quote: 'I have seen a world without you, Jonas, and without Martha. The Origin World.',
  },
  {
    name: 'ADAM (SIC MUNDUS)',
    role: 'Master of Sic Mundus',
    ovr: 98,
    position: 'SM',
    era: '1921 • 2020',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    tim: 97,
    par: 98,
    knt: 99,
    rad: 99,
    det: 98,
    clu: 95,
    quote: 'A person can do what he wills, but not will what he wills.',
  },
  {
    name: 'H.G. TANNHAUS',
    role: 'The Clockmaker / Origin Creator',
    ovr: 96,
    position: 'CM',
    era: '1953 • 1986',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
    tim: 94,
    par: 99,
    knt: 95,
    rad: 90,
    det: 96,
    clu: 98,
    quote: 'What we know is a drop. What we don\'t know is an ocean.',
  },
];

export const DarkFifaCard: React.FC = () => {
  const [selectedChar, setSelectedChar] = useState<DarkCharacter>(PRESET_DARK_CHARACTERS[0]);
  const [customMode, setCustomMode] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customRole, setCustomRole] = useState('Cave Passage Explorer');
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  const activeChar: DarkCharacter = customMode
    ? {
        name: customName.trim().toUpperCase() || 'WINDEN TRAVELER',
        role: customRole,
        ovr: 94,
        position: 'TR',
        era: '1986 • 2019',
        imageUrl: '/dark-triquetra.png',
        tim: 92,
        par: 95,
        knt: 91,
        rad: 94,
        det: 96,
        clu: 93,
        quote: 'The beginning is the end and the end is the beginning.',
      }
    : selectedChar;

  // Export card as PNG using HTML5 Canvas
  const handleDownloadCard = () => {
    setDownloading(true);
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 640;
      canvas.height = 920;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Deep Emerald & Obsidian Gradient
      const grad = ctx.createLinearGradient(0, 0, 640, 920);
      grad.addColorStop(0, '#062d22');
      grad.addColorStop(0.3, '#031913');
      grad.addColorStop(0.7, '#010a08');
      grad.addColorStop(1, '#000000');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 640, 920);

      // Emerald Metallic Double Border
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 6;
      ctx.strokeRect(16, 16, 608, 888);

      ctx.strokeStyle = 'rgba(253, 248, 238, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(26, 26, 588, 868);

      // Header Banner
      ctx.fillStyle = '#34d399';
      ctx.font = 'bold 20px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('SIC MUNDUS CREATUS EST • ULTIMATE TEAM', 320, 70);

      // OVR Rating
      ctx.fillStyle = '#fdf8ee';
      ctx.font = 'bold 88px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`${activeChar.ovr}`, 60, 165);

      // Position
      ctx.fillStyle = '#34d399';
      ctx.font = 'bold 28px sans-serif';
      ctx.fillText(activeChar.position, 65, 210);

      // Era
      ctx.fillStyle = 'rgba(253, 248, 238, 0.7)';
      ctx.font = '18px sans-serif';
      ctx.fillText('⏳ ' + activeChar.era, 65, 250);

      // Name Banner
      ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
      ctx.fillRect(40, 490, 560, 65);
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      ctx.strokeRect(40, 490, 560, 65);

      ctx.fillStyle = '#fdf8ee';
      ctx.font = '900 34px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(activeChar.name, 320, 534);

      ctx.fillStyle = '#34d399';
      ctx.font = '14px sans-serif';
      ctx.fillText(activeChar.role.toUpperCase(), 320, 560);

      // 6 Dark Attributes
      const stats = [
        { label: 'TIM', val: activeChar.tim },
        { label: 'PAR', val: activeChar.par },
        { label: 'KNT', val: activeChar.knt },
        { label: 'RAD', val: activeChar.rad },
        { label: 'DET', val: activeChar.det },
        { label: 'CLU', val: activeChar.clu },
      ];

      ctx.textAlign = 'left';
      stats.forEach((st, idx) => {
        const col = idx < 3 ? 0 : 1;
        const row = idx % 3;
        const x = col === 0 ? 90 : 360;
        const y = 620 + row * 65;

        ctx.fillStyle = '#34d399';
        ctx.font = 'bold 36px sans-serif';
        ctx.fillText(`${st.val}`, x, y);

        ctx.fillStyle = '#fdf8ee';
        ctx.font = '20px sans-serif';
        ctx.fillText(st.label, x + 65, y - 2);
      });

      // Bottom Footer
      ctx.fillStyle = 'rgba(253, 248, 238, 0.6)';
      ctx.font = '15px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('DER ANFANG IST DAS ENDE UND DAS ENDE IST DER ANFANG', 320, 850);

      // Trigger Download
      const link = document.createElement('a');
      link.download = `DARK_FUT_CARD_${activeChar.name.replace(/\s+/g, '_')}_${activeChar.ovr}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error(err);
    } finally {
      setDownloading(false);
    }
  };

  const handleCopyShare = () => {
    const text = `⏳ DARK FUT Rating: ${activeChar.name} (${activeChar.ovr} OVR // ${activeChar.position})\n🌀 Stats: TIM ${activeChar.tim} | PAR ${activeChar.par} | KNT ${activeChar.knt} | RAD ${activeChar.rad} | DET ${activeChar.det} | CLU ${activeChar.clu}\n"${activeChar.quote}"\nExplore the Winden Knot at Geekroom Arena!`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
      {/* ── Visual FUT Card ── */}
      <div className="relative w-80 sm:w-96 rounded-3xl p-1 shadow-2xl transition-all duration-500 hover:scale-[1.02] bg-gradient-to-br from-emerald-400 via-emerald-800 to-black shadow-[0_20px_50px_rgba(16,185,129,0.35)]">
        <div className="relative rounded-[22px] overflow-hidden p-6 text-warmCream bg-gradient-to-b from-[#06241a] via-[#02130e] to-black">
          {/* Triquetra Watermark in Background */}
          <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
            <img src="/dark-triquetra.png" alt="" className="w-72 h-72 object-contain" />
          </div>

          {/* Card Header */}
          <div className="relative z-10 flex items-center justify-between pb-3 border-b border-emerald-500/30">
            <span className="text-[10px] tracking-[0.25em] font-black uppercase text-emerald-400">
              SIC MUNDUS SPECIAL EDITION
            </span>
            <span className="text-xs font-mono font-bold text-emerald-300">
              ★★★★★
            </span>
          </div>

          {/* Header Row: OVR & Details + Portrait */}
          <div className="relative z-10 flex items-start justify-between mt-4">
            <div className="flex flex-col items-start space-y-1">
              <div className="text-6xl font-black tracking-tighter text-warmCream leading-none drop-shadow">
                {activeChar.ovr}
              </div>
              <div className="text-xl font-black text-emerald-400 font-mono">
                {activeChar.position}
              </div>
              <div className="text-xs font-mono text-warmCream/70 pt-1">
                ⏳ {activeChar.era}
              </div>
            </div>

            <div className="relative w-44 h-44 -mr-2">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-emerald-500/30 via-transparent to-cyan-400/20 blur-sm pointer-events-none" />
              <img
                src={activeChar.imageUrl}
                alt={activeChar.name}
                className="w-full h-full object-cover rounded-2xl border-2 border-emerald-400/50 shadow-xl"
              />
              <div className="absolute bottom-1 right-1 bg-black/80 px-2 py-0.5 rounded text-[10px] font-bold text-emerald-300 border border-emerald-500/30">
                #WINDEN
              </div>
            </div>
          </div>

          {/* Player Name Banner */}
          <div className="relative z-10 mt-5 mb-4 py-2.5 px-3 rounded-lg bg-black/70 border border-emerald-500/40 backdrop-blur-md text-center shadow-inner">
            <div className="text-xl font-black uppercase tracking-wider text-warmCream drop-shadow">
              {activeChar.name}
            </div>
            <div className="text-[10px] font-mono text-emerald-300 tracking-widest uppercase">
              {activeChar.role}
            </div>
          </div>

          {/* 6 Attributes Grid */}
          <div className="relative z-10 grid grid-cols-2 gap-x-6 gap-y-2 py-3 px-4 rounded-xl bg-black/50 border border-emerald-500/20 backdrop-blur-sm">
            <div className="flex items-baseline justify-between border-b border-white/10 pb-1">
              <span className="text-2xl font-black text-emerald-400">{activeChar.tim}</span>
              <span className="text-xs font-semibold text-warmCream/80 tracking-wider">TIM</span>
            </div>
            <div className="flex items-baseline justify-between border-b border-white/10 pb-1">
              <span className="text-2xl font-black text-emerald-400">{activeChar.rad}</span>
              <span className="text-xs font-semibold text-warmCream/80 tracking-wider">RAD</span>
            </div>

            <div className="flex items-baseline justify-between border-b border-white/10 pb-1">
              <span className="text-2xl font-black text-emerald-400">{activeChar.par}</span>
              <span className="text-xs font-semibold text-warmCream/80 tracking-wider">PAR</span>
            </div>
            <div className="flex items-baseline justify-between border-b border-white/10 pb-1">
              <span className="text-2xl font-black text-emerald-400">{activeChar.det}</span>
              <span className="text-xs font-semibold text-warmCream/80 tracking-wider">DET</span>
            </div>

            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-emerald-400">{activeChar.knt}</span>
              <span className="text-xs font-semibold text-warmCream/80 tracking-wider">KNT</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-emerald-400">{activeChar.clu}</span>
              <span className="text-xs font-semibold text-warmCream/80 tracking-wider">CLU</span>
            </div>
          </div>

          {/* Quote Footer */}
          <div className="relative z-10 mt-3 pt-3 border-t border-white/10 text-center text-[10px] text-warmCream/70 italic font-serif">
            "{activeChar.quote}"
          </div>
        </div>
      </div>

      {/* ── Character Select & Custom Card Controls ── */}
      <div className="max-w-md w-full space-y-4">
        <div className="p-5 rounded-2xl bg-black/60 border border-emerald-500/30 backdrop-blur-md">
          <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest mb-3">
            CHOOSE CANON TRAVELER CARD
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {PRESET_DARK_CHARACTERS.map((char) => (
              <button
                key={char.name}
                type="button"
                onClick={() => {
                  setSelectedChar(char);
                  setCustomMode(false);
                }}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  !customMode && selectedChar.name === char.name
                    ? 'bg-emerald-500/25 border-emerald-400 text-emerald-300 font-bold'
                    : 'bg-black/30 border-white/10 text-warmCream/70 hover:border-white/20'
                }`}
              >
                <div className="text-xs font-bold leading-tight">{char.name}</div>
                <div className="text-[10px] text-warmCream/60 font-mono">{char.position} • {char.ovr} OVR</div>
              </button>
            ))}
          </div>

          {/* Custom Traveler Creator Toggle */}
          <div className="mt-4 pt-3 border-t border-white/10">
            <button
              onClick={() => setCustomMode(!customMode)}
              className={`w-full py-2.5 px-3 rounded-xl border text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all ${
                customMode
                  ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                  : 'bg-white/5 border-white/10 text-warmCream/80 hover:bg-white/10'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{customMode ? 'Using Custom Mode' : 'Forge Custom Winden Persona Card'}</span>
            </button>

            {customMode && (
              <div className="mt-3 space-y-2 font-mono text-xs">
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="Your Name (e.g. Gurpreet Sodi)"
                  className="w-full px-3 py-2 rounded-lg bg-black/50 border border-emerald-500/30 text-warmCream focus:outline-none focus:border-emerald-400"
                />
                <input
                  type="text"
                  value={customRole}
                  onChange={(e) => setCustomRole(e.target.value)}
                  placeholder="Your Title (e.g. Quantum Physicist)"
                  className="w-full px-3 py-2 rounded-lg bg-black/50 border border-emerald-500/30 text-warmCream focus:outline-none focus:border-emerald-400"
                />
              </div>
            )}
          </div>
        </div>

        {/* Download & Share Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleDownloadCard}
            disabled={downloading}
            className="flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
          >
            {downloading ? (
              <span>Generating PNG...</span>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download Dark FUT Card</span>
              </>
            )}
          </button>

          <button
            onClick={handleCopyShare}
            className="py-3 px-4 rounded-xl bg-black/60 hover:bg-black border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                <span>Share Card</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
