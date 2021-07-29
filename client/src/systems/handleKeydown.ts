import Context from "../Context";

export const shiftKeydownEvents = (ctx: Context, followedKeys: Set<string>) => {
  const keydownEvents = ctx.keydownEvents;

  const index = keydownEvents.findIndex((e) => followedKeys.has(e));

  if (index === -1) {
    return null;
  }

  ctx.keydownEvents = keydownEvents.filter((_, i) => i !== index);

  return keydownEvents[index];
};

export default function handleKeydown(ctx: Context) {
  document.addEventListener("keydown", (event) => {
    ctx.keydownEvents.push(event.code);
  });
}
