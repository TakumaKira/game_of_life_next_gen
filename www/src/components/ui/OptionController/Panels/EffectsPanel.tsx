import React from 'react';
import styled from 'styled-components';
import ColorsSetting from './ColorsSetting';
import EffectsSetting from './EffectsSetting';
import Scrollable from './Scrollable';
import type { GLValuesConfigurable, TextureColors, TextureColorsNullable } from '@/game-of-life-next-gen';

export const TITLE = 'Colors and Effects'

export const WIDTH = 600

const Container = styled.div`
`
const HR = styled.hr`
`

export default function EffectsPanel({
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
  return (
    <Container>
      <Scrollable>
        <ColorsSetting
          textureColors={textureColors}
          onChangeTextureColors={onChangeTextureColors}
          glValuesConfigurable={glValuesConfigurable}
          onChangeGlValuesConfigurable={onChangeGlValuesConfigurable}
        />
        <HR />
        <EffectsSetting
          glValuesConfigurable={glValuesConfigurable}
          onChangeGlValuesConfigurable={onChangeGlValuesConfigurable}
        />
      </Scrollable>
    </Container>
  )
}