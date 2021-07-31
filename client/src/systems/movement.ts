import { MOVEMENT } from "../config";
import Context from "../Context";
import { move } from "../utils";

export default function movement(ctx: Context) {
  for (const entity of ctx.entities.find(
    "movementIntent",
    "position",
    "walkStage"
  )) {
    const newPosition = move(
      entity.fetch("position"),
      entity.fetch("movementIntent"),
      MOVEMENT.tileWidth
    );

    if (ctx.canvas.inBounds(newPosition)) {
      entity.delete("movementIntent");
      entity.set("position", newPosition);
      entity.set("walkStage", "step1");
    }
  }
}
