import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface SkillBarProps {
  skill: string;
  level: number; // 0-100
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning';
  showPercentage?: boolean;
  animated?: boolean;
  icon?: React.ReactNode;
}

const SkillBar: React.FC<SkillBarProps> = ({
  skill,
  level,
  color = 'primary',
  showPercentage = true,
  animated = true,
  icon
}) => {
  const [currentLevel, setCurrentLevel] = useState(animated ? 0 : level);

  const colorMap = {
    primary: 'linear-gradient(to right, #e94560, #f47068)',
    secondary: 'linear-gradient(to right, #f47068, #ff8787)',
    success: 'linear-gradient(to right, #6bcf7f, #4ea563)',
    info: 'linear-gradient(to right, #4ecdc4, #44a3a0)',
    warning: 'linear-gradient(to right, #ffd93d, #ffb800)'
  };

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setCurrentLevel(level);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [level, animated]);

  const getLevelText = (lvl: number) => {
    if (lvl >= 90) return 'MASTER';
    if (lvl >= 75) return 'EXPERT';
    if (lvl >= 60) return 'ADVANCED';
    if (lvl >= 40) return 'INTERMEDIATE';
    if (lvl >= 20) return 'BEGINNER';
    return 'NOVICE';
  };

  return (
    <div
      className="skill-bar-container"
      style={{
        marginBottom: '20px',
        position: 'relative'
      }}
    >
      {/* Skill Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '8px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {icon && (
            <div
              style={{
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffd93d'
              }}
            >
              {icon}
            </div>
          )}
          <span
            style={{
              fontFamily: 'Press Start 2P, cursive',
              fontSize: '0.8rem',
              color: '#ffffff',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
          >
            {skill}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span
            style={{
              fontFamily: 'VT323, monospace',
              fontSize: '1rem',
              color: '#ffd93d',
              textTransform: 'uppercase'
            }}
          >
            {getLevelText(currentLevel)}
          </span>
          {showPercentage && (
            <span
              style={{
                fontFamily: 'VT323, monospace',
                fontSize: '1.2rem',
                color: '#6bcf7f',
                minWidth: '45px',
                textAlign: 'right'
              }}
            >
              {currentLevel}%
            </span>
          )}
        </div>
      </div>

      {/* Skill Bar Background */}
      <div
        style={{
          width: '100%',
          height: '24px',
          background: 'rgba(0, 0, 0, 0.5)',
          border: '3px solid #000',
          position: 'relative',
          boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.5)',
          overflow: 'hidden'
        }}
      >
        {/* Grid Pattern */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundImage: `repeating-linear-gradient(
              90deg,
              transparent,
              transparent 10px,
              rgba(255, 255, 255, 0.05) 10px,
              rgba(255, 255, 255, 0.05) 11px
            )`,
            pointerEvents: 'none'
          }}
        />

        {/* Skill Bar Fill */}
        <motion.div
          style={{
            height: '100%',
            background: colorMap[color],
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)'
          }}
          initial={{ width: '0%' }}
          animate={{ width: `${currentLevel}%` }}
          transition={{
            duration: animated ? 1.5 : 0,
            ease: 'easeOut'
          }}
        >
          {/* Shine Effect */}
          <motion.div
            style={{
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
            }}
            animate={{
              left: ['100%', '100%']
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1,
              ease: 'linear'
            }}
          />

          {/* Pixel Pattern */}
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backgroundImage: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 4px,
                rgba(255, 255, 255, 0.1) 4px,
                rgba(255, 255, 255, 0.1) 8px
              )`,
              pointerEvents: 'none'
            }}
          />
        </motion.div>

        {/* Experience Points */}
        {currentLevel > 0 && (
          <motion.div
            style={{
              position: 'absolute',
              right: '5px',
              top: '50%',
              transform: 'translateY(-50%)',
              fontFamily: 'VT323, monospace',
              fontSize: '0.9rem',
              color: '#fff',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
              pointerEvents: 'none'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            +{Math.floor(currentLevel * 10)} XP
          </motion.div>
        )}
      </div>

      {/* Level Markers */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '4px',
          position: 'relative',
          height: '10px'
        }}
      >
        {[0, 25, 50, 75, 100].map((marker) => (
          <div
            key={marker}
            style={{
              position: 'absolute',
              left: `${marker}%`,
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <div
              style={{
                width: '2px',
                height: '6px',
                background: currentLevel >= marker ? '#ffd93d' : '#533483',
                transition: 'background 0.3s'
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillBar;
