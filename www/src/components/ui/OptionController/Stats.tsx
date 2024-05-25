import React from 'react';
import styled from 'styled-components';

export const WIDTH = 480;

const Container = styled.div`
  width: ${_ => WIDTH}px;
`;

export default function Stats() {
  return (
    <Container>Stats</Container>
  )
}