export const CANVAS = {
  size: { width: 800, height: 640 },
};

export const GAME = {
  framesPerSecond: 30,
};

export const msToFrames = (ms: number) => {
  const msPerFrame = (1 / GAME.framesPerSecond) * 1000;
  return ms / msPerFrame;
};

export const MOVEMENT = {
  stageDurationMs: 50,
};
