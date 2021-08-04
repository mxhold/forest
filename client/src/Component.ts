import { Direction, Position, SpriteParams } from "../../common/types";
import { Sprite } from "./engine";
import { AttackStage, WalkStage } from "./types";

export type Component =
  | {
      tag: "orientation";
      orientation: Direction;
    }
  | {
      tag: "position";
      position: Position;
    }
  | {
      tag: "spritePosition";
      spritePosition: Position;
    }
  | {
      tag: "sprite";
      sprite: Sprite;
    }
  | {
      tag: "spriteParams";
      spriteParams: SpriteParams;
    }
  | {
      tag: "keyboardControlled";
    }
  | { tag: "wandering" }
  | {
      tag: "walkStage";
      walkStage: WalkStage;
    }
  | {
      tag: "attackStage";
      attackStage: AttackStage;
    }
  | {
      tag: "movementIntent";
      movementIntent: Direction;
    }
  | {
      tag: "collide";
    }
  | {
      tag: "id";
      id: number;
    };
