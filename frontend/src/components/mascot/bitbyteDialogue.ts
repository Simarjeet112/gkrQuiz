// Dialogue pool and contextual generator for BitByte // GKR-01 (Chess Grandmaster Edition)

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
    'yo challenger, ready to cook? 1. e4 best by test.',
    'BitByte online! Think 3 moves ahead.',
    'welcome to Geekroom Code Arena // Grandmaster Sector.',
    'GTBIT Orientation 2026 — time to dominate the board!',
    'hands on the keyboard, Deep Blue calculations engaged.',
  ],
  idle: [
    'calculating candidate moves... ready when you are.',
    'BitByte eval: +1.4 advantage. Your move, challenger.',
    'think fast. code smart. checkmate the arena.',
    'waiting on your move, Grandmaster.',
    'GTBIT geek tactical depth: 100%.',
  ],
  thinking: [
    'opening theory. don’t overthink it.',
    'hmmm... calculate the branch variants.',
    'look at all candidate moves before clicking!',
    'positional play or tactical strike?',
    'trust your algorithms intuition.',
    'no panic, Stockfish engine sees a path.',
  ],
  excited: [
    '!! BRILLIANT MOVE! Stockfish approved! 🔥',
    'THAT’S MY GRANDMASTER!',
    'QUEEN SACRIFICE FOR THE WIN!',
    'boom! +points secured, absolute positional squeeze!',
    'pure algorithmic checkmate sequence.',
    'laser calculation! Magnus Carlsen would be proud!',
  ],
  wrong_answer: [
    'bro played a blunder ?? 💀',
    'tactical oversight. but the game isn’t over!',
    'a momentary inaccuracy. bounce back in the middlegame!',
    'no worries, shake it off and find the counterplay!',
    'down a pawn, but we play for the counter-attack.',
  ],
  speed_mode: [
    'BLITZ GRANDMASTER! ⚡',
    'bullet chess reflexes on point! Fast & deadly.',
    'pre-moving through the arena!',
    'sub-second calculation?! You’re Hikaru Nakamura mode!',
    'maximum velocity clock play!',
  ],
  low_time: [
    'TIME TROUBLE! Blitz clock under 30s! MOVE!',
    'FLAG FALL IMMINENT! LOCK IN YOUR MOVE!',
    'DON’T GET FLAGGED! GUESS AND PLAY!',
    'rapid time scramble! Execute the winning move!',
    'time’s falling! Fire your answer now!',
  ],
  tough: [
    'FINAL ENDGAME: GRANDMASTER BOSS MOVE INCOMING! ♚',
    'WARNING: Queen endgame calculations required!',
    '30 points on the line! This separates the GMs from the amateurs.',
    'deep calculation required — find the only winning move!',
  ],
  victory: [
    'GRANDMASTER STATUS ACHIEVED! 👑 ♚',
    'ABSOLUTE CHECKMATE! What an endgame masterclass!',
    '90 points potential! You conquered the chessboard!',
    'Geekroom GTBIT honors your 2800+ performance rating!',
    'legendary chess engine precision!',
  ],
  defeat: [
    'good battle. review your game analysis and run it back.',
    'even Kasparov lost games. study the game review!',
    'every grandmaster was once a beginner who never quit.',
    'analyze your blunders below to level up your rating.',
  ],
  leaderboard: [
    'the FIDE / Arena leaderboards are waiting for you.',
    'see your name on the Grandmaster Hall of Fame!',
    'top rating telemetry verified.',
    'can anyone challenge your crown? Check the rankings!',
  ],
};

export const BITBYTE_CLICK_EASTER_EGGS: string[] = [
  'en passant is always forced! ♟️',
  'whoa! don’t touch my tactical orbital ears!',
  'I’m running Stockfish 17 with 100% caffeine.',
  'pro-tip: use number keys 1, 2, 3, 4 to pre-move your answers!',
  'BitByte plays 1. d4 when feeling spicy. ♟️',
  'BitByte loves Geekroom GTBIT! 🚀',
];

export function getBitByteDialogue(mood: BitByteMood): string {
  const list = BITBYTE_DIALOGUES[mood] || BITBYTE_DIALOGUES.idle;
  return list[Math.floor(Math.random() * list.length)];
}

export function getRandomClickDialogue(): string {
  return BITBYTE_CLICK_EASTER_EGGS[
    Math.floor(Math.random() * BITBYTE_CLICK_EASTER_EGGS.length)
  ];
}

