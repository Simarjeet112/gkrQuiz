const API_BASE = '/api';

export const api = {
  // Public Quiz Endpoints
  async getConfig() {
    const res = await fetch(`${API_BASE}/quiz/config`);
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed to fetch config');
    return json.data;
  },

  async startQuiz(displayName: string, participantCode?: string) {
    const res = await fetch(`${API_BASE}/quiz/start`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ displayName, participantCode }),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed to start quiz');
    return json.data;
  },

  async getAttempt(attemptId: string) {
    const res = await fetch(`${API_BASE}/quiz/attempts/${attemptId}`);
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed to load attempt');
    return json.data;
  },

  async saveProgress(attemptId: string, answers: Record<string, string>) {
    const res = await fetch(`${API_BASE}/quiz/attempts/${attemptId}/progress`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers }),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed to save progress');
    return json;
  },

  async submitQuiz(attemptId: string, answers: Record<string, string>) {
    const res = await fetch(`${API_BASE}/quiz/attempts/${attemptId}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers }),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed to submit quiz');
    return json.data;
  },

  async getResults(attemptId: string) {
    const res = await fetch(`${API_BASE}/quiz/attempts/${attemptId}/results`);
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed to load results');
    return json.data;
  },

  // Leaderboard
  async getLeaderboard(limit = 100) {
    const res = await fetch(`${API_BASE}/leaderboard?limit=${limit}`);
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed to fetch leaderboard');
    return json.data;
  },
};
