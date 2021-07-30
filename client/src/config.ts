import { SpriteConfig } from "./engine/models/Sprite";

export const CANVAS = {
  size: { width: 400, height: 300 },
};

export const ENGINE = {
  framesPerSecond: 30,
};

export const MOVEMENT = {
  stageDurationMs: 50,
  tileWidth: 19,
};

export const ATTACK = {
  stageDurationMs: 50,
};

const player: SpriteConfig = {
  image: "assets/player.png",
  size: { width: 19, height: 38 },
  frames: ["n", "s", "e", "w"].flatMap((d) =>
    ["step1", "stand", "step2", "attack1", "attack2", "attack3"].map(
      (f) => `${d}_${f}`
    )
  ),
};

const snake: SpriteConfig = {
  image: "assets/snake.png",
  size: { width: 24, height: 24 },
  frames: [
    "w_stand",
    "w_step1",
    "w_step2",
    "e_stand",
    "e_step1",
    "e_step2",
    "n_step1",
    "n_step2",
    "s_step1",
    "s_step2",
  ],
};

export const SPRITES = {
  player,
  snake,
};
