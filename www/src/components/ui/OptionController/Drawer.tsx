import React from 'react';
import styled from 'styled-components';

const Container = styled.div<{ width: number }>`
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  backdrop-filter: blur(20px);
  width: ${props => props.width}px;
  transition: width 0.3s ease-in-out;
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