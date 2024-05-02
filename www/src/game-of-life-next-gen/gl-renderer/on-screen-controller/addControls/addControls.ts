import * as GUI from 'babylonjs-gui'
import type { DefaultRenderingPipeline, Scene } from 'babylonjs'
import { ImageProcessingConfiguration } from 'babylonjs'
import type { Values } from '../types';
import addCheckbox from './addCheckbox';
import addSlider from './addSlider';
import addColorPicker from './addColorPicker';
import rebindValues from './rebindValues';

export default function addControls(panel: GUI.StackPanel, defaultPipeline: DefaultRenderingPipeline, values: Values, scene: Scene) {
  addColorPicker(panel, "background color", value => {
    scene.clearColor = value;
    values.backgroundColor = value;
  }, values.backgroundColor);

  addCheckbox(panel, "fxaa", value => {
    defaultPipeline.fxaaEnabled = value;
    rebindValues(defaultPipeline, values);
  }, defaultPipeline.fxaaEnabled );

  addCheckbox(panel, "bloom", value => {
    defaultPipeline.bloomEnabled = value;
    rebindValues(defaultPipeline, values);
  }, defaultPipeline.bloomEnabled);

  addSlider(panel, "bloom weight", value => {
    defaultPipeline.bloomWeight = value;
  }, defaultPipeline.bloomWeight, 0, 2, "20px");

  addCheckbox(panel, "image processing", value => {
    defaultPipeline.imageProcessingEnabled = value;
    rebindValues(defaultPipeline, values);
  }, defaultPipeline.imageProcessingEnabled);

  addCheckbox(panel, "tone mapping", value => {
    if (defaultPipeline.imageProcessing) {
      defaultPipeline.imageProcessing.toneMappingEnabled = value;
    }
    values.toneMappingEnabled = value;
  }, values.toneMappingEnabled, "20px");

  addCheckbox(panel, "vignette", value => {
    if (defaultPipeline.imageProcessing) {
      defaultPipeline.imageProcessing.vignetteEnabled = value;
    }
    values.vignetteEnabled = value;
  }, values.vignetteEnabled, "20px");

  addCheckbox(panel, "vignette multiply", value => {
    const blendMode = value ? ImageProcessingConfiguration.VIGNETTEMODE_MULTIPLY : ImageProcessingConfiguration.VIGNETTEMODE_OPAQUE;
    if (defaultPipeline.imageProcessing) {
      defaultPipeline.imageProcessing.vignetteBlendMode = blendMode;
    }
    values.vignetteBlendMode = blendMode;
  }, values.vignetteBlendMode === ImageProcessingConfiguration.VIGNETTEMODE_MULTIPLY, "40px");

  addColorPicker(panel, "vignette color", value => {
    if (defaultPipeline.imageProcessing) {
      defaultPipeline.imageProcessing.vignetteColor = value;
    }
    values.vignetteColor = value;
  }, values.vignetteColor, "40px");

  addSlider(panel, "vignette weight", value => {
    if (defaultPipeline.imageProcessing) {
      defaultPipeline.imageProcessing.vignetteWeight = value;
    }
    values.vignetteWeight = value;
  }, values.vignetteWeight, 0, 10, "40px");

  addCheckbox(panel, "color curves", value => {
    if (defaultPipeline.imageProcessing) {
      defaultPipeline.imageProcessing.colorCurvesEnabled = value;
    }
    values.colorCurvesEnabled = value;
  }, values.colorCurvesEnabled, "20px");

  addSlider(panel, "camera contrast", value => {
    if (defaultPipeline.imageProcessing) {
      defaultPipeline.imageProcessing.contrast = value;
    }
    values.contrast = value;
  }, values.contrast, 0, 4, "20px");

  addSlider(panel, "camera exposure", value => {
    if (defaultPipeline.imageProcessing) {
      defaultPipeline.imageProcessing.exposure = value;
    }
    values.exposure = value;
  }, values.exposure, 0, 4, "20px");
}
