import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaKeyboard, FaTimes } from 'react-icons/fa';

const ControlsHelp: React.FC = () => {
  const [showControls, setShowControls] = useState(false);

  const controls = [
    { category: '🎮 Movement', color: '#4ecdc4', items: [
      { keys: 'WASD/Arrows', action: 'Move character' },
      { keys: 'SHIFT + Move', action: 'Run faster' }
    ]},
    { category: '⚔️ Combat', color: '#e94560', items: [
      { keys: 'X', action: 'Slash attack' },
      { keys: 'C', action: 'Kick attack' },
      { keys: 'V', action: 'Throw attack' },
      { keys: 'Z (while moving)', action: 'Slide' }
    ]},
    { category: '🎯 Advanced', color: '#ffd93d', items: [
      { keys: 'SPACE/J', action: 'Jump' },
      { keys: 'X (in air)', action: 'Air slash' },
      { keys: 'V (in air)', action: 'Air throw' },
      { keys: 'SHIFT + X', action: 'Running slash' },
      { keys: 'SHIFT + V', action: 'Running throw' }
    ]},
    { category: '🗺️ Interface', color: '#6bcf7f', items: [
      { keys: 'H', action: 'Toggle help' },
      { keys: 'ESC', action: 'Close windows' }
    ]}
  ];

  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'h' || e.key === 'H') {
        setShowControls(!showControls);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showControls]);

  return (
    <>
      {/* Help Button */}
      <motion.button
        className="pixel-button"
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: 'linear-gradient(135deg, #6bcf7f, #4ecdc4)',
          border: '3px solid #4ecdc4',
          padding: '10px 15px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '0.7rem',
          fontFamily: 'Press Start 2P, cursive',
          color: '#fff',
          cursor: 'pointer',
          zIndex: 500
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowControls(!showControls)}
      >
        <FaKeyboard />
        HELP (H)
      </motion.button>

      {/* Controls Panel */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            className="game-panel"
            style={{
              position: 'fixed',
              top: '20px',
              right: '20px',
              padding: '20px',
              background: 'linear-gradient(135deg, rgba(26, 26, 46, 0.98), rgba(22, 33, 62, 0.95))',
              border: '3px solid #4ecdc4',
              borderRadius: '8px',
              zIndex: 1500,
              width: '320px',
              maxWidth: '90vw',
              maxHeight: 'calc(100vh - 100px)',
              overflowY: 'auto',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.7)'
            }}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {/* Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '15px',
              borderBottom: '2px solid #4ecdc4',
              paddingBottom: '10px'
            }}>
              <h3 style={{
                fontFamily: 'Press Start 2P, cursive',
                fontSize: '0.8rem',
                color: '#4ecdc4',
                margin: 0,
                textShadow: '1px 1px 0 #000'
              }}>
                CONTROLS
              </h3>
              <motion.button
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#e94560',
                  padding: '4px',
                  cursor: 'pointer',
                  fontSize: '1.2rem'
                }}
                whileHover={{ scale: 1.2, color: '#ff6b7d' }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowControls(false)}
              >
                <FaTimes />
              </motion.button>
            </div>

            {/* Controls List */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '15px'
            }}>
              {controls.map((section) => (
                <div key={section.category}>
                  <h4 style={{
                    fontFamily: 'VT323, monospace',
                    fontSize: '1.2rem',
                    color: section.color,
                    marginBottom: '8px',
                    textShadow: '1px 1px 0 #000'
                  }}>
                    {section.category}
                  </h4>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    paddingLeft: '10px'
                  }}>
                    {section.items.map((item, index) => (
                      <div
                        key={index}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          fontFamily: 'VT323, monospace',
                          fontSize: '1rem',
                          flexWrap: 'wrap'
                        }}
                      >
                        <span style={{
                          background: 'rgba(78, 205, 196, 0.2)',
                          color: '#4ecdc4',
                          padding: '2px 6px',
                          borderRadius: '3px',
                          border: '1px solid #4ecdc4',
                          fontSize: '0.9rem',
                          fontWeight: 'bold',
                          flexShrink: 0
                        }}>
                          {item.keys}
                        </span>
                        <span style={{
                          color: '#b8b8d1',
                          fontSize: '0.95rem'
                        }}>
                          {item.action}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Tip */}
            <div style={{
              marginTop: '15px',
              padding: '8px',
              background: 'rgba(255, 217, 61, 0.1)',
              border: '1px solid #ffd93d',
              borderRadius: '4px',
              textAlign: 'center',
              fontFamily: 'VT323, monospace',
              fontSize: '0.9rem',
              color: '#ffd93d'
            }}>
              💡 Character blinks when idle!
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ControlsHelp;
