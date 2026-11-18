import { attr, getComposedTarget, on, onHotReload } from '../utils/utils'

// The themes CSS also requires a detail row after it (one cell with colspan) before it hides anything
const SELECTOR = '.ds-table > tbody > tr > :first-child > button[aria-expanded]'

/** Flips `aria-expanded`. The CSS shows or hides the detail row. */
const handleClick = (event: Event) => {
  const button = getComposedTarget(event)?.closest(SELECTOR)
  if (!button || attr(button, 'aria-disabled') === 'true') return

  const expanded = attr(button, 'aria-expanded') === 'true'
  attr(button, 'aria-expanded', String(!expanded))
}

onHotReload('table', () => [on(document, 'click', handleClick)])
