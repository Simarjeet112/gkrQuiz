import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import quizRoutes from './routes/quizRoutes.js';
import leaderboardRoutes from './routes/leaderboardRoutes.js';
import organizerRoutes from './routes/organizerRoutes.js';

export const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-organizer-passcode'],
}));

app.use(express.json());

// Health check endpoint
app.get(['/health', '/api/health'], (_req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'geekroom-code-arena', time: new Date().toISOString() });
});

// Mount modular API routers
app.use('/api/quiz', quizRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/organizer', organizerRoutes);

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ success: false, error: 'Endpoint not found.' });
});

// Centralized error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[Error]', err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal server error.',
  });
});
