import Context from "./Context";
import { App } from "./engine";
import drawCircle from "./systems/drawCircle";
import drawRectangle from "./systems/drawRectangle";

App.build(Context).addSystem(drawRectangle).addSystem(drawCircle).run();
