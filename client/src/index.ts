import Context from "./Context";
import { App } from "./engine";
import { handleKeydown, drawRectangle, movement } from "./systems";

App.build(Context)
  .addStartupSystem(handleKeydown)
  .addSystem(drawRectangle)
  .addSystem(movement)
  .run();
