import { Component } from "../Component";
import { MOVEMENT } from "../config";
import Context from "../Context";
import { Entity } from "../engine/ecs/Entity";
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

  for (let entity of ctx.entities.find(
    "walkStage",
    "keyboardControlled",
    "position"
  )) {
    if (entity.fetch("walkStage") !== "stop") {
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
