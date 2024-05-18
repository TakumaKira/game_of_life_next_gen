import { Universe } from "wasm-game-of-life/wasm_game_of_life_bg.js"

/**
 * Construct the universe, and get its width and height.
 */
export default function getUniverse(fieldSize: number, lifespan: number, aliveCellBase: number[]): { universe: Universe, width: number, height: number, lifespan: number } {
  const universe = Universe.new(fieldSize, lifespan, new Uint32Array(aliveCellBase));
  const returnWidth = universe.width();
  const returnHeight = universe.height();
  const returnLifespan = universe.get_life_span();
  return { universe, width: returnWidth, height: returnHeight, lifespan: returnLifespan }
}
