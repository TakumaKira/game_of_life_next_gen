import * as GUI from 'babylonjs-gui'
import type { DefaultRenderingPipeline, Scene } from 'babylonjs'
import { ArcRotateCamera, ColorCurves, Vector3 } from 'babylonjs'
import { SHOW_EFFECT_CONTROLS } from '@/game-of-life-next-gen/constants';
import type { Values } from './types';
import { addControls } from './addControls';

export default function setupGUI(scene: Scene, defaultPipeline: DefaultRenderingPipeline): { bgCamera: ArcRotateCamera } {
  const bgCamera = new ArcRotateCamera(
    "BGCamera", Math.PI / 2 + Math.PI / 7, Math.PI / 2, 100,
    new Vector3(0, 20, 0),
    scene
  );
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
  if (SHOW_EFFECT_CONTROLS) {
    advancedTexture.addControl(panel);
  }

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

  if (defaultPipeline.imageProcessing) {
    defaultPipeline.imageProcessing.colorCurves = curve;
  }

  const values: Values = {
    toneMappingEnabled: defaultPipeline.imageProcessing?.toneMappingEnabled,
    vignetteEnabled: defaultPipeline.imageProcessing?.vignetteEnabled,
    vignetteColor: defaultPipeline.imageProcessing?.vignetteColor,
    vignetteWeight: defaultPipeline.imageProcessing?.vignetteWeight,
    vignetteBlendMode: defaultPipeline.imageProcessing?.vignetteBlendMode,
    colorCurvesEnabled: defaultPipeline.imageProcessing?.colorCurvesEnabled,
    contrast: defaultPipeline.imageProcessing?.contrast,
    exposure: defaultPipeline.imageProcessing?.exposure,
    curve: defaultPipeline.imageProcessing.colorCurves,
  }

  addControls(panel, defaultPipeline, values)

  return { bgCamera }
}
