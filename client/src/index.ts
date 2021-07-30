import LoadedContext, { UnloadedContext } from "./Context";
import { App } from "./engine";
import {
  handleKeydown,
  drawPlayer,
  keyboardMovement,
  walkAnimation,
  countFrames,
  attack,
  playerSetup,
} from "./systems";

App.build<UnloadedContext, LoadedContext>(UnloadedContext)
  .addStartupSystem(playerSetup)
  .addStartupSystem(handleKeydown)
  .addSystem(drawPlayer)
  .addSystem(keyboardMovement)
  .addSystem(walkAnimation)
  .addSystem(attack)
  .addSystem(countFrames)
  .run();
