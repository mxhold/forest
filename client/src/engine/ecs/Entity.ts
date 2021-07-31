type FindByTag<Union, Tag> = Union extends { tag: Tag } ? Union : never;
type KeysOfUnion<T> = T extends T ? keyof T : never;

interface IComponent {
  tag: string;
}

export class Entity<Component extends IComponent> {
  id: number;
  components: Map<Component["tag"], Component> = new Map();

  constructor(id: number) {
    this.id = id;
  }

  add(component: Component): this {
    this.components.set(component.tag, component);
    return this;
  }

  delete<Tag extends Component["tag"]>(tag: Tag) {
    this.components.delete(tag);
  }

  has(...tags: Component["tag"][]): boolean {
    return tags.filter((t) => this.components.has(t)).length === tags.length;
  }

  #get<Tag extends Component["tag"]>(
    componentTag: Tag
  ): FindByTag<Component, Tag> {
    if (!this.components.has(componentTag)) {
      throw new Error(`Entity: no component with tag ${componentTag}`);
    }
    return this.components.get(componentTag) as FindByTag<Component, Tag>;
  }

  fetch<Tag extends Component["tag"] & KeysOfUnion<Component>>(
    componentTag: Tag
  ): FindByTag<Component, Tag>[Tag] {
    const component = this.#get(componentTag);
    return component[componentTag];
  }

  set<Tag extends Component["tag"] & KeysOfUnion<Component>>(
    componentTag: Tag,
    value: FindByTag<Component, Tag>[Tag]
  ) {
    const component = this.#get(componentTag);
    component[componentTag] = value;
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

  find<Tag extends Component["tag"]>(
    ...tags: Tag[]
  ): Entity<FindByTag<Component, Tag>>[] {
    return this.entities.filter((e) => e.has(...tags)) as Entity<
      FindByTag<Component, Tag>
    >[];
  }
}
