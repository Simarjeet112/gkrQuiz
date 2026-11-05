// Curated Question Bank for:
// Netflix DARK (Jonas Kahnwald, Martha Nielsen, Sic Mundus Creatus Est, Adam & Eva,
// The 33-Year Cycle, Tannhaus Clockmaker Machine, The God Particle, Winden Caves)

export interface DarkQuestion {
  text: string;
  difficulty: 'easy' | 'medium' | 'tough';
  category: string;
  code_snippet?: string | null;
  options: string[];
  correct_answer: string;
  explanation: string;
}

export const darkQuestions: DarkQuestion[] = [
  // ── EASY QUESTIONS (Winden Basics & The Mystery) ───────────────────────────
  {
    text: "In Netflix's DARK, what is the fictional German town where the mysterious disappearances and time travel occur?",
    difficulty: 'easy',
    category: 'DARK // Winden Knot',
    code_snippet: null,
    options: ['Winden', 'Darmstadt', 'Heidelberg', 'Black Forest'],
    correct_answer: 'Winden',
    explanation:
      'The entire saga of DARK takes place in the gloomy, rain-drenched town of Winden, surrounded by dense forests and a nuclear power plant.',
  },
  {
    text: "What distinctive piece of clothing does Jonas Kahnwald famously wear throughout the series?",
    difficulty: 'easy',
    category: 'DARK // Winden Knot',
    code_snippet: null,
    options: ['Yellow Raincoat', 'Red Trenchcoat', 'Leather Biker Jacket', 'Black Wool Coat'],
    correct_answer: 'Yellow Raincoat',
    explanation:
      "Jonas Kahnwald's iconic bright yellow raincoat is one of the most recognizable visual symbols in modern television sci-fi.",
  },
  {
    text: 'What is the length of the time cycle in Winden, dictating the jumps between eras?',
    difficulty: 'easy',
    category: 'DARK // Winden Knot',
    code_snippet: null,
    options: ['33 Years', '25 Years', '50 Years', '12 Years'],
    correct_answer: '33 Years',
    explanation:
      'The lunar-solar cycle aligns every 33 years, allowing time travel between 1953, 1986, 2019, and 2052 through the Winden cave wormhole.',
  },
  {
    text: 'Who is Jonas Kahnwald’s father whose suicide triggers the beginning of the series?',
    difficulty: 'easy',
    category: 'DARK // Winden Knot',
    code_snippet: null,
    options: ['Michael Kahnwald', 'Ulrich Nielsen', 'Peter Doppler', 'Alexander Tiedemann'],
    correct_answer: 'Michael Kahnwald',
    explanation:
      'Michael Kahnwald (formerly young Mikkel Nielsen) hangs himself on June 21, 2019, leaving behind a letter not to be opened before November 4th.',
  },
  {
    text: 'What Latin phrase is tattooed across Noah’s back and engraved on the emerald cave door?',
    difficulty: 'easy',
    category: 'DARK // Winden Knot',
    code_snippet: null,
    options: [
      'Sic Mundus Creatus Est',
      'Carpe Diem Memento Mori',
      'Tempus Fugit Amor',
      'In Deo Speramus',
    ],
    correct_answer: 'Sic Mundus Creatus Est',
    explanation:
      '"Sic Mundus Creatus Est" ("Thus the world was created") is taken from the Emerald Tablet of Hermes Trismegistus and is the motto of the secret time-travel society.',
  },
  {
    text: 'Which little boy disappears into the Winden caves in November 2019, shocking the entire town?',
    difficulty: 'easy',
    category: 'DARK // Winden Knot',
    code_snippet: null,
    options: ['Mikkel Nielsen', 'Bartosz Tiedemann', 'Magnus Nielsen', 'Kilian Obendorf'],
    correct_answer: 'Mikkel Nielsen',
    explanation:
      'Young Mikkel Nielsen travels back in time from 2019 to 1986 through the passage in the Winden caves, where he grows up as Michael Kahnwald.',
  },
  {
    text: 'What profession did H.G. Tannhaus hold in 1953 and 1986 Winden?',
    difficulty: 'easy',
    category: 'DARK // Winden Knot',
    code_snippet: null,
    options: ['Clockmaker & Watchmaker', 'Nuclear Physicist', 'Chief of Police', 'School Principal'],
    correct_answer: 'Clockmaker & Watchmaker',
    explanation:
      'Heinrich Tannhaus was a master clockmaker who maintained a repair shop and wrote "A Journey Through Time" (Eine Reise durch die Zeit).',
  },
  {
    text: 'What is the relationship between Jonas Kahnwald and Martha Nielsen in the original cycle?',
    difficulty: 'easy',
    category: 'DARK // Winden Knot',
    code_snippet: null,
    options: [
      'They are lovers, but she is also his aunt',
      'They are first cousins',
      'They are brother and sister',
      'They are unrelated high school classmates',
    ],
    correct_answer: 'They are lovers, but she is also his aunt',
    explanation:
      'Because Jonas is the son of Mikkel Nielsen, Martha (Mikkel’s sister) is Jonas’s biological aunt, representing the tragic tangled knot of Winden.',
  },
  {
    text: 'What iconic quote by the Stranger summarizes the paradox of time in DARK?',
    difficulty: 'easy',
    category: 'DARK // Winden Knot',
    code_snippet: null,
    options: [
      'The end is the beginning, and the beginning is the end.',
      'Time is an arrow that flies only forward.',
      'History is written by the victors.',
      'Yesterday is gone, tomorrow never comes.',
    ],
    correct_answer: 'The end is the beginning, and the beginning is the end.',
    explanation:
      '"Der Anfang ist das Ende und das Ende ist der Anfang" is the core existential thesis of the eternal causal loop in Winden.',
  },
  {
    text: 'What is the mysterious levitating black sphere located inside the ruins of the nuclear plant in 2052 called?',
    difficulty: 'easy',
    category: 'DARK // Winden Knot',
    code_snippet: null,
    options: ['The God Particle (Higgs Field)', 'The Event Horizon', 'The Dark Star', 'The Chronos Core'],
    correct_answer: 'The God Particle (Higgs Field)',
    explanation:
      'The God Particle (Gottespartikel) is a stabilized dark matter anomaly that enables travelers to jump to any era without being restricted by the 33-year cycle.',
  },

  // ── MEDIUM QUESTIONS (The Paradoxes, Sic Mundus & Erit Lux) ───────────────
  {
    text: 'What is the true identity of "Adam", the supreme leader of Sic Mundus who has severe facial scarring?',
    difficulty: 'medium',
    category: 'DARK // Winden Knot',
    code_snippet: null,
    options: ['An elderly Jonas Kahnwald', 'An elderly Ulrich Nielsen', 'H.G. Tannhaus', 'Bartosz Tiedemann'],
    correct_answer: 'An elderly Jonas Kahnwald',
    explanation:
      'Adam is the oldest incarnation of Jonas Kahnwald, scarred by decades of radiation burns and driven by a desire to destroy the knot and eradicate the worlds.',
  },
  {
    text: 'What is the counterpart secret society led by Eva in the alternate dimension (World 2)?',
    difficulty: 'medium',
    category: 'DARK // Winden Knot',
    code_snippet: null,
    options: ['Erit Lux', 'Sic Mundus', 'Ordo Templi', 'Lux Aeterna'],
    correct_answer: 'Erit Lux',
    explanation:
      'While Adam leads "Sic Mundus" (Thus the world was created) seeking annihilation, Eva (older Martha) leads "Erit Lux" (Let there be light) fighting to preserve the loop and save her son.',
  },
  {
    text: 'What is the three-pointed Celtic knot symbol that appears throughout Winden called?',
    difficulty: 'medium',
    category: 'DARK // Winden Knot',
    code_snippet: null,
    options: ['Triquetra (Trinity Knot)', 'Ouroboros', 'Valknut', 'Triskelion'],
    correct_answer: 'Triquetra (Trinity Knot)',
    explanation:
      'The Triquetra represents the interconnection of three times (past, present, future) and ultimately the three worlds (Adam’s World, Eva’s World, and the Origin World).',
  },
  {
    text: 'Who killed young Erik Obendorf, Yasin, and Mads Nielsen in the 1986 bunker chair prototype experiments?',
    difficulty: 'medium',
    category: 'DARK // Winden Knot',
    code_snippet: null,
    options: ['Noah (Hanno Tauber) and Helge Doppler', 'Ulrich Nielsen', 'Jonas Kahnwald', 'Egon Tiedemann'],
    correct_answer: 'Noah (Hanno Tauber) and Helge Doppler',
    explanation:
      'Noah, assisted by the manipulated Helge Doppler, operated the primitive electrical chair device in the wallpapered bunker to test time travel physics, burning the victims\' eyes and ears.',
  },
  {
    text: 'Who is revealed to be the biological mother of Charlotte Doppler?',
    difficulty: 'medium',
    category: 'DARK // Winden Knot',
    code_snippet: null,
    options: [
      'Elisabeth Doppler (her own daughter)',
      'Katharina Nielsen',
      'Claudia Tiedemann',
      'Ines Kahnwald',
    ],
    correct_answer: 'Elisabeth Doppler (her own daughter)',
    explanation:
      'One of the show\'s most mind-bending bootstrap paradoxes: Charlotte is the daughter of Elisabeth and Noah, while Elisabeth is the daughter of Charlotte and Peter. They are each other\'s mother and daughter.',
  },
  {
    text: 'What radioactive isotope is sealed inside the yellow barrels at the Winden Nuclear Power Plant?',
    difficulty: 'medium',
    category: 'DARK // Winden Knot',
    code_snippet: null,
    options: ['Cesium-137', 'Uranium-235', 'Plutonium-239', 'Cobalt-60'],
    correct_answer: 'Cesium-137',
    explanation:
      'The volume of radioactive waste produced by the 1986 nuclear power plant volume contains Caesium-137 residue that fuels the Tannhaus time-travel apparatus.',
  },
  {
    text: 'Why is Claudia Tiedemann referred to as "The White Devil" by Noah and Sic Mundus?',
    difficulty: 'medium',
    category: 'DARK // Winden Knot',
    code_snippet: null,
    options: [
      'Because she has white hair in old age and opposes Sic Mundus to protect Regina',
      'Because she wore a white lab coat',
      'Because she caused the nuclear meltdown on purpose',
      'Because she poisoned the Winden water supply',
    ],
    correct_answer: 'Because she has white hair in old age and opposes Sic Mundus to protect Regina',
    explanation:
      'Old Claudia Tiedemann, with her striking shock of white hair and heterochromia eyes, operated as a counter-agent against Adam to protect her daughter Regina from cancer.',
  },
  {
    text: 'Who is "The Unknown" (the man with the cleft lip who travels in a trio of child, adult, and elder)?',
    difficulty: 'medium',
    category: 'DARK // Winden Knot',
    code_snippet: null,
    options: [
      'The son of Jonas and Alt-Martha',
      'The grandson of H.G. Tannhaus',
      'Mikkel Nielsen from an alternate reality',
      'A clone of Bartosz Tiedemann',
    ],
    correct_answer: 'The son of Jonas and Alt-Martha',
    explanation:
      'The Origin (The Unknown) is the son conceived between Jonas (World 1) and Martha (World 2), father of Tronte Nielsen, linking the family trees of both worlds together.',
  },
  {
    text: 'Which character ends up stuck in a psychiatric ward in 1986 after traveling back to save Mikkel?',
    difficulty: 'medium',
    category: 'DARK // Winden Knot',
    code_snippet: null,
    options: ['Ulrich Nielsen', 'Jonas Kahnwald', 'Peter Doppler', 'Hannah Kahnwald'],
    correct_answer: 'Ulrich Nielsen',
    explanation:
      'Ulrich Nielsen travels to 1953 to kill young Helge, is arrested by Egon Tiedemann, and spends 33 years institutionalized in a psychiatric asylum.',
  },
  {
    text: 'What book did H.G. Tannhaus publish that created a classic Bootstrap Paradox in the timeline?',
    difficulty: 'medium',
    category: 'DARK // Winden Knot',
    code_snippet: null,
    options: [
      'Eine Reise durch die Zeit (A Journey Through Time)',
      'The Knot of Winden',
      'Quantum Entanglement in 1986',
      'Memories of the Future',
    ],
    correct_answer: 'Eine Reise durch die Zeit (A Journey Through Time)',
    explanation:
      'Ulrich brings a copy from 2019 to 1953 Tannhaus. Tannhaus reads it and eventually prints it, meaning the book was never originally written by anyone — an ontological bootstrap paradox.',
  },

  // ── TOUGH QUESTIONS (Origin World, Quantum Entanglement & Master Lore) ────
  {
    text: 'What tragedy originally motivated H.G. Tannhaus in the real Origin World to build the time machine?',
    difficulty: 'tough',
    category: 'DARK // Winden Knot',
    code_snippet: null,
    options: [
      'The car crash death of his son Marek, daughter-in-law Sonja, and infant granddaughter Charlotte',
      'The death of his wife in childbirth',
      'The destruction of Winden in a nuclear reactor meltdown',
      'A murder-suicide committed by his ancestors in 1888',
    ],
    correct_answer: 'The car crash death of his son Marek, daughter-in-law Sonja, and infant granddaughter Charlotte',
    explanation:
      'In the real world on November 8, 1971, Marek Tannhaus, Sonja, and baby Charlotte crashed off the bridge during a stormy night. Grief pushed Tannhaus to build a machine to reverse time, splitting his world in two on June 21, 1986.',
  },
  {
    text: 'How does Claudia Tiedemann discover the existence of the third, original world (Origin World)?',
    difficulty: 'tough',
    category: 'DARK // Winden Knot',
    code_snippet: null,
    options: [
      'By realizing Regina gets cancer in both worlds because she is not part of the Nielsen incestuous family knot',
      'By finding a diary entry left by Heinrich Tannhaus',
      'By observing a solar eclipse that lasted 4 minutes too long',
      'By analyzing radio signals from outside Germany',
    ],
    correct_answer:
      'By realizing Regina gets cancer in both worlds because she is not part of the Nielsen incestuous family knot',
    explanation:
      'Claudia realized Bernd Doppler (not Tronte Nielsen) was Regina\'s father. Because Regina was not born from the time knot, she could exist in a world without time travel, leading Claudia to the Origin World revelation.',
  },
  {
    text: 'What physics phenomenon did Eva use during the apocalypse to split reality and create parallel causal branches?',
    difficulty: 'tough',
    category: 'DARK // Winden Knot',
    code_snippet: null,
    options: [
      'Quantum Entanglement during the fractional second time paused at the apocalypse',
      'Tachyon bombardment of the cesium barrels',
      'Cherenkov radiation in heavy water',
      'General relativistic frame-dragging in the cave rift',
    ],
    correct_answer: 'Quantum Entanglement during the fractional second time paused at the apocalypse',
    explanation:
      'During the apocalypse, time stands still for a fraction of a second, breaking causality. Eva used this moment to split Jonas\'s path into two superposition realities (one where he is saved by Alt-Martha, one where he survives in the basement).',
  },
  {
    text: 'What are the names of Marek Tannhaus and Sonja Tannhaus an anagram / mythological allusion to?',
    difficulty: 'tough',
    category: 'DARK // Winden Knot',
    code_snippet: null,
    options: [
      'Marek and Sonja are near-anagrams of Martha and Jonas',
      'Adam and Eve in archaic Germanic dialect',
      'The twin rivers of Winden',
      'The two halves of the Hermes tablet',
    ],
    correct_answer: 'Marek and Sonja are near-anagrams of Martha and Jonas',
    explanation:
      'Marek = Mar-ek (Martha), Sonja = So-nja (Jonas). When Tannhaus accidentally split the world in grief, Jonas and Martha were born as metaphysical echoes of the lost children he tried to save.',
  },
  {
    text: 'How do Jonas and Alt-Martha finally untie the knot and erase both their worlds in the series finale?',
    difficulty: 'tough',
    category: 'DARK // Winden Knot',
    code_snippet: null,
    options: [
      'They travel to 1971 in the Origin World and prevent Marek and Sonja\'s car from driving off the bridge',
      'They destroy the Winden Nuclear Power Plant in 1986 with dynamite',
      'They assassinate young H.G. Tannhaus before he learns clockmaking',
      'They absorb the God Particle into their bodies simultaneously',
    ],
    correct_answer: 'They travel to 1971 in the Origin World and prevent Marek and Sonja\'s car from driving off the bridge',
    explanation:
      'In 1971 on the rainy bridge road, Jonas and Martha warn Marek Tannhaus to turn back. Marek reconciled with his father and returned home alive, ensuring Tannhaus never built the time machine, erasing Adam and Eva\'s worlds peacefully.',
  },
  {
    text: 'In the final dinner scene of the Origin World, what sight triggers a sudden déjà vu in Hannah Kahnwald?',
    difficulty: 'tough',
    category: 'DARK // Winden Knot',
    code_snippet: null,
    options: [
      'A flash of lightning illuminating a yellow raincoat hanging in the hallway',
      'A ticking brass clock on the mantlepiece',
      'A song by Nena on the radio',
      'A framed photograph of the Winden caves',
    ],
    correct_answer: 'A flash of lightning illuminating a yellow raincoat hanging in the hallway',
    explanation:
      'As thunder claps during dinner, Hannah gazes at a yellow raincoat. She smiles and says she dreamt the world ended, and decides that if she has a son, she will name him "Jonas".',
  },
  {
    text: 'Who killed Peter Doppler in the post-apocalyptic timeline of 2020?',
    difficulty: 'tough',
    category: 'DARK // Winden Knot',
    code_snippet: null,
    options: [
      'A drifter/scavenger intruder whom Elisabeth subsequently killed in self-defense',
      'Silja under orders from Sic Mundus',
      'Ulrich Nielsen with a rock',
      'Radiation sickness from the power plant ruins',
    ],
    correct_answer: 'A drifter/scavenger intruder whom Elisabeth subsequently killed in self-defense',
    explanation:
      'Peter Doppler was murdered in their RV caravan while defending his teenage daughter Elisabeth from a violent intruder, who Elisabeth then bludgeoned to death.',
  },
  {
    text: 'What is the exact date on which H.G. Tannhaus activated his machine in the bunker of the Origin World?',
    difficulty: 'tough',
    category: 'DARK // Winden Knot',
    code_snippet: null,
    options: ['June 21, 1986', 'November 4, 2019', 'November 12, 1953', 'June 27, 2020'],
    correct_answer: 'June 21, 1986',
    explanation:
      'On June 21, 1986, Tannhaus turned the two brass switches on his machine, splitting reality into the two intertwined mirror worlds at the moment of the apocalypse.',
  },
  {
    text: 'Who is the father of Silja, the girl with the scar who guides Jonas in 2052 and marries Bartosz in 1890?',
    difficulty: 'tough',
    category: 'DARK // Winden Knot',
    code_snippet: null,
    options: [
      'Egon Tiedemann and Hannah Kahnwald',
      'Ulrich Nielsen and Hannah Kahnwald',
      'Bartosz Tiedemann and Martha Nielsen',
      'Noah and Elisabeth Doppler',
    ],
    correct_answer: 'Egon Tiedemann and Hannah Kahnwald',
    explanation:
      'When Hannah traveled to 1954 to visit imprisoned Ulrich, she began an affair with the married police inspector Egon Tiedemann and gave birth to Silja.',
  },
  {
    text: 'What are the dying words of adult Jonas (The Stranger) before he transforms mentally into the ruthless Adam?',
    difficulty: 'tough',
    category: 'DARK // Winden Knot',
    code_snippet: null,
    options: [
      'We are not free in what we do, because we are not free in what we desire.',
      'God is not an entity; God is time itself.',
      'Everything must happen again, exactly as it did before.',
      'A person can do what he wills, but not will what he wills.',
    ],
    correct_answer: 'A person can do what he wills, but not will what he wills.',
    explanation:
      'Quoting Arthur Schopenhauer ("Der Mensch kann tun was er will, aber er kann nicht wollen was er will"), Jonas realizes human desires are pre-programmed loops of nature and pain.',
  },
];
