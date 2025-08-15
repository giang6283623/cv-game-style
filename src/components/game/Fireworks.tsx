import { motion } from "framer-motion";
import React, { useEffect } from "react";

interface FireworksProps {
  id: string;
  x: number;
  y: number;
  color: string;
  onDestroy: (id: string) => void;
}

const Fireworks: React.FC<FireworksProps> = ({
  id,
  x,
  y,
  color,
  onDestroy,
}) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onDestroy(id);
    }, 3000); // Extended for better effect

    return () => clearTimeout(timeout);
  }, [id, onDestroy]);

  // Generate color variations for realistic fireworks
  const generateColorVariations = (baseColor: string) => {
    const colors = [baseColor];
    // Add complementary colors
    colors.push('#FFD700'); // Gold
    colors.push('#FF69B4'); // Hot pink
    colors.push('#00CED1'); // Dark turquoise
    colors.push('#FF4500'); // Orange red
    colors.push('#9370DB'); // Medium purple
    colors.push('#32CD32'); // Lime green
    return colors;
  };

  const colorPalette = generateColorVariations(color);

  // Optimized particle generation - reduced count for better performance
  // Layer 1: Primary burst (main colored particles) - REDUCED from 20 to 12
  const primaryParticles = Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 360) / 12; // Even distribution
    const distance = 100 + Math.random() * 50; // Increased distance for better spread
    const finalX = Math.cos((angle * Math.PI) / 180) * distance;
    const finalY = Math.sin((angle * Math.PI) / 180) * distance;

    return {
      id: `primary-${i}`,
      finalX,
      finalY,
      delay: 0, // No delay for smoother burst
      size: 5 + Math.random() * 2,
      color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
      type: 'primary',
    };
  });

  // Layer 2: Secondary burst - REDUCED from 30 to 8
  const secondaryParticles = Array.from({ length: 8 }, (_, i) => {
    const angle = (i * 360) / 8 + 22.5; // Offset from primary
    const distance = 80 + Math.random() * 40;
    const finalX = Math.cos((angle * Math.PI) / 180) * distance;
    const finalY = Math.sin((angle * Math.PI) / 180) * distance;

    return {
      id: `secondary-${i}`,
      finalX,
      finalY,
      delay: 0.1,
      size: 3 + Math.random() * 2,
      color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
      type: 'secondary',
    };
  });

  // Layer 3: Sparkles - REDUCED from 40 to 12
  const sparkleParticles = Array.from({ length: 12 }, (_, i) => {
    const angle = Math.random() * 360;
    const distance = 60 + Math.random() * 60;
    const finalX = Math.cos((angle * Math.PI) / 180) * distance;
    const finalY = Math.sin((angle * Math.PI) / 180) * distance;

    return {
      id: `sparkle-${i}`,
      finalX,
      finalY,
      delay: 0.15,
      size: 2,
      color: i % 2 === 0 ? '#FFFFFF' : '#FFD700', // Alternate white/gold
      type: 'sparkle',
    };
  });

  const allParticles = [...primaryParticles, ...secondaryParticles, ...sparkleParticles];

  const containerVariants = {
    initial: {
      scale: 0,
      opacity: 1,
    },
    animate: {
      scale: [0, 1.2, 1],
      opacity: [1, 1, 0],
      transition: {
        duration: 2,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <motion.div
      style={{
        position: "fixed",
        left: x,
        top: y,
        pointerEvents: "none",
        zIndex: 997,
      }}
      variants={containerVariants}
      initial="initial"
      animate="animate"
      onAnimationComplete={() => onDestroy(id)}
    >
      {/* Single optimized flash */}
      <motion.div
        style={{
          position: "absolute",
          left: -20,
          top: -20,
          width: 40,
          height: 40,
          background: `radial-gradient(circle, #FFFFFF 10%, ${color} 40%, transparent 70%)`,
          borderRadius: "50%",
          // No blur for better performance
        }}
        animate={{
          scale: [0, 3, 0],
          opacity: [1, 0.6, 0],
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut",
        }}
      />

      {/* Multi-layered firework particles */}
      {allParticles.map((particle) => {
        // Different animations for different particle types
        const getDuration = () => {
          switch(particle.type) {
            case 'primary': return 2.0;
            case 'secondary': return 1.8;
            case 'sparkle': return 2.5;
            default: return 2.0;
          }
        };

        const getGravity = () => {
          switch(particle.type) {
            case 'primary': return 30; // Medium gravity
            case 'secondary': return 40; // Higher gravity
            case 'sparkle': return 50; // Highest gravity for sparkles
            default: return 30;
          }
        };

        return (
          <motion.div
            key={particle.id}
            style={{
              position: "absolute",
              left: -particle.size / 2,
              top: -particle.size / 2,
              width: particle.size,
              height: particle.size,
              background: particle.color,
              borderRadius: "50%",
              // Simplified shadow - only one light shadow for performance
              boxShadow: particle.type === 'primary' 
                ? `0 0 ${particle.size}px ${particle.color}` 
                : undefined,
              // Removed filter for better performance
            }}
            animate={{
              // Simplified path - direct outward movement
              x: particle.finalX,
              y: particle.finalY + getGravity(),
              scale: particle.type === 'primary' 
                ? [0, 1.2, 0.3, 0]
                : particle.type === 'secondary'
                ? [0, 1, 0.2, 0]
                : [0, 1, 0, 0],
              opacity: [1, 1, 0.5, 0],
            }}
            transition={{
              duration: getDuration(),
              delay: particle.delay,
              ease: "easeOut",
              // Add smooth easing for better spread
              x: { ease: "easeOut" },
              y: { ease: [0.5, 0, 1, 1] }, // Custom ease for gravity
            }}
          />
        );
      })}

      {/* Single ring for performance */}
      <motion.div
        style={{
          position: "absolute",
          left: -35,
          top: -35,
          width: 70,
          height: 70,
          border: `1px solid ${color}`,
          borderRadius: "50%",
        }}
        animate={{
          scale: [0, 3, 5],
          opacity: [0.6, 0.3, 0],
        }}
        transition={{
          duration: 1.5,
          ease: "easeOut",
        }}
      />
    </motion.div>
  );
};

export default Fireworks;
