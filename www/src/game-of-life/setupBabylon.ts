import { ArcRotateCamera, ColorCurves, DefaultRenderingPipeline, DynamicTexture, Engine, HemisphericLight, ICanvasRenderingContext, ImageProcessingConfiguration, MeshBuilder, Scene, StandardMaterial, Vector3 } from 'babylonjs'
import * as GUI from '@babylonjs/gui';
import '@babylonjs/inspector'

export default function setupBabylon(canvas: HTMLCanvasElement): (textContextUpdateFn: (textureContext: ICanvasRenderingContext) => void) => void {
  const engine = new Engine(canvas, true);
  const scene = new Scene(engine);

  const camera = new ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 3, 25, Vector3.Zero(), scene);
  camera.attachControl(canvas, true);

  const light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
  light.intensity = 0.7;

  const groundWidth = 20;
  const groundHeight = 20;

  const ground = MeshBuilder.CreateGround("ground1", { width: groundWidth, height: groundHeight, subdivisions: 25 }, scene);

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

  const defaultPipeline = new DefaultRenderingPipeline("default", true, scene, [camera]);
  defaultPipeline.bloomEnabled = false;
  defaultPipeline.fxaaEnabled = false;
  defaultPipeline.bloomWeight = 0.5;
  // defaultPipeline.cameraFov = camera.fov;

  // GUI
  const bgCamera = new ArcRotateCamera("BGCamera", Math.PI / 2 + Math.PI / 7, Math.PI / 2, 100,
    new Vector3(0, 20, 0),
    scene);
  bgCamera.layerMask = 0x10000000;

  const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, null);
  advancedTexture.layer.layerMask = 0x10000000;

  const panel = new GUI.StackPanel();
  panel.width = "300px";
  panel.isVertical = true;
  panel.paddingRight = "20px";
  panel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
  panel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
  advancedTexture.addControl(panel);

  const addCheckbox = function(text, func, initialValue, left?) {
    const checkbox = new GUI.Checkbox();
    checkbox.width = "20px";
    checkbox.height = "20px";
    checkbox.isChecked = initialValue;
    checkbox.color = "green";
    checkbox.onIsCheckedChangedObservable.add(function(value) {
      func(value);
    });

    const header = GUI.Control.AddHeader(checkbox, text, "180px", { isHorizontal: true, controlFirst: true });
    header.height = "30px";
    header.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

    if (left) {
      header.left = left;
    }

    panel.addControl(header);
  }

  const addSlider = function(text, func, initialValue, min, max, left) {
    const header = new GUI.TextBlock();
    header.text = text;
    header.height = "30px";
    header.color = "white";
    header.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    //   panel.addControl(header);
    if (left) {
      header.left = left;
    }

    const slider = new GUI.Slider();
    slider.minimum = min;
    slider.maximum = max;
    slider.value = initialValue;
    slider.height = "20px";
    slider.color = "green";
    slider.background = "white";
    slider.onValueChangedObservable.add(function(value) {
      func(value);
    });

    if (left) {
      slider.paddingLeft = left;
    }

    //   panel.addControl(slider);
  }

  const addColorPicker = function(text, func, initialValue, left) {
    const header = new GUI.TextBlock();
    header.text = text;
    header.height = "30px";
    header.color = "white";
    header.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    //   panel.addControl(header);

    if (left) {
      header.left = left;
    }

    const colorPicker = new GUI.ColorPicker();
    colorPicker.value = initialValue;
    colorPicker.size = "100px";
    colorPicker.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    colorPicker.onValueChangedObservable.add(function(value) {
      func(value);
    });

    if (left) {
      colorPicker.left = left;
    }

    //   panel.addControl(colorPicker);
  }

  let toneMappingEnabled = defaultPipeline.imageProcessing.toneMappingEnabled;
  let vignetteEnabled = defaultPipeline.imageProcessing.vignetteEnabled;
  let vignetteColor = defaultPipeline.imageProcessing.vignetteColor;
  let vignetteWeight = defaultPipeline.imageProcessing.vignetteWeight;
  let vignetteBlendMode = defaultPipeline.imageProcessing.vignetteBlendMode;
  let colorCurvesEnabled = defaultPipeline.imageProcessing.colorCurvesEnabled;
  let contrast = defaultPipeline.imageProcessing.contrast;
  let exposure = defaultPipeline.imageProcessing.exposure;

  const curve = new ColorCurves();
  curve.globalHue = 200;
  curve.globalDensity = 80;
  curve.globalSaturation = 80;

  curve.highlightsHue = 20;
  curve.highlightsDensity = 80;
  curve.highlightsSaturation = -80;

  curve.shadowsHue = 2;
  curve.shadowsDensity = 80;
  curve.shadowsSaturation = 40;

  defaultPipeline.imageProcessing.colorCurves = curve;

  const rebindValues = function() {
    if (defaultPipeline.imageProcessing) {
      defaultPipeline.imageProcessing.toneMappingEnabled = toneMappingEnabled;
      defaultPipeline.imageProcessing.vignetteEnabled = vignetteEnabled;
      defaultPipeline.imageProcessing.vignetteWeight = vignetteWeight;
      defaultPipeline.imageProcessing.vignetteColor = vignetteColor;
      defaultPipeline.imageProcessing.vignetteBlendMode = vignetteBlendMode;
      defaultPipeline.imageProcessing.colorCurvesEnabled = colorCurvesEnabled;
      defaultPipeline.imageProcessing.contrast = contrast;
      defaultPipeline.imageProcessing.exposure = exposure;
      defaultPipeline.imageProcessing.colorCurves = curve;
    }
  }

  //   addCheckbox("fxaa", function(value) {
  //       defaultPipeline.fxaaEnabled = value;
  //       rebindValues();
  //   }, defaultPipeline.fxaaEnabled );

  addCheckbox("bloom", function(value) {
    defaultPipeline.bloomEnabled = value;
    rebindValues();
  }, defaultPipeline.bloomEnabled);

  //   addSlider("bloom weight", function(value) {
  //       defaultPipeline.bloomWeight = value;
  //   }, defaultPipeline.bloomWeight, 0, 2, "20px");

  //   addCheckbox("image processing", function(value) {
  //       defaultPipeline.imageProcessingEnabled = value;
  //       rebindValues();
  //   }, defaultPipeline.imageProcessingEnabled);

  //   addCheckbox("tone mapping", function(value) {
  //       defaultPipeline.imageProcessing.toneMappingEnabled = value;
  //       toneMappingEnabled = value;
  //   }, toneMappingEnabled, "20px");

  //   addCheckbox("vignette", function(value) {
  //       defaultPipeline.imageProcessing.vignetteEnabled = value;
  //       vignetteEnabled = value;
  //   }, vignetteEnabled, "20px");

  //   addCheckbox("vignette multiply", function(value) {
  //       const blendMode = value ? ImageProcessingConfiguration.VIGNETTEMODE_MULTIPLY : ImageProcessingConfiguration.VIGNETTEMODE_OPAQUE;
  //       defaultPipeline.imageProcessing.vignetteBlendMode = blendMode;
  //       vignetteBlendMode = blendMode;
  //   }, vignetteBlendMode === ImageProcessingConfiguration.VIGNETTEMODE_MULTIPLY, "40px");

  //   addColorPicker("vignette color", function(value) {
  //       defaultPipeline.imageProcessing.vignetteColor = value;
  //       vignetteColor = value;
  //   }, vignetteColor, "40px");

  //   addSlider("vignette weight", function(value) {
  //       defaultPipeline.imageProcessing.vignetteWeight = value;
  //       vignetteWeight = value;
  //   }, vignetteWeight, 0, 10, "40px");

  //   addCheckbox("color curves", function(value) {
  //       defaultPipeline.imageProcessing.colorCurvesEnabled = value;
  //       colorCurvesEnabled = value;
  //   }, colorCurvesEnabled, "20px");

  //   addSlider("camera contrast", function(value) {
  //       defaultPipeline.imageProcessing.contrast = value;
  //       contrast = value;
  //   }, contrast, 0, 4, "20px");

  //   addSlider("camera exposure", function(value) {
  //       defaultPipeline.imageProcessing.exposure = value;
  //       exposure = value;
  //       console.log(value);
  //   }, exposure, 0, 4, "20px");

  scene.activeCameras = [camera, bgCamera];

  engine.runRenderLoop(function() {
    scene.render();
  });
  window.addEventListener("resize", function() {
    engine.resize();
  });

  return updateTextureContext
}
