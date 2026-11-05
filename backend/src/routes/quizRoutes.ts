import { Router, Request, Response } from 'express';
import { QuizService } from '../services/quizService.js';
import { AIService } from '../services/aiService.js';

const router = Router();
const quizService = new QuizService();
const aiService = new AIService();

// GET /api/quiz/config - Public configuration
router.get('/config', async (_req: Request, res: Response) => {
  try {
    const duration = await quizService.getConfig('quiz_duration_minutes', '5');
    const allowMultiple = await quizService.getConfig('allow_multiple_attempts', 'false');
    const requireRoll = await quizService.getConfig('require_roll_number', 'false');
    const title = await quizService.getConfig('event_title', 'GEEKROOM // CODE ARENA');

    res.json({
      success: true,
      data: {
        quiz_duration_minutes: parseInt(duration, 10) || 5,
        allow_multiple_attempts: allowMultiple === 'true',
        require_roll_number: requireRoll === 'true',
        event_title: title,
        points: { easy: 10, medium: 20, tough: 30, max_score: 90 },
      },
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/quiz/start - Start or resume a quiz attempt
router.post('/start', async (req: Request, res: Response) => {
  try {
    const displayName = req.body.displayName || req.body.display_name;
    const participantCode = req.body.participantCode || req.body.participant_code;
    const track = req.body.track || 'code';
    const difficulty = req.body.difficulty || req.body.difficulty_mode;
    const questionCount = req.body.questionCount || req.body.question_count || 5;
    if (!displayName || typeof displayName !== 'string' || !displayName.trim()) {
      return res.status(400).json({ success: false, error: 'Player name is required.' });
    }

    const result = await quizService.startQuiz(
      displayName,
      participantCode,
      track,
      difficulty,
      Number(questionCount)
    );
    res.status(201).json({ success: true, data: result });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// GET /api/quiz/attempts/:attemptId - Get ongoing attempt data (does NOT expose correct answers)
router.get('/attempts/:attemptId', async (req: Request, res: Response) => {
  try {
    const { attemptId } = req.params;
    const result = await quizService.getAttempt(attemptId);
    res.json({ success: true, data: result });
  } catch (err: any) {
    res.status(404).json({ success: false, error: err.message });
  }
});

// POST /api/quiz/attempts/:attemptId/progress - Save selected answers as player progresses
router.post('/attempts/:attemptId/progress', async (req: Request, res: Response) => {
  try {
    const { attemptId } = req.params;
    const { answers } = req.body;
    if (!answers || typeof answers !== 'object') {
      return res.status(400).json({ success: false, error: 'Answers object is required.' });
    }

    await quizService.saveProgress(attemptId, answers);
    res.json({ success: true, message: 'Progress saved successfully.' });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// POST /api/quiz/attempts/:attemptId/submit - Final submission of attempt
router.post('/attempts/:attemptId/submit', async (req: Request, res: Response) => {
  try {
    const { attemptId } = req.params;
    const { answers } = req.body;
    const results = await quizService.submitQuiz(attemptId, answers || {});
    res.json({ success: true, data: results });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// GET /api/quiz/attempts/:attemptId/results - Get complete review & results
router.get('/attempts/:attemptId/results', async (req: Request, res: Response) => {
  try {
    const { attemptId } = req.params;
    const results = await quizService.getResults(attemptId);
    res.json({ success: true, data: results });
  } catch (err: any) {
    res.status(404).json({ success: false, error: err.message });
  }
});

// POST /api/quiz/attempts/:attemptId/ai-analysis - Gemini AI Tactical Scouting Report
router.post('/attempts/:attemptId/ai-analysis', async (req: Request, res: Response) => {
  try {
    const { attemptId } = req.params;
    const results = await quizService.getResults(attemptId);

    const accuracyPct =
      results.total_questions > 0
        ? Math.round((results.correct_count / results.total_questions) * 100)
        : 0;

    const report = await aiService.generateMatchReport({
      playerName: results.participant.display_name,
      track: (results as any).track || 'code',
      score: results.total_score,
      maxScore: results.max_score,
      accuracyPct,
      timeTakenSeconds: results.time_taken_seconds,
      totalQuestions: results.total_questions,
      easyCorrect: results.difficulty_breakdown.easy.correct,
      mediumCorrect: results.difficulty_breakdown.medium.correct,
      toughCorrect: results.difficulty_breakdown.tough.correct,
    });

    res.json({ success: true, data: report });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
