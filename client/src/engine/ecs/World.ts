export default class World<Resources> {
  resources: Map<keyof Resources, Resources[keyof Resources]> = new Map();

  addResource(name: keyof Resources, resource: Resources[keyof Resources]) {
    this.resources.set(name, resource);
  }

  getResource<Name extends keyof Resources>(name: Name): Resources[Name] {
    if (!this.resources.has(name)) {
      throw new Error(`World: no resource with name ${name}`);
    }
    return this.resources.get(name) as Resources[Name];
  }
}
