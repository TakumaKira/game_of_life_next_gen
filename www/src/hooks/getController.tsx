import React from 'react';
import type { OnUpdatePlayingStateFn, OnUpdateFpsDataFn, getInterface as getInterfaceType, UniverseConfig } from '@/game-of-life-next-gen';

export default function getController(getInterface: typeof getInterfaceType, canvasRef: React.RefObject<HTMLCanvasElement>, updatePlayingState: OnUpdatePlayingStateFn, updateFpsData: OnUpdateFpsDataFn): { play: (() => void) | null, pause: (() => void) | null, nextFrame: (() => void) | null, toggleGUIControlsVisibility: (() => void) | null, destroy: (() => void) | null, restart: (universeConfig?: UniverseConfig) => void } {
  const [play, setPlay] = React.useState<(() => void) | null>(null)
  const [pause, setPause] = React.useState<(() => void) | null>(null)
  const [nextFrame, setNextFrame] = React.useState<(() => void) | null>(null)
  const [toggleGUIControlsVisibility, setToggleGUIControlsVisibility] = React.useState<(() => void) | null>(null)
  const [destroy, setDestroy] = React.useState<(() => void) | null>(null)
  const destroyRef = React.useRef<(() => void) | null>(null)
  const start = React.useCallback((universeConfig?: UniverseConfig) => {
    if (!canvasRef.current) {
      return
    }
    getInterface(canvasRef.current, updatePlayingState, updateFpsData, undefined, universeConfig)
      .then(({ play, pause, nextFrame, toggleGUIControlsVisibility, destroy }) => {
        setPlay(() => play)
        setPause(() => pause)
        setNextFrame(() => nextFrame)
        setToggleGUIControlsVisibility(() => toggleGUIControlsVisibility)
        setDestroy(() => destroy)
        destroyRef.current = destroy
      })
  }, [canvasRef, updatePlayingState, updateFpsData])
  React.useEffect(() => {
    start()
    return () => destroyRef.current?.()
  }, [start])
  const restart = React.useCallback((universeConfig) => {
    destroyRef.current?.()
    start(universeConfig)
  }, [start])
  return { play, pause, nextFrame, toggleGUIControlsVisibility, destroy, restart }
}
