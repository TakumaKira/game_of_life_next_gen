import { Color3, Engine, FreeCamera, HemisphericLight, MeshBuilder, Scene, StandardMaterial, Vector3 } from 'babylonjs';

import wasm from "wasm-game-of-life/wasm_game_of_life_bg.wasm";
import * as bg from "wasm-game-of-life/wasm_game_of_life_bg.js"

import { play } from "./animController";
import FPS from "./FPS";
import setCanvasDimensions from "./setCanvasDimensions";
import getCanvas from "./getCanvas";
import getUniverse from "./getUniverse";
import onClickPlayPauseButton from "./onClickPlayPauseButton";
import onClickNextFrameButton from "./onClickNextFrameButton";
import onClickCanvas from "./onClickCanvas";

export default async function run(canvas: HTMLCanvasElement, playPauseButton: HTMLButtonElement, nextFrameButton: HTMLButtonElement, fpsElement: HTMLDivElement): Promise<{ destroy: () => void }> {
  const wasmModule = await wasm({'./wasm_game_of_life_bg.js': bg})
  bg.__wbg_set_wasm(wasmModule)
  let animationId: null | number = null
  const updateAnimId = (id: number | null) => animationId = id
  const getCurrentAnimId = () => animationId

  runBabylon(canvas)
  return { destroy: () => {} }

  const { onClickPlayPauseButtonFnRef, onClickNextFrameButtonFnRef, onClickCanvasFnRef } = main(canvas, wasmModule.memory, playPauseButton, nextFrameButton, fpsElement, getCurrentAnimId, updateAnimId)
  return { destroy: () => destroyImpl(onClickPlayPauseButtonFnRef, onClickNextFrameButtonFnRef, onClickCanvasFnRef, playPauseButton, nextFrameButton, canvas, getCurrentAnimId) }
}

function runBabylon(canvas: HTMLCanvasElement) {
  canvas.height = window.innerHeight - 100;
  canvas.width = window.innerWidth;
  const engine = new Engine(canvas, true);
  const scene = new Scene(engine);
  const camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
  camera.setTarget(Vector3.Zero());
  camera.attachControl(canvas, true);
  const light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
  light.intensity = 0.7;

  const circleMesh = MeshBuilder.CreateDisc("circle", { radius: 0.5, tessellation: 50 }, scene);
  circleMesh.rotation.x = Math.PI / 2;
  circleMesh.registerInstancedBuffer("color", 3)
  circleMesh.instancedBuffers.color = new Color3(1, 0, 0)
  const circlePositions = [];
  const numCircles = 10;
  for (let i = 0; i < numCircles; i++) {
    circlePositions.push(new Vector3(i, 0, 0));
  }
  for (let i = 0; i < circlePositions.length; i++) {
    const newInstance = circleMesh.createInstance("circleInstance" + i);
    newInstance.position = circlePositions[i];
  }

  engine.runRenderLoop(function () {
    scene.render();
  });
  window.addEventListener("resize", function () {
    engine.resize();
  });
}

function main(canvas: HTMLCanvasElement, memory: WebAssembly.Memory, playPauseButton: HTMLButtonElement, nextFrameButton: HTMLButtonElement, fpsElement: HTMLDivElement, getCurrentAnimId: () => null | number, updateAnimId: (id: number | null) => void): { onClickPlayPauseButtonFnRef: () => void, onClickNextFrameButtonFnRef: () => void, onClickCanvasFnRef: (event: MouseEvent) => void } {
  const { universe, width, height } = getUniverse();

  setCanvasDimensions(canvas, width, height);

  const fps = new FPS(fpsElement);

  const context = getCanvas(canvas);

  const onClickPlayPauseButtonFnRef = () => onClickPlayPauseButton(playPauseButton, fps, universe, memory, context, width, height, getCurrentAnimId, updateAnimId)
  playPauseButton.addEventListener("click", onClickPlayPauseButtonFnRef);

  const onClickNextFrameButtonFnRef = () => onClickNextFrameButton(universe, memory, context, width, height)
  nextFrameButton.addEventListener("click", onClickNextFrameButtonFnRef);

  const onClickCanvasFnRef = (event: MouseEvent) => onClickCanvas(event, canvas, universe, memory, context, width, height)
  canvas.addEventListener("click", onClickCanvasFnRef);

  play(playPauseButton, fps, universe, memory, context, width, height, updateAnimId);

  return { onClickPlayPauseButtonFnRef, onClickNextFrameButtonFnRef, onClickCanvasFnRef }
}

function destroyImpl(onClickPlayPauseButtonFnRef: () => void, onClickNextFrameButtonFnRef: () => void, onClickCanvasFnRef: (event: MouseEvent) => void, playPauseButton: HTMLButtonElement, nextFrameButton: HTMLButtonElement, canvas: HTMLCanvasElement, getCurrentAnimId: () => number | null) {
  playPauseButton.removeEventListener("click", onClickPlayPauseButtonFnRef)
  nextFrameButton.removeEventListener("click", onClickNextFrameButtonFnRef)
  canvas.removeEventListener("click", onClickCanvasFnRef)
  const animationId = getCurrentAnimId()
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
}
