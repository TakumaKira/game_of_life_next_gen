import getUniverse from '../getUniverse';
import { Universe } from "wasm-game-of-life/wasm_game_of_life_bg.js";
import { DEFAULT_FIELD_SIZE, DEFAULT_LIFE_SPAN } from "@/game-of-life-next-gen/constants";

jest.mock("wasm-game-of-life/wasm_game_of_life_bg.js", () => {
  const mockUniverse = {
    new: jest.fn((size, lifeSpan) => ({
      width: jest.fn(() => size),
      height: jest.fn(() => size),
      get_life_span: jest.fn(() => lifeSpan),
    })),
  };
  return { Universe: mockUniverse };
});

describe('getUniverse', () => {
  it('should construct the universe with the specified size and life span', () => {
    const { universe } = getUniverse();

    expect(Universe.new).toHaveBeenCalledWith(DEFAULT_FIELD_SIZE, DEFAULT_LIFE_SPAN);
    expect(universe.width()).toBe(DEFAULT_FIELD_SIZE);
    expect(universe.height()).toBe(DEFAULT_FIELD_SIZE);
  });

  it('should return the width and height of the constructed universe', () => {
    const { width, height } = getUniverse();

    expect(width).toBe(DEFAULT_FIELD_SIZE);
    expect(height).toBe(DEFAULT_FIELD_SIZE);
  });

  it('should return the life span of the constructed universe', () => {
    const { lifeSpan } = getUniverse();

    expect(lifeSpan).toBe(DEFAULT_LIFE_SPAN);
  });
});
