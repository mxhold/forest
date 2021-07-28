export type Direction = "right" | "left" | "up" | "down";
export type Position = { x: number; y: number };
export type Stance =
  | "stand"
  | "walk1"
  | "walk2"
  | "attack1"
  | "attack2"
  | "attack3";
export type WalkStage = "stop" | "step1" | "pause" | "step2";
export type AttackStage = "done" | "attack1" | "attack2" | "attack3";
