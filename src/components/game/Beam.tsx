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
  onExplode?: (x: number, y: number, color: string) => void;
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
  onExplode,
}) => {
  // Calculate movement based on angle and speed
  const angleRad = (angle * Math.PI) / 180;
  const baseDirection = direction === "right" ? 1 : -1;
  const moveDistance = window.innerWidth * 1.2;
  const finalX = baseDirection * moveDistance * Math.cos(angleRad);
  const finalY = -moveDistance * Math.sin(angleRad);

  // Calculate animation duration based on speed (slower for better fireworks)
  const animationDuration = Math.max(3, 8 / speed); // 3-4 seconds for normal speeds

  useEffect(() => {
    // Random explosion chance and timing
    const shouldExplode = Math.random() < 0.8; // Increase chance to 80%
    // Explosion time should be within beam lifetime (animation duration)
    const minExplosionTime = 500; // Minimum 0.5 seconds
    const maxExplosionTime = animationDuration * 1000 * 0.7; // 70% of beam lifetime
    const explosionTime =
      minExplosionTime + Math.random() * (maxExplosionTime - minExplosionTime); // Properly bounded

    let explosionTimeout: NodeJS.Timeout | null = null;

    if (shouldExplode && onExplode) {
      explosionTimeout = setTimeout(() => {
        // Calculate current position based on actual animation duration
        const animationDurationMs = animationDuration * 1000;
        const timeRatio = Math.min(explosionTime / animationDurationMs, 1.0);
        const currentX = startX + finalX * timeRatio;
        const currentY = startY + finalY * timeRatio;

        onExplode(currentX, currentY, color);
        onDestroy(id);
      }, explosionTime);
    }

    // Extend beam lifetime if explosion is set to happen after natural destruction
    const naturalLifetime = animationDuration * 1000;
    const maxLifetime = shouldExplode
      ? Math.max(naturalLifetime, explosionTime + 100)
      : naturalLifetime;

    const destroyTimeout = setTimeout(() => {
      // Only destroy if not exploding, or if explosion should have happened but didn't
      if (!shouldExplode) {
        onDestroy(id);
      }
    }, maxLifetime);

    return () => {
      if (explosionTimeout) clearTimeout(explosionTimeout);
      clearTimeout(destroyTimeout);
    };
  }, []); // Run only once on mount

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
      opacity: [1, 1, 0.8, 0.6, 0.4, 0],
      scale: [0.8, 1, 1.1, 0.9, 0.8, 0.7],
      rotate: angle,
      transition: {
        x: {
          duration: animationDuration,
          ease: "linear" as const,
        },
        y: {
          duration: animationDuration,
          ease: "linear" as const,
        },
        opacity: {
          duration: animationDuration,
          ease: "easeOut" as const,
        },
        scale: {
          duration: 0.3,
          ease: "easeOut" as const,
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
        ease: "easeInOut" as const,
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
