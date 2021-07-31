import Context from "../Context";

export default function snakeSetup(ctx: Context) {
  ctx.entities
    .create()
    .add({
      tag: "sprite",
      sprite: ctx.sprites.snake,
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
      orientation: "e",
    })
    .add({
      tag: "wandering",
    })
    .add({
      tag: "walkStage",
      walkStage: "stop",
    })
    .add({
      tag: "spriteFrame",
      spriteFrame: "stand",
    });
}
