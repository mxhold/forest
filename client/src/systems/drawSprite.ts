import { Position, Direction, SpriteFrame } from "../../../common/types";
import Context from "../Context";
import { Sprite } from "../engine";

export default function drawSprite(ctx: Context) {
  ctx.foregroundCanvas.clear();

  let sprites: [Sprite, Position, Direction, SpriteFrame][] = [];

  for (let entity of ctx.entities.find(
    "sprite",
    "spritePosition",
    "orientation"
  )) {
    let spriteFrame: SpriteFrame = "stand";

    entity.ifHas("attackStage", (e) => {
      const attackStage = e.fetch("attackStage");
      if (attackStage === "attack1") {
        spriteFrame = "attack1";
      } else if (attackStage === "attack2") {
        spriteFrame = "attack2";
      } else if (attackStage === "attack3") {
        spriteFrame = "attack3";
      }
    });

    entity.ifHas("walkAnimation", (e) => {
      const walkStage = e.fetch("walkAnimation").walkStage;
      if (walkStage === "step1") {
        spriteFrame = "step1";
      } else if (walkStage === "step2") {
        spriteFrame = "step2";
      }
    });

    sprites.push([
      entity.fetch("sprite"),
      entity.fetch("spritePosition"),
      entity.fetch("orientation"),
      spriteFrame,
    ]);
  }

  sprites.sort(
    (
      [spriteA, positionA, _orientationA, _spriteFrameA],
      [spriteB, positionB, _orientationB, _spriteFrameB]
    ) => {
      return positionA.y + spriteA.height - (positionB.y + spriteB.height);
    }
  );

  for (const [sprite, spritePosition, orientation, spriteFrame] of sprites) {
    ctx.foregroundCanvas.drawSprite(
      sprite,
      spritePosition,
      orientation,
      spriteFrame
    );
  }
}
