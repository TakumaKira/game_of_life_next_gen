import { ArcRotateCamera, Color3, DefaultRenderingPipeline, DynamicTexture, Engine, HemisphericLight, MeshBuilder, Scene, StandardMaterial, Vector3 } from 'babylonjs'
import type { ICanvasRenderingContext } from 'babylonjs'
import { EFFCT_DEFAULTS, SCENE_BACKGROUND_COLOR_DEFAULT, TEXTURE_RESOLUTION } from '@/game-of-life-next-gen/constants';
import type { OnHoverTextureContextFn, TextContextUpdateFn } from './types';
import { setupGUI } from './on-screen-controller';

export default function setupGLRenderer(canvas: HTMLCanvasElement, onHoverTextureContext: OnHoverTextureContextFn): { updateTextureContext: (textContextUpdateFn: TextContextUpdateFn) => void, dispose: () => void} {
  const engine = new Engine(canvas, true);
  const scene = new Scene(engine);
  scene.clearColor = SCENE_BACKGROUND_COLOR_DEFAULT;

  const camera = new ArcRotateCamera("Camera", -Math.PI/2, Math.PI / 3, 25, Vector3.Zero(), scene);
  camera.attachControl(canvas, true);

  const light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
  light.intensity = 0.7;

  const groundWidth = 20;
  const groundHeight = groundWidth;

  const ground = MeshBuilder.CreateGround("ground1", {width: groundWidth, height: groundHeight, subdivisions: 1}, scene);

  //Create dynamic texture
  const textureResolution = TEXTURE_RESOLUTION;
  const textureGround = new DynamicTexture("dynamic texture", textureResolution, scene);
  const textureContext = textureGround.getContext();

  const materialGround = new StandardMaterial("Mat", scene);
  materialGround.diffuseTexture = textureGround;
  materialGround.specularColor = new Color3(0.075, 0.075, 0.075);
  ground.material = materialGround;

  //Draw on canvas
  const updateTextureContext = (textContextUpdateFn: (_textureContext: ICanvasRenderingContext) => void) => {
    if (engine.isDisposed) {
      return
    }
    textContextUpdateFn(textureContext)
    textureGround.update();
  }

  const defaultPipeline = new DefaultRenderingPipeline("default", true, scene, [camera]);
  defaultPipeline.bloomEnabled = EFFCT_DEFAULTS.BLOOM_ENABLED;
  defaultPipeline.fxaaEnabled = EFFCT_DEFAULTS.FXAA_ENABLED;
  defaultPipeline.bloomWeight = EFFCT_DEFAULTS.BLOOM_WEIGHT;
  defaultPipeline.imageProcessingEnabled = EFFCT_DEFAULTS.IMAGE_PROCESSING.ENABLED;
  if (defaultPipeline.imageProcessing) {
    defaultPipeline.imageProcessing.toneMappingEnabled = EFFCT_DEFAULTS.IMAGE_PROCESSING.TONE_MAPPING_ENABLED;
    defaultPipeline.imageProcessing.vignetteEnabled = EFFCT_DEFAULTS.IMAGE_PROCESSING.VIGNETTE_ENABLED;
    defaultPipeline.imageProcessing.vignetteWeight = EFFCT_DEFAULTS.IMAGE_PROCESSING.VIGNETTE_WEIGHT;
    defaultPipeline.imageProcessing.vignetteColor = EFFCT_DEFAULTS.IMAGE_PROCESSING.VIGNETTE_COLOR;
    defaultPipeline.imageProcessing.colorCurvesEnabled = EFFCT_DEFAULTS.IMAGE_PROCESSING.COLOR_CURVES_ENABLED;
    defaultPipeline.imageProcessing.contrast = EFFCT_DEFAULTS.IMAGE_PROCESSING.CONTRAST;
    defaultPipeline.imageProcessing.exposure = EFFCT_DEFAULTS.IMAGE_PROCESSING.EXPOSURE;
  }
  // defaultPipeline.cameraFov = camera.fov;

  const { bgCamera } = setupGUI(scene, defaultPipeline)

  scene.activeCameras = [camera, bgCamera];

  scene.onBeforeRenderObservable.add(() => {
    const result = scene.pick(scene.pointerX, scene.pointerY, (mesh) => {
      return mesh.isPickable && mesh.isVisible && mesh.isReady()
    }, false, camera)
    if (result.hit && result.pickedPoint) {
      const { _x: x, _z: z } = result.pickedPoint
      onHoverTextureContext({ x, z })
    } else {
      onHoverTextureContext(null)
    }
  })

  engine.runRenderLoop(function () {
    scene.render();
  });

  const onWindowResize = () => engine.resize()
  window.addEventListener("resize", onWindowResize);

  const dispose = () => {
    engine.dispose()
    window.removeEventListener("resize", onWindowResize)
  }

  return { updateTextureContext, dispose }
}
