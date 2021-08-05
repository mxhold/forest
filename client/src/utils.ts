import { Direction, MapCoordinates, CanvasPosition } from "../../common/types";
import { CANVAS, ENGINE } from "./config";

export function posToCoords(position: CanvasPosition): MapCoordinates {
  return {
    type: "MapCoordinates",
    x: position.x / CANVAS.tileWidth,
    y: position.y / CANVAS.tileWidth,
  };
}

export function coordsToPos(coordinates: MapCoordinates): CanvasPosition {
  return {
    type: "CanvasPosition",
    x: coordinates.x * CANVAS.tileWidth,
    y: coordinates.y * CANVAS.tileWidth,
  };
}

export function move<Position extends CanvasPosition | MapCoordinates>(
  position: Position,
  movement: Direction,
  distance: number
): Position {
  if (movement === "e") {
    return { ...position, x: position.x + distance };
  } else if (movement === "w") {
    return { ...position, x: position.x - distance };
  } else if (movement === "n") {
    return { ...position, y: position.y - distance };
  } else if (movement === "s") {
    return { ...position, y: position.y + distance };
  }
  throw new Error("unreachable");
}

export const msToFrames = (ms: number) => {
  const msPerFrame = (1 / ENGINE.framesPerSecond) * 1000;
  return ms / msPerFrame;
};

export const loadImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = url;
    image.onload = () => {
      resolve(image);
    };
    image.onerror = (error) => {
      reject(error);
    };
  });
};
