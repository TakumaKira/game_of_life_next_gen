import { ICanvasRenderingContext } from "babylonjs"

export type OnTextureHoverPositionFn = { x: number, z: number } | null
export type OnHoverTextureContextFn = (hoverPos: OnTextureHoverPositionFn) => void
export type TextContextUpdateFn = (textureContext: ICanvasRenderingContext) => void
