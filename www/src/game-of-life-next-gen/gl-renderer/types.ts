import { ICanvasRenderingContext } from "babylonjs"

export type OnTextureHoverPosition = { x: number, z: number } | null
export type OnHoverTextureContextFn = (hoverPos: OnTextureHoverPosition) => void
export type TextContextUpdateFn = (textureContext: ICanvasRenderingContext) => void
