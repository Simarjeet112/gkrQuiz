// Dialogue pool and contextual generator for Geekroom Mascot Duo:
// 1. BitByte // GKR-01 (The Coder Bot)
// 2. Leo // CFC-26 (The Chelsea Chess Grandmaster)

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

export type MascotType = 'coder' | 'chelsea_chess';

// ── 1. CODER BOT (BitByte // GKR-01) DIALOGUES ──
export const CODER_DIALOGUES: Record<BitByteMood, string[]> = {
  welcome: [
    'System ready. BitByte // GKR-01 online!',
    'Welcome to Geekroom Code Arena. Ready to compile?',
    'Algorithms loaded. Let’s solve this cleanly.',
    'Terminal active. Keep your code modular and your mind sharp.',
    'GTBIT Orientation 2026 — time to push to production!',
  ],
  idle: [
    'Compiling candidate logic... 0 errors, 0 warnings.',
    'Stack or Queue? Always pick the optimal data structure.',
    'Keep that time complexity tight — O(1) is the goal.',
    'Waiting on your input, fellow engineer.',
    'BitByte ping: 12ms. All systems operational.',
  ],
  thinking: [
    'Analyze the edge cases before committing.',
    'Check the recurrence relation. Trace it step by step.',
    'Is it LIFO or FIFO? Remember your data structures.',
    'Careful with index bounds. No off-by-one errors here.',
    'Break down the problem into smaller subproblems.',
  ],
  excited: [
    'CLEAN CODE! All test cases passed! ⚡',
    'Algorithm executed in O(1) time! Brilliant!',
    'No bugs, pure engineering mastery!',
    'Stack allocation verified! +points secured!',
    'That’s how senior engineers write logic!',
  ],
  wrong_answer: [
    'Syntax error detected! Catch the exception and refactor.',
    'Off-by-one bug! Shake it off and debug the next one.',
    'Even the best code crashes sometimes. Patch and push forward!',
    'Null pointer caught. Keep compiling, don’t quit!',
  ],
  speed_mode: [
    'TURBO EXECUTION! Sub-second solve rate! ⚡',
    'High-throughput logic! You’re typing in assembly!',
    'Zero CPU latency detected! Maximum speed!',
    'Blazing fast runtime! Keep this throughput going!',
  ],
  low_time: [
    'STACK OVERFLOW RISK! Timer running out, execute now!',
    'CLOCK TICK CRITICAL! Lock in your answer!',
    'Time is dropping! Run your fastest heuristic!',
    'Buffer running dry! Commit your choice!',
  ],
  tough: [
    'FINAL LEVEL: System Architecture & Tough Logic! 💾',
    'Warning: Deep graph/cache complexity ahead!',
    '30 points on the line! This tests true software engineers.',
    'Tough tier unlocked! Calculate cache evictions and edge cases.',
  ],
  victory: [
    'SYSTEM CHAMPION! 100% test coverage achieved! 👑',
    'Flawless compilation! You conquered the arena!',
    'Maximum score registered in the GTBIT ledger!',
    'Geekroom GTBIT salutes your engineering excellence!',
  ],
  defeat: [
    'Good execution cycle. Run a code review and re-test.',
    'Every senior dev has broken production. Learn from the logs!',
    'Analyze your trace below and run the next sprint!',
  ],
  leaderboard: [
    'The production leaderboard is synced and live.',
    'Your telemetry is registered on the leaderboard server.',
    'Top engineered scores on display. Check your rank!',
  ],
};

// ── 2. CHELSEA CHESS GRANDMASTER (Leo // CFC-26) DIALOGUES ──
export const CHELSEA_CHESS_DIALOGUES: Record<BitByteMood, string[]> = {
  welcome: [
    'Blue is the colour! Leo // CFC-26 reporting for duty.',
    'Think 3 moves ahead, challenger. 1. e4 best by test.',
    'Welcome to the match! Stamford tactical discipline engaged.',
    'Wear the blue with pride. Let’s play with Grandmaster precision.',
    'Clock is set. Eyes on the board, feet on the pitch.',
  ],
  idle: [
    'Evaluating board position: +1.8 tactical advantage.',
    'Control the center, control the game.',
    'Patience, blue. Calculate all candidate moves first.',
    'Defense wins trophies, tactical calculation wins quiz rooms.',
    'Stamford Grandmaster mode: ready whenever you are.',
  ],
  thinking: [
    'Think 3 moves ahead before clicking.',
    'Opening theory is clear. Don’t rush the middlegame.',
    'Look at the candidate moves. Find the winning fork.',
    'Position yourself like Terry at the back — unbreakable.',
    'Calculate the endgame: every pawn promotion counts.',
  ],
  excited: [
    '!! BRILLIANT MOVE! Stockfish & Stamford approved! 🦁',
    'TOP BINS! What a tactical finish!',
    'Queen sacrifice for checkmate! Absolute masterclass!',
    'Pride of London, king of the chessboard!',
    'Clinical finish! You just broke their defense!',
  ],
  wrong_answer: [
    'Tactical blunder ?? Shake it off and tighten the defense!',
    'A slip on the pitch. Concede a corner, but win the match!',
    'No panic, Grandmaster. Counter-attack on the next move!',
    'Down an exchange, but the match is far from over!',
  ],
  speed_mode: [
    'RAPID BLITZ ACCURACY! Hikaru would applaud! ⚡',
    'Pre-moving like a 2800 ELO Grandmaster!',
    'Bullet reflexes! Clinical pace and zero hesitation!',
    'Sub-second execution! You’re flying down the wing!',
  ],
  low_time: [
    'TIME SCRAMBLE! Flag fall in seconds! MOVE!',
    'CLOCK UNDER 30s! Trust your instincts and play!',
    'Don’t get flagged on the clock! Make your move!',
    'Final seconds! Channel the 90th-minute winner energy!',
  ],
  tough: [
    'GRANDMASTER ENDGAME: 30 PTS CHECKMATE PUZZLE! ♚',
    'Heavy tactics required! Find the only winning line!',
    'Move 5: This is where true Grandmasters claim the crown!',
    'Stamford endgame: no room for second best, execute!',
  ],
  victory: [
    'CHECKMATE! LIFT THE TROPHY! 🏆 🦁',
    'Grandmaster performance! The Blues are victorious!',
    'A clean sheet on the board! Flawless tactical play!',
    'King of the arena! Stand proud at the top of the table!',
  ],
  defeat: [
    'Tough match. Review your game analysis and run it back.',
    'Even the greatest champions lose matches. Come back stronger.',
    'Study the game review below and prep for the rematch!',
  ],
  leaderboard: [
    'The Champions table is updated live every 5s.',
    'See where your rating stands among the elite.',
    'Can anyone knock you off the summit? Check the table!',
  ],
};

// ── EASTER EGG CLICK DIALOGUES ──
export const CODER_CLICK_EGGS: string[] = [
  'Don’t touch my bracket ears! They compile in O(1)! ⚡',
  'Whoa! sudo apt-get update in progress!',
  'I run on 100% TypeScript and zero memory leaks.',
  'Tip: use 1, 2, 3, 4 number keys to instantly pick options!',
  'BitByte // GKR-01 loves Geekroom GTBIT! 🚀',
];

export const CHELSEA_CHESS_CLICK_EGGS: string[] = [
  'Careful with my golden crown! Grandmaster gear is fragile! 👑',
  'En passant is always forced! ♟️',
  'Blue is the colour, football & chess are the game! 🦁',
  'Wearing #26 with pride — John Terry defensive grit!',
  'Stockfish 17 gave that move two exclamation marks: !!',
];

export function getMascotDialogue(mood: BitByteMood, type: MascotType = 'coder'): string {
  const pool = type === 'chelsea_chess' ? CHELSEA_CHESS_DIALOGUES : CODER_DIALOGUES;
  const list = pool[mood] || pool.idle;
  return list[Math.floor(Math.random() * list.length)];
}

export function getRandomClickDialogue(type: MascotType = 'coder'): string {
  const list = type === 'chelsea_chess' ? CHELSEA_CHESS_CLICK_EGGS : CODER_CLICK_EGGS;
  return list[Math.floor(Math.random() * list.length)];
}

// Backward compatibility alias
export const getBitByteDialogue = (mood: BitByteMood) => getMascotDialogue(mood, 'coder');
