import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { getDB } from '../db/connection.js';
import { requireAdmin, generateAdminToken, AdminAuthRequest } from '../middleware/auth.js';
import { LeaderboardService } from '../services/leaderboardService.js';
import { QuizService } from '../services/quizService.js';

const router = Router();
const db = getDB();
const leaderboardService = new LeaderboardService(db);
const quizService = new QuizService(db);

// POST /api/admin/login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { usernameOrEmail, password } = req.body;
    if (!usernameOrEmail || !password) {
      return res.status(400).json({ success: false, error: 'Email/Username and password are required.' });
    }

    const admin = await db.getOne<{
      id: string;
      username: string;
      email: string;
      password_hash: string;
      role: string;
    }>('SELECT * FROM admins WHERE email = ? OR username = ?', [usernameOrEmail, usernameOrEmail]);

    if (!admin) {
      return res.status(401).json({ success: false, error: 'Invalid admin credentials.' });
    }

    const isMatch = await bcrypt.compare(password, admin.password_hash);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid admin credentials.' });
    }

    const token = generateAdminToken({ id: admin.id, email: admin.email, role: admin.role });

    res.json({
      success: true,
      data: {
        token,
        admin: {
          id: admin.id,
          username: admin.username,
          email: admin.email,
          role: admin.role,
        },
      },
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Protected routes below
router.use(requireAdmin);

// GET /api/admin/metrics - Event statistics
router.get('/metrics', async (_req: AdminAuthRequest, res: Response) => {
  try {
    const participantsCount = await db.getOne<{ count: number }>(
      'SELECT COUNT(*) as count FROM participants'
    );
    const completedAttempts = await db.getOne<{ count: number; avg_score: number; max_score: number; avg_time: number }>(
      `SELECT
         COUNT(*) as count,
         AVG(total_score) as avg_score,
         MAX(total_score) as max_score,
         AVG(time_taken_seconds) as avg_time
       FROM quiz_attempts
       WHERE status IN ('completed', 'expired')`
    );
    const inProgressAttempts = await db.getOne<{ count: number }>(
      `SELECT COUNT(*) as count FROM quiz_attempts WHERE status = 'in_progress'`
    );
    const totalQuestions = await db.getOne<{ count: number }>(
      `SELECT COUNT(*) as count FROM questions WHERE is_active = 1`
    );

    res.json({
      success: true,
      data: {
        total_participants: participantsCount?.count || 0,
        completed_attempts: completedAttempts?.count || 0,
        in_progress_attempts: inProgressAttempts?.count || 0,
        average_score: Math.round((completedAttempts?.avg_score || 0) * 10) / 10,
        highest_score: completedAttempts?.max_score || 0,
        average_time_seconds: Math.round(completedAttempts?.avg_time || 0),
        active_questions: totalQuestions?.count || 0,
      },
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/admin/attempts - List attempts with participant info and search
router.get('/attempts', async (req: AdminAuthRequest, res: Response) => {
  try {
    const search = (req.query.search as string) || '';
    const status = (req.query.status as string) || '';

    let sql = `
      SELECT
        a.id,
        a.participant_id,
        p.display_name,
        p.participant_code,
        a.started_at,
        a.submitted_at,
        a.deadline_at,
        a.status,
        a.total_score,
        a.time_taken_seconds
      FROM quiz_attempts a
      JOIN participants p ON a.participant_id = p.id
      WHERE 1=1
    `;
    const params: any[] = [];

    if (search.trim()) {
      sql += ` AND (p.display_name LIKE ? OR p.participant_code LIKE ?)`;
      params.push(`%${search.trim()}%`, `%${search.trim()}%`);
    }

    if (status.trim()) {
      sql += ` AND a.status = ?`;
      params.push(status.trim());
    }

    sql += ` ORDER BY a.started_at DESC LIMIT 200`;

    const attempts = await db.query(sql, params);
    res.json({ success: true, data: attempts });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/admin/attempts/:attemptId - View detailed attempt review
router.get('/attempts/:attemptId', async (req: AdminAuthRequest, res: Response) => {
  try {
    const { attemptId } = req.params;
    const result = await quizService.getResults(attemptId);
    res.json({ success: true, data: result });
  } catch (err: any) {
    res.status(404).json({ success: false, error: err.message });
  }
});

// GET /api/admin/questions - List questions with filtering
router.get('/questions', async (req: AdminAuthRequest, res: Response) => {
  try {
    const difficulty = req.query.difficulty as string;
    const category = req.query.category as string;

    let sql = `SELECT * FROM questions WHERE 1=1`;
    const params: any[] = [];

    if (difficulty) {
      sql += ` AND difficulty = ?`;
      params.push(difficulty);
    }
    if (category) {
      sql += ` AND category = ?`;
      params.push(category);
    }

    sql += ` ORDER BY difficulty ASC, created_at DESC`;

    const rows = await db.query(sql, params);
    const parsed = rows.map((r: any) => ({
      ...r,
      options: typeof r.options === 'string' ? JSON.parse(r.options) : r.options,
      is_active: r.is_active === 1 || r.is_active === true,
    }));

    res.json({ success: true, data: parsed });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/admin/questions - Add a new question
router.post('/questions', async (req: AdminAuthRequest, res: Response) => {
  try {
    const { text, difficulty, category, options, correct_answer, explanation, code_snippet } = req.body;

    if (!text || !difficulty || !category || !options || !correct_answer || !explanation) {
      return res.status(400).json({ success: false, error: 'All question fields are required.' });
    }

    if (!Array.isArray(options) || options.length !== 4) {
      return res.status(400).json({ success: false, error: 'Exactly 4 options are required.' });
    }

    if (!options.includes(correct_answer)) {
      return res.status(400).json({ success: false, error: 'Correct answer must match one of the 4 options.' });
    }

    const id = 'q_' + crypto.randomUUID().slice(0, 12);
    await db.run(
      `INSERT INTO questions (id, text, difficulty, category, options, correct_answer, explanation, code_snippet, is_active, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, ?)`,
      [
        id,
        text.trim(),
        difficulty.toLowerCase(),
        category.trim(),
        JSON.stringify(options),
        correct_answer.trim(),
        explanation.trim(),
        code_snippet?.trim() || null,
        new Date().toISOString(),
      ]
    );

    res.status(201).json({ success: true, data: { id, message: 'Question created successfully.' } });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /api/admin/questions/:id - Edit question or toggle active status
router.put('/questions/:id', async (req: AdminAuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { text, difficulty, category, options, correct_answer, explanation, code_snippet, is_active } = req.body;

    const existing = await db.getOne('SELECT id FROM questions WHERE id = ?', [id]);
    if (!existing) {
      return res.status(404).json({ success: false, error: 'Question not found.' });
    }

    await db.run(
      `UPDATE questions
       SET text = COALESCE(?, text),
           difficulty = COALESCE(?, difficulty),
           category = COALESCE(?, category),
           options = COALESCE(?, options),
           correct_answer = COALESCE(?, correct_answer),
           explanation = COALESCE(?, explanation),
           code_snippet = ?,
           is_active = COALESCE(?, is_active)
       WHERE id = ?`,
      [
        text?.trim() || null,
        difficulty?.toLowerCase() || null,
        category?.trim() || null,
        options ? JSON.stringify(options) : null,
        correct_answer?.trim() || null,
        explanation?.trim() || null,
        code_snippet !== undefined ? (code_snippet ? code_snippet.trim() : null) : undefined,
        is_active !== undefined ? (is_active ? 1 : 0) : null,
        id,
      ]
    );

    res.json({ success: true, message: 'Question updated successfully.' });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /api/admin/questions/:id - Delete question
router.delete('/questions/:id', async (req: AdminAuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await db.run('DELETE FROM questions WHERE id = ?', [id]);
    res.json({ success: true, message: 'Question deleted successfully.' });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/admin/config - Get all configurations
router.get('/config', async (_req: AdminAuthRequest, res: Response) => {
  try {
    const configs = await db.query<{ config_key: string; config_value: string }>(
      'SELECT config_key, config_value FROM event_config'
    );
    const map: Record<string, string> = {};
    configs.forEach((c) => {
      map[c.config_key] = c.config_value;
    });
    res.json({ success: true, data: map });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /api/admin/config - Update configurations
router.put('/config', async (req: AdminAuthRequest, res: Response) => {
  try {
    const updates = req.body;
    if (!updates || typeof updates !== 'object') {
      return res.status(400).json({ success: false, error: 'Invalid config payload.' });
    }

    for (const [key, value] of Object.entries(updates)) {
      const existing = await db.getOne('SELECT config_key FROM event_config WHERE config_key = ?', [key]);
      if (existing) {
        await db.run('UPDATE event_config SET config_value = ? WHERE config_key = ?', [String(value), key]);
      } else {
        await db.run('INSERT INTO event_config (config_key, config_value) VALUES (?, ?)', [key, String(value)]);
      }
    }

    res.json({ success: true, message: 'Configurations updated successfully.' });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/admin/export-csv - Export participants & scores to CSV
router.get('/export-csv', async (_req: AdminAuthRequest, res: Response) => {
  try {
    const leaderboard = await leaderboardService.getLeaderboard(1000);

    const headers = ['Rank', 'Player Name', 'Participant Code / Roll', 'Score', 'Time Taken (s)', 'Status', 'Submitted At'];
    const rows = leaderboard.map((item) => [
      item.rank,
      `"${item.display_name.replace(/"/g, '""')}"`,
      `"${(item.participant_code || '').replace(/"/g, '""')}"`,
      item.total_score,
      item.time_taken_seconds,
      item.status,
      item.submitted_at,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=geekroom_code_arena_results.csv');
    res.status(200).send(csvContent);
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/admin/reset-data - Danger Zone: Reset event participants and attempts
router.post('/reset-data', async (req: AdminAuthRequest, res: Response) => {
  try {
    const { password, confirmPhrase } = req.body;
    if (confirmPhrase !== 'RESET ARENA') {
      return res.status(400).json({
        success: false,
        error: 'Confirmation phrase must exactly match "RESET ARENA".',
      });
    }

    const admin = await db.getOne<{ password_hash: string }>(
      'SELECT password_hash FROM admins WHERE id = ?',
      [req.admin!.id]
    );

    if (!admin || !(await bcrypt.compare(password, admin.password_hash))) {
      return res.status(403).json({ success: false, error: 'Incorrect administrator password.' });
    }

    await db.transaction(async (tx) => {
      await tx.run('DELETE FROM attempt_questions;');
      await tx.run('DELETE FROM quiz_attempts;');
      await tx.run('DELETE FROM participants;');
    });

    res.json({ success: true, message: 'All event attempts and participants have been reset.' });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
