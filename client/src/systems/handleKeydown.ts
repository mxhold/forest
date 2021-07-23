import { KEYBOARD } from "../config";
import Context from "../Context";

export default function handleKeydown(ctx: Context) {
  let lastPressAt = 0;

  document.addEventListener("keydown", (event) => {
    // if (performance.now() - lastPressAt < KEYBOARD.delayMs) {
    //   return;
    // }
    // lastPressAt = performance.now();
    if (ctx.walkStage === "stop") {
      ctx.keydownEvents = [event.code];
    }
  });
}
