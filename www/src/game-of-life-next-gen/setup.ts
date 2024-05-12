import { FPS, getUniverse } from "@/game-of-life-next-gen/game-of-life";
import { onClickCanvas, onClickNextFrameButton, onClickPlayPauseButton } from "@/game-of-life-next-gen/user-event-handler";
import { setupGLRenderer } from "@/game-of-life-next-gen/gl-renderer";
import type { OnTextureHoverPosition, OnHoverTextureContextFn } from "@/game-of-life-next-gen/gl-renderer";
import type { OnUpdateFpsDataFn } from "@/game-of-life-next-gen/game-of-life";
import { AnimationState, type OnUpdatePlayingStateFn } from "./anim-controller";

export default function setup(canvas: HTMLCanvasElement, updatePlayingState: OnUpdatePlayingStateFn, updateFpsData: OnUpdateFpsDataFn, memory: WebAssembly.Memory): { onTogglePlayPause: () => void, animationState: AnimationState, onNextFrame: () => void, onClickCanvasFnRef: () => void, onToggleGUIControlsVisibility: () => void, destroy: () => void } {
  const { universe, width, height, lifeSpan } = getUniverse();

  let onTextureHoverPosition: OnTextureHoverPosition = null
  const onHoverTextureContext: OnHoverTextureContextFn = hoverPos => {
    onTextureHoverPosition = hoverPos
  }

  const { updateTextureContext, toggleGUIControlsVisibility, dispose } = setupGLRenderer(canvas, onHoverTextureContext);

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

  return { onTogglePlayPause, animationState, onNextFrame, onClickCanvasFnRef, onToggleGUIControlsVisibility: toggleGUIControlsVisibility, destroy }
}
