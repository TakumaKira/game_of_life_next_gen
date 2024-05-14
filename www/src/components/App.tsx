import React from 'react';
import { type OnUpdatePlayingStateFn, getInterface, type OnUpdateFpsDataFn } from '@/game-of-life-next-gen'
import { getController } from '@/hooks';
import { DEFAULT_FIELD_SIZE, DEFAULT_LIFE_SPAN, DEFAULT_SPEED } from '@/game-of-life-next-gen/constants';

const containerStyles: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#222222',
};
const playStopButtonStyles: React.CSSProperties = {
  width: 33,
  height: 28,
}
const fpsDisplayStyles: React.CSSProperties = {
  whiteSpace: 'pre',
  fontFamily: 'monospace',
  color: '#cccccc',
}
const canvasStyles: React.CSSProperties = {
  width: '100%',
  height: 'calc(100% - 300px)',
  outline: 'none',
}

export default function App() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const [isPlaying, setIsPlaying] = React.useState<boolean>()
  const updatePlayingState = React.useCallback<OnUpdatePlayingStateFn>(isPlaying => {
    setIsPlaying(isPlaying)
  }, [setIsPlaying])
  const [fpsData, setFpsData] = React.useState<Parameters<OnUpdateFpsDataFn>[0]>()
  const updateFpsData = React.useCallback<OnUpdateFpsDataFn>(fpsData => {
    setFpsData(fpsData)
  }, [setFpsData])
  const playStopButtonLabel = isPlaying ? '⏸' : '▶️'
  const fpsContents = React.useMemo(() => {
    return fpsData ? `
Frames per Second:
          latest = ${Math.round(fpsData.fps)}
avg of last 100 = ${Math.round(fpsData.mean)}
min of last 100 = ${Math.round(fpsData.min)}
max of last 100 = ${Math.round(fpsData.max)}
`.trim() : ''
  }, [fpsData])
  const { play, pause, nextFrame, toggleGUIControlsVisibility, destroy, restart } = getController(getInterface, canvasRef, updatePlayingState, updateFpsData)
  const onClickPlayPauseButton = () => {
    if (isPlaying) {
      pause?.()
    } else {
      play?.()
    }
  }
  const onClickNextFrameButton = () => {
    nextFrame?.()
  }
  const onToggleGUIControlsVisibility = () => {
    toggleGUIControlsVisibility?.()
  }
  const onClickRestartButton = () => {
    destroy?.()
    restart()
  }
  const [fieldSize, setFieldSize] = React.useState(DEFAULT_FIELD_SIZE)
  const [lifeSpan, setLifeSpan] = React.useState(DEFAULT_LIFE_SPAN)
  const [speed, setSpeed] = React.useState(DEFAULT_SPEED)
  const onClickChangeFieldSizeAndRestartButton = () => {
    const fieldSizeInput = prompt('Enter new field size', fieldSize.toString())
    if (fieldSizeInput === null) {
      return
    }
    const newFieldSize = parseInt(fieldSizeInput)
    if (isNaN(newFieldSize)) {
      return
    }
    setFieldSize(newFieldSize)
  }
  const onClickChangeLifeSpanAndRestartButton = () => {
    const lifeSpanInput = prompt('Enter new life span', lifeSpan.toString())
    if (lifeSpanInput === null) {
      return
    }
    const newLifeSpan = parseInt(lifeSpanInput)
    if (isNaN(newLifeSpan)) {
      return
    }
    setLifeSpan(newLifeSpan)
  }
  const onClickChangeSpeedAndRestartButton = () => {
    const speedInput = prompt('Enter new speed', speed.toString())
    if (speedInput === null) {
      return
    }
    const newSpeed = parseInt(speedInput)
    if (isNaN(newSpeed)) {
      return
    }
    setSpeed(newSpeed)
  }
  // Change universe config
  React.useEffect(() => {
    destroy?.()
    restart({ fieldSize, lifeSpan, speed })
  }, [fieldSize, lifeSpan, speed])
  return (
    <div style={containerStyles}>
      <button style={playStopButtonStyles} onClick={onClickPlayPauseButton} disabled={play === null || pause === null}>{playStopButtonLabel}</button>
      <button onClick={onClickNextFrameButton} disabled={nextFrame === null}>Next Frame</button>
      <div style={fpsDisplayStyles}>{fpsContents}</div>
      <canvas ref={canvasRef} style={canvasStyles}></canvas>
      <button onClick={onToggleGUIControlsVisibility}>Toggle GUI Controls</button>
      <button onClick={onClickRestartButton} disabled={destroy === null}>Restart</button>
      <button onClick={onClickChangeFieldSizeAndRestartButton} disabled={destroy === null}>Change field size and restart</button>
      <button onClick={onClickChangeLifeSpanAndRestartButton} disabled={destroy === null}>Change life span and restart</button>
      <button onClick={onClickChangeSpeedAndRestartButton} disabled={destroy === null}>Change speed and restart</button>
    </div>
  );
}
