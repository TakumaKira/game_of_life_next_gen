import React from 'react';
import type { OnUpdateFpsDataFn, OnUpdatePlayingStateFn } from '@/game-of-life-next-gen'

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
  height: 'calc(100% - 200px)',
  outline: 'none',
}

export default function GameOfLife({ getController, play, pause, nextFrame, destroy }: { getController: (canvas: HTMLCanvasElement, updatePlayingState: OnUpdatePlayingStateFn, updateFpsData: OnUpdateFpsDataFn) => void, play: (() => void) | null, pause: (() => void) | null, nextFrame: (() => void) | null, destroy: (() => void) | null}) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const [isPlaying, setIsPlaying] = React.useState<boolean>()
  const [fpsData, setFpsData] = React.useState<Parameters<OnUpdateFpsDataFn>[0]>()
  const playStopButtonLabel = React.useMemo(() => {
    if (play === null || pause === null) {
      return ''
    }
    return isPlaying ? '⏸' : '▶️'
  }, [isPlaying])
  const fpsContents = React.useMemo(() => {
    return fpsData ? `
Frames per Second:
          latest = ${Math.round(fpsData.fps)}
avg of last 100 = ${Math.round(fpsData.mean)}
min of last 100 = ${Math.round(fpsData.min)}
max of last 100 = ${Math.round(fpsData.max)}
`.trim() : ''
  }, [fpsData])
  const updatePlayingState: OnUpdatePlayingStateFn = isPlaying => {
    setIsPlaying(isPlaying)
  }
  const updateFpsData: OnUpdateFpsDataFn = fpsData => {
    setFpsData(fpsData)
  }
  React.useEffect(() => {
    if (!canvasRef.current) {
      throw new Error('Canvas ref not set')
    }
    getController(canvasRef.current, updatePlayingState, updateFpsData)
    return () => destroy?.()
  }, [])
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
  const onClickDestroyButton = () => {
    destroy?.()
  }
  return (
    <div style={containerStyles}>
      <button style={playStopButtonStyles} onClick={onClickPlayPauseButton} disabled={play === null || pause === null}>{playStopButtonLabel}</button>
      <button onClick={onClickNextFrameButton} disabled={nextFrame === null}>Next Frame</button>
      <div style={fpsDisplayStyles}>{fpsContents}</div>
      <canvas ref={canvasRef} style={canvasStyles}></canvas>
      <button onClick={onClickDestroyButton} disabled={destroy === null}>Destroy</button>
    </div>
  );
}
