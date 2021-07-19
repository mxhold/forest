import { App, Canvas } from "./engine";
import drawCircle from "./systems/drawCircle";
import drawRectangle from "./systems/drawRectangle";
import startup from "./systems/startup";

App.build()
  .addStartupSystem(startup)
  .addSystem(drawRectangle)
  .addSystem(drawCircle)
  .run();
