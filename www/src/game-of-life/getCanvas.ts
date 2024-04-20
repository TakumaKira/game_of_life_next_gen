export default function getCanvas(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
  const context = canvas.getContext('2d');
  if (context === null) {
    throw new Error("canvas 2d context not found")
  }
  return context
}
