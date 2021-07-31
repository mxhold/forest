import Context from "../Context";

export default function drawSprite(ctx: Context) {
  ctx.canvas.clear();

  for (const entity of ctx.entities.find(
    "sprite",
    "spritePosition",
    "orientation",
    "spriteFrame"
  )) {
    ctx.canvas.drawSprite(
      entity.fetch("sprite"),
      entity.fetch("spritePosition"),
      entity.fetch("orientation"),
      entity.fetch("spriteFrame")
    );
  }
}
