import FPS from "@/game-of-life/FPS";
import getUniverse from "@/game-of-life/getUniverse";
import onClickPlayPauseButton from "@/game-of-life/onClickPlayPauseButton";
import onClickNextFrameButton from "@/game-of-life/onClickNextFrameButton";
import onClickCanvas from "@/game-of-life/onClickCanvas";
import setupBabylon from "@/game-of-life/setupBabylon";
import type { OnTextureHoverPosition, OnHoverTextureContextFn } from "@/game-of-life/setupBabylon";

export default function setupImpl(canvas: HTMLCanvasElement, updatePlayingState: (isPlaying: boolean) => void, updateFpsData: (fpsData: { fps: number, mean: number, min: number, max: number }) => void, memory: WebAssembly.Memory, getCurrentAnimId: () => null | number, updateAnimId: (id: number | null) => void): { onTogglePlayPause: () => void, getIsPlaying: () => boolean, onNextFrame: () => void, onClickCanvasFnRef: () => void, dispose: () => void } {
  const { universe, width, height, lifeSpan } = getUniverse();

  let onTextureHoverPosition: OnTextureHoverPosition = null
  const onHoverTextureContext: OnHoverTextureContextFn = hoverPos => {
    onTextureHoverPosition = hoverPos
  }

  const { updateTextureContext, dispose } = setupBabylon(canvas, onHoverTextureContext);

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
