import { Position } from "../../../common/types";
import { CANVAS, MOVEMENT } from "../config";
import Context from "../Context";
import { Sprite } from "../engine";
import { WalkStage } from "../types";
import { move, msToFrames } from "../utils";

function toSpritePosition(sprite: Sprite, position: Position) {
  return { x: position.x, y: position.y - sprite.height + CANVAS.tileWidth };
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

export default function walkAnimation(ctx: Context) {
  for (const entity of ctx.entities.find(
    "orientation",
    "walkAnimation",
    "position",
    "sprite"
  )) {
    const walkAnimation = entity.fetch("walkAnimation");
    if (walkAnimation.walkStage === "stop") {
      entity.add({
        tag: "spritePosition",
        spritePosition: toSpritePosition(
          entity.fetch("sprite"),
          entity.fetch("position")
        ),
      });
      continue;
    }

    if (
      ctx.frame >
      finishStageAtFrame(walkAnimation.walkStage) + walkAnimation.startedAtFrame
    ) {
      entity.set("walkAnimation", {
        ...walkAnimation,
        walkStage: nextStage(walkAnimation.walkStage),
      });
    }

    const stageOffset = offset(
      entity.fetch("walkAnimation").walkStage,
      CANVAS.tileWidth
    );

    const newPosition = move(
      entity.fetch("position"),
      entity.fetch("orientation"),
      stageOffset
    );

    entity.add({
      tag: "spritePosition",
      spritePosition: toSpritePosition(entity.fetch("sprite"), newPosition),
    });
  }
}
