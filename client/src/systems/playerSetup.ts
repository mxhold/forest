import Context from "../Context";

export default function playerSetup(ctx: Context) {
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
      tag: "spritePosition",
      spritePosition: { x: 0, y: 0 },
    })
    .add({
      tag: "orientation",
      orientation: "s",
    })
    .add({
      tag: "keyboardControlled",
    })
    .add({
      tag: "walkStage",
      walkStage: "stop",
    })
    .add({
      tag: "attackStage",
      attackStage: "done",
    });
}
