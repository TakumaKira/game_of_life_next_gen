import { Color4 } from "babylonjs";
import { Color } from "../types";

export function toColor4(color: Color): Color4 {
  return new Color4(color.r / 255, color.g / 255, color.b / 255, color.a);
}
export function toColor(color4: Color4): Color {
  return {
    r: color4.r * 255,
    g: color4.g * 255,
    b: color4.b * 255,
    a: color4.a * 255,
  };
}