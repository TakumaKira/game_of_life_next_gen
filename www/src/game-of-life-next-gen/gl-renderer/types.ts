import type { ICanvasRenderingContext } from "babylonjs"
import type { TextureValues } from "../drawer"

export type NonNullable<T> = T extends null | undefined ? never : T
export type OnTextureHoverPosition = { x: number, z: number } | null
export type OnHoverTextureContextFn = (hoverPos: OnTextureHoverPosition) => void
export type TextContextUpdateFn = (textureContext: ICanvasRenderingContext, textureValues: TextureValues) => void
