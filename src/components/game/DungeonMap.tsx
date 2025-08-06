import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { 
  FaHome, 
  FaBriefcase, 
  FaCode, 
  FaGraduationCap, 
  FaTrophy, 
  FaEnvelope,
  FaStar,
  FaLock
} from 'react-icons/fa';
import { GiTreasureMap } from 'react-icons/gi';

interface MapNode {
  id: string;
  path: string;
  label: string;
  icon: React.ReactNode;
  x: number;
  y: number;
  color: string;
  unlocked: boolean;
  stars: number;
  description: string;
}

interface DungeonMapProps {
  characterPosition: { x: number; y: number };
  onNodeClick: (node: MapNode) => void;
}

const DungeonMap: React.FC<DungeonMapProps> = ({ onNodeClick }) => {
  const location = useLocation();
  const [unlockedNodes, setUnlockedNodes] = useState<string[]>(['home']);
  const [nodeStars, setNodeStars] = useState<{ [key: string]: number }>({});

  const mapNodes: MapNode[] = [
    {
      id: 'home',
      path: '/',
      label: 'HOME',
      icon: <FaHome />,
      x: 50,
      y: 85,
      color: '#00D9FF',
      unlocked: true,
      stars: 3,
      description: 'Start your journey here'
    },
    {
      id: 'experience',
      path: '/experience',
      label: 'QUESTS',
      icon: <FaBriefcase />,
      x: 25,
      y: 65,
      color: '#FF6B6B',
      unlocked: true,
      stars: 0,
      description: 'View completed quests'
    },
    {
      id: 'skills',
      path: '/skills',
      label: 'SKILLS',
      icon: <FaCode />,
      x: 75,
      y: 65,
      color: '#4ECDC4',
      unlocked: true,
      stars: 0,
      description: 'Upgrade your abilities'
    },
    {
      id: 'education',
      path: '/education',
      label: 'LEARN',
      icon: <FaGraduationCap />,
      x: 25,
      y: 40,
      color: '#95E77E',
      unlocked: true,
      stars: 0,
      description: 'Training grounds'
    },
    {
      id: 'achievements',
      path: '/achievements',
      label: 'AWARDS',
      icon: <FaTrophy />,
      x: 75,
      y: 40,
      color: '#FFD93D',
      unlocked: true,
      stars: 0,
      description: 'View your achievements'
    },
    {
      id: 'contact',
      path: '/contact',
      label: 'CONTACT',
      icon: <FaEnvelope />,
      x: 50,
      y: 20,
      color: '#FF8CC3',
      unlocked: true,
      stars: 0,
      description: 'Meet and connect'
    }
  ];

  // Draw paths between nodes
  const paths = [
    { from: 'home', to: 'experience' },
    { from: 'home', to: 'skills' },
    { from: 'experience', to: 'education' },
    { from: 'skills', to: 'achievements' },
    { from: 'education', to: 'contact' },
    { from: 'achievements', to: 'contact' },
    { from: 'experience', to: 'skills' }
  ];

  const handleNodeClick = (node: MapNode) => {
    if (node.unlocked) {
      onNodeClick(node);
      
      // Unlock adjacent nodes
      const adjacentNodes = paths
        .filter(p => p.from === node.id || p.to === node.id)
        .map(p => p.from === node.id ? p.to : p.from);
      
      setUnlockedNodes(prev => [...new Set([...prev, ...adjacentNodes])]);
      
      // Award stars
      setNodeStars(prev => ({
        ...prev,
        [node.id]: Math.min((prev[node.id] || 0) + 1, 3)
      }));
    }
  };

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      const vw = Math.min(window.innerWidth * 0.95, 1200);
      const vh = Math.min(window.innerHeight * 0.8, 700);
      setDimensions({ width: vw, height: vh });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return (
    <div 
      style={{
        position: 'relative',
        width: dimensions.width || '95vw',
        maxWidth: '1200px',
        height: dimensions.height || '80vh',
        maxHeight: '700px',
        minHeight: '400px',
        margin: '0 auto',
        background: `
          radial-gradient(ellipse at center, rgba(78, 205, 196, 0.1), transparent 50%),
          linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)
        `,
        border: '4px solid #533483',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 0 50px rgba(78, 205, 196, 0.3), inset 0 0 50px rgba(0, 0, 0, 0.5)'
      }}
    >
      {/* Background Pattern */}
      <div 
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundImage: `
            repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(83, 52, 131, 0.1) 20px, rgba(83, 52, 131, 0.1) 40px),
            repeating-linear-gradient(-45deg, transparent, transparent 20px, rgba(78, 205, 196, 0.05) 20px, rgba(78, 205, 196, 0.05) 40px)
          `,
          pointerEvents: 'none'
        }}
      />

      {/* Map Title */}
      <div 
        style={{
          position: 'absolute',
          top: '15px',
          left: '15px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          zIndex: 10
        }}
      >
        <GiTreasureMap size={20} color="#4ECDC4" />
        <h3 style={{
          margin: 0,
          fontFamily: 'Press Start 2P, cursive',
          fontSize: '0.8rem',
          color: '#4ECDC4',
          textShadow: '1px 1px 0 #000'
        }}>
          DUNGEON MAP
        </h3>
      </div>

      {/* Draw Paths */}
      <svg 
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          pointerEvents: 'none'
        }}
      >
        {paths.map((path, index) => {
          const fromNode = mapNodes.find(n => n.id === path.from);
          const toNode = mapNodes.find(n => n.id === path.to);
          if (!fromNode || !toNode) return null;

          return (
            <motion.line
              key={index}
              x1={`${fromNode.x}%`}
              y1={`${fromNode.y}%`}
              x2={`${toNode.x}%`}
              y2={`${toNode.y}%`}
              stroke="rgba(78, 205, 196, 0.4)"
              strokeWidth="2"
              strokeDasharray="8 4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: index * 0.1 }}
            />
          );
        })}
      </svg>

      {/* Map Nodes */}
      {mapNodes.map((node, index) => {
        const isActive = location.pathname === node.path;
        const isUnlocked = unlockedNodes.includes(node.id) || node.unlocked;
        const stars = nodeStars[node.id] || node.stars;

        return (
          <motion.div
            key={node.id}
            style={{
              position: 'absolute',
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform: 'translate(-50%, -50%)',
              cursor: isUnlocked ? 'pointer' : 'not-allowed',
              zIndex: isActive ? 5 : 3
            }}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              delay: index * 0.1,
              type: 'spring',
              stiffness: 200
            }}
            whileHover={isUnlocked ? { scale: 1.2 } : {}}
            onClick={() => handleNodeClick(node)}
          >
            {/* Node Button */}
            <motion.div
              style={{
                width: window.innerWidth < 768 ? '60px' : '80px',
                height: window.innerWidth < 768 ? '60px' : '80px',
                background: isUnlocked 
                  ? `radial-gradient(circle at 30% 30%, ${node.color}, ${node.color}dd)`
                  : 'radial-gradient(circle at 30% 30%, #666, #333)',
                borderRadius: '50%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                border: isActive ? `4px solid #fff` : `3px solid ${isUnlocked ? node.color : '#444'}`,
                boxShadow: `
                  0 5px 0 ${isUnlocked ? node.color + '99' : '#222'},
                  0 10px 20px rgba(0, 0, 0, 0.5),
                  inset 0 -5px 10px rgba(0, 0, 0, 0.3),
                  ${isActive ? `0 0 30px ${node.color}` : ''}
                `,
                position: 'relative',
                overflow: 'hidden'
              }}
              animate={isActive ? {
                y: [0, -5, 0],
                boxShadow: [
                  `0 5px 0 ${node.color}99, 0 10px 20px rgba(0, 0, 0, 0.5)`,
                  `0 10px 0 ${node.color}99, 0 15px 30px rgba(0, 0, 0, 0.5)`,
                  `0 5px 0 ${node.color}99, 0 10px 20px rgba(0, 0, 0, 0.5)`
                ]
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {/* Shine Effect */}
              <motion.div
                style={{
                  position: 'absolute',
                  top: '-50%',
                  left: '-50%',
                  width: '200%',
                  height: '200%',
                  background: 'linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                  transform: 'rotate(45deg)'
                }}
                animate={isUnlocked ? {
                  x: ['0%', '100%'],
                  y: ['0%', '100%']
                } : {}}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2
                }}
              />

              {/* Lock/Icon */}
              <div style={{ fontSize: window.innerWidth < 768 ? '1.5rem' : '2rem', color: '#fff', marginBottom: '5px' }}>
                {isUnlocked ? node.icon : <FaLock />}
              </div>

              {/* Stars */}
              {isUnlocked && (
                <div style={{ display: 'flex', gap: '2px' }}>
                  {[1, 2, 3].map(star => (
                    <FaStar
                      key={star}
                      size={12}
                      color={star <= stars ? '#ffd93d' : '#333'}
                    />
                  ))}
                </div>
              )}
            </motion.div>

            {/* Node Label */}
            <motion.div
              style={{
                marginTop: '10px',
                padding: '5px 10px',
                background: 'rgba(0, 0, 0, 0.8)',
                border: `2px solid ${isUnlocked ? node.color : '#444'}`,
                borderRadius: '5px',
                whiteSpace: 'nowrap'
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              <p style={{
                margin: 0,
                fontFamily: 'Press Start 2P, cursive',
                fontSize: '0.6rem',
                color: isUnlocked ? '#fff' : '#666',
                textAlign: 'center'
              }}>
                {node.label}
              </p>
            </motion.div>

            {/* Tooltip on Hover */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: -20 }}
                  animate={{ opacity: 1, scale: 1, y: -30 }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  style={{
                    position: 'absolute',
                    bottom: '120px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    padding: '8px 12px',
                    background: 'rgba(0, 0, 0, 0.9)',
                    border: `2px solid ${node.color}`,
                    borderRadius: '5px',
                    whiteSpace: 'nowrap',
                    pointerEvents: 'none',
                    zIndex: 10
                  }}
                >
                  <p style={{
                    margin: 0,
                    fontFamily: 'VT323, monospace',
                    fontSize: '1rem',
                    color: node.color
                  }}>
                    {node.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}

    </div>
  );
};

export default DungeonMap;
