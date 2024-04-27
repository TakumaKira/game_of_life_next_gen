import React from 'react'
import run from './default-rendering-pipeline-example'

const bodyStyle: React.CSSProperties = {
  width: '100%',
  height: '90vh',
};
const canvasStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
};

export default function DefaultRenderingPipelineExample() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  React.useEffect(() => {
    if (!canvasRef.current) {
      return
    }
    run(canvasRef.current)
  }, [])
  return (
    <div style={bodyStyle}>
      <canvas ref={canvasRef} style={canvasStyle}></canvas>
    </div>
  )
}
