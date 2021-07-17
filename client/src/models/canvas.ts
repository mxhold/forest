export class Canvas {
  #ctx: CanvasRenderingContext2D

  constructor({ id, alpha, width, height }: { id: string, alpha: boolean, width: number, height: number }) {
    const canvasElement = document.getElementById(id) as HTMLCanvasElement;
    this.#ctx = canvasElement.getContext("2d", { alpha })!;
    scale(canvasElement, width / 2, height / 2, 2);
  }

  drawSquare(x: number, y: number, w: number, h: number) {
    this.#ctx.fillRect(x, y, w, h)
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
