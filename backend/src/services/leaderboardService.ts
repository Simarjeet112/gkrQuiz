import { getDB, IDatabase } from '../db/connection.js';
import { LeaderboardEntry } from '../types/index.js';

export class LeaderboardService {
  private db: IDatabase;

  constructor(db?: IDatabase) {
    this.db = db || getDB();
  }

  async getLeaderboard(limit = 100): Promise<LeaderboardEntry[]> {
    const rows = await this.db.query<{
      attempt_id: string;
      participant_id: string;
      display_name: string;
      participant_code: string | null;
      total_score: number;
      time_taken_seconds: number;
      submitted_at: string;
      status: 'in_progress' | 'completed' | 'expired';
    }>(
      `SELECT
         a.id as attempt_id,
         a.participant_id,
         p.display_name,
         p.participant_code,
         a.total_score,
         COALESCE(a.time_taken_seconds, 0) as time_taken_seconds,
         a.submitted_at,
         a.status
       FROM quiz_attempts a
       JOIN participants p ON a.participant_id = p.id
       WHERE a.status IN ('completed', 'expired')
       ORDER BY
         a.total_score DESC,
         COALESCE(a.time_taken_seconds, 999999) ASC,
         a.submitted_at ASC
       LIMIT ?`,
      [limit]
    );

    return rows.map((r, index) => ({
      rank: index + 1,
      attempt_id: r.attempt_id,
      participant_id: r.participant_id,
      display_name: r.display_name,
      participant_code: r.participant_code,
      total_score: r.total_score,
      time_taken_seconds: r.time_taken_seconds,
      submitted_at: r.submitted_at,
      status: r.status,
    }));
  }
}
