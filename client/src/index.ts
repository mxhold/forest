import Context from "./Context";
import { App } from "./engine";
import {
  handleKeydown,
  drawPlayer,
  movement,
  walkAnimation,
  countFrames,
  attack,
} from "./systems";

App.build(Context)
  .addStartupSystem(handleKeydown)
  .addSystem(drawPlayer)
  .addSystem(movement)
  .addSystem(walkAnimation)
  .addSystem(attack)
  .addSystem(countFrames)
  .run();
