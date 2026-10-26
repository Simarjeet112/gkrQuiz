import { getDB, IDatabase } from './connection.js';

export async function initDatabase(db?: IDatabase): Promise<void> {
  const targetDb = db || getDB();

  await targetDb.run(`
    CREATE TABLE IF NOT EXISTS participants (
      id VARCHAR(64) PRIMARY KEY,
      display_name VARCHAR(100) NOT NULL,
      participant_code VARCHAR(100),
      created_at TIMESTAMP NOT NULL
    );
  `);

  await targetDb.run(`
    CREATE TABLE IF NOT EXISTS questions (
      id VARCHAR(64) PRIMARY KEY,
      text TEXT NOT NULL,
      difficulty VARCHAR(20) NOT NULL,
      category VARCHAR(50) NOT NULL,
      options TEXT NOT NULL,
      correct_answer TEXT NOT NULL,
      explanation TEXT NOT NULL,
      code_snippet TEXT,
      is_active INTEGER NOT NULL DEFAULT 1,
      created_at TIMESTAMP NOT NULL
    );
  `);

  await targetDb.run(`
    CREATE TABLE IF NOT EXISTS quiz_attempts (
      id VARCHAR(64) PRIMARY KEY,
      participant_id VARCHAR(64) NOT NULL REFERENCES participants(id) ON DELETE CASCADE,
      started_at TIMESTAMP NOT NULL,
      deadline_at TIMESTAMP NOT NULL,
      submitted_at TIMESTAMP,
      status VARCHAR(20) NOT NULL DEFAULT 'in_progress',
      total_score INTEGER NOT NULL DEFAULT 0,
      time_taken_seconds INTEGER
    );
  `);

  await targetDb.run(`
    CREATE TABLE IF NOT EXISTS attempt_questions (
      id VARCHAR(64) PRIMARY KEY,
      attempt_id VARCHAR(64) NOT NULL REFERENCES quiz_attempts(id) ON DELETE CASCADE,
      question_id VARCHAR(64) NOT NULL REFERENCES questions(id),
      position INTEGER NOT NULL,
      options TEXT NOT NULL,
      selected_answer TEXT,
      is_correct INTEGER,
      points_awarded INTEGER NOT NULL DEFAULT 0
    );
  `);

  await targetDb.run(`
    CREATE TABLE IF NOT EXISTS admins (
      id VARCHAR(64) PRIMARY KEY,
      username VARCHAR(64) UNIQUE NOT NULL,
      email VARCHAR(128) UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role VARCHAR(32) NOT NULL DEFAULT 'admin',
      created_at TIMESTAMP NOT NULL
    );
  `);

  await targetDb.run(`
    CREATE TABLE IF NOT EXISTS event_config (
      config_key VARCHAR(64) PRIMARY KEY,
      config_value TEXT NOT NULL
    );
  `);

  // Indexes
  try {
    await targetDb.run(`CREATE INDEX IF NOT EXISTS idx_questions_difficulty ON questions(difficulty, is_active);`);
    await targetDb.run(`CREATE INDEX IF NOT EXISTS idx_attempts_participant ON quiz_attempts(participant_id);`);
    await targetDb.run(`CREATE INDEX IF NOT EXISTS idx_attempts_leaderboard ON quiz_attempts(status, total_score, time_taken_seconds, submitted_at);`);
    await targetDb.run(`CREATE INDEX IF NOT EXISTS idx_attempt_questions_attempt ON attempt_questions(attempt_id, position);`);
  } catch (err) {
    // Indexes might already exist or slight dialect variance
  }

  // Set default event configs if not present
  const defaultConfigs: Record<string, string> = {
    quiz_duration_minutes: '5',
    allow_multiple_attempts: 'false',
    require_roll_number: 'false',
    event_title: 'GEEKROOM // CODE ARENA',
    points_easy: '10',
    points_medium: '20',
    points_hard: '30',
  };

  for (const [key, value] of Object.entries(defaultConfigs)) {
    const existing = await targetDb.getOne('SELECT config_key FROM event_config WHERE config_key = ?', [key]);
    if (!existing) {
      await targetDb.run('INSERT INTO event_config (config_key, config_value) VALUES (?, ?)', [key, value]);
    }
  }

  console.log('[DB] Schema and initial configurations verified.');
}
