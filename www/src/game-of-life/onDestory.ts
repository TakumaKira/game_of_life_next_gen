export default function onDestory(onClickCanvasFnRef: () => void, canvas: HTMLCanvasElement, getCurrentAnimId: () => number | null, dispose: () => void): { isDestroyed: boolean } {
  canvas.removeEventListener("click", onClickCanvasFnRef)
  const animationId = getCurrentAnimId()
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  dispose()
  return { isDestroyed: true }
}
