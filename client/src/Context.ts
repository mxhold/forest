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

  addPlayer(playerId: number, entity: Entity<any, Component>) {
    this.#players.set(playerId, entity as Entity<never, Component>);
  }

  removePlayer(playerId: number) {
    const player = this.#players.get(playerId);
    if (player) {
      this.entities.delete(player.entityId);
    }
    this.#players.delete(playerId);
  }

  getPlayer(playerId: number) {
    return this.#players.get(playerId);
  }

  setupWebSocket(ws: WebSocket) {
    this.#webSocket = ws;
  }

  send(message: WebSocketClientMessage) {
    if (!this.#webSocket) {
      throw new Error("No WebSocket");
    }
    this.#webSocket.send(JSON.stringify(message));
  }
}
