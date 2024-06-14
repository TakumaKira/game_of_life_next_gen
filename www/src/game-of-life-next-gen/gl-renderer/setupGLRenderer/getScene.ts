import type { Color } from '@/game-of-life-next-gen/types';
import { Scene } from 'babylonjs'
import type { Engine } from 'babylonjs'
import { toColor4 } from '../utils';

export default function getScene(engine: Engine, clearColor: Color): Scene {
  const scene = new Scene(engine);
  scene.clearColor = toColor4(clearColor);
  return scene
}
