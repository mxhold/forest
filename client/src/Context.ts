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
  players: Map<number, Entity<never, Component>> = new Map();
  webSocket?: WebSocket;

  addPlayer(id: number, entity: Entity<any, Component>) {
    this.players.set(id, entity as Entity<never, Component>);
  }

  send(message: WebSocketClientMessage) {
    this.webSocket?.send(JSON.stringify(message));
  }
}
