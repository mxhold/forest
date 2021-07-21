import { CANVAS } from "./config";
import { Canvas } from "./engine";
import { Position } from "./types";

export default class Context {
  canvas: Canvas = new Canvas({ id: "canvas", alpha: true, ...CANVAS.size });
  keydownEvents: KeyboardEvent["code"][] = [];
  position: Position = { x: 0, y: 0 };
  sprites: {
    player: CanvasImageSource | undefined;
  };

  constructor() {
    this.sprites = { player: undefined };
    const image = new Image();
    image.src = "assets/player.png";
    image.onload = () => {
      this.sprites.player = image;
    };
  }
}
