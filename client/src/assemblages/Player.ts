import { Direction, Position } from "../../../common/types";
import { Component } from "../Component";
import Context from "../Context";
import { Entity } from "../engine";

export class Player {
  static move(
    player: Entity<any, Component>,
    newPosition: Position,
    orientation: Direction,
    frame: number
  ) {
    player.add({
      tag: "orientation",
      orientation,
    });

    let positionUnchanged = false;
    player.ifHas("position", (player) => {
      const currentPosition = player.fetch("position");
      if (
        currentPosition.x === newPosition.x &&
        currentPosition.y === newPosition.y
      ) {
        positionUnchanged = true;
      }
    });

    if (positionUnchanged) {
      // This means the player just changed orientation
      // so no need to animate or update position
      return;
    }

    player.add({
      tag: "walkAnimation",
      walkAnimation: {
        walkStage: "step1",
        startedAtFrame: frame,
      },
    });
    player.add({
      tag: "position",
      position: newPosition,
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
