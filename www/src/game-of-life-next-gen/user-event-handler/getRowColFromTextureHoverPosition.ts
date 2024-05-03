import type { OnTextureHoverPosition } from "@/game-of-life-next-gen/gl-renderer";
import { FIELD_SIZE } from "@/game-of-life-next-gen/constants";

export default function getRowColFromTextureHoverPosition(onTextureHoverPosition: NonNullable<OnTextureHoverPosition>): { row: number, col: number } {
  const row = Math.floor((20 - (onTextureHoverPosition.z + 10)) / 20 * FIELD_SIZE);
  const col = Math.floor((onTextureHoverPosition.x + 10) / 20 * FIELD_SIZE);
  return { row, col };
}
