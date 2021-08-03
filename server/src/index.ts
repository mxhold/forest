import express, { Response } from "express";
import { join } from "path";
import { createServer } from "http";
import WebSocket from "ws";
import { WebSocketMessage } from "../../common/types";

const app = express();

const setHeaders = (response: Response<any>) => {
  // Set headers to enable more timing precision
  // See: https://developer.mozilla.org/en-US/docs/Web/API/Performance/now#Reduced_time_precision
  response.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  response.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
};

const staticRoot = join(__dirname, "../../client/");
app.use(express.static(staticRoot, { setHeaders }));

const server = createServer(app);

const webSocketServer = new WebSocket.Server({ server });

function sendMessage(ws: WebSocket, message: WebSocketMessage) {
  ws.send(JSON.stringify(message));
}

function randomCoordinates() {
  const x = Math.floor(Math.random() * 20);
  const y = Math.floor(Math.random() * 15);

  return { x, y };
}

const map: Map<WebSocket, { x: number; y: number }> = new Map();

webSocketServer.on("connection", (player) => {
  const coordinates = randomCoordinates();
  for (const coordinates of map.values()) {
    sendMessage(player, { tag: "setup", coordinates, isMe: false });
  }

  map.set(player, coordinates);

  for (const allPlayer of map.keys()) {
    sendMessage(allPlayer, {
      tag: "setup",
      coordinates,
      isMe: allPlayer === player,
    });
  }

  player.on("close", () => {
    map.delete(player);
  });
});

server.listen(8080, () => {
  console.log("Listening on http://localhost:8080");
});
