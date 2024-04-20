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

const PLAY_PAUSE_BUTTON_ID = 'play-pause'
const FPS_ELEMENT_ID = 'fps'

export default function App() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  React.useEffect(() => {
    if (!canvasRef.current) {
      return
    }
    run(canvasRef.current, PLAY_PAUSE_BUTTON_ID, FPS_ELEMENT_ID)
  }, [])
  return (
    <div style={bodyStyle}>
      <button id={PLAY_PAUSE_BUTTON_ID} style={buttonStyles}></button>
      <div id={FPS_ELEMENT_ID} style={fpsStyles}></div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}
