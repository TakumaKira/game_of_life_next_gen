import { ArcRotateCamera, Color3, Engine, MeshBuilder, Vector3 } from 'babylonjs'
import type { ICanvasRenderingContext } from 'babylonjs'
import { EFFCT_DEFAULTS, SCENE_BACKGROUND_COLOR_DEFAULT, TEXTURE_RESOLUTION } from '@/game-of-life-next-gen/constants';
import type { OnHoverTextureContextFn, TextContextUpdateFn } from '../types';
import { setupGUI } from '../on-screen-controller';
import getDefaultRenderPipeline from './getDefaultRenderPipeline';
import getMaterialGround from './getMaterialGround';
import getDynamicTexture from './getDynamicTexture';
import getLight from './getLight';
import getScene from './getScene';

export default function setupGLRenderer(canvas: HTMLCanvasElement, onHoverTextureContext: OnHoverTextureContextFn): { updateTextureContext: (textContextUpdateFn: TextContextUpdateFn) => void, dispose: () => void} {
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

  const groundSize = 20;
  const ground = MeshBuilder.CreateGround("ground1", {width: groundSize, height: groundSize, subdivisions: 1}, scene);
  const { textureGround, textureContext } = getDynamicTexture("dynamic texture", TEXTURE_RESOLUTION, scene)
  const materialGround = getMaterialGround("Mat", scene, textureGround, new Color3(0.075, 0.075, 0.075));
  ground.material = materialGround;

  //Draw on canvas
  const updateTextureContext = (textContextUpdateFn: (_textureContext: ICanvasRenderingContext) => void) => {
    if (engine.isDisposed) {
      return
    }
    textContextUpdateFn(textureContext)
    textureGround.update();
  }

  const defaultPipeline = getDefaultRenderPipeline("default", scene, camera, EFFCT_DEFAULTS)

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
