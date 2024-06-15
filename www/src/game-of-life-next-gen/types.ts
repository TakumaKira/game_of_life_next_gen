export type UniverseConfig = {
  fieldSize?: number;
  lifespan?: number;
  speed?: number;
  aliveCellBase?: number[];
  useJSVersion?: boolean;
}

export type Color = {
  /** 0 - 255 */
  r: number;
  /** 0 - 255 */
  g: number;
  /** 0 - 255 */
  b: number;
  /** 0 - 1 */
  a: number;
}
