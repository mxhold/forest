import Context from "../Context";
import { Direction } from "../types";
import { move } from "../utils";
import { shiftKeydownEvents } from "./handleKeydown";

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

const FOLLOWED_KEYS = new Set<KeyboardEvent["code"]>([
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
]);

export default function movement(ctx: Context) {
  if (!ctx.sprites) {
    return;
  }

  const keyCode = shiftKeydownEvents(ctx, FOLLOWED_KEYS);
  if (!keyCode) {
    return;
  }

  if (ctx.walkStage !== "stop") {
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
