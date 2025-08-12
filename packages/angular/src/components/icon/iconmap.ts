export const icons = import.meta.glob(
  '../../../node_modules/@material-symbols/svg-400/outlined/*.svg',
  { eager: true, import: 'default' },
)

const formatSVG = (name: string, svg: string) => {
  // Set the svg width=1em and height=1em
  // Set aria-hidden=true
  // Set focusable=false

  // Handle data URLs

  // Decode the data URL
  const decodedSvg = decodeURIComponent(svg.replace('data:image/svg+xml,', ''))

  const formattedSvg = decodedSvg
    // First remove any existing attributes we want to replace
    .replace(/width=["'][^"']*["']/g, '')
    .replace(/height=["'][^"']*["']/g, '')
    .replace(/aria-hidden=["'][^"']*["']/g, '')
    .replace(/focusable=["'][^"']*["']/g, '')
    // Then add our desired attributes
    .replace(
      /<svg([^>]*)>/g,
      '<svg$1 width="1em" height="1em" aria-hidden="true" focusable="false" fill="currentColor">',
    )
    .replace(/<svg\b(?![^>]*fill=)/, '<svg fill="currentColor"')

  if (name === 'home') {
    console.log({ formattedSvg })
  }
  // Re-encode as data URL
  // return `data:image/svg+xml,${encodeURIComponent(formattedSvg)}`
  return formattedSvg
}

export const iconRegistry = Object.fromEntries(
  Object.entries(icons).map(([path, svg]) => {
    const name = path?.split('/')?.pop()?.replace('.svg', '') || ''
    return [name, formatSVG(name, svg as string)]
  }),
)
