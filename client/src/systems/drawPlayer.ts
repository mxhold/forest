import Context from "../Context";
import { Stance } from "../types";

export default function drawPlayer(ctx: Context) {
  ctx.canvas.clear();
  if (ctx.sprites.player) {
    let stance: Stance;
    if (ctx.walkStage === "step1") {
      stance = "walk1";
    } else if (ctx.walkStage === "step2") {
      stance = "walk2";
    } else if (ctx.attackStage === "attack1") {
      stance = "attack1";
    } else if (ctx.attackStage === "attack2") {
      stance = "attack2";
    } else if (ctx.attackStage === "attack3") {
      stance = "attack3";
    } else {
      stance = "stand";
    }

    ctx.canvas.drawSprite(
      ctx.sprites.player,
      ctx.graphicalPosition,
      ctx.direction,
      stance
    );
  }
}
