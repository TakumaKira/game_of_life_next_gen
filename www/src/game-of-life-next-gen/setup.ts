import { FPS, getUniverse } from "@/game-of-life-next-gen/game-of-life";
import { onClickCanvas, nextFrameImpl, togglePlayPauseImpl } from "@/game-of-life-next-gen/user-event-handler";
import { setupGLRenderer } from "@/game-of-life-next-gen/gl-renderer";
import type { OnTextureHoverPosition, OnHoverTextureContextFn } from "@/game-of-life-next-gen/gl-renderer";
import type { OnUpdateFpsDataFn } from "@/game-of-life-next-gen/game-of-life";
import { AnimationState, type OnUpdatePlayingStateFn } from "./anim-controller";
import type { UniverseConfig } from "./types";
import { type TextureColors, type TextureColorsNullable, drawCells, drawGrid } from "./drawer";
import { DEFAULT_ALIVE_CELL_BASE, DEFAULT_FIELD_SIZE, DEFAULT_LIFESPAN, DEFAULT_SPEED, TEXTURE_COLORS_DEFAULT, getCellSize } from "./constants";
import type { GLValuesConfigurable } from "./gl-renderer/setupGLRenderer";

export default function setup(canvas: HTMLCanvasElement, updatePlayingState: OnUpdatePlayingStateFn, updateFpsData: OnUpdateFpsDataFn, memory: WebAssembly.Memory, universeConfig?: UniverseConfig): { togglePlayPause: () => void, animationState: AnimationState, nextFrame: (showLog?: boolean) => void, onClickCanvasFnRef: () => void, resetCamera: () => void, updateColors: (value: TextureColorsNullable) => void, updateEffects: (value: Partial<GLValuesConfigurable>) => void, destroy: () => void } {
  const fieldSize = universeConfig?.fieldSize || DEFAULT_FIELD_SIZE;
  const lifespan = universeConfig?.lifespan || DEFAULT_LIFESPAN;
  const speed = universeConfig?.speed || DEFAULT_SPEED;
  const aliveCellBase = universeConfig?.aliveCellBase || DEFAULT_ALIVE_CELL_BASE;
  const cellSize = getCellSize(fieldSize);

  const { universe, width, height, lifespan: _ } = getUniverse(fieldSize, lifespan, aliveCellBase);

  let onTextureHoverPosition: OnTextureHoverPosition = null
  const onHoverTextureContext: OnHoverTextureContextFn = hoverPos => {
    onTextureHoverPosition = hoverPos
  }

  const { updateTextureContext, updateEffects, resetCamera, dispose } = setupGLRenderer(canvas, onHoverTextureContext);

  const textureColors: TextureColors = TEXTURE_COLORS_DEFAULT

  const updateUniverse = () => {
    drawGrid(updateTextureContext, textureColors, width, height, cellSize);
    drawCells(universe, memory, updateTextureContext, textureColors, width, height, lifespan, cellSize);  
  }

  const updateColors = (value: TextureColorsNullable) => {
    if (value.gridColor !== undefined) {
      textureColors.gridColor = value.gridColor
    }
    if (value.deadColor !== undefined) {
      textureColors.deadColor = value.deadColor
    }
    if (value.aliveColors !== undefined) {
      if (value.aliveColors[0] !== undefined) {
        textureColors.aliveColors[0] = value.aliveColors[0]
      }
      if (value.aliveColors[1] !== undefined) {
        textureColors.aliveColors[1] = value.aliveColors[1]
      }
      if (value.aliveColors[2] !== undefined) {
        textureColors.aliveColors[2] = value.aliveColors[2]
      }
    }
    if (animationState.isPlaying) {
      return
    }
    updateUniverse()
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

  return { togglePlayPause, animationState, nextFrame, onClickCanvasFnRef, resetCamera, updateColors, updateEffects, destroy }
}
