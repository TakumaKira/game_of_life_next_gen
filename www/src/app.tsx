import React from 'react';
import run from './game-of-life'

const bodyStyle: React.HTMLAttributes<HTMLDivElement>['style'] = {
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
const fpsStyles: React.HTMLAttributes<HTMLDivElement>['style'] = {
  whiteSpace: 'pre',
  fontFamily: 'monospace',
}

const PLAY_PAUSE_BUTTON = 'play-pause'
const FPS_ELEMENT_ID = 'fps'

export default function App() {
  const canvasRef = React.useRef()
  React.useEffect(() => {
    run(canvasRef.current, PLAY_PAUSE_BUTTON, FPS_ELEMENT_ID)
  }, [])
  return (
    <div style={bodyStyle}>
      <button id={PLAY_PAUSE_BUTTON}></button>
      <div id={FPS_ELEMENT_ID} style={fpsStyles}></div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}
