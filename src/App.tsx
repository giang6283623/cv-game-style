import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GameLayout from './components/GameLayout';
import HomePage from './pages/HomePage';
import ExperiencePage from './pages/ExperiencePage';
import SkillsPage from './pages/SkillsPage';
import EducationPage from './pages/EducationPage';
import AchievementsPage from './pages/AchievementsPage';
import ContactPage from './pages/ContactPage';
import './styles/game.css';
import './App.css';

function App() {
  return (
    <Router>
      <GameLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/education" element={<EducationPage />} />
          <Route path="/achievements" element={<AchievementsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </GameLayout>
    </Router>
  );
}

export default App
