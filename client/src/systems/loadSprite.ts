import Context from "../Context";
import { Sprite } from "../engine";

export default function loadSprite(ctx: Context) {
  for (const entity of ctx.entities.find("spriteConfig")) {
    Sprite.load(entity.fetch("spriteConfig"))
      .then((sprite) => {
        entity.add({
          tag: "sprite",
          sprite,
        });
      })
      .then(() => {
        entity.delete("spriteConfig");
      });
  }
}
