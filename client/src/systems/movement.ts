import { MapCoordinates } from "../../../common/types";
import { Player } from "../assemblages";
import { CANVAS } from "../config";
import Context from "../Context";
import { Entity } from "../engine";
import { coordsToPos, move } from "../utils";

function walkable(
  ctx: Context,
  player: Entity<any, any>,
  newCoordinates: MapCoordinates
): boolean {
  // TODO?: load coordinates from server?
  if (!ctx.foregroundCanvas.inBounds(coordsToPos(newCoordinates))) {
    return false;
  }

  for (const entity of ctx.entities.find("collide", "mapCoordinates")) {
    if (entity === player) {
      continue;
    }
    const coordinates = entity.fetch("mapCoordinates");
    if (
      coordinates.x === newCoordinates.x &&
      coordinates.y === newCoordinates.y
    ) {
      return false;
    }
  }

  return true;
}

export default function movement(ctx: Context) {
  for (const entity of ctx.entities.find(
    "movementIntent",
    "mapCoordinates",
    "orientation"
  )) {
    const movementIntent = entity.fetch("movementIntent");
    entity.delete("movementIntent");

    let distance = 1;

    // Changing orientation is a zero-distance move
    if (movementIntent !== entity.fetch("orientation")) {
      distance = 0;
    }

    const newCoordinates = move(
      entity.fetch("mapCoordinates"),
      movementIntent,
      distance
    );

    if (walkable(ctx, entity, newCoordinates)) {
      Player.move(entity, newCoordinates, movementIntent, ctx.frame);

      ctx.send({
        tag: "move",
        orientation: movementIntent,
        coordinates: newCoordinates,
      });
    }
  }
}
