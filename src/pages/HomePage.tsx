import { motion } from "framer-motion";
import React from "react";
import { FaEnvelope, FaEye, FaLinkedin, FaPhone } from "react-icons/fa";
import { GiCrossedSwords } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import DialogBox from "../components/game/DialogBox";
import GameButton from "../components/game/GameButton";
import GameCharacter from "../components/game/GameCharacter";
import { cvData } from "../data/cvData";

const HomePage: React.FC = () => {
  const { personalInfo, objective } = cvData;
  const navigate = useNavigate();

  const iconMap: { [key: string]: React.ReactNode } = {
    linkedin: <FaLinkedin />,
    email: <FaEnvelope />,
    phone: <FaPhone />,
  };

  const contactButtons = [
    {
      label: "LinkedIn",
      icon: iconMap.linkedin,
      url: personalInfo.linkedin,
      color: "#0077b5",
    },
    {
      label: "Email",
      icon: iconMap.email,
      url: `mailto:${personalInfo.email}`,
      color: "#e94560",
    },
    {
      label: "Phone",
      icon: iconMap.phone,
      url: `tel:${personalInfo.phone}`,
      color: "#6bcf7f",
    },
  ];

  return (
    <div
      className="home-page"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "40px",
        position: "relative",
        minHeight: "100vh",
      }}
    >
      {/* Hero Section */}
      <motion.section
        className="game-panel"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          width: "100%",
          padding: "40px",
          background:
            "url(/assets/backgrounds/hero-bg.png) no-repeat center center / cover",
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Static Display Character */}
        <div
          style={{
            height: "128px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <GameCharacter
            characterType="hero"
            size={128}
            action="idle"
            animated={true}
          />
        </div>
        <h1
          data-text={personalInfo.name}
          className="glitch"
          style={{
            fontSize: "2.5rem",
            margin: "20px 0 10px 0",
            color: "#ffd93d",
          }}
        >
          {personalInfo.name}
        </h1>
        <p
          style={{
            fontFamily: "VT323, monospace",
            fontSize: "1.5rem",
            color: "#4ecdc4",
          }}
        >
          {personalInfo.title}
        </p>

        {/* Quick Action Buttons */}
        <div
          style={{
            marginTop: "30px",
            display: "flex",
            gap: "20px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <GameButton
            onClick={() => navigate("/experience")}
            variant="primary"
            icon={<GiCrossedSwords />}
            size="large"
          >
            Start Quest
          </GameButton>

          <GameButton
            onClick={() => navigate("/skills")}
            variant="secondary"
            icon={<FaEye />}
            size="large"
          >
            View Skills
          </GameButton>
        </div>
      </motion.section>

      {/* Objective/Mission Section */}
      <section style={{ width: "100%" }}>
        <DialogBox
          speaker="Bùi Văn Giang"
          avatar={
            <GameCharacter characterType="npc" size={64} animated={false} />
          }
          text={`"${objective}"`}
          showContinue={false}
        />
      </section>

      {/* Contact & Social Links */}
      <motion.section
        className="game-panel"
        style={{
          width: "100%",
          textAlign: "center",
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <h2>Contact & Socials</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          {contactButtons.map((btn) => (
            <GameButton
              key={btn.label}
              href={btn.url}
              target="_blank"
              variant={
                btn.label === "LinkedIn"
                  ? "info"
                  : btn.label === "Email"
                  ? "danger"
                  : "success"
              }
              icon={btn.icon}
              size="medium"
            >
              {btn.label}
            </GameButton>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default HomePage;
