export default function getIndex(row: number, column: number, width: number): number {
  if (row < 0) {
    throw new Error(`row ${row} is out of bounds`);
  }
  if (column < 0) {
    throw new Error(`column ${column} is out of bounds`);
  }
  if (width <= 0) {
    throw new Error(`width ${width} is out of bounds`);
  }
  if (column >= width) {
    throw new Error(`column ${column} is out of bounds`);
  }
  return row * width + column;
}
