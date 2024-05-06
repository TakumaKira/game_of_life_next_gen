import { MeshBuilder } from 'babylonjs'
import type { Color3, DynamicTexture, ICanvasRenderingContext, Scene } from 'babylonjs'
import getMaterialGround from './getMaterialGround';
import getDynamicTexture from './getDynamicTexture';

export default function setupGround(scene: Scene, groundSize: number, groundName: string, dynamicTextureName: string, materialName: string, textureResolution: number, materialColor: Color3): { textureGround: DynamicTexture, textureContext: ICanvasRenderingContext } {
  const ground = MeshBuilder.CreateGround(groundName, {width: groundSize, height: groundSize, subdivisions: 1}, scene);
  const { textureGround, textureContext } = getDynamicTexture(dynamicTextureName, textureResolution, scene)
  const materialGround = getMaterialGround(materialName, scene, textureGround, materialColor);
  ground.material = materialGround;
  return { textureGround, textureContext }
}
