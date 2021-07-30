import Context from "../Context";

export const pullKeydown = (ctx: Context, followedKeys: Set<string>) => {
  const key = ctx.pendingKeydown;
  if (!key) {
    return;
  }

  if (followedKeys.has(key)) {
    ctx.pendingKeydown = null;
    return key;
  }
};

export default function handleKeydown(ctx: Context) {
  document.addEventListener("keydown", (event) => {
    ctx.pendingKeydown = event.code;
  });
}
