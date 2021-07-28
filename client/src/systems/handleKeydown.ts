import Context from "../Context";

export default function handleKeydown(ctx: Context) {
  document.addEventListener("keydown", (event) => {
    // TODO: move out
    if (event.code === "Space" && ctx.attackStage === "done") {
      ctx.attackStage = "attack1";
      return;
    }

    if (ctx.walkStage === "stop") {
      ctx.keydownEvents = [event.code];
    }
  });
}
