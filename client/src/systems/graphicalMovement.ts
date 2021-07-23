import { MOVEMENT, msToFrames } from "../config";
import Context from "../Context";
import { Direction, Position, WalkStage } from "../types";

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

function move(
  position: Position,
  movement: Direction,
  walkStage: WalkStage,
  distance: number
): Position {
  const stageOffset = offset(walkStage, distance);

  if (movement === "right") {
    return { ...position, x: position.x + stageOffset };
  } else if (movement === "left") {
    return { ...position, x: position.x - stageOffset };
  } else if (movement === "up") {
    return { ...position, y: position.y - stageOffset };
  } else if (movement === "down") {
    return { ...position, y: position.y + stageOffset };
  }
  throw new Error("unreachable");
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

export default function graphicalMovement(ctx: Context) {
  if (!ctx.sprites.player) {
    return;
  }

  if (ctx.walkStage === "stop") {
    ctx.graphicalPosition = ctx.logicalPosition;
    walkStartedAtFrame = null;
    return;
  }

  if (walkStartedAtFrame === null) {
    walkStartedAtFrame = ctx.frame;
  }

  if (ctx.frame > finishStageAtFrame(ctx.walkStage) + walkStartedAtFrame) {
    ctx.walkStage = nextStage(ctx.walkStage);
  }

  ctx.graphicalPosition = move(
    ctx.logicalPosition,
    ctx.direction,
    ctx.walkStage,
    ctx.sprites.player.width
  );
}
