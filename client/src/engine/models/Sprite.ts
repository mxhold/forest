import { Direction, SpriteFrame, SpriteParams } from "../../../../common/types";
import { loadImage } from "../../utils";

export default class Sprite {
  width: number;
  height: number;
  image: CanvasImageSource;
  frames: string[];

  constructor({
    width,
    height,
    image,
    frames,
  }: {
    width: number;
    height: number;
    image: CanvasImageSource;
    frames: string[];
  }) {
    this.width = width;
    this.height = height;
    this.image = image;
    this.frames = frames;
  }

  static async load({
    size: { width, height },
    image,
    frames,
  }: SpriteParams): Promise<Sprite> {
    return new Sprite({
      image: await loadImage(image),
      width,
      height,
      frames,
    });
  }

  frame(direction: Direction, spriteFrame: SpriteFrame) {
    const frame = `${direction}_${spriteFrame}`;
    let frameIndex = this.frames.indexOf(frame);
    if (frameIndex === -1) {
      frameIndex = 0;
    }

    return {
      sx: frameIndex * this.width,
      sy: 0,
      sWidth: this.width,
      sHeight: this.height,
    };
  }
}
