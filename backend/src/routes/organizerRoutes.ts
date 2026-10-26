import { Router, Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { getDB } from '../db/connection.js';

const router = Router();
const db = getDB();

const ORGANIZER_PASSCODE = process.env.ORGANIZER_PASSCODE || 'geekroom2026';

// Middleware to verify organizer passcode
export function requireOrganizer(req: Request, res: Response, next: NextFunction) {
  const passcode = req.headers['x-organizer-passcode'] || req.query.passcode;
  if (!passcode || passcode !== ORGANIZER_PASSCODE) {
    return res.status(401).json({
      success: false,
      error: 'Invalid or missing organizer passcode.',
    });
  }
  next();
}

// POST /api/organizer/verify - Verify passcode
router.post('/verify', (req: Request, res: Response) => {
  const { passcode } = req.body;
  if (!passcode || passcode !== ORGANIZER_PASSCODE) {
    return res.status(401).json({ success: false, error: 'Incorrect organizer passcode.' });
  }
  res.json({ success: true, message: 'Passcode verified.' });
});

// Protect all following routes
router.use(requireOrganizer);

// GET /api/organizer/stats - Overview statistics
router.get('/stats', async (_req: Request, res: Response) => {
  try {
    const counts = await db.query<{ difficulty: string; is_active: number; count: number }>(
      'SELECT difficulty, is_active, COUNT(*) as count FROM questions GROUP BY difficulty, is_active'
    );

    const breakdown = {
      easy: { active: 0, inactive: 0, total: 0 },
      medium: { active: 0, inactive: 0, total: 0 },
      tough: { active: 0, inactive: 0, total: 0 },
    };

    counts.forEach((c) => {
      const diff = c.difficulty as 'easy' | 'medium' | 'tough';
      if (breakdown[diff]) {
        if (c.is_active === 1) breakdown[diff].active += c.count;
        else breakdown[diff].inactive += c.count;
        breakdown[diff].total += c.count;
      }
    });

    const participants = await db.getOne<{ count: number }>('SELECT COUNT(*) as count FROM participants');
    const attempts = await db.getOne<{ count: number }>("SELECT COUNT(*) as count FROM quiz_attempts WHERE status IN ('completed', 'expired')");

    res.json({
      success: true,
      data: {
        breakdown,
        total_questions: breakdown.easy.total + breakdown.medium.total + breakdown.tough.total,
        total_participants: participants?.count || 0,
        total_completed_attempts: attempts?.count || 0,
      },
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/organizer/questions - View questions with filters
router.get('/questions', async (req: Request, res: Response) => {
  try {
    const { difficulty, search } = req.query;
    let sql = 'SELECT * FROM questions WHERE 1=1';
    const params: any[] = [];

    if (difficulty && typeof difficulty === 'string' && difficulty !== 'all') {
      sql += ' AND difficulty = ?';
      params.push(difficulty.toLowerCase());
    }

    if (search && typeof search === 'string') {
      sql += ' AND (text LIKE ? OR category LIKE ?)';
      params.push(`%${search.trim()}%`, `%${search.trim()}%`);
    }

    sql += ' ORDER BY CASE difficulty WHEN "easy" THEN 1 WHEN "medium" THEN 2 WHEN "tough" THEN 3 ELSE 4 END, created_at ASC';

    const rows = await db.query(sql, params);
    const parsed = rows.map((r: any) => ({
      ...r,
      options: typeof r.options === 'string' ? JSON.parse(r.options) : r.options,
      is_active: r.is_active === 1,
    }));

    res.json({ success: true, data: parsed });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/organizer/questions - Add new question
router.post('/questions', async (req: Request, res: Response) => {
  try {
    const { text, difficulty, category, options, correct_answer, explanation, code_snippet } = req.body;

    if (!text || !difficulty || !category || !options || !correct_answer || !explanation) {
      return res.status(400).json({ success: false, error: 'All fields are required.' });
    }

    if (!Array.isArray(options) || options.length !== 4) {
      return res.status(400).json({ success: false, error: 'Exactly 4 answer options are required.' });
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

// PUT /api/organizer/questions/:id - Edit question
router.put('/questions/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { text, difficulty, category, options, correct_answer, explanation, code_snippet, is_active } = req.body;

    const existing = await db.getOne('SELECT id FROM questions WHERE id = ?', [id]);
    if (!existing) {
      return res.status(404).json({ success: false, error: 'Question not found.' });
    }

    if (options && (!Array.isArray(options) || options.length !== 4)) {
      return res.status(400).json({ success: false, error: 'Exactly 4 answer options are required.' });
    }

    if (options && correct_answer && !options.includes(correct_answer)) {
      return res.status(400).json({ success: false, error: 'Correct answer must match one of the options.' });
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

// DELETE /api/organizer/questions/:id - Delete question
router.delete('/questions/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await db.run('DELETE FROM questions WHERE id = ?', [id]);
    res.json({ success: true, message: 'Question deleted successfully.' });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/organizer/config - Get event configuration
router.get('/config', async (_req: Request, res: Response) => {
  try {
    const rows = await db.query<{ config_key: string; config_value: string }>(
      'SELECT config_key, config_value FROM event_config'
    );
    const map: Record<string, string> = {};
    rows.forEach((r) => {
      map[r.config_key] = r.config_value;
    });
    res.json({ success: true, data: map });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /api/organizer/config - Update configuration
router.put('/config', async (req: Request, res: Response) => {
  try {
    const updates = req.body;
    for (const [key, val] of Object.entries(updates)) {
      const existing = await db.getOne('SELECT config_key FROM event_config WHERE config_key = ?', [key]);
      if (existing) {
        await db.run('UPDATE event_config SET config_value = ? WHERE config_key = ?', [String(val), key]);
      } else {
        await db.run('INSERT INTO event_config (config_key, config_value) VALUES (?, ?)', [key, String(val)]);
      }
    }
    res.json({ success: true, message: 'Configurations saved.' });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/organizer/export-csv - Export question bank CSV
router.get('/export-csv', async (_req: Request, res: Response) => {
  try {
    const questions = await db.query<any>('SELECT * FROM questions ORDER BY difficulty, created_at');
    const headers = ['ID', 'Difficulty', 'Category', 'Question', 'Option A', 'Option B', 'Option C', 'Option D', 'Correct Answer', 'Explanation', 'Status'];
    const rows = questions.map((q) => {
      const opts = typeof q.options === 'string' ? JSON.parse(q.options) : q.options;
      return [
        q.id,
        q.difficulty.toUpperCase(),
        `"${(q.category || '').replace(/"/g, '""')}"`,
        `"${(q.text || '').replace(/"/g, '""')}"`,
        `"${(opts[0] || '').replace(/"/g, '""')}"`,
        `"${(opts[1] || '').replace(/"/g, '""')}"`,
        `"${(opts[2] || '').replace(/"/g, '""')}"`,
        `"${(opts[3] || '').replace(/"/g, '""')}"`,
        `"${(q.correct_answer || '').replace(/"/g, '""')}"`,
        `"${(q.explanation || '').replace(/"/g, '""')}"`,
        q.is_active ? 'ACTIVE' : 'INACTIVE',
      ];
    });

    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=geekroom_question_bank.csv');
    res.send(csv);
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/organizer/reset-attempts - Reset participant and attempt data
router.post('/reset-attempts', async (req: Request, res: Response) => {
  try {
    const { confirmPhrase } = req.body;
    if (confirmPhrase !== 'RESET ARENA') {
      return res.status(400).json({
        success: false,
        error: 'Confirmation phrase must exactly equal "RESET ARENA".',
      });
    }

    await db.transaction(async (tx) => {
      await tx.run('DELETE FROM attempt_questions;');
      await tx.run('DELETE FROM quiz_attempts;');
      await tx.run('DELETE FROM participants;');
    });

    res.json({ success: true, message: 'All participants and quiz attempts have been purged. Question bank preserved.' });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
