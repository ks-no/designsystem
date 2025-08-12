export const icons = import.meta.glob(
  '../../../node_modules/@material-symbols/svg-400/outlined/*.svg',
  { eager: true, import: 'default' },
)

const formatSVG = (name: string, svg: string) => {
  const decodedSvg = decodeURIComponent(svg.replace('data:image/svg+xml,', ''))

  const formattedSvg = decodedSvg
    .replace(/width=["'][^"']*["']/g, '')
    .replace(/height=["'][^"']*["']/g, '')
    .replace(/aria-hidden=["'][^"']*["']/g, '')
    .replace(/focusable=["'][^"']*["']/g, '')
    .replace(/fill=["'][^"']*["']/g, '')
    // Add our desired attributes to the SVG tag
    .replace(
      /<svg([^>]*)>/g,
      '<svg$1 width="1em" height="1em" aria-hidden="true" focusable="false" fill="currentColor">',
    )

  return formattedSvg
}

export const iconRegistry = Object.fromEntries(
  Object.entries(icons).map(([path, svg]) => {
    const name = path?.split('/')?.pop()?.replace('.svg', '') || ''
    return [name, formatSVG(name, svg as string)]
  }),
)
