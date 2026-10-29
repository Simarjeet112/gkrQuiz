const RAW_BASE = import.meta.env.VITE_API_URL || '';
const API_BASE = RAW_BASE ? (RAW_BASE.endsWith('/api') ? RAW_BASE : `${RAW_BASE}/api`) : '/api';

function getOrganizerHeader(): Record<string, string> {
  const code = typeof window !== 'undefined' ? sessionStorage.getItem('gkr_organizer_passcode') : null;
  return code ? { 'x-organizer-passcode': code } : {};
}

export const api = {
  // Public Quiz Endpoints
  async getConfig() {
    const res = await fetch(`${API_BASE}/quiz/config`);
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed to fetch config');
    return json.data;
  },

  async startQuiz(displayName: string, participantCode?: string, track: string = 'code') {
    const res = await fetch(`${API_BASE}/quiz/start`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ displayName, participantCode, track }),
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

  // Organizer API Endpoints
  async organizerVerify(passcode: string) {
    const res = await fetch(`${API_BASE}/organizer/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ passcode }),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Organizer passcode incorrect');
    return json;
  },

  async organizerGetStats() {
    const res = await fetch(`${API_BASE}/organizer/stats`, {
      headers: getOrganizerHeader(),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed to fetch organizer stats');
    return json.data;
  },

  async organizerGetQuestions(difficulty = 'all', search = '') {
    const params = new URLSearchParams();
    if (difficulty) params.append('difficulty', difficulty);
    if (search) params.append('search', search);

    const res = await fetch(`${API_BASE}/organizer/questions?${params.toString()}`, {
      headers: getOrganizerHeader(),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed to fetch questions');
    return json.data;
  },

  async organizerAddQuestion(data: any) {
    const res = await fetch(`${API_BASE}/organizer/questions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getOrganizerHeader(),
      },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed to create question');
    return json.data;
  },

  async organizerUpdateQuestion(id: string, data: any) {
    const res = await fetch(`${API_BASE}/organizer/questions/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getOrganizerHeader(),
      },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed to update question');
    return json;
  },

  async organizerDeleteQuestion(id: string) {
    const res = await fetch(`${API_BASE}/organizer/questions/${id}`, {
      method: 'DELETE',
      headers: getOrganizerHeader(),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed to delete question');
    return json;
  },

  async organizerGetConfig() {
    const res = await fetch(`${API_BASE}/organizer/config`, {
      headers: getOrganizerHeader(),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed to fetch configurations');
    return json.data;
  },

  async organizerUpdateConfig(configs: Record<string, any>) {
    const res = await fetch(`${API_BASE}/organizer/config`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getOrganizerHeader(),
      },
      body: JSON.stringify(configs),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed to update config');
    return json;
  },

  async organizerResetAttempts(confirmPhrase: string) {
    const res = await fetch(`${API_BASE}/organizer/reset-attempts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getOrganizerHeader(),
      },
      body: JSON.stringify({ confirmPhrase }),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Reset failed');
    return json;
  },
};
