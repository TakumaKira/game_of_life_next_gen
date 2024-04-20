export default function getIndex(row: number, column: number, width: number): number {
  return row * width + column;
}
