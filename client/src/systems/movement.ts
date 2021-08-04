import { Position } from "../../../common/types";
import { Player } from "../assemblages";
import { CANVAS } from "../config";
import Context from "../Context";
import { Entity } from "../engine";
import { move } from "../utils";

function walkable(
  ctx: Context,
  player: Entity<any, any>,
  newPosition: Position
) {
  if (!ctx.foregroundCanvas.inBounds(newPosition)) {
    return false;
  }

  for (const entity of ctx.entities.find("collide", "position")) {
    if (entity === player) {
      continue;
    }
    const position = entity.fetch("position");
    if (position.x === newPosition.x && position.y === newPosition.y) {
      return false;
    }
  }

  return true;
}

export default function movement(ctx: Context) {
  for (const entity of ctx.entities.find(
    "movementIntent",
    "position",
    "orientation"
  )) {
    const movementIntent = entity.fetch("movementIntent");
    entity.delete("movementIntent");

    let distance = CANVAS.tileWidth;

    // Changing orientation is a zero-distance move
    if (movementIntent !== entity.fetch("orientation")) {
      distance = 0;
    }

    const newPosition = move(
      entity.fetch("position"),
      movementIntent,
      distance
    );

    if (walkable(ctx, entity, newPosition)) {
      Player.move(entity, newPosition, movementIntent, ctx.frame);

      ctx.send({
        tag: "move",
        orientation: movementIntent,
        coordinates: {
          x: newPosition.x / CANVAS.tileWidth,
          y: newPosition.y / CANVAS.tileWidth,
        },
      });
    }
  }
}
