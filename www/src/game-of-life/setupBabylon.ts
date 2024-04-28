import { ArcRotateCamera, ColorCurves, DefaultRenderingPipeline, DynamicTexture, Engine, HemisphericLight, ImageProcessingConfiguration, MeshBuilder, Scene, StandardMaterial, Vector3 } from 'babylonjs'
import * as GUI from 'babylonjs-gui'
import type { Color3, Color4, ICanvasRenderingContext } from 'babylonjs'
import { DEFAULT_EFFCTS, TEXTURE_RESOLUTION } from './constants';

export type OnTextureHoverPosition = { x: number, z: number } | null
export type OnHoverTextureContextFn = (hoverPos: OnTextureHoverPosition) => void
export type TextContextUpdateFn = (textureContext: ICanvasRenderingContext) => void

export default function setupBabylon(canvas: HTMLCanvasElement, onHoverTextureContext: OnHoverTextureContextFn): (textContextUpdateFn: TextContextUpdateFn) => void {
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

  const defaultPipeline = new DefaultRenderingPipeline("default", true, scene, [camera]);
  defaultPipeline.bloomEnabled = DEFAULT_EFFCTS.BLOOM_ENABLED;
  defaultPipeline.fxaaEnabled = DEFAULT_EFFCTS.FXAA_ENABLED;
  defaultPipeline.bloomWeight = DEFAULT_EFFCTS.BLOOM_WEIGHT;
  defaultPipeline.imageProcessingEnabled = DEFAULT_EFFCTS.IMAGE_PROCESSING.ENABLED;
  defaultPipeline.imageProcessing.toneMappingEnabled = DEFAULT_EFFCTS.IMAGE_PROCESSING.TONE_MAPPING_ENABLED;
  defaultPipeline.imageProcessing.vignetteEnabled = DEFAULT_EFFCTS.IMAGE_PROCESSING.VIGNETTE_ENABLED;
  defaultPipeline.imageProcessing.vignetteWeight = DEFAULT_EFFCTS.IMAGE_PROCESSING.VIGNETTE_WEIGHT;
  defaultPipeline.imageProcessing.colorCurvesEnabled = DEFAULT_EFFCTS.IMAGE_PROCESSING.COLOR_CURVES_ENABLED;
  defaultPipeline.imageProcessing.contrast = DEFAULT_EFFCTS.IMAGE_PROCESSING.CONTRAST;
  defaultPipeline.imageProcessing.exposure = DEFAULT_EFFCTS.IMAGE_PROCESSING.EXPOSURE;
  // defaultPipeline.cameraFov = camera.fov;

  // GUI
  const bgCamera = new ArcRotateCamera("BGCamera", Math.PI / 2 + Math.PI / 7, Math.PI / 2, 100,
    new Vector3(0, 20, 0),
    scene);
  bgCamera.layerMask = 0x10000000;

  const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, null);
  if (advancedTexture.layer?.layerMask) {
    advancedTexture.layer.layerMask = 0x10000000;
  }

  const panel = new GUI.StackPanel();
  panel.width = "300px";
  panel.isVertical = true;
  panel.paddingRight = "20px";
  panel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
  panel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
  advancedTexture.addControl(panel);

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

  addCheckbox(panel, "fxaa", function(value: boolean) {
      defaultPipeline.fxaaEnabled = value;
      rebindValues();
  }, defaultPipeline.fxaaEnabled );

  addCheckbox(panel, "bloom", function(value: boolean) {
    defaultPipeline.bloomEnabled = value;
    rebindValues();
  }, defaultPipeline.bloomEnabled);

  addSlider(panel, "bloom weight", function(value: number) {
      defaultPipeline.bloomWeight = value;
  }, defaultPipeline.bloomWeight, 0, 2, "20px");

  addCheckbox(panel, "image processing", function(value: boolean) {
      defaultPipeline.imageProcessingEnabled = value;
      rebindValues();
  }, defaultPipeline.imageProcessingEnabled);

  addCheckbox(panel, "tone mapping", function(value: boolean) {
      defaultPipeline.imageProcessing.toneMappingEnabled = value;
      toneMappingEnabled = value;
  }, toneMappingEnabled, "20px");

  addCheckbox(panel, "vignette", function(value: boolean) {
      defaultPipeline.imageProcessing.vignetteEnabled = value;
      vignetteEnabled = value;
  }, vignetteEnabled, "20px");

  addCheckbox(panel, "vignette multiply", function(value: boolean) {
      const blendMode = value ? ImageProcessingConfiguration.VIGNETTEMODE_MULTIPLY : ImageProcessingConfiguration.VIGNETTEMODE_OPAQUE;
      defaultPipeline.imageProcessing.vignetteBlendMode = blendMode;
      vignetteBlendMode = blendMode;
  }, vignetteBlendMode === ImageProcessingConfiguration.VIGNETTEMODE_MULTIPLY, "40px");

  addColorPicker(panel, "vignette color", function(value: Color4) {
      defaultPipeline.imageProcessing.vignetteColor = value;
      vignetteColor = value;
  }, vignetteColor, "40px");

  addSlider(panel, "vignette weight", function(value: number) {
      defaultPipeline.imageProcessing.vignetteWeight = value;
      vignetteWeight = value;
  }, vignetteWeight, 0, 10, "40px");

  addCheckbox(panel, "color curves", function(value: boolean) {
      defaultPipeline.imageProcessing.colorCurvesEnabled = value;
      colorCurvesEnabled = value;
  }, colorCurvesEnabled, "20px");

  addSlider(panel, "camera contrast", function(value: number) {
      defaultPipeline.imageProcessing.contrast = value;
      contrast = value;
  }, contrast, 0, 4, "20px");

  addSlider(panel, "camera exposure", function(value: number) {
      defaultPipeline.imageProcessing.exposure = value;
      exposure = value;
  }, exposure, 0, 4, "20px");

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
  window.addEventListener("resize", function () {
    engine.resize();
  });

  return updateTextureContext
}

function addCheckbox(panel: GUI.StackPanel, text: string, func: (value: boolean) => void, initialValue: boolean, left?: string) {
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
  header.color = "white";
  header.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

  if (left) {
    header.left = left;
  }

  panel.addControl(header);
}

function addSlider(panel: GUI.StackPanel, text: string, func: (value: number) => void, initialValue: number, min: number, max: number, left: string) {
  const header = new GUI.TextBlock();
  header.text = text;
  header.height = "30px";
  header.color = "white";
  header.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    panel.addControl(header);
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
    console.log(text, value)
    func(value);
  });

  if (left) {
    slider.paddingLeft = left;
  }

    panel.addControl(slider);
}

function addColorPicker(panel: GUI.StackPanel, text: string, func: (value: Color4) => void, initialValue: Color4, left: string) {
  const header = new GUI.TextBlock();
  header.text = text;
  header.height = "30px";
  header.color = "white";
  header.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    panel.addControl(header);

  if (left) {
    header.left = left;
  }

  const colorPicker = new GUI.ColorPicker();
  colorPicker.value = initialValue as unknown as Color3;
  colorPicker.size = "100px";
  colorPicker.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
  colorPicker.onValueChangedObservable.add(function(value) {
    func(value as unknown as Color4);
  });

  if (left) {
    colorPicker.left = left;
  }

  panel.addControl(colorPicker);
}
