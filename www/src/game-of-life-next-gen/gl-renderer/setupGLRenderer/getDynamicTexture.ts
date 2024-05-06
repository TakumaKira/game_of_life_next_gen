import { DynamicTexture } from 'babylonjs'
import type { ICanvasRenderingContext, Scene } from 'babylonjs'

export default function getDynamicTexture(name: string, resolution: number, scene: Scene): { textureGround: DynamicTexture, textureContext: ICanvasRenderingContext } {
  const textureGround = new DynamicTexture(name, resolution, scene);
  const textureContext = textureGround.getContext();
  return { textureGround, textureContext }
}
