export type TextureColors = {
  /** HEX8String */
  gridColor: string;
  /** HEX8String */
  deadColor: string;
  /** [HEX8String, HEX8String, HEX8String] */
  aliveColors: [string, string, string];
}

export type TextureColorsNullable = {
  /** HEX8String */
  gridColor?: string;
  /** HEX8String */
  deadColor?: string;
  /** [HEX8String, HEX8String, HEX8String] */
  aliveColors?: [string?, string?, string?];
}
