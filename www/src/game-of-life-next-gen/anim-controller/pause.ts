import type AnimationState from "./AnimationState";

export default function pause(animationState: AnimationState): void {
  animationState.cancel();
};
