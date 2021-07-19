import { World } from "..";

type System<Resources> = (world: World<Resources>) => void;

class AppBuilder<Resources> {
  app: App<Resources>;

  constructor() {
    this.app = new App();
  }

  addStartupSystem(system: System<Resources>) {
    this.app.startupSystems.push(system);
    return this;
  }

  addSystem(system: System<Resources>) {
    this.app.systems.push(system);
    return this;
  }

  run() {
    this.app.executeSystems();
  }
}

export default class App<Resources> {
  systems: System<Resources>[] = [];
  startupSystems: System<Resources>[] = [];
  world: World<Resources> = new World();

  static build<Resources>() {
    return new AppBuilder<Resources>();
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
