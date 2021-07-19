import { Canvas } from "..";

interface Resource {
  canvas: Canvas;
}

interface Resource {
  turn: number;
}

export default class World {
  resources: Map<keyof Resource, Resource[keyof Resource]> = new Map();

  addResource(name: keyof Resource, resource: Resource[keyof Resource]) {
    this.resources.set(name, resource);
  }

  getResource<Name extends keyof Resource>(name: Name): Resource[Name] {
    if (!this.resources.has(name)) {
      throw new Error(`World: no resource with name ${name}`);
    }
    return this.resources.get(name) as Resource[Name];
  }
}
