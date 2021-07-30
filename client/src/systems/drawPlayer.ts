import Context from "../Context";
import { SpriteFrame } from "../types";

export default function drawPlayer(ctx: Context) {
  if (!ctx.sprites) {
    return;
  }

  const entities = ctx.entities.find("sprite", "position", "orientation");
  if (entities.length < 1) {
    return;
  }

  ctx.canvas.clear();

  for (const entity of entities) {
    let frame: SpriteFrame;
    if (ctx.walkStage === "step1") {
      frame = "step1";
    } else if (ctx.walkStage === "step2") {
      frame = "step2";
    } else if (ctx.attackStage === "attack1") {
      frame = "attack1";
    } else if (ctx.attackStage === "attack2") {
      frame = "attack2";
    } else if (ctx.attackStage === "attack3") {
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
