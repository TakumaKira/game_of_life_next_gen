export default function isPaused(getCurrentAnimId: () => number | null): boolean {
  return getCurrentAnimId() === null;
};
