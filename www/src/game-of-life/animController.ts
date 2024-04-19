import * as bg from "wasm-game-of-life/wasm_game_of_life_bg.js"
import drawCells from "./drawCells";
import drawGrid from "./drawGrid";
import FPS from "./FPS";

function renderLoop(fps: FPS, context: CanvasRenderingContext2D, Cell: typeof bg.Cell, universe: bg.Universe, memory: WebAssembly.Memory, width: number, height: number): number {
  fps.render();

  drawGrid(context, width, height);
  drawCells(universe, memory, width, height, context, Cell);

  for (let i = 0; i < 9; i++) {
    universe.tick();
  }

  return requestAnimationFrame(() => renderLoop(fps, context, Cell, universe, memory, width, height));
};

export function isPaused(animationId: number | null): boolean {
  return animationId === null;
};

export function play(playPauseButton: HTMLButtonElement, fps: FPS, context: CanvasRenderingContext2D, Cell: typeof bg.Cell, universe: bg.Universe, memory: WebAssembly.Memory, width: number, height: number): number {
  playPauseButton.textContent = "⏸";
  return renderLoop(fps, context, Cell, universe, memory, width, height);
};

export function pause(playPauseButton: HTMLButtonElement, animationId: number | null): null {
  playPauseButton.textContent = "▶";
  if (animationId !== null) {
    cancelAnimationFrame(animationId);
  }
  return null;
};
