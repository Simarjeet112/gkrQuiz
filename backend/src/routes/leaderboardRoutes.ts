import { Router, Request, Response } from 'express';
import { LeaderboardService } from '../services/leaderboardService.js';

const router = Router();
const leaderboardService = new LeaderboardService();

// GET /api/leaderboard - Real persistent leaderboard
router.get('/', async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string, 10) || 100;
    const leaderboard = await leaderboardService.getLeaderboard(limit);
    res.json({
      success: true,
      data: leaderboard,
      total: leaderboard.length,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
