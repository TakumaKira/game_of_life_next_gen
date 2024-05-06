import { Scene } from 'babylonjs'
import type { Color4, Engine } from 'babylonjs'

export default function getScene(engine: Engine, clearColor: Color4): Scene {
  const scene = new Scene(engine);
  scene.clearColor = clearColor;
  return scene
}
