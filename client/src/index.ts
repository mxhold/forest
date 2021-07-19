import { App } from "./engine";
import { Resources } from "./World";
import drawCircle from "./systems/drawCircle";
import drawRectangle from "./systems/drawRectangle";
import startup from "./systems/startup";

App.build<Resources>()
  .addStartupSystem(startup)
  .addSystem(drawRectangle)
  .addSystem(drawCircle)
  .run();
