import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitBranch, Shield, Zap, Sparkles, RefreshCw, AlertTriangle } from 'lucide-react';

interface FamilyMember {
  name: string;
  relation: string;
  era: string;
  desc: string;
  paradox: string;
}

const FAMILIES: Record<string, { title: string; color: string; badge: string; members: FamilyMember[] }> = {
  kahnwald: {
    title: 'THE KAHNWALD DYNASTY',
    color: 'border-amber-400/40 text-amber-300',
    badge: 'bg-amber-400/20 text-amber-300 border-amber-400/40',
    members: [
      {
        name: 'Jonas Kahnwald (The Traveler / Adam)',
        relation: 'Son of Michael & Hannah; Lover & nephew of Martha',
        era: '1888 • 1921 • 2019 • 2052',
        desc: 'Iconic yellow raincoat traveler who dedicates his entire existence to erasing the knot, ultimately transforming into the scarred Adam.',
        paradox: 'Exists only because his own younger uncle (Mikkel) traveled to 1986 and became his father.',
      },
      {
        name: 'Michael Kahnwald (Mikkel Nielsen)',
        relation: 'Biological son of Ulrich & Katharina; Adoptive son of Ines',
        era: '1986 • 2019',
        desc: 'Young Mikkel jumps from 2019 to 1986 through the cave passage. Commits suicide on June 21, 2019, leaving the sealed letter.',
        paradox: 'His suicide is the prime mover that forces Jonas to investigate time travel and take young Mikkel into the cave.',
      },
      {
        name: 'Hannah Kahnwald',
        relation: 'Wife of Michael; Mother of Jonas and Silja',
        era: '1954 • 1986 • 2019',
        desc: 'Driven by obsession with Ulrich, travels back to 1954, has an affair with Inspector Egon Tiedemann, giving birth to Silja.',
        paradox: 'Mother of Silja, who travels to 1890 to give birth to Noah and Agnes, the ancestors of Ulrich!',
      },
      {
        name: 'Ines Kahnwald',
        relation: 'Adoptive mother of Mikkel; Grandmother of Jonas',
        era: '1953 • 1986 • 2019',
        desc: 'Nurse at Winden hospital who drugs young Mikkel with sedatives to prevent him from returning home to 2019.',
        paradox: 'Preserves the loop out of motherly love, keeping Mikkel in 1986.',
      },
    ],
  },
  nielsen: {
    title: 'THE NIELSEN LINEAGE',
    color: 'border-blue-500/40 text-blue-300',
    badge: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    members: [
      {
        name: 'Martha Nielsen (Alt-Martha / Eva)',
        relation: 'Daughter of Ulrich & Katharina; Lover of Jonas',
        era: '2019 • World 2',
        desc: 'In World 2, guides Jonas and leads Erit Lux as Eva, dedicated to preserving the endless loop so her son may live.',
        paradox: 'Conceives "The Unknown" with Jonas, who fathers Tronte Nielsen, making her her own great-grandmother.',
      },
      {
        name: 'Ulrich Nielsen',
        relation: 'Husband of Katharina; Father of Martha, Magnus, Mikkel',
        era: '1953 • 1986 • 2019',
        desc: 'Detective who travels to 1953 to kill young Helge Doppler, is imprisoned, and spends 33 years in a psychiatric institution.',
        paradox: 'Attempts to kill young Helge to save his son, but the attack causes Helge\'s scars and drives him to Noah.',
      },
      {
        name: 'Katharina Nielsen',
        relation: 'Wife of Ulrich; Principal of Winden High',
        era: '1986 • 2019',
        desc: 'Fiercely pursues the truth to find Mikkel and Ulrich. Travels to 1986 and is tragically murdered on the lake shore by her own mother.',
        paradox: 'Dies by the hand of Helene Albers, leaving the St. Christopher medal on the beach for Jonas and Martha to find.',
      },
      {
        name: 'The Unknown (The Origin Trio)',
        relation: 'Son of Jonas and Alt-Martha; Father of Tronte',
        era: '1953 • 1986 • 2019',
        desc: 'Man with the cleft lip who travels simultaneously as child, adult, and elder, executing the critical steps to lock the timeline in both worlds.',
        paradox: 'The literal bridge between Adam and Eva\'s worlds, fathering Tronte Nielsen with Agnes.',
      },
    ],
  },
  doppler: {
    title: 'THE DOPPLER BOOTSTRAP PARADOX',
    color: 'border-emerald-500/40 text-emerald-300',
    badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    members: [
      {
        name: 'Charlotte Doppler',
        relation: 'Mother AND Daughter of Elisabeth Doppler',
        era: '1986 • 2019 • 2052',
        desc: 'Chief of police raised by clockmaker Tannhaus. Discovers her parents are Hanno Tauber (Noah) and her own teenage daughter Elisabeth.',
        paradox: 'The most famous bootstrap paradox in sci-fi: Charlotte gives birth to Elisabeth, who travels to 2052 and gives birth to Charlotte.',
      },
      {
        name: 'Elisabeth Doppler',
        relation: 'Daughter AND Mother of Charlotte Doppler; Wife of Noah',
        era: '2019 • 2052',
        desc: 'Survives the apocalypse in the bunker with Peter. Grows up to lead the post-apocalyptic survivors in 2052 and gives birth to baby Charlotte.',
        paradox: 'Her infant daughter is stolen and taken back in time to 1971 to be raised by Tannhaus, becoming her own mother.',
      },
      {
        name: 'Noah (Hanno Tauber)',
        relation: 'Father of Charlotte; Brother of Agnes; Son of Bartosz & Silja',
        era: '1921 • 1986 • 2019',
        desc: 'Enigmatic priest with Emerald Tablet back tattoo who operates the bunker chair time machine to test the mechanics of time.',
        paradox: 'Manipulated by Adam into believing they are saving Charlotte, only to realize he was a pawn all along.',
      },
      {
        name: 'Helge Doppler',
        relation: 'Son of Bernd Doppler & Greta; Father of Peter',
        era: '1953 • 1986 • 2019',
        desc: 'Childhood victim of Ulrich\'s attack, seduced by Noah into abducting Mads, Erik, and Yasin for the bunker tests.',
        paradox: 'As an old man in 2019, travels back to 1986 to crash his car into his middle-aged self to stop the murders, failing fatally.',
      },
    ],
  },
  tiedemann: {
    title: 'THE TIEDEMANN ANCHORS',
    color: 'border-purple-500/40 text-purple-300',
    badge: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    members: [
      {
        name: 'Claudia Tiedemann (The White Devil)',
        relation: 'Mother of Regina; Daughter of Egon & Doris',
        era: '1953 • 1986 • 2020',
        desc: 'Brilliant director of the nuclear power plant who masters the time knot, playing both Adam and Eva against each other.',
        paradox: 'Discovers the Origin World exists because her daughter Regina is NOT descended from the incestuous Nielsen knot.',
      },
      {
        name: 'Bartosz Tiedemann',
        relation: 'Son of Regina & Aleksander; Father of Noah & Agnes',
        era: '1888 • 2019',
        desc: 'Jonas\'s best friend who travels with the teenagers to 1888. Marries Silja and fathers Noah and Agnes before being killed by adult Noah.',
        paradox: 'The forefather of the entire Nielsen and Doppler families, rooted deep in 19th-century Winden.',
      },
      {
        name: 'Silja Tiedemann',
        relation: 'Daughter of Hannah & Egon; Wife of Bartosz; Mother of Noah & Agnes',
        era: '1890 • 1954 • 2052',
        desc: 'Born in 1954, taken to 2052 by older Hannah, sent back to 1890 by Adam, where she dies giving birth to Agnes.',
        paradox: 'Half-sister to Jonas Kahnwald, yet ancestral grandmother to Ulrich Nielsen.',
      },
      {
        name: 'Regina Tiedemann',
        relation: 'Daughter of Claudia & Bernd Doppler; Anchor of Origin World',
        era: '1986 • 2019',
        desc: 'Owner of the Winden hotel who develops breast cancer. Claudia\'s ultimate love and mission is to create a reality where Regina lives.',
        paradox: 'Because her father was Bernd Doppler (not Tronte), Regina is the ONLY child in Winden free of the knot, surviving in the Origin World.',
      },
    ],
  },
};

export const DarkFamilyTree: React.FC = () => {
  const [selectedFamily, setSelectedFamily] = useState<string>('kahnwald');
  const family = FAMILIES[selectedFamily];

  return (
    <div className="space-y-6">
      {/* Family Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {Object.entries(FAMILIES).map(([key, fam]) => (
          <button
            key={key}
            onClick={() => setSelectedFamily(key)}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all border ${
              selectedFamily === key
                ? `${fam.badge} shadow-lg scale-[1.03]`
                : 'bg-black/30 text-warmCream/60 border-white/10 hover:border-white/20'
            }`}
          >
            {fam.title}
          </button>
        ))}
      </div>

      {/* Family Members Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedFamily}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {family.members.map((member, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-black/60 border border-emerald-500/25 backdrop-blur-md space-y-3 relative overflow-hidden"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="text-base font-bold text-warmCream font-display">
                    {member.name}
                  </h4>
                  <div className="text-[11px] font-mono text-emerald-400 mt-0.5">
                    {member.relation}
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-warmCream/70 shrink-0">
                  ⏳ {member.era}
                </span>
              </div>

              <p className="text-xs text-warmCream/80 font-sans leading-relaxed">
                {member.desc}
              </p>

              {/* Paradox Callout */}
              <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/20 text-[11px] font-mono text-emerald-300">
                <span className="font-bold text-amber-400 block mb-0.5">⚡ THE KNOT PARADOX:</span>
                {member.paradox}
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* The Central Knot Insight Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-black to-emerald-950/60 border border-emerald-500/30 text-center font-mono text-xs text-warmCream/90">
        <span className="text-amber-400 font-bold uppercase">“A GLITCH IN THE MATRIX”: </span>
        Elisabeth is Charlotte's mother. Charlotte is Elisabeth's mother. Jonas creates the loop that creates himself. The knot has no beginning and no end.
      </div>
    </div>
  );
};
