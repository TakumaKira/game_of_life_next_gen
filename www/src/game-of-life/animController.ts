import type { Universe } from "wasm-game-of-life/wasm_game_of_life_bg.js"
import drawCells from "./drawCells";
import drawGrid from "./drawGrid";
import FPS from "./FPS";
import type { TextContextUpdateFn } from "./setupBabylon";

export function play(playPauseButton: HTMLButtonElement, fps: FPS, universe: Universe, memory: WebAssembly.Memory, updateTextureContext: (textContextUpdateFn: TextContextUpdateFn) => void, width: number, height: number, lifeSpan: number, updateAnimId: (id: number | null) => void): void {
  playPauseButton.textContent = "⏸";
  renderLoop(fps, universe, memory, updateTextureContext, width, height, lifeSpan, updateAnimId);
};

export function pause(playPauseButton: HTMLButtonElement, getCurrentAnimId: () => number | null, updateAnimId: (id: number | null) => void): void {
  playPauseButton.textContent = "▶";
  const animationId = getCurrentAnimId();
  if (animationId !== null) {
    cancelAnimationFrame(animationId);
  }
  updateAnimId(null);
};

export function isPaused(getCurrentAnimId: () => number | null): boolean {
  return getCurrentAnimId() === null;
};

function renderLoop(fps: FPS, universe: Universe, memory: WebAssembly.Memory, updateTextureContext: (textContextUpdateFn: TextContextUpdateFn) => void, width: number, height: number, lifeSpan: number, updateAnimId: (id: number | null) => void): void {
  fps.render();

  drawGrid(updateTextureContext, width, height);
  drawCells(universe, memory, updateTextureContext, width, height, lifeSpan);

  for (let i = 0; i < 9; i++) {
    universe.tick(false);
  }

  updateAnimId(requestAnimationFrame(() => renderLoop(fps, universe, memory, updateTextureContext, width, height, lifeSpan, updateAnimId)));
};
