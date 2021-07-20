import { CANVAS } from "./config";
import { Canvas } from "./engine";

export default class Context {
  canvas: Canvas = new Canvas({ id: "canvas", alpha: true, ...CANVAS.size });
}
