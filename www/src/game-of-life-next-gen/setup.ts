import { FPS, getUniverse } from "@/game-of-life-next-gen/game-of-life";
import { onClickCanvas, nextFrameImpl, togglePlayPauseImpl } from "@/game-of-life-next-gen/user-event-handler";
import { setupGLRenderer } from "@/game-of-life-next-gen/gl-renderer";
import type { OnTextureHoverPosition, OnHoverTextureContextFn } from "@/game-of-life-next-gen/gl-renderer";
import type { OnUpdateFpsDataFn } from "@/game-of-life-next-gen/game-of-life";
import { AnimationState, type OnUpdatePlayingStateFn } from "./anim-controller";
import type { UniverseConfig } from "./types";
import { drawCells, drawGrid } from "./drawer";
import { DEFAULT_ALIVE_CELL_BASE, DEFAULT_FIELD_SIZE, DEFAULT_LIFE_SPAN, DEFAULT_SPEED, getCellSize } from "./constants";

export default function setup(canvas: HTMLCanvasElement, updatePlayingState: OnUpdatePlayingStateFn, updateFpsData: OnUpdateFpsDataFn, memory: WebAssembly.Memory, universeConfig?: UniverseConfig): { togglePlayPause: () => void, animationState: AnimationState, nextFrame: (showLog?: boolean) => void, onClickCanvasFnRef: () => void, toggleGUIControlsVisibility: () => void, destroy: () => void } {
  const fieldSize = universeConfig?.fieldSize || DEFAULT_FIELD_SIZE;
  const lifeSpan = universeConfig?.lifeSpan || DEFAULT_LIFE_SPAN;
  const speed = universeConfig?.speed || DEFAULT_SPEED;
  const aliveCellBase = universeConfig?.aliveCellBase || DEFAULT_ALIVE_CELL_BASE;
  const cellSize = getCellSize(fieldSize);

  const { universe, width, height, lifeSpan: _ } = getUniverse(fieldSize, lifeSpan, aliveCellBase);

  let onTextureHoverPosition: OnTextureHoverPosition = null
  const onHoverTextureContext: OnHoverTextureContextFn = hoverPos => {
    onTextureHoverPosition = hoverPos
  }

  const { updateTextureContext, toggleGUIControlsVisibility, dispose } = setupGLRenderer(canvas, onHoverTextureContext);

  const updateUniverse = () => {
    drawGrid(updateTextureContext, width, height, cellSize);
    drawCells(universe, memory, updateTextureContext, width, height, lifeSpan, cellSize);  
  }

  const animationState = new AnimationState();
  animationState.registerOnUpdatePlayingState(updatePlayingState);
  const togglePlayPause = () => {
    togglePlayPauseImpl(fps, universe, updateUniverse, animationState, speed)
  }

  const fps = new FPS(updateFpsData);

  const nextFrame = (showLog?: boolean) => nextFrameImpl(universe, updateUniverse, showLog)

  const onClickCanvasFnRef = () => onClickCanvas(universe, updateUniverse, onTextureHoverPosition, fieldSize)
  canvas.addEventListener("click", onClickCanvasFnRef);

  const destroy = () => {
    dispose()
    animationState.clear()
  }

  return { togglePlayPause, animationState, nextFrame, onClickCanvasFnRef, toggleGUIControlsVisibility, destroy }
}
