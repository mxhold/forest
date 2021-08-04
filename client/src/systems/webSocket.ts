import Context from "../Context";
import { WebSocketServerMessage } from "../../../common/types";
import { CANVAS } from "../config";
import { Player } from "../assemblages";

export default function webSocket(ctx: Context) {
  const webSocket = new WebSocket(`ws://${location.host}`);

  webSocket.onopen = () => {
    ctx.setupWebSocket(webSocket);
  };

  webSocket.onmessage = ({ data }) => {
    const message = JSON.parse(data) as WebSocketServerMessage;

    if (message.tag === "player") {
      const { x, y } = message.coordinates;

      const entity = Player.build(ctx)
        .add({
          tag: "position",
          position: { x: x * CANVAS.tileWidth, y: y * CANVAS.tileWidth },
        })
        .add({ tag: "spriteParams", spriteParams: message.spriteParams });

      if (message.isMe) {
        entity.add({ tag: "keyboardControlled" });
      }

      ctx.addPlayer(message.playerId, entity);
    } else if (message.tag === "move") {
      const player = ctx.getPlayer(message.playerId);
      const { x, y } = message.coordinates;

      if (player) {
        player.add({
          tag: "position",
          position: { x: x * CANVAS.tileWidth, y: y * CANVAS.tileWidth },
        });
        player.add({
          tag: "orientation",
          orientation: message.orientation,
        });
        // TODO: consolidate with logic from movement system
        player.add({
          tag: "walkAnimation",
          walkAnimation: {
            walkStage: "step1",
            startedAtFrame: ctx.frame,
          },
        });
      } else {
        console.error("missing player");
        // TODO: handle missing player
      }
    } else if (message.tag === "disconnect") {
      const player = ctx.getPlayer(message.playerId);

      if (player) {
        ctx.removePlayer(message.playerId);
      }
    }
  };
}
