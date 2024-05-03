import { FPS, getUniverse } from "@/game-of-life-next-gen/game-of-life";
import { onClickCanvas, onClickNextFrameButton, onClickPlayPauseButton } from "@/game-of-life-next-gen/user-event-handler";
import { setupGLRenderer } from "@/game-of-life-next-gen/gl-renderer";
import type { OnTextureHoverPositionFn, OnHoverTextureContextFn } from "@/game-of-life-next-gen/gl-renderer";
import type { UpdateFpsDataFn } from "@/game-of-life-next-gen/game-of-life";

export default function setupImpl(canvas: HTMLCanvasElement, updatePlayingState: (isPlaying: boolean) => void, updateFpsData: UpdateFpsDataFn, memory: WebAssembly.Memory, getCurrentAnimId: () => null | number, updateAnimId: (id: number | null) => void): { onTogglePlayPause: () => void, getIsPlaying: () => boolean, onNextFrame: () => void, onClickCanvasFnRef: () => void, dispose: () => void } {
  const { universe, width, height, lifeSpan } = getUniverse();

  let onTextureHoverPosition: OnTextureHoverPositionFn = null
  const onHoverTextureContext: OnHoverTextureContextFn = hoverPos => {
    onTextureHoverPosition = hoverPos
  }

  const { updateTextureContext, dispose } = setupGLRenderer(canvas, onHoverTextureContext);

  const fps = new FPS(updateFpsData);

  const playingState = { isPlaying: false };

  const onTogglePlayPause = () => {
    const result = onClickPlayPauseButton(fps, universe, memory, updateTextureContext, width, height, lifeSpan, getCurrentAnimId, updateAnimId)
    playingState.isPlaying = result.isPlaying
    updatePlayingState(playingState.isPlaying)
  }

  const onNextFrame = () => onClickNextFrameButton(universe, memory, updateTextureContext, width, height, lifeSpan)

  const onClickCanvasFnRef = () => onClickCanvas(universe, memory, updateTextureContext, width, height, lifeSpan, onTextureHoverPosition)
  canvas.addEventListener("click", onClickCanvasFnRef);

  const getIsPlaying = () => playingState.isPlaying

  return { onTogglePlayPause, getIsPlaying, onNextFrame, onClickCanvasFnRef, dispose }
}
