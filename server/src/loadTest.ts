import WebSocket from "ws";
import {
  MapCoordinates,
  WebSocketClientMessage,
  WebSocketServerMessage,
} from "../../common/types";

function start() {
  const ws = new WebSocket("ws://localhost:8080");

  const send = (message: WebSocketClientMessage) => {
    ws.send(JSON.stringify(message));
  };

  ws.on("error", (error) => {
    console.error("Error:", error);
  });

  ws.on("close", () => {
    console.log("Close");
  });

  ws.on("open", () => {
    console.log("Open");
  });

  ws.on("message", (data) => {
    const message = JSON.parse(data.toString()) as WebSocketServerMessage;

    if (message.tag === "player" && message.isMe) {
      const coordinates: MapCoordinates = {
        type: "MapCoordinates",
        x: message.coordinates.x + 1,
        y: message.coordinates.y,
      };
      setTimeout(() => {
        send({ tag: "move", coordinates, orientation: "e" });
      }, 2000);
    }
  });
}

for (let i = 0; i < 20; i++) {
  start();
}
