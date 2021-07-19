import { World, Canvas } from "../engine";
import { CANVAS_SIZE } from "../../../config/canvas";

export default function startup(world: World) {
  const canvas = new Canvas({ id: "canvas", alpha: true, ...CANVAS_SIZE });

  world.addResource("canvas", canvas);
}
