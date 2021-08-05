import Context from "../Context";
import { WebSocketServerMessage } from "../../../common/types";
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
          tag: "mapCoordinates",
          mapCoordinates: {
            type: "MapCoordinates",
            x,
            y,
          },
        })
        .add({ tag: "spriteParams", spriteParams: message.spriteParams });

      if (message.isMe) {
        entity.add({ tag: "keyboardControlled" });
      }

      ctx.addPlayer(message.playerId, entity);
    } else if (message.tag === "move") {
      const player = ctx.getPlayer(message.playerId);

      if (player) {
        Player.move(
          player,
          message.coordinates,
          message.orientation,
          ctx.frame
        );
      } else {
        console.warn("missing player", message.playerId);
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
