import { MOVEMENT } from "../config";
import Context from "../Context";
import { Sprite } from "../engine";
import { Position, WalkStage } from "../types";
import { move, msToFrames } from "../utils";

function toSpritePosition(sprite: Sprite, position: Position) {
  return { x: position.x, y: position.y - sprite.height + MOVEMENT.tileWidth };
}

const framesPerStage = msToFrames(MOVEMENT.stageDurationMs);

const stages = ["step1", "pause", "step2"];

function offset(walkStage: WalkStage, width: number): number {
  const distancePerStage = width / 4;

  if (walkStage === "step1") {
    return -3 * distancePerStage;
  } else if (walkStage === "pause") {
    return -2 * distancePerStage;
  } else if (walkStage === "step2") {
    return -1 * distancePerStage;
  } else {
    return 0;
  }
}

function finishStageAtFrame(stage: WalkStage) {
  return (stages.indexOf(stage) + 1) * framesPerStage;
}

function nextStage(stage: WalkStage): WalkStage {
  if (stage === "step1") {
    return "pause";
  } else if (stage === "pause") {
    return "step2";
  } else if (stage === "step2") {
    return "stop";
  }
  throw new Error("unreachable");
}

let walkStartedAtFrame: null | number = null;

export default function walkAnimation(ctx: Context) {
  for (const entity of ctx.entities.find(
    "orientation",
    "walkStage",
    "position",
    "spritePosition",
    "sprite"
  )) {
    if (entity.fetch("walkStage") === "stop") {
      entity.set(
        "spritePosition",
        toSpritePosition(entity.fetch("sprite"), entity.fetch("position"))
      );
      continue;
    }

    if (walkStartedAtFrame === null) {
      walkStartedAtFrame = ctx.frame;
    }

    if (
      ctx.frame >
      finishStageAtFrame(entity.fetch("walkStage")) + walkStartedAtFrame
    ) {
      entity.set("walkStage", nextStage(entity.fetch("walkStage")));
      if (entity.fetch("walkStage") === "stop") {
        walkStartedAtFrame = null;
      }
    }

    const stageOffset = offset(entity.fetch("walkStage"), MOVEMENT.tileWidth);

    const newPosition = move(
      entity.fetch("position"),
      entity.fetch("orientation"),
      stageOffset
    );

    entity.set(
      "spritePosition",
      toSpritePosition(entity.fetch("sprite"), newPosition)
    );
  }
}
