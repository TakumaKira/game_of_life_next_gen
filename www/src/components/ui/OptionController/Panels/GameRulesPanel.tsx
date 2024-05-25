import React from 'react';
import styled from 'styled-components';

export const WIDTH = 720;

const Container = styled.div`
  width: ${_ => WIDTH}px;
`;

export default function GameRulesPanel() {
  return (
    <Container>Game Rules</Container>
  )
}