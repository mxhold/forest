import Context from "./Context";
import { App } from "./engine";
import {
  handleKeydown,
  drawPlayer,
  movement,
  walkAnimation,
  countFrames,
} from "./systems";

App.build(Context)
  .addStartupSystem(handleKeydown)
  .addSystem(drawPlayer)
  .addSystem(movement)
  .addSystem(walkAnimation)
  .addSystem(countFrames)
  .run();
