import { ColorCurves } from 'babylonjs'

export default function getColorCurve(globalHue: number, globalDensity: number, globalSaturation: number, highlightsHue: number, highlightsDensity: number, highlightsSaturation: number, shadowsHue: number, shadowsDensity: number, shadowsSaturation: number): ColorCurves {
  const curve = new ColorCurves();

  curve.globalHue = globalHue;
  curve.globalDensity = globalDensity;
  curve.globalSaturation = globalSaturation;

  curve.highlightsHue = highlightsHue;
  curve.highlightsDensity = highlightsDensity;
  curve.highlightsSaturation = highlightsSaturation;

  curve.shadowsHue = shadowsHue;
  curve.shadowsDensity = shadowsDensity;
  curve.shadowsSaturation = shadowsSaturation;

  return curve
}
