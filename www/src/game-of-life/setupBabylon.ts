import { Color3, Engine, FreeCamera, HemisphericLight, Mesh, MeshBuilder, Scene, StandardMaterial, Vector3 } from 'babylonjs'
import drawCells from './drawCells';
import type { Universe } from 'wasm-game-of-life/wasm_game_of_life_bg.js';
import getIndex from './getIndex';

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

  const meshes: Mesh[] = new Array(height * width)
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const idx = getIndex(row, col, width);
      const circleMesh = MeshBuilder.CreateDisc("circle", { radius: 0.5, tessellation: 50 }, scene);
      circleMesh.rotation.x = Math.PI / 2;
      circleMesh.position = new Vector3(col, 0, row)
      meshes[idx] = circleMesh
    }
  }

  const getNewRedMaterial = () => {
    const redMaterial = new StandardMaterial("redMaterial", scene);
    redMaterial.diffuseColor = new Color3(1, 0, 0);
    return redMaterial
  }
  const getNewYellowMaterial = () => {
    const yellowMaterial = new StandardMaterial("yellowMaterial", scene);
    yellowMaterial.diffuseColor = new Color3(1, 1, 0);
    return yellowMaterial
  }
  const getNewBlueMaterial = () => {
    const blueMaterial = new StandardMaterial("blueMaterial", scene);
    blueMaterial.diffuseColor = new Color3(0, 0, 1);
    return blueMaterial
  }
  const getNewBlackMaterial = () => {
    const blackMaterial = new StandardMaterial("blackMaterial", scene);
    blackMaterial.diffuseColor = new Color3(0, 0, 0);
    return blackMaterial
  }

  scene.onBeforeRenderObservable.add(() => {
    universe.tick(false);
    drawCells(universe, memory, width, height, meshes, getNewRedMaterial, getNewYellowMaterial, getNewBlueMaterial, getNewBlackMaterial)
  })

  engine.runRenderLoop(function () {
    scene.render();
  });
  window.addEventListener("resize", function () {
    engine.resize();
  });
}
