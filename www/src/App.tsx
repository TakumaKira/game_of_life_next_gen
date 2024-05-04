import React from 'react';
import { getInterface } from '@/game-of-life-next-gen'

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

export default function App() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const [play, setPlay] = React.useState<() => void>()
  const [pause, setPause] = React.useState<() => void>()
  const [nextFrame, setNextFrame] = React.useState<() => void>()
  const [destroy, setDestroy] = React.useState<() => void>()
  const [isPlaying, setIsPlaying] = React.useState<boolean>()
  const updatePlayingState = (isPlaying: boolean) => {
    setIsPlaying(isPlaying)
  }
  const [fpsData, setFpsData] = React.useState<{ fps: number, mean: number, min: number, max: number }>()
  const updateFpsData = (fpsData: { fps: number, mean: number, min: number, max: number }) => {
    setFpsData(fpsData)
  }
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
  React.useEffect(() => {
    if (!canvasRef.current) {
      return
    }
    getInterface(canvasRef.current, updatePlayingState, updateFpsData)
      .then(({ play, pause, nextFrame, destroy }) => {
        setPlay(() => play)
        setPause(() => pause)
        setNextFrame(() => nextFrame)
        setDestroy(() => destroy)
      })
    return destroy
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
  return (
    <div style={containerStyles}>
      <button style={playStopButtonStyles} onClick={onClickPlayPauseButton}>{playStopButtonLabel}</button>
      <button onClick={onClickNextFrameButton}>Next Frame</button>
      <div style={fpsDisplayStyles}>{fpsContents}</div>
      <canvas ref={canvasRef} style={canvasStyles}></canvas>
      <button onClick={destroy}>Destroy</button>
    </div>
  );
}
