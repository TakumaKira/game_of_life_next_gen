import React from 'react';
import type { OnUpdateFpsDataFn, getInterface } from '@/game-of-life-next-gen'

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

export default function App({ handleGetInterface }: { handleGetInterface: typeof getInterface}) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const playRef = React.useRef<() => void>()
  const pauseRef = React.useRef<() => void>()
  const nextFrameRef = React.useRef<() => void>()
  const destroyRef = React.useRef<() => void>()
  const [isLibraryLoaded, setIsLibraryLoaded] = React.useState<boolean>(false)
  const [isPlaying, setIsPlaying] = React.useState<boolean>()
  const updatePlayingState = (isPlaying: boolean) => {
    setIsPlaying(isPlaying)
  }
  const [fpsData, setFpsData] = React.useState<Parameters<OnUpdateFpsDataFn>[0]>()
  const updateFpsData: OnUpdateFpsDataFn = fpsData => {
    setFpsData(fpsData)
  }
  const playStopButtonLabel = React.useMemo(() => {
    if (!isLibraryLoaded) {
      return 'Loading...'
    }
    return isPlaying ? '⏸' : '▶️'
  }, [isLibraryLoaded, isPlaying])
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
      throw new Error('Canvas ref not set')
    }
    handleGetInterface(canvasRef.current, updatePlayingState, updateFpsData)
      .then(({ play, pause, nextFrame, destroy }) => {
        playRef.current = play
        pauseRef.current = pause
        nextFrameRef.current = nextFrame
        destroyRef.current = destroy
        setIsLibraryLoaded(true)
      })
    return destroyRef.current
  }, [])
  const onClickPlayPauseButton = () => {
    if (isPlaying) {
      pauseRef.current?.()
    } else {
      playRef.current?.()
    }
  }
  const onClickNextFrameButton = () => {
    nextFrameRef.current?.()
  }
  return (
    <div style={containerStyles}>
      <button style={playStopButtonStyles} onClick={onClickPlayPauseButton} disabled={!isLibraryLoaded}>{playStopButtonLabel}</button>
      <button onClick={onClickNextFrameButton} disabled={!isLibraryLoaded}>Next Frame</button>
      <div style={fpsDisplayStyles}>{fpsContents}</div>
      <canvas ref={canvasRef} style={canvasStyles}></canvas>
      <button onClick={destroyRef.current} disabled={!isLibraryLoaded}>Destroy</button>
    </div>
  );
}
