import { ATTACK } from "../config";
import Context from "../Context";
import { AttackStage } from "../types";
import { msToFrames } from "../utils";

const framesPerStage = msToFrames(ATTACK.stageDurationMs);

const stages = ["attack1", "attack2", "attack3"];

function finishStageAtFrame(stage: AttackStage) {
  let duration = framesPerStage;
  if (stage === "attack1") {
    duration = msToFrames(75)
  } else if (stage === "attack2") {
    duration = msToFrames(25);
  } else {
    duration = msToFrames(75);
  }
  return (stages.indexOf(stage) + 1) * duration;
}

function nextStage(stage: AttackStage): AttackStage {
  if (stage === "attack1") {
    return "attack2";
  } else if (stage === "attack2") {
    return "attack3";
  } else if (stage === "attack3") {
    return "done";
  }
  throw new Error("unreachable");
}

let animationStartedAtFrame: null | number = null;

export default function attack(ctx: Context) {
  if (!ctx.sprites.player) {
    return;
  }

  if (ctx.attackStage === "done") {
    return;
  }

  if (animationStartedAtFrame === null) {
    animationStartedAtFrame = ctx.frame;
  }

  if (
    ctx.frame >
    finishStageAtFrame(ctx.attackStage) + animationStartedAtFrame
  ) {
    ctx.attackStage = nextStage(ctx.attackStage);
    if (ctx.attackStage === "done") {
      animationStartedAtFrame = null;
    }
  }
}
