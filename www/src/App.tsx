import React from 'react';
import { getInterface } from '@/game-of-life-next-gen'
import type { OnUpdateFpsDataFn, OnUpdatePlayingStateFn } from '@/game-of-life-next-gen'
import GameOfLife from './GameOfLife';

export default function App() {
  // const [play, setPlay] = React.useState<(() => void) | null>(null)
  // const [pause, setPause] = React.useState<(() => void) | null>(null)
  // const [nextFrame, setNextFrame] = React.useState<(() => void) | null>(null)
  // const [destroy, setDestroy] = React.useState<(() => void) | null>(null)
  // const getController: (canvas: HTMLCanvasElement, updatePlayingState: OnUpdatePlayingStateFn, updateFpsData: OnUpdateFpsDataFn) => void = (canvas, updatePlayingState, updateFpsData) => {
  //   getInterface(canvas, updatePlayingState, updateFpsData)
  //     .then(({ play, pause, nextFrame, destroy }) => {
  //       setPlay(() => play)
  //       setPause(() => pause)
  //       setNextFrame(() => nextFrame)
  //       setDestroy(() => destroy)
  //     })
  // }
  return (
    <GameOfLife />
  );
}
