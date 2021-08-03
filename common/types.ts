export type WebSocketMessage = {
  tag: "setup";
  coordinates: {
    x: number;
    y: number;
  };
  isMe: boolean;
};
