import type { Color, GLValuesConfigurable, TextureColors, TextureColorsNullable } from "@/game-of-life-next-gen";

export default interface IColorManager {
  key: string;
  label: string;
  setPickerColor: (args: { setSelectedColorValue: (value: { color: Color} | { hex8String: string }) => void, glColors: Pick<GLValuesConfigurable, 'backgroundColor' | 'specularColor'>, textureColors: TextureColors }) => void;
  updateColorValue: (args: {onChangeTextureColors: (value: TextureColorsNullable) => void, onChangeGlValuesConfigurable: (value: Partial<GLValuesConfigurable>) => void, color: Color, hex8String: string}) => void;
}