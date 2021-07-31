import { Component } from "./Component";
import { CANVAS, SPRITES } from "./config";
import { Canvas, EntityCollection, Sprite } from "./engine";
import { loadImage } from "./utils";

type SpriteName = keyof typeof SPRITES;

export class UnloadedContext {
  entities: EntityCollection<Component> = new EntityCollection();
  frame: number = 1;
  foregroundCanvas: Canvas = new Canvas({ id: "foreground-canvas", alpha: true, ...CANVAS.size });
  backgroundCanvas: Canvas = new Canvas({ id: "background-canvas", alpha: false, ...CANVAS.size });

  pendingKeydown: KeyboardEvent["code"] | null = null;

  async load(): Promise<LoadedContext> {
    let sprites: Partial<Record<SpriteName, Sprite>> = {};
    const spriteNames = Object.keys(SPRITES) as Array<SpriteName>;
    for (const spriteName of spriteNames) {
      sprites[spriteName] = await Sprite.load(SPRITES[spriteName]);
    }
    const backgroundImage = await loadImage("assets/tiles.png")
    return new LoadedContext({ sprites, backgroundImage } as LoadedContextParams);
  }
}

interface LoadedContextParams {
  sprites: Record<SpriteName, Sprite>;
  backgroundImage: CanvasImageSource;
}

export default class LoadedContext extends UnloadedContext {
  sprites: Record<SpriteName, Sprite>;
  backgroundImage: CanvasImageSource;

  constructor({ sprites, backgroundImage }: LoadedContextParams) {
    super();
    this.sprites = sprites;
    this.backgroundImage = backgroundImage;
  }
}
