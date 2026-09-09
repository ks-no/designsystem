import '@digdir/designsystemet-web/tooltip'
import {
  attr,
  getComposedTarget,
  isBrowser,
  on,
  onHotReload,
  onMutation,
  warn,
} from '../utils/utils'

export type CopyState = 'rest' | 'success' | 'error'

export type CopyEventDetail = {
  value: string
}

export type CopyErrorEventDetail = {
  value: string
  error: unknown
}

const ATTR_COPY = 'data-copy'
const ATTR_ICON = 'data-copy-icon'
const ATTR_STATE = 'data-copy-state'
const ATTR_TOOLTIP = 'data-tooltip'
const SELECTOR = `[${ATTR_COPY}]`
const RESET_DELAY = 2000

const LABEL_ATTR: Record<CopyState, string> = {
  rest: 'data-copy-label',
  success: 'data-copied-label',
  error: 'data-error-label',
}

const LABEL_DEFAULT: Record<CopyState, string> = {
  rest: 'Kopier',
  success: 'Kopiert',
  error: 'Kopiering feilet',
}

const ICON: Record<CopyState, string> = {
  rest: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><polyline points="168 168 216 168 216 40 88 40 88 88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><rect x="40" y="88" width="128" height="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>`,
  success: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><polyline points="40 144 96 200 224 72" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>`,
  error: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><line x1="160" y1="96" x2="96" y2="160" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="96" y1="96" x2="160" y2="160" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>`,
}

const TIMERS = new WeakMap<Element, ReturnType<typeof setTimeout>>()

const isDisabled = (el: Element) =>
  el.hasAttribute('disabled') || attr(el, 'aria-disabled') === 'true'

const toState = (value: string | null): CopyState =>
  value === 'success' || value === 'error' ? value : 'rest'

const setState = (el: Element, state: CopyState) => {
  attr(el, ATTR_STATE, state)
  attr(el, ATTR_TOOLTIP, attr(el, LABEL_ATTR[state]) || LABEL_DEFAULT[state])

  const icon = el.querySelector(`:scope > [${ATTR_ICON}]`)
  if (icon) icon.innerHTML = ICON[state]
}

const setup = (el: Element) => {
  if (el.nodeName !== 'BUTTON')
    warn(
      `${ATTR_COPY} expects a <button>, got <${el.nodeName.toLowerCase()}>:`,
      el,
    )

  if (!el.querySelector(`:scope > [${ATTR_ICON}]`)) {
    const icon = document.createElement('span')
    attr(icon, ATTR_ICON, '')
    attr(icon, 'aria-hidden', 'true')
    el.prepend(icon)
  }

  setState(el, toState(attr(el, ATTR_STATE)))
}

const emit = <T>(el: Element, type: string, detail: T) =>
  el.dispatchEvent(
    new CustomEvent<T>(type, { bubbles: true, composed: true, detail }),
  )

const handleClick = async (event: Event) => {
  const el = getComposedTarget(event)?.closest(SELECTOR)
  if (!el || isDisabled(el)) return

  const value = attr(el, ATTR_COPY) || ''
  clearTimeout(TIMERS.get(el))

  try {
    await navigator.clipboard.writeText(value)
    setState(el, 'success')
    emit<CopyEventDetail>(el, 'ksd-copy', { value })
  } catch (error) {
    setState(el, 'error')
    emit<CopyErrorEventDetail>(el, 'ksd-copy-error', { value, error })
  }

  TIMERS.set(
    el,
    setTimeout(() => setState(el, 'rest'), RESET_DELAY),
  )
}

/** Enhances every `[data-copy]` in `scope`. Needed for roots the document observer cannot reach, such as shadow roots. */
export const initCopyButtons = (
  scope: Element | ShadowRoot | Document | null = isBrowser() ? document : null,
) => {
  for (const el of scope?.querySelectorAll(SELECTOR) || []) setup(el)
}

const handleMutations = (_: Document, records?: MutationRecord[]) => {
  if (!records) return initCopyButtons()

  for (const record of records) {
    if (record.attributeName) setup(record.target as Element)
    else
      for (const node of record.addedNodes as NodeListOf<Element>) {
        if (node.nodeType !== 1) continue
        if (node.hasAttribute(ATTR_COPY)) setup(node)
        initCopyButtons(node)
      }
  }
}

onHotReload('copy-button', () => [
  on(document, 'click', handleClick as EventListener, true),
  onMutation(document, handleMutations, {
    attributeFilter: [ATTR_COPY, ...Object.values(LABEL_ATTR)],
    attributes: true,
    childList: true,
    subtree: true,
  }),
])

declare global {
  interface GlobalEventHandlersEventMap {
    'ksd-copy': CustomEvent<CopyEventDetail>
    'ksd-copy-error': CustomEvent<CopyErrorEventDetail>
  }
}
