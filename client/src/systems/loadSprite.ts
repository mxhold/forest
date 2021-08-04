import Context from "../Context";
import { Sprite } from "../engine";

export default function loadSprite(ctx: Context) {
  for (const entity of ctx.entities.find("spriteParams")) {
    const spriteParams = entity.fetch("spriteParams");
    let sprite = ctx.sprites.get(spriteParams.name);

    if (sprite) {
      entity.add({ tag: "sprite", sprite }).delete("spriteParams");
    } else {
      Sprite.load(spriteParams).then((sprite) => {
        ctx.sprites.set(spriteParams.name, sprite);
        entity.add({ tag: "sprite", sprite }).delete("spriteParams");
      });
    }
  }
}
