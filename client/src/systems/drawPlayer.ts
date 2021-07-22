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
    } else {
      stance = "stand";
    }
    
    ctx.canvas.drawSprite(ctx.sprites.player, ctx.position, ctx.direction, stance);
  }
}
