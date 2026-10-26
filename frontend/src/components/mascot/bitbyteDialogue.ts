// Dialogue pool and contextual generator for BitByte // GKR-01

export type BitByteMood =
  | 'idle'
  | 'welcome'
  | 'thinking'
  | 'excited'
  | 'wrong_answer'
  | 'speed_mode'
  | 'low_time'
  | 'victory'
  | 'defeat'
  | 'leaderboard'
  | 'tough';

export const BITBYTE_DIALOGUES: Record<BitByteMood, string[]> = {
  welcome: [
    'yo challenger, ready to cook?',
    'BitByte online! Let’s see what you’ve got.',
    'welcome to Geekroom Code Arena!',
    'GTBIT Orientation 2026 — time to dominate!',
    'hands on the keyboard, brain on overdrive.',
  ],
  idle: [
    'hovering around... ready when you are.',
    'BitByte ping: 1ms. Systems fully operational.',
    'think fast. code smart. own the arena.',
    'waiting on your move, champion.',
    'GTBIT geek power loaded: 100%.',
  ],
  thinking: [
    'easy one. don’t overthink it.',
    'hmmm... examine the time complexity.',
    'read the question carefully, challenger!',
    'stack or queue? pointer or reference?',
    'trust your algorithms intuition.',
    'no rush, you’ve got this.',
  ],
  excited: [
    'okayyy that was clean! 🔥',
    "THAT'S MY CHALLENGER!",
    'COOKING WITH GAS!',
    'boom! +points secured!',
    'pure algorithmic perfection.',
    'laser precision! Keep the streak going!',
  ],
  wrong_answer: [
    'bro what was that 💀',
    'pain. but we recover!',
    'a momentary glitch. bounce back!',
    'no worries, shake it off and lock in!',
    'it’s fine, redemption is one click away.',
  ],
  speed_mode: [
    'WHOA speed demon! ⚡',
    'reflexes on point! Fast & dangerous.',
    'finger on the trigger!',
    'sub-second answer?! You’re cracked!',
    'maximum velocity coding mode!',
  ],
  low_time: [
    '3 seconds left. LOCK IN.',
    'CLOCK IS TICKING BRO! HURRY!',
    'PANIC MODE ACTIVATED! SUBMIT!',
    'DON’T LEAVE IT EMPTY! GUESS AND LOCK!',
    'time’s running out! Fire your answer!',
  ],
  tough: [
    'FINAL BOSS BATTLE! TOUGH QUESTION INCOMING!',
    'WARNING: High difficulty sector reached!',
    '30 points on the line! This separates the pros.',
    'maximum focus mode — this one requires brainpower!',
  ],
  victory: [
    'ARENA GOD STATUS! 👑',
    'THAT’S HOW IT’S DONE! What a run!',
    '90 points potential! You owned the arena!',
    'Geekroom GTBIT honors your legendary score!',
    'absolute coding mastery!',
  ],
  defeat: [
    'not bad. run it back?',
    'the arena builds character. try again!',
    'every pro coder was once a recruit.',
    'good fight! Review the explanations and return stronger.',
  ],
  leaderboard: [
    'the leaderboard is waiting for you.',
    'see your name in neon lights!',
    'top rank telemetry verified.',
    'will anyone dethrone you? Check the ranks!',
  ],
};

export const BITBYTE_CLICK_EASTER_EGGS: string[] = [
  'hey! tickles haha! 🤖',
  'whoa! don’t touch my orbital bracket ears!',
  'I’m running on 100% caffeine and WebGL.',
  'pro-tip: use number keys 1, 2, 3, 4 to pick answers fast!',
  'BitByte loves Geekroom GTBIT! 🚀',
  'system diagnostic: 100% cute, 0% bugs.',
  'you clicked me! +5 moral support!',
  'beep boop! ready to drop more wisdom!',
];

/**
 * Returns a random contextual dialogue string for the given mood, avoiding immediate duplicate.
 */
export function getBitByteDialogue(mood: BitByteMood, currentText?: string): string {
  const pool = BITBYTE_DIALOGUES[mood] || BITBYTE_DIALOGUES.idle;
  const filtered = pool.filter((msg) => msg !== currentText);
  const choices = filtered.length > 0 ? filtered : pool;
  return choices[Math.floor(Math.random() * choices.length)];
}

export function getRandomClickDialogue(): string {
  return BITBYTE_CLICK_EASTER_EGGS[
    Math.floor(Math.random() * BITBYTE_CLICK_EASTER_EGGS.length)
  ];
}
