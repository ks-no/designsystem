import { attr, getComposedTarget, on, onHotReload } from '../utils/utils'

// Same structure as the themes CSS: the row must be followed by a detail row
// (one cell with colspan). Other buttons with aria-expanded, like menus, are left alone.
const SELECTOR =
  '.ds-table > tbody > tr:has(+ tr > td[colspan]:only-child) > :first-child > button[aria-expanded]'

/** Flips `aria-expanded`. The CSS shows or hides the detail row. */
const handleClick = (event: Event) => {
  const button = getComposedTarget(event)?.closest(SELECTOR)
  if (!button || attr(button, 'aria-disabled') === 'true') return

  const expanded = attr(button, 'aria-expanded') === 'true'
  attr(button, 'aria-expanded', String(!expanded))
}

onHotReload('table', () => [on(document, 'click', handleClick)])
