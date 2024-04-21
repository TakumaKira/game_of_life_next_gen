import type { Universe } from "wasm-game-of-life/wasm_game_of_life_bg.js"
import drawCells from "./drawCells";
import FPS from "./FPS";

export function play(playPauseButton: HTMLButtonElement, fps: FPS, universe: Universe, memory: WebAssembly.Memory, width: number, height: number, updateAnimId: (id: number | null) => void): void {
  playPauseButton.textContent = "⏸";
  renderLoop(fps, universe, memory, width, height, updateAnimId);
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

function renderLoop(fps: FPS, universe: Universe, memory: WebAssembly.Memory, width: number, height: number, updateAnimId: (id: number | null) => void): void {
  console.log('renderLoop')
  fps.render();

  // drawCells(universe, memory, width, height);

  for (let i = 0; i < 9; i++) {
    universe.tick(false);
  }

  updateAnimId(requestAnimationFrame(() => renderLoop(fps, universe, memory, width, height, updateAnimId)));
};
