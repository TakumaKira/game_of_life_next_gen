import React from 'react';
import styled from 'styled-components';
import PlayControllerButtonBase from './PlayControllerButtonBase';
import { PlaySVG, NextFrameSVG, RestartSVG, CheckboxCheckedSVG, CameraResetSVG } from '../SVG';

const Container = styled.div`
  z-index: 1;
  display: flex;
  gap: 16px;
`
const Tooltip = ({ children, tooltip }: { children: React.ReactNode, tooltip: string }) => {
  return (
    <div>
      <span style={{ color: 'white', fontFamily: 'Play' }}>
        {tooltip}
      </span>
      {children}
    </div>
  )
}
const PlayIcon = PlayControllerButtonBase(PlaySVG)
const PlayButton = () =>
<Tooltip tooltip="Play">
  <PlayIcon />
</Tooltip>
const NextFrameIcon = PlayControllerButtonBase(NextFrameSVG)
const RestartIcon = PlayControllerButtonBase(RestartSVG)
const CheckboxCheckedIcon = PlayControllerButtonBase(CheckboxCheckedSVG)
const CameraResetIcon = PlayControllerButtonBase(CameraResetSVG)

export default function PlayController({ style }: { style: React.CSSProperties }) {
  return (
    <Container style={style}>
      <PlayButton />
      <NextFrameIcon />
      <RestartIcon />
      <CheckboxCheckedIcon />
      <CameraResetIcon />
    </Container>
  )
}
