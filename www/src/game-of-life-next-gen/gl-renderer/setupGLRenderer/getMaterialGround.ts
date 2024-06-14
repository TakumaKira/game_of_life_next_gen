import type { Color } from '@/game-of-life-next-gen/types';
import type { DynamicTexture, Scene } from 'babylonjs'
import { StandardMaterial } from 'babylonjs'
import { toColor3 } from '../utils';

export default function getMaterialGround(name: string, scene: Scene, textureGround: DynamicTexture, specularColor: Color): StandardMaterial {
  const materialGround = new StandardMaterial(name, scene);
  materialGround.diffuseTexture = textureGround;
  materialGround.specularColor = toColor3(specularColor);
  return materialGround
}
