import React from 'react';
import styled from 'styled-components';
import ColorsSetting from './ColorsSetting';
import EffectsSetting from './EffectsSetting';
import Scrollable from './Scrollable';
import type { GLValuesConfigurable, TextureColors, TextureColorsNullable } from '@/game-of-life-next-gen';

export const TITLE = 'Colors and Effects'

export const WIDTH = 520

const Container = styled.div`
  height: 100%;
`
const ScrollableContents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
`
const HR = styled.hr`
  opacity: 0.2;
  margin: 0;
  width: 90%;
  align-self: center;
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
        <ScrollableContents>
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
        </ScrollableContents>
      </Scrollable>
    </Container>
  )
}