import { Universe } from "wasm-game-of-life/wasm_game_of_life_bg.js"
import { FIELD_SIZE, LIFE_SPAN } from "./constants";

/**
 * Construct the universe, and get its width and height.
 */
export default function getUniverse(): { universe: Universe, width: number, height: number } {
  const universe = Universe.new(FIELD_SIZE, LIFE_SPAN);
  const width = universe.width();
  const height = universe.height();
  return { universe, width, height }
}
