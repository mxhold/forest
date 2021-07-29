export type Direction = "n" | "s" | "e" | "w";
export type Position = { x: number; y: number };
export type Size = { width: number; height: number };
export type WalkStage = "stop" | "step1" | "pause" | "step2";
export type AttackStage = "done" | "attack1" | "attack2" | "attack3";
export type SpriteFrame =
  | "stand"
  | "step1"
  | "step2"
  | "attack1"
  | "attack2"
  | "attack3";
