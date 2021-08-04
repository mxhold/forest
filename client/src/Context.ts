import { WebSocketClientMessage } from "../../common/types";
import { Component } from "./Component";
import { CANVAS } from "./config";
import { Canvas, Entity, EntityCollection, Sprite } from "./engine";

export default class Context {
  entities: EntityCollection<Component> = new EntityCollection();
  frame: number = 1;
  foregroundCanvas: Canvas = new Canvas({
    id: "foreground-canvas",
    alpha: true,
    ...CANVAS.size,
  });
  backgroundCanvas: Canvas = new Canvas({
    id: "background-canvas",
    alpha: false,
    ...CANVAS.size,
  });
  pendingKeydown: KeyboardEvent["code"] | null = null;
  sprites: Map<string, Sprite> = new Map();
  #players: Map<number, Entity<never, Component>> = new Map();
  #webSocket?: WebSocket;

  addPlayer(id: number, entity: Entity<any, Component>) {
    this.#players.set(id, entity as Entity<never, Component>);
  }

  removePlayer(id: number) {
    const player = this.#players.get(id);
    if (player) {
      this.entities.delete(player.id);
    }
    this.#players.delete(id);
  }

  getPlayer(id: number) {
    return this.#players.get(id);
  }

  send(message: WebSocketClientMessage) {
    if (!this.#webSocket) {
      throw new Error("No WebSocket");
    }
    this.#webSocket.send(JSON.stringify(message));
  }
}
