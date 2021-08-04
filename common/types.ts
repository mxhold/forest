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

export type WebSocketServerMessage =
  | {
      tag: "player";
      playerId: number;
      coordinates: Position;
      // TODO: add orientation
      spriteParams: SpriteParams;
      isMe: boolean;
    }
  | {
      tag: "move";
      playerId: number;
      orientation: Direction;
      coordinates: Position;
    }
  | {
      tag: "disconnect";
      playerId: number;
    };

export type WebSocketClientMessage = {
  tag: "move";
  coordinates: Position;
  orientation: Direction;
};

export type SpriteParams = {
  name: string;
  image: string;
  size: Size;
  frames: `${Direction}_${SpriteFrame}`[];
};
