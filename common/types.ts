export type Direction = "n" | "s" | "e" | "w";
type Position<Type extends string> = { type: Type; x: number; y: number };
export type CanvasPosition = Position<"CanvasPosition">;
export type MapCoordinates = Position<"MapCoordinates">;
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
      coordinates: MapCoordinates;
      // TODO: add orientation
      spriteParams: SpriteParams;
      isMe: boolean;
    }
  | {
      tag: "move";
      playerId: number;
      orientation: Direction;
      coordinates: MapCoordinates;
    }
  | {
      tag: "disconnect";
      playerId: number;
    };

export type WebSocketClientMessage = {
  tag: "move";
  coordinates: MapCoordinates;
  orientation: Direction;
};

export type SpriteParams = {
  name: string;
  image: string;
  size: Size;
  frames: `${Direction}_${SpriteFrame}`[];
};
