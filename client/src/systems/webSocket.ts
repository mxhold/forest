import Context from "../Context";
import { WebSocketMessage } from "../../../common/types";
import { CANVAS } from "../config";
import { Player } from "../assemblages";

export default function webSocket(ctx: Context) {
  const webSocket = new WebSocket(`ws://${location.host}`);

  webSocket.onmessage = ({ data }) => {
    const message = JSON.parse(data) as WebSocketMessage;

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

      ctx.addPlayer(message.id, entity);
    }
  };
}
