import React, { useState, useEffect, useRef, useMemo } from 'react';
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
  FaLock,
  FaTimes
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
  onClose?: () => void;
}

const DungeonMap: React.FC<DungeonMapProps> = ({ onNodeClick, onClose }) => {
  const location = useLocation();
  const [unlockedNodes, setUnlockedNodes] = useState<string[]>(['home']);
  const [nodeStars, setNodeStars] = useState<{ [key: string]: number }>({});
  const mapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [mounted, setMounted] = useState(false);

  // Better positioned nodes for cleaner connections
  const mapNodes: MapNode[] = [
    {
      id: 'home',
      path: '/',
      label: 'HOME',
      icon: <FaHome />,
      x: 50,
      y: 75,
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
      x: 30,
      y: 55,
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
      x: 70,
      y: 55,
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
      x: 30,
      y: 35,
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
      x: 70,
      y: 35,
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
      y: 15,
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
  const [isMobile, setIsMobile] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const updateDimensions = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);
      
      const vw = isMobileView 
        ? Math.min(window.innerWidth * 0.95, 600)
        : Math.min(window.innerWidth * 0.9, 1200);
      const vh = isMobileView
        ? Math.min(window.innerHeight * 0.7, 500)
        : Math.min(window.innerHeight * 0.75, 700);
      setDimensions({ width: vw, height: vh });
      setIsReady(true);
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Delay mount animation to avoid initial lag
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Memoize unlocked state for performance
  const unlockedNodesSet = useMemo(() => new Set(unlockedNodes), [unlockedNodes]);

  return (
    <div
      ref={mapRef} 
      style={{
        position: 'relative',
        width: dimensions.width || '90vw',
        maxWidth: '1200px',
        height: dimensions.height || '70vh',
        maxHeight: '700px',
        minHeight: isMobile ? '350px' : '400px',
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

      {/* Map Header with Title and Close Button */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          padding: '15px 20px',
          background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, transparent 100%)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 10
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <GiTreasureMap size={isMobile ? 16 : 20} color="#4ECDC4" />
          <h3 style={{
            margin: 0,
            fontFamily: 'Press Start 2P, cursive',
            fontSize: isMobile ? '0.6rem' : '0.8rem',
            color: '#4ECDC4',
            textShadow: '1px 1px 0 #000'
          }}>
            DUNGEON MAP
          </h3>
        </div>
        
        {/* Close Button */}
        {onClose && (
          <motion.button
            style={{
              background: 'linear-gradient(135deg, #FF6B6B 0%, #FF4757 100%)',
              border: '2px solid #FF4757',
              borderRadius: '8px',
              padding: isMobile ? '6px 12px' : '8px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              fontSize: isMobile ? '0.6rem' : '0.7rem',
              fontFamily: 'Press Start 2P, cursive',
              color: '#fff',
              textShadow: '1px 1px 0 rgba(0,0,0,0.5)',
              boxShadow: '0 4px 0 #CC2E44, 0 6px 8px rgba(0,0,0,0.3)'
            }}
            whileHover={{ 
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 0 #CC2E44, 0 8px 12px rgba(0,0,0,0.4)'
            }}
            whileTap={{ 
              transform: 'translateY(2px)',
              boxShadow: '0 2px 0 #CC2E44, 0 3px 4px rgba(0,0,0,0.3)'
            }}
            onClick={onClose}
          >
            <FaTimes size={isMobile ? 12 : 14} />
            <span>CLOSE</span>
          </motion.button>
        )}
      </div>

      {/* Draw Paths - Behind nodes for proper layering */}
      <svg 
        ref={svgRef}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          top: 0,
          left: 0,
          zIndex: 1
        }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4ECDC4" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#A855F7" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#FF8CC3" stopOpacity="0.4" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        {mounted && paths.map((path, index) => {
          const fromNode = mapNodes.find(n => n.id === path.from);
          const toNode = mapNodes.find(n => n.id === path.to);
          if (!fromNode || !toNode) return null;

          const isConnected = unlockedNodesSet.has(path.from) && unlockedNodesSet.has(path.to);

          return (
            <g key={`path-${path.from}-${path.to}`}>
              <line
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke={isConnected ? "url(#pathGradient)" : "rgba(100, 100, 120, 0.2)"}
                strokeWidth={isMobile ? "0.3" : "0.4"}
                strokeDasharray={isConnected ? "0" : "2 1"}
                opacity={mounted ? (isConnected ? 0.8 : 0.3) : 0}
                filter={isConnected ? "url(#glow)" : ""}
                style={{
                  transition: 'opacity 0.5s ease-out',
                  transitionDelay: `${index * 50}ms`
                }}
              />
            </g>
          );
        })}
      </svg>

      {/* Map Nodes */}
      {isReady && mapNodes.map((node, index) => {
        const isActive = location.pathname === node.path;
        const isUnlocked = unlockedNodesSet.has(node.id) || node.unlocked;
        const stars = nodeStars[node.id] || node.stars;

        return (
          <div
            key={node.id}
            style={{
              position: 'absolute',
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform: `translate(-50%, -50%) scale(${mounted ? 1 : 0})`,
              cursor: isUnlocked ? 'pointer' : 'not-allowed',
              zIndex: isActive ? 5 : 3,
              opacity: mounted ? 1 : 0,
              transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
              transitionDelay: `${index * 60}ms`
            }}
            onClick={() => handleNodeClick(node)}
          >
            {/* Node Button */}
            <div
              style={{
                width: isMobile ? '50px' : '70px',
                height: isMobile ? '50px' : '70px',
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
                overflow: 'hidden',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                transform: isActive ? 'translateY(-3px)' : 'translateY(0)'
              }}
              onMouseEnter={(e) => {
                if (isUnlocked) {
                  e.currentTarget.style.transform = 'scale(1.1) translateY(-3px)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = isActive ? 'translateY(-3px)' : 'translateY(0)';
              }}
            >
              {/* Shine Effect - Only on hover for performance */}
              {isActive && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'radial-gradient(circle at center, rgba(255,255,255,0.2), transparent 60%)',
                    borderRadius: '50%',
                    pointerEvents: 'none'
                  }}
                />
              )}

              {/* Lock/Icon */}
              <div style={{ fontSize: isMobile ? '1.2rem' : '1.8rem', color: '#fff', marginBottom: '3px' }}>
                {isUnlocked ? node.icon : <FaLock />}
              </div>

              {/* Stars */}
              {isUnlocked && (
                <div style={{ display: 'flex', gap: '1px' }}>
                  {[1, 2, 3].map(star => (
                    <FaStar
                      key={star}
                      size={isMobile ? 8 : 10}
                      color={star <= stars ? '#ffd93d' : '#333'}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Node Label */}
            <div
              style={{
                marginTop: isMobile ? '5px' : '8px',
                padding: isMobile ? '3px 6px' : '5px 10px',
                background: 'rgba(0, 0, 0, 0.8)',
                border: `2px solid ${isUnlocked ? node.color : '#444'}`,
                borderRadius: '5px',
                whiteSpace: 'nowrap'
              }}
            >
              <p style={{
                margin: 0,
                fontFamily: 'Press Start 2P, cursive',
                fontSize: isMobile ? '0.5rem' : '0.6rem',
                color: isUnlocked ? '#fff' : '#666',
                textAlign: 'center'
              }}>
                {node.label}
              </p>
            </div>

            {/* Tooltip on Hover */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: -20 }}
                  animate={{ opacity: 1, scale: 1, y: -30 }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  style={{
                    position: 'absolute',
                    bottom: isMobile ? '100px' : '120px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    padding: isMobile ? '6px 8px' : '8px 12px',
                    background: 'rgba(0, 0, 0, 0.95)',
                    border: `2px solid ${node.color}`,
                    borderRadius: '5px',
                    whiteSpace: 'nowrap',
                    pointerEvents: 'none',
                    zIndex: 10,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
                  }}
                >
                  <p style={{
                    margin: 0,
                    fontFamily: 'VT323, monospace',
                    fontSize: isMobile ? '0.9rem' : '1rem',
                    color: node.color
                  }}>
                    {node.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}

    </div>
  );
};

export default DungeonMap;
