import Context from "./Context";
import { App } from "./engine";
import { handleKeydown, drawPlayer, movement } from "./systems";

App.build(Context)
  .addStartupSystem(handleKeydown)
  .addSystem(drawPlayer)
  .addSystem(movement)
  .run();
