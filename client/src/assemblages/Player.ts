import { Component } from "../Component";
import { SPRITES } from "../config";
import Context from "../Context";

export class Player {
  static components(): Component[] {
    return [
      {
        tag: "spriteConfig",
        spriteConfig: SPRITES.player,
      },
      {
        tag: "orientation",
        orientation: "s",
      },
      {
        tag: "walkStage",
        walkStage: "stop",
      },
      {
        tag: "attackStage",
        attackStage: "done",
      },
      {
        tag: "collide",
      },
    ];
  }

  static build(ctx: Context) {
    const entity = ctx.entities.create();
    for (const component of Player.components()) {
      entity.add(component);
    }
    return entity;
  }
}
