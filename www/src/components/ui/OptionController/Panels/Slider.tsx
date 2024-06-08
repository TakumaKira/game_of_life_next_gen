import React from 'react';
import styled from "styled-components"

const Container = styled.div<{ $value: number, $isDragging: boolean }>`
  background-color: #93939366;
  height: 18px;
  border-radius: 9px;
  cursor: pointer;
  ${props => props.$isDragging ? '& > div' : '&:hover > div'}:after {
    content: "${props => props.$value.toFixed(2)}";
    color: #ffffff66;
    display: flex;
    justify-content: center;
    position: relative;
    bottom: 120%;
  }
  margin-top: 24px;
  margin-bottom: 8px;
`
const Knob = styled.div<{ $left: number }>`
  background-color: #d2d2d2;
  height: 18px;
  width: 18px;
  border-radius: 50%;
  margin-left: ${props => props.$left}px;
  box-shadow: 2px 4px 18px #2d2d2d66;
`

export default function Slider({
  range,
  value,
  onChange,
}: {
  range: [number, number]
  value: number
  onChange: (value: number) => void
}) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const knobRef = React.useRef<HTMLDivElement>(null)
  const [rate, setRate] = React.useState<number>(valueToRate(value, range))
  const [isDragging, setIsDragging] = React.useState(false)
  const [knobLeft, setKnobLeft] = React.useState(0)
  React.useEffect(() => {
    if (!containerRef.current || !knobRef.current) {
      throw new Error("Container or knob not found")
    }
    const containerBoundingRect = containerRef.current.getBoundingClientRect()
    const knobBoundingRect = knobRef.current.getBoundingClientRect()
    const availableWidth = containerBoundingRect.width - knobBoundingRect.width
    const initialKnobLeft = valueToRate(value, range) * availableWidth
    setKnobLeft(initialKnobLeft)
  }, [value, range])
  React.useEffect(() => {
    onChange(rateToValue(rate, range))
  }, [rate])
  const onMouseDown: React.MouseEventHandler<HTMLDivElement> = e => {
    setIsDragging(true)
    if (!containerRef.current || !knobRef.current) {
      return
    }
    const containerBoundingRect = containerRef.current.getBoundingClientRect()
    const knobBoundingRect = knobRef.current.getBoundingClientRect()
    const updatedRate = getUpdatedRate(e.clientX, containerBoundingRect, knobBoundingRect)
    setRate(updatedRate)
  }
  const onMouseMove = React.useCallback((e: MouseEvent) => {
    if (!isDragging || !containerRef.current || !knobRef.current) {
      return
    }
    const containerBoundingRect = containerRef.current.getBoundingClientRect()
    const knobBoundingRect = knobRef.current.getBoundingClientRect()
    const updatedRate = getUpdatedRate(e.clientX, containerBoundingRect, knobBoundingRect)
    setRate(updatedRate)
  }, [isDragging])
  const onMouseUp = React.useCallback((e: MouseEvent) => {
    setIsDragging(false)
  }, [])
  React.useEffect(() => {
    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mouseup", onMouseUp)
    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mouseup", onMouseUp)
    }
  }, [onMouseMove, onMouseUp])
  return (
    <Container ref={containerRef} onMouseDown={onMouseDown} $value={value} $isDragging={isDragging}>
      <Knob ref={knobRef} $left={knobLeft} />
    </Container>
  )
}

function valueToRate(value: number, range: [number, number]): number {
  return (value - range[0]) / (range[1] - range[0])
}
function rateToValue(rate: number, range: [number, number]): number {
  return rate * (range[1] - range[0]) + range[0]
}

function getUpdatedRate(mouseX: number, container: DOMRect, knob: DOMRect): number {
  const availableRange = container.width - knob.width
  const updatedKnobLeftX = mouseX - knob.width / 2
  const updatedKnobLeftPos = updatedKnobLeftX - container.left
  const updatedRate = updatedKnobLeftPos / availableRange
  return limitRate(updatedRate)
}
function limitRate(rate: number): number {
  return Math.min(Math.max(rate, 0), 1)
}
