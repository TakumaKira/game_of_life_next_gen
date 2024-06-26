import React from "react";
import styled from 'styled-components';
import type { OnUpdateFpsDataFn } from "@/game-of-life-next-gen";
import Data from "./Data";

const Container = styled.div`
  position: absolute;
  top: 18px;
  left: 18px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: flex-end;
  font-size: 18px;
  color: #b7b7b799;
`
const Title = styled.span`
  font-size: 21px;
`
const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

export default function FPSDisplay({ fpsData }: { fpsData: Parameters<OnUpdateFpsDataFn>[0] }) {
  return (
    <Container>
      <Title>Frames per Second</Title>
      <DataContainer>
        <Data label="Latest" value={fpsData.fps} />
        <Data label="Avg of last 100" value={fpsData.mean} />
        <Data label="Min of last 100" value={fpsData.min} />
        <Data label="Max of last 100" value={fpsData.max} />
      </DataContainer>
    </Container>
  )
}