import { motion } from "framer-motion";
import React, { useEffect } from "react";

interface BeamProps {
  id: string;
  startX: number;
  startY: number;
  direction: "left" | "right";
  onDestroy: (id: string) => void;
  speed?: number;
  color?: string;
  angle?: number; // Scatter angle in degrees
}

const Beam: React.FC<BeamProps> = ({
  id,
  startX,
  startY,
  direction,
  onDestroy,
  speed = 8,
  color = "#ffeb3b",
  angle = 0,
}) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onDestroy(id);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [id, onDestroy]);

  // Calculate movement based on angle
  const angleRad = (angle * Math.PI) / 180;
  const baseDirection = direction === "right" ? 1 : -1;
  const moveDistance = window.innerWidth * 1.2;
  const finalX = baseDirection * moveDistance * Math.cos(angleRad);
  const finalY = -moveDistance * Math.sin(angleRad);

  const beamVariants = {
    initial: {
      x: 0,
      y: 0,
      opacity: 1,
      scale: 0.8,
      rotate: angle,
    },
    animate: {
      x: finalX,
      y: finalY,
      opacity: [1, 1, 0.8, 0],
      scale: [0.8, 1, 1.1, 0.9],
      rotate: angle,
      transition: {
        x: {
          duration: 3,
          ease: "linear",
        },
        y: {
          duration: 3,
          ease: "linear",
        },
        opacity: {
          duration: 3,
          ease: "easeOut",
        },
        scale: {
          duration: 0.3,
          ease: "easeOut",
        },
        rotate: {
          duration: 0,
        },
      },
    },
  };

  const glowVariants = {
    initial: {
      scale: 1,
      opacity: 0.6,
    },
    animate: {
      scale: [1, 1.5, 1.2],
      opacity: [0.6, 0.8, 0.4],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      style={{
        position: "fixed",
        left: startX,
        top: startY,
        width: 24,
        height: 8,
        pointerEvents: "none",
        zIndex: 998,
      }}
      variants={beamVariants}
      initial="initial"
      animate="animate"
      onAnimationComplete={() => onDestroy(id)}
    >
      {/* Glow effect */}
      <motion.div
        variants={glowVariants}
        initial="initial"
        animate="animate"
        style={{
          position: "absolute",
          inset: -4,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${color}40, transparent)`,
          filter: "blur(2px)",
        }}
      />
      
      {/* Main beam with gradient blend */}
      <div
        style={{
          width: "100%",
          height: "100%",
          background: `linear-gradient(90deg, ${color}, #fff, ${color})`,
          borderRadius: "4px",
          boxShadow: `0 0 12px ${color}, 0 0 6px ${color}80, inset 0 0 4px rgba(255,255,255,0.5)`,
          border: "1px solid rgba(255,255,255,0.3)",
          filter: "brightness(1.2) saturate(1.3)",
        }}
      />
      
      {/* Sparkle trail */}
      <motion.div
        style={{
          position: "absolute",
          left: direction === "right" ? -8 : "100%",
          top: "50%",
          transform: "translateY(-50%)",
          width: 4,
          height: 4,
          background: color,
          borderRadius: "50%",
          filter: "blur(1px)",
        }}
        animate={{
          opacity: [0, 1, 0],
          scale: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
};

export default Beam;