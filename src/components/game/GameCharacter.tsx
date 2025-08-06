import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface GameCharacterProps {
  characterType?: "hero" | "npc" | "boss";
  size?: number;
  animated?: boolean;
  direction?: "left" | "right";
  action?: "idle" | "walk" | "run" | "attack" | "jump" | "hurt" | "code" | "talk";
  customImage?: string;
  frameCount?: number;
  frameRate?: number;
}

const GameCharacter: React.FC<GameCharacterProps> = ({
  characterType = "hero",
  size = 64,
  animated = true,
  direction = "right",
  action = "idle",
  customImage,

  frameRate = 100,
}) => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [sprites, setSprites] = useState<string[]>([]);
  const animationRef = useRef<NodeJS.Timeout | null>(null);


  // Get the correct folder and frame count for each action
  const getActionConfig = (action: string) => {
    const configs: { [key: string]: { folder: string; frames: number } } = {
      idle: { folder: "idle", frames: 18 },
      walk: { folder: "walking", frames: 24 },
      run: { folder: "running", frames: 12 },
      attack: { folder: "slashing", frames: 12 },
      jump: { folder: "jump_start", frames: 6 },
      hurt: { folder: "hurt", frames: 12 },
    };
    return configs[action] || configs.idle;
  };

  // Load sprite frames
  useEffect(() => {
    if (customImage) {
      setSprites([customImage]);
      return;
    }

    const config = getActionConfig(action);
    const spriteList: string[] = [];

    // Load all frames for the animation
    for (let i = 0; i < config.frames && i < 6; i++) {
      // Limit to 6 frames for performance
      const frameNumber = i.toString().padStart(3, "0");
      const spritePath = `/assets/png/png_sequences/${
        config.folder
      }/0_skeleton_crusader_${config.folder}_${frameNumber}.png`;
      spriteList.push(spritePath);
    }

    setSprites(spriteList);
    setCurrentFrame(0);
  }, [action, customImage]);

  // Animation frame cycling
  useEffect(() => {
    if (!animated || sprites.length <= 1) return;

    animationRef.current = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % sprites.length);
    }, frameRate);

    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current);
      }
    };
  }, [animated, sprites, frameRate]);

  // Fallback to colored div if image not found
  const fallbackCharacter = () => {
    const colors = {
      hero: "#4ecdc4",
      npc: "#f47068",
      boss: "#e94560",
    };

    return (
      <div
        style={{
          width: size,
          height: size,
          backgroundColor: colors[characterType],
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: size * 0.4,
          color: "white",
          fontFamily: "Press Start 2P, cursive",
          border: "3px solid #000",
          boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
        }}
      >
        {characterType[0].toUpperCase()}
      </div>
    );
  };

  const characterVariants = {
    idle: {
      y: animated ? [0, -2, 0] : 0,
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
    walk: {
      x: animated ? [0, 2, 0, -2, 0] : 0,
      transition: {
        duration: 0.5,
        repeat: Infinity,
        ease: "linear" as const,
      },
    },
    run: {
      x: animated ? [0, 3, 0, -3, 0] : 0,
      transition: {
        duration: 0.3,
        repeat: Infinity,
        ease: "linear" as const,
      },
    },
    attack: {
      scale: animated ? [1, 1.1, 1] : 1,
      rotate: animated ? [0, -5, 5, 0] : 0,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const,
      },
    },
    jump: {
      y: animated ? [0, -20, 0] : 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
    hurt: {
      x: animated ? [0, -5, 5, -5, 0] : 0,
      filter: animated
        ? ["hue-rotate(0deg)", "hue-rotate(30deg)", "hue-rotate(0deg)"]
        : "hue-rotate(0deg)",
      transition: {
        duration: 0.3,
        ease: "easeInOut" as const,
      },
    },
  };

  return (
    <motion.div
      className="game-character"
      style={{
        width: size,
        height: size,
        position: "relative",
        transform: direction === "left" ? "scaleX(-1)" : "scaleX(1)",
        imageRendering: "pixelated",
      }}
      variants={characterVariants}
      animate={action}
      initial="idle"
    >
      {sprites.length > 0 ? (
        <img
          src={sprites[currentFrame] || sprites[0]}
          alt={`${characterType} ${action}`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            imageRendering: "pixelated",
          }}
          onError={(e) => {
            // Fallback to first frame or show colored div
            if (sprites[0] && e.currentTarget.src !== sprites[0]) {
              e.currentTarget.src = sprites[0];
            } else {
              e.currentTarget.style.display = "none";
            }
          }}
        />
      ) : (
        fallbackCharacter()
      )}

      {/* Shadow */}
      <div
        style={{
          position: "absolute",
          bottom: -10,
          left: "50%",
          transform: "translateX(-50%)",
          width: size * 0.8,
          height: 8,
          backgroundColor: "rgba(0,0,0,0.3)",
          borderRadius: "50%",
          filter: "blur(4px)",
        }}
      />
    </motion.div>
  );
};

export default GameCharacter;
