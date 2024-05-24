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
        <PlayIcon size={42} />
      </PlayControllerButtonTooltip>
      <PlayControllerButtonTooltip $text="Next Frame">
        <NextFrameIcon />
      </PlayControllerButtonTooltip>
      <PlayControllerButtonTooltip $text="Restart">      
        <RestartIcon size={36} />
      </PlayControllerButtonTooltip>
      <PlayControllerButtonTooltip $text="Autoplay on Restart">
        <CheckboxCheckedIcon size={36} />
      </PlayControllerButtonTooltip>
      <PlayControllerButtonTooltip $text="Reset Camera">
        <CameraResetIcon size={36} />
      </PlayControllerButtonTooltip>
    </Container>
  )
}
