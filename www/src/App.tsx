import React from 'react';
import run from './game-of-life'

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
  const playPauseButtonRef = React.useRef<HTMLButtonElement>(null)
  const nextFrameButtonRef = React.useRef<HTMLButtonElement>(null)
  const fpsRef = React.useRef<HTMLDivElement>(null)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const [runnerPromise, setRunnerPromise] = React.useState<Promise<{ destroy: () => void }> | null>(null)
  const destroy = React.useCallback(() => { runnerPromise?.then(({ destroy }) => destroy()) }, [runnerPromise])
  React.useEffect(() => {
    if (!canvasRef.current || !playPauseButtonRef.current || !nextFrameButtonRef.current || !fpsRef.current) {
      return
    }
    setRunnerPromise(run(canvasRef.current, playPauseButtonRef.current, nextFrameButtonRef.current, fpsRef.current))
    return destroy
  }, [])
  return (
    <div style={containerStyles}>
      <button ref={playPauseButtonRef} style={playStopButtonStyles}></button>
      <button ref={nextFrameButtonRef}>Next Frame</button>
      <div ref={fpsRef} style={fpsDisplayStyles}></div>
      <canvas ref={canvasRef} style={canvasStyles}></canvas>
      <button onClick={destroy}>Destroy</button>
    </div>
  );
}
