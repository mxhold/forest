import { Component } from "../Component";
import { MOVEMENT } from "../config";
import Context from "../Context";
import { Entity } from "../engine/ecs/Entity";
import { msToFrames } from "../utils";

const wanderEveryNFrame = msToFrames(MOVEMENT.wanderEveryMs);

export default function wanderingMovement(ctx: Context) {
  for (const entity of ctx.entities.find(
    "wandering",
    "position",
    "walkStage",
    "orientation"
  )) {
    if (ctx.frame % wanderEveryNFrame === 0) {
      entity.set("orientation", "s");
      entity.add({
        tag: "movementIntent",
        movementIntent: "s",
      });
    }
  }
}
