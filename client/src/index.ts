import Context from "./Context";
import { App } from "./engine";
import { handleKeydown, drawPlayer, movement, countFrames } from "./systems";

App.build(Context)
  .addStartupSystem(handleKeydown)
  .addSystem(drawPlayer)
  .addSystem(movement)
  .addSystem(countFrames)
  .run();
