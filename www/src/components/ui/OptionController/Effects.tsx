import React from 'react';
import styled from 'styled-components';

export const WIDTH = 600;

const Container = styled.div`
  width: ${_ => WIDTH}px;
`;

export default function Effects() {
  return (
    <Container>Effects</Container>
  )
}