import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './pages/LandingPage';
import { RegistrationPage } from './pages/RegistrationPage';
import { QuizArenaPage } from './pages/QuizArenaPage';
import { ResultsPage } from './pages/ResultsPage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { OrganizerPage } from './pages/OrganizerPage';

export const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-arena-bg text-slate-100 font-sans selection:bg-arena-cyan selection:text-black">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/arena/:attemptId" element={<QuizArenaPage />} />
            <Route path="/results/:attemptId" element={<ResultsPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/organizer" element={<OrganizerPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
