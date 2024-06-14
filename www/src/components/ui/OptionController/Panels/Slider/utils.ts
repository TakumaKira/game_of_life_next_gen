export function valueToRate(value: number, range: [number, number]): number {
  return (value - range[0]) / (range[1] - range[0])
}
export function rateToValue(rate: number, range: [number, number]): number {
  return rate * (range[1] - range[0]) + range[0]
}

export function getUpdatedRate(mouseX: number, container: DOMRect, knob: DOMRect): number {
  const availableRange = container.width - knob.width
  const updatedKnobLeftX = mouseX - knob.width / 2
  const updatedKnobLeftPos = updatedKnobLeftX - container.left
  const updatedRate = updatedKnobLeftPos / availableRange
  return limitRate(updatedRate)
}
export function limitRate(rate: number): number {
  return Math.min(Math.max(rate, 0), 1)
}
