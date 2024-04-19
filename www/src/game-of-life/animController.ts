import * as bg from "wasm-game-of-life/wasm_game_of_life_bg.js"
import drawCells from "./drawCells";
import drawGrid from "./drawGrid";

function renderLoop(fps, context: CanvasRenderingContext2D, gridColor: string, aliveColor: string, deadColor: string, cellSize: number, Cell: typeof bg.Cell, universe: bg.Universe, memory: WebAssembly.Memory, width: number, height: number): number {
  fps.render();

  drawGrid(context, gridColor, width, height, cellSize);
  drawCells(universe, memory, width, height, context, aliveColor, deadColor, cellSize, Cell);

  for (let i = 0; i < 9; i++) {
    universe.tick();
  }

  return requestAnimationFrame(() => renderLoop(fps, context, gridColor, aliveColor, deadColor, cellSize, Cell, universe, memory, width, height));
};

export function isPaused(animationId: number | null): boolean {
  return animationId === null;
};

export function play(playPauseButton: HTMLButtonElement, fps, context: CanvasRenderingContext2D, gridColor: string, aliveColor: string, deadColor: string, cellSize: number, Cell: typeof bg.Cell, universe: bg.Universe, memory: WebAssembly.Memory, width: number, height: number): number {
  playPauseButton.textContent = "⏸";
  return renderLoop(fps, context, gridColor, aliveColor, deadColor, cellSize, Cell, universe, memory, width, height);
};

export function pause(playPauseButton: HTMLButtonElement, animationId: number | null): null {
  playPauseButton.textContent = "▶";
  if (animationId !== null) {
    cancelAnimationFrame(animationId);
  }
  return null;
};
