import { Direction, Position } from "../../../common/types";
import { Component } from "../Component";
import Context from "../Context";
import { Entity } from "../engine";

export class Player {
  static move(
    player: Entity<any, Component>,
    position: Position,
    orientation: Direction,
    frame: number
  ) {
    player.add({
      tag: "position",
      position,
    });
    player.add({
      tag: "orientation",
      orientation,
    });
    player.add({
      tag: "walkAnimation",
      walkAnimation: {
        walkStage: "step1",
        startedAtFrame: frame,
      },
    });
  }

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
