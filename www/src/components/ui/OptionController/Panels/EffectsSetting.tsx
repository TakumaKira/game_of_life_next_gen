import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import type { GLValuesConfigurable } from '@/game-of-life-next-gen';

const Container = styled.div`
`;

export default function EffectsSetting({
  glValuesConfigurable,
  onChangeGlValuesConfigurable,
}: {
  glValuesConfigurable: GLValuesConfigurable
  onChangeGlValuesConfigurable: (value: Partial<GLValuesConfigurable>) => void
}) {
  return (
    <Container>
      <Button onClick={() => onChangeGlValuesConfigurable({ backgroundColor: { r: 255, g: 255, b: 255, a: 1 } })}>Reset Effects</Button>
    </Container>
  )
}