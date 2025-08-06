import React, { useEffect, useRef, useState } from 'react';

interface PixelGameProps {
  onScoreUpdate?: (score: number) => void;
}

const PixelGame: React.FC<PixelGameProps> = ({ onScoreUpdate }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState('idle');
  
  // Game state
  const gameStateRef = useRef({
    player: {
      x: 50,
      y: 200,
      width: 96,
      height: 96,
      velocityX: 0,
      velocityY: 0,
      isJumping: false,
      health: 100,
      score: 0,
    },
    enemies: [] as Array<{ x: number; y: number; width: number; height: number }>,
    particles: [] as Array<{ x: number; y: number; vx: number; vy: number; life: number; color: string }>,
    animations: {
      idle: [] as HTMLImageElement[],
      running: [] as HTMLImageElement[],
      jumping: [] as HTMLImageElement[],
      slashing: [] as HTMLImageElement[],
      hurt: [] as HTMLImageElement[],
    },
    currentFrame: 0,
    frameCount: 0,
    animationSpeed: 8,
    keys: {
      left: false,
      right: false,
      up: false,
      space: false,
    },
  });

  // Load sprite animations
  useEffect(() => {
    const loadImages = async () => {
      const animations = gameStateRef.current.animations;
      
      // Load idle animation frames
      const idleFrames = 18;
      for (let i = 0; i < idleFrames; i++) {
        const img = new Image();
        img.src = `/assets/png/png_sequences/idle/0_skeleton_crusader_idle_${String(i).padStart(3, '0')}.png`;
        animations.idle.push(img);
      }

      // Load running animation frames
      const runningFrames = 12;
      for (let i = 0; i < runningFrames; i++) {
        const img = new Image();
        img.src = `/assets/png/png_sequences/running/0_skeleton_crusader_running_${String(i).padStart(3, '0')}.png`;
        animations.running.push(img);
      }

      // Load jumping animation frames
      const jumpFrames = 6;
      for (let i = 0; i < jumpFrames; i++) {
        const img = new Image();
        img.src = `/assets/png/png_sequences/jump_start/0_skeleton_crusader_jump_start_${String(i).padStart(3, '0')}.png`;
        animations.jumping.push(img);
      }

      // Load slashing animation frames
      const slashFrames = 12;
      for (let i = 0; i < slashFrames; i++) {
        const img = new Image();
        img.src = `/assets/png/png_sequences/slashing/0_skeleton_crusader_slashing_${String(i).padStart(3, '0')}.png`;
        animations.slashing.push(img);
      }

      // Load hurt animation frames
      const hurtFrames = 12;
      for (let i = 0; i < hurtFrames; i++) {
        const img = new Image();
        img.src = `/assets/png/png_sequences/hurt/0_skeleton_crusader_hurt_${String(i).padStart(3, '0')}.png`;
        animations.hurt.push(img);
      }
    };

    loadImages();
  }, []);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const keys = gameStateRef.current.keys;
      switch (e.key) {
        case 'ArrowLeft':
        case 'a':
          keys.left = true;
          break;
        case 'ArrowRight':
        case 'd':
          keys.right = true;
          break;
        case 'ArrowUp':
        case 'w':
        case ' ':
          keys.up = true;
          break;
        case 'x':
          keys.space = true;
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const keys = gameStateRef.current.keys;
      switch (e.key) {
        case 'ArrowLeft':
        case 'a':
          keys.left = false;
          break;
        case 'ArrowRight':
        case 'd':
          keys.right = false;
          break;
        case 'ArrowUp':
        case 'w':
        case ' ':
          keys.up = false;
          break;
        case 'x':
          keys.space = false;
          break;
      }
    };

    if (isPlaying) {
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isPlaying]);

  // Game loop
  useEffect(() => {
    if (!isPlaying) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const gameLoop = () => {
      const state = gameStateRef.current;
      const player = state.player;
      const keys = state.keys;

      // Clear canvas
      ctx.fillStyle = '#2a2a3e';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw background elements (pixel art style)
      drawBackground(ctx, canvas);

      // Update player physics
      if (keys.left) {
        player.velocityX = -5;
        setCurrentAnimation('running');
      } else if (keys.right) {
        player.velocityX = 5;
        setCurrentAnimation('running');
      } else {
        player.velocityX *= 0.8;
        if (Math.abs(player.velocityX) < 0.1) {
          player.velocityX = 0;
          if (!player.isJumping && !keys.space) {
            setCurrentAnimation('idle');
          }
        }
      }

      if (keys.up && !player.isJumping) {
        player.velocityY = -12;
        player.isJumping = true;
        setCurrentAnimation('jumping');
      }

      if (keys.space) {
        setCurrentAnimation('slashing');
        // Add slash effect
        if (state.frameCount % 10 === 0) {
          state.particles.push({
            x: player.x + player.width,
            y: player.y + player.height / 2,
            vx: 5,
            vy: (Math.random() - 0.5) * 2,
            life: 20,
            color: '#ffff00',
          });
        }
      }

      // Apply gravity
      player.velocityY += 0.5;

      // Update position
      player.x += player.velocityX;
      player.y += player.velocityY;

      // Ground collision
      const groundY = canvas.height - 100;
      if (player.y + player.height > groundY) {
        player.y = groundY - player.height;
        player.velocityY = 0;
        player.isJumping = false;
      }

      // Keep player in bounds
      player.x = Math.max(0, Math.min(canvas.width - player.width, player.x));

      // Update particles
      state.particles = state.particles.filter((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life--;
        
        if (particle.life > 0) {
          ctx.fillStyle = particle.color;
          ctx.fillRect(particle.x, particle.y, 4, 4);
          return true;
        }
        return false;
      });

      // Draw player with current animation
      const animation = state.animations[currentAnimation as keyof typeof state.animations];
      if (animation && animation.length > 0) {
        state.frameCount++;
        if (state.frameCount >= state.animationSpeed) {
          state.currentFrame = (state.currentFrame + 1) % animation.length;
          state.frameCount = 0;
        }

        const currentImage = animation[state.currentFrame];
        if (currentImage && currentImage.complete) {
          ctx.imageSmoothingEnabled = false; // Maintain pixel art style
          ctx.drawImage(
            currentImage,
            player.x,
            player.y,
            player.width,
            player.height
          );
        }
      } else {
        // Fallback: draw a simple rectangle if sprites aren't loaded
        ctx.fillStyle = '#ff6b6b';
        ctx.fillRect(player.x, player.y, player.width, player.height);
      }

      // Draw UI
      drawUI(ctx, canvas, player);

      // Update score
      if (state.frameCount % 60 === 0) {
        player.score += 10;
        onScoreUpdate?.(player.score);
      }

      animationRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, currentAnimation, onScoreUpdate]);

  const drawBackground = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    // Draw pixelated ground
    ctx.fillStyle = '#16213e';
    ctx.fillRect(0, canvas.height - 100, canvas.width, 100);
    
    // Draw pixel grass
    for (let x = 0; x < canvas.width; x += 20) {
      ctx.fillStyle = '#2ecc71';
      ctx.fillRect(x, canvas.height - 100, 16, 4);
    }

    // Draw pixel clouds
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.fillRect(100, 50, 60, 20);
    ctx.fillRect(300, 80, 80, 25);
    ctx.fillRect(500, 60, 70, 20);
  };

  const drawUI = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, player: { health: number; score: number }) => {
    // Draw health bar
    ctx.fillStyle = '#e74c3c';
    ctx.fillRect(20, 20, 200, 20);
    ctx.fillStyle = '#27ae60';
    ctx.fillRect(20, 20, (player.health / 100) * 200, 20);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.strokeRect(20, 20, 200, 20);

    // Draw score
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 16px "Courier New"';
    ctx.fillText(`Score: ${player.score}`, canvas.width - 150, 35);

    // Draw controls hint
    ctx.font = '12px "Courier New"';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.fillText('← → Move | ↑ Jump | X Attack', 20, canvas.height - 20);
  };

  const handleStartGame = () => {
    setIsPlaying(true);
    // Reset game state
    const state = gameStateRef.current;
    state.player.score = 0;
    state.player.health = 100;
    state.player.x = 50;
    state.player.y = 200;
  };

  return (
    <div className="pixel-game-wrapper">
      <canvas
        ref={canvasRef}
        width={640}
        height={400}
        className="game-canvas"
        style={{
          imageRendering: 'pixelated' as React.CSSProperties['imageRendering'],
          border: '4px solid #1a1a2e',
          borderRadius: '8px',
          background: 'linear-gradient(180deg, #0f3460 0%, #16213e 100%)',
        }}
      />
      {!isPlaying && (
        <div className="game-overlay">
          <h3 className="game-title">Pixel Crusader</h3>
          <p className="game-description">Use arrow keys to move and jump!</p>
          <button onClick={handleStartGame} className="start-button">
            Start Game
          </button>
        </div>
      )}
    </div>
  );
};

export default PixelGame;
