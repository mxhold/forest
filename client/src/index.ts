import LoadedContext, { UnloadedContext } from "./Context";
import { App } from "./engine";
import {
  handleKeydown,
  drawSprite,
  keyboardMovement,
  walkAnimation,
  countFrames,
  attack,
  playerSetup,
  snakeSetup,
} from "./systems";

App.build<UnloadedContext, LoadedContext>(UnloadedContext)
  .addStartupSystem(playerSetup)
  .addStartupSystem(snakeSetup)
  .addStartupSystem(handleKeydown)
  .addSystem(drawSprite)
  .addSystem(keyboardMovement)
  .addSystem(walkAnimation)
  .addSystem(attack)
  .addSystem(countFrames)
  .run();
