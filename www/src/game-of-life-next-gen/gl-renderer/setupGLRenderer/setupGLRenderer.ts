import { ArcRotateCamera, Color3, Engine, Vector3 } from 'babylonjs'
import { EFFCT_DEFAULTS, SCENE_BACKGROUND_COLOR_DEFAULT, TEXTURE_DEFAULTS, TEXTURE_RESOLUTION, TEXTURE_SIZE } from '@/game-of-life-next-gen/constants';
import type { OnHoverTextureContextFn, TextContextUpdateFn } from '../types';
import { setupGUI } from '../on-screen-controller';
import getDefaultRenderPipeline from './getDefaultRenderPipeline';
import getLight from './getLight';
import getScene from './getScene';
import setupGround from './setupGround';
import updateHoverState from './updateHoverState';
import buildTextureValues from '../on-screen-controller/setupGUI/buildTextureValues';

export default function setupGLRenderer(canvas: HTMLCanvasElement, onHoverTextureContext: OnHoverTextureContextFn): { updateTextureContext: (textContextUpdateFn: TextContextUpdateFn) => void, toggleGUIControlsVisibility: () => void, dispose: () => void} {
  const engine = new Engine(canvas, true);
  const scene = getScene(engine, SCENE_BACKGROUND_COLOR_DEFAULT)

  const camera = new ArcRotateCamera(
    "Camera",
    -Math.PI/2, Math.PI / 3, 25,
    Vector3.Zero(),
    scene
  );
  camera.attachControl(canvas, true);

  const light = getLight("light1", new Vector3(0, 1, 0), scene, 0.7)

  const { textureGround, textureContext } = setupGround(scene, TEXTURE_SIZE, "ground1", "dynamic texture", "Mat", TEXTURE_RESOLUTION, new Color3(0.075, 0.075, 0.075))

  const defaultPipeline = getDefaultRenderPipeline("default", scene, camera, EFFCT_DEFAULTS)
  const textureValues = buildTextureValues(TEXTURE_DEFAULTS)
  const { bgCamera } = setupGUI(scene, defaultPipeline, textureValues)

  //Draw on canvas
  const updateTextureContext = (textContextUpdateFn: TextContextUpdateFn) => {
    if (engine.isDisposed) {
      return
    }
    textContextUpdateFn(textureContext, textureValues)
    textureGround.update();
  }

  scene.activeCameras = [camera];
  const toggleGUIControlsVisibility = () => {
    if (!scene.activeCameras) {
      return
    }
    const bgCameraIndex = scene.activeCameras.indexOf(bgCamera);
    if (bgCameraIndex === -1) {
      scene.activeCameras.push(bgCamera);
    } else {
      scene.activeCameras.splice(bgCameraIndex, 1);
    }
  }

  scene.onBeforeRenderObservable.add(() => {
    updateHoverState(scene, camera, onHoverTextureContext)
  })

  engine.runRenderLoop(() => {
    scene.render();
  });

  const onWindowResize = () => engine.resize()
  window.addEventListener("resize", onWindowResize);

  const dispose = () => {
    engine.dispose()
    window.removeEventListener("resize", onWindowResize)
  }

  return { updateTextureContext, toggleGUIControlsVisibility, dispose }
}
