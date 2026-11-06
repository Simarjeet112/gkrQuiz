import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export interface FifaCardProps {
  playerName: string;
  score: number;
  maxScore: number;
  timeTakenSeconds: number;
  totalQuestions: number;
  track?: string;
  rank?: number;
  aiCardTitle?: string;
}

export interface CardCharacter {
  id: string;
  name: string;
  role: string;
  position: string;
  club: string;
  nationFlag: string;
  clubEmoji: string;
  image: string;
  tag: string;
  badgeSubtitle: string;
  borderClass: string;
  bgGlow: string;
}

export const CHARACTER_ROSTER: CardCharacter[] = [
  {
    id: 'cr7-ucl',
    name: 'Cristiano Ronaldo',
    role: 'Real Madrid #7 // UCL King',
    position: 'ST',
    club: 'Real Madrid C.F.',
    nationFlag: '🇵🇹',
    clubEmoji: '👑 ⚽',
    image: '/ronaldo-ucl.jpg',
    tag: '#CR7UCL',
    badgeSubtitle: "BALLON D'OR EDITION",
    borderClass: 'border-amber-400',
    bgGlow: 'from-amber-500/20 to-yellow-600/10',
  },
  {
    id: 'hazard-snow',
    name: 'Eden Hazard',
    role: 'Chelsea #17 // Magician in Snow',
    position: 'LW',
    club: 'Chelsea FC Magician',
    nationFlag: '🇧🇪',
    clubEmoji: '💙 🪄',
    image: '/hazard-snow.jpg',
    tag: '#HAZARD17',
    badgeSubtitle: 'STAMFORD BRIDGE WIZARD',
    borderClass: 'border-blue-400',
    bgGlow: 'from-blue-500/20 to-cyan-600/10',
  },
  {
    id: 'kante-tank',
    name: "N'Golo Kanté",
    role: '70% Earth Covering Engine',
    position: 'CDM',
    club: 'Chelsea Midfield Engine',
    nationFlag: '🇫🇷',
    clubEmoji: '💥 🛡️',
    image: '/kante-explosion.jpg',
    tag: '#KANTE100',
    badgeSubtitle: '100% TANK ENGINE',
    borderClass: 'border-emerald-400',
    bgGlow: 'from-emerald-500/20 to-teal-600/10',
  },
  {
    id: 'cr7-ballondor',
    name: 'CR7 5x Ballon d’Or',
    role: 'The Only GOAT in History',
    position: 'CF',
    club: 'Real Madrid Galáctico',
    nationFlag: '🇵🇹',
    clubEmoji: '🏆 🐐',
    image: '/ronaldo-ballondor.jpg',
    tag: '#ONLYGOAT',
    badgeSubtitle: 'THE ONLY GOAT',
    borderClass: 'border-amber-300',
    bgGlow: 'from-amber-400/25 to-orange-500/10',
  },
  {
    id: 'jonas-traveler',
    name: 'Jonas Kahnwald',
    role: 'The Traveler // Yellow Jacket',
    position: 'TRAV',
    club: 'Sic Mundus Creatus Est',
    nationFlag: '🇩🇪',
    clubEmoji: '⏳ 🌀',
    image: '/jonas-yellow.jpg',
    tag: '#WINDEN2019',
    badgeSubtitle: 'SIC MUNDUS CREATUS EST',
    borderClass: 'border-yellow-400',
    bgGlow: 'from-yellow-500/20 to-emerald-600/10',
  },
  {
    id: 'dark-triquetra',
    name: 'The Origin Knot',
    role: 'Adam & Eva 33-Year Cycle',
    position: 'ORIG',
    club: 'Tannhaus Origin World',
    nationFlag: '♾️',
    clubEmoji: '☢️ ⏳',
    image: '/dark-triquetra.png',
    tag: '#TRIQUETRA',
    badgeSubtitle: 'TIME KNOT ARCHITECT',
    borderClass: 'border-teal-400',
    bgGlow: 'from-teal-500/20 to-emerald-900/20',
  },
];

export const FifaPlayerCard: React.FC<FifaCardProps> = ({
  playerName,
  score,
  maxScore,
  timeTakenSeconds,
  totalQuestions,
  track = 'football',
  rank = 1,
  aiCardTitle,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  const isFootball = track === 'ronaldo' || track === 'football' || track === 'legends';
  const isDark = track === 'dark' || track === 'winden';

  const accuracyPct = totalQuestions > 0 ? Math.round((score / Math.max(1, maxScore)) * 100) : 0;

  // Calculate authentic FUT OVR (75 - 99)
  const ovr = Math.min(99, Math.max(75, 75 + Math.round((accuracyPct / 100) * 24)));

  // Initial character selection
  const getDefaultCharIndex = () => {
    if (isDark) return 4; // Jonas
    if (accuracyPct >= 90) return 0; // CR7 UCL
    if (accuracyPct >= 75) return 1; // Hazard
    if (accuracyPct >= 50) return 2; // Kanté
    return 3; // CR7 Ballon d'Or
  };

  const [selectedCharIndex, setSelectedCharIndex] = useState(getDefaultCharIndex());
  const activeChar = CHARACTER_ROSTER[selectedCharIndex];

  // Calculate 6 FUT Stats
  const avgSecondsPerQ = totalQuestions > 0 ? timeTakenSeconds / totalQuestions : 30;
  const pac = Math.min(99, Math.max(70, Math.round(99 - Math.max(0, avgSecondsPerQ - 5) * 1.5)));
  const sho = Math.min(99, Math.max(68, Math.round(accuracyPct * 0.95 + 4)));
  const pas = Math.min(99, Math.max(72, Math.round(accuracyPct * 0.9 + 8)));
  const dri = Math.min(99, Math.max(74, Math.round(85 + (pac > 85 ? 10 : 0))));
  const def = Math.min(99, Math.max(70, Math.round(75 + (rank <= 3 ? 18 : 8))));
  const phy = Math.min(99, Math.max(75, Math.round(80 + (totalQuestions >= 20 ? 15 : 8))));

  const badgeSubtitle = aiCardTitle || activeChar.badgeSubtitle;
  const position = activeChar.position;

  // Client-side Canvas Card Generator for direct PNG export
  const handleDownloadCard = async () => {
    setDownloading(true);
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 640;
      canvas.height = 920;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Card Shield Background
      const grad = ctx.createLinearGradient(0, 0, 640, 920);
      if (activeChar.id.startsWith('jonas') || activeChar.id.startsWith('dark')) {
        grad.addColorStop(0, '#0a2a1f');
        grad.addColorStop(0.5, '#041c14');
        grad.addColorStop(1, '#020b08');
      } else {
        grad.addColorStop(0, '#2e1c0c');
        grad.addColorStop(0.3, '#1a1007');
        grad.addColorStop(0.7, '#0f1712');
        grad.addColorStop(1, '#052317');
      }

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 640, 920);

      // Gold Metallic Border
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 8;
      ctx.strokeRect(16, 16, 608, 888);

      ctx.strokeStyle = 'rgba(253, 248, 238, 0.4)';
      ctx.lineWidth = 2;
      ctx.strokeRect(26, 26, 588, 868);

      // Card Header Banner
      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 20px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(badgeSubtitle.toUpperCase(), 320, 70);

      // OVR Rating
      ctx.fillStyle = '#fdf8ee';
      ctx.font = 'bold 84px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`${ovr}`, 60, 160);

      // Position
      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 28px sans-serif';
      ctx.fillText(position, 65, 205);

      // Flag & Club
      ctx.font = '36px sans-serif';
      ctx.fillText(activeChar.nationFlag, 65, 255);
      ctx.font = '32px sans-serif';
      ctx.fillText(activeChar.clubEmoji, 65, 305);

      // Draw Hero Image onto canvas
      try {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = activeChar.image;
        await new Promise((resolve) => {
          img.onload = () => resolve(true);
          img.onerror = () => resolve(false);
        });

        ctx.save();
        ctx.beginPath();
        if (typeof (ctx as any).roundRect === 'function') {
          (ctx as any).roundRect(330, 100, 240, 240, 20);
        } else {
          ctx.rect(330, 100, 240, 240);
        }
        ctx.clip();
        ctx.drawImage(img, 330, 100, 240, 240);
        ctx.restore();

        // Image frame border
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 3;
        ctx.strokeRect(330, 100, 240, 240);
      } catch (e) {
        console.warn('Canvas image draw skipped', e);
      }

      // Player Name Banner
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(40, 490, 560, 60);
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.strokeRect(40, 490, 560, 60);

      ctx.fillStyle = '#fdf8ee';
      ctx.font = '900 34px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(playerName.toUpperCase(), 320, 532);

      // Stats Section
      const stats = [
        { label: 'PAC', val: pac },
        { label: 'SHO', val: sho },
        { label: 'PAS', val: pas },
        { label: 'DRI', val: dri },
        { label: 'DEF', val: def },
        { label: 'PHY', val: phy },
      ];

      ctx.textAlign = 'left';
      stats.forEach((st, idx) => {
        const col = idx < 3 ? 0 : 1;
        const row = idx % 3;
        const x = col === 0 ? 90 : 360;
        const y = 600 + row * 65;

        ctx.fillStyle = '#f59e0b';
        ctx.font = 'bold 38px sans-serif';
        ctx.fillText(`${st.val}`, x, y);

        ctx.fillStyle = '#fdf8ee';
        ctx.font = '22px sans-serif';
        ctx.fillText(st.label, x + 65, y - 2);
      });

      // Footer
      ctx.fillStyle = 'rgba(253, 248, 238, 0.6)';
      ctx.font = '16px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('CODE ARENA // ULTIMATE TEAM • VERIFIED ATTRIBUTE RATING', 320, 850);

      // Download trigger
      const link = document.createElement('a');
      link.download = `EA_FC_CARD_${playerName.replace(/\s+/g, '_')}_${activeChar.id}_${ovr}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Failed to export card:', err);
    } finally {
      setDownloading(false);
    }
  };

  const handleCopyShare = () => {
    const shareText = `🔥 My EA FC Ultimate Team Rating: ${ovr} OVR (${position})!\n👑 Character: ${activeChar.name} (${activeChar.role})\n⚽ Score: ${score}/${maxScore} (${accuracyPct}%)\n⚡ PAC ${pac} | SHO ${sho} | PAS ${pas} | DRI ${dri} | DEF ${def} | PHY ${phy}\n🏟️ Played at Code Arena`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto">
      {/* ── 6 CHARACTER SELECTOR DOCK ── */}
      <div className="w-full mb-6">
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-[11px] font-mono uppercase tracking-wider text-amber-300 font-bold flex items-center gap-1.5">
            <span>⚡</span>
            <span>CHOOSE YOUR LEGEND CARD AVATAR (6 CHARACTERS):</span>
          </span>
          <span className="text-[10px] font-mono text-warmCream/60">
            {activeChar.role}
          </span>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {CHARACTER_ROSTER.map((char, index) => {
            const isSelected = selectedCharIndex === index;
            return (
              <button
                key={char.id}
                onClick={() => setSelectedCharIndex(index)}
                className={`p-1.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 relative overflow-hidden ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-400 scale-105 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                    : 'bg-black/40 border-white/10 hover:border-white/30 hover:bg-black/60 opacity-80 hover:opacity-100'
                }`}
              >
                <div className="w-12 h-12 rounded-lg overflow-hidden border border-white/20 bg-black relative">
                  <img
                    src={char.image}
                    alt={char.name}
                    className="w-full h-full object-cover"
                  />
                  {isSelected && (
                    <div className="absolute inset-0 bg-amber-400/20 border border-amber-400" />
                  )}
                </div>
                <div className="text-[10px] font-bold text-warmCream truncate w-full">
                  {char.name.split(' ')[0]}
                </div>
                <div className="text-[8px] font-mono text-amber-400 font-bold">
                  {char.position}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── FIFA FUT CARD CONTAINER ── */}
      <div
        ref={cardRef}
        className="relative w-80 sm:w-96 rounded-3xl p-1 shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_25px_60px_-15px_rgba(245,158,11,0.4)]"
        style={{
          background: activeChar.id.startsWith('jonas') || activeChar.id.startsWith('dark')
            ? 'linear-gradient(135deg, #10b981 0%, #04261b 50%, #064e3b 100%)'
            : 'linear-gradient(135deg, #f59e0b 0%, #ea580c 25%, #04261b 70%, #064e3b 100%)',
        }}
      >
        {/* Inner Card Background */}
        <div
          className="relative rounded-[22px] overflow-hidden p-6 text-warmCream"
          style={{
            background: activeChar.id.startsWith('jonas') || activeChar.id.startsWith('dark')
              ? 'linear-gradient(180deg, #04261b 0%, #02140e 60%, #010a07 100%)'
              : 'linear-gradient(180deg, #1c140d 0%, #0d1e17 50%, #04261b 100%)',
          }}
        >
          {/* Holographic / Light Flare Top */}
          <div className="absolute -top-24 -right-24 w-60 h-60 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Special Card Rarity Header Banner */}
          <div className="relative z-10 flex items-center justify-between pb-3 border-b border-amber-500/30">
            <span className="text-[10px] tracking-[0.25em] font-black uppercase text-amber-400">
              {badgeSubtitle}
            </span>
            <span className="text-xs font-mono font-bold text-warmCream/80 flex items-center gap-1">
              <span>★★★★★</span>
            </span>
          </div>

          {/* Header Row: OVR & Details + Cutout Hero */}
          <div className="relative z-10 flex items-start justify-between mt-4">
            {/* Left Column: OVR, POS, Flag, Club */}
            <div className="flex flex-col items-start space-y-1">
              <div className="text-6xl font-black tracking-tighter text-warmCream leading-none drop-shadow-md">
                {ovr}
              </div>
              <div className="text-lg font-black tracking-wider text-amber-400 font-mono">
                {position}
              </div>
              <div className="text-2xl pt-1">{activeChar.nationFlag}</div>
              <div className="text-xl pt-0.5">{activeChar.clubEmoji}</div>
            </div>

            {/* Right Column: Hero Portrait */}
            <div className="relative w-44 h-44 -mr-2">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-amber-500/20 via-transparent to-emerald-400/20 blur-sm pointer-events-none" />
              <img
                src={activeChar.image}
                alt={activeChar.name}
                className="w-full h-full object-cover rounded-2xl border-2 border-amber-400/40 shadow-xl"
              />
              <div className="absolute bottom-1 right-1 bg-black/80 px-2 py-0.5 rounded text-[10px] font-bold text-amber-300 border border-amber-500/30">
                {activeChar.tag}
              </div>
            </div>
          </div>

          {/* Player Name Banner */}
          <div className="relative z-10 mt-5 mb-4 py-2 px-3 rounded-lg bg-black/60 border border-amber-500/40 backdrop-blur-md text-center shadow-inner">
            <div className="text-xl font-black uppercase tracking-wider text-warmCream drop-shadow">
              {playerName}
            </div>
            <div className="text-[10px] font-mono text-warmCream/70 tracking-widest uppercase">
              {activeChar.club}
            </div>
          </div>

          {/* Hexagonal / 6 FUT Attributes Matrix */}
          <div className="relative z-10 grid grid-cols-2 gap-x-6 gap-y-2 py-3 px-4 rounded-xl bg-black/40 border border-white/5 backdrop-blur-sm">
            <div className="flex items-baseline justify-between border-b border-white/10 pb-1">
              <span className="text-2xl font-black text-amber-400">{pac}</span>
              <span className="text-xs font-semibold text-warmCream/80 tracking-wider">PAC</span>
            </div>
            <div className="flex items-baseline justify-between border-b border-white/10 pb-1">
              <span className="text-2xl font-black text-amber-400">{dri}</span>
              <span className="text-xs font-semibold text-warmCream/80 tracking-wider">DRI</span>
            </div>

            <div className="flex items-baseline justify-between border-b border-white/10 pb-1">
              <span className="text-2xl font-black text-amber-400">{sho}</span>
              <span className="text-xs font-semibold text-warmCream/80 tracking-wider">SHO</span>
            </div>
            <div className="flex items-baseline justify-between border-b border-white/10 pb-1">
              <span className="text-2xl font-black text-amber-400">{def}</span>
              <span className="text-xs font-semibold text-warmCream/80 tracking-wider">DEF</span>
            </div>

            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-amber-400">{pas}</span>
              <span className="text-xs font-semibold text-warmCream/80 tracking-wider">PAS</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-amber-400">{phy}</span>
              <span className="text-xs font-semibold text-warmCream/80 tracking-wider">PHY</span>
            </div>
          </div>

          {/* Footer Ribbon */}
          <div className="relative z-10 mt-4 text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-300 font-mono font-medium">
              <span>🏆 Arena Rank #{rank}</span>
              <span>•</span>
              <span>{accuracyPct}% Accuracy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
        <button
          onClick={handleDownloadCard}
          disabled={downloading}
          className="btn-burnt-orange px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg hover:shadow-burntOrange/30 text-sm transition-all"
        >
          {downloading ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              <span>Generating PNG Card...</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download Official FUT Card</span>
            </>
          )}
        </button>

        <button
          onClick={handleCopyShare}
          className="px-5 py-2.5 rounded-xl font-bold bg-forestGreen/80 hover:bg-forestGreen text-warmCream border border-emerald-500/30 flex items-center gap-2 shadow-md hover:shadow-emerald-600/30 text-sm transition-all"
        >
          {copied ? (
            <>
              <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-emerald-300">Stats Copied to Clipboard!</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              <span>Share Card Rating</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
