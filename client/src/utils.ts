import { Position, Direction } from "./types";

export function move(
  position: Position,
  movement: Direction,
  distance: number
) {
  if (movement === "right") {
    return { ...position, x: position.x + distance };
  } else if (movement === "left") {
    return { ...position, x: position.x - distance };
  } else if (movement === "up") {
    return { ...position, y: position.y - distance };
  } else if (movement === "down") {
    return { ...position, y: position.y + distance };
  }
  throw new Error("unreachable");
}
