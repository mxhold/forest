import { ATTACK } from "../config";
import Context from "../Context";
import { AttackStage } from "../types";
import { msToFrames } from "../utils";
import { shiftKeydownEvents } from "./handleKeydown";

const framesPerStage = msToFrames(ATTACK.stageDurationMs);

const stages = ["attack1", "attack2", "attack3"];

function finishStageAtFrame(stage: AttackStage) {
  let duration = framesPerStage;
  if (stage === "attack1") {
    duration = msToFrames(75);
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

const FOLLOWED_KEYS = new Set<KeyboardEvent["code"]>(["Space"]);

let animationStartedAtFrame: null | number = null;

export default function attack(ctx: Context) {
  const keyCode = shiftKeydownEvents(ctx, FOLLOWED_KEYS);

  const entities = ctx.entities.find(
    "orientation",
    "walkStage",
    "keyboardControlled"
  );
  if (entities.length < 1) {
    return;
  }

  for (const entity of entities) {
    const attackStage = entity.get("attackStage").attackStage;
    if (keyCode === "Space" && attackStage === "done") {
      entity.get("attackStage").attackStage = "attack1";
      return;
    }

    if (attackStage === "done") {
      return;
    }

    if (animationStartedAtFrame === null) {
      animationStartedAtFrame = ctx.frame;
    }

    if (ctx.frame > finishStageAtFrame(attackStage) + animationStartedAtFrame) {
      entity.get("attackStage").attackStage = nextStage(attackStage);
      if (entity.get("attackStage").attackStage === "done") {
        animationStartedAtFrame = null;
      }
    }
  }
}
