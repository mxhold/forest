import { Direction, Position, Stance } from "../../types";
import Sprite from "./Sprite";

export default class Canvas {
  #ctx: CanvasRenderingContext2D;
  width: number;
  height: number;

  constructor({
    id,
    alpha,
    width,
    height,
  }: {
    id: string;
    alpha: boolean;
    width: number;
    height: number;
  }) {
    this.width = width;
    this.height = height;
    const canvasElement = document.getElementById(id) as HTMLCanvasElement;
    this.#ctx = canvasElement.getContext("2d", { alpha })!;
    scale(canvasElement, width, height);
  }

  clear() {
    this.#ctx.clearRect(0, 0, this.width, this.height);
  }

  drawSquare(x: number, y: number, w: number, h: number) {
    this.#ctx.fillRect(x, y, w, h);
  }

  drawCircle(x: number, y: number, w: number) {
    this.#ctx.beginPath();
    this.#ctx.arc(x, y, w, 0, 2 * Math.PI);
    this.#ctx.fill();
  }

  drawSprite(
    sprite: Sprite,
    position: Position,
    direction: Direction,
    stance: Stance
  ) {
    const segment = sprite.frame(direction, stance);
    this.#ctx.drawImage(
      sprite.image,
      segment.sx,
      segment.sy,
      segment.sWidth,
      segment.sHeight,
      position.x,
      position.y,
      segment.sWidth,
      segment.sHeight
    );
  }

  inBounds(position: Position, sprite: Sprite) {
    return (
      position.x >= 0 &&
      position.y >= 0 &&
      position.x + sprite.width < this.width &&
      position.y + sprite.height < this.height
    );
  }
}

const scale = (canvas: HTMLCanvasElement, width: number, height: number) => {
  const scale = 2;

  canvas.style.width = width * scale + "px";
  canvas.style.height = height * scale + "px";

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d")!;

  ctx.imageSmoothingEnabled = false;
};
