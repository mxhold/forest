import Context from "../Context";

export default function movement(ctx: Context) {
  const key = ctx.keydownEvents.shift();
  if (key === "ArrowRight") {
    ctx.position.x += 10;
  } else if (key === "ArrowLeft") {
    ctx.position.x -= 10;
  } else if (key === "ArrowUp") {
    ctx.position.y -= 10;
  } else if (key === "ArrowDown") {
    ctx.position.y += 10;
  }
}
