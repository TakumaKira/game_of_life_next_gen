import React from 'react'
import styled from "styled-components"

const Container = styled.div`
  max-height: 100%;
  overflow-y: auto;
  scrollbar-color: black;
  padding: 0 56px;
`

export default function Scrollable({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      {children}
    </Container>
  )
}