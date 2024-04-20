import { Universe } from "wasm-game-of-life/wasm_game_of_life_bg.js"

/**
 * Construct the universe, and get its width and height.
 */
export default function getUniverse(): { universe: Universe, width: number, height: number } {
  const universe = Universe.new();
  const width = universe.width();
  const height = universe.height();
  return { universe, width, height }
}
