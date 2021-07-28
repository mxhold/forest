import { Direction, Stance } from "../../types";

const directions: Direction[] = ["up", "down", "right", "left"];
const stances: Stance[] = [
  "walk1",
  "stand",
  "walk2",
  "attack1",
  "attack2",
  "attack3",
];

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
    const directionIndex = directions.indexOf(direction);
    const stanceIndex = stances.indexOf(stance);

    const directionOffset = directionIndex * stances.length * this.width;
    const stanceOffset = stanceIndex * this.width;

    // debugger;

    return {
      sx: directionOffset + stanceOffset,
      sy: 0,
      sWidth: this.width,
      sHeight: this.height,
    };
  }
}
