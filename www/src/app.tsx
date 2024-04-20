import React from 'react';
import run from './game-of-life'

const bodyStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};
const buttonStyles: React.CSSProperties = {
  width: 33,
  height: 28,
}
const fpsStyles: React.CSSProperties = {
  whiteSpace: 'pre',
  fontFamily: 'monospace',
}

export default function App() {
  const playPauseButtonRef = React.useRef<HTMLButtonElement>(null)
  const fpsRef = React.useRef<HTMLDivElement>(null)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const [runnerPromise, setRunnerPromise] = React.useState<Promise<{ destroy: () => void }> | null>(null)
  const destroy = React.useCallback(() => { runnerPromise?.then(({ destroy }) => destroy()) }, [runnerPromise])
  React.useEffect(() => {
    if (!canvasRef.current || !playPauseButtonRef.current || !fpsRef.current) {
      return
    }
    setRunnerPromise(run(canvasRef.current, playPauseButtonRef.current, fpsRef.current))
    return destroy
  }, [])
  return (
    <div style={bodyStyle}>
      <button ref={playPauseButtonRef} style={buttonStyles}></button>
      <div ref={fpsRef} style={fpsStyles}></div>
      <canvas ref={canvasRef}></canvas>
      <button onClick={destroy}>Destroy</button>
    </div>
  );
}
