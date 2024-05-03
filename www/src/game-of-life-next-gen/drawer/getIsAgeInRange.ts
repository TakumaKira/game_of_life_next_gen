export default function getIsAgeInRange(age: number, lifeSpan: number, rangeIndex: number, rangeLength: number) {
  const rangeSpan = lifeSpan / rangeLength
  return rangeSpan * rangeIndex <= age && age < rangeSpan * (rangeIndex + 1)
}
