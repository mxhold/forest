import {
  CanvasPosition,
  Direction,
  SpriteFrame,
} from "../../../../common/types";
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

  drawBackground(image: CanvasImageSource) {
    this.#ctx.drawImage(image, 0, 0);
  }

  drawSprite(
    sprite: Sprite,
    position: CanvasPosition,
    direction: Direction,
    spriteFrame: SpriteFrame
  ) {
    const segment = sprite.frame(direction, spriteFrame);
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

  inBounds(position: CanvasPosition) {
    return (
      position.x >= 0 &&
      position.y >= 0 &&
      position.x < this.width &&
      position.y < this.height
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
