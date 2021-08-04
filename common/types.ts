export type Direction = "n" | "s" | "e" | "w";
export type Position = { x: number; y: number };
export type Size = { width: number; height: number };
export type SpriteFrame =
  | "stand"
  | "step1"
  | "step2"
  | "attack1"
  | "attack2"
  | "attack3";

export type WebSocketMessage = {
  tag: "player";
  id: number;
  coordinates: Position;
  spriteParams: SpriteParams;
  isMe: boolean;
};

export type SpriteParams = {
  name: string;
  image: string;
  size: Size;
  frames: `${Direction}_${SpriteFrame}`[];
};
