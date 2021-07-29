import Context from "./Context";
import { App } from "./engine";
import {
  handleKeydown,
  drawPlayer,
  keyboardMovement,
  walkAnimation,
  countFrames,
  attack,
} from "./systems";

App.build(Context)
  .addStartupSystem(handleKeydown)
  .addSystem(drawPlayer)
  .addSystem(keyboardMovement)
  .addSystem(walkAnimation)
  .addSystem(attack)
  .addSystem(countFrames)
  .run();
