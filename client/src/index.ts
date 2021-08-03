import LoadedContext, { UnloadedContext } from "./Context";
import { App } from "./engine";
import {
  handleKeydown,
  drawSprite,
  keyboardMovement,
  walkAnimation,
  countFrames,
  attack,
  // snakeSetup,
  wanderingMovement,
  movement,
  drawBackground,
  webSocket,
  loadSprite,
} from "./systems";

App.build<UnloadedContext, LoadedContext>(UnloadedContext)
  // .addStartupSystem(snakeSetup)
  .addStartupSystem(handleKeydown)
  .addStartupSystem(webSocket)
  .addSystem(loadSprite)
  .addSystem(keyboardMovement)
  .addSystem(wanderingMovement)
  .addSystem(attack)
  .addSystem(movement)
  .addSystem(walkAnimation)
  .addSystem(countFrames)
  .addSystem(drawBackground)
  .addSystem(drawSprite)
  .run();
