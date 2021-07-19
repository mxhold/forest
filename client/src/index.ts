import { App } from "./engine";
import drawRectangle from "./systems/drawRectangle";

App.build().addSystem(drawRectangle).run();
