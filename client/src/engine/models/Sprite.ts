import { Direction, Stance } from "../../types";

const segments: Direction[] = ["up", "down", "right", "left"];
const stances: Stance[] = ["walk1", "stand", "walk2"];

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

  frame(direction: Direction, stance: Stance) {
    const segmentIndex = segments.indexOf(direction);
    const stanceIndex = stances.indexOf(stance);
    const segmentOffset = segmentIndex * stances.length * this.width;
    const stanceOffset = stanceIndex * this.width;

    return {
      sx: segmentOffset + stanceOffset,
      sy: 0,
      sWidth: this.width,
      sHeight: this.height,
    };
  }
}
