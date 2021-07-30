import { Component } from "./Component";
import { CANVAS, SPRITES } from "./config";
import { Canvas, EntityCollection, Sprite } from "./engine";

type SpriteName = keyof typeof SPRITES;

export class UnloadedContext {
  entities: EntityCollection<Component> = new EntityCollection();
  frame: number = 1;
  canvas: Canvas = new Canvas({ id: "canvas", alpha: true, ...CANVAS.size });
  keydownEvents: KeyboardEvent["code"][] = [];

  async load(): Promise<LoadedContext> {
    const sprites: Partial<Record<SpriteName, Sprite>> = {};
    const spriteNames = Object.keys(SPRITES) as Array<SpriteName>;
    for (const spriteName of spriteNames) {
      sprites[spriteName] = await Sprite.load(SPRITES[spriteName]);
    }
    return new LoadedContext(sprites as Record<SpriteName, Sprite>);
  }
}

export default class LoadedContext extends UnloadedContext {
  sprites: Record<SpriteName, Sprite>;

  constructor(sprites: Record<SpriteName, Sprite>) {
    super();
    this.sprites = sprites;
  }
}
