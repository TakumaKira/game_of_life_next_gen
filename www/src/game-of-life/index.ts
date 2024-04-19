import wasm from "wasm-game-of-life/wasm_game_of_life_bg.wasm";
import * as bg from "wasm-game-of-life/wasm_game_of_life_bg.js"

export default function run(canvas) {
  wasm({'./wasm_game_of_life_bg.js': bg}).then(wasm => {
    bg.__wbg_set_wasm(wasm)
    main(bg.Universe, bg.Cell, wasm.memory, canvas)
  })
}

function main(Universe, Cell, memory, canvas) {
  const CELL_SIZE = 5; // px
  const GRID_COLOR = "#CCCCCC";
  const DEAD_COLOR = "#FFFFFF";
  const ALIVE_COLOR = "#000000";

  // Construct the universe, and get its width and height.
  const universe = Universe.new();
  const width = universe.width();
  const height = universe.height();

  // Give the canvas room for all of our cells and a 1px border
  // around each of them.
  canvas.height = (CELL_SIZE + 1) * height + 1;
  canvas.width = (CELL_SIZE + 1) * width + 1;

  const ctx = canvas.getContext('2d');

  const fps = new class {
    fps: HTMLDivElement;
    frames: number[] = [];
    lastFrameTimeStamp = performance.now();

    constructor() {
      const fps = document.getElementById("fps")
      if (fps === null || !(fps instanceof HTMLDivElement)) {
        throw new Error("div element with id fps not found")
      }
      this.fps = fps
    }

    render() {
      // Convert the delta time since the last frame render into a measure
      // of frames per second.
      const now = performance.now();
      const delta = now - this.lastFrameTimeStamp;
      this.lastFrameTimeStamp = now;
      const fps = 1 / delta * 1000;

      // Save only the latest 100 timings.
      this.frames.push(fps);
      if (this.frames.length > 100) {
        this.frames.shift();
      }

      // Find the max, min, and mean of our 100 latest timings.
      let min = Infinity;
      let max = -Infinity;
      let sum = 0;
      for (const fps of this.frames) {
        sum += fps;
        min = Math.min(fps, min);
        max = Math.max(fps, max);
      }
      let mean = sum / this.frames.length;

      // Render the statistics.
      this.fps.textContent = `
  Frames per Second:
           latest = ${Math.round(fps)}
  avg of last 100 = ${Math.round(mean)}
  min of last 100 = ${Math.round(min)}
  max of last 100 = ${Math.round(max)}
  `.trim();
    }
  };

  let animationId: null | number = null;

  const renderLoop = () => {
    fps.render();

    drawGrid();
    drawCells();

    for (let i = 0; i < 9; i++) {
      universe.tick();
    }

    animationId = requestAnimationFrame(renderLoop);
  };

  const isPaused = () => {
    return animationId === null;
  };

  const playPauseButton = document.getElementById("play-pause");

  if (playPauseButton === null || !(playPauseButton instanceof HTMLButtonElement)) {
    throw new Error("button element with id play-pause not found")
  }

  const play = () => {
    playPauseButton.textContent = "⏸";
    renderLoop();
  };

  const pause = () => {
    playPauseButton.textContent = "▶";
    if (animationId !== null) {
      cancelAnimationFrame(animationId);
    }
    animationId = null;
  };

  playPauseButton.addEventListener("click", event => {
    if (isPaused()) {
      play();
    } else {
      pause();
    }
  });

  const drawGrid = () => {
    ctx.beginPath();
    ctx.strokeStyle = GRID_COLOR;

    // Vertical lines.
    for (let i = 0; i <= width; i++) {
      ctx.moveTo(i * (CELL_SIZE + 1) + 1, 0);
      ctx.lineTo(i * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * height + 1);
    }

    // Horizontal lines.
    for (let j = 0; j <= height; j++) {
      ctx.moveTo(0,                           j * (CELL_SIZE + 1) + 1);
      ctx.lineTo((CELL_SIZE + 1) * width + 1, j * (CELL_SIZE + 1) + 1);
    }

    ctx.stroke();
  };

  const getIndex = (row, column) => {
    return row * width + column;
  };

  const drawCells = () => {
    const cellsPtr = universe.cells();
    const cells = new Uint8Array(memory.buffer, cellsPtr, width * height);

    ctx.beginPath();

    // Alive cells.
    ctx.fillStyle = ALIVE_COLOR;
    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        const idx = getIndex(row, col);
        if (cells[idx] !== Cell.Alive) {
          continue;
        }

        ctx.fillRect(
          col * (CELL_SIZE + 1) + 1,
          row * (CELL_SIZE + 1) + 1,
          CELL_SIZE,
          CELL_SIZE
        );
      }
    }

    // Dead cells.
    ctx.fillStyle = DEAD_COLOR;
    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        const idx = getIndex(row, col);
        if (cells[idx] !== Cell.Dead) {
          continue;
        }

        ctx.fillRect(
          col * (CELL_SIZE + 1) + 1,
          row * (CELL_SIZE + 1) + 1,
          CELL_SIZE,
          CELL_SIZE
        );
      }
    }

    ctx.stroke();
  };

  canvas.addEventListener("click", event => {
    const boundingRect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / boundingRect.width;
    const scaleY = canvas.height / boundingRect.height;

    const canvasLeft = (event.clientX - boundingRect.left) * scaleX;
    const canvasTop = (event.clientY - boundingRect.top) * scaleY;

    const row = Math.min(Math.floor(canvasTop / (CELL_SIZE + 1)), height - 1);
    const col = Math.min(Math.floor(canvasLeft / (CELL_SIZE + 1)), width - 1);

    universe.toggle_cell(row, col);

    drawCells();
    drawGrid();
  });

  play();
}
