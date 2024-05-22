import React from 'react';
import { type OnUpdatePlayingStateFn, getInterface, type OnUpdateFpsDataFn, UniverseConfig } from '@/game-of-life-next-gen'
import { getController } from '@/hooks';
import { DEFAULT_ALIVE_CELL_BASE, DEFAULT_FIELD_SIZE, DEFAULT_LIFESPAN, DEFAULT_SPEED } from '@/game-of-life-next-gen/constants';
import { ALIVE_CELL_BASE_OPTIONS } from '@/const';

const containerStyles: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
};
const canvasStyles: React.CSSProperties = {
  width: '100%',
  height: '100%',
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
  const [autoStart, setAutoStart] = React.useState<boolean>(true)
  const [showWasmLogOnNextFrame, setShowWasmLogOnNextFrame] = React.useState<boolean>(true)
  const [fieldSize, setFieldSize] = React.useState(DEFAULT_FIELD_SIZE)
  const [lifespan, setLifespan] = React.useState(DEFAULT_LIFESPAN)
  const [speed, setSpeed] = React.useState(DEFAULT_SPEED)
  const aliveCellBaseOptions = [...new Array(ALIVE_CELL_BASE_OPTIONS)].map((_, i) => i + 1)
  const [aliveCellBase, setAliveCellBase] = React.useState<{ [number: number]: boolean }>(Object.fromEntries(aliveCellBaseOptions.map(number => [number, DEFAULT_ALIVE_CELL_BASE.includes(number)])))
  const universeConfig = React.useMemo<UniverseConfig>(() => ({
    fieldSize, lifespan, speed, aliveCellBase: Object.entries(aliveCellBase).flatMap(([number, isChecked]) => isChecked ? [parseInt(number)] : [])
  }), [fieldSize, lifespan, speed, aliveCellBase])
  const { play, pause, nextFrame, resetCamera, toggleGUIControlsVisibility, destroy, restart } = getController(getInterface, canvasRef, updatePlayingState, updateFpsData, universeConfig, autoStart)
  // Change universe config
  React.useEffect(() => {
    if (destroy === null) {
      return
    }
    destroy?.()
    restart(universeConfig, autoStart)
  }, [universeConfig])
  const onClickPlayPauseButton = () => {
    if (isPlaying) {
      pause?.()
    } else {
      play?.()
    }
  }
  const onClickNextFrameButton = () => {
    nextFrame?.(showWasmLogOnNextFrame)
  }
  const onToggleShowWasmLogOnNextFrame: React.ChangeEventHandler<HTMLInputElement> = e => {
    setShowWasmLogOnNextFrame(e.target.checked)
  }
  const onClickResetCamera = () => {
    resetCamera?.()
  }
  const onClickRestartButton = () => {
    destroy?.()
    restart(universeConfig, autoStart)
  }
  const onClickChangeFieldSizeButton = () => {
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
  const onClickChangeLifespanButton = () => {
    const lifespanInput = prompt('Enter new lifespan', lifespan.toString())
    if (lifespanInput === null) {
      return
    }
    const newLifespan = parseInt(lifespanInput)
    if (isNaN(newLifespan)) {
      return
    }
    setLifespan(newLifespan)
  }
  const onClickChangeSpeedButton = () => {
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
  const onChangeAutoPlay: React.ChangeEventHandler<HTMLInputElement> = e => {
    setAutoStart(e.target.checked)
  }
  const onChangeAliveCellBase = (index: number): React.ChangeEventHandler<HTMLInputElement> => e => {
    setAliveCellBase(aliveCellBase => {
      aliveCellBase[index] = e.target.checked
      return ({...aliveCellBase})
    })
  }
  return (
    <div style={containerStyles}>
      <canvas ref={canvasRef} style={canvasStyles}></canvas>
    </div>
  );
}
