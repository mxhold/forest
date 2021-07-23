import { GAME } from "../../config";

type System<Context> = (ctx: Context) => void;

class AppBuilder<Context> {
  app: App<Context>;

  constructor(contextClass: { new (): Context }) {
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

export default class App<Context> {
  systems: System<Context>[] = [];
  startupSystems: System<Context>[] = [];
  context: Context;

  static build<C>(contextClass: { new (): C }) {
    return new AppBuilder(contextClass);
  }

  static startLoop(cb: () => void) {
    const delay = 1000 / GAME.framesPerSecond;
    let start: number;
    const loop = (timestamp: number) => {
      if (start === undefined) {
        start = timestamp;
      }
      const elapsed = timestamp - start;
      if (elapsed > delay) {
        start = timestamp;

        cb();
      }

      window.requestAnimationFrame(loop);
    };
    window.requestAnimationFrame(loop);
  }

  constructor(contextClass: { new (): Context }) {
    this.context = new contextClass();
  }

  run() {
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
