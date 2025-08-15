import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Typed from 'typed.js';

interface DialogBoxProps {
  text: string;
  speaker?: string;
  avatar?: React.ReactNode;
  onComplete?: () => void;
  autoStart?: boolean;
  showContinue?: boolean;
}

const DialogBox: React.FC<DialogBoxProps> = ({
  text,
  speaker,
  avatar,
  onComplete,
  autoStart = true,
  showContinue = true
}) => {
  const [isTyping, setIsTyping] = useState(true);
  const typedRef = React.useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!autoStart || !typedRef.current) return;

    const typed = new Typed(typedRef.current, {
      strings: [text],
      typeSpeed: 30,
      showCursor: false,
      onComplete: () => {
        setIsTyping(false);
        onComplete?.();
      }
    });

    return () => typed.destroy();
  }, [text, autoStart, onComplete]);

  return (
    <motion.div
      className="dialog-box-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'relative',
        maxWidth: '800px',
        margin: '20px auto'
      }}
    >
      {/* Speaker Name */}
      {speaker && (
        <div
          style={{
            position: 'absolute',
            top: '-15px',
            left: '20px',
            background: 'linear-gradient(135deg, #e94560, #f47068)',
            padding: '5px 15px',
            fontFamily: 'Press Start 2P, cursive',
            fontSize: '0.8rem',
            color: 'white',
            border: '3px solid #000',
            boxShadow: '2px 2px 0 rgba(0,0,0,0.5)',
            zIndex: 2
          }}
        >
          {speaker}
        </div>
      )}

      <div
        className="dialog-box"
        style={{
          background: 'rgba(22, 33, 62, 0.98)',
          border: '4px solid #533483',
          borderRadius: '0',
          padding: '30px',
          position: 'relative',
          minHeight: '120px',
          boxShadow: '0 0 0 2px black, 8px 8px 0 rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '20px'
        }}
      >
        {/* Avatar */}
        {avatar && (
          <div
            style={{
              flexShrink: 0,
              width: '80px',
              height: '80px',
              border: '3px solid #000',
              background: 'linear-gradient(135deg, #4ecdc4, #44a3a0)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '4px 4px 0 rgba(0,0,0,0.3)'
            }}
          >
            {avatar}
          </div>
        )}

        {/* Text Content */}
        <div style={{ flex: 1 }}>
          <p
            style={{
              fontFamily: 'Oxanium, sans-serif',
              fontSize: '1.4rem',
              lineHeight: '1.6',
              color: '#ffffff',
              margin: 0,
              letterSpacing: '0.5px'
            }}
          >
            <span ref={typedRef}></span>
            {!autoStart && text}
          </p>
        </div>

        {/* Continue Indicator */}
        {showContinue && !isTyping && (
          <motion.div
            style={{
              position: 'absolute',
              bottom: '10px',
              right: '20px',
              color: '#ffd93d',
              fontSize: '1.5rem',
              fontFamily: 'Press Start 2P, cursive'
            }}
            animate={{
              y: [0, 5, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            ▼
          </motion.div>
        )}

        {/* Decorative corners */}
        <div
          style={{
            position: 'absolute',
            top: '-2px',
            left: '-2px',
            width: '10px',
            height: '10px',
            borderTop: '4px solid #ffd93d',
            borderLeft: '4px solid #ffd93d'
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '-2px',
            right: '-2px',
            width: '10px',
            height: '10px',
            borderTop: '4px solid #ffd93d',
            borderRight: '4px solid #ffd93d'
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-2px',
            left: '-2px',
            width: '10px',
            height: '10px',
            borderBottom: '4px solid #ffd93d',
            borderLeft: '4px solid #ffd93d'
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-2px',
            right: '-2px',
            width: '10px',
            height: '10px',
            borderBottom: '4px solid #ffd93d',
            borderRight: '4px solid #ffd93d'
          }}
        />
      </div>
    </motion.div>
  );
};

export default DialogBox;
