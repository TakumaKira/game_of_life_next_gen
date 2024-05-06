import type { Scene, Vector3 } from 'babylonjs'
import { HemisphericLight } from 'babylonjs'

export default function getLight(name: string, direction: Vector3, scene: Scene, intensity: number): HemisphericLight {
  const light = new HemisphericLight(name, direction, scene);
  light.intensity = intensity;
  return light
}
