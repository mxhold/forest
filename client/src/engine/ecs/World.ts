import { Canvas } from "..";

export type FindByName<Union, Name> = Union extends { name: Name }
  ? Union
  : never;

type CanvasResource = { name: "canvas"; resource: Canvas };

type Resource = CanvasResource;

export default class World {
  resources: Map<Resource["name"], Resource["resource"]> = new Map();

  addResource(name: Resource["name"], resource: Resource["resource"]) {
    this.resources.set(name, resource);
  }

  getResource<Name extends Resource["name"]>(name: Name): Resource["resource"] {
    if (!this.resources.has(name)) {
      throw new Error(`World: no resource with name ${name}`);
    }
    const resource = this.resources.get(name) as FindByName<Resource["resource"], Name>;
    return resource;
  }
}
