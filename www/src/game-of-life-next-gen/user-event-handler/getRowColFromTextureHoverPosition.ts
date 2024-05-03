import type { OnTextureHoverPosition } from "@/game-of-life-next-gen/gl-renderer";
import { FIELD_SIZE, TEXTURE_SIZE } from "@/game-of-life-next-gen/constants";

/**
 * Convert texture hover position(center is (x,z)=(0,0)) to row and column index(0,1,...,FIELD_SIZE-1).
 */
export default function getRowColFromTextureHoverPosition(onTextureHoverPosition: NonNullable<OnTextureHoverPosition>): { row: number, col: number } {
  const row = Math.floor((TEXTURE_SIZE - (onTextureHoverPosition.z + TEXTURE_SIZE / 2)) / TEXTURE_SIZE * FIELD_SIZE);
  const col = Math.floor((onTextureHoverPosition.x + TEXTURE_SIZE / 2) / TEXTURE_SIZE * FIELD_SIZE);
  return { row, col };
}
