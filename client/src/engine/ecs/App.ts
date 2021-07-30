import { GAME } from "../../config";

interface IContext {
  load(): Promise<void>;
}

type ContextClass<Context extends IContext> = {
  new (): Context;
};

type System<Context> = (ctx: Context) => void;

class AppBuilder<Context extends IContext> {
  app: App<Context>;

  constructor(contextClass: ContextClass<Context>) {
    this.app = new App(contextClass);
  }

  addStartupSystem(system: System<Context>) {
    this.app.startupSystems.push(system);
    return this;
  }

  addSystem(system: System<Context>) {
    this.app.systems.push(system);
    return this;
  }

  run() {
    this.app.run();
  }
}

export default class App<Context extends IContext> {
  systems: System<Context>[] = [];
  startupSystems: System<Context>[] = [];
  context: Context;

  static build<Context extends IContext>(contextClass: ContextClass<Context>) {
    return new AppBuilder(contextClass);
  }

  static startLoop(execute: () => void) {
    const delay = 1000 / GAME.framesPerSecond;
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

  constructor(contextClass: ContextClass<Context>) {
    this.context = new contextClass();
  }

  async run() {
    try {
      await this.context.load();
    } catch (e) {
      console.error("Context loading error:", e);
    }

    this.executeStartupSystems();

    App.startLoop(() => {
      this.executeSystems();
    });
  }

  executeStartupSystems() {
    for (const system of this.startupSystems) {
      system(this.context);
    }
  }

  executeSystems() {
    for (const system of this.systems) {
      system(this.context);
    }
  }
}
