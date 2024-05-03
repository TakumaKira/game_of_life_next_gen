export default function pause(getCurrentAnimId: () => number | null, updateAnimId: (id: number | null) => void): { isPlaying: boolean } {
  const animationId = getCurrentAnimId();
  if (animationId !== null) {
    cancelAnimationFrame(animationId);
    updateAnimId(null);
  }
  return { isPlaying: false };
};
