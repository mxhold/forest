import {
  Direction,
  MapCoordinates,
  CanvasPosition,
  SpriteParams,
} from "../../common/types";
import { Sprite } from "./engine";
import { AttackStage, WalkStage } from "./types";

export type Component =
  | {
      tag: "orientation";
      orientation: Direction;
    }
  | {
      tag: "mapCoordinates";
      mapCoordinates: MapCoordinates;
    }
  | {
      tag: "spritePosition";
      spritePosition: CanvasPosition;
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
  | {
      tag: "walkAnimation";
      walkAnimation: {
        walkStage: WalkStage;
        startedAtFrame: number;
      };
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
      tag: "playerId";
      playerId: number;
    };
