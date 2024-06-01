import React from 'react'
import styled from 'styled-components';
import type { Color, GLValuesConfigurable, TextureColors, TextureColorsNullable } from '@/game-of-life-next-gen';
import Button from './Button';
import { SCENE_BACKGROUND_COLOR_DEFAULT, TEXTURE_COLORS_DEFAULT, TEXTURE_SPECULAR_COLOR_DEFAULT } from '@/game-of-life-next-gen/constants';
import RadioSelector from './RadioSelector';
import type { RadioSelectorOption } from './RadioSelector/types';
import ColorPicker from './ColorPicker';

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

const keyOptions: RadioSelectorOption[] = [
  { key: 'backgroundColor', label: 'Background' },
  { key: 'specularColor', label: 'Texture Specular' },
  { key: 'gridColor', label: 'Grid' },
  { key: 'youngColor', label: 'Young Cell' },
  { key: 'middleColor', label: 'Middle Cell' },
  { key: 'elderColor', label: 'Elder Cell'},
  { key: 'deadColor', label: 'Dead Cell' },
]

export default function ColorsSetting({
  textureColors,
  onChangeTextureColors,
  glValuesConfigurable,
  onChangeGlValuesConfigurable,
}: {
  textureColors: TextureColors
  onChangeTextureColors: (value: TextureColorsNullable) => void
  glValuesConfigurable: GLValuesConfigurable
  onChangeGlValuesConfigurable: (value: Partial<GLValuesConfigurable>) => void
}) {
  const [selectedKey, setSelectedKey] = React.useState<string>(keyOptions[0].key)
  const [colorValue, setColorValue] = React.useState<{color: Color} | {hex8String: string}>({color: glValuesConfigurable.backgroundColor})
  React.useEffect(() => {
    switch (selectedKey) {
      case 'backgroundColor':
        setColorValue({color: glValuesConfigurable.backgroundColor})
        break
      case 'specularColor':
        setColorValue({color: glValuesConfigurable.specularColor})
        break
      case 'gridColor':
        setColorValue({hex8String: textureColors.gridColor})
        break
      case 'youngColor':
        setColorValue({hex8String: textureColors.aliveColors[0]})
        break
      case 'middleColor':
        setColorValue({hex8String: textureColors.aliveColors[1]})
        break
      case 'elderColor':
        setColorValue({hex8String: textureColors.aliveColors[2]})
        break
      case 'deadColor':
        setColorValue({hex8String: textureColors.deadColor})
        break
    }
  }, [selectedKey])
  const onChangeKey = (selectedKey: string) => {
    setSelectedKey(selectedKey)
  }
  const onChangeColor = React.useCallback(({ color, hex8String }: { color: Color, hex8String: string }) => {
    switch (selectedKey) {
      case 'backgroundColor':
        onChangeGlValuesConfigurable({ backgroundColor: color })
        break
      case 'specularColor':
        onChangeGlValuesConfigurable({ specularColor: color })
        break
      case 'gridColor':
        onChangeTextureColors({ gridColor: hex8String })
        break
      case 'youngColor':
        onChangeTextureColors({ aliveColors: [hex8String, undefined, undefined] })
        break
      case 'middleColor':
        onChangeTextureColors({ aliveColors: [undefined, hex8String, undefined] })
        break
      case 'elderColor':
        onChangeTextureColors({ aliveColors: [undefined, undefined, hex8String] })
        break
      case 'deadColor':
        onChangeTextureColors({ deadColor: hex8String })
        break
    }
  }, [selectedKey, onChangeGlValuesConfigurable, onChangeTextureColors])
  const onClickResetSelected = () => {
    switch (selectedKey) {
      case 'backgroundColor':
        onChangeGlValuesConfigurable({ backgroundColor: SCENE_BACKGROUND_COLOR_DEFAULT })
        setColorValue({color: SCENE_BACKGROUND_COLOR_DEFAULT})
        break
      case 'specularColor':
        onChangeGlValuesConfigurable({ specularColor: TEXTURE_SPECULAR_COLOR_DEFAULT })
        setColorValue({color: TEXTURE_SPECULAR_COLOR_DEFAULT})
        break
      case 'gridColor':
        onChangeTextureColors({ gridColor: TEXTURE_COLORS_DEFAULT.gridColor })
        setColorValue({hex8String: TEXTURE_COLORS_DEFAULT.gridColor})
        break
      case 'youngColor':
        onChangeTextureColors({ aliveColors: [TEXTURE_COLORS_DEFAULT.aliveColors[0], undefined, undefined] })
        setColorValue({hex8String: TEXTURE_COLORS_DEFAULT.aliveColors[0]})
        break
      case 'middleColor':
        onChangeTextureColors({ aliveColors: [undefined, TEXTURE_COLORS_DEFAULT.aliveColors[1], undefined] })
        setColorValue({hex8String: TEXTURE_COLORS_DEFAULT.aliveColors[1]})
        break
      case 'elderColor':
        onChangeTextureColors({ aliveColors: [undefined, undefined, TEXTURE_COLORS_DEFAULT.aliveColors[2]] })
        setColorValue({hex8String: TEXTURE_COLORS_DEFAULT.aliveColors[2]})
        break
      case 'deadColor':
        onChangeTextureColors({ deadColor: TEXTURE_COLORS_DEFAULT.deadColor })
        setColorValue({hex8String: TEXTURE_COLORS_DEFAULT.deadColor})
        break
    }
  }
  const onClickResetAll = () => {
    onChangeGlValuesConfigurable({
      backgroundColor: SCENE_BACKGROUND_COLOR_DEFAULT,
      specularColor: TEXTURE_SPECULAR_COLOR_DEFAULT,
    })
    onChangeTextureColors({
      gridColor: TEXTURE_COLORS_DEFAULT.gridColor,
      deadColor: TEXTURE_COLORS_DEFAULT.deadColor,
      aliveColors: [...TEXTURE_COLORS_DEFAULT.aliveColors],
    })
    switch (selectedKey) {
      case 'backgroundColor':
        setColorValue({color: SCENE_BACKGROUND_COLOR_DEFAULT})
        break
      case 'specularColor':
        setColorValue({color: TEXTURE_SPECULAR_COLOR_DEFAULT})
        break
      case 'gridColor':
        setColorValue({hex8String: TEXTURE_COLORS_DEFAULT.gridColor})
        break
      case 'youngColor':
        setColorValue({hex8String: TEXTURE_COLORS_DEFAULT.aliveColors[0]})
        break
      case 'middleColor':
        setColorValue({hex8String: TEXTURE_COLORS_DEFAULT.aliveColors[1]})
        break
      case 'elderColor':
        setColorValue({hex8String: TEXTURE_COLORS_DEFAULT.aliveColors[2]})
        break
      case 'deadColor':
        setColorValue({hex8String: TEXTURE_COLORS_DEFAULT.deadColor})
        break
    }
  }
  return (
    <Container>
      <Upper>
        <RadioSelector selectedKey={selectedKey} options={keyOptions} onChange={onChangeKey} />
        <ColorPicker id="color-setting-color-picker" value={colorValue} onChange={onChangeColor} />
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