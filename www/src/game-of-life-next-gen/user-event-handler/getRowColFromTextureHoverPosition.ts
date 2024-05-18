import type { OnTextureHoverPosition } from "@/game-of-life-next-gen/gl-renderer";
import { DEFAULT_FIELD_SIZE, TEXTURE_SIZE } from "@/game-of-life-next-gen/constants";

/**
 * Convert texture hover position(center is (x,z)=(0,0)) to row and column index(0,1,...,FIELD_SIZE-1).
 */
export default function getRowColFromTextureHoverPosition(onTextureHoverPosition: NonNullable<OnTextureHoverPosition>, fieldSize: number): { row: number, col: number } {
  const row = Math.floor((TEXTURE_SIZE - (onTextureHoverPosition.z + TEXTURE_SIZE / 2)) / TEXTURE_SIZE * fieldSize);
  const col = Math.floor((onTextureHoverPosition.x + TEXTURE_SIZE / 2) / TEXTURE_SIZE * fieldSize);
  return { row, col };
}
