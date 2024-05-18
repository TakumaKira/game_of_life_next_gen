import { Universe } from "wasm-game-of-life/wasm_game_of_life_bg.js"

/**
 * Construct the universe, and get its width and height.
 */
export default function getUniverse(fieldSize: number, lifeSpan: number, aliveCellBase: number[]): { universe: Universe, width: number, height: number, lifeSpan: number } {
  const universe = Universe.new(fieldSize, lifeSpan, new Uint32Array(aliveCellBase));
  const returnWidth = universe.width();
  const returnHeight = universe.height();
  const returnLifeSpan = universe.get_life_span();
  return { universe, width: returnWidth, height: returnHeight, lifeSpan: returnLifeSpan }
}
