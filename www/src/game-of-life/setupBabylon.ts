import { ArcRotateCamera, DynamicTexture, Engine, HemisphericLight, ICanvasRenderingContext, MeshBuilder, Scene, StandardMaterial, Vector3 } from 'babylonjs'

export default function setupBabylon(canvas: HTMLCanvasElement): (textContextUpdateFn: (textureContext: ICanvasRenderingContext) => void) => void {
  const engine = new Engine(canvas, true);
  const scene = new Scene(engine);

  const camera = new ArcRotateCamera("Camera", -Math.PI/2, Math.PI / 3, 25, Vector3.Zero(), scene);
  camera.attachControl(canvas, true);

  const light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
  light.intensity = 0.7;

  const groundWidth = 20;
  const groundHeight = 20;

  const ground = MeshBuilder.CreateGround("ground1", {width: groundWidth, height: groundHeight, subdivisions: 25}, scene);

  //Create dynamic texture
  const textureResolution = 512;
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

  engine.runRenderLoop(function () {
    scene.render();
  });
  window.addEventListener("resize", function () {
    engine.resize();
  });

  return updateTextureContext
}
