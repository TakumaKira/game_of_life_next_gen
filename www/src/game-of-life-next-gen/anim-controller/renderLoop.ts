import type { Universe } from "wasm-game-of-life/wasm_game_of_life_bg.js";
import type { FPS } from "@/game-of-life-next-gen/game-of-life";
import type { TextContextUpdateFn } from "@/game-of-life-next-gen/gl-renderer";
import { drawGrid, drawCells } from "@/game-of-life-next-gen/drawer";

export default function renderLoop(fps: FPS, universe: Universe, memory: WebAssembly.Memory, updateTextureContext: (textContextUpdateFn: TextContextUpdateFn) => void, width: number, height: number, lifeSpan: number, updateAnimId: (id: number | null) => void): void {
  fps.render();

  drawGrid(updateTextureContext, width, height);
  drawCells(universe, memory, updateTextureContext, width, height, lifeSpan);

  for (let i = 0; i < 9; i++) {
    universe.tick(false);
  }

  updateAnimId(requestAnimationFrame(() => renderLoop(fps, universe, memory, updateTextureContext, width, height, lifeSpan, updateAnimId)));
};