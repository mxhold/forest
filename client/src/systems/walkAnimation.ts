import { MOVEMENT } from "../config";
import Context from "../Context";
import { WalkStage } from "../types";
import { move, msToFrames } from "../utils";

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
  if (ctx.walkStage === "stop") {
    ctx.graphicalPosition = ctx.logicalPosition;
    return;
  }

  if (walkStartedAtFrame === null) {
    walkStartedAtFrame = ctx.frame;
  }

  if (ctx.frame > finishStageAtFrame(ctx.walkStage) + walkStartedAtFrame) {
    ctx.walkStage = nextStage(ctx.walkStage);
    if (ctx.walkStage === "stop") {
      walkStartedAtFrame = null;
    }
  }

  const stageOffset = offset(ctx.walkStage, ctx.sprites.player.width);

  ctx.graphicalPosition = move(ctx.logicalPosition, ctx.direction, stageOffset);
}
