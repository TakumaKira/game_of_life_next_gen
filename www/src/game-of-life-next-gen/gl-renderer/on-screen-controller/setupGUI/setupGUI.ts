import * as GUI from 'babylonjs-gui'
import type { DefaultRenderingPipeline, Scene } from 'babylonjs'
import { ArcRotateCamera, Vector3 } from 'babylonjs'
import { SHOW_ON_SCREEN_CONTROLS } from '@/game-of-life-next-gen/constants';
import { addControls, addTextureControls } from '../addControls';
import buildValues from './buildValues';
import getColorCurve from './getColorCurve';
import getStackPanel from './getStackPanel';
import type { TextureValues } from '@/game-of-life-next-gen/drawer';

export default function setupGUI(scene: Scene, defaultPipeline: DefaultRenderingPipeline, textureValues: TextureValues): { bgCamera: ArcRotateCamera } {
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

  const panel = getStackPanel('300px', true, '20px', GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT, GUI.Control.VERTICAL_ALIGNMENT_CENTER)
  if (SHOW_ON_SCREEN_CONTROLS) {
    advancedTexture.addControl(panel);
  }

  const curve = getColorCurve(200, 80, 80, 20, 80, -80, 2, 80, 40)

  if (defaultPipeline.imageProcessing) {
    defaultPipeline.imageProcessing.colorCurves = curve;
  }

  const values = buildValues(defaultPipeline, scene)
  addControls(panel, defaultPipeline, values, scene)

  addTextureControls(panel, textureValues)

  return { bgCamera }
}
