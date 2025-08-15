import React from 'react';
import { motion } from 'framer-motion';
import { cvData } from '../data/cvData';
import GameCharacter from '../components/game/GameCharacter';
import { FaGraduationCap, FaUniversity, FaCalendarAlt, FaBook } from 'react-icons/fa';

const EducationPage: React.FC = () => {
  const { education } = cvData;

  return (
    <div className="education-page">
      <motion.h1 
        className="glitch"
        data-text="TRAINING GROUNDS"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', marginBottom: '40px' }}
      >
        TRAINING GROUNDS
      </motion.h1>

      <motion.div
        className="game-panel"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          textAlign: 'center'
        }}
      >
        <div style={{ marginBottom: '30px' }}>
          <GameCharacter 
            characterType="npc" 
            size={80} 
            animated={true}
            action="talk"
          />
        </div>

        {education.map((edu, index) => (
          <motion.div
            key={edu.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.2 }}
            style={{
              background: 'linear-gradient(135deg, rgba(76, 205, 196, 0.1), rgba(107, 207, 127, 0.1))',
              border: '3px solid #4ecdc4',
              padding: '30px',
              marginBottom: '20px',
              position: 'relative'
            }}
          >
            <div style={{ 
              position: 'absolute',
              top: '-20px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: '#1a1a2e',
              padding: '5px 20px',
              border: '3px solid #ffd93d'
            }}>
              <FaGraduationCap size={30} color="#ffd93d" />
            </div>

            <h2 style={{ 
              color: '#ffd93d', 
              marginTop: '20px',
              marginBottom: '15px'
            }}>
              {edu.degree}
            </h2>

            <h3 style={{ 
              color: '#4ecdc4',
              marginBottom: '10px',
              fontFamily: 'Oxanium, sans-serif',
              fontSize: '1.5rem'
            }}>
              {edu.field}
            </h3>

            <div style={{ 
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '20px',
              marginTop: '20px',
              flexWrap: 'wrap'
            }}>
              <span style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                fontFamily: 'Oxanium, sans-serif',
                fontSize: '1.3rem',
                color: '#b8b8d1'
              }}>
                <FaUniversity />
                {edu.institution}
              </span>
              <span style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                fontFamily: 'Oxanium, sans-serif',
                fontSize: '1.3rem',
                color: '#b8b8d1'
              }}>
                <FaCalendarAlt />
                {edu.period}
              </span>
            </div>

            <div style={{ 
              marginTop: '20px',
              padding: '15px',
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '5px'
            }}>
              <p style={{ 
                fontFamily: 'Oxanium, sans-serif',
                fontSize: '1.3rem',
                color: '#6bcf7f',
                margin: 0
              }}>
                <FaBook style={{ marginRight: '10px' }} />
                Completed Academic Training Successfully!
              </p>
            </div>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{ 
            marginTop: '40px',
            padding: '20px',
            background: 'rgba(255, 217, 61, 0.1)',
            border: '2px dashed #ffd93d'
          }}
        >
          <p style={{ 
            fontFamily: 'Press Start 2P, cursive',
            fontSize: '0.8rem',
            color: '#ffd93d',
            lineHeight: '1.8'
          }}>
            📚 KNOWLEDGE GAINED: +1000 XP
          </p>
          <p style={{ 
            fontFamily: 'Oxanium, sans-serif',
            fontSize: '1.2rem',
            color: '#b8b8d1',
            marginTop: '10px'
          }}>
            Unlocked abilities in Computer Science and Information Technology!
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default EducationPage;
