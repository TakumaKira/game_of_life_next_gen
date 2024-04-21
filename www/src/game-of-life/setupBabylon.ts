import { Engine, FreeCamera, HemisphericLight, Scene, Vector3 } from 'babylonjs'
import drawCells from './drawCells';
import type { Universe } from 'wasm-game-of-life/wasm_game_of_life_bg.js';

export default function setupBabylon(canvas: HTMLCanvasElement, universe: Universe, memory: WebAssembly.Memory, width: number, height: number) {
  canvas.height = window.innerHeight - 100;
  canvas.width = window.innerWidth;
  const engine = new Engine(canvas, true);
  const scene = new Scene(engine);
  const camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
  camera.setTarget(Vector3.Zero());
  camera.attachControl(canvas, true);
  const light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
  light.intensity = 0.7;

  scene.onBeforeRenderObservable.add(() => {
    scene.meshes.forEach(mesh => mesh.dispose())
    universe.tick(false);
    drawCells(universe, memory, width, height, scene)
  })

  engine.runRenderLoop(function () {
    scene.render();
  });
  window.addEventListener("resize", function () {
    engine.resize();
  });
}
