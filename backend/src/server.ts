import dotenv from 'dotenv';
import { app } from './app.js';
import { seedDatabase } from './db/seed.js';

dotenv.config();

const PORT = parseInt(process.env.PORT || '5001', 10);

async function start() {
  try {
    console.log('[Server] Initializing database...');
    await seedDatabase();

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Geekroom Code Arena API running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('[Server] Fatal startup error:', err);
    process.exit(1);
  }
}

start();
