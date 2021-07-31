import { Component } from "../Component";
import Context from "../Context";
import { Entity } from "../engine/ecs/Entity";
import { SpriteFrame } from "../types";

export default function walkStage(ctx: Context) {
  for (const entity of ctx.entities.find("walkStage")) {
    let frame: SpriteFrame;
    if (entity.fetch("walkStage") === "step1") {
      frame = "step1";
    } else if (entity.fetch("walkStage") === "step2") {
      frame = "step2";
    } else {
      continue;
    }

    entity.add({
      tag: "spriteFrame",
      spriteFrame: frame,
    });
  }
}
