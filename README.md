# GEEKROOM // CODE ARENA

> **"Think Fast. Code Smart. Own the Arena."**  
> Interactive coding quiz experience for **Geekroom GTBIT Orientation 2026**.

---

## ⚡ Product Overview

**Geekroom Code Arena** is an arcade-style, high-stakes terminal quiz experience for first-year engineering students:

- **Original Geekroom Mascot (GKR-01 // "BitByte")**: Interactive 3D robotic mascot rendered with Three.js / React Three Fiber that follows cursor movement, with animated SVG emotion states across the quiz flow.
- **Official 50-Question Bank**: 20 Easy, 20 Medium, 10 Tough questions covering CS fundamentals, algorithms, data structures, OOP, recursion, and system concepts.
- **Fair Randomized Challenges**: Every participant receives exactly 5 questions (2 Easy + 2 Medium + 1 Tough), with randomized question selection and independently shuffled answer options.
- **Zero Friction — No Login Required**: Participants simply enter their name and jump straight into the arena. No accounts, no passwords, no admin gatekeeping.
- **Server-Side Source of Truth**: Answers, deadlines, scoring (Easy: 10 pts, Medium: 20 pts, Tough: 30 pts = 90 max), and tie-breakers are calculated and validated exclusively on the backend.
- **Resilient Quiz Arena**: Progress auto-saves as players navigate; attempts are persisted so refreshing the browser never resets the timer or loses questions.
- **Automated Expiry & Timer**: Synchronized 5-minute quiz countdown with automated submission upon deadline.
- **Live Event Leaderboard**: Ranks competitors in real-time with deterministic tie-breaking: `Score DESC` → `Time Taken ASC` → `Server Submission Timestamp ASC`.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS |
| **UI & Motion** | Framer Motion, Lucide React, Canvas Confetti |
| **3D Graphics** | Three.js, `@react-three/fiber`, `@react-three/drei` |
| **Backend** | Node.js, Express, TypeScript |
| **Database** | SQLite (`sqlite3`) zero-config local file, with PostgreSQL (`pg`) production support |
| **Containerization** | Docker, Docker Compose, Nginx |

---

## 🎯 Quiz Distribution & Points System

| Difficulty | Bank Size | Selected Per Attempt | Points Each | Subtotal |
|---|---|---|---|---|
| **Easy** | 20 (Q1–Q20) | 2 | 10 pts | 20 pts |
| **Medium** | 20 (Q21–Q40) | 2 | 20 pts | 40 pts |
| **Tough** | 10 (Q41–Q50) | 1 | 30 pts | 30 pts |
| **TOTAL** | **50 Questions** | **5 Questions** | — | **90 PTS** |

---

## 🚀 Quick Start Guide

### 1. Install Dependencies

```bash
cd backend && npm install
cd ../frontend && npm install
```

### 2. Seed Question Bank

```bash
cd backend
npm run seed
```

This seeds all 50 official questions (20 Easy, 20 Medium, 10 Tough).

### 3. Run Development Servers

**Option A — Run Both from Root:**
```bash
# Terminal 1: Backend API
npm run dev:backend

# Terminal 2: Frontend Web App
npm run dev:frontend
```

**Option B — Run Separately:**
```bash
# Backend (http://localhost:5001)
cd backend && npm run dev

# Frontend (http://localhost:5173)
cd frontend && npm run dev
```

---

## 🧪 Automated Test Suite (13 Scenarios)

Run the test suite:

```bash
npm run test
```

Verified scenarios:
1. Participant registration and quiz session initialization.
2. Exactly 5 questions generated per attempt.
3. Strict distribution: 2 Easy, 2 Medium, 1 Tough.
4. Zero duplicate questions per attempt.
5. Randomized question selection and option shuffling.
6. Correct answers and explanations are never exposed before submission.
7. Answer selection survives question navigation and page refresh.
8. Server-side scoring source of truth (10 + 20 + 30 = 90 max).
9. Idempotent submissions (repeated submits cannot duplicate score).
10. Server-enforced deadline expiration handling.
11. Deterministic leaderboard tie-breaking: `Score DESC`, `Time ASC`, `Timestamp ASC`.
12. Insufficient question pool error handling.

---

## 🐳 Production Deployment (Docker Compose)

```bash
docker compose up -d --build
```

Starts:
- `postgres:16-alpine`: PostgreSQL database on port 5432
- `geekroom_arena_api`: Node.js Express API on port 5001
- `geekroom_arena_ui`: Optimized Nginx server with reverse proxy on port 80

Open `http://localhost` in your browser.

---

<p align="center">
  <strong>Built with 💚 for Geekroom GTBIT Orientation 2026</strong><br />
  <em>Think Fast. Code Smart. Own the Arena.</em>
</p>
