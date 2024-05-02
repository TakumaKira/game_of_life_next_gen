import type { ArcRotateCamera, Scene } from 'babylonjs'
import type { OnHoverTextureContextFn } from '../types';

export default function updateHoverState(scene: Scene, camera: ArcRotateCamera, onHoverTextureContext: OnHoverTextureContextFn) {
  const pickResult = scene.pick(scene.pointerX, scene.pointerY, (mesh) => {
    return mesh.isPickable && mesh.isVisible && mesh.isReady()
  }, false, camera)
  if (pickResult.hit && pickResult.pickedPoint) {
    const { _x: x, _z: z } = pickResult.pickedPoint
    onHoverTextureContext({ x, z })
  } else {
    onHoverTextureContext(null)
  }
}
