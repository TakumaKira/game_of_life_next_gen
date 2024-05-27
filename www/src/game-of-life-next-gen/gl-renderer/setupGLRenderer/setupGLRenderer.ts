import { ArcRotateCamera, Engine, Vector3 } from 'babylonjs'
import { CAMERA_DEFAULTS, EFFCT_DEFAULTS, SCENE_BACKGROUND_COLOR_DEFAULT, TEXTURE_SPECULAR_COLOR, TEXTURE_RESOLUTION, TEXTURE_SIZE } from '@/game-of-life-next-gen/constants';
import type { OnHoverTextureContextFn, TextContextUpdateFn } from '../types';
import getDefaultRenderPipeline from './getDefaultRenderPipeline';
import getLight from './getLight';
import getScene from './getScene';
import setupGround from './setupGround';
import updateHoverState from './updateHoverState';
import getColorCurve from './getColorCurve';
import buildGLValuesRebindRequired from './buildGLValuesRebindRequired';
import updateGLValues from './updateGLValues';
import type { GLValuesConfigurable } from './types';

export default function setupGLRenderer(canvas: HTMLCanvasElement, onHoverTextureContext: OnHoverTextureContextFn): { updateTextureContext: (textContextUpdateFn: TextContextUpdateFn) => void, updateEffects: (value: Partial<GLValuesConfigurable>) => void, resetCamera: () => void, dispose: () => void} {
  const engine = new Engine(canvas, true);
  const scene = getScene(engine, SCENE_BACKGROUND_COLOR_DEFAULT)

  const camera = new ArcRotateCamera(
    "Camera",
    CAMERA_DEFAULTS.alpha, CAMERA_DEFAULTS.beta, CAMERA_DEFAULTS.radius,
    CAMERA_DEFAULTS.target,
    scene
  );
  camera.attachControl(canvas, true);
  const resetCamera = () => {
    camera.alpha = CAMERA_DEFAULTS.alpha
    camera.beta = CAMERA_DEFAULTS.beta
    camera.radius = CAMERA_DEFAULTS.radius
    camera.target = CAMERA_DEFAULTS.target
  }

  const light = getLight("light1", new Vector3(0, 1, 0), scene, 0.7)

  const { textureGround, textureContext, materialGround } = setupGround(scene, TEXTURE_SIZE, "ground1", "dynamic texture", "Mat", TEXTURE_RESOLUTION, TEXTURE_SPECULAR_COLOR)

  const defaultPipeline = getDefaultRenderPipeline("default", scene, camera, EFFCT_DEFAULTS)
  const curve = getColorCurve(200, 80, 80, 20, 80, -80, 2, 80, 40)
  if (defaultPipeline.imageProcessing) {
    defaultPipeline.imageProcessing.colorCurves = curve;
  }
  const glValuesRebindRequired = buildGLValuesRebindRequired(defaultPipeline)
  const updateEffects = (value: Partial<GLValuesConfigurable>) => {
    updateGLValues(defaultPipeline, glValuesRebindRequired, materialGround, scene, value)
  }

  //Draw on canvas
  const updateTextureContext = (textContextUpdateFn: TextContextUpdateFn) => {
    if (engine.isDisposed) {
      return
    }
    textContextUpdateFn(textureContext)
    textureGround.update();
  }

  scene.activeCameras = [camera];

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

  return { updateTextureContext, updateEffects, resetCamera, dispose }
}
