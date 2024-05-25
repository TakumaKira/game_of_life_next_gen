import React from 'react';
import styled from 'styled-components';
import ColorsSetting from './ColorsSetting';
import EffectsSetting from './EffectsSetting';
import Scrollable from './Scrollable';

export const TITLE = 'Colors and Effects';

export const WIDTH = 600;

const Container = styled.div`
`;
const Button = styled.button`
`
const HR = styled.hr`
`

export default function EffectsPanel() {
  return (
    <Container>
      <Scrollable>
        <ColorsSetting />
        <Button>Reset Colors</Button>
        <HR />
        <EffectsSetting />
        <Button>Reset Effects</Button>
      </Scrollable>
    </Container>
  )
}