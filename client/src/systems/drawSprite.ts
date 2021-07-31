import Context from "../Context";
import { SpriteFrame } from "../types";

export default function drawSprite(ctx: Context) {
  ctx.canvas.clear();

  for (let entity of ctx.entities.find(
    "sprite",
    "spritePosition",
    "orientation"
  )) {
    let spriteFrame: SpriteFrame = "stand";

    entity.ifHas("attackStage", (e) => {
      const attackStage = e.fetch("attackStage");
      if (attackStage === "attack1") {
        spriteFrame = "attack1";
      } else if (attackStage === "attack2") {
        spriteFrame = "attack2";
      } else if (attackStage === "attack3") {
        spriteFrame = "attack3";
      }
    });

    entity.ifHas("walkStage", (e) => {
      const walkStage = e.fetch("walkStage");
      if (walkStage === "step1") {
        spriteFrame = "step1";
      } else if (walkStage === "step2") {
        spriteFrame = "step2";
      }
    });

    ctx.canvas.drawSprite(
      entity.fetch("sprite"),
      entity.fetch("spritePosition"),
      entity.fetch("orientation"),
      spriteFrame
    );
  }
}
