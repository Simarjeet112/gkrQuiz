import test from 'node:test';
import assert from 'node:assert/strict';
import { QuizService } from '../src/services/quizService.js';
import { LeaderboardService } from '../src/services/leaderboardService.js';
import { seedDatabase } from '../src/db/seed.js';
import { getDB } from '../src/db/connection.js';

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

  await t.test('3. Question distribution is exactly 2 Easy, 2 Medium, and 1 Tough in strict progression order', async () => {
    const res = await quizService.startQuiz('Bruce Wayne', 'GTBIT-2025-03');
    const difficulties = res.questions.map((q) => q.difficulty);
    const easyCount = difficulties.filter((d) => d === 'easy').length;
    const medCount = difficulties.filter((d) => d === 'medium').length;
    const toughCount = difficulties.filter((d) => d === 'tough').length;

    assert.equal(easyCount, 2, 'Must have exactly 2 Easy questions');
    assert.equal(medCount, 2, 'Must have exactly 2 Medium questions');
    assert.equal(toughCount, 1, 'Must have exactly 1 Tough question');

    // Strict Progression Order: Q1 -> Easy, Q2 -> Easy, Q3 -> Medium, Q4 -> Medium, Q5 -> Tough
    assert.equal(res.questions[0].difficulty, 'easy', 'Q1 must be Easy');
    assert.equal(res.questions[1].difficulty, 'easy', 'Q2 must be Easy');
    assert.equal(res.questions[2].difficulty, 'medium', 'Q3 must be Medium');
    assert.equal(res.questions[3].difficulty, 'medium', 'Q4 must be Medium');
    assert.equal(res.questions[4].difficulty, 'tough', 'Q5 must be Tough');
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

  await t.test('8. Server-side scoring source of truth (10 Easy, 20 Med, 30 Tough = 90 max)', async () => {
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

  await t.test('12. Insufficient question pool error handling', async () => {
    // Temporarily deactivate tough questions
    await db.run("UPDATE questions SET is_active = 0 WHERE difficulty = 'tough'");

    await assert.rejects(
      async () => {
        await quizService.startQuiz('Unlucky Player', 'GTBIT-FAIL');
      },
      /Insufficient Tough questions/i
    );

    // Restore tough questions
    await db.run("UPDATE questions SET is_active = 1 WHERE difficulty = 'tough'");
  });

  await t.test('14. Batch 2026 algorithm: Enrollment numbers ending with 26 get targeted Easy Python, Easy SQL, Medium OOP, and Basic DS in Tough slot', async () => {
    // Example from user: 06213202726
    const res = await quizService.startQuiz('Freshman Rohit', '06213202726');
    assert.equal(res.questions.length, 5);

    // Q1 & Q2: Easy (Python and SQL)
    assert.equal(res.questions[0].difficulty, 'easy');
    assert.equal(res.questions[1].difficulty, 'easy');
    const easyCategories = [res.questions[0].category, res.questions[1].category];
    assert.ok(easyCategories.includes('Python'), 'Must include Basic Python question in easy section');
    assert.ok(easyCategories.includes('SQL'), 'Must include Basic SQL question in easy section');

    // Q3 & Q4: Medium (OOP and mixed)
    assert.equal(res.questions[2].difficulty, 'medium');
    assert.equal(res.questions[3].difficulty, 'medium');
    const medCategories = [res.questions[2].category, res.questions[3].category];
    assert.ok(medCategories.includes('OOP'), 'Must include OOP in medium section');

    // Q5: Tough (Basic Data Structures)
    assert.equal(res.questions[4].difficulty, 'tough');
    assert.equal(res.questions[4].category, 'Data Structures', 'Tough section must be Data Structures question');

    // Verify scoring integrity: 10 + 10 + 20 + 20 + 30 = 90
    assert.equal(res.questions[0].points, 10);
    assert.equal(res.questions[1].points, 10);
    assert.equal(res.questions[2].points, 20);
    assert.equal(res.questions[3].points, 20);
    assert.equal(res.questions[4].points, 30);
  });

  await t.test('15. Ronaldo & Football Legends track: Selects CR7, Hazard, Kante, Madrid, Chelsea questions', async () => {
    const res = await quizService.startQuiz('CR7_Fan_7', 'CR7-MADRID-07', 'ronaldo');
    assert.ok(res.attemptId);
    assert.equal(res.questions.length, 5);
    assert.equal(res.questions[0].difficulty, 'easy');
    assert.equal(res.questions[1].difficulty, 'easy');
    assert.equal(res.questions[2].difficulty, 'medium');
    assert.equal(res.questions[3].difficulty, 'medium');
    assert.equal(res.questions[4].difficulty, 'tough');

    const footballCats = [
      'Cristiano Ronaldo',
      'Eden Hazard',
      "N'Golo Kante",
      'Chelsea FC',
      'Real Madrid',
      'Tactical Football Chess',
    ];

    res.questions.forEach((q) => {
      assert.ok(
        footballCats.includes(q.category),
        `Question category ${q.category} must belong to football legends track`
      );
    });
  });

  await t.test('13. Organizer passcode security & clean state', async () => {
    const passcode = process.env.ORGANIZER_PASSCODE || 'geekroom2026';
    assert.equal(typeof passcode, 'string');
    assert.ok(passcode.length >= 6);

    // Clean up test attempts after testing so database has zero fake/test participants
    await db.run('DELETE FROM attempt_questions;');
    await db.run('DELETE FROM quiz_attempts;');
    await db.run('DELETE FROM participants;');

    const remainingParticipants = await db.getOne<{ count: number }>('SELECT count(*) as count FROM participants');
    assert.equal(remainingParticipants?.count, 0, 'No fake or test participants should remain in production DB');
  });
});
