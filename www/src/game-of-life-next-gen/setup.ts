import { FPS, getUniverse } from "@/game-of-life-next-gen/game-of-life";
import { onClickCanvas, onClickNextFrameButton, onClickPlayPauseButton } from "@/game-of-life-next-gen/user-event-handler";
import { setupGLRenderer } from "@/game-of-life-next-gen/gl-renderer";
import type { OnTextureHoverPosition, OnHoverTextureContextFn } from "@/game-of-life-next-gen/gl-renderer";
import type { UpdateFpsDataFn } from "@/game-of-life-next-gen/game-of-life";
import { AnimationState } from "./anim-controller";

export default function setup(canvas: HTMLCanvasElement, updatePlayingState: (isPlaying: boolean) => void, updateFpsData: UpdateFpsDataFn, memory: WebAssembly.Memory): { onTogglePlayPause: () => void, animationState: AnimationState, onNextFrame: () => void, onClickCanvasFnRef: () => void, destroy: () => void } {
  const { universe, width, height, lifeSpan } = getUniverse();

  let onTextureHoverPosition: OnTextureHoverPosition = null
  const onHoverTextureContext: OnHoverTextureContextFn = hoverPos => {
    onTextureHoverPosition = hoverPos
  }

  const { updateTextureContext, dispose } = setupGLRenderer(canvas, onHoverTextureContext);

  const animationState = new AnimationState();
  animationState.registerOnUpdatePlayingState(updatePlayingState);
  const onTogglePlayPause = () => {
    onClickPlayPauseButton(fps, universe, memory, updateTextureContext, width, height, lifeSpan, animationState)
  }

  const fps = new FPS(updateFpsData);

  const onNextFrame = () => onClickNextFrameButton(universe, memory, updateTextureContext, width, height, lifeSpan)

  const onClickCanvasFnRef = () => onClickCanvas(universe, memory, updateTextureContext, width, height, lifeSpan, onTextureHoverPosition)
  canvas.addEventListener("click", onClickCanvasFnRef);

  const destroy = () => {
    dispose()
    animationState.clear()
  }

  return { onTogglePlayPause, animationState, onNextFrame, onClickCanvasFnRef, destroy }
}
