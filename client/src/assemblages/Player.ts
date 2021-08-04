import { Component } from "../Component";
import Context from "../Context";

export class Player {
  static components(): Component[] {
    return [
      {
        tag: "orientation",
        orientation: "s",
      },
      {
        tag: "walkAnimation",
        walkAnimation: {
          walkStage: "stop",
          startedAtFrame: 0,
        },
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
