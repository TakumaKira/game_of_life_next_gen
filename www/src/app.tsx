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

export default function App() {
  const canvasRef = React.useRef()
  React.useEffect(() => {
    run(canvasRef.current)
  }, [])
  return (
    <div style={bodyStyle}>
      <button id="play-pause"></button>
      <div id="fps" style={fpsStyles}></div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}
