import { motion } from "framer-motion";
import React from "react";
import {
  FaAws,
  FaBrain,
  FaComments,
  FaCss3Alt,
  FaDocker,
  FaGitAlt,
  FaHandshake,
  FaHtml5,
  FaJs,
  FaLightbulb,
  FaLinux,
  FaNodeJs,
  FaPalette,
  FaPhp,
  FaPython,
  FaReact,
  FaRocket,
  FaUsers,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiVite,
  SiWebpack,
} from "react-icons/si";
import GameCharacter from "../components/game/GameCharacter";
import SkillBar from "../components/game/SkillBar";
import { cvData } from "../data/cvData";

const SkillsPage: React.FC = () => {
  const { skills } = cvData;

  // Map skills to levels (percentage)
  const technicalSkillLevels: {
    [key: string]: { level: number; icon?: React.ReactNode };
  } = {
    React: { level: 95, icon: <FaReact /> },
    NextJS: { level: 80, icon: <SiNextdotjs /> },
    TypeScript: { level: 85, icon: <SiTypescript /> },
    JavaScript: { level: 95, icon: <FaJs /> },
    HTML5: { level: 95, icon: <FaHtml5 /> },
    CSS3: { level: 90, icon: <FaCss3Alt /> },
    "Node.js": { level: 25, icon: <FaNodeJs /> },
    Python: { level: 25, icon: <FaPython /> },
    PHP: { level: 70, icon: <FaPhp /> },
    Docker: { level: 75, icon: <FaDocker /> },
    AWS: { level: 70, icon: <FaAws /> },
    Git: { level: 80, icon: <FaGitAlt /> },
    Linux: { level: 75, icon: <FaLinux /> },
    "Material UI": { level: 95, icon: <FaPalette /> },
    "Tailwind CSS": { level: 80, icon: <SiTailwindcss /> },
    "Framer Motion": { level: 80, icon: <FaRocket /> },
    Vite: { level: 85, icon: <SiVite /> },
    Webpack: { level: 75, icon: <SiWebpack /> },
  };

  const softSkillLevels: {
    [key: string]: { level: number; icon?: React.ReactNode };
  } = {
    "Team Leadership": { level: 85, icon: <FaUsers /> },
    "Problem Solving": { level: 90, icon: <FaLightbulb /> },
    Communication: { level: 85, icon: <FaComments /> },
    "Project Management": { level: 20, icon: <FaBrain /> },
    "Client Relations": { level: 85, icon: <FaHandshake /> },
    Adaptability: { level: 95, icon: <FaRocket /> },
    "Knowledge Sharing": { level: 90, icon: <FaUsers /> },
    "Analytical Thinking": { level: 90, icon: <FaBrain /> },
  };

  return (
    <div className="skills-page">
      <motion.h1
        className="glitch"
        data-text="ABILITIES & POWERS"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: "center", marginBottom: "40px" }}
      >
        ABILITIES & POWERS
      </motion.h1>

      {/* Character Stats Overview */}
      <motion.div
        className="game-panel"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{ marginBottom: "40px" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "40px",
            flexWrap: "wrap",
          }}
        >
          <GameCharacter
            characterType="hero"
            size={100}
            action="code"
            animated={true}
          />
          <div style={{ textAlign: "center" }}>
            <h2 style={{ color: "#ffd93d", marginBottom: "10px" }}>
              DEVELOPER CLASS
            </h2>
            <p
              style={{
                fontFamily: "VT323, monospace",
                fontSize: "1.5rem",
                color: "#4ecdc4",
              }}
            >
              R&D Engineer | FE Developer
            </p>
            <div
              style={{
                display: "flex",
                gap: "20px",
                marginTop: "20px",
                justifyContent: "center",
              }}
            >
              <div>
                <span style={{ color: "#6bcf7f", fontSize: "2rem" }}>18</span>
                <p style={{ margin: 0, fontSize: "0.8rem" }}>TECH SKILLS</p>
              </div>
              <div>
                <span style={{ color: "#e94560", fontSize: "2rem" }}>8</span>
                <p style={{ margin: 0, fontSize: "0.8rem" }}>SOFT SKILLS</p>
              </div>
              <div>
                <span style={{ color: "#ffd93d", fontSize: "2rem" }}>7+</span>
                <p style={{ margin: 0, fontSize: "0.8rem" }}>YEARS EXP</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Technical Skills */}
      <motion.section
        className="game-panel"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        style={{ marginBottom: "40px" }}
      >
        <h2
          style={{
            color: "#4ecdc4",
            marginBottom: "30px",
            textAlign: "center",
          }}
        >
          ⚔️ TECHNICAL ABILITIES ⚔️
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {skills.technical.map((skill, index) => {
            const skillData = technicalSkillLevels[skill] || { level: 70 };
            return (
              <motion.div
                key={skill}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <SkillBar
                  skill={skill}
                  level={skillData.level}
                  color={
                    index % 5 === 0
                      ? "primary"
                      : index % 5 === 1
                      ? "info"
                      : index % 5 === 2
                      ? "success"
                      : index % 5 === 3
                      ? "warning"
                      : "secondary"
                  }
                  icon={skillData.icon}
                  animated={true}
                />
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Soft Skills */}
      <motion.section
        className="game-panel"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2
          style={{
            color: "#e94560",
            marginBottom: "30px",
            textAlign: "center",
          }}
        >
          🛡️ SOFT SKILLS & TRAITS 🛡️
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {skills.soft.map((skill, index) => {
            const skillData = softSkillLevels[skill] || { level: 75 };
            return (
              <motion.div
                key={skill}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
              >
                <SkillBar
                  skill={skill}
                  level={skillData.level}
                  color={
                    index % 3 === 0
                      ? "warning"
                      : index % 3 === 1
                      ? "success"
                      : "primary"
                  }
                  icon={skillData.icon}
                  animated={true}
                />
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Skill Legend */}
      <motion.div
        className="game-panel"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        style={{
          marginTop: "40px",
          textAlign: "center",
          background: "rgba(22, 33, 62, 0.5)",
        }}
      >
        <h3 style={{ color: "#ffd93d", marginBottom: "20px" }}>
          SKILL LEVEL LEGEND
        </h3>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "30px",
            flexWrap: "wrap",
            fontFamily: "VT323, monospace",
            fontSize: "1.2rem",
          }}
        >
          <span>
            <span style={{ color: "#ff6b6b" }}>0-20%</span> NOVICE
          </span>
          <span>
            <span style={{ color: "#ffb800" }}>20-40%</span> BEGINNER
          </span>
          <span>
            <span style={{ color: "#ffd93d" }}>40-60%</span> INTERMEDIATE
          </span>
          <span>
            <span style={{ color: "#4ecdc4" }}>60-75%</span> ADVANCED
          </span>
          <span>
            <span style={{ color: "#6bcf7f" }}>75-90%</span> EXPERT
          </span>
          <span>
            <span style={{ color: "#e94560" }}>90-100%</span> MASTER
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default SkillsPage;
