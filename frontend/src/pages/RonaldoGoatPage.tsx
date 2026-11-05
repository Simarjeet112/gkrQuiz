import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/soundEffects';
import { wonderwallAudio } from '../utils/audioPlayer';
import { ChessBackground } from '../components/ui/ChessBackground';
import {
  Trophy,
  Flame,
  Zap,
  Target,
  Shield,
  Crown,
  TrendingUp,
  Award,
  ChevronRight,
  Play,
  Volume2,
  VolumeX,
  Sparkles,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Share2,
  ExternalLink,
} from 'lucide-react';

interface MetricComparison {
  category: string;
  cr7Value: string;
  messiValue: string;
  verdict: 'CR7 WIN' | 'TIED';
  detail: string;
}

const COMPARISON_METRICS: MetricComparison[] = [
  {
    category: 'All-Time Official Goals',
    cr7Value: '900+ Goals',
    messiValue: '840+ Goals',
    verdict: 'CR7 WIN',
    detail: 'Cristiano Ronaldo is the official all-time top goalscorer in the entire history of association football (FIFA verified).',
  },
  {
    category: 'UCL Knockout Stage Goals',
    cr7Value: '67 Goals',
    messiValue: '49 Goals',
    verdict: 'CR7 WIN',
    detail: 'Under the highest pressure in world football, Ronaldo scored 18 more knockout goals than Messi. He owns the Champions League.',
  },
  {
    category: 'Leagues Conquered (Top 5)',
    cr7Value: '3 Leagues (PL, La Liga, Serie A)',
    messiValue: '1 League (Dominated only La Liga)',
    verdict: 'CR7 WIN',
    detail: 'Ronaldo won Player of the Year, Golden Boot, and League Titles in England, Spain, and Italy. Messi spent 21 years in one custom Barcelona setup.',
  },
  {
    category: 'All-Time International Goals',
    cr7Value: '133+ Goals (World Record)',
    messiValue: '112 Goals',
    verdict: 'CR7 WIN',
    detail: 'Ronaldo holds the Guinness World Record for the most international goals in human history, doing it for Portugal.',
  },
  {
    category: 'Weak-Foot Mastery',
    cr7Value: '165+ Left-Foot Goals',
    messiValue: '105+ Right-Foot Goals',
    verdict: 'CR7 WIN',
    detail: 'Ronaldo has no weak foot. His left foot alone has scored more goals than most world-class strikers score with their main foot.',
  },
  {
    category: 'Aerial & Header Threat',
    cr7Value: '150+ Headed Goals (2.93m Leap)',
    messiValue: '26 Headed Goals',
    verdict: 'CR7 WIN',
    detail: 'Ronaldo has the highest vertical leap in football history (0.73s hangtime, beating NBA average). A total aerial monster.',
  },
  {
    category: 'Clutch Comeback Hat-Tricks',
    cr7Value: 'Wolfsburg, Bayern, Atletico 2x, Sweden, Spain',
    messiValue: 'Limited in high-pressure KO deficits',
    verdict: 'CR7 WIN',
    detail: 'Trailing 0-2? Ronaldo scored hat-tricks against Wolfsburg and Atletico Madrid (for Juventus) to overturn deficits single-handedly.',
  },
  {
    category: 'UCL Finals Scored In',
    cr7Value: '3 Different Finals (2008, 2014, 2017)',
    messiValue: '2 Finals (2009, 2011)',
    verdict: 'CR7 WIN',
    detail: 'Scored for two different clubs in Champions League finals, lifting 5 European Cups (including the historic Real Madrid 3-peat).',
  },
];

const CLUTCH_MOMENTS = [
  {
    year: '2018',
    title: 'The 2.38m Bicycle Kick vs Buffon',
    match: 'Real Madrid vs Juventus // Turin',
    description:
      'Ronaldo leaped 2.38 meters into the Turin sky, striking a technically flawless overhead bicycle kick past Gianluigi Buffon that stunned the entire Allianz Stadium into a standing ovation.',
    tag: 'ICONIC PERFECTION',
  },
  {
    year: '2019',
    title: '0-2 Overturn: The Atletico Madrid Hat-Trick',
    match: 'Juventus vs Atletico Madrid // Turin',
    description:
      'Down 0-2 from Madrid against Diego Simeone’s iron-clad defense, Ronaldo told his family he would score a hat-trick. He delivered with two thunderous headers and an 86th-minute ice-cold penalty.',
    tag: 'CLUTCH MONSTER',
  },
  {
    year: '2013',
    title: 'Solna Masterclass: Sweden vs Portugal Playoff',
    match: 'Portugal vs Sweden // World Cup Playoff',
    description:
      'With Zlatan Ibrahimovic scoring a brace for Sweden, Ronaldo took complete command with a second-half hat-trick of blistering counter-attacks, firing Portugal into the World Cup alone.',
    tag: 'NATIONAL SAVIOR',
  },
  {
    year: '2017',
    title: 'Back-to-Back UCL Knockout Hat-Tricks',
    match: 'Real Madrid vs Bayern Munich & Atletico',
    description:
      'Scored 5 goals over two legs against Manuel Neuer’s Bayern Munich, then followed it with a hat-trick against Atletico Madrid in the semi-final. 10 goals in QF, SF, and Final combined!',
    tag: 'UCL EMPEROR',
  },
  {
    year: '2012',
    title: 'Calma at the Camp Nou',
    match: 'Real Madrid vs Barcelona // La Liga Decider',
    description:
      'With the Camp Nou on fire, Ronaldo latched onto Ozil’s through-ball, rounded Valdes, buried the title-winning goal, and hit the legendary "Calma, Calma" celebration to silence 98,000 fans.',
    tag: 'CAMP NOU SILENCER',
  },
];

export const RonaldoGoatPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pillars' | 'matrix' | 'moments' | 'mentality'>('pillars');
  const [siuuuCount, setSiuuuCount] = useState(0);

  const handleSiuuuCelebration = () => {
    sounds.playSiuuu();
    setSiuuuCount((c) => c + 1);
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#EA580C', '#FEBE10', '#FFFBEB', '#065F46'],
    });
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-charcoal-950 text-slate-100 overflow-hidden font-sans selection:bg-burntOrange selection:text-white">
      {/* ── Matchday Football Stadium Background ── */}
      <ChessBackground />

      {/* ── Top Atmospheric Burnt Orange Ticker Tape ── */}
      <div className="w-full bg-gradient-to-r from-charcoal-950 via-burntOrange-900/60 to-charcoal-950 text-warmCream py-2.5 overflow-hidden font-mono text-xs border-y border-burntOrange/30 select-none shadow-lg">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8 font-black tracking-wider">
          <span className="text-burntOrange-light flex items-center gap-1.5">
            <span>👑</span> CRISTIANO RONALDO: 900+ OFFICIAL GOALS
          </span>
          <span className="text-forestGreen-light">•</span>
          <span className="text-warmCream flex items-center gap-1.5">
            <span>🏆</span> 5× CHAMPIONS LEAGUE TITLES // ALL-TIME UCL KING
          </span>
          <span className="text-forestGreen-light">•</span>
          <span className="text-burntOrange-light flex items-center gap-1.5">
            <span>⚽</span> CONQUERED ENGLAND, SPAIN & ITALY
          </span>
          <span className="text-forestGreen-light">•</span>
          <span className="text-warmCream flex items-center gap-1.5">
            <span>🇵🇹</span> 133+ INTERNATIONAL GOALS // GUINNESS WORLD RECORD
          </span>
          <span className="text-forestGreen-light">•</span>
          <span className="text-burntOrange-light flex items-center gap-1.5">
            <span>💥</span> 2.93M VERTICAL LEAP // ZERO WEAK FOOT
          </span>
          <span className="text-forestGreen-light">•</span>
          <span className="text-warmCream font-bold uppercase">
            WHY CR7 STANDS UNRIVALED IN HUMAN SPORTS HISTORY
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12 relative z-10">

        {/* ── HERO BANNER: Charcoal + Burnt Orange & Forest Green + Warm Cream ── */}
        <section className="relative rounded-3xl overflow-hidden card-charcoal-orange p-6 sm:p-12 border-2 border-burntOrange/40">
          {/* Subtle Ambient Radial Floodlights */}
          <div className="absolute -top-24 -right-24 w-[500px] h-[500px] bg-burntOrange/20 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-[500px] h-[500px] bg-forestGreen/30 rounded-full blur-[140px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forestGreen/40 border border-forestGreen-light/40 text-warmCream font-mono text-xs font-black tracking-wider uppercase shadow-md">
                <span className="w-2 h-2 rounded-full bg-burntOrange animate-pulse" />
                <span>THE DEFINITIVE ATHLETIC RESEARCH DOSSIER</span>
              </div>

              <div className="space-y-2">
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white font-display tracking-tight leading-[0.95]">
                  THE ONLY <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-burntOrange via-amber-300 to-warmCream">
                    UNDISPUTED G.O.A.T.
                  </span>
                </h1>
                <p className="text-lg sm:text-xl font-mono text-warmCream font-bold">
                  Cristiano Ronaldo dos Santos Aveiro
                </p>
              </div>

              <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed max-w-xl">
                History is written in moments where everything is on the line. While system-dependent players thrived inside comfortable home environments, Cristiano Ronaldo stepped onto foreign pitches across England, Spain, Italy, and international tournaments to conquer every defense in football history.
              </p>

              {/* Stat Highlights Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 font-mono text-xs">
                <div className="p-3 rounded-2xl bg-charcoal-900/90 border border-burntOrange/30 text-center">
                  <div className="text-2xl font-black text-burntOrange font-display">900+</div>
                  <div className="text-[10px] text-warmCream/70 mt-0.5 uppercase font-bold">ALL-TIME GOALS</div>
                </div>
                <div className="p-3 rounded-2xl bg-charcoal-900/90 border border-forestGreen-light/30 text-center">
                  <div className="text-2xl font-black text-forestGreen-light font-display">140</div>
                  <div className="text-[10px] text-warmCream/70 mt-0.5 uppercase font-bold">UCL GOALS (#1)</div>
                </div>
                <div className="p-3 rounded-2xl bg-charcoal-900/90 border border-burntOrange/30 text-center">
                  <div className="text-2xl font-black text-burntOrange-light font-display">67</div>
                  <div className="text-[10px] text-warmCream/70 mt-0.5 uppercase font-bold">UCL KO GOALS</div>
                </div>
                <div className="p-3 rounded-2xl bg-charcoal-900/90 border border-forestGreen-light/30 text-center">
                  <div className="text-2xl font-black text-warmCream font-display">133+</div>
                  <div className="text-[10px] text-warmCream/70 mt-0.5 uppercase font-bold">INTL RECORD</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <button
                  type="button"
                  onClick={handleSiuuuCelebration}
                  className="px-7 py-3.5 rounded-2xl btn-burntOrange text-sm flex items-center gap-2.5 active:scale-95"
                >
                  <span className="text-lg">⚽</span>
                  <span>TRIGGER SIUUUU! ({siuuuCount})</span>
                </button>

                <Link
                  to="/register"
                  className="px-6 py-3.5 rounded-2xl btn-forest-cream text-sm flex items-center gap-2"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>PLAY CR7 QUIZ TRACK</span>
                </Link>
              </div>
            </div>

            {/* Right Photo Display */}
            <div className="lg:col-span-5 relative group">
              <div className="relative rounded-3xl overflow-hidden border-2 border-burntOrange shadow-orange-glow transition-transform duration-500 group-hover:scale-[1.02]">
                <img
                  src="/ronaldo-ucl.jpg"
                  alt="Cristiano Ronaldo Real Madrid Champions League"
                  className="w-full h-[380px] sm:h-[460px] object-cover object-center filter contrast-110 brightness-105"
                />

                {/* Overlaid Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <div className="px-3 py-1 rounded-xl bg-black/85 border border-burntOrange text-burntOrange font-mono text-xs font-black flex items-center gap-1.5 shadow-xl">
                    <Trophy className="w-3.5 h-3.5" />
                    <span>5× BALLON D'OR</span>
                  </div>
                  <div className="px-3 py-1 rounded-xl bg-forestGreen/90 border border-warmCream text-warmCream font-mono text-[10px] font-black flex items-center gap-1 shadow-xl">
                    <span>👑</span>
                    <span>15× UCL RECORD WITH MADRID</span>
                  </div>
                </div>

                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/80 to-transparent p-6 text-center sm:text-left">
                  <div className="text-[11px] font-mono text-burntOrange font-black tracking-widest uppercase">
                    THE COMPLETE FOOTBALLING MACHINE
                  </div>
                  <div className="text-xl font-black text-white font-display mt-0.5">
                    "Your love makes me strong. Your hate makes me unstoppable."
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── INTERACTIVE TAB SELECTOR: Charcoal + Forest Green + Burnt Orange ── */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 p-1.5 rounded-2xl bg-charcoal-900 border border-charcoal-700 max-w-2xl mx-auto shadow-xl">
          <button
            onClick={() => setActiveTab('pillars')}
            className={`flex-1 min-w-[120px] py-2.5 px-4 rounded-xl font-mono text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
              activeTab === 'pillars'
                ? 'bg-burntOrange text-warmCream shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Crown className="w-3.5 h-3.5" />
            <span>4 Pillars</span>
          </button>

          <button
            onClick={() => setActiveTab('matrix')}
            className={`flex-1 min-w-[120px] py-2.5 px-4 rounded-xl font-mono text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
              activeTab === 'matrix'
                ? 'bg-forestGreen-pitch text-warmCream border border-warmCream/40 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            <span>CR7 vs Messi Matrix</span>
          </button>

          <button
            onClick={() => setActiveTab('moments')}
            className={`flex-1 min-w-[120px] py-2.5 px-4 rounded-xl font-mono text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
              activeTab === 'moments'
                ? 'bg-burntOrange text-warmCream shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Clutch Moments</span>
          </button>

          <button
            onClick={() => setActiveTab('mentality')}
            className={`flex-1 min-w-[120px] py-2.5 px-4 rounded-xl font-mono text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
              activeTab === 'mentality'
                ? 'bg-forestGreen-pitch text-warmCream border border-warmCream/40 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Mentality & Bio</span>
          </button>
        </div>

        {/* ── TAB 1: THE 4 PILLARS OF UNDISPUTED SUPREMACY ── */}
        {activeTab === 'pillars' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pillar 1 */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="card-charcoal-orange p-6 sm:p-8 rounded-3xl space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono px-3 py-1 rounded-lg bg-burntOrange/20 border border-burntOrange text-burntOrange-light font-black uppercase tracking-widest">
                    PILLAR 01 // MULTI-LEAGUE CONQUEROR
                  </span>
                  <Award className="w-5 h-5 text-burntOrange" />
                </div>
                <h3 className="text-2xl font-black text-white font-display">
                  Triumphing in 3 Unforgiving Leagues
                </h3>
                <p className="text-sm text-slate-300 font-sans leading-relaxed">
                  Messi spent 21 continuous years shielded by FC Barcelona's bespoke tiki-taka system, surrounded by Prime Xavi, Iniesta, and Busquets. When he finally went to PSG, he scored just 6 Ligue 1 goals in his first season.
                </p>
                <p className="text-sm text-warmCream font-mono font-semibold bg-charcoal-900/80 p-3 rounded-xl border border-white/5">
                  Contrast with Ronaldo: Won the Ballon d'Or, UCL, and Golden Boot at Manchester United in the physical Premier League, scored 450 goals in 438 matches at Real Madrid (1.03 per game!), and then claimed Serie A Footballer of the Year twice at Juventus under grueling Italian defensive blocks.
                </p>
              </div>
              <div className="pt-3 border-t border-burntOrange/20 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>PREMIER LEAGUE • LA LIGA • SERIE A</span>
                <span className="text-burntOrange font-black">3/3 CONQUERED</span>
              </div>
            </motion.div>

            {/* Pillar 2 */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card-forest-cream p-6 sm:p-8 rounded-3xl space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono px-3 py-1 rounded-lg bg-forestGreen/60 border border-forestGreen-light text-warmCream font-black uppercase tracking-widest">
                    PILLAR 02 // UEFA CHAMPIONS LEAGUE KING
                  </span>
                  <Trophy className="w-5 h-5 text-warmCream" />
                </div>
                <h3 className="text-2xl font-black text-white font-display">
                  67 Knockout Goals When Stakes Are Highest
                </h3>
                <p className="text-sm text-slate-300 font-sans leading-relaxed">
                  The UEFA Champions League is the pinnacle of club football. In the knockout rounds — Quarter-Finals, Semi-Finals, and Finals — where domestic farmers are eliminated, Ronaldo reigns supreme with 67 Knockout Goals (Messi has 49).
                </p>
                <p className="text-sm text-warmCream font-mono font-semibold bg-charcoal-900/80 p-3 rounded-xl border border-white/5">
                  He led Real Madrid to the modern era's only UCL 3-Peat (2016, 2017, 2018), holds the top 3 highest-scoring seasons in UCL history (17, 16, and 15 goals), and scored in 3 separate Champions League Finals.
                </p>
              </div>
              <div className="pt-3 border-t border-forestGreen-light/20 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>ALL-TIME UCL TOP SCORER</span>
                <span className="text-warmCream font-black">140 TOTAL GOALS</span>
              </div>
            </motion.div>

            {/* Pillar 3 */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card-forest-cream p-6 sm:p-8 rounded-3xl space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono px-3 py-1 rounded-lg bg-forestGreen/60 border border-forestGreen-light text-warmCream font-black uppercase tracking-widest">
                    PILLAR 03 // BUILDING A FOOTBALLING NATION
                  </span>
                  <Shield className="w-5 h-5 text-warmCream" />
                </div>
                <h3 className="text-2xl font-black text-white font-display">
                  Transforming Portugal from Zero to Champions
                </h3>
                <p className="text-sm text-slate-300 font-sans leading-relaxed">
                  Before Cristiano Ronaldo's senior debut in 2003, Portugal had won ZERO major trophies in its entire 100+ year existence. Argentina, on the other hand, had already won 2 World Cups and 14 Copa Americas before Messi ever set foot on a pitch.
                </p>
                <p className="text-sm text-warmCream font-mono font-semibold bg-charcoal-900/80 p-3 rounded-xl border border-white/5">
                  Ronaldo lifted UEFA Euro 2016 and the inaugural UEFA Nations League 2019, shattering the all-time international goal record with 133+ goals for his country.
                </p>
              </div>
              <div className="pt-3 border-t border-forestGreen-light/20 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>PORTUGAL ALL-TIME LEADER</span>
                <span className="text-warmCream font-black">EURO 2016 + NL 2019</span>
              </div>
            </motion.div>

            {/* Pillar 4 */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="card-charcoal-orange p-6 sm:p-8 rounded-3xl space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono px-3 py-1 rounded-lg bg-burntOrange/20 border border-burntOrange text-burntOrange-light font-black uppercase tracking-widest">
                    PILLAR 04 // BIOMECHANICAL PERFECTION
                  </span>
                  <Zap className="w-5 h-5 text-burntOrange" />
                </div>
                <h3 className="text-2xl font-black text-white font-display">
                  The Complete, Lethal Weapon
                </h3>
                <p className="text-sm text-slate-300 font-sans leading-relaxed">
                  Ronaldo has no blind spots. While defenders can force pure left-footers onto their weaker side, Ronaldo has scored over 165+ goals with his "weak" left foot and over 150+ bullet headers in open play.
                </p>
                <p className="text-sm text-warmCream font-mono font-semibold bg-charcoal-900/80 p-3 rounded-xl border border-white/5">
                  His vertical jump reaches 2.93m (higher than the crossbar and average NBA slam dunks) with a 0.73-second hangtime. In transition, his sprint speed clocked 38.6 km/h at age 33!
                </p>
              </div>
              <div className="pt-3 border-t border-burntOrange/20 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>LEFT • RIGHT • AERIAL • FREE KICKS</span>
                <span className="text-burntOrange font-black">0 WEAKNESSES</span>
              </div>
            </motion.div>
          </div>
        )}

        {/* ── TAB 2: CR7 VS MESSI DIRECT HEAD-TO-HEAD MATRIX ── */}
        {activeTab === 'matrix' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-3xl font-black text-white font-display">
                HEAD-TO-HEAD COMPARISON MATRIX
              </h2>
              <p className="text-xs font-mono text-warmCream">
                Pure Data • Zero System Bias • The Cold Hard Facts
              </p>
            </div>

            <div className="overflow-x-auto rounded-3xl border border-burntOrange/30 bg-charcoal-900 shadow-2xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-charcoal-950/80 text-xs font-mono uppercase tracking-wider">
                    <th className="py-4 px-6 text-slate-300">Metric / Category</th>
                    <th className="py-4 px-6 text-burntOrange font-black">Cristiano Ronaldo</th>
                    <th className="py-4 px-6 text-slate-400">Lionel Messi</th>
                    <th className="py-4 px-6 text-forestGreen-light font-black">Verdict</th>
                    <th className="py-4 px-6 text-slate-400 hidden md:table-cell">Analytical Context</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm font-sans">
                  {COMPARISON_METRICS.map((m, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="py-4 px-6 font-bold text-white font-display">
                        {m.category}
                      </td>
                      <td className="py-4 px-6 font-mono font-black text-burntOrange-light">
                        {m.cr7Value}
                      </td>
                      <td className="py-4 px-6 font-mono text-slate-400">
                        {m.messiValue}
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-black bg-burntOrange/20 border border-burntOrange text-burntOrange-light">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{m.verdict}</span>
                        </span>
                      </td>
                      <td className="py-4 px-6 text-xs text-slate-300 font-sans hidden md:table-cell max-w-xs">
                        {m.detail}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* ── TAB 3: THE MOST CLUTCH PERFORMANCES IN FOOTBALL HISTORY ── */}
        {activeTab === 'moments' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-3xl font-black text-white font-display">
                THE ICONIC CLUTCH TIMELINE
              </h2>
              <p className="text-xs font-mono text-warmCream">
                When the world expected defeat, one man guaranteed victory.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CLUTCH_MOMENTS.map((moment, idx) => (
                <div
                  key={idx}
                  className="card-charcoal-orange p-6 rounded-3xl flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-black font-display text-burntOrange">
                        {moment.year}
                      </span>
                      <span className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-forestGreen/40 border border-forestGreen-light text-warmCream font-bold uppercase">
                        {moment.tag}
                      </span>
                    </div>

                    <h4 className="text-xl font-bold text-white font-display leading-snug">
                      {moment.title}
                    </h4>

                    <div className="text-xs font-mono text-burntOrange-light font-semibold">
                      {moment.match}
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      {moment.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>LEGENDARY STATUS</span>
                    <span className="text-warmCream font-bold">VERIFIED ★</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── TAB 4: MENTALITY, HEART SURGERY & WORK ETHIC ── */}
        {activeTab === 'mentality' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card-forest-cream p-6 sm:p-12 rounded-3xl space-y-8"
          >
            <div className="max-w-3xl space-y-4">
              <span className="text-xs font-mono px-3 py-1 rounded-lg bg-forestGreen/60 border border-forestGreen-light text-warmCream font-black uppercase tracking-wider">
                ORIGIN & MENTAL FORTITUDE
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white font-display">
                From a Heart Arrhythmia in Madeira to the Peak of Mount Olympus
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                At age 15, Cristiano Ronaldo was diagnosed with a racing heart condition (tachycardia) that threatened to terminate his football career before it even began. He underwent laser surgery, returned to training days later, and vowed to become the greatest to ever live.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div className="p-5 rounded-2xl bg-charcoal-900/90 border border-forestGreen-light/40 space-y-2">
                <div className="text-3xl font-black text-warmCream font-display">03:00 AM</div>
                <div className="text-xs font-bold text-white font-display">Cold Plunges & Sleep Cycles</div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Patrice Evra famously warned: "Never go to Ronaldo’s house for lunch. It’s just plain boiled chicken, water, and two hours of two-touch drills in his backyard."
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-charcoal-900/90 border border-burntOrange/40 space-y-2">
                <div className="text-3xl font-black text-burntOrange font-display">&lt;7%</div>
                <div className="text-xs font-bold text-white font-display">Biological Body Fat at Age 39</div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  While peers retire to slow-paced exhibitions by age 34, Ronaldo maintains the physiological age of a 22-year-old athlete through rigorous recovery and relentless nutrition.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-charcoal-900/90 border border-forestGreen-light/40 space-y-2">
                <div className="text-3xl font-black text-warmCream font-display">0 EXCUSES</div>
                <div className="text-xs font-bold text-white font-display">First to Arrive, Last to Leave</div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Zinedine Zidane: "When you have Cristiano in your team, you are already 1-0 up before kickoff. His hunger is something human beings rarely possess."
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── FOOTER CALL TO ACTION ── */}
        <div className="card-charcoal-orange p-8 sm:p-12 rounded-3xl text-center space-y-6 border border-burntOrange/40">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-burntOrange to-warmCream p-3.5 shadow-orange-glow flex items-center justify-center">
            <Trophy className="w-full h-full text-charcoal-950" />
          </div>

          <div className="space-y-2 max-w-xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-black text-white font-display">
              TEST YOUR FOOTBALL & CR7 KNOWLEDGE NOW
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-sans">
              Take the 5-minute Matchday Quiz in the CR7 & Legends Track. Answer tactical questions, beat the blitz timer, and climb the Leaderboard.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/register"
              className="px-8 py-4 rounded-2xl btn-burntOrange text-sm font-black tracking-wider uppercase flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>START CR7 QUIZ ARENA</span>
            </Link>

            <Link
              to="/leaderboard"
              className="px-6 py-4 rounded-2xl btn-forest-cream text-sm font-black tracking-wider uppercase"
            >
              VIEW LEADERBOARD 🏆
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RonaldoGoatPage;
