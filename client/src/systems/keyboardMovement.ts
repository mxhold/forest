import { Direction } from "../../../common/types";
import Context from "../Context";
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

  for (let entity of ctx.entities.find("walkAnimation", "keyboardControlled")) {
    if (entity.fetch("walkAnimation").walkStage !== "stop") {
      continue;
    }

    const direction = mapKey(key);
    if (!direction) {
      continue;
    }

    entity.add({
      tag: "movementIntent",
      movementIntent: direction,
    });
  }
}
