import React from 'react';
import styled from 'styled-components';

export const TITLE = 'Colors and Effects';

export const WIDTH = 600;

const Container = styled.div`
  width: ${_ => WIDTH}px;
`;

export default function EffectsPanel() {
  return (
    <Container>
      Effects
    </Container>
  )
}