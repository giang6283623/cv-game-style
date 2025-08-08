import { motion } from "framer-motion";
import React, { useState } from "react";
import {
  FaCalendar,
  FaCheckCircle,
  FaCode,
  FaCog,
  FaStar,
} from "react-icons/fa";
import GameCharacter from "../components/game/GameCharacter";
import { cvData } from "../data/cvData";
import useResponsive from "../hooks/useResponsive";

const ExperiencePage: React.FC = () => {
  const { experience } = cvData;
  const [selectedExp, setSelectedExp] = useState<number | null>(null);
  const { isMobile } = useResponsive();

  const getQuestLevel = (index: number) => {
    const levels = [
      "⭐⭐⭐⭐⭐",
      "⭐⭐⭐⭐⭐",
      "⭐⭐⭐⭐",
      "⭐⭐⭐",
      "⭐⭐",
      "⭐",
    ];
    return levels[index] || "⭐";
  };

  const getQuestStatus = (current: boolean) => {
    return current ? "ACTIVE" : "COMPLETED";
  };

  return (
    <div className="experience-page">
      <motion.h1
        className="glitch"
        data-text="QUEST LOG"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          textAlign: "center",
          marginBottom: isMobile ? "20px" : "40px",
          fontSize: isMobile ? "2rem" : "2.5rem",
        }}
      >
        QUEST LOG
      </motion.h1>

      <div
        style={{
          display: "grid",
          gap: isMobile ? "15px" : "30px",
          padding: isMobile ? "0 10px" : "0",
        }}
      >
        {experience.map((exp, index) => (
          <motion.div
            key={exp.id}
            className="game-panel"
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            style={{
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
              padding: isMobile ? "15px" : "20px",
            }}
            onClick={() => setSelectedExp(selectedExp === index ? null : index)}
            whileHover={{ scale: isMobile ? 1.01 : 1.02 }}
          >
            {/* Quest Header */}
            <div
              className="quest-header"
              style={{ marginBottom: isMobile ? "15px" : "20px" }}
            >
              <div style={{ flex: 1, marginBottom: isMobile ? "15px" : 0 }}>
                <div
                  className="company-info"
                  style={{
                    display: "flex",
                    alignItems: isMobile ? "flex-start" : "center",
                    flexDirection: isMobile ? "column" : "row",
                    gap: isMobile ? "10px" : "15px",
                    marginBottom: "10px",
                  }}
                >
                  <GameCharacter
                    characterType={exp.current ? "hero" : "npc"}
                    size={isMobile ? 40 : 48}
                    animated={exp.current}
                    action={exp.current ? "code" : "idle"}
                  />
                  <div>
                    <h3
                      style={{
                        margin: 0,
                        color: "#ffd93d",
                        fontSize: isMobile ? "1.2rem" : "1.5rem",
                      }}
                    >
                      {exp.position}
                    </h3>
                    <p
                      style={{
                        margin: "5px 0 0 0",
                        fontFamily: "VT323, monospace",
                        color: "#4ecdc4",
                        fontSize: isMobile ? "1.1rem" : "1.3rem",
                      }}
                    >
                      {exp.company}
                    </p>
                  </div>
                </div>

                <div
                  className="date-status"
                  style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    gap: isMobile ? "10px" : "20px",
                    marginTop: "10px",
                    alignItems: isMobile ? "flex-start" : "center",
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontFamily: "VT323, monospace",
                      fontSize: isMobile ? "1rem" : "1.2rem",
                    }}
                  >
                    <FaCalendar color="#b8b8d1" />
                    {exp.period}
                  </span>
                  <span
                    style={{
                      padding: isMobile ? "2px 10px" : "4px 12px",
                      background: exp.current ? "#ffd93d" : "#6bcf7f",
                      color: exp.current ? "#000" : "#fff",
                      fontFamily: "Press Start 2P, cursive",
                      fontSize: isMobile ? "0.4rem" : "0.5rem",
                      height: isMobile ? "24px" : "32px",
                      borderRadius: "4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      minWidth: isMobile ? "80px" : "100px",
                      textAlign: "center",
                    }}
                  >
                    {getQuestStatus(exp.current)}
                  </span>
                </div>
              </div>

              {/* Quest Difficulty */}
              <div className="quest-difficulty">
                <p
                  style={{
                    fontFamily: "Press Start 2P, cursive",
                    fontSize: isMobile ? "0.6rem" : "0.7rem",
                    color: "#ffb800",
                    margin: "0 0 5px 0",
                  }}
                >
                  DIFFICULTY
                </p>
                <div style={{ fontSize: isMobile ? "1rem" : "1.2rem" }}>
                  {getQuestLevel(index)}
                </div>
              </div>
            </div>

            {/* Quest Details (Expandable) */}
            <motion.div
              className="quest-detail"
              initial={false}
              animate={{ height: selectedExp === index ? "auto" : 0 }}
              style={{ overflow: "hidden" }}
            >
              {/* Responsibilities / Quest Objectives */}
              <div className="quest-objective">
                <h4
                  style={{
                    color: "#e94560",
                    marginBottom: isMobile ? "10px" : "15px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: isMobile ? "0.9rem" : "1rem",
                  }}
                >
                  <FaCheckCircle /> QUEST OBJECTIVES
                </h4>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                  }}
                >
                  {exp.responsibilities.map((resp, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      style={{
                        marginBottom: isMobile ? "8px" : "10px",
                        paddingLeft: isMobile ? "20px" : "30px",
                        position: "relative",
                        fontFamily: "VT323, monospace",
                        fontSize: isMobile ? "1.1rem" : "1.3rem",
                        lineHeight: "1.6",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          left: 0,
                          color: "#6bcf7f",
                        }}
                      >
                        ▶
                      </span>
                      {resp}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack / Equipment */}
              {exp.techStack && exp.techStack.length > 0 && (
                <div className="quest-equipment">
                  <h4
                    style={{
                      color: "#4ecdc4",
                      marginBottom: isMobile ? "10px" : "15px",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      fontSize: isMobile ? "0.9rem" : "1rem",
                    }}
                  >
                    <FaCog /> EQUIPMENT & TOOLS
                  </h4>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: isMobile ? "8px" : "10px",
                    }}
                  >
                    {exp.techStack.map((tech, i) => (
                      <motion.span
                        key={i}
                        className="skill-badge"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.03 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              )}

              {/* Achievements / Rewards */}
              {exp.achievements && exp.achievements.length > 0 && (
                <div className="quest-rewards">
                  <h4
                    style={{
                      color: "#ffd93d",
                      marginBottom: isMobile ? "10px" : "15px",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      fontSize: isMobile ? "0.9rem" : "1rem",
                    }}
                  >
                    <FaStar /> QUEST REWARDS
                  </h4>
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                    }}
                  >
                    {exp.achievements.map((achievement, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        style={{
                          marginBottom: isMobile ? "8px" : "10px",
                          paddingLeft: isMobile ? "20px" : "30px",
                          position: "relative",
                          fontFamily: "VT323, monospace",
                          fontSize: isMobile ? "1.1rem" : "1.3rem",
                          lineHeight: "1.6",
                        }}
                      >
                        <span
                          style={{
                            position: "absolute",
                            left: 0,
                            color: "#ffd93d",
                          }}
                        >
                          ⭐
                        </span>
                        {achievement}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Features (if available) */}
              {exp.features && (
                <div className="quest-features">
                  <h4
                    style={{
                      color: "#f47068",
                      marginBottom: isMobile ? "10px" : "15px",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      fontSize: isMobile ? "0.9rem" : "1rem",
                    }}
                  >
                    <FaCode /> SPECIAL FEATURES
                  </h4>
                  {exp.features.miniApp && (
                    <div style={{ marginBottom: isMobile ? "15px" : "20px" }}>
                      <h5
                        style={{
                          color: "#b8b8d1",
                          marginBottom: isMobile ? "5px" : "10px",
                          fontSize: isMobile ? "0.85rem" : "1rem",
                        }}
                      >
                        Mini App Features:
                      </h5>
                      <ul style={{ paddingLeft: isMobile ? "15px" : "20px" }}>
                        {exp.features.miniApp.map((feature, i) => (
                          <li
                            key={i}
                            style={{
                              fontFamily: "VT323, monospace",
                              fontSize: isMobile ? "1.1rem" : "1.2rem",
                              marginBottom: isMobile ? "3px" : "5px",
                            }}
                          >
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {exp.features.dashboard && (
                    <div>
                      <h5
                        style={{
                          color: "#b8b8d1",
                          marginBottom: isMobile ? "5px" : "10px",
                          fontSize: isMobile ? "0.85rem" : "1rem",
                        }}
                      >
                        Dashboard Features:
                      </h5>
                      <ul style={{ paddingLeft: isMobile ? "15px" : "20px" }}>
                        {exp.features.dashboard.map((feature, i) => (
                          <li
                            key={i}
                            style={{
                              fontFamily: "VT323, monospace",
                              fontSize: isMobile ? "1.1rem" : "1.2rem",
                              marginBottom: isMobile ? "3px" : "5px",
                            }}
                          >
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </motion.div>

            {/* Expand/Collapse Indicator */}
            <motion.div
              className="quest-expand-indicator"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              {selectedExp === index ? "▲" : "▼"}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ExperiencePage;
