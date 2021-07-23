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

function move(position: Position, movement: Direction, distance: number) {
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

export default function logicalMovement(ctx: Context) {
  if (!ctx.sprites.player) {
    return;
  }

  const keyCode = ctx.keydownEvents.shift();
  if (!keyCode) {
    return;
  }

  const direction = mapKeyCode(keyCode);
  if (!direction) {
    return;
  }

  // Don't move if changing directions
  if (direction !== ctx.direction) {
    ctx.direction = direction;
    return;
  }

  const newPosition = move(
    ctx.logicalPosition,
    direction,
    ctx.sprites.player.width
  );

  if (ctx.canvas.inBounds(newPosition, ctx.sprites.player)) {
    ctx.direction = direction;
    ctx.logicalPosition = newPosition;
    ctx.walkStage = "step1";
  }
}
