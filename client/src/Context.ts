import { CANVAS, SPRITES } from "./config";
import { Canvas, Sprite } from "./engine";
import { Direction, Position, WalkStage, AttackStage } from "./types";

type SpriteName = keyof typeof SPRITES;

export default class Context {
  frame: number = 1;
  canvas: Canvas = new Canvas({ id: "canvas", alpha: true, ...CANVAS.size });
  keydownEvents: KeyboardEvent["code"][] = [];
  logicalPosition: Position = { x: 0, y: 0 };
  graphicalPosition: Position = { x: 0, y: 0 };
  direction: Direction = "s";
  sprites!: Record<SpriteName, Sprite>;
  walkStage: WalkStage = "stop";
  attackStage: AttackStage = "done";

  async load() {
    const sprites: Partial<Record<SpriteName, Sprite>> = {};
    const spriteNames = Object.keys(SPRITES) as Array<SpriteName>;
    for (const spriteName of spriteNames) {
      sprites[spriteName] = await Sprite.load(SPRITES[spriteName]);
    }
    this.sprites = sprites as Record<SpriteName, Sprite>;
  }
}
