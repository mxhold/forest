import { Component } from "./Component";
import { CANVAS, SPRITES } from "./config";
import { Canvas, EntityCollection, Sprite } from "./engine";
import { Position, WalkStage, AttackStage } from "./types";

type SpriteName = keyof typeof SPRITES;

export default class Context {
  entities: EntityCollection<Component> = new EntityCollection();
  frame: number = 1;
  canvas: Canvas = new Canvas({ id: "canvas", alpha: true, ...CANVAS.size });
  keydownEvents: KeyboardEvent["code"][] = [];
  sprites?: Record<SpriteName, Sprite>;

  async load() {
    const sprites: Partial<Record<SpriteName, Sprite>> = {};
    const spriteNames = Object.keys(SPRITES) as Array<SpriteName>;
    for (const spriteName of spriteNames) {
      sprites[spriteName] = await Sprite.load(SPRITES[spriteName]);
    }
    this.sprites = sprites as Record<SpriteName, Sprite>;
  }
}
