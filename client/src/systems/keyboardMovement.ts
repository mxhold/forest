import Context from "../Context";
import { Direction } from "../types";
import { move } from "../utils";
import { pullKeydown } from "./handleKeydown";

function mapKey(code: string): Direction | undefined {
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
  const key = pullKeydown(ctx, FOLLOWED_KEYS);
  if (!key) {
    return;
  }

  for (const entity of ctx.entities.find(
    "orientation",
    "walkStage",
    "keyboardControlled",
    "position",
    "sprite"
  )) {
    if (entity.fetch("walkStage") !== "stop") {
      return;
    }

    const direction = mapKey(key);
    if (!direction) {
      return;
    }

    // Don't move if changing directions
    if (direction !== entity.fetch("orientation")) {
      entity.set("orientation", direction);
      return;
    }

    const newPosition = move(
      entity.fetch("position"),
      direction,
      entity.fetch("sprite").width
    );

    if (ctx.canvas.inBounds(newPosition, ctx.sprites.player)) {
      entity.set("position", newPosition);
      entity.set("walkStage", "step1");
    }
  }
}
