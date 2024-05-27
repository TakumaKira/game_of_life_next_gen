import React from 'react';
import styled from 'styled-components';
import { type OnUpdatePlayingStateFn, getInterface, type OnUpdateFpsDataFn, UniverseConfig, type GLValuesConfigurable, TextureColors, TextureColorsNullable } from '@/game-of-life-next-gen'
import { getController } from '@/hooks';
import { DEFAULT_ALIVE_CELL_BASE, DEFAULT_FIELD_SIZE, DEFAULT_LIFESPAN, DEFAULT_SPEED, GL_VALUES_CONFIGURABLE_DEFAULTS, TEXTURE_COLORS_DEFAULT } from '@/game-of-life-next-gen/constants';
import { ALIVE_CELL_BASE_OPTIONS } from '@/const';
import PlayController from './ui/PlayController';
import OptionController from './ui/OptionController';
import FPSDisplay from './ui/FPSDisplay';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`
const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  outline: none;
`
const playControllerPosition: React.CSSProperties = {
  position: 'relative',
  bottom: 30,
}

export default function App() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false)
  const updatePlayingState = React.useCallback<OnUpdatePlayingStateFn>(isPlaying => {
    setIsPlaying(isPlaying)
  }, [setIsPlaying])
  const [textureColors, setTextureColors] = React.useState<TextureColors>(TEXTURE_COLORS_DEFAULT)
  const [glValuesConfigurable, setGlValuesConfigurable] = React.useState<GLValuesConfigurable>(GL_VALUES_CONFIGURABLE_DEFAULTS)
  const [fpsData, setFpsData] = React.useState<Parameters<OnUpdateFpsDataFn>[0]>()
  const updateFpsData = React.useCallback<OnUpdateFpsDataFn>(fpsData => {
    setFpsData(fpsData)
  }, [setFpsData])
  const [autoStart, setAutoStart] = React.useState<boolean>(true)
  const [showFPS, setShowFPS] = React.useState<boolean>(false)
  const [showWasmLogOnNextFrame, setShowWasmLogOnNextFrame] = React.useState<boolean>(false)
  const [fieldSize, setFieldSize] = React.useState(DEFAULT_FIELD_SIZE)
  const [lifespan, setLifespan] = React.useState(DEFAULT_LIFESPAN)
  const [speed, setSpeed] = React.useState(DEFAULT_SPEED)
  const aliveCellBaseOptions = [...new Array(ALIVE_CELL_BASE_OPTIONS)].map((_, i) => i + 1)
  const [aliveCellBase, setAliveCellBase] = React.useState<{ [number: number]: boolean }>(Object.fromEntries(aliveCellBaseOptions.map(number => [number, DEFAULT_ALIVE_CELL_BASE.includes(number)])))
  const [autoStartOnChangeGameRules, setAutoStartOnChangeGameRules] = React.useState<boolean>(true)
  const universeConfig = React.useMemo<UniverseConfig>(() => ({
    fieldSize, lifespan, speed, aliveCellBase: Object.entries(aliveCellBase).flatMap(([number, isChecked]) => isChecked ? [parseInt(number)] : [])
  }), [fieldSize, lifespan, speed, aliveCellBase])
  const { play, pause, nextFrame, resetCamera, updateColors, updateEffects, destroy, restart } = getController(getInterface, canvasRef, updatePlayingState, updateFpsData, universeConfig, autoStart)
  // Change universe config
  React.useEffect(() => {
    if (destroy === null) {
      return
    }
    destroy?.()
    restart(universeConfig, autoStartOnChangeGameRules)
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
  const onClickRestartButton = () => {
    destroy?.()
    restart(universeConfig, autoStart)
  }
  const onChangeAutoStart = (autoStart: boolean) => {
    setAutoStart(autoStart)
  }
  const onClickResetCamera = () => {
    resetCamera?.()
  }
  const onChangeTextureColors = (value: TextureColorsNullable) => {
    updateColors?.(value)
    setTextureColors(current => {
      const { aliveColors, ...rest } = value || {}
      return { ...current, ...rest, aliveColors: current.aliveColors.map((v, i) => value.aliveColors?.[i] !== undefined ? value.aliveColors?.[i] : v) as [string, string, string] }
    })
  }
  const onChangeGlValuesConfigurable = (value: Partial<GLValuesConfigurable>) => {
    updateEffects?.(value)
    setGlValuesConfigurable(current => ({ ...current, ...value }))
  }
  return (
    <Container>
      <Canvas ref={canvasRef}></Canvas>
      {showFPS && fpsData &&
        <FPSDisplay fpsData={fpsData} />
      }
      <PlayController
        style={{...playControllerPosition}}
        isPlaying={isPlaying}
        onClickPlayPauseButton={onClickPlayPauseButton}
        onClickNextFrameButton={onClickNextFrameButton}
        onClickRestartButton={onClickRestartButton}
        autoStart={autoStart}
        onChangeAutoStart={onChangeAutoStart}
        onClickCameraResetButton={onClickResetCamera}
      />
      <OptionController
        fieldSize={fieldSize}
        onChangeFieldSize={setFieldSize}
        lifespan={lifespan}
        onChangeLifespan={setLifespan}
        speed={speed}
        onChangeSpeed={setSpeed}
        aliveCellBaseOptions={aliveCellBaseOptions}
        aliveCellBase={aliveCellBase}
        onChangeAliveCellBase={setAliveCellBase}
        autoStartOnChangeGameRules={autoStartOnChangeGameRules}
        onChangeAutoStartOnChangeGameRules={setAutoStartOnChangeGameRules}
        textureColors={textureColors}
        onChangeTextureColors={onChangeTextureColors}
        glValuesConfigurable={glValuesConfigurable}
        onChangeGlValuesConfigurable={onChangeGlValuesConfigurable}
        showFPS={showFPS}
        onChangeShowFPS={setShowFPS}
        showWasmLogOnNextFrame={showWasmLogOnNextFrame}
        onChangeShowWasmLogOnNextFrame={setShowWasmLogOnNextFrame}
      />
    </Container>
  );
}
