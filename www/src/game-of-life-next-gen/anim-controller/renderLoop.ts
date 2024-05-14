import type { Universe } from "wasm-game-of-life/wasm_game_of_life_bg.js";
import type { FPS } from "@/game-of-life-next-gen/game-of-life";
import AnimationState from "./AnimationState";

export default function renderLoop(fps: FPS, universe: Universe, updateUniverse: () => void, animationState: AnimationState, speed: number): void {
  fps.render();

  updateUniverse();

  for (let i = 0; i < speed; i++) {
    universe.tick(false);
  }

  animationState.requestNextFrame(() => renderLoop(fps, universe, updateUniverse, animationState, speed));
};
