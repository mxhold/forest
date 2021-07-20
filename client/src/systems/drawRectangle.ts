import Context from "../Context";

export default function drawRectangle(ctx: Context) {
  const position = ctx.position;
  ctx.canvas.drawSquare(position.x, position.y, 10, 10);
}
