// Dialogue pool and contextual generator for BitByte // GKR-01 (Geekroom Coder Bot)

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
    'System ready. BitByte // GKR-01 online!',
    'Welcome to Geekroom Code Arena. Ready to compile?',
    'Think 3 moves ahead, solve cleanly, checkmate the leaderboard!',
    'Algorithms loaded. Let’s solve this cleanly.',
    'Terminal active. Keep your code modular and your mind sharp.',
    'GTBIT Orientation 2026 — time to push to production!',
  ],
  idle: [
    'Compiling candidate logic... 0 errors, 0 warnings.',
    'Stack or Queue? Always pick the optimal data structure.',
    'Keep that time complexity tight — O(1) is the goal.',
    'Think 3 moves ahead before committing your answer.',
    'Waiting on your input, fellow engineer.',
    'BitByte ping: 12ms. All systems operational.',
  ],
  thinking: [
    'Analyze the edge cases before committing.',
    'Check the recurrence relation. Trace it step by step.',
    'Is it LIFO or FIFO? Remember your data structures.',
    'Careful with index bounds. No off-by-one errors here.',
    'Break down the problem into smaller subproblems.',
    'Look at all options — think like a Grandmaster coder.',
  ],
  excited: [
    'CLEAN CODE! All test cases passed! ⚡',
    'Algorithm executed in O(1) time! Brilliant!',
    'No bugs, pure engineering mastery!',
    'Stack allocation verified! +points secured!',
    'Brilliant move! That’s how senior engineers write logic!',
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
    'CLOCK TICK CRITICAL! Under 30s remaining!',
    'STACK OVERFLOW RISK! Timer running out, execute now!',
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

export const BITBYTE_CLICK_EGGS: string[] = [
  'Don’t touch my bracket ears! They compile in O(1)! ⚡',
  'Whoa! sudo apt-get update in progress!',
  'I run on 100% TypeScript and zero memory leaks.',
  'Tip: use 1, 2, 3, 4 number keys to instantly pick options!',
  'BitByte // GKR-01 loves Geekroom GTBIT! 🚀',
  'Think 3 moves ahead on every problem!',
];

export function getMascotDialogue(mood: BitByteMood): string {
  const list = BITBYTE_DIALOGUES[mood] || BITBYTE_DIALOGUES.idle;
  return list[Math.floor(Math.random() * list.length)];
}

export function getRandomClickDialogue(): string {
  return BITBYTE_CLICK_EGGS[
    Math.floor(Math.random() * BITBYTE_CLICK_EGGS.length)
  ];
}

// Backward-compat aliases
export const getBitByteDialogue = getMascotDialogue;
export type MascotType = 'coder';
