import express, { Response } from "express";
import { join } from "path";
import { createServer } from "http";
import WebSocket from "ws";
import { SpriteParams, WebSocketMessage } from "../../common/types";

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
const ids: Map<WebSocket, number> = new Map();

const spriteParams: SpriteParams = {
  name: "player",
  image: "assets/player.png",
  size: { width: 19, height: 38 },
  // ["n", "s", "e", "w"].flatMap((d) =>
  //   ["step1", "stand", "step2", "attack1", "attack2", "attack3"].map(
  //     (f) => `${d}_${f}`
  //   )
  // )
  frames: [
    "n_step1",
    "n_stand",
    "n_step2",
    "n_attack1",
    "n_attack2",
    "n_attack3",
    "s_step1",
    "s_stand",
    "s_step2",
    "s_attack1",
    "s_attack2",
    "s_attack3",
    "e_step1",
    "e_stand",
    "e_step2",
    "e_attack1",
    "e_attack2",
    "e_attack3",
    "w_step1",
    "w_stand",
    "w_step2",
    "w_attack1",
    "w_attack2",
    "w_attack3",
  ],
};

let lastId = 0;

webSocketServer.on("connection", (player) => {
  const id = lastId++;
  ids.set(player, id);

  const coordinates = randomCoordinates();
  for (const [otherPlayer, coordinates] of map) {
    sendMessage(player, {
      id: ids.get(otherPlayer)!,
      tag: "player",
      spriteParams,
      coordinates,
      isMe: false,
    });
  }

  map.set(player, coordinates);

  for (const allPlayer of map.keys()) {
    sendMessage(allPlayer, {
      id,
      tag: "player",
      spriteParams,
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
