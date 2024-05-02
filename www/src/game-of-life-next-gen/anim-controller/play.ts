import renderLoop from "./renderLoop";
import type { Universe } from "wasm-game-of-life/wasm_game_of_life_bg.js";
import type { FPS } from "@/game-of-life-next-gen/game-of-life";
import type { TextContextUpdateFn } from "@/game-of-life-next-gen/gl-renderer";

export default function play(fps: FPS, universe: Universe, memory: WebAssembly.Memory, updateTextureContext: (textContextUpdateFn: TextContextUpdateFn) => void, width: number, height: number, lifeSpan: number, updateAnimId: (id: number | null) => void): { isPlaying: boolean} {
  renderLoop(fps, universe, memory, updateTextureContext, width, height, lifeSpan, updateAnimId);
  return { isPlaying: true };
};
