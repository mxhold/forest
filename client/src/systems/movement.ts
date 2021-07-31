import { MOVEMENT } from "../config";
import Context from "../Context";
import { move } from "../utils";

export default function movement(ctx: Context) {
  for (const entity of ctx.entities.find(
    "movementIntent",
    "position",
    "walkStage",
    "orientation"
  )) {
    const movementIntent = entity.fetch("movementIntent");
    entity.delete("movementIntent");

    // Don't move if just changing direction
    if (movementIntent !== entity.fetch("orientation")) {
      entity.set("orientation", movementIntent);
      continue;
    }

    const newPosition = move(
      entity.fetch("position"),
      movementIntent,
      MOVEMENT.tileWidth
    );

    if (ctx.foregroundCanvas.inBounds(newPosition)) {
      entity.set("position", newPosition);
      entity.set("walkStage", "step1");
    }
  }
}
