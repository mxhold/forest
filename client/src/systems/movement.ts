import Context from "../Context";
import { Direction } from "../types";
import { move } from "../utils";

function mapKeyCode(code: string): Direction | undefined {
  if (code === "ArrowRight") {
    return "e";
  } else if (code === "ArrowLeft") {
    return "w";
  } else if (code === "ArrowUp") {
    return "n";
  } else if (code === "ArrowDown") {
    return "s";
  }
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
