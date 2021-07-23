import Context from "../Context";

export default function handleKeydown(ctx: Context) {
  document.addEventListener("keydown", (event) => {
    if (ctx.walkStage === "stop") {
      ctx.keydownEvents = [event.code];
    }
  });
}
