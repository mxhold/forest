import Context from "../Context";

export default function playerSetup(ctx: Context) {
  if (!ctx.sprites) {
    throw new Error("Sprites not loaded");
  }

  ctx.entities
    .create()
    .add({
      tag: "sprite",
      sprite: ctx.sprites.player,
    })
    .add({
      tag: "position",
      position: { x: 0, y: 0 },
    })
    .add({
      tag: "orientation",
      orientation: "s",
    })
    .add({
      tag: "keyboard_controlled",
    });
}
