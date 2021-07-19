type System = () => void;

class AppBuilder {
  app: App;

  constructor() {
    this.app = new App();
  }

  addSystem(system: System) {
    this.app.systems.push(system);
    return this;
  }

  run() {
    this.app.executeSystems();
  }
}

export default class App {
  systems: System[] = [];

  static build() {
    return new AppBuilder();
  }

  executeSystems() {
    for (const system of this.systems) {
      system();
    }
  }
}
