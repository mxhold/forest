import { Direction, Position } from "../../types";
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
    this.width = width / 2;
    this.height = height / 2;
    const canvasElement = document.getElementById(id) as HTMLCanvasElement;
    this.#ctx = canvasElement.getContext("2d", { alpha })!;
    scale(canvasElement, width / 2, height / 2, 1.5);
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

  drawSprite(sprite: Sprite, position: Position, direction: Direction) {
    const segment = sprite.frame(direction, "stand");
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

  inBounds(position: Position) {
    return (
      position.x >= 0 &&
      position.y >= 0 &&
      position.x < this.width &&
      position.y < this.height
    );
  }
}

const scale = (
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
  scale: number
) => {
  const pixelRatio = window.devicePixelRatio || 1;

  canvas.width = scale * width * pixelRatio;
  canvas.height = scale * height * pixelRatio;

  canvas.style.width = `${scale * width}px`;
  canvas.style.height = `${scale * height}px`;

  const ctx = canvas.getContext("2d")!;

  ctx.imageSmoothingEnabled = false;

  ctx.scale(scale * pixelRatio, scale * pixelRatio);
};
