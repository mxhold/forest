import { Sprite } from "./engine";
import { Direction } from "./types";

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
      tag: "sprite";
      sprite: Sprite;
    }
  | {
      tag: "keyboard_controlled";
    };
