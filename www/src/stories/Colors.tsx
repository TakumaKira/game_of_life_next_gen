import React from 'react';
import styled from 'styled-components';
import Fonts from '../components/Fonts';
import Drawer from '../components/ui/OptionController/Drawer';

const Container = styled.div<{ backgroundColor: string }>`
  height: 100vh;
  background-color: ${props => props.backgroundColor};
`;

export default function Colors({ backgroundColor }: { backgroundColor: string }) {
  return (
    <>
      <Fonts />
      <Container backgroundColor={backgroundColor}>
        <Drawer title="Colors" width={300} onClose={() => {}}>
          <div>Colors</div>
        </Drawer>
      </Container>
    </>
  )
}