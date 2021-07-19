import { World } from "../World";

export default function drawRectangle(world: World) {
  const canvas = world.getResource("canvas");
  canvas.drawSquare(25, 5, 15, 50);
}
