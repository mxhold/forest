export type FindByTag<Union, Tag> = Union extends { tag: Tag } ? Union : never;
type KeysOfUnion<T> = T extends T ? keyof T : never;

interface IComponent {
  tag: string;
}

export class Entity<
  Component extends IComponent,
  AllComponents extends IComponent
> {
  entityId: number;
  components: Map<Component["tag"], Component> = new Map();

  constructor(entityId: number) {
    this.entityId = entityId;
  }

  add<C extends AllComponents>(
    component: C
  ): Entity<C | Component, AllComponents> {
    const entity = this as Entity<C | Component, AllComponents>;
    entity.components.set(component.tag, component);
    return entity;
  }

  delete<Tag extends Component["tag"]>(tag: Tag) {
    this.components.delete(tag);
  }

  has<Tag extends AllComponents["tag"]>(...tags: Tag[]): boolean {
    return tags.filter((t) => this.components.has(t)).length === tags.length;
  }

  ifHas<Tag extends AllComponents["tag"]>(
    tag: Tag,
    cb: (
      e: Entity<FindByTag<AllComponents, Tag> | Component, AllComponents>
    ) => void
  ) {
    if (this.has(tag)) {
      const e = this as Entity<
        FindByTag<AllComponents, Tag> | Component,
        AllComponents
      >;
      cb(e);
    }
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
    return this.#get(componentTag)[componentTag];
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
  nextEntityId: number = 1;
  entities: Entity<Component, Component>[] = [];

  create() {
    const entity = new Entity<Component, Component>(this.nextEntityId++);
    this.entities.push(entity);
    return entity;
  }

  find<Tag extends Component["tag"]>(
    ...tags: Tag[]
  ): Entity<FindByTag<Component, Tag>, Component>[] {
    return this.entities.filter((e) => e.has(...tags)) as Entity<
      FindByTag<Component, Tag>,
      Component
    >[];
  }

  delete(entityId: number) {
    this.entities = this.entities.filter((e) => {
      return e.entityId !== entityId;
    });
  }
}
