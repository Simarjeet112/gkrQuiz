# GEEKROOM // CODE ARENA

> **"Think Fast. Code Smart. Own the Arena."**  
> Official interactive coding quiz competition built for **Geekroom GTBIT** college tech community & orientation event.

---

## ⚡ Product Overview

**Geekroom Code Arena** is a real-time, competitive coding game engineered for engineering students. Unlike standard quiz forms or admin dashboards, Code Arena delivers an arcade-style, high-stakes terminal experience featuring:

- **Original Geekroom Mascot (GKR-01 // "BitByte")**: Interactive 3D robotic mascot rendered with Three.js / React Three Fiber that follows cursor movement, coupled with animated SVG emotion states across the quiz flow.
- **Fair Randomized Challenges**: Exactly 5 randomized questions per attempt (2 Easy, 2 Medium, 1 Hard), with randomized question ordering and independently shuffled answer options.
- **Server-Side Source of Truth**: Answers, deadlines, scoring (10/20/30 pts = 90 max), and tie-breakers are calculated and validated exclusively by the backend API.
- **Resilient Quiz Arena**: Progress auto-saves as players navigate; attempts are persisted so refreshing the browser never resets the timer or loses questions.
- **Automated Expiry & Timer Enforcement**: Configurable 5-minute quiz deadline enforced strictly by server timestamps.
- **Live Event Leaderboard**: Ranks competitors in real-time with deterministic tie-breaking (Score DESC → Completion Time ASC → Server Submission Timestamp ASC).
- **Protected Organizer Control Room**: Comprehensive dashboard with JWT authentication, participant search, attempt audit, question bank manager (CRUD), event settings, CSV export, and safe danger-zone reset.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS |
| **UI & Motion** | Framer Motion, Lucide React, Canvas Confetti |
| **3D Graphics** | Three.js, `@react-three/fiber`, `@react-three/drei` |
| **Backend** | Node.js, Express, TypeScript, JWT, bcryptjs |
| **Database** | PostgreSQL (`pg`) with automatic SQLite (`sqlite3`) fallback for instant zero-dependency local runs |
| **Containerization** | Docker, Docker Compose, Nginx |

---

## 🤖 Geekroom Mascot: GKR-01 ("BitByte")

GKR-01 is Geekroom's custom-designed robotic companion:
- **3D Hero Mascot**: Floating cyber-droid with metallic graphite chassis, dark curved glass visor, glowing emissive neon green eyes tracking the user's cursor, violet antennae, and dual rotating holographic orbital rings.
- **Expressive Companion States**:
  - `welcome`: Friendly arch eyes and greeting speech bubble on the registration screen.
  - `quiz`: Focused visor scanline gaze with encouraging micro-tips on the quiz HUD.
  - `urgent`: Alert red visor eyes and blinking antenna when the timer drops under 60 seconds.
  - `victory` / `correct`: Celebratory bounce with confetti and trophy reaction.
  - `encourage`: Supportive pose for participants reviewing incorrect answers.

---

## 🎯 Quiz Distribution & Points System

| Difficulty | Count | Points Each | Total Points | Accent Color |
|---|---|---|---|---|
| **Easy** | 2 | 10 pts | 20 pts | Cyber Green (`#00FF88`) |
| **Medium** | 2 | 20 pts | 40 pts | Amber Glow (`#F59E0B`) |
| **Hard** | 1 | 30 pts | 30 pts | Electric Violet (`#8B5CF6`) |
| **MAX TOTAL** | **5** | — | **90 PTS** | — |

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18+ or v22+)
- npm (v9+)

### 1. Clone & Install Dependencies

```bash
# In backend
cd backend
npm install

# In frontend
cd ../frontend
npm install
```

### 2. Configure Environment

Copy `.env.example` in `backend`:
```bash
cp .env.example backend/.env
```

Default dev settings run out-of-the-box using SQLite (`./data/geekroom_arena.db`). For PostgreSQL, provide `DATABASE_URL=postgresql://user:pass@localhost:5432/geekroom_arena`.

### 3. Seed Database & Question Bank

```bash
cd backend
npm run seed
```
Seeds 28 curated questions across Fundamentals, Data Structures, Algorithms, Debugging, and Complexity, plus the default organizer account.

### 4. Run Development Servers

**Option A — Run Backend:**
```bash
cd backend
npm run dev
# API running at http://localhost:5001
```

**Option B — Run Frontend:**
```bash
cd frontend
npm run dev
# Web app running at http://localhost:5173
```

---

## 🧪 Automated Test Suite (14 Scenarios)

The project includes an automated test suite verifying all 14 project requirements:

```bash
cd backend
npx tsx --test tests/arena.test.ts
```

### Verified Scenarios:
1. Participant registration and quiz session initialization.
2. Exactly 5 questions generated per attempt.
3. Strict distribution: 2 Easy, 2 Medium, 1 Hard.
4. Zero duplicate questions per attempt.
5. Randomized question selection and option shuffling.
6. Answers and explanations are never exposed before submission.
7. Answer selection survives question navigation and page refresh.
8. Server-side scoring source of truth (10 + 20 + 30 = 90 max).
9. Idempotent submissions (repeated submits cannot duplicate score).
10. Server-enforced deadline expiration handling.
11. Deterministic leaderboard tie-breaking: `Score DESC`, `Time ASC`, `Timestamp ASC`.
12. Admin JWT authentication and route protection.
13. Question bank CRUD and configuration persistence.
14. Graceful error handling for insufficient question pool.

---

## 🛡️ Organizer Admin Credentials

Access the Organizer Portal at `/admin` or via the top navigation bar:
- **Email / Username**: `admin@geekroom.in` or `admin`
- **Default Password**: `GeekroomAdmin2025!`
*(Configurable via `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env`)*

### Organizer Controls:
- **Live Metrics**: Total participants, completed attempts, average score, highest score.
- **Participant Search**: Drill down into individual participant answers and timestamps.
- **Question Bank Manager**: Filter, add new questions with live preview, edit, disable, or delete.
- **Event Settings**: Adjust quiz duration (1-60 mins), toggle single/multiple attempts, toggle mandatory roll numbers.
- **Export CSV**: Instant spreadsheet download with all ranks and scores.
- **Danger Zone**: Hard reset of event attempts protected with confirmation phrase `RESET ARENA` and password validation.

---

## 🐳 Production Deployment (Docker Compose)

For multi-container deployment with PostgreSQL:

```bash
docker compose up -d --build
```

This starts:
- `postgres:16-alpine`: PostgreSQL database on port 5432 with persistent volume.
- `geekroom_arena_api`: Node.js Express production server on port 5001.
- `geekroom_arena_ui`: Optimized Nginx static file server with API reverse proxy on port 80.

Open `http://localhost` in your browser.

---

## 📁 Repository Structure

```
gkrQuizroom/
├── backend/
│   ├── src/
│   │   ├── db/
│   │   │   ├── connection.ts    # Dual PostgreSQL / SQLite query abstraction
│   │   │   ├── schema.sql       # SQL schema definition with indexes
│   │   │   ├── init.ts          # Schema initialization & config defaults
│   │   │   └── seed.ts          # 28 curated questions & admin seed
│   │   ├── middleware/
│   │   │   └── auth.ts          # JWT authorization middleware
│   │   ├── routes/
│   │   │   ├── quizRoutes.ts    # /api/quiz (start, get, progress, submit, results)
│   │   │   ├── leaderboardRoutes.ts # /api/leaderboard
│   │   │   └── adminRoutes.ts   # /api/admin (metrics, attempts, questions, config, reset)
│   │   ├── services/
│   │   │   ├── quizService.ts   # Quiz randomization, timer, and server scoring
│   │   │   └── leaderboardService.ts # Ranked leaderboard queries
│   │   ├── types/               # TypeScript interfaces
│   │   ├── app.ts               # Express application setup
│   │   └── server.ts            # Entrypoint
│   ├── tests/
│   │   └── arena.test.ts        # Comprehensive 14-scenario automated test suite
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── mascot/
│   │   │   │   ├── Geekroom3DMascot.tsx       # Three.js R3F 3D interactive mascot
│   │   │   │   └── GeekroomMascotReaction.tsx # Expressive 2D companion reactions
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.tsx                 # Top navigation with live status
│   │   │   │   └── Footer.tsx                 # Geekroom GTBIT attribution
│   │   │   └── ui/
│   │   │       └── CodeBlock.tsx              # Syntax-highlighted code block
│   │   ├── pages/
│   │   │   ├── LandingPage.tsx                # Hero, 3D Mascot, features, how it works
│   │   │   ├── RegistrationPage.tsx           # Player entry, rules briefing
│   │   │   ├── QuizArenaPage.tsx              # 5-question HUD, timer, keyboard controls
│   │   │   ├── ResultsPage.tsx                # Score count-up, review, explanation, confetti
│   │   │   ├── LeaderboardPage.tsx            # Podium, live polling, search
│   │   │   └── AdminDashboardPage.tsx         # Organizer metrics, CRUD, config, CSV export
│   │   ├── services/
│   │   │   └── api.ts                         # Client fetch API wrapper
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
├── docker-compose.yml
├── .env.example
├── package.json
└── README.md
```

---

<p align="center">
  <strong>Built with 💚 for Geekroom GTBIT</strong><br />
  <em>Think Fast. Code Smart. Own the Arena.</em>
</p>
