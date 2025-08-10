// src/utils/spritePreloader.ts
type SpriteConfig = { folder: string; frames: number };

const spriteConfigs: Record<string, SpriteConfig> = {
  idle: { folder: "idle", frames: 18 },
  idleBlinking: { folder: "idle_blinking", frames: 18 },
  walking: { folder: "walking", frames: 24 },
  running: { folder: "running", frames: 12 },
  jumpStart: { folder: "jump_start", frames: 6 },
  jumpLoop: { folder: "jump_loop", frames: 6 },
  falling: { folder: "falling_down", frames: 6 },
  slashing: { folder: "slashing", frames: 12 },
  runSlashing: { folder: "run_slashing", frames: 12 },
  airSlashing: { folder: "slashing_in_the_air", frames: 12 },
  kicking: { folder: "kicking", frames: 12 },
  throwing: { folder: "throwing", frames: 12 },
  runThrowing: { folder: "run_throwing", frames: 12 },
  airThrowing: { folder: "throwing_in_the_air", frames: 12 },
  sliding: { folder: "sliding", frames: 6 },
  hurt: { folder: "hurt", frames: 12 },
  dying: { folder: "dying", frames: 15 },
};

let preloaded = false;

export const preloadSprites = async () => {
  if (preloaded) return Promise.resolve();
  console.log("Preloading sprites...");

  const promises: Promise<void>[] = [];

  Object.values(spriteConfigs).forEach((config) => {
    for (let i = 0; i < config.frames; i++) {
      const frameNumber = i.toString().padStart(3, "0");
      const spritePath = `/assets/png/png_sequences/${config.folder}/0_skeleton_crusader_${config.folder}_${frameNumber}.png`;

      const promise = new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => {
          console.error(`Failed to load sprite: ${spritePath}`);
          resolve(); // Resolve anyway to not block other loads
        };
        img.src = spritePath;
      });

      promises.push(promise);
    }
  });

  await Promise.all(promises);
  console.log("All sprites preloaded");
  preloaded = true;
};
