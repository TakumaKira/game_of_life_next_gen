enum CellState {
  Dead = 0,
  Alive = 1,
}

class Cell {
  constructor(public age: number, private is_dead: boolean) {}

  static new(): Cell {
    return new Cell(0, false)
  }

  increment_age(lifeSpan: number) {
    if (this.get_state(lifeSpan) === CellState.Alive) {
      this.age++
    }
  }

  kill() {
    this.is_dead = true
  }

  get_state(lifeSpan: number): CellState {
    if (this.age < lifeSpan && !this.is_dead) {
      return CellState.Alive
    } else {
      return CellState.Dead
    }
  }

  clone(): Cell {
    return new Cell(this.age, this.is_dead)
  }
}

export class UniverseJS {
  constructor(
    private _width: number,
    private _height: number,
    private cells: Cell[],
    private lifespan: number,
  ) {}

  private get_index(row: number, col: number): number {
    return row * this._width + col
  }

  get_cells(): Cell[] {
    return this.cells
  }

  set_cells(cells: [number, number][]) {
    for (const [row, col] of cells) {
      const idx = this.get_index(row, col)
      this.cells[idx] = Cell.new()
    }
  }

  private live_nighbor_count(row: number, col: number): number {
    let count = 0

    const north = row === 0 ? this._height - 1 : row - 1
    const south = row === this._height - 1 ? 0 : row + 1
    const west = col === 0 ? this._width - 1 : col - 1
    const east = col === this._width - 1 ? 0 : col + 1

    const nw = this.get_index(north, west)
    count += this.cells[nw].get_state(this.lifespan) as number

    const n = this.get_index(north, col)
    count += this.cells[n].get_state(this.lifespan) as number

    const ne = this.get_index(north, east)
    count += this.cells[ne].get_state(this.lifespan) as number

    const w = this.get_index(row, west)
    count += this.cells[w].get_state(this.lifespan) as number

    const e = this.get_index(row, east)
    count += this.cells[e].get_state(this.lifespan) as number

    const sw = this.get_index(south, west)
    count += this.cells[sw].get_state(this.lifespan) as number

    const s = this.get_index(south, col)
    count += this.cells[s].get_state(this.lifespan) as number

    const se = this.get_index(south, east)
    count += this.cells[se].get_state(this.lifespan) as number

    return count
  }

  tick(show_log: boolean): void {
    const next = this.cells.map(cell => cell.clone())

    for (let row = 0; row < this._height; row++) {
      for (let col = 0; col < this._width; col++) {
        const idx = this.get_index(row, col)
        const cell = this.cells[idx]
        const live_neighbors = this.live_nighbor_count(row, col)

        if (show_log) {
          console.log(`cell[${row}, ${col}] is initially ${JSON.stringify(cell)} and has ${live_neighbors} live neighbors`)
        }

        const next_cell = ((state, x) => {
          if (state === CellState.Alive && x < 2) {
            next[idx].kill()
            return next[idx]
          } else if (state === CellState.Alive && (x === 2 || x === 3)) {
            next[idx].increment_age(this.lifespan)
            return next[idx]
          } else if (state === CellState.Alive && x > 3) {
            next[idx].kill()
            return next[idx]
          } else if (state === CellState.Dead && x === 3) {
            return Cell.new()
          } else {
            return next[idx]
          }
        })(cell.get_state(this.lifespan), live_neighbors)

        if (show_log) {
          console.log(`    it becomes ${JSON.stringify(next_cell)}`)
        }

        next[idx] = next_cell
      }
    }

    this.cells = next
  }

  static new(size: number, lifespan: number, alive_cell_base: number[]) {
    const _size = size === 0 ? 128 : size
    const _lifespan = lifespan === 0 ? 100 : lifespan
    const width = _size
    const height = _size

    const cells = [...new Array(width * height)]
      .map((_, i) => {
        const should_alive = alive_cell_base.some(base => i % base === 0)
        if (should_alive) {
          return Cell.new()
        }
        const cell = Cell.new()
        cell.kill()
        return cell
      })

    return new UniverseJS(width, height, cells, _lifespan);
  }

  width(): number {
    return this._width
  }

  set_width(width: number): void {
    this._width = width
    this.cells = [...new Array(width * this._height)].map(_ => {
      const cell = Cell.new()
      cell.kill()
      return cell
    })
  }

  height(): number {
    return this._height
  }

  set_height(height: number): void {
    this._height = height
    this.cells = [...new Array(this._width * height)].map(_ => {
      const cell = Cell.new()
      cell.kill()
      return cell
    })
  }

  get_lifespan(): number {
    return this.lifespan
  }

  cells_state(): number {
    return -1
  }

  cellsState(): number[] {
    return this.cells.map(cell => cell.get_state(this.lifespan) as number)
  }

  cells_age(): number {
    return -1
  }

  cellsAge(): number[] {
    return this.cells.map(cell => cell.age)
  }

  toggle_cell(row: number, col: number): void {
    const idx = this.get_index(row, col)
    if (this.cells[idx].get_state(this.lifespan) === CellState.Alive) {
      this.cells[idx].increment_age(this.lifespan)
    } else {
      this.cells[idx] = Cell.new()
    }
  }

  free() {}
}
