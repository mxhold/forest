import Context from "../Context";
import { SpriteFrame } from "../types";

export default function drawPlayer(ctx: Context) {
  if (!ctx.sprites) {
    return;
  }

  const entities = ctx.entities.find(
    "sprite",
    "position",
    "orientation",
    "walkStage",
    "attackStage"
  );
  if (entities.length < 1) {
    return;
  }

  ctx.canvas.clear();

  for (const entity of entities) {
    const walkStage = entity.get("walkStage").walkStage;
    const attackStage = entity.get("attackStage").attackStage;

    let frame: SpriteFrame;
    if (walkStage === "step1") {
      frame = "step1";
    } else if (walkStage === "step2") {
      frame = "step2";
    } else if (attackStage === "attack1") {
      frame = "attack1";
    } else if (attackStage === "attack2") {
      frame = "attack2";
    } else if (attackStage === "attack3") {
      frame = "attack3";
    } else {
      frame = "stand";
    }

    ctx.canvas.drawSprite(
      entity.get("sprite").sprite,
      entity.get("position").position,
      entity.get("orientation").orientation,
      frame
    );
  }
}
