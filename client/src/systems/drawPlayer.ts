import Context from "../Context";
import { SpriteFrame } from "../types";

export default function drawPlayer(ctx: Context) {
  ctx.canvas.clear();

  for (const entity of ctx.entities.find(
    "sprite",
    "spritePosition",
    "orientation",
    "walkStage",
    "attackStage"
  )) {
    let frame: SpriteFrame;
    if (entity.fetch("walkStage") === "step1") {
      frame = "step1";
    } else if (entity.fetch("walkStage") === "step2") {
      frame = "step2";
    } else if (entity.fetch("attackStage") === "attack1") {
      frame = "attack1";
    } else if (entity.fetch("attackStage") === "attack2") {
      frame = "attack2";
    } else if (entity.fetch("attackStage") === "attack3") {
      frame = "attack3";
    } else {
      frame = "stand";
    }

    ctx.canvas.drawSprite(
      entity.fetch("sprite"),
      entity.fetch("spritePosition"),
      entity.fetch("orientation"),
      frame
    );
  }
}
