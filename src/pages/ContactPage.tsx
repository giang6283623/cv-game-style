import { motion } from "framer-motion";
import React, { useState } from "react";
import {
  FaComment,
  FaEnvelope,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaPhone,
  FaUser,
} from "react-icons/fa";
import DialogBox from "../components/game/DialogBox";
import GameCharacter from "../components/game/GameCharacter";
import { cvData } from "../data/cvData";

const ContactPage: React.FC = () => {
  const { personalInfo } = cvData;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      label: "Email",
      value: personalInfo.email,
      link: `mailto:${personalInfo.email}`,
      color: "#e94560",
    },
    {
      icon: <FaPhone />,
      label: "Phone",
      value: personalInfo.phone,
      link: `tel:${personalInfo.phone}`,
      color: "#6bcf7f",
    },
    {
      icon: <FaLinkedin />,
      label: "LinkedIn",
      value: "Connect on LinkedIn",
      link: personalInfo.linkedin,
      color: "#0077b5",
    },
    {
      icon: <FaMapMarkerAlt />,
      label: "Location",
      value: personalInfo.address,
      link: null,
      color: "#ffd93d",
    },
  ];

  return (
    <div className="contact-page">
      <motion.h1
        className="glitch"
        data-text="COMMUNICATION HUB"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: "center", marginBottom: "40px" }}
      >
        COMMUNICATION HUB
      </motion.h1>

      {/* Hero Dialog */}
      <DialogBox
        speaker="BUI VAN GIANG"
        avatar={
          <GameCharacter
            characterType="hero"
            size={64}
            animated={true}
            action="talk"
          />
        }
        text="Ready to start a new quest together? Let's connect and build something amazing!"
        showContinue={false}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "40px",
          marginTop: "40px",
        }}
      >
        {/* Contact Information */}
        <motion.section
          className="game-panel"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2
            style={{
              color: "#4ecdc4",
              marginBottom: "30px",
              textAlign: "center",
            }}
          >
            CONTACT CHANNELS
          </h2>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                {info.link ? (
                  <a
                    href={info.link}
                    target={info.link.startsWith("http") ? "_blank" : undefined}
                    rel={
                      info.link.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                        padding: "15px",
                        background: `linear-gradient(135deg, ${info.color}22, ${info.color}11)`,
                        border: `2px solid ${info.color}`,
                        borderRadius: "5px",
                        cursor: "pointer",
                        transition: "all 0.3s",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "1.5rem",
                          color: info.color,
                          width: "30px",
                          textAlign: "center",
                        }}
                      >
                        {info.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <p
                          style={{
                            margin: 0,
                            fontFamily: "Press Start 2P, cursive",
                            fontSize: "0.7rem",
                            color: info.color,
                            marginBottom: "5px",
                          }}
                        >
                          {info.label}
                        </p>
                        <p
                          style={{
                            margin: 0,
                            fontFamily: "Oxanium, sans-serif",
                            fontSize: "1.2rem",
                            color: "#fff",
                          }}
                        >
                          {info.value}
                        </p>
                      </div>
                    </div>
                  </a>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "15px",
                      padding: "15px",
                      background: `linear-gradient(135deg, ${info.color}22, ${info.color}11)`,
                      border: `2px solid ${info.color}`,
                      borderRadius: "5px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "1.5rem",
                        color: info.color,
                        width: "30px",
                        textAlign: "center",
                      }}
                    >
                      {info.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p
                        style={{
                          margin: 0,
                          fontFamily: "Press Start 2P, cursive",
                          fontSize: "0.7rem",
                          color: info.color,
                          marginBottom: "5px",
                        }}
                      >
                        {info.label}
                      </p>
                      <p
                        style={{
                          margin: 0,
                          fontFamily: "Oxanium, sans-serif",
                          fontSize: "1.2rem",
                          color: "#fff",
                        }}
                      >
                        {info.value}
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Contact Form */}
        <motion.section
          className="game-panel"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2
            style={{
              color: "#e94560",
              marginBottom: "30px",
              textAlign: "center",
            }}
          >
            SEND MESSAGE
          </h2>

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <div>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "10px",
                  fontFamily: "Press Start 2P, cursive",
                  fontSize: "0.7rem",
                  color: "#ffd93d",
                }}
              >
                <FaUser /> YOUR NAME
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "rgba(0, 0, 0, 0.5)",
                  border: "2px solid #533483",
                  color: "#fff",
                  fontFamily: "Oxanium, sans-serif",
                  fontSize: "1.3rem",
                  outline: "none",
                }}
                placeholder="Enter your name..."
              />
            </div>

            <div>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "10px",
                  fontFamily: "Press Start 2P, cursive",
                  fontSize: "0.7rem",
                  color: "#ffd93d",
                }}
              >
                <FaEnvelope /> YOUR EMAIL
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "rgba(0, 0, 0, 0.5)",
                  border: "2px solid #533483",
                  color: "#fff",
                  fontFamily: "Oxanium, sans-serif",
                  fontSize: "1.3rem",
                  outline: "none",
                }}
                placeholder="Enter your email..."
              />
            </div>

            <div>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "10px",
                  fontFamily: "Press Start 2P, cursive",
                  fontSize: "0.7rem",
                  color: "#ffd93d",
                }}
              >
                <FaComment /> YOUR MESSAGE
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "rgba(0, 0, 0, 0.5)",
                  border: "2px solid #533483",
                  color: "#fff",
                  fontFamily: "Oxanium, sans-serif",
                  fontSize: "1.3rem",
                  outline: "none",
                  resize: "vertical",
                }}
                placeholder="Type your message here..."
              />
            </div>

            <motion.button
              type="submit"
              className="pixel-button"
              style={{
                background: isSubmitted ? "#6bcf7f" : "#e94560",
                padding: "15px",
                fontSize: "0.9rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isSubmitted}
            >
              <FaPaperPlane />
              {isSubmitted ? "MESSAGE SENT!" : "SEND MESSAGE"}
            </motion.button>
          </form>

          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                marginTop: "20px",
                padding: "15px",
                background: "rgba(107, 207, 127, 0.2)",
                border: "2px solid #6bcf7f",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontFamily: "Oxanium, sans-serif",
                  fontSize: "1.3rem",
                  color: "#6bcf7f",
                  margin: 0,
                }}
              >
                ✓ Quest complete! Connect my Linkedin!
              </p>
            </motion.div>
          )}
        </motion.section>
      </div>

      {/* Footer Message */}
      <motion.div
        className="game-panel"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        style={{
          marginTop: "40px",
          textAlign: "center",
          background: "rgba(78, 205, 196, 0.1)",
          border: "2px dashed #4ecdc4",
        }}
      >
        <p
          style={{
            fontFamily: "Press Start 2P, cursive",
            fontSize: "0.8rem",
            color: "#4ecdc4",
            lineHeight: "1.8",
          }}
        >
          💬 LOOKING FORWARD TO CONNECTING WITH YOU! 💬
        </p>
        <p
          style={{
            fontFamily: "Oxanium, sans-serif",
            fontSize: "1.2rem",
            color: "#b8b8d1",
            marginTop: "10px",
          }}
        >
          Response time: Usually within 24 hours
        </p>
      </motion.div>
    </div>
  );
};

export default ContactPage;
