import React from 'react'
import styled from 'styled-components';
import type { Color, GLValuesConfigurable, TextureColors, TextureColorsNullable } from '@/game-of-life-next-gen';
import Button from '../../Button';
import { TEXTURE_COLORS_DEFAULT } from '@/game-of-life-next-gen/constants';
import RadioSelector from '../../RadioSelector';
import ColorPicker from '../../ColorPicker';
import ColorManagers, { type ColorManagerKeys } from './ColorManagers';
import { DEFAULT_GL_COLORS, DEFAULT_TEXTURE_COLORS, keyOptions } from './const';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
`
const Upper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`
const Lower = styled.div`
  display: flex;
  gap: 18px;
`

export default function ColorsSetting({
  textureColors,
  onChangeTextureColors,
  glValuesConfigurable,
  onChangeGlValuesConfigurable,
}: {
  textureColors: TextureColors
  onChangeTextureColors: (value: TextureColorsNullable) => void
  glValuesConfigurable: Pick<GLValuesConfigurable, 'backgroundColor' | 'specularColor'>
  onChangeGlValuesConfigurable: (value: Partial<GLValuesConfigurable>) => void
}) {
  const [selectedKey, setSelectedKey] = React.useState<ColorManagerKeys>(keyOptions[0].key as ColorManagerKeys)
  const [selectedColorValue, setSelectedColorValue] = React.useState<{color: Color} | {hex8String: string}>({color: glValuesConfigurable.backgroundColor})
  React.useEffect(() => {
    ColorManagers[selectedKey].setPickerColor({ setSelectedColorValue, glColors: glValuesConfigurable, textureColors })
  }, [selectedKey])
  const onChangeKey = (selectedKey: string) => {
    setSelectedKey(selectedKey as ColorManagerKeys)
  }
  const onChangeColor = React.useCallback(({ color, hex8String }: { color: Color, hex8String: string }) => {
    ColorManagers[selectedKey].updateColorValue({ onChangeGlValuesConfigurable, onChangeTextureColors, color, hex8String })
  }, [selectedKey, onChangeGlValuesConfigurable, onChangeTextureColors])
  const onClickResetSelected = () => {
    ColorManagers[selectedKey].updateColorValue({ onChangeGlValuesConfigurable, onChangeTextureColors, color: (DEFAULT_GL_COLORS as { [key in ColorManagerKeys]?: Color })[selectedKey]!, hex8String: (DEFAULT_TEXTURE_COLORS as { [key in ColorManagerKeys]?: string })[selectedKey]! })
    ColorManagers[selectedKey].setPickerColor({ setSelectedColorValue, glColors: DEFAULT_GL_COLORS, textureColors: TEXTURE_COLORS_DEFAULT })
  }
  const onClickResetAll = () => {
    onChangeGlValuesConfigurable(DEFAULT_GL_COLORS)
    onChangeTextureColors(TEXTURE_COLORS_DEFAULT)
    ColorManagers[selectedKey].setPickerColor({ setSelectedColorValue, glColors: DEFAULT_GL_COLORS, textureColors: TEXTURE_COLORS_DEFAULT })
  }
  return (
    <Container>
      <Upper>
        <RadioSelector selectedKey={selectedKey} options={keyOptions} onChange={onChangeKey} />
        <ColorPicker id="color-setting-color-picker" value={selectedColorValue} onChange={onChangeColor} />
      </Upper>
      <Lower>
        <Button onClick={onClickResetSelected} $width={180} $height={28}>
          Reset Selected Color
        </Button>
        <Button onClick={onClickResetAll} $width={180} $height={28}>
          Reset All Colors
        </Button>
      </Lower>
    </Container>
  )
}