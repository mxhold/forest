import Context from "../Context";
import { Direction, Position } from "../types";

function mapKeyCode(code: string): Direction | undefined {
  if (code === "ArrowRight") {
    return "right";
  } else if (code === "ArrowLeft") {
    return "left";
  } else if (code === "ArrowUp") {
    return "up";
  } else if (code === "ArrowDown") {
    return "down";
  }
}

function move(position: Position, movement: Direction) {
  if (movement === "right") {
    return { ...position, x: position.x + 10 };
  } else if (movement === "left") {
    return { ...position, x: position.x - 10 };
  } else if (movement === "up") {
    return { ...position, y: position.y - 10 };
  } else if (movement === "down") {
    return { ...position, y: position.y + 10 };
  }
  throw new Error("unreachable");
}

export default function movement(ctx: Context) {
  const keyCode = ctx.keydownEvents.shift();
  if (!keyCode) {
    return;
  }

  const direction = mapKeyCode(keyCode);
  if (!direction) {
    return;
  }

  const newPosition = move(ctx.position, direction);
  console.log(newPosition);

  if (ctx.canvas.inBounds(newPosition)) {
    ctx.direction = direction;
    ctx.position = newPosition;
  }
}
