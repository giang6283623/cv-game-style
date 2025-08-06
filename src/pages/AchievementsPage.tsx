import React from 'react';
import { motion } from 'framer-motion';
import { cvData } from '../data/cvData';
import GameCharacter from '../components/game/GameCharacter';
import { FaTrophy, FaCertificate, FaMedal, FaStar, FaCrown, FaMicrosoft } from 'react-icons/fa';

const AchievementsPage: React.FC = () => {
  const { awards, certificates } = cvData;

  return (
    <div className="achievements-page">
      <motion.h1 
        className="glitch"
        data-text="TROPHY ROOM"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', marginBottom: '40px' }}
      >
        TROPHY ROOM
      </motion.h1>

      {/* Hero Section */}
      <motion.div
        className="game-panel"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          textAlign: 'center',
          marginBottom: '40px',
          background: 'linear-gradient(135deg, rgba(255, 217, 61, 0.1), rgba(233, 69, 96, 0.1))'
        }}
      >
        <GameCharacter 
          characterType="boss" 
          size={100} 
          animated={true}
          action="idle"
        />
        <h2 style={{ color: '#ffd93d', marginTop: '20px' }}>LEGENDARY ACHIEVEMENTS</h2>
        <p style={{ 
          fontFamily: 'VT323, monospace',
          fontSize: '1.4rem',
          color: '#4ecdc4'
        }}>
          Badges of Honor & Certificates of Power
        </p>
      </motion.div>

      {/* Awards Section */}
      <motion.section
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        style={{ marginBottom: '40px' }}
      >
        <h2 style={{ 
          textAlign: 'center',
          color: '#FFD93D',
          marginBottom: '30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '15px'
        }}>
          <FaTrophy /> COMPETITION AWARDS <FaTrophy />
        </h2>
        
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '25px'
        }}>
          {awards.map((award, index) => (
            <motion.div
              key={award.id}
              className="game-panel"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
              style={{
                position: 'relative',
                background: 'linear-gradient(135deg, rgba(26, 26, 46, 0.95), rgba(22, 33, 62, 0.9))',
                border: '3px solid #FFD93D',
                padding: '25px',
                paddingTop: '35px',
                borderRadius: '10px',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.4)'
              }}
            >
              {/* Trophy Icon */}
              <div style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                fontSize: '1.8rem',
                zIndex: 1,
                filter: 'drop-shadow(0 0 5px rgba(255, 217, 61, 0.5))'
              }}>
                {index === 0 ? <FaCrown color="#FFD700" /> : <FaMedal color="#FFB800" />}
              </div>

              <h3 style={{ 
                color: '#FFD93D',
                marginBottom: '15px',
                fontFamily: 'Press Start 2P, cursive',
                fontSize: '0.75rem',
                paddingRight: '45px',
                lineHeight: '1.5',
                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
              }}>
                {award.title}
              </h3>
              
              <p style={{ 
                fontFamily: 'VT323, monospace',
                fontSize: '1.3rem',
                color: '#4ECDC4',
                marginBottom: '10px',
                textShadow: '1px 1px 1px rgba(0, 0, 0, 0.3)'
              }}>
                {award.organization}
              </p>
              
              <p style={{ 
                fontFamily: 'VT323, monospace',
                fontSize: '1.1rem',
                color: '#E0E0E0',
                marginBottom: '20px',
                lineHeight: '1.5'
              }}>
                {award.description}
              </p>
              
              <div style={{
                marginTop: 'auto',
                padding: '8px 14px',
                background: 'rgba(255, 217, 61, 0.15)',
                display: 'inline-block',
                borderRadius: '5px',
                border: '2px solid #FFD93D'
              }}>
                <span style={{ 
                  fontFamily: 'Press Start 2P, cursive',
                  fontSize: '0.6rem',
                  color: '#FFD93D',
                  textShadow: '1px 1px 1px rgba(0, 0, 0, 0.5)'
                }}>
                  {award.year}
                </span>
              </div>

            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Certificates Section */}
      <motion.section
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
        style={{ marginBottom: '40px' }}
      >
        <h2 style={{ 
          textAlign: 'center',
          color: '#4ECDC4',
          marginBottom: '30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '15px'
        }}>
          <FaCertificate /> PROFESSIONAL CERTIFICATIONS <FaCertificate />
        </h2>
        
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '25px'
        }}>
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              className="game-panel"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              whileHover={{ 
                scale: 1.03,
                y: -5,
                boxShadow: '0 10px 30px rgba(78, 205, 196, 0.4)'
              }}
              style={{
                background: 'linear-gradient(135deg, rgba(22, 33, 62, 0.95), rgba(26, 26, 46, 0.9))',
                border: '3px solid #4ECDC4',
                padding: '30px 20px',
                position: 'relative',
                textAlign: 'center',
                borderRadius: '10px',
                minHeight: '250px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.4)'
              }}
            >
              {/* Microsoft Icon */}
              <div style={{
                fontSize: '2.8rem',
                marginBottom: '20px',
                color: '#00D9FF',
                filter: 'drop-shadow(0 0 15px rgba(0, 217, 255, 0.6))'
              }}>
                <FaMicrosoft />
              </div>

              <h3 style={{ 
                color: '#4ECDC4',
                marginBottom: '15px',
                fontSize: '0.8rem',
                lineHeight: '1.5',
                fontFamily: 'Press Start 2P, cursive',
                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
              }}>
                {cert.title}
              </h3>
              
              <p style={{ 
                fontFamily: 'VT323, monospace',
                fontSize: '1.3rem',
                color: '#FFD93D',
                marginBottom: '20px',
                textShadow: '1px 1px 1px rgba(0, 0, 0, 0.3)'
              }}>
                {cert.issuer}
              </p>
              
              <div style={{
                marginTop: 'auto',
                padding: '10px 18px',
                background: 'rgba(78, 205, 196, 0.15)',
                border: '2px solid #4ECDC4',
                borderRadius: '5px'
              }}>
                <span style={{ 
                  fontFamily: 'Press Start 2P, cursive',
                  fontSize: '0.6rem',
                  color: '#4ECDC4',
                  textShadow: '1px 1px 1px rgba(0, 0, 0, 0.5)'
                }}>
                  EARNED: {cert.year}
                </span>
              </div>

              {/* Corner Stars - smaller and less intrusive */}
              <div style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                color: '#FFD93D',
                fontSize: '0.8rem',
                opacity: 0.6
              }}>
                <FaStar />
              </div>
              <div style={{
                position: 'absolute',
                bottom: '12px',
                left: '12px',
                color: '#FFD93D',
                fontSize: '0.8rem',
                opacity: 0.6
              }}>
                <FaStar />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Achievement Summary */}
      <motion.div
        className="game-panel"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        style={{
          marginTop: '40px',
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(26, 26, 46, 0.95), rgba(22, 33, 62, 0.9))',
          border: '3px solid #FFD93D'
        }}
      >
        <h3 style={{ 
          color: '#FFD93D', 
          marginBottom: '20px',
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
        }}>
          ACHIEVEMENT STATS
        </h3>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '40px',
          flexWrap: 'wrap'
        }}>
          <div>
            <span style={{ 
              fontSize: '2rem', 
              color: '#FF6B6B',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
            }}>
              {awards.length}
            </span>
            <p style={{ 
              margin: 0, 
              fontSize: '0.8rem',
              color: '#E0E0E0'
            }}>
              AWARDS
            </p>
          </div>
          <div>
            <span style={{ 
              fontSize: '2rem', 
              color: '#4ECDC4',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
            }}>
              {certificates.length}
            </span>
            <p style={{ 
              margin: 0, 
              fontSize: '0.8rem',
              color: '#E0E0E0'
            }}>
              CERTIFICATES
            </p>
          </div>
          <div>
            <span style={{ 
              fontSize: '2rem', 
              color: '#95E77E',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
            }}>
              {awards.length + certificates.length}
            </span>
            <p style={{ 
              margin: 0, 
              fontSize: '0.8rem',
              color: '#E0E0E0'
            }}>
              TOTAL
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AchievementsPage;
