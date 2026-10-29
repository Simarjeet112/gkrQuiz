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
    'System ready. BitByte // GKR-01 online with Chelsea & Madrid vibes!',
    'Welcome to Geekroom Arena! Dribble like Hazard, cover like Kanté, finish like CR7! ⚽',
    'Think 3 moves ahead, solve cleanly, checkmate the leaderboard! ♚',
    'Cristiano Ronaldo mentality activated: 100% focus, zero excuses!',
    'Eden Hazard silky flow loaded. Time to code with pure joy! 🪄',
    'N’Golo Kanté engine online: 100% stamina and clean execution! ⚡',
  ],
  idle: [
    'Compiling candidate logic... 0 errors, 0 warnings.',
    'Channeling Kanté: intercepting every exception with 0 fouls! ⚡',
    'Eden Hazard rhythm: stay calm and weave through the logic.',
    'CR7 Calma mode: heart rate 60bpm, focus 100%. ⚽',
    'Think 3 moves ahead before committing your answer.',
    'BitByte ping: 12ms. Stamford Bridge & Bernabéu telemetry synced.',
  ],
  thinking: [
    'Analyze the edge cases before committing.',
    'Cut into the half-space like Eden Hazard on the left flank! 🪄',
    'Control the central squares like a Chess Knight or N’Golo Kanté. ♞',
    'Check the recurrence relation. Trace it step by step.',
    'CR7 wouldn’t rush a penalty. Aim for the top corner with precision.',
    'Look at all options — think like a Grandmaster coder.',
  ],
  excited: [
    'SIUUUUU! 🏆 5x Ballon d’Or level execution!',
    'Eden Hazard solo run! Left all bugs behind! 🪄',
    'N’Golo Kanté dispossessed the hardest question with ease! ⚡',
    'Algorithm executed in O(1) time! Pure Chelsea & Madrid class!',
    'Checkmate! That’s how a Grandmaster engineers logic! ♚',
  ],
  wrong_answer: [
    'Off the crossbar! Shake it off, channel CR7’s rebound mindset! ⚽',
    'Syntax error caught. Kanté will recover the ball for us!',
    'Eden Hazard says: keep playing with joy, you’ve got the next one! 🪄',
    'Null pointer caught. Regroup and execute move 2!',
  ],
  speed_mode: [
    'TURBO EXECUTION! Sub-second solve rate like prime CR7 on the counter! ⚽',
    '100% N’Golo Kanté work-rate! You are covering 70% of the board yourself! ⚡',
    'Hazard dribble flow! Nobody can touch your compiler right now! 🪄',
    'High-throughput logic! You’re typing in assembly!',
  ],
  low_time: [
    'CLOCK TICK CRITICAL! 90th minute Champions League stoppage time!',
    'Drogba 88th-minute header energy needed right now! Focus!',
    'Cristiano in extra-time: ice in the veins, lock in your answer! ⚽',
    'Buffer running dry! Commit your choice!',
  ],
  tough: [
    'FINAL LEVEL: Grandmaster Endgame & Champions League Final! ♚',
    'Warning: Deep complexity ahead — channel your inner Ronaldo & Hazard!',
    '30 points on the line! Kanté-level stamina required here.',
    'Tough tier unlocked! Calculate cache evictions and edge cases.',
  ],
  victory: [
    'BALLON D’OR WINNER! Flawless compilation! SIUUUUU! 🏆',
    'Champions of Europe! Real Madrid 15x & Chelsea 2x royalty!',
    'Eden Hazard & Kanté salute your engineering brilliance! 🪄⚡',
    'Maximum score registered in the GTBIT ledger!',
  ],
  defeat: [
    'Good execution cycle. Run a code review and re-test.',
    'Even the greatest teams regroup for the second leg. Return stronger!',
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
  '70% of the Earth is covered by water, the rest by N’Golo Kanté and BitByte! ⚡',
  'Eden Hazard just completed a 1v4 body-feint past your bugs! 🪄',
  'Cristiano Ronaldo says: CALMA! Focus on the code and hit SIUUU! ⚽',
  'Stamford Bridge blue + Bernabéu gold + Geekroom lime = Ultimate Arena! 💙🤍💚',
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
