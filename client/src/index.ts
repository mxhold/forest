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
  wanderingMovement,
  movement,
  attackStage,
  walkStage,
} from "./systems";

App.build<UnloadedContext, LoadedContext>(UnloadedContext)
  .addStartupSystem(playerSetup)
  .addStartupSystem(snakeSetup)
  .addStartupSystem(handleKeydown)
  .addSystem(keyboardMovement)
  .addSystem(wanderingMovement)
  .addSystem(attack)
  .addSystem(walkStage)
  .addSystem(attackStage)
  .addSystem(movement)
  .addSystem(walkAnimation)
  .addSystem(countFrames)
  .addSystem(drawSprite)
  .run();
