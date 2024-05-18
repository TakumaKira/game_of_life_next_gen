import React from 'react';
import { type OnUpdatePlayingStateFn, getInterface, type OnUpdateFpsDataFn, UniverseConfig } from '@/game-of-life-next-gen'
import { getController } from '@/hooks';
import { DEFAULT_ALIVE_CELL_BASE, DEFAULT_FIELD_SIZE, DEFAULT_LIFE_SPAN, DEFAULT_SPEED } from '@/game-of-life-next-gen/constants';
import { ALIVE_CELL_BASE_OPTIONS } from '@/const';
import Checkbox from './ui/Checkbox';

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
const onScreenTypographyStyles: React.CSSProperties = {
  whiteSpace: 'pre',
  fontFamily: 'monospace',
  color: '#cccccc',
}
const canvasStyles: React.CSSProperties = {
  width: '100%',
  height: 'calc(100% - 400px)',
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
  const { play, pause, nextFrame, resetCamera, toggleGUIControlsVisibility, destroy, restart } = getController(getInterface, canvasRef, updatePlayingState, updateFpsData)
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
  const onToggleGUIControlsVisibility = () => {
    toggleGUIControlsVisibility?.()
  }
  const onClickRestartButton = () => {
    destroy?.()
    restart(universeConfig, autoStart)
  }
  const [fieldSize, setFieldSize] = React.useState(DEFAULT_FIELD_SIZE)
  const [lifeSpan, setLifeSpan] = React.useState(DEFAULT_LIFE_SPAN)
  const [speed, setSpeed] = React.useState(DEFAULT_SPEED)
  const aliveCellBaseOptions = [...new Array(ALIVE_CELL_BASE_OPTIONS)].map((_, i) => i + 1)
  const [aliveCellBase, setAliveCellBase] = React.useState<{ [number: number]: boolean }>(Object.fromEntries(aliveCellBaseOptions.map(number => [number, DEFAULT_ALIVE_CELL_BASE.includes(number)])))
  const universeConfig = React.useMemo<UniverseConfig>(() => ({
    fieldSize, lifeSpan, speed, aliveCellBase: Object.entries(aliveCellBase).flatMap(([number, isChecked]) => isChecked ? [parseInt(number)] : [])
  }), [fieldSize, lifeSpan, speed, aliveCellBase])
  const onClickChangeFieldSizeAndRestartButton = () => {
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
  const onClickChangeLifeSpanAndRestartButton = () => {
    const lifeSpanInput = prompt('Enter new life span', lifeSpan.toString())
    if (lifeSpanInput === null) {
      return
    }
    const newLifeSpan = parseInt(lifeSpanInput)
    if (isNaN(newLifeSpan)) {
      return
    }
    setLifeSpan(newLifeSpan)
  }
  const onClickChangeSpeedAndRestartButton = () => {
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
      return {...aliveCellBase}
    })
  }
  // Change universe config
  React.useEffect(() => {
    if (destroy === null) {
      return
    }
    destroy?.()
    restart(universeConfig, autoStart)
  }, [universeConfig])
  return (
    <div style={containerStyles}>
      <button style={playStopButtonStyles} onClick={onClickPlayPauseButton} disabled={play === null || pause === null}>
        {playStopButtonLabel}
      </button>
      <button onClick={onClickNextFrameButton} disabled={nextFrame === null}>
        Next Frame
      </button>
      <Checkbox
        id="show-wasm-log"
        label="Show log from WASM on clicking next frame button"
        checked={showWasmLogOnNextFrame}
        onChange={onToggleShowWasmLogOnNextFrame}
        labelStyles={onScreenTypographyStyles}
      />
      <div style={onScreenTypographyStyles}>
        {fpsContents}
      </div>
      <canvas ref={canvasRef} style={canvasStyles}></canvas>
      <button onClick={onClickResetCamera}>
        Reset Camera
      </button>
      <button onClick={onToggleGUIControlsVisibility}>
        Toggle GUI Controls
      </button>
      <button onClick={onClickRestartButton} disabled={destroy === null}>
        Restart
      </button>
      <span style={onScreenTypographyStyles}>
        Current Field Size: {fieldSize}
      </span>
      <button onClick={onClickChangeFieldSizeAndRestartButton} disabled={destroy === null}>
        Change field size and restart
      </button>
      <span style={onScreenTypographyStyles}>
        Current Life Span: {lifeSpan}
      </span>
      <button onClick={onClickChangeLifeSpanAndRestartButton} disabled={destroy === null}>
        Change life span and restart
      </button>
      <span style={onScreenTypographyStyles}>
        Current Speed: {speed}
      </span>
      <button onClick={onClickChangeSpeedAndRestartButton} disabled={destroy === null}>
        Change speed and restart
      </button>
      <Checkbox
        id="auto-play"
        label="Auto play on restart"
        checked={autoStart}
        onChange={onChangeAutoPlay}
        labelStyles={onScreenTypographyStyles}
      />
      <div>
        {aliveCellBaseOptions.map(number => 
          <Checkbox
            key={number.toString()}
            id={number.toString()}
            label={number.toString()}
            checked={aliveCellBase[number]}
            onChange={onChangeAliveCellBase(number)}
            labelStyles={onScreenTypographyStyles}
          />
        )}
      </div>
    </div>
  );
}
