import { motion } from "framer-motion";
import React, { useEffect, useMemo, useRef, useState } from "react";
import MobileControls from "./MobileControls";

interface PlayableCharacterProps {
  containerRef?: React.RefObject<HTMLDivElement>;
  size?: number;
  speed?: number;
}

type ActionType =
  | "idle"
  | "idleBlinking"
  | "walking"
  | "running"
  | "jumpStart"
  | "jumpLoop"
  | "falling"
  | "slashing"
  | "runSlashing"
  | "airSlashing"
  | "kicking"
  | "throwing"
  | "runThrowing"
  | "airThrowing"
  | "sliding"
  | "hurt"
  | "dying";

const PlayableCharacter: React.FC<PlayableCharacterProps> = ({
  containerRef,
  size = 80,
  speed = 2,
}) => {
  const [position, setPosition] = useState({ x: 200, y: 200 });
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [action, setAction] = useState<ActionType>("idle");
  const [currentFrame, setCurrentFrame] = useState(0);
  const [sprites, setSprites] = useState<string[]>([]);
  const [isJumping, setIsJumping] = useState(false);
  const [isAttacking, setIsAttacking] = useState(false);
  const keysPressed = useRef<Set<string>>(new Set());
  const animationRef = useRef<number>(0);
  const lastUpdateTime = useRef(Date.now());
  const isMoving = useRef(false);
  const idleTimer = useRef<NodeJS.Timeout | null>(null);
  const mobileKeysPressed = useRef<Set<string>>(new Set());

  // Complete sprite configuration with all available animations
  const spriteConfig = useMemo(
    () =>
      ({
        idle: { folder: "idle", frames: 18, frameDelay: 6 },
        idleBlinking: { folder: "idle_blinking", frames: 18, frameDelay: 6 },
        walking: { folder: "walking", frames: 24, frameDelay: 3 },
        running: { folder: "running", frames: 12, frameDelay: 2 },
        jumpStart: { folder: "jump_start", frames: 6, frameDelay: 3 },
        jumpLoop: { folder: "jump_loop", frames: 6, frameDelay: 4 },
        falling: { folder: "falling_down", frames: 6, frameDelay: 4 },
        slashing: { folder: "slashing", frames: 12, frameDelay: 2 },
        runSlashing: { folder: "run_slashing", frames: 12, frameDelay: 2 },
        airSlashing: {
          folder: "slashing_in_the_air",
          frames: 12,
          frameDelay: 2,
        },
        kicking: { folder: "kicking", frames: 12, frameDelay: 2 },
        throwing: { folder: "throwing", frames: 12, frameDelay: 3 },
        runThrowing: { folder: "run_throwing", frames: 12, frameDelay: 2 },
        airThrowing: {
          folder: "throwing_in_the_air",
          frames: 12,
          frameDelay: 2,
        },
        sliding: { folder: "sliding", frames: 6, frameDelay: 3 },
        hurt: { folder: "hurt", frames: 12, frameDelay: 3 },
        dying: { folder: "dying", frames: 15, frameDelay: 4 },
      } as Record<
        ActionType,
        { folder: string; frames: number; frameDelay?: number }
      >),
    []
  );

  // Load sprites for current action
  useEffect(() => {
    const config = spriteConfig[action];
    if (!config) return;

    const spriteList: string[] = [];

    // Load all frames for smooth animation
    const framesToLoad = config.frames;
    for (let i = 0; i < framesToLoad; i++) {
      const frameNumber = i.toString().padStart(3, "0");
      const spritePath = `/assets/png/png_sequences/${config.folder}/0_skeleton_crusader_${config.folder}_${frameNumber}.png`;
      spriteList.push(spritePath);
    }

    setSprites(spriteList);
    setCurrentFrame(0);
  }, [action, spriteConfig]);

  // Sprite animation frame cycling with variable speed
  useEffect(() => {
    if (sprites.length <= 1) return;

    const config = spriteConfig[action];
    const frameDelay = config?.frameDelay || 4;
    let frameCounter = 0;

    const animate = () => {
      frameCounter++;
      if (frameCounter % frameDelay === 0) {
        setCurrentFrame((prev) => (prev + 1) % sprites.length);
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [sprites, action, spriteConfig]);

  // Set idle blinking randomly
  useEffect(() => {
    if (action === "idle") {
      const randomBlink = () => {
        if (action === "idle" && Math.random() > 0.7) {
          setAction("idleBlinking");
          setTimeout(() => {
            if (!isMoving.current && !isAttacking && !isJumping) {
              setAction("idle");
            }
          }, 1000);
        }
      };

      idleTimer.current = setInterval(randomBlink, 3000);
      return () => {
        if (idleTimer.current) clearInterval(idleTimer.current);
      };
    }
  }, [action, isAttacking, isJumping]);

  // Keyboard input handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent space from scrolling page
      if (e.key === " ") {
        e.preventDefault();
      }

      const key = e.key.toLowerCase();
      keysPressed.current.add(key);

      // Handle different attacks
      if (key === "x" && !isAttacking) {
        setIsAttacking(true);
        const running = keysPressed.current.has("shift");

        if (isJumping) {
          setAction("airSlashing");
        } else if (running && isMoving.current) {
          setAction("runSlashing");
        } else {
          setAction("slashing");
        }

        setTimeout(() => {
          setIsAttacking(false);
          updateActionBasedOnState();
        }, 600);
      }

      // Handle kick
      if (key === "c" && !isAttacking) {
        setIsAttacking(true);
        setAction("kicking");
        setTimeout(() => {
          setIsAttacking(false);
          updateActionBasedOnState();
        }, 600);
      }

      // Handle throw
      if (key === "v" && !isAttacking) {
        setIsAttacking(true);
        const running = keysPressed.current.has("shift");

        if (isJumping) {
          setAction("airThrowing");
        } else if (running && isMoving.current) {
          setAction("runThrowing");
        } else {
          setAction("throwing");
        }

        setTimeout(() => {
          setIsAttacking(false);
          updateActionBasedOnState();
        }, 700);
      }

      // Handle slide - check for any movement key pressed
      const movementKeys = [
        "w",
        "a",
        "s",
        "d",
        "arrowup",
        "arrowdown",
        "arrowleft",
        "arrowright",
      ];
      const hasMovementKey = movementKeys.some((k) =>
        keysPressed.current.has(k)
      );

      if (key === "z" && hasMovementKey && !isJumping && !isAttacking) {
        setAction("sliding");
        setTimeout(() => {
          updateActionBasedOnState();
        }, 400);
      }

      // Handle jump
      if ((key === " " || key === "j") && !isJumping) {
        e.preventDefault();
        setIsJumping(true);
        setAction("jumpStart");

        // Transition to jump loop
        setTimeout(() => {
          if (isJumping) {
            setAction("jumpLoop");
          }
        }, 300);

        // Landing
        setTimeout(() => {
          setIsJumping(false);
          setAction("falling");
          setTimeout(() => {
            updateActionBasedOnState();
          }, 200);
        }, 800);
      }
    };

    const updateActionBasedOnState = () => {
      if (isAttacking || isJumping) return;

      const running = keysPressed.current.has("shift");
      if (isMoving.current) {
        setAction(running ? "running" : "walking");
      } else {
        setAction("idle");
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      keysPressed.current.delete(key);

      // Check if still moving
      const movementKeys = [
        "w",
        "a",
        "s",
        "d",
        "arrowup",
        "arrowdown",
        "arrowleft",
        "arrowright",
      ];
      const hasMovementKey = movementKeys.some((k) =>
        keysPressed.current.has(k)
      );

      if (!hasMovementKey) {
        isMoving.current = false;
        if (!isAttacking && !isJumping) {
          setAction("idle");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [action, isAttacking, isJumping]);

  // Smooth movement update loop
  useEffect(() => {
    const gameLoop = () => {
      const now = Date.now();
      const deltaTime = (now - lastUpdateTime.current) / 1000; // Convert to seconds
      lastUpdateTime.current = now;

      let dx = 0;
      let dy = 0;
      let moved = false;

      // Check for running
      const running = keysPressed.current.has("shift");
      const currentSpeed = running ? speed * 1.5 : speed;
      const moveAmount = currentSpeed * 60 * deltaTime; // 60 FPS normalized

      // Calculate movement
      if (
        keysPressed.current.has("a") ||
        keysPressed.current.has("arrowleft")
      ) {
        dx -= moveAmount;
        setDirection("left");
        moved = true;
      }
      if (
        keysPressed.current.has("d") ||
        keysPressed.current.has("arrowright")
      ) {
        dx += moveAmount;
        setDirection("right");
        moved = true;
      }
      if (keysPressed.current.has("w") || keysPressed.current.has("arrowup")) {
        dy -= moveAmount;
        moved = true;
      }
      if (
        keysPressed.current.has("s") ||
        keysPressed.current.has("arrowdown")
      ) {
        dy += moveAmount;
        moved = true;
      }

      // Update position if moved
      if (moved) {
        isMoving.current = true;
        setPosition((prev) => {
          // Get container bounds or use window
          const container = containerRef?.current;
          const maxX = container ? container.offsetWidth : window.innerWidth;
          const maxY = container ? container.offsetHeight : window.innerHeight;

          // Calculate new position with bounds checking
          const newX = Math.max(
            size / 2,
            Math.min(maxX - size / 2, prev.x + dx)
          );
          const newY = Math.max(
            size / 2,
            Math.min(maxY - size / 2, prev.y + dy)
          );

          return { x: newX, y: newY };
        });

        // Update action based on movement (unless performing special action)
        if (!isAttacking && !isJumping && action !== "sliding") {
          setAction(running ? "running" : "walking");
        }
      } else {
        isMoving.current = false;
      }

      requestAnimationFrame(gameLoop);
    };

    const animationId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animationId);
  }, [speed, action, size, containerRef, isAttacking, isJumping]);

  // Position is already the center point, so offset by half size for rendering
  const pixelX = position.x - size / 2;
  const pixelY = position.y - size / 2;

  // Mobile control handlers
  const handleMobileMove = (direction: string, pressed: boolean) => {
    const keyMap: { [key: string]: string } = {
      'up': 'w',
      'down': 's',
      'left': 'a',
      'right': 'd',
      'shift': 'shift'
    };
    
    const key = keyMap[direction];
    if (!key) return;
    
    if (pressed) {
      mobileKeysPressed.current.add(key);
      keysPressed.current.add(key);
    } else {
      mobileKeysPressed.current.delete(key);
      keysPressed.current.delete(key);
    }
  };

  const handleMobileAction = (action: string) => {
    if (action === 'attack' && !isAttacking) {
      setIsAttacking(true);
      const running = keysPressed.current.has('shift');
      
      if (isJumping) {
        setAction('airSlashing');
      } else if (running && isMoving.current) {
        setAction('runSlashing');
      } else {
        setAction('slashing');
      }
      
      setTimeout(() => {
        setIsAttacking(false);
        updateActionBasedOnState();
      }, 600);
    } else if (action === 'kick' && !isAttacking) {
      setIsAttacking(true);
      setAction('kicking');
      setTimeout(() => {
        setIsAttacking(false);
        updateActionBasedOnState();
      }, 600);
    } else if (action === 'special' && !isAttacking) {
      setIsAttacking(true);
      const running = keysPressed.current.has('shift');
      
      if (isJumping) {
        setAction('airThrowing');
      } else if (running && isMoving.current) {
        setAction('runThrowing');
      } else {
        setAction('throwing');
      }
      
      setTimeout(() => {
        setIsAttacking(false);
        updateActionBasedOnState();
      }, 700);
    }
  };

  const handleMobileJump = () => {
    if (!isJumping) {
      setIsJumping(true);
      setAction('jumpStart');
      
      setTimeout(() => {
        if (isJumping) {
          setAction('jumpLoop');
        }
      }, 300);
      
      setTimeout(() => {
        setIsJumping(false);
        setAction('falling');
        setTimeout(() => {
          updateActionBasedOnState();
        }, 200);
      }, 800);
    }
  };

  const updateActionBasedOnState = () => {
    if (isAttacking || isJumping) return;
    
    const running = keysPressed.current.has('shift');
    if (isMoving.current) {
      setAction(running ? 'running' : 'walking');
    } else {
      setAction('idle');
    }
  };

  return (
    <motion.div
      className="playable-character"
      style={{
        position: "fixed", // Use fixed to position relative to viewport
        width: size,
        height: size,
        left: pixelX,
        top: pixelY,
        pointerEvents: "none",
        zIndex: 999, // High z-index to stay above other content
        transform: `scaleX(${direction === "left" ? -1 : 1})`,
      }}
      animate={{
        x: 0,
        y: isJumping ? -30 : 0,
      }}
      transition={{
        y: { duration: 0.3, ease: "easeOut" },
      }}
    >
      {/* Character Sprite */}
      {sprites.length > 0 ? (
        <img
          src={sprites[currentFrame] || sprites[0]}
          alt="Player Character"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            imageRendering: "pixelated",
          }}
          onError={(e) => {
            // Fallback to colored div if image fails
            e.currentTarget.style.display = "none";
          }}
        />
      ) : (
        // Fallback character
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "linear-gradient(135deg, #4ecdc4, #44a3a0)",
            borderRadius: "8px",
            border: "3px solid #000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: size * 0.3,
            color: "white",
            fontFamily: "Press Start 2P, cursive",
            boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
          }}
        >
          P1
        </div>
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

      {/* Name tag */}
      <div
        style={{
          position: "absolute",
          bottom: -15,
          left: "50%",
          transform: "translateX(-50%)",
          padding: "2px 8px",
          background: "rgba(0, 0, 0, 0.8)",
          border: "1px solid #ffd93d",
          borderRadius: "3px",
          whiteSpace: "nowrap",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontFamily: "Press Start 2P, cursive",
            fontSize: "0.5rem",
            color: "#ffd93d",
          }}
        >
          GIANG
        </span>
      </div>
      
      {/* Mobile Controls */}
      <MobileControls
        onMove={handleMobileMove}
        onAction={handleMobileAction}
        onJump={handleMobileJump}
      />
    </motion.div>
  );
};

export default PlayableCharacter;
