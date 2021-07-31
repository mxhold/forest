import { Component } from "../Component";
import Context from "../Context";
import { Entity } from "../engine/ecs/Entity";
import { SpriteFrame } from "../types";

export default function attackStage(ctx: Context) {
  for (const entity of ctx.entities.find("attackStage")) {
    let frame: SpriteFrame;
    if (entity.fetch("attackStage") === "attack1") {
      frame = "attack1";
    } else if (entity.fetch("attackStage") === "attack2") {
      frame = "attack2";
    } else if (entity.fetch("attackStage") === "attack3") {
      frame = "attack3";
    } else if (entity.fetch("attackStage") === "done") {
      frame = "stand";
    } else {
      continue;
    }

    entity.add({
      tag: "spriteFrame",
      spriteFrame: frame,
    });
  }
}
