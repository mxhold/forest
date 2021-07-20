import { CANVAS } from "./config";
import { Canvas } from "./engine";

export default class Context {
  canvas: Canvas = new Canvas({ id: "canvas", alpha: true, ...CANVAS.size });
  keydownEvents: KeyboardEvent["code"][] = [];
  position: { x: number; y: number } = { x: 0, y: 0 };
}
