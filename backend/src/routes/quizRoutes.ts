import { Router, Request, Response } from 'express';
import { QuizService } from '../services/quizService.js';

const router = Router();
const quizService = new QuizService();

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
        points: { easy: 10, medium: 20, hard: 30, max_score: 90 },
      },
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/quiz/start - Start or resume a quiz attempt
router.post('/start', async (req: Request, res: Response) => {
  try {
    const { displayName, participantCode } = req.body;
    if (!displayName || typeof displayName !== 'string' || !displayName.trim()) {
      return res.status(400).json({ success: false, error: 'Player name is required.' });
    }

    const result = await quizService.startQuiz(displayName, participantCode);
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

export default router;
