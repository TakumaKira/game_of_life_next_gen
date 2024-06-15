import getUniverse from '../getUniverse';
import { Universe } from "wasm-game-of-life/wasm_game_of_life_bg.js";
import { UniverseJS } from "../UniverseJS"

jest.mock("wasm-game-of-life/wasm_game_of_life_bg.js", () => {
  const mockUniverse = {
    new: jest.fn((size, lifespan, aliveCellBase) => ({
      width: jest.fn(() => size),
      height: jest.fn(() => size),
      get_lifespan: jest.fn(() => lifespan),
    })),
  };
  return { Universe: mockUniverse };
});

jest.mock('../UniverseJS', () => {
  const mockUniverseJS = {
    new: jest.fn((size, lifespan, aliveCellBase) => ({
      width: jest.fn(() => size),
      height: jest.fn(() => size),
      get_lifespan: jest.fn(() => lifespan),
    })),
  };
  return { UniverseJS: mockUniverseJS };
})

describe('getUniverse with useJSVersion option set to false', () => {
  let fieldSize = 10;
  let lifespan = 100;
  let aliveCellBase = [1, 2]

  it('should construct the universe with the specified size and life span', () => {
    const { universe } = getUniverse(fieldSize, lifespan, aliveCellBase);

    expect(Universe.new).toHaveBeenCalledWith(fieldSize, lifespan, new Uint32Array(aliveCellBase));
    expect(UniverseJS.new).not.toHaveBeenCalled();
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

describe('getUniverse with useJSVersion option set to true', () => {
  let fieldSize = 10;
  let lifespan = 100;
  let aliveCellBase = [1, 2]

  it('should construct the universe with the specified size and life span', () => {
    const { universe } = getUniverse(fieldSize, lifespan, aliveCellBase, true);

    expect(Universe.new).not.toHaveBeenCalled();
    expect(UniverseJS.new).toHaveBeenCalledWith(fieldSize, lifespan, aliveCellBase);
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
