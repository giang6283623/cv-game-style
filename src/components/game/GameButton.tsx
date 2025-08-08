import React from 'react';
import { motion } from 'framer-motion';

interface GameButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'small' | 'medium' | 'large';
  icon?: React.ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
  href?: string;
  target?: string;
  glowing?: boolean;
}

const GameButton: React.FC<GameButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  icon,
  disabled = false,
  fullWidth = false,
  href,
  target,
  glowing = false
}) => {
  const variants = {
    primary: {
      background: 'linear-gradient(180deg, #ff6b7a 0%, #ff4757 50%, #ee3f55 100%)',
      borderColor: '#d63447',
      shadowColor: '#a02839',
      textColor: '#ffffff'
    },
    secondary: {
      background: 'linear-gradient(180deg, #5cd3cc 0%, #4ecdc4 50%, #3db5ac 100%)',
      borderColor: '#2d9990',
      shadowColor: '#1e6660',
      textColor: '#ffffff'
    },
    success: {
      background: 'linear-gradient(180deg, #7ed68f 0%, #6bcf7f 50%, #52b869 100%)',
      borderColor: '#4ea563',
      shadowColor: '#3a7a49',
      textColor: '#ffffff'
    },
    warning: {
      background: 'linear-gradient(180deg, #ffc633 0%, #ffb800 50%, #e6a500 100%)',
      borderColor: '#cc9200',
      shadowColor: '#996e00',
      textColor: '#000000'
    },
    danger: {
      background: 'linear-gradient(180deg, #ff8585 0%, #ff6b6b 50%, #ff5252 100%)',
      borderColor: '#e04848',
      shadowColor: '#b33636',
      textColor: '#ffffff'
    },
    info: {
      background: 'linear-gradient(180deg, #74a8f4 0%, #5e96e8 50%, #4a7dd8 100%)',
      borderColor: '#3968c3',
      shadowColor: '#2850a0',
      textColor: '#ffffff'
    }
  };

  const sizes = {
    small: {
      padding: '6px 12px',
      fontSize: '0.5rem',
      iconSize: '0.7rem',
      height: '32px'
    },
    medium: {
      padding: '8px 16px',
      fontSize: '0.6rem',
      iconSize: '0.9rem',
      height: '38px'
    },
    large: {
      padding: '10px 20px',
      fontSize: '0.7rem',
      iconSize: '1rem',
      height: '44px'
    }
  };

  const currentVariant = variants[variant];
  const currentSize = sizes[size];

  const buttonStyle: React.CSSProperties = {
    fontFamily: 'Press Start 2P, cursive',
    fontSize: currentSize.fontSize,
    padding: currentSize.padding,
    background: currentVariant.background,
    color: currentVariant.textColor,
    border: `2px solid ${currentVariant.borderColor}`,
    borderRadius: '6px',
    position: 'relative',
    cursor: disabled ? 'not-allowed' : 'pointer',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    width: fullWidth ? '100%' : 'auto',
    textDecoration: 'none',
    opacity: disabled ? 0.6 : 1,
    minHeight: currentSize.height,
    boxShadow: `
      inset 0 1px 0 rgba(255, 255, 255, 0.2),
      inset 0 -1px 0 rgba(0, 0, 0, 0.2),
      0 2px 0 ${currentVariant.shadowColor},
      0 3px 0 rgba(0, 0, 0, 0.2),
      0 4px 4px rgba(0, 0, 0, 0.15)
    `,
    textShadow: variant === 'warning' 
      ? '1px 1px 0 rgba(255, 255, 255, 0.3)' 
      : '1px 1px 1px rgba(0, 0, 0, 0.5)',
    overflow: 'hidden',
    userSelect: 'none'
  };

  const content = (
    <>
      {/* Shine effect */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
          pointerEvents: 'none'
        }}
        animate={glowing ? {
          left: ['100%', '100%']
        } : {}}
        transition={{
          duration: 2,
          repeat: glowing ? Infinity : 0,
          repeatDelay: 1
        }}
      />
      
      {/* Glow effect for special buttons */}
      {glowing && (
        <motion.div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '120%',
            height: '120%',
            transform: 'translate(-50%, -50%)',
            background: `radial-gradient(circle, ${currentVariant.borderColor}66 0%, transparent 70%)`,
            pointerEvents: 'none',
            zIndex: -1
          }}
          animate={{
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      )}

      {icon && (
        <span style={{ fontSize: currentSize.iconSize, display: 'flex', alignItems: 'center' }}>
          {icon}
        </span>
      )}
      <span>{children}</span>
    </>
  );

  const Component = href ? 'a' : motion.button;
  const componentProps = href 
    ? { href, target, rel: target === '_blank' ? 'noopener noreferrer' : undefined }
    : { onClick: disabled ? undefined : onClick, disabled };

  return (
    <Component
      {...componentProps}
      style={buttonStyle}
      whileHover={!disabled ? {
        transform: 'translateY(-2px)',
        boxShadow: `
          inset 0 2px 0 rgba(255, 255, 255, 0.3),
          inset 0 -2px 0 rgba(0, 0, 0, 0.2),
          0 6px 0 ${currentVariant.shadowColor},
          0 8px 0 rgba(0, 0, 0, 0.3),
          0 10px 12px rgba(0, 0, 0, 0.3)
        `
      } : {}}
      whileTap={!disabled ? {
        transform: 'translateY(2px)',
        boxShadow: `
          inset 0 2px 0 rgba(255, 255, 255, 0.3),
          inset 0 -2px 0 rgba(0, 0, 0, 0.2),
          0 2px 0 ${currentVariant.shadowColor},
          0 3px 0 rgba(0, 0, 0, 0.3),
          0 4px 4px rgba(0, 0, 0, 0.2)
        `
      } : {}}
    >
      {content}
    </Component>
  );
};

export default GameButton;
