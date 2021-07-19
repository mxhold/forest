import { World } from "..";

type System = (world: World) => void;

class AppBuilder {
  app: App;

  constructor() {
    this.app = new App();
  }

  addStartupSystem(system: System) {
    this.app.startupSystems.push(system);
    return this;
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
  startupSystems: System[] = [];
  world: World = new World();

  static build() {
    return new AppBuilder();
  }

  executeSystems() {
    for (const system of this.startupSystems) {
      system(this.world);
    }

    for (const system of this.systems) {
      system(this.world);
    }
  }
}
