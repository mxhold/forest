import { Direction } from "../../types";

const segments: Direction[] = ["up", "down", "right", "left"];
const FRAMES_PER_SEGMENT = 3;

export default class Sprite {
  width: number;
  height: number;
  image: CanvasImageSource;

  constructor({
    width,
    height,
    image,
  }: {
    width: number;
    height: number;
    image: CanvasImageSource;
  }) {
    this.width = width;
    this.height = height;
    this.image = image;
  }

  segment(direction: Direction) {
    const segmentIndex = segments.indexOf(direction);
    const xOffset = segmentIndex * (this.width * FRAMES_PER_SEGMENT);

    return {
      sx: xOffset + this.width,
      sy: 0,
      sWidth: this.width,
      sHeight: this.height,
    };
  }
}
