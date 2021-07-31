import { Sprite } from "./engine";
import { AttackStage, Direction, WalkStage } from "./types";

export type Component =
  | {
      tag: "orientation";
      orientation: Direction;
    }
  | {
      tag: "position";
      position: {
        x: number;
        y: number;
      };
    }
  | {
      tag: "spritePosition";
      spritePosition: {
        x: number;
        y: number;
      };
    }
  | {
      tag: "sprite";
      sprite: Sprite;
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
    };
