import type { Universe } from "wasm-game-of-life/wasm_game_of_life_bg.js"
import drawCells from "./drawCells";
import drawGrid from "./drawGrid";
import FPS from "./FPS";

export function play(playPauseButton: HTMLButtonElement, fps: FPS, universe: Universe, memory: WebAssembly.Memory, context: CanvasRenderingContext2D, width: number, height: number, updateAnimId: (id: number | null) => void): void {
  playPauseButton.textContent = "⏸";
  renderLoop(fps, universe, memory, context, width, height, updateAnimId);
};

export function pause(playPauseButton: HTMLButtonElement, getCurrentAnimationId: () => number | null, updateAnimId: (id: number | null) => void): void {
  playPauseButton.textContent = "▶";
  const animationId = getCurrentAnimationId();
  if (animationId !== null) {
    cancelAnimationFrame(animationId);
  }
  updateAnimId(null);
};

export function isPaused(animationId: number | null): boolean {
  return animationId === null;
};

function renderLoop(fps: FPS, universe: Universe, memory: WebAssembly.Memory, context: CanvasRenderingContext2D, width: number, height: number, updateAnimId: (id: number | null) => void): void {
  console.log('renderLoop')
  fps.render();

  drawGrid(context, width, height);
  drawCells(universe, memory, context, width, height);

  for (let i = 0; i < 9; i++) {
    universe.tick(false);
  }

  updateAnimId(requestAnimationFrame(() => renderLoop(fps, universe, memory, context, width, height, updateAnimId)));
};
