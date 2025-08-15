import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import {
  FaBriefcase,
  FaCode,
  FaEnvelope,
  FaGamepad,
  FaGraduationCap,
  FaHeart,
  FaHome,
  FaMap,
  FaStar,
  FaTrophy,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ControlsHelp from "./game/ControlsHelp";
import DungeonMap from "./game/DungeonMap";
import GameCharacter from "./game/GameCharacter";
import PlayableCharacter from "./game/PlayableCharacter";

interface GameLayoutProps {
  children: React.ReactNode;
}

const GameLayout: React.FC<GameLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [health] = useState(100);
  const [experience, setExperience] = useState(0);
  const [level, setLevel] = useState(1);
  const [coins, setCoins] = useState(0);
  const [showMap, setShowMap] = useState(false);
  const [characterPosition] = useState({ x: 50, y: 80 });
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallMobile, setIsSmallMobile] = useState(false);

  const menuItems = [
    { path: "/", label: "HOME", icon: <FaHome />, color: "#00D9FF" },
    {
      path: "/experience",
      label: "QUESTS",
      icon: <FaBriefcase />,
      color: "#FF6B6B",
    },
    { path: "/skills", label: "SKILLS", icon: <FaCode />, color: "#4ECDC4" },
    {
      path: "/education",
      label: "LEARN",
      icon: <FaGraduationCap />,
      color: "#95E77E",
    },
    {
      path: "/achievements",
      label: "AWARDS",
      icon: <FaTrophy />,
      color: "#FFD93D",
    },
    {
      path: "/contact",
      label: "CONTACT",
      icon: <FaEnvelope />,
      color: "#FF8CC3",
    },
  ];

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsSmallMobile(window.innerWidth <= 480);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    // Simulate gaining experience on page navigation
    setExperience((prev) => {
      const newExp = prev + 10;
      if (newExp >= 100) {
        setLevel((l) => l + 1);
        setCoins((c) => c + 50);
        return newExp % 100;
      }
      return newExp;
    });
  }, [location]);

  // Keyboard controls for map - only ESC to close
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowMap(false);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [showMap]);

  return (
    <div
      style={{
        minHeight: "100vh",
        position: "relative",
        paddingBottom: "50px",
      }}
    >
      {/* Playable Character - Global */}
      <PlayableCharacter size={80} speed={3} />

      {/* Controls Help - Global */}
      {!isMobile && <ControlsHelp />}

      {/* Dungeon Map Modal - Global */}
      <AnimatePresence>
        {showMap && (
          <motion.div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0, 0, 0, 0.9)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 2000, // Higher than header
              padding: "20px",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowMap(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{ position: "relative" }}
            >
              <DungeonMap
                characterPosition={characterPosition}
                onNodeClick={(node) => {
                  navigate(node.path);
                  setShowMap(false);
                }}
                onClose={() => setShowMap(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Game Header / HUD */}
      <header
        style={{
          background:
            "linear-gradient(180deg, rgba(26, 26, 46, 0.98) 0%, rgba(22, 33, 62, 0.95) 100%)",
          borderBottom: "4px solid rgb(4, 4, 44)",
          padding: isMobile ? "10px" : "20px",
          position: "sticky",
          top: 0,
          zIndex: 100,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
          overflow: "hidden",
        }}
      >
        <div style={{}}>
          {/* Top HUD */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: isMobile ? "flex-start" : "center",
              marginBottom: isMobile ? "10px" : "20px",
              flexWrap: isMobile ? "wrap" : "nowrap",
              gap: isMobile ? "10px" : "0",
            }}
          >
            {/* Player Info */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: isMobile ? "10px" : "20px",
                minWidth: isMobile ? "150px" : "auto",
              }}
            >
              <GameCharacter
                characterType="hero"
                size={isMobile ? 36 : 48}
                animated={true}
              />
              <div>
                <h1
                  style={{
                    fontFamily: "Press Start 2P, cursive",
                    fontSize: isMobile ? "0.6rem" : "1rem",
                    margin: 0,
                    color: "#ffd93d",
                    textShadow: "2px 2px 0 #000",
                    whiteSpace: "nowrap",
                  }}
                >
                  BUI VAN GIANG
                </h1>
                <p
                  style={{
                    fontFamily: "Oxanium, sans-serif",
                    fontSize: isMobile ? "0.9rem" : "1.2rem",
                    margin: "2px 0 0 0",
                    color: "#4ecdc4",
                    whiteSpace: "nowrap",
                  }}
                >
                  Level {level}
                  {!isSmallMobile && " Developer"}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div
              style={{
                display: "flex",
                gap: isMobile ? "15px" : "30px",
                alignItems: "center",
                flexWrap: isSmallMobile ? "wrap" : "nowrap",
                width: isMobile ? "100%" : "auto",
              }}
            >
              {/* Health Bar */}
              <div style={{ minWidth: isMobile ? "140px" : "200px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: isMobile ? "5px" : "10px",
                    marginBottom: "3px",
                  }}
                >
                  <FaHeart color="#ff6b6b" size={isMobile ? 12 : 16} />
                  <span
                    style={{
                      fontFamily: "Oxanium, sans-serif",
                      color: "#fff",
                      fontSize: isMobile ? "0.9rem" : "1.2rem",
                    }}
                  >
                    HP: {health}/100
                  </span>
                </div>
                <div
                  style={{
                    width: isMobile ? "140px" : "200px",
                    height: isMobile ? "14px" : "20px",
                    background: "#2a2a2a",
                    border: "2px solid #000",
                    position: "relative",
                  }}
                >
                  <motion.div
                    style={{
                      height: "100%",
                      background: "linear-gradient(to right, #ff6b6b, #ee5a5a)",
                      width: `${health}%`,
                    }}
                    animate={{ width: `${health}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Experience Bar */}
              <div style={{ minWidth: isMobile ? "140px" : "200px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: isMobile ? "5px" : "10px",
                    marginBottom: "3px",
                  }}
                >
                  <FaStar color="#ffd93d" size={isMobile ? 12 : 16} />
                  <span
                    style={{
                      fontFamily: "Oxanium, sans-serif",
                      color: "#fff",
                      fontSize: isMobile ? "0.9rem" : "1.2rem",
                    }}
                  >
                    EXP: {experience}/100
                  </span>
                </div>
                <div
                  style={{
                    width: isMobile ? "140px" : "200px",
                    height: isMobile ? "14px" : "20px",
                    background: "#2a2a2a",
                    border: "2px solid #000",
                    position: "relative",
                  }}
                >
                  <motion.div
                    style={{
                      height: "100%",
                      background: "linear-gradient(to right, #ffd93d, #ffb800)",
                      width: `${experience}%`,
                    }}
                    animate={{ width: `${experience}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Coins */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: isMobile ? "5px" : "10px",
                }}
              >
                <div
                  style={{
                    width: isMobile ? "24px" : "30px",
                    height: isMobile ? "24px" : "30px",
                    background: "#ffd700",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "2px solid #b8860b",
                    fontSize: isMobile ? "0.9rem" : "1.2rem",
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  ¢
                </div>
                <span
                  style={{
                    fontFamily: "Press Start 2P, cursive",
                    fontSize: isMobile ? "0.7rem" : "0.9rem",
                    color: "#ffd93d",
                  }}
                >
                  {coins}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav>
            <ul
              style={{
                display: "flex",
                gap: "10px",
                listStyle: "none",
                padding: 0,
                margin: 0,
                flexWrap: "wrap",
                justifyContent: "center", // Center the navigation buttons
              }}
            >
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link to={item.path} style={{ textDecoration: "none" }}>
                      <motion.button
                        className="pixel-button"
                        style={{
                          background: isActive
                            ? `linear-gradient(135deg, ${item.color}, ${item.color}99)`
                            : "linear-gradient(135deg, #2C2F4A, #1F2235)",
                          border: isActive
                            ? `2px solid ${item.color}`
                            : "2px solid #4A4E69",
                          padding: isMobile ? "6px 10px" : "8px 12px",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          fontSize: isMobile ? "0.5rem" : "0.65rem",
                          fontFamily: "Press Start 2P, cursive",
                          color: isActive ? "#fff" : "#9CA3AF",
                          cursor: "pointer",
                          position: "relative",
                          overflow: "hidden",
                          margin: 0,
                          height: isMobile ? "36px" : "38px",
                          boxShadow: isActive
                            ? `0 0 12px ${item.color}55`
                            : "none",
                        }}
                        whileHover={{
                          scale: 1.05,
                          boxShadow: `0 0 20px ${item.color}66`,
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span style={{ fontSize: "1rem" }}>{item.icon}</span>
                        {!isMobile && item.label}
                        {isMobile && !isSmallMobile && item.label}
                        {isActive && (
                          <motion.div
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              background: `linear-gradient(90deg, transparent, ${item.color}33, transparent)`,
                              pointerEvents: "none",
                            }}
                            animate={{
                              x: ["-100%", "100%"],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          />
                        )}
                      </motion.button>
                    </Link>
                  </li>
                );
              })}
              {/* Map Button */}
              <li>
                <motion.button
                  className="pixel-button"
                  style={{
                    background: "linear-gradient(135deg, #9333EA, #7C3AED)",
                    border: "2px solid #A855F7",
                    padding: isMobile ? "6px 10px" : "8px 12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: isMobile ? "0.5rem" : "0.65rem",
                    fontFamily: "Press Start 2P, cursive",
                    color: "#fff",
                    cursor: "pointer",
                    position: "relative",
                    overflow: "hidden",
                    margin: 0,
                    height: isMobile ? "36px" : "38px",
                    boxShadow: "0 0 12px rgba(168, 85, 247, 0.3)",
                  }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 20px #ffd93d66",
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowMap(true)}
                >
                  <span style={{ fontSize: "1rem" }}>
                    <FaMap />
                  </span>
                  {!isMobile && "MAP"}
                  {isMobile && !isSmallMobile && "MAP"}
                </motion.button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "40px 20px",
          position: "relative",
          zIndex: 10,
        }}
      >
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </main>

      {/* Footer */}
      <footer
        style={{
          background: "rgba(22, 33, 62, 0.95)",
          borderTop: "4px solid #533483",
          padding: "20px",
          textAlign: "center",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <p
          style={{
            fontFamily: "Oxanium, sans-serif",
            fontSize: "1.2rem",
            color: "#b8b8d1",
            margin: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <FaGamepad /> Created with React + TypeScript | Game Mode: ON
        </p>
      </footer>
    </div>
  );
};

export default GameLayout;
