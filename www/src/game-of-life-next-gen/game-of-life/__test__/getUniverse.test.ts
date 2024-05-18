import getUniverse from '../getUniverse';
import { Universe } from "wasm-game-of-life/wasm_game_of_life_bg.js";

jest.mock("wasm-game-of-life/wasm_game_of_life_bg.js", () => {
  const mockUniverse = {
    new: jest.fn((size, lifespan, aliveCellBase) => ({
      width: jest.fn(() => size),
      height: jest.fn(() => size),
      get_life_span: jest.fn(() => lifespan),
    })),
  };
  return { Universe: mockUniverse };
});

describe('getUniverse', () => {
  let fieldSize = 10;
  let lifespan = 100;
  let aliveCellBase = [1, 2]

  it('should construct the universe with the specified size and life span', () => {
    const { universe } = getUniverse(fieldSize, lifespan, aliveCellBase);

    expect(Universe.new).toHaveBeenCalledWith(fieldSize, lifespan, new Uint32Array(aliveCellBase));
    expect(universe.width()).toBe(fieldSize);
    expect(universe.height()).toBe(fieldSize);
  });

  it('should return the width and height of the constructed universe', () => {
    const { width, height } = getUniverse(fieldSize, lifespan, aliveCellBase);

    expect(width).toBe(fieldSize);
    expect(height).toBe(fieldSize);
  });

  it('should return the life span of the constructed universe', () => {
    const { lifespan: returnLifespan } = getUniverse(fieldSize, lifespan, aliveCellBase);

    expect(returnLifespan).toBe(lifespan);
  });
});
