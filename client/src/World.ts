import { Canvas, World as EcsWorld } from "./engine";

export interface Resources {
  canvas: Canvas;
  turn: number;
}

export type World = EcsWorld<Resources>;
