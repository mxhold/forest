import { World } from "../World";

export default function drawCircle(world: World) {
  const canvas = world.getResource("canvas");
  canvas.drawCircle(100, 200, 25);
}
