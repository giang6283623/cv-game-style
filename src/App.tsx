import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import GameLayout from "./components/GameLayout";
import AchievementsPage from "./pages/AchievementsPage";
import ContactPage from "./pages/ContactPage";
import EducationPage from "./pages/EducationPage";
import ExperiencePage from "./pages/ExperiencePage";
import HomePage from "./pages/HomePage";
import SkillsPage from "./pages/SkillsPage";

import "./App.css";
import "./styles/game.css";
import { preloadSprites } from "./ultils/spritePreloader";

// Call preloadSprites early in your app initialization
preloadSprites()
  .then(() => {
    console.log("Sprites loaded, app ready!");
  })
  .catch((error) => {
    console.warn("Sprite preloading had some issues:", error);
  });

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

export default App;
