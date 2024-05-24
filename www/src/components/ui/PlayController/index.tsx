import React from 'react';
import styled from 'styled-components';
import PlayControllerButtonBase from './PlayControllerButtonBase';
import { PlaySVG, PauseSVG, NextFrameSVG, RestartSVG, CheckboxCheckedSVG, CheckboxUncheckedSVG, CameraResetSVG } from '../../SVG';
import PlayControllerButtonTooltip from './PlayControllerButtonTooltip';

const Container = styled.div`
  z-index: 1;
  display: flex;
  gap: 16px;
`
const PlayIcon = PlayControllerButtonBase(PlaySVG)
const PauseIcon = PlayControllerButtonBase(PauseSVG)
const NextFrameIcon = PlayControllerButtonBase(NextFrameSVG)
const RestartIcon = PlayControllerButtonBase(RestartSVG)
const CheckboxCheckedIcon = PlayControllerButtonBase(CheckboxCheckedSVG)
const CheckboxUncheckedIcon = PlayControllerButtonBase(CheckboxUncheckedSVG)
const CameraResetIcon = PlayControllerButtonBase(CameraResetSVG)

export default function PlayController({
  style,
  isPlaying,
  onClickPlayPauseButton,
  onClickNextFrameButton,
  onClickRestartButton,
  autoStart,
  onChangeAutoStart,
  onClickCameraResetButton,
}: {
  style: React.CSSProperties
  isPlaying: boolean
  onClickPlayPauseButton: () => void
  onClickNextFrameButton: () => void
  onClickRestartButton: () => void
  autoStart: boolean
  onChangeAutoStart: (autoStart: boolean) => void
  onClickCameraResetButton: () => void
}) {
  return (
    <Container style={style}>
      <PlayControllerButtonTooltip $text={isPlaying ? "Pause" : "Play"} onClick={onClickPlayPauseButton}>
        {isPlaying ? <PauseIcon size={42} /> : <PlayIcon size={42} />}
      </PlayControllerButtonTooltip>
      <PlayControllerButtonTooltip $text="Next Frame" onClick={onClickNextFrameButton}>
        <NextFrameIcon />
      </PlayControllerButtonTooltip>
      <PlayControllerButtonTooltip $text="Restart" onClick={onClickRestartButton}>      
        <RestartIcon size={36} />
      </PlayControllerButtonTooltip>
      <PlayControllerButtonTooltip $text="Autoplay on Restart" onClick={() => onChangeAutoStart(!autoStart)}>
        {autoStart ? <CheckboxCheckedIcon size={36} /> : <CheckboxUncheckedIcon size={36} />}
      </PlayControllerButtonTooltip>
      <PlayControllerButtonTooltip $text="Reset Camera" onClick={onClickCameraResetButton}>
        <CameraResetIcon size={36} />
      </PlayControllerButtonTooltip>
    </Container>
  )
}
