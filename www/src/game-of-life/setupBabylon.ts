import {
  ArcRotateCamera,
  DynamicTexture,
  Engine,
  HemisphericLight,
  ICanvasRenderingContext,
  MeshBuilder,
  PostProcessRenderEffect,
  PostProcessRenderPipeline,
  Scene,
  StandardMaterial,
  Vector2,
  Vector3,

  DefaultRenderingPipeline,

  AnaglyphPostProcess,
  BlackAndWhitePostProcess,
  BloomMergePostProcess,
  BlurPostProcess,
  ChromaticAberrationPostProcess,
  CircleOfConfusionPostProcess,
  ColorCorrectionPostProcess,
  ConvolutionPostProcess,
  DepthOfFieldMergePostProcess,
  DisplayPassPostProcess,
  ExtractHighlightsPostProcess,
  FilterPostProcess,
  FxaaPostProcess,
  GrainPostProcess,
  HighlightsPostProcess,
  ImageProcessingPostProcess,
  MotionBlurPostProcess,
  PassPostProcess,
  PassCubePostProcess,
  RefractionPostProcess,
  ScreenSpaceCurvaturePostProcess,
  ScreenSpaceReflectionPostProcess,
  SharpenPostProcess,
  StereoscopicInterlacePostProcessI,
  StereoscopicInterlacePostProcess,
  // SubSurfaceScatteringPostProcess,
  TonemapPostProcess,
  VolumetricLightScatteringPostProcess,
  VRDistortionCorrectionPostProcess,
  VRMultiviewToSingleviewPostProcess,
} from 'babylonjs'

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

  const defaultPipeline = new DefaultRenderingPipeline("default", true, scene, [camera]);
  defaultPipeline.bloomEnabled = false;
  defaultPipeline.bloomWeight = 0.5;

  // Create a standard pipeline
  const standardPipeline = new PostProcessRenderPipeline(engine, "standardPipeline");

  // Create post processes
  // const anaglyph = new AnaglyphPostProcess("anaglyph", 1.0, null, null, engine, false);
  const blackAndWhite = new BlackAndWhitePostProcess("bw", 1.0, null, null, engine, false);
  // const bloom = new BloomMergePostProcess("bloom", 1.0, null, null, engine, false);
  // const chromaticAberration = new ChromaticAberrationPostProcess("ca", 1.0, null, null, engine, false);
  // const circleOfConfusion = new CircleOfConfusionPostProcess("coc", 1.0, null, null, engine, false);
  // const colorCorrection = new ColorCorrectionPostProcess("cc", 1.0, null, null, engine, false);
  // const convolution = new ConvolutionPostProcess("conv", 1.0, null, null, engine, false);
  // const depthOfField = new DepthOfFieldMergePostProcess("dof", 1.0, null, null, engine, false);
  // const displayPass = new DisplayPassPostProcess("displayPass", 1.0, null, null, engine, false);
  // const extractHighlights = new ExtractHighlightsPostProcess("eh", 1.0, null, null, engine, false);
  // const filter = new FilterPostProcess("filter", 1.0, null, null, engine, false);
  // const fxaa = new FxaaPostProcess("fxaa", 1.0, null, null, engine, false);
  // const grain = new GrainPostProcess("grain", 1.0, null, null, engine, false);
  // const highlights = new HighlightsPostProcess("highlights", 1.0, null, null, engine, false);
  // const imageProcessing = new ImageProcessingPostProcess("ip", 1.0, null, null, engine, false);
  // const motionBlur = new MotionBlurPostProcess("mb", 1.0, null, null, engine, false);
  const pass = new PassPostProcess("pass", 1.0, null, null, engine, false);
  // const passCube = new PassCubePostProcess("passCube", 1.0, null, null, engine, false);
  // const refraction = new RefractionPostProcess("refraction", 1.0, null, null, engine, false);
  // const screenSpaceCurvature = new ScreenSpaceCurvaturePostProcess("ssc", 1.0, null, null, engine, false);
  // const screenSpaceReflection = new ScreenSpaceReflectionPostProcess("ssr", 1.0, null, null, engine, false);
  // const sharpen = new SharpenPostProcess("sharpen", 1.0, null, null, engine, false);
  // const stereoscopicInterlaceI = new StereoscopicInterlacePostProcessI("si", 1.0, null, null, engine, false);
  // const stereoscopicInterlace = new StereoscopicInterlacePostProcess("si", 1.0, null, null, engine, false);
  // const tonemap = new TonemapPostProcess("tonemap", 1.0, null, null, engine, false);
  // const volumetricLightScattering = new VolumetricLightScatteringPostProcess("vls", 1.0, null, null, engine, false);
  // const vrDistortionCorrection = new VRDistortionCorrectionPostProcess("vrdc", 1.0, null, null, engine, false);
  // const vrMultiviewToSingleview = new VRMultiviewToSingleviewPostProcess("vrm2s", 1.0, null, null, engine, false);
  const horizontalBlur = new BlurPostProcess("hb", new Vector2(1.0, 0), 20, 1.0, null, null, engine, false)
  const bloom = new BloomMergePostProcess("bloom", pass, horizontalBlur, 0.1, 1.0, null, null, engine, false);

  // Create effect with multiple post processes and add to pipeline
  const postEffects = new PostProcessRenderEffect(engine, "postEffects", function() { return [
    blackAndWhite,
    horizontalBlur,
    // bloom,
  ] });
  standardPipeline.addEffect(postEffects);

  // Add pipeline to the scene's manager and attach to the camera
  scene.postProcessRenderPipelineManager.addPipeline(standardPipeline);
  scene.postProcessRenderPipelineManager.attachCamerasToRenderPipeline("standardPipeline", camera);

  return updateTextureContext
}
