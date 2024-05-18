import renderLoop from "./renderLoop";
import type { Universe } from "wasm-game-of-life/wasm_game_of_life_bg.js";
import type { FPS } from "@/game-of-life-next-gen/game-of-life";
import type AnimationState from "./AnimationState";

export default function play(fps: FPS, universe: Universe, updateUniverse: () => void, animationState: AnimationState, speed: number): void {
  renderLoop(fps, universe, updateUniverse, animationState, speed);
};
