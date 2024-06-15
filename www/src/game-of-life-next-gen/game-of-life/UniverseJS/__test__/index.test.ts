import { UniverseJS } from "..";

test('tick', () => {
  function input_spaceship(): UniverseJS {
    const universe = UniverseJS.new(6, 2, []);
    universe.set_width(6)
    universe.set_height(6)
    universe.set_cells([[1, 2], [2, 3], [3, 1], [3, 2], [3, 3]])
    return universe;

    // Dead    Dead    Dead    Dead    Dead    Dead
    // Dead    Dead    Alive-0 Dead    Dead    Dead
    // Dead    Dead    Dead    Alive-0 Dead    Dead
    // Dead    Alive-0 Alive-0 Alive-0 Dead    Dead
    // Dead    Dead    Dead    Dead    Dead    Dead
    // Dead    Dead    Dead    Dead    Dead    Dead
  }

  function expected_spaceship_after_first_tick(): UniverseJS {
    const universe = UniverseJS.new(6, 2, []);
    universe.set_width(6)
    universe.set_height(6)
    universe.set_cells([[2, 1], [2, 3], [3, 2], [3, 3], [4, 2]])
    return universe;

    // Dead    Dead    Dead    Dead    Dead    Dead
    // Dead    Dead    Dead    Dead    Dead    Dead
    // Dead    Alive-0 Dead    Alive-1 Dead    Dead
    // Dead    Dead    Alive-1 Alive-1 Dead    Dead
    // Dead    Dead    Alive-0 Dead    Dead    Dead
    // Dead    Dead    Dead    Dead    Dead    Dead
  }

  function expected_spaceship_after_second_tick(): UniverseJS {
    const universe = UniverseJS.new(6, 2, []);
    universe.set_width(6)
    universe.set_height(6)
    universe.set_cells([[3, 1], [4, 2], [4, 3]])
    return universe;

    // Dead    Dead    Dead    Dead    Dead    Dead
    // Dead    Dead    Dead    Dead    Dead    Dead
    // Dead    Dead    Dead    Dead    Dead    Dead
    // Dead    Alive-0 Dead    Dead    Dead    Dead
    // Dead    Dead    Alive-1 Alive-0 Dead    Dead
    // Dead    Dead    Dead    Dead    Dead    Dead
  }

  const input_universe = input_spaceship();

  const expected_universe_after_first_tick = expected_spaceship_after_first_tick();

  input_universe.tick(false)
  expect(input_universe.get_cells().map(cell => cell.get_state(input_universe.get_lifespan()))).toEqual(expected_universe_after_first_tick.get_cells().map(cell => cell.get_state(expected_universe_after_first_tick.get_lifespan())))

  const expected_universe_after_second_tick = expected_spaceship_after_second_tick();
  input_universe.tick(false)
  expect(input_universe.get_cells().map(cell => cell.get_state(input_universe.get_lifespan()))).toEqual(expected_universe_after_second_tick.get_cells().map(cell => cell.get_state(expected_universe_after_second_tick.get_lifespan())))
})