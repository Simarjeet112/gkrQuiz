import crypto from 'crypto';
import { getDB, IDatabase } from '../db/connection.js';
import {
  PublicQuestion,
  QuizAttempt,
  QuizResultResponse,
  QuestionReviewItem,
  QuestionDifficulty,
} from '../types/index.js';

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export class QuizService {
  private db: IDatabase;

  constructor(db?: IDatabase) {
    this.db = db || getDB();
  }

  async getConfig(key: string, defaultValue: string): Promise<string> {
    const row = await this.db.getOne<{ config_value: string }>(
      'SELECT config_value FROM event_config WHERE config_key = ?',
      [key]
    );
    return row ? row.config_value : defaultValue;
  }

  async getPointsMap(): Promise<Record<QuestionDifficulty, number>> {
    const easy = parseInt(await this.getConfig('points_easy', '10'), 10) || 10;
    const medium = parseInt(await this.getConfig('points_medium', '20'), 10) || 20;
    const hard = parseInt(await this.getConfig('points_hard', '30'), 10) || 30;
    return { easy, medium, hard };
  }

  async startQuiz(
    displayName: string,
    participantCode?: string
  ): Promise<{
    attemptId: string;
    participantId: string;
    startedAt: string;
    deadlineAt: string;
    durationMinutes: number;
    questions: PublicQuestion[];
  }> {
    const trimmedName = displayName?.trim();
    if (!trimmedName) {
      throw new Error('Player name is required.');
    }

    const allowMultiple = (await this.getConfig('allow_multiple_attempts', 'false')) === 'true';
    const requireRoll = (await this.getConfig('require_roll_number', 'false')) === 'true';

    if (requireRoll && !participantCode?.trim()) {
      throw new Error('College roll number / participant ID is required.');
    }

    const durationMinutes = parseInt(await this.getConfig('quiz_duration_minutes', '5'), 10) || 5;

    // Check or create participant
    let participant = await this.db.getOne<{ id: string; display_name: string }>(
      'SELECT id, display_name FROM participants WHERE display_name = ?' +
        (participantCode ? ' AND participant_code = ?' : ''),
      participantCode ? [trimmedName, participantCode.trim()] : [trimmedName]
    );

    if (!participant) {
      const pId = 'p_' + crypto.randomUUID().slice(0, 12);
      await this.db.run(
        'INSERT INTO participants (id, display_name, participant_code, created_at) VALUES (?, ?, ?, ?)',
        [pId, trimmedName, participantCode?.trim() || null, new Date().toISOString()]
      );
      participant = { id: pId, display_name: trimmedName };
    } else if (!allowMultiple) {
      // Check if participant already has a completed attempt
      const completed = await this.db.getOne<{ id: string }>(
        "SELECT id FROM quiz_attempts WHERE participant_id = ? AND status IN ('completed', 'expired')",
        [participant.id]
      );
      if (completed) {
        throw new Error('You have already completed your quiz attempt for this event.');
      }

      // Check if participant has an in-progress attempt that hasn't expired
      const ongoing = await this.db.getOne<QuizAttempt>(
        "SELECT * FROM quiz_attempts WHERE participant_id = ? AND status = 'in_progress'",
        [participant.id]
      );
      if (ongoing) {
        const now = new Date();
        const deadline = new Date(ongoing.deadline_at);
        if (now <= deadline) {
          // Resume existing in-progress attempt
          const attemptDetails = await this.getAttempt(ongoing.id);
          return {
            attemptId: ongoing.id,
            participantId: participant.id,
            startedAt: ongoing.started_at,
            deadlineAt: ongoing.deadline_at,
            durationMinutes,
            questions: attemptDetails.questions,
          };
        }
      }
    }

    // Select questions: 2 Easy, 2 Medium, 1 Hard
    const easyQuestions = await this.db.query<{
      id: string;
      text: string;
      difficulty: QuestionDifficulty;
      category: string;
      options: string;
      code_snippet?: string | null;
    }>('SELECT id, text, difficulty, category, options, code_snippet FROM questions WHERE difficulty = "easy" AND is_active = 1');

    const mediumQuestions = await this.db.query<{
      id: string;
      text: string;
      difficulty: QuestionDifficulty;
      category: string;
      options: string;
      code_snippet?: string | null;
    }>('SELECT id, text, difficulty, category, options, code_snippet FROM questions WHERE difficulty = "medium" AND is_active = 1');

    const hardQuestions = await this.db.query<{
      id: string;
      text: string;
      difficulty: QuestionDifficulty;
      category: string;
      options: string;
      code_snippet?: string | null;
    }>('SELECT id, text, difficulty, category, options, code_snippet FROM questions WHERE difficulty = "hard" AND is_active = 1');

    if (easyQuestions.length < 2) {
      throw new Error(`Insufficient Easy questions in bank. Required: 2, Available: ${easyQuestions.length}`);
    }
    if (mediumQuestions.length < 2) {
      throw new Error(`Insufficient Medium questions in bank. Required: 2, Available: ${mediumQuestions.length}`);
    }
    if (hardQuestions.length < 1) {
      throw new Error(`Insufficient Hard questions in bank. Required: 1, Available: ${hardQuestions.length}`);
    }

    const selectedEasy = shuffleArray(easyQuestions).slice(0, 2);
    const selectedMed = shuffleArray(mediumQuestions).slice(0, 2);
    const selectedHard = shuffleArray(hardQuestions).slice(0, 1);

    // Combine and shuffle the 5 questions
    const selected5 = shuffleArray([...selectedEasy, ...selectedMed, ...selectedHard]);

    const pointsMap = await this.getPointsMap();
    const attemptId = 'att_' + crypto.randomUUID().slice(0, 16);
    const startedAt = new Date();
    const deadlineAt = new Date(startedAt.getTime() + durationMinutes * 60 * 1000);

    const publicQuestions: PublicQuestion[] = [];

    await this.db.transaction(async (tx) => {
      await tx.run(
        `INSERT INTO quiz_attempts (id, participant_id, started_at, deadline_at, status, total_score)
         VALUES (?, ?, ?, ?, 'in_progress', 0)`,
        [attemptId, participant.id, startedAt.toISOString(), deadlineAt.toISOString()]
      );

      for (let i = 0; i < selected5.length; i++) {
        const q = selected5[i];
        const rawOptions: string[] = typeof q.options === 'string' ? JSON.parse(q.options) : q.options;
        const shuffledOptions = shuffleArray(rawOptions);
        const position = i + 1;
        const aqId = 'aq_' + crypto.randomUUID().slice(0, 14);

        await tx.run(
          `INSERT INTO attempt_questions (id, attempt_id, question_id, position, options, points_awarded)
           VALUES (?, ?, ?, ?, ?, 0)`,
          [aqId, attemptId, q.id, position, JSON.stringify(shuffledOptions)]
        );

        publicQuestions.push({
          id: q.id,
          position,
          text: q.text,
          difficulty: q.difficulty,
          category: q.category,
          options: shuffledOptions,
          code_snippet: q.code_snippet,
          points: pointsMap[q.difficulty] || 10,
        });
      }
    });

    return {
      attemptId,
      participantId: participant.id,
      startedAt: startedAt.toISOString(),
      deadlineAt: deadlineAt.toISOString(),
      durationMinutes,
      questions: publicQuestions,
    };
  }

  async getAttempt(attemptId: string): Promise<{
    attempt: QuizAttempt;
    questions: PublicQuestion[];
    selectedAnswers: Record<string, string>;
  }> {
    const attempt = await this.db.getOne<QuizAttempt>(
      `SELECT a.*, p.display_name as participant_name, p.participant_code
       FROM quiz_attempts a
       JOIN participants p ON a.participant_id = p.id
       WHERE a.id = ?`,
      [attemptId]
    );

    if (!attempt) {
      throw new Error('Quiz attempt not found.');
    }

    const pointsMap = await this.getPointsMap();

    // Check if in_progress attempt has expired based on current server time
    const now = new Date();
    const deadline = new Date(attempt.deadline_at);
    if (attempt.status === 'in_progress' && now > deadline) {
      // Auto-submit expired attempt with existing answers
      await this.submitQuiz(attemptId, {}, true);
      attempt.status = 'expired';
    }

    const aqRows = await this.db.query<{
      question_id: string;
      position: number;
      options: string;
      selected_answer: string | null;
      text: string;
      difficulty: QuestionDifficulty;
      category: string;
      code_snippet?: string | null;
    }>(
      `SELECT aq.question_id, aq.position, aq.options, aq.selected_answer,
              q.text, q.difficulty, q.category, q.code_snippet
       FROM attempt_questions aq
       JOIN questions q ON aq.question_id = q.id
       WHERE aq.attempt_id = ?
       ORDER BY aq.position ASC`,
      [attemptId]
    );

    const questions: PublicQuestion[] = [];
    const selectedAnswers: Record<string, string> = {};

    for (const row of aqRows) {
      const opts: string[] = typeof row.options === 'string' ? JSON.parse(row.options) : row.options;
      questions.push({
        id: row.question_id,
        position: row.position,
        text: row.text,
        difficulty: row.difficulty,
        category: row.category,
        options: opts,
        code_snippet: row.code_snippet,
        points: pointsMap[row.difficulty] || 10,
      });

      if (row.selected_answer) {
        selectedAnswers[row.question_id] = row.selected_answer;
      }
    }

    return {
      attempt,
      questions,
      selectedAnswers,
    };
  }

  async saveProgress(attemptId: string, answers: Record<string, string>): Promise<void> {
    const attempt = await this.db.getOne<QuizAttempt>('SELECT status, deadline_at FROM quiz_attempts WHERE id = ?', [
      attemptId,
    ]);
    if (!attempt) throw new Error('Attempt not found.');
    if (attempt.status !== 'in_progress') return;

    for (const [qId, ans] of Object.entries(answers)) {
      if (ans !== undefined && ans !== null) {
        await this.db.run(
          'UPDATE attempt_questions SET selected_answer = ? WHERE attempt_id = ? AND question_id = ?',
          [ans, attemptId, qId]
        );
      }
    }
  }

  async submitQuiz(
    attemptId: string,
    finalAnswers: Record<string, string> = {},
    isAutoExpire = false
  ): Promise<QuizResultResponse> {
    const attempt = await this.db.getOne<QuizAttempt>(
      `SELECT a.*, p.id as p_id, p.display_name, p.participant_code
       FROM quiz_attempts a
       JOIN participants p ON a.participant_id = p.id
       WHERE a.id = ?`,
      [attemptId]
    );

    if (!attempt) {
      throw new Error('Attempt not found.');
    }

    // If already submitted or expired, return existing results without re-scoring (idempotent submission)
    if (attempt.status === 'completed' || attempt.status === 'expired') {
      return this.getResults(attemptId);
    }

    const now = new Date();
    const deadline = new Date(attempt.deadline_at);
    // Allow 10 seconds grace period for network latency before marking expired
    const isLate = now.getTime() > deadline.getTime() + 10000;
    const finalStatus = isAutoExpire || isLate ? 'expired' : 'completed';

    // First save any newly provided answers
    await this.saveProgress(attemptId, finalAnswers);

    const pointsMap = await this.getPointsMap();

    // Fetch attempt questions with master questions to score against source of truth
    const questionsWithMaster = await this.db.query<{
      aq_id: string;
      question_id: string;
      position: number;
      options: string;
      selected_answer: string | null;
      text: string;
      difficulty: QuestionDifficulty;
      category: string;
      code_snippet?: string | null;
      correct_answer: string;
      explanation: string;
    }>(
      `SELECT aq.id as aq_id, aq.question_id, aq.position, aq.options, aq.selected_answer,
              q.text, q.difficulty, q.category, q.code_snippet, q.correct_answer, q.explanation
       FROM attempt_questions aq
       JOIN questions q ON aq.question_id = q.id
       WHERE aq.attempt_id = ?
       ORDER BY aq.position ASC`,
      [attemptId]
    );

    let totalScore = 0;
    const startedAt = new Date(attempt.started_at);
    const submittedAt = now;
    const timeTakenSeconds = Math.max(1, Math.round((submittedAt.getTime() - startedAt.getTime()) / 1000));

    await this.db.transaction(async (tx) => {
      for (const item of questionsWithMaster) {
        // Selected answer comes from DB (which includes saved progress + finalAnswers)
        const selected = item.selected_answer || null;
        const isCorrect = selected !== null && selected === item.correct_answer;
        const maxPoints = pointsMap[item.difficulty] || 10;
        const pointsAwarded = isCorrect ? maxPoints : 0;

        totalScore += pointsAwarded;

        await tx.run(
          `UPDATE attempt_questions
           SET selected_answer = ?, is_correct = ?, points_awarded = ?
           WHERE id = ?`,
          [selected, isCorrect ? 1 : 0, pointsAwarded, item.aq_id]
        );
      }

      await tx.run(
        `UPDATE quiz_attempts
         SET status = ?, total_score = ?, time_taken_seconds = ?, submitted_at = ?
         WHERE id = ?`,
        [finalStatus, totalScore, timeTakenSeconds, submittedAt.toISOString(), attemptId]
      );
    });

    return this.getResults(attemptId);
  }

  async getResults(attemptId: string): Promise<QuizResultResponse> {
    const attempt = await this.db.getOne<QuizAttempt>(
      `SELECT a.*, p.id as p_id, p.display_name, p.participant_code
       FROM quiz_attempts a
       JOIN participants p ON a.participant_id = p.id
       WHERE a.id = ?`,
      [attemptId]
    );

    if (!attempt) {
      throw new Error('Attempt not found.');
    }

    if (attempt.status === 'in_progress') {
      throw new Error('Quiz attempt is still in progress.');
    }

    const pointsMap = await this.getPointsMap();
    const durationMinutes = parseInt(await this.getConfig('quiz_duration_minutes', '5'), 10) || 5;

    const rows = await this.db.query<{
      question_id: string;
      position: number;
      options: string;
      selected_answer: string | null;
      is_correct: number | null;
      points_awarded: number;
      text: string;
      difficulty: QuestionDifficulty;
      category: string;
      code_snippet?: string | null;
      correct_answer: string;
      explanation: string;
    }>(
      `SELECT aq.question_id, aq.position, aq.options, aq.selected_answer,
              aq.is_correct, aq.points_awarded,
              q.text, q.difficulty, q.category, q.code_snippet, q.correct_answer, q.explanation
       FROM attempt_questions aq
       JOIN questions q ON aq.question_id = q.id
       WHERE aq.attempt_id = ?
       ORDER BY aq.position ASC`,
      [attemptId]
    );

    let correctCount = 0;
    let incorrectCount = 0;
    let unansweredCount = 0;

    const breakdown = {
      easy: { correct: 0, total: 0, points: 0, max_points: 0 },
      medium: { correct: 0, total: 0, points: 0, max_points: 0 },
      hard: { correct: 0, total: 0, points: 0, max_points: 0 },
    };

    const questions: QuestionReviewItem[] = [];

    for (const r of rows) {
      const isCorrect = r.is_correct === 1;
      const unanswered = !r.selected_answer;
      if (unanswered) {
        unansweredCount++;
      } else if (isCorrect) {
        correctCount++;
      } else {
        incorrectCount++;
      }

      const maxPts = pointsMap[r.difficulty] || 10;
      const b = breakdown[r.difficulty];
      if (b) {
        b.total++;
        b.max_points += maxPts;
        if (isCorrect) {
          b.correct++;
          b.points += r.points_awarded;
        }
      }

      const opts: string[] = typeof r.options === 'string' ? JSON.parse(r.options) : r.options;

      questions.push({
        id: r.question_id,
        position: r.position,
        text: r.text,
        difficulty: r.difficulty,
        category: r.category,
        code_snippet: r.code_snippet,
        options: opts,
        selected_answer: r.selected_answer,
        correct_answer: r.correct_answer,
        is_correct: isCorrect,
        points_awarded: r.points_awarded,
        max_points: maxPts,
        explanation: r.explanation,
      });
    }

    // Compute live rank
    const rankRow = await this.db.getOne<{ rank_pos: number }>(
      `SELECT COUNT(*) + 1 as rank_pos
       FROM quiz_attempts
       WHERE status IN ('completed', 'expired')
         AND (
           total_score > ? OR
           (total_score = ? AND time_taken_seconds < ?) OR
           (total_score = ? AND time_taken_seconds = ? AND submitted_at < ?)
         )`,
      [
        attempt.total_score,
        attempt.total_score,
        attempt.time_taken_seconds || 999999,
        attempt.total_score,
        attempt.time_taken_seconds || 999999,
        attempt.submitted_at || new Date().toISOString(),
      ]
    );

    const totalParticipantsRow = await this.db.getOne<{ count: number }>(
      `SELECT COUNT(DISTINCT participant_id) as count FROM quiz_attempts WHERE status IN ('completed', 'expired')`
    );

    return {
      attempt_id: attempt.id,
      participant: {
        id: (attempt as any).participant_id || (attempt as any).p_id,
        display_name: (attempt as any).display_name || (attempt as any).participant_name || 'Player',
        participant_code: (attempt as any).participant_code,
      },
      status: attempt.status,
      total_score: attempt.total_score,
      max_score: 90,
      time_taken_seconds: attempt.time_taken_seconds || 0,
      time_allowed_seconds: durationMinutes * 60,
      submitted_at: attempt.submitted_at || new Date().toISOString(),
      total_questions: rows.length,
      correct_count: correctCount,
      incorrect_count: incorrectCount,
      unanswered_count: unansweredCount,
      difficulty_breakdown: breakdown,
      rank: rankRow?.rank_pos || 1,
      total_participants: totalParticipantsRow?.count || 1,
      questions,
    };
  }
}
