export default function drawGrid(context: CanvasRenderingContext2D, gridColor: string, width: number, height: number, cellSize: number): void {
  context.beginPath();
  context.strokeStyle = gridColor;

  // Vertical lines.
  for (let i = 0; i <= width; i++) {
    context.moveTo(i * (cellSize + 1) + 1, 0);
    context.lineTo(i * (cellSize + 1) + 1, (cellSize + 1) * height + 1);
  }

  // Horizontal lines.
  for (let j = 0; j <= height; j++) {
    context.moveTo(0,                           j * (cellSize + 1) + 1);
    context.lineTo((cellSize + 1) * width + 1, j * (cellSize + 1) + 1);
  }

  context.stroke();
}
