import { MeshBuilder } from 'babylonjs'
import type { DynamicTexture, ICanvasRenderingContext, Scene, StandardMaterial } from 'babylonjs'
import getMaterialGround from './getMaterialGround';
import getDynamicTexture from './getDynamicTexture';
import type { Color } from '@/game-of-life-next-gen/types';

export default function setupGround(scene: Scene, groundSize: number, groundName: string, dynamicTextureName: string, materialName: string, textureResolution: number, materialColor: Color): { textureGround: DynamicTexture, textureContext: ICanvasRenderingContext, materialGround: StandardMaterial } {
  const ground = MeshBuilder.CreateGround(groundName, {width: groundSize, height: groundSize, subdivisions: 1}, scene);
  const { textureGround, textureContext } = getDynamicTexture(dynamicTextureName, textureResolution, scene)
  const materialGround = getMaterialGround(materialName, scene, textureGround, materialColor);
  ground.material = materialGround;
  return { textureGround, textureContext, materialGround }
}
