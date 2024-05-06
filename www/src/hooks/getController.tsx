import React from 'react';
import type { OnUpdatePlayingStateFn, OnUpdateFpsDataFn, getInterface as getInterfaceType } from '@/game-of-life-next-gen';

export default function getController(getInterface: typeof getInterfaceType, canvasRef: React.RefObject<HTMLCanvasElement>, updatePlayingState: OnUpdatePlayingStateFn, updateFpsData: OnUpdateFpsDataFn): { play: (() => void) | null, pause: (() => void) | null, nextFrame: (() => void) | null, destroy: (() => void) | null } {
  const [play, setPlay] = React.useState<(() => void) | null>(null)
  const [pause, setPause] = React.useState<(() => void) | null>(null)
  const [nextFrame, setNextFrame] = React.useState<(() => void) | null>(null)
  const [destroy, setDestroy] = React.useState<(() => void) | null>(null)
  React.useEffect(() => {
    if (!canvasRef.current) {
      return
    }
    getInterface(canvasRef.current, updatePlayingState, updateFpsData)
      .then(({ play, pause, nextFrame, destroy }) => {
        setPlay(() => play)
        setPause(() => pause)
        setNextFrame(() => nextFrame)
        setDestroy(() => destroy)
      })
    return () => destroy?.()
  }, [])
  return { play, pause, nextFrame, destroy }
}
