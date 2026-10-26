const API_BASE = '/api';

function getAuthHeader(): Record<string, string> {
  const token = localStorage.getItem('gkr_admin_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

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

  // Admin Endpoints
  async adminLogin(usernameOrEmail: string, password: string) {
    const res = await fetch(`${API_BASE}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usernameOrEmail, password }),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Admin login failed');
    return json.data;
  },

  async adminGetMetrics() {
    const res = await fetch(`${API_BASE}/admin/metrics`, {
      headers: getAuthHeader(),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed to fetch metrics');
    return json.data;
  },

  async adminGetAttempts(search = '', status = '') {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (status) params.append('status', status);

    const res = await fetch(`${API_BASE}/admin/attempts?${params.toString()}`, {
      headers: getAuthHeader(),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed to fetch attempts');
    return json.data;
  },

  async adminGetAttemptDetail(attemptId: string) {
    const res = await fetch(`${API_BASE}/admin/attempts/${attemptId}`, {
      headers: getAuthHeader(),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed to fetch attempt details');
    return json.data;
  },

  async adminGetQuestions(difficulty = '', category = '') {
    const params = new URLSearchParams();
    if (difficulty) params.append('difficulty', difficulty);
    if (category) params.append('category', category);

    const res = await fetch(`${API_BASE}/admin/questions?${params.toString()}`, {
      headers: getAuthHeader(),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed to fetch questions');
    return json.data;
  },

  async adminAddQuestion(questionData: any) {
    const res = await fetch(`${API_BASE}/admin/questions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(questionData),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed to create question');
    return json.data;
  },

  async adminUpdateQuestion(id: string, updates: any) {
    const res = await fetch(`${API_BASE}/admin/questions/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(updates),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed to update question');
    return json;
  },

  async adminDeleteQuestion(id: string) {
    const res = await fetch(`${API_BASE}/admin/questions/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader(),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed to delete question');
    return json;
  },

  async adminGetConfig() {
    const res = await fetch(`${API_BASE}/admin/config`, {
      headers: getAuthHeader(),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed to fetch configurations');
    return json.data;
  },

  async adminUpdateConfig(configs: Record<string, any>) {
    const res = await fetch(`${API_BASE}/admin/config`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(configs),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed to update configurations');
    return json;
  },

  async adminResetData(password: string, confirmPhrase: string) {
    const res = await fetch(`${API_BASE}/admin/reset-data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify({ password, confirmPhrase }),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Reset failed');
    return json;
  },
};
