import { CANVAS } from "./config";
import { Canvas, Sprite } from "./engine";
import { Direction, Position, WalkStage } from "./types";

export default class Context {
  frame: number = 1;
  canvas: Canvas = new Canvas({ id: "canvas", alpha: true, ...CANVAS.size });
  keydownEvents: KeyboardEvent["code"][] = [];
  logicalPosition: Position = { x: 0, y: 0 };
  graphicalPosition: Position = { x: 0, y: 0 };
  direction: Direction = "down";
  sprites: {
    player: Sprite | undefined;
  };
  walkStage: WalkStage = "stop";

  constructor() {
    this.sprites = { player: undefined };
    const image = new Image();
    image.src = "assets/player2.png";
    image.onload = () => {
      this.sprites.player = new Sprite({
        image,
        width: 19,
        height: 38,
      });
    };
  }
}
