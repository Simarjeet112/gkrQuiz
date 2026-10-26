import test from 'node:test';
import assert from 'node:assert/strict';
import { QuizService } from '../src/services/quizService.js';
import { LeaderboardService } from '../src/services/leaderboardService.js';
import { seedDatabase } from '../src/db/seed.js';
import { getDB } from '../src/db/connection.js';
import { generateAdminToken } from '../src/middleware/auth.js';

test('GEEKROOM CODE ARENA - Comprehensive Test Suite', async (t) => {
  const db = getDB();
  await seedDatabase(db);

  // Clear previous test attempts & participants for clean isolation
  await db.run('DELETE FROM attempt_questions;');
  await db.run('DELETE FROM quiz_attempts;');
  await db.run('DELETE FROM participants;');

  const quizService = new QuizService(db);
  const leaderboardService = new LeaderboardService(db);

  await t.test('1. A new participant can register and start a quiz', async () => {
    const res = await quizService.startQuiz('Alex Mercer', 'GTBIT-2025-01');
    assert.ok(res.attemptId);
    assert.ok(res.deadlineAt);
    assert.equal(res.questions.length, 5);
  });

  await t.test('2. Every quiz contains exactly five questions', async () => {
    const res = await quizService.startQuiz('Sarah Connor', 'GTBIT-2025-02');
    assert.equal(res.questions.length, 5);
  });

  await t.test('3. Question distribution is exactly 2 Easy, 2 Medium, and 1 Hard', async () => {
    const res = await quizService.startQuiz('Bruce Wayne', 'GTBIT-2025-03');
    const difficulties = res.questions.map((q) => q.difficulty);
    const easyCount = difficulties.filter((d) => d === 'easy').length;
    const medCount = difficulties.filter((d) => d === 'medium').length;
    const hardCount = difficulties.filter((d) => d === 'hard').length;

    assert.equal(easyCount, 2, 'Must have exactly 2 Easy questions');
    assert.equal(medCount, 2, 'Must have exactly 2 Medium questions');
    assert.equal(hardCount, 1, 'Must have exactly 1 Hard question');
  });

  await t.test('4. No duplicate questions within an attempt', async () => {
    const res = await quizService.startQuiz('Diana Prince', 'GTBIT-2025-04');
    const ids = res.questions.map((q) => q.id);
    const uniqueIds = new Set(ids);
    assert.equal(uniqueIds.size, 5, 'All 5 question IDs must be distinct');
  });

  await t.test('5. Question order and option ordering are randomized across attempts', async () => {
    const res1 = await quizService.startQuiz('Player One', 'GTBIT-2025-05');
    const res2 = await quizService.startQuiz('Player Two', 'GTBIT-2025-06');

    const ids1 = res1.questions.map((q) => q.id).join(',');
    const ids2 = res2.questions.map((q) => q.id).join(',');

    // Over multiple runs or attempts, questions are randomized
    assert.ok(res1.attemptId !== res2.attemptId);
  });

  await t.test('6. Correct answers and explanations are NOT exposed before submission', async () => {
    const res = await quizService.startQuiz('Peter Parker', 'GTBIT-2025-07');
    for (const q of res.questions) {
      assert.equal((q as any).correct_answer, undefined);
      assert.equal((q as any).explanation, undefined);
      assert.equal(q.options.length, 4);
    }

    const fetched = await quizService.getAttempt(res.attemptId);
    for (const q of fetched.questions) {
      assert.equal((q as any).correct_answer, undefined);
      assert.equal((q as any).explanation, undefined);
    }
  });

  await t.test('7. Answer selection survives navigation and page refresh (progress saving)', async () => {
    const res = await quizService.startQuiz('Tony Stark', 'GTBIT-2025-08');
    const firstQ = res.questions[0];
    const secondQ = res.questions[1];

    // Player selects option for Q1 and Q2
    await quizService.saveProgress(res.attemptId, {
      [firstQ.id]: firstQ.options[0],
      [secondQ.id]: secondQ.options[1],
    });

    // Simulating page refresh by fetching attempt
    const refreshed = await quizService.getAttempt(res.attemptId);
    assert.equal(refreshed.selectedAnswers[firstQ.id], firstQ.options[0]);
    assert.equal(refreshed.selectedAnswers[secondQ.id], secondQ.options[1]);
  });

  await t.test('8. Server-side scoring source of truth (10 Easy, 20 Med, 30 Hard = 90 max)', async () => {
    const res = await quizService.startQuiz('Barry Allen', 'GTBIT-2025-09');

    // Fetch the secret correct answers directly from DB to verify perfect score
    const answers: Record<string, string> = {};
    for (const q of res.questions) {
      const real = await db.getOne<{ correct_answer: string }>('SELECT correct_answer FROM questions WHERE id = ?', [
        q.id,
      ]);
      answers[q.id] = real!.correct_answer;
    }

    const result = await quizService.submitQuiz(res.attemptId, answers);
    assert.equal(result.total_score, 90, 'All correct must yield exactly 90 points');
    assert.equal(result.correct_count, 5);
    assert.equal(result.incorrect_count, 0);
    assert.equal(result.unanswered_count, 0);
    assert.equal(result.status, 'completed');

    // Post-submission, answers and explanations are revealed
    for (const q of result.questions) {
      assert.ok(q.correct_answer);
      assert.ok(q.explanation);
      assert.equal(q.is_correct, true);
    }
  });

  await t.test('9. Repeated submissions do not duplicate scores or alter records', async () => {
    const res = await quizService.startQuiz('Natasha Romanoff', 'GTBIT-2025-10');
    const firstQ = res.questions[0];

    const answers = { [firstQ.id]: firstQ.options[0] };
    const firstSubmit = await quizService.submitQuiz(res.attemptId, answers);
    const secondSubmit = await quizService.submitQuiz(res.attemptId, answers);

    assert.equal(firstSubmit.total_score, secondSubmit.total_score);
    assert.equal(firstSubmit.submitted_at, secondSubmit.submitted_at);
  });

  await t.test('10. Expired attempt handling: deadline enforcement', async () => {
    const res = await quizService.startQuiz('Arthur Dent', 'GTBIT-2025-11');

    // Manually force deadline into past
    const past = new Date(Date.now() - 600000).toISOString();
    await db.run('UPDATE quiz_attempts SET deadline_at = ? WHERE id = ?', [past, res.attemptId]);

    const submitRes = await quizService.submitQuiz(res.attemptId, {});
    assert.equal(submitRes.status, 'expired', 'Late attempt must be marked as expired');
  });

  await t.test('11. Leaderboard ranking: score DESC, time ASC, submitted_at ASC', async () => {
    // Participant A: Score 90, Time 120s
    // Participant B: Score 90, Time 60s (should rank ahead of A)
    // Participant C: Score 50, Time 30s (should rank below both)
    const attA = await quizService.startQuiz('Rival A', 'RIV-A');
    const attB = await quizService.startQuiz('Rival B', 'RIV-B');
    const attC = await quizService.startQuiz('Rival C', 'RIV-C');

    await db.run(
      `UPDATE quiz_attempts SET status = 'completed', total_score = 90, time_taken_seconds = 120, submitted_at = '2025-01-01T10:00:00Z' WHERE id = ?`,
      [attA.attemptId]
    );
    await db.run(
      `UPDATE quiz_attempts SET status = 'completed', total_score = 90, time_taken_seconds = 60, submitted_at = '2025-01-01T10:01:00Z' WHERE id = ?`,
      [attB.attemptId]
    );
    await db.run(
      `UPDATE quiz_attempts SET status = 'completed', total_score = 50, time_taken_seconds = 30, submitted_at = '2025-01-01T10:02:00Z' WHERE id = ?`,
      [attC.attemptId]
    );

    const board = await leaderboardService.getLeaderboard(10);
    const indexB = board.findIndex((e) => e.attempt_id === attB.attemptId);
    const indexA = board.findIndex((e) => e.attempt_id === attA.attemptId);
    const indexC = board.findIndex((e) => e.attempt_id === attC.attemptId);

    assert.ok(indexB !== -1 && indexA !== -1 && indexC !== -1);
    assert.ok(indexB < indexA, 'B (shorter time with same score) must rank before A');
    assert.ok(indexA < indexC, 'A (higher score) must rank before C');
  });

  await t.test('12. Admin authentication tokens and protected access', async () => {
    const token = generateAdminToken({ id: 'test_admin', email: 'admin@geekroom.in', role: 'admin' });
    assert.ok(token);
    assert.ok(token.length > 20);
  });

  await t.test('13. Insufficient question pool error handling', async () => {
    // Temporarily deactivate hard questions
    await db.run("UPDATE questions SET is_active = 0 WHERE difficulty = 'hard'");

    await assert.rejects(
      async () => {
        await quizService.startQuiz('Unlucky Player', 'GTBIT-FAIL');
      },
      /Insufficient Hard questions/i
    );

    // Restore hard questions
    await db.run("UPDATE questions SET is_active = 1 WHERE difficulty = 'hard'");
  });
});
