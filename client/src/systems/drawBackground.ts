import Context from "../Context";

export default function drawBackground(ctx: Context) {
  ctx.backgroundCanvas.drawBackground(ctx.backgroundImage);
}
