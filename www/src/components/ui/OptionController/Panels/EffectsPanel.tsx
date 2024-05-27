import React from 'react';
import styled from 'styled-components';
import ColorsSetting from './ColorsSetting';
import EffectsSetting from './EffectsSetting';
import Scrollable from './Scrollable';
import type { GLValuesConfigurable, TextureColors, TextureColorsNullable } from '@/game-of-life-next-gen';

export const TITLE = 'Colors and Effects';

export const WIDTH = 600;

const Container = styled.div`
`;
const Button = styled.button`
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
  React.useEffect(() => console.log(textureColors), [textureColors])
  React.useEffect(() => console.log(glValuesConfigurable), [glValuesConfigurable])
  return (
    <Container>
      <Scrollable>
        <ColorsSetting />
        <Button onClick={() => onChangeTextureColors({ aliveColors: ['#0000ffff', undefined, undefined] })}>Reset Colors</Button>
        <HR />
        <EffectsSetting />
        <Button onClick={() => onChangeGlValuesConfigurable({ backgroundColor: { r: 255, g: 255, b: 255, a: 1 } })}>Reset Effects</Button>
      </Scrollable>
    </Container>
  )
}