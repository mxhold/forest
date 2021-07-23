import Context from "./Context";
import { App } from "./engine";
import {
  handleKeydown,
  drawPlayer,
  logicalMovement,
  graphicalMovement,
  countFrames,
} from "./systems";

App.build(Context)
  .addStartupSystem(handleKeydown)
  .addSystem(drawPlayer)
  .addSystem(logicalMovement)
  .addSystem(graphicalMovement)
  .addSystem(countFrames)
  .run();
