import type { Color3, DynamicTexture, Scene } from 'babylonjs'
import { StandardMaterial } from 'babylonjs'

export default function getMaterialGround(name: string, scene: Scene, textureGround: DynamicTexture, specularColor: Color3): StandardMaterial {
  const materialGround = new StandardMaterial(name, scene);
  materialGround.diffuseTexture = textureGround;
  materialGround.specularColor = specularColor;
  return materialGround
}
