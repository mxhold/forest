import Context from "../Context";
import { Movement, Position } from "../types";

function mapKeyCode(code: string): Movement | undefined {
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

function move(position: Position, movement: Movement) {
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

  const movement = mapKeyCode(keyCode);
  if (!movement) {
    return;
  }

  const newPosition = move(ctx.position, movement);
  console.log(newPosition);

  if (ctx.canvas.inBounds(newPosition)) {
    ctx.position = newPosition;
  }
}
