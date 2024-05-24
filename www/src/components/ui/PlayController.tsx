import React from 'react';
import styled from 'styled-components';
import PlayControllerButtonBase from './PlayControllerButtonBase';
import { PlaySVG, NextFrameSVG, RestartSVG, CheckboxCheckedSVG, CameraResetSVG } from '../SVG';
import PlayControllerButtonTooltip from './PlayControllerButtonTooltip';

const Container = styled.div`
  z-index: 1;
  display: flex;
  gap: 16px;
`
const PlayIcon = PlayControllerButtonBase(PlaySVG)
const NextFrameIcon = PlayControllerButtonBase(NextFrameSVG)
const RestartIcon = PlayControllerButtonBase(RestartSVG)
const CheckboxCheckedIcon = PlayControllerButtonBase(CheckboxCheckedSVG)
const CameraResetIcon = PlayControllerButtonBase(CameraResetSVG)

export default function PlayController({ style }: { style: React.CSSProperties }) {
  return (
    <Container style={style}>
      <PlayControllerButtonTooltip $text="Play">
        <PlayIcon />
      </PlayControllerButtonTooltip>
      <PlayControllerButtonTooltip $text="Next Frame">
        <NextFrameIcon />
      </PlayControllerButtonTooltip>
      <PlayControllerButtonTooltip $text="Restart">      
        <RestartIcon />
      </PlayControllerButtonTooltip>
      <PlayControllerButtonTooltip $text="Autoplay on Restart">
        <CheckboxCheckedIcon />
      </PlayControllerButtonTooltip>
      <PlayControllerButtonTooltip $text="Reset Camera">
        <CameraResetIcon />
      </PlayControllerButtonTooltip>
    </Container>
  )
}
