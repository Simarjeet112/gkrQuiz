export type QuestionDifficulty = 'easy' | 'medium' | 'tough';

export interface Participant {
  id: string;
  display_name: string;
  participant_code?: string | null;
  created_at: string;
}

export interface Question {
  id: string;
  text: string;
  difficulty: QuestionDifficulty;
  category: string;
  options: string[]; // parsed array of 4 options
  correct_answer: string;
  explanation: string;
  code_snippet?: string | null;
  is_active: boolean;
  created_at: string;
}

export interface PublicQuestion {
  id: string;
  position: number;
  text: string;
  difficulty: QuestionDifficulty;
  category: string;
  options: string[];
  code_snippet?: string | null;
  points: number;
}

export type AttemptStatus = 'in_progress' | 'completed' | 'expired';

export interface QuizAttempt {
  id: string;
  participant_id: string;
  started_at: string;
  deadline_at: string;
  submitted_at?: string | null;
  status: AttemptStatus;
  total_score: number;
  time_taken_seconds?: number | null;
  participant_name?: string;
  participant_code?: string | null;
}

export interface AttemptQuestion {
  id: string;
  attempt_id: string;
  question_id: string;
  position: number;
  options: string[];
  selected_answer?: string | null;
  is_correct?: boolean | null;
  points_awarded: number;
}

export interface QuestionReviewItem {
  id: string;
  position: number;
  text: string;
  difficulty: QuestionDifficulty;
  category: string;
  code_snippet?: string | null;
  options: string[];
  selected_answer?: string | null;
  correct_answer: string;
  is_correct: boolean;
  points_awarded: number;
  max_points: number;
  explanation: string;
}

export interface QuizResultResponse {
  attempt_id: string;
  participant: {
    id: string;
    display_name: string;
    participant_code?: string | null;
  };
  status: AttemptStatus;
  total_score: number;
  max_score: number;
  time_taken_seconds: number;
  time_allowed_seconds: number;
  submitted_at: string;
  total_questions: number;
  correct_count: number;
  incorrect_count: number;
  unanswered_count: number;
  difficulty_breakdown: {
    easy: { correct: number; total: number; points: number; max_points: number };
    medium: { correct: number; total: number; points: number; max_points: number };
    tough: { correct: number; total: number; points: number; max_points: number };
  };
  rank?: number;
  total_participants?: number;
  questions: QuestionReviewItem[];
}

export interface LeaderboardEntry {
  rank: number;
  attempt_id: string;
  participant_id: string;
  display_name: string;
  participant_code?: string | null;
  total_score: number;
  time_taken_seconds: number;
  submitted_at: string;
  status: AttemptStatus;
}

export interface EventConfig {
  quiz_duration_minutes: number;
  allow_multiple_attempts: boolean;
  require_roll_number: boolean;
  event_title: string;
  points_easy: number;
  points_medium: number;
  points_tough: number;
}
