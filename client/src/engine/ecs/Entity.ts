type FindByTag<Union, Tag> = Union extends { tag: Tag } ? Union : never;

interface IComponent {
  tag: string;
}

class Entity<Component extends IComponent> {
  id: number;
  components: Map<Component["tag"], Component> = new Map();

  constructor(id: number) {
    this.id = id;
  }

  add(component: Component): this {
    this.components.set(component.tag, component);
    return this;
  }

  has(tag: Component["tag"], ...otherTags: Component["tag"][]): boolean {
    const tags = [tag, ...otherTags];
    return tags.filter((t) => this.components.has(t)).length === tags.length;
  }

  get<Tag extends Component["tag"]>(
    componentTag: Tag
  ): FindByTag<Component, Tag> {
    if (!this.components.has(componentTag)) {
      throw new Error(`Entity: no component with tag ${componentTag}`);
    }
    return this.components.get(componentTag) as FindByTag<Component, Tag>;
  }
}

export class EntityCollection<Component extends IComponent> {
  nextId: number = 1;
  entities: Entity<Component>[] = [];

  create() {
    const entity = new Entity<Component>(this.nextId++);
    this.entities.push(entity);
    return entity;
  }

  find(tag: Component["tag"], ...tags: Component["tag"][]) {
    return this.entities.filter((e) => e.has(tag, ...tags));
  }
}
