import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaArrowUp, 
  FaArrowDown, 
  FaArrowLeft, 
  FaArrowRight,
  FaRunning,
  FaFistRaised
} from 'react-icons/fa';
import { GiJumpAcross, GiSwordSlice, GiPowerLightning } from 'react-icons/gi';

interface MobileControlsProps {
  onMove: (direction: string, pressed: boolean) => void;
  onAction: (action: string) => void;
  onJump: () => void;
}

const MobileControls: React.FC<MobileControlsProps> = ({ onMove, onAction, onJump }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeButtons, setActiveButtons] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Only show on mobile/tablet devices
    const checkDevice = () => {
      const isMobile = window.matchMedia('(max-width: 768px)').matches || 
                      'ontouchstart' in window;
      setIsVisible(isMobile);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  if (!isVisible) return null;

  const handleTouchStart = (direction: string) => (e: React.TouchEvent) => {
    e.preventDefault();
    setActiveButtons(prev => new Set(prev).add(direction));
    if (['up', 'down', 'left', 'right'].includes(direction)) {
      onMove(direction, true);
    }
  };

  const handleTouchEnd = (direction: string) => (e: React.TouchEvent) => {
    e.preventDefault();
    setActiveButtons(prev => {
      const newSet = new Set(prev);
      newSet.delete(direction);
      return newSet;
    });
    if (['up', 'down', 'left', 'right'].includes(direction)) {
      onMove(direction, false);
    }
  };

  const handleAction = (action: string) => (e: React.TouchEvent) => {
    e.preventDefault();
    onAction(action);
  };

  const handleJump = (e: React.TouchEvent) => {
    e.preventDefault();
    onJump();
  };

  const buttonStyle = (isActive: boolean): React.CSSProperties => ({
    width: '50px',
    height: '50px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
    color: '#fff',
    border: '2px solid #2ed573',
    background: isActive 
      ? 'rgba(46, 213, 115, 0.8)' 
      : 'rgba(13, 13, 26, 0.8)',
    backdropFilter: 'blur(5px)',
    cursor: 'pointer',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    touchAction: 'none',
    transition: 'all 0.1s'
  });

  const actionButtonStyle = (color: string, isActive: boolean): React.CSSProperties => ({
    ...buttonStyle(isActive),
    width: '45px',
    height: '45px',
    border: `2px solid ${color}`,
    background: isActive 
      ? `${color}88`
      : 'rgba(13, 13, 26, 0.8)',
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        pointerEvents: 'none',
      }}
    >
      {/* D-Pad for movement */}
      <div style={{ 
        position: 'relative', 
        width: '150px', 
        height: '150px',
        pointerEvents: 'auto'
      }}>
        {/* Up */}
        <div
          onTouchStart={handleTouchStart('up')}
          onTouchEnd={handleTouchEnd('up')}
          style={{
            ...buttonStyle(activeButtons.has('up')),
            position: 'absolute',
            top: 0,
            left: '50px',
          }}
        >
          <FaArrowUp />
        </div>
        
        {/* Down */}
        <div
          onTouchStart={handleTouchStart('down')}
          onTouchEnd={handleTouchEnd('down')}
          style={{
            ...buttonStyle(activeButtons.has('down')),
            position: 'absolute',
            bottom: 0,
            left: '50px',
          }}
        >
          <FaArrowDown />
        </div>
        
        {/* Left */}
        <div
          onTouchStart={handleTouchStart('left')}
          onTouchEnd={handleTouchEnd('left')}
          style={{
            ...buttonStyle(activeButtons.has('left')),
            position: 'absolute',
            top: '50px',
            left: 0,
          }}
        >
          <FaArrowLeft />
        </div>
        
        {/* Right */}
        <div
          onTouchStart={handleTouchStart('right')}
          onTouchEnd={handleTouchEnd('right')}
          style={{
            ...buttonStyle(activeButtons.has('right')),
            position: 'absolute',
            top: '50px',
            right: 0,
          }}
        >
          <FaArrowRight />
        </div>
        
        {/* Center (Run modifier) */}
        <div
          onTouchStart={handleTouchStart('shift')}
          onTouchEnd={handleTouchEnd('shift')}
          style={{
            ...buttonStyle(activeButtons.has('shift')),
            position: 'absolute',
            top: '50px',
            left: '50px',
            background: activeButtons.has('shift') 
              ? 'rgba(255, 216, 61, 0.8)' 
              : 'rgba(13, 13, 26, 0.8)',
            border: '2px solid #ffd93d',
          }}
        >
          <FaRunning />
        </div>
      </div>

      {/* Action buttons */}
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '10px',
        pointerEvents: 'auto'
      }}>
        {/* Jump */}
        <div
          onTouchStart={handleJump}
          style={{
            ...actionButtonStyle('#4ecdc4', false),
            gridColumn: 'span 3',
            width: '145px',
          }}
        >
          <GiJumpAcross />
        </div>
        
        {/* Attack */}
        <div
          onTouchStart={handleAction('attack')}
          style={actionButtonStyle('#ff4757', false)}
        >
          <GiSwordSlice />
        </div>
        
        {/* Kick */}
        <div
          onTouchStart={handleAction('kick')}
          style={actionButtonStyle('#ff6b7a', false)}
        >
          <FaFistRaised />
        </div>
        
        {/* Special */}
        <div
          onTouchStart={handleAction('special')}
          style={actionButtonStyle('#ffd93d', false)}
        >
          <GiPowerLightning />
        </div>
      </div>
    </motion.div>
  );
};

export default MobileControls;
