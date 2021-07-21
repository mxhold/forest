import Context from "../Context";

export default function drawPlayer(ctx: Context) {
  const position = ctx.position;
  ctx.canvas.clear();
  if (ctx.sprites.player) {
    ctx.canvas.renderSprite(ctx.sprites.player, position);
  }
}
