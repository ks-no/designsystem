const SVG_NS = 'http://www.w3.org/2000/svg'

/** Phosphor regular weight: a 256x256 viewBox with 16px rounded strokes. https://phosphoricons.com */
const STROKE: Record<string, string> = {
  fill: 'none',
  stroke: 'currentColor',
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round',
  'stroke-width': '16',
}

export type IconShape = [tag: string, attrs: Record<string, string>]

/** Builds the SVG node by hand, since Trusted Types blocks innerHTML even for static markup. */
export const createIcon = (shapes: IconShape[]) => {
  const svg = document.createElementNS(SVG_NS, 'svg')
  svg.setAttribute('viewBox', '0 0 256 256')

  for (const [tag, shapeAttrs] of shapes) {
    const shape = document.createElementNS(SVG_NS, tag)
    for (const [name, value] of Object.entries({ ...STROKE, ...shapeAttrs }))
      shape.setAttribute(name, value)
    svg.append(shape)
  }

  return svg
}
