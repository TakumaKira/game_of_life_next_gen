import { ArcRotateCamera, DynamicTexture, Engine, HemisphericLight, MeshBuilder, Scene, StandardMaterial, Vector3 } from 'babylonjs'
import type { ICanvasRenderingContext } from 'babylonjs'
import { TEXTURE_RESOLUTION } from './constants';

export type TextContextUpdateFn = (textureContext: ICanvasRenderingContext) => void

export default function setupBabylon(canvas: HTMLCanvasElement, onHoverTextureContext: (point: { x: number, z: number } | null) => void): (textContextUpdateFn: TextContextUpdateFn) => void {
  const engine = new Engine(canvas, true);
  const scene = new Scene(engine);

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
  ground.material = materialGround;

  //Draw on canvas
  const updateTextureContext = (textContextUpdateFn: (_textureContext: ICanvasRenderingContext) => void) => {
    textContextUpdateFn(textureContext)
    textureGround.update();
  }

  scene.onBeforeRenderObservable.add(() => {
    const result = scene.pick(scene.pointerX, scene.pointerY, (mesh) => {
      return mesh.isPickable && mesh.isVisible && mesh.isReady()
    }, false, camera)
    if (result.hit) {
      const { _x: x, _z: z } = result.pickedPoint
      onHoverTextureContext({ x, z })
    } else {
      onHoverTextureContext(null)
    }
  })

  engine.runRenderLoop(function () {
    scene.render();
  });
  window.addEventListener("resize", function () {
    engine.resize();
  });

  return updateTextureContext
}
