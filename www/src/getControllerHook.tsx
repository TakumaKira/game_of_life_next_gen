import React from "react";
import { type getInterface, type OnUpdateFpsDataFn, type OnUpdatePlayingStateFn } from "./game-of-life-next-gen";

export default function getControllerHook(_getInterface: typeof getInterface, canvasRef: React.RefObject<HTMLCanvasElement>, updatePlayingState: OnUpdatePlayingStateFn, updateFpsData: OnUpdateFpsDataFn) {
  const [play, setPlay] = React.useState<(() => void) | null>(null)
  const [pause, setPause] = React.useState<(() => void) | null>(null)
  const [nextFrame, setNextFrame] = React.useState<(() => void) | null>(null)
  const [destroy, setDestroy] = React.useState<(() => void) | null>(null)

  React.useEffect(() => {
    if (!canvasRef.current) {
      throw new Error('Canvas ref not set')
    }
    _getInterface(canvasRef.current, updatePlayingState, updateFpsData)
      .then(({ play, pause, nextFrame, destroy }) => {
        setPlay(() => play)
        setPause(() => pause)
        setNextFrame(() => nextFrame)
        setDestroy(() => destroy)
      })
  }, [])

  return { play, pause, nextFrame, destroy }
}
