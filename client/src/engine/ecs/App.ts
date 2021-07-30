import { ENGINE } from "../../config";

interface IUnloadedContext<LoadedContext> {
  load(): Promise<LoadedContext>;
}

type UnloadedContextClass<
  Context extends IUnloadedContext<LoadedContext>,
  LoadedContext
> = {
  new (): Context;
};

type System<Context> = (ctx: Context) => void;

class AppBuilder<
  UnloadedContext extends IUnloadedContext<LoadedContext>,
  LoadedContext
> {
  app: App<UnloadedContext, LoadedContext>;

  constructor(
    contextClass: UnloadedContextClass<UnloadedContext, LoadedContext>
  ) {
    this.app = new App(contextClass);
  }

  addStartupSystem(system: System<LoadedContext>) {
    this.app.startupSystems.push(system);
    return this;
  }

  addSystem(system: System<LoadedContext>) {
    this.app.systems.push(system);
    return this;
  }

  run() {
    this.app.run();
  }
}

export default class App<
  UnloadedContext extends IUnloadedContext<LoadedContext>,
  LoadedContext
> {
  systems: System<LoadedContext>[] = [];
  startupSystems: System<LoadedContext>[] = [];
  unloadedContext: UnloadedContext;
  loadedContext?: LoadedContext;

  static build<
    UnloadedContext extends IUnloadedContext<LoadedContext>,
    LoadedContext
  >(contextClass: UnloadedContextClass<UnloadedContext, LoadedContext>) {
    return new AppBuilder<UnloadedContext, LoadedContext>(contextClass);
  }

  static startLoop(execute: () => void) {
    const delay = 1000 / ENGINE.framesPerSecond;
    let start: number;
    const loop = (timestamp: number) => {
      if (start === undefined) {
        start = timestamp;
      }
      const elapsed = timestamp - start;
      if (elapsed > delay) {
        start = timestamp;

        execute();
      }

      window.requestAnimationFrame(loop);
    };
    window.requestAnimationFrame(loop);
  }

  constructor(
    contextClass: UnloadedContextClass<UnloadedContext, LoadedContext>
  ) {
    this.unloadedContext = new contextClass();
  }

  async run() {
    try {
      this.loadedContext = await this.unloadedContext.load();
    } catch (e) {
      console.error("Context loading error:", e);
    }

    this.executeStartupSystems();

    App.startLoop(() => {
      this.executeSystems();
    });
  }

  executeStartupSystems() {
    if (!this.loadedContext) {
      throw new Error("Context not loaded");
    }

    for (const system of this.startupSystems) {
      system(this.loadedContext);
    }
  }

  executeSystems() {
    if (!this.loadedContext) {
      throw new Error("Context not loaded");
    }

    for (const system of this.systems) {
      system(this.loadedContext);
    }
  }
}
