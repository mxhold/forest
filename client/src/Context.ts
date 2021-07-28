import { CANVAS } from "./config";
import { Canvas, Sprite } from "./engine";
import { Direction, Position, WalkStage, AttackStage } from "./types";

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
  attackStage: AttackStage = "done";

  constructor() {
    this.sprites = { player: undefined };
    const image = new Image();
    image.src = "assets/player-with-attack.png";
    image.onload = () => {
      this.sprites.player = new Sprite({
        image,
        width: 19,
        height: 38,
      });
    };
  }
}
