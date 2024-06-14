import React from 'react';
import type { OnUpdatePlayingStateFn, OnUpdateFpsDataFn, getInterface as getInterfaceType, UniverseConfig, GLValuesConfigurable, TextureColorsNullable } from '@/game-of-life-next-gen';

export default function getController(getInterface: typeof getInterfaceType, canvasRef: React.RefObject<HTMLCanvasElement>, updatePlayingState: OnUpdatePlayingStateFn, updateFpsData: OnUpdateFpsDataFn, initialUniverseConfig?: UniverseConfig, initialAutoStart?: boolean): { play: (() => void) | null, pause: (() => void) | null, nextFrame: ((showLog?: boolean) => void) | null, resetCamera: (() => void) | null, updateColors: ((value: TextureColorsNullable) => void) | null, updateEffects: ((value: Partial<GLValuesConfigurable>) => void) | null, destroy: (() => void) | null, restart: (universeConfig?: UniverseConfig, autoStart?: boolean) => void } {
  const [play, setPlay] = React.useState<(() => void) | null>(null)
  const [pause, setPause] = React.useState<(() => void) | null>(null)
  const [nextFrame, setNextFrame] = React.useState<((showLog?: boolean) => void) | null>(null)
  const [resetCamera, setResetCamera] = React.useState<(() => void) | null>(null)
  const [updateColors, setUpdateColors] = React.useState<((value: TextureColorsNullable) => void) | null>(null)
  const [updateEffects, setUpdateEffects] = React.useState<((value: Partial<GLValuesConfigurable>) => void) | null>(null)
  const [destroy, setDestroy] = React.useState<(() => void) | null>(null)
  const destroyRef = React.useRef<(() => void) | null>(null)
  const start = React.useCallback((universeConfig?: UniverseConfig, autoStart?: boolean) => {
    if (!canvasRef.current) {
      return
    }
    getInterface(canvasRef.current, updatePlayingState, updateFpsData, autoStart, universeConfig)
      .then(({ play, pause, nextFrame, resetCamera, updateColors, updateEffects, destroy }) => {
        setPlay(() => play)
        setPause(() => pause)
        setNextFrame(() => nextFrame)
        setResetCamera(() => resetCamera)
        setUpdateColors(() => updateColors)
        setUpdateEffects(() => updateEffects)
        setDestroy(() => destroy)
        destroyRef.current = destroy
      })
  }, [canvasRef, updatePlayingState, updateFpsData])
  React.useEffect(() => {
    start(initialUniverseConfig, initialAutoStart)
    return () => destroyRef.current?.()
  }, [])
  const restart = React.useCallback((universeConfig, autoStart) => {
    destroyRef.current?.()
    start(universeConfig, autoStart)
  }, [start])
  return { play, pause, nextFrame, resetCamera, updateColors, updateEffects, destroy, restart }
}
