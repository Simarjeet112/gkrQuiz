import dotenv from 'dotenv';
dotenv.config();

export interface AIAnalysisResult {
  headline: string;
  oasisQuote: string;
  managerRating: number;
  managerPersona: string;
  tacticalSummary: string;
  strengths: string[];
  weaknesses: string[];
  fifaCardTitle: string;
  scoutVerdict: string;
}

export interface PlayerMatchStats {
  playerName: string;
  track: string;
  score: number;
  maxScore: number;
  accuracyPct: number;
  timeTakenSeconds: number;
  totalQuestions: number;
  easyCorrect: number;
  mediumCorrect: number;
  toughCorrect: number;
}

export class AIService {
  private apiKey: string;
  private model: string;

  constructor() {
    this.apiKey = process.env.LLM_API_KEY || '';
    this.model = process.env.LLM_MODEL || 'gemini-2.5-flash';
  }

  async generateMatchReport(stats: PlayerMatchStats): Promise<AIAnalysisResult> {
    const isFootball = stats.track === 'ronaldo' || stats.track === 'football' || stats.track === 'legends';
    const isDark = stats.track === 'dark' || stats.track === 'winden';

    const manager = isFootball
      ? 'Carlo Ancelotti & Zinedine Zidane'
      : isDark
      ? 'H.G. Tannhaus & Claudia Tiedemann'
      : 'Garry Kasparov & Linus Torvalds';

    const prompt = `
You are the legendary Chief Scout and Tactical Analyst at the intersection of 90s British Rock (Oasis vibes), Santiago Bernabéu royal pedigree, and Stamford Bridge grit.
Analyze this player's performance:
- Player: "${stats.playerName}"
- Arena Track: "${stats.track}" (${isFootball ? 'CR7 & Football Legends' : isDark ? 'Netflix DARK Winden Knot' : 'Geekroom Code & Chess'})
- Score: ${stats.score} / ${stats.maxScore} (${stats.accuracyPct}% accuracy)
- Time Taken: ${stats.timeTakenSeconds} seconds for ${stats.totalQuestions} questions
- Breakdown: Easy (${stats.easyCorrect}), Medium (${stats.mediumCorrect}), Tough (${stats.toughCorrect})
- Key mentors: ${manager}

Respond in ONLY valid JSON (no markdown formatting, no code blocks, just raw JSON) matching this exact schema:
{
  "headline": "A punchy, electric 6-10 word headline with Oasis/Madrid/Chelsea/Winden swagger",
  "oasisQuote": "An authentic Oasis lyric quote that matches their score (e.g. from Wonderwall, Don't Look Back In Anger, Champagne Supernova, or Live Forever)",
  "managerRating": <integer between 60 and 99 reflecting their performance>,
  "managerPersona": "${manager}",
  "tacticalSummary": "2-3 sentences of sharp tactical scout evaluation blending football/sci-fi grit, clutch mentality, and performance breakdown.",
  "strengths": ["Strength 1", "Strength 2", "Strength 3"],
  "weaknesses": ["Area to polish 1", "Area to polish 2"],
  "fifaCardTitle": "e.g. BALLON D'OR CONTENDER, BERNABÉU GALÁCTICO, SIC MUNDUS TRAVELER, GRANDMASTER ARCHITECT",
  "scoutVerdict": "Final 1-sentence verdict on whether they are signed to the first team or entered into legend."
}
`;

    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${this.apiKey}`;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000);

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 800,
          },
        }),
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
        const cleanJson = rawText.replace(/^```json/i, '').replace(/^```/i, '').replace(/```$/i, '').trim();
        const parsed = JSON.parse(cleanJson);
        return {
          headline: parsed.headline || `${stats.playerName}: Matchday Masterclass`,
          oasisQuote: parsed.oasisQuote || '"Because maybe, you\'re gonna be the one that saves me..." — Wonderwall',
          managerRating: Math.min(99, Math.max(70, Number(parsed.managerRating) || 88)),
          managerPersona: parsed.managerPersona || manager,
          tacticalSummary: parsed.tacticalSummary || 'Clinical decision making under high stadium pressure.',
          strengths: Array.isArray(parsed.strengths) ? parsed.strengths.slice(0, 3) : ['Clutch under pressure', 'Rapid reaction time', 'Tactical awareness'],
          weaknesses: Array.isArray(parsed.weaknesses) ? parsed.weaknesses.slice(0, 2) : ['Sustain tempo in extra time', 'Tough question precision'],
          fifaCardTitle: parsed.fifaCardTitle || (isFootball ? 'BERNABÉU GALÁCTICO' : isDark ? 'SIC MUNDUS TRAVELER' : 'GRANDMASTER ARCHITECT'),
          scoutVerdict: parsed.scoutVerdict || 'Signed to the starting XI with immediate effect. Pure class.',
        };
      }
    } catch (err) {
      console.warn('[AIService] Gemini API call fell back to deterministic generator:', (err as Error).message);
    }

    // High quality deterministic fallback matching the exact vibe
    return this.getFallbackReport(stats, isFootball, isDark, manager);
  }

  private getFallbackReport(
    stats: PlayerMatchStats,
    isFootball: boolean,
    isDark: boolean,
    manager: string
  ): AIAnalysisResult {
    const pct = stats.accuracyPct;
    let quote = '"Because maybe, you\'re gonna be the one that saves me..." — Wonderwall';
    let headline = `${stats.playerName}: Pure Santiago Bernabéu Poise`;
    let rating = 75;
    let cardTitle = isFootball ? 'BRIDGE & BERNABÉU HERO' : isDark ? 'WINDEN TRAVELER' : 'CODE GRANDMASTER';

    if (pct >= 80) {
      quote = '"Tonight, I\'m a rock \'n\' roll star!" — Rock \'n\' Roll Star, Oasis';
      headline = `${stats.playerName}: Historic Masterclass at the Highest Level`;
      rating = Math.min(99, 90 + Math.round((pct - 80) / 2));
      cardTitle = isFootball ? 'BALLON D\'OR CONTENDER' : isDark ? 'SIC MUNDUS MASTER' : 'PRINCIPAL ARCHITECT';
    } else if (pct >= 50) {
      quote = '"Don\'t look back in anger, I heard you say." — Oasis';
      headline = `${stats.playerName}: Relentless Kanté Engine with Tactical Precision`;
      rating = 80 + Math.round((pct - 50) / 3);
      cardTitle = isFootball ? 'CHELSEA BLUE ENGINE' : isDark ? 'TIME KNOT SURVIVOR' : 'SENIOR FULLSTACK';
    } else {
      quote = '"Some might say we will find a brighter day." — Oasis';
      headline = `${stats.playerName}: Showing True Grit in a Hostile Away Fixture`;
      rating = 72 + Math.round(pct / 5);
      cardTitle = isFootball ? 'RISING ACADEMY PROSPECT' : isDark ? 'CAVE EXPLORER' : 'JUNIOR APPRENTICE';
    }

    return {
      headline,
      oasisQuote: quote,
      managerRating: rating,
      managerPersona: manager,
      tacticalSummary: isFootball
        ? `Delivered an assertive tactical shift reminiscent of Real Madrid's Champions League knockout nights. With ${stats.accuracyPct}% precision, ${stats.playerName} absorbed midfield pressing with N'Golo Kanté-like stamina and found the breakthrough.`
        : isDark
        ? `Navigated the treacherous 33-year Winden causal loop with sharp intuition. Unraveled ${stats.totalQuestions} paradoxes while keeping composure inside the radioactive cave passages.`
        : `Executed rigorous algorithmic calculations with steady latency. Solved data structure bottlenecks with grandmaster positional foresight.`,
      strengths: [
        `${stats.accuracyPct}% decision precision under countdown pressure`,
        `${stats.toughCorrect > 0 ? 'Clutch delivery on Tough questions' : 'Rapid baseline execution'}`,
        'Mental stamina matching Eden Hazard in full flow',
      ],
      weaknesses: [
        'Fine-tune transition speed during the final third',
        'Consolidate recall for deep historical and theoretical edge cases',
      ],
      fifaCardTitle: cardTitle,
      scoutVerdict: `${stats.playerName} has earned unanimous respect from the coaching staff. Ready for the grand finals.`,
    };
  }
}
