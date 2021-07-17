import { CANVAS_SIZE } from "../../config/canvas";
import { Canvas } from "./models/canvas";

const canvas = new Canvas({ id: "canvas", alpha: true, ...CANVAS_SIZE });
canvas.drawSquare(25, 5, 15, 50);
