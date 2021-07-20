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
    this.app.executeSystems();
  }
}

export default class App<Context> {
  systems: System<Context>[] = [];
  startupSystems: System<Context>[] = [];
  context: Context;

  static build<C>(contextClass: { new (): C }) {
    return new AppBuilder(contextClass);
  }

  constructor(contextClass: { new (): Context }) {
    this.context = new contextClass();
  }

  executeSystems() {
    for (const system of this.startupSystems) {
      system(this.context);
    }

    for (const system of this.systems) {
      system(this.context);
    }
  }
}
