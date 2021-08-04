import Context from "./Context";
import { App } from "./engine";
import {
  handleKeydown,
  drawSprite,
  keyboardMovement,
  walkAnimation,
  countFrames,
  attack,
  wanderingMovement,
  movement,
  webSocket,
  loadSprite,
} from "./systems";

App.build(Context)
  .addStartupSystem(handleKeydown)
  .addStartupSystem(webSocket)
  .addSystem(loadSprite)
  .addSystem(keyboardMovement)
  .addSystem(wanderingMovement)
  .addSystem(attack)
  .addSystem(movement)
  .addSystem(walkAnimation)
  .addSystem(countFrames)
  .addSystem(drawSprite)
  .run();
