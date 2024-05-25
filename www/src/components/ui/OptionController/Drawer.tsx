import React from 'react';
import styled from 'styled-components';

export const OPEN_CLOSE_DURATION = 300;

const Container = styled.div<{ width: number }>`
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  backdrop-filter: blur(20px);
  width: ${props => props.width}px;
  transition: width ${_ => OPEN_CLOSE_DURATION * 0.001}s ease-in-out;
`

export default function Drawer({
  children,
  width,
  onClose,
}: {
  children: React.ReactNode
  width: number
  onClose: () => void
}) {
  return (
    <Container width={width}>
      {children}
      {children && <button onClick={onClose}>Close</button>}
    </Container>
  )
}