import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Clock, Sparkles, Compass, Shield, BookOpen, GitBranch, ArrowRight, Radio } from 'lucide-react';
import { DarkGodParticle3D } from '../components/dark/DarkGodParticle3D';
import { DarkAudioPlayer } from '../components/dark/DarkAudioPlayer';
import { DarkFifaCard } from '../components/dark/DarkFifaCard';
import { DarkFamilyTree } from '../components/dark/DarkFamilyTree';
import { ChessBackground } from '../components/ui/ChessBackground';

const TIMELINE_ERAS = [
  {
    year: '1888',
    title: 'THE BIRTH OF SIC MUNDUS',
    location: 'Heinrich Tannhaus Factory & Underground Chambers',
    desc: 'The teenage travelers (Jonas, Magnus, Franziska, Bartosz) arrive from 2019 without fuel. Adult Jonas builds the secret apparatus over 33 years.',
    tag: 'ORIGIN FOUNDATION',
  },
  {
    year: '1921',
    title: 'ADAM\'S SIC MUNDUS CHURCH',
    location: 'Winden Church & Subterranean Sanctum',
    desc: 'Severely scarred Adam directs young Jonas and Noah. The God Particle enables jumps to any date outside the 33-year cycle.',
    tag: 'THE GRAND APOCALYPSE',
  },
  {
    year: '1953',
    title: 'THE NUCLEAR DAWN & CLOCKMAKER',
    location: 'H.G. Tannhaus Watch Shop & Winden Woods',
    desc: 'Two dead boys with burnt eyes appear at the power plant construction site. Ulrich arrives from 2019 seeking Mikkel and attacks young Helge.',
    tag: 'FIRST CORPSES',
  },
  {
    year: '1986',
    title: 'THE REACTOR INCIDENT & CESIUM-137',
    location: 'Winden Nuclear Power Plant & Wallpapered Bunker',
    desc: 'A volume of dark matter volume is created in the reactor accident. Young Mikkel emerges from the cave and is adopted as Michael Kahnwald.',
    tag: 'THE RIFT CREATED',
  },
  {
    year: '2019',
    title: 'THE DISAPPEARANCE OF MIKKEL',
    location: 'Winden Cave Entrance & Kahnwald Residence',
    desc: 'Michael commits suicide on June 21st. On November 4th, young Mikkel disappears near the cave, triggering the loop for Jonas.',
    tag: 'THE BEGINNING & END',
  },
  {
    year: '2052',
    title: 'POST-APOCALYPTIC WASTELAND',
    location: 'Ruins of Winden & The Dark Matter Sphere',
    desc: 'Elisabeth Doppler leads armed survivors guarding the radioactive dead zone where the stabilized God Particle levitates in silence.',
    tag: 'GOD PARTICLE',
  },
];

export const DarkExperiencePage: React.FC = () => {
  const [selectedEra, setSelectedEra] = useState<number>(4); // default 2019

  return (
    <div className="relative min-h-screen bg-[#020b08] text-warmCream overflow-hidden font-sans selection:bg-emerald-400 selection:text-black">
      {/* Background Matrix & Subtle Chess Particles */}
      <ChessBackground />

      {/* ── 1. TICKER TAPE BANNER ── */}
      <div className="w-full bg-[#010806]/95 backdrop-blur-md text-emerald-300 py-3 overflow-hidden font-mono text-xs border-y border-emerald-500/20 select-none shadow-lg">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8 font-black tracking-wider">
          <span className="text-emerald-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            SIC MUNDUS CREATUS EST // THUS THE WORLD WAS CREATED
          </span>
          <span className="text-emerald-600">•</span>
          <span className="text-amber-300">
            ⏳ 33-YEAR CYCLES: 1888 ⇋ 1921 ⇋ 1953 ⇋ 1986 ⇋ 2019 ⇋ 2052
          </span>
          <span className="text-emerald-600">•</span>
          <span className="text-cyan-300">
            DER ANFANG IST DAS ENDE UND DAS ENDE IST DER ANFANG
          </span>
          <span className="text-emerald-600">•</span>
          <span className="text-emerald-400">
            JONAS KAHNWALD × MARTHA NIELSEN // YOU AND I ARE PERFECT FOR EACH OTHER
          </span>
          <span className="text-emerald-600">•</span>
          <span className="text-amber-400">
            H.G. TANNHAUS // WHAT WE KNOW IS A DROP, WHAT WE DON'T KNOW IS AN OCEAN
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 relative z-10">

        {/* ── 2. HERO SECTION: LOGO + APPARAT MUSIC PLAYER + 3D GOD PARTICLE ── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Editorial */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Header Badge */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                NETFLIX SCI-FI MASTERPIECE // WINDEN PORTAL
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 text-warmCream/70 font-mono text-xs">
                <span>🌀</span>
                <span>THE INFINITE KNOT</span>
              </span>
            </div>

            {/* Main Title with Triquetra Logo */}
            <div className="flex flex-col lg:flex-row items-center gap-6">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden border-2 border-emerald-400 shadow-[0_0_35px_rgba(16,185,129,0.4)] shrink-0 bg-black">
                <img src="/dark-triquetra.png" alt="Dark Triquetra" className="w-full h-full object-cover" />
              </div>

              <div>
                <div className="text-xs font-mono text-emerald-400 tracking-[0.25em] uppercase font-bold">
                  [ WINDEN 1888 — 2052 ]
                </div>
                <h1 className="text-4xl sm:text-6xl font-black text-warmCream tracking-tight leading-none font-display">
                  DARK: THE KNOT.
                </h1>
                <p className="text-xs sm:text-sm font-mono text-amber-300 mt-1 uppercase tracking-wider">
                  "The question isn't where, but WHEN."
                </p>
              </div>
            </div>

            {/* Core Philosophy Paragraph */}
            <p className="text-sm sm:text-base text-warmCream/85 leading-relaxed font-sans max-w-xl mx-auto lg:mx-0">
              In the rain-drenched German town of Winden, time is not an arrow — it is an ouroboros, a serpent devouring its own tail. Four interconnected families are trapped in an ontological bootstrap loop spanning three worlds, where the future influences the past as much as the past creates the future.
            </p>

            {/* Dedicated Apparat "Goodbye" Audio Player */}
            <div className="pt-2">
              <DarkAudioPlayer />
            </div>

            {/* Quick Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2 font-mono text-xs">
              <Link
                to="/register"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-400 text-black font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:shadow-emerald-500/40 hover:scale-105 active:scale-95 transition-all"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Play DARK Arena Quiz ⏳</span>
              </Link>

              <a
                href="#fifa-cards"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-black/60 hover:bg-black border border-emerald-500/30 text-emerald-300 font-bold flex items-center justify-center gap-2 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Forge Dark Character Card</span>
              </a>
            </div>
          </motion.div>

          {/* Right: Interactive 3D Three.js God Particle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <DarkGodParticle3D />
          </motion.div>
        </section>

        {/* ── 3. THE 33-YEAR CYCLE TIME PORTAL NAVIGATOR ── */}
        <section className="space-y-6 pt-6 border-t border-emerald-500/20">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
              [ 33-YEAR TEMPORAL PHASES ]
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-warmCream font-display">
              THE 33-YEAR LUNAR-SOLAR CYCLE
            </h2>
            <p className="text-xs sm:text-sm text-warmCream/70 font-mono">
              Every 33 years, the solar and lunar calendars synchronize. Inside the Winden cave passage, time ruptures between three distinct epochs.
            </p>
          </div>

          {/* Era Selector Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
            {TIMELINE_ERAS.map((era, idx) => (
              <button
                key={era.year}
                onClick={() => setSelectedEra(idx)}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  selectedEra === idx
                    ? 'bg-emerald-500/25 border-emerald-400 text-emerald-300 font-bold shadow-[0_0_20px_rgba(16,185,129,0.3)] scale-[1.03]'
                    : 'bg-black/40 border-white/10 text-warmCream/60 hover:border-white/20'
                }`}
              >
                <div className="text-xl sm:text-2xl font-black font-mono">{era.year}</div>
                <div className="text-[10px] uppercase tracking-wider text-warmCream/70 truncate mt-1">
                  {era.tag}
                </div>
              </button>
            ))}
          </div>

          {/* Selected Era Detail Card */}
          <motion.div
            key={selectedEra}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#06241a] via-[#02130e] to-black border-2 border-emerald-500/30 shadow-2xl relative overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold uppercase tracking-wider">
                  ERA {TIMELINE_ERAS[selectedEra].year} • {TIMELINE_ERAS[selectedEra].tag}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-warmCream font-display mt-2">
                  {TIMELINE_ERAS[selectedEra].title}
                </h3>
              </div>
              <div className="text-xs font-mono text-amber-300 bg-black/50 px-4 py-2 rounded-xl border border-white/10 shrink-0">
                📍 {TIMELINE_ERAS[selectedEra].location}
              </div>
            </div>

            <p className="text-sm sm:text-base text-warmCream/90 leading-relaxed font-sans mt-4 max-w-3xl">
              {TIMELINE_ERAS[selectedEra].desc}
            </p>
          </motion.div>
        </section>

        {/* ── 4. THE 3 WORLDS TRIQUETRA (ADAM VS EVA VS ORIGIN) ── */}
        <section className="space-y-6 pt-6 border-t border-emerald-500/20">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
              [ THE METAPHYSICAL TRINITY ]
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-warmCream font-display">
              THE THREE INTERTWINED WORLDS
            </h2>
            <p className="text-xs sm:text-sm text-warmCream/70 font-mono">
              The knot cannot be solved from within. It took Claudia Tiedemann 33 years across infinite cycles to discover that there were never two worlds, but three.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* World 1: Adam's World */}
            <div className="p-6 rounded-3xl bg-gradient-to-b from-[#061e16] to-black border-2 border-emerald-500/30 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  WORLD 01 • SIC MUNDUS
                </span>
                <span className="text-2xl">⏳</span>
              </div>
              <h3 className="text-xl font-bold font-display text-warmCream">ADAM'S WORLD (JONAS)</h3>
              <p className="text-xs text-warmCream/80 font-sans leading-relaxed">
                Ruled by Sic Mundus under elderly scarred Jonas. Adam believes life is endless suffering created by time itself, and his ultimate mission is to create a vacuum to eradicate all existence.
              </p>
              <div className="pt-2 font-mono text-[11px] text-emerald-400">
                • Philosophy: Nihilism & Final Oblivion<br />
                • Motto: "Sic Mundus Creatus Est"
              </div>
            </div>

            {/* World 2: Eva's World */}
            <div className="p-6 rounded-3xl bg-gradient-to-b from-[#180a1c] to-black border-2 border-purple-500/30 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                  WORLD 02 • ERIT LUX
                </span>
                <span className="text-2xl">🌀</span>
              </div>
              <h3 className="text-xl font-bold font-display text-warmCream">EVA'S WORLD (MARTHA)</h3>
              <p className="text-xs text-warmCream/80 font-sans leading-relaxed">
                Ruled by Erit Lux under older Martha. Eva fights ruthlessly to keep every tragedy, pain, and death happening identically in every cycle so her son ("The Unknown") may be born and survive.
              </p>
              <div className="pt-2 font-mono text-[11px] text-purple-300">
                • Philosophy: Eternal Preservation of Love<br />
                • Motto: "Erit Lux (Let There Be Light)"
              </div>
            </div>

            {/* World 3: The Origin World */}
            <div className="p-6 rounded-3xl bg-gradient-to-b from-[#1e1508] to-black border-2 border-amber-500/30 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  WORLD 00 • THE ORIGIN
                </span>
                <span className="text-2xl">🕰️</span>
              </div>
              <h3 className="text-xl font-bold font-display text-warmCream">H.G. TANNHAUS'S WORLD</h3>
              <p className="text-xs text-warmCream/80 font-sans leading-relaxed">
                The real world without time travel. In 1971, Tannhaus lost his son Marek, Sonja, and baby Charlotte on the bridge road. Grief drove him to invent the machine, splitting reality on June 21, 1986.
              </p>
              <div className="pt-2 font-mono text-[11px] text-amber-300">
                • Resolution: Jonas & Martha save Marek in 1971<br />
                • The knot unties peacefully forever.
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. WINDEN FAMILY TREE & THE KNOT PARADOXES ── */}
        <section className="space-y-6 pt-6 border-t border-emerald-500/20">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
              [ 4 INTERTWINED DYNASTIES ]
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-warmCream font-display">
              THE WINDEN FAMILY TREE
            </h2>
            <p className="text-xs sm:text-sm text-warmCream/70 font-mono">
              Explore the paradoxes of the Kahnwald, Nielsen, Doppler, and Tiedemann bloodlines.
            </p>
          </div>

          <DarkFamilyTree />
        </section>

        {/* ── 6. OFFICIAL DARK FUT / CHARACTER CARD GENERATOR ── */}
        <section id="fifa-cards" className="space-y-6 pt-6 border-t border-emerald-500/20">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
              [ FUT CARD GENERATOR // EA FC ENGINE ]
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-warmCream font-display">
              DARK TRAVELER ULTIMATE TEAM CARDS
            </h2>
            <p className="text-xs sm:text-sm text-warmCream/70 font-mono">
              Generate canon cards for Jonas, Martha, Claudia, Adam, Tannhaus, or forge your own custom Traveler persona with direct high-res PNG download!
            </p>
          </div>

          <DarkFifaCard />
        </section>

        {/* ── 7. FOOTER ACTION BANNER ── */}
        <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#06241a] via-black to-[#06241a] border-2 border-emerald-500/40 text-center space-y-5 shadow-2xl">
          <div className="w-16 h-16 mx-auto rounded-2xl overflow-hidden border border-emerald-400/60 p-1 bg-black">
            <img src="/dark-triquetra.png" alt="" className="w-full h-full object-cover rounded-xl" />
          </div>

          <h3 className="text-2xl sm:text-4xl font-black text-warmCream font-display">
            ARE YOU READY TO ENTER THE CAVE?
          </h3>
          <p className="text-xs sm:text-base text-warmCream/80 font-sans max-w-xl mx-auto">
            Take on the curated DARK quiz track with questions spanning all 3 seasons, the 33-year cycles, and the Origin World resolution!
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/register"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-400 text-black font-black uppercase tracking-wider text-sm shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              Start Dark Arena Quiz ⏳
            </Link>

            <Link
              to="/"
              className="px-6 py-4 rounded-xl bg-black/60 hover:bg-black border border-white/20 text-warmCream text-sm font-bold font-mono transition-all"
            >
              Return to Arena Home
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
};
