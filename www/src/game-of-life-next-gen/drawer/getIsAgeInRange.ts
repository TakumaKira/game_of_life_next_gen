export default function getIsAgeInRange(age: number, lifespan: number, rangeIndex: number, rangeLength: number) {
  const rangeSpan = lifespan / rangeLength
  return rangeSpan * rangeIndex <= age && age < rangeSpan * (rangeIndex + 1)
}
