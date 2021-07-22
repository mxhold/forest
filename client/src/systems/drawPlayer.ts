import Context from "../Context";

export default function drawPlayer(ctx: Context) {
  ctx.canvas.clear();
  if (ctx.sprites.player) {
    ctx.canvas.drawSprite(ctx.sprites.player, ctx.position, ctx.direction);
  }
}
