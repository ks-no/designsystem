import '@digdir/designsystemet-web/tooltip'
import { createIcon, type IconShape } from '../utils/icon'
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

// Phosphor regular: copy, check, x-circle
const ICON: Record<CopyState, IconShape[]> = {
  rest: [
    ['polyline', { points: '168 168 216 168 216 40 88 40 88 88' }],
    ['rect', { x: '40', y: '88', width: '128', height: '128' }],
  ],
  success: [['polyline', { points: '40 144 96 200 224 72' }]],
  error: [
    ['line', { x1: '160', y1: '96', x2: '96', y2: '160' }],
    ['line', { x1: '96', y1: '96', x2: '160', y2: '160' }],
    ['circle', { cx: '128', cy: '128', r: '96' }],
  ],
}

const RESETS = new WeakMap<Element, () => void>()
const OPERATIONS = new WeakMap<Element, number>()

const iconOf = (el: Element) => el.querySelector(`:scope > [${ATTR_ICON}]`)

const isButton = (el: Element) => el.nodeName === 'BUTTON'

const isDisabled = (el: Element) =>
  el.hasAttribute('disabled') || attr(el, 'aria-disabled') === 'true'

const toState = (value: string | null): CopyState =>
  value === 'success' || value === 'error' ? value : 'rest'

const setState = (el: Element, state: CopyState) => {
  attr(el, ATTR_STATE, state)
  attr(el, ATTR_TOOLTIP, attr(el, LABEL_ATTR[state]) || LABEL_DEFAULT[state])

  const icon = iconOf(el)
  if (icon) icon.replaceChildren(createIcon(ICON[state]))
}

const setup = (el: Element) => {
  // Anything else would get the icon and accessible label without being focusable or keyboard-operable
  if (!isButton(el)) {
    warn(
      `${ATTR_COPY} expects a <button>, got <${el.nodeName.toLowerCase()}>:`,
      el,
    )
    return
  }

  if (!iconOf(el)) {
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

/** Resets on blur, so the label never changes under a focused button — upstream's tooltip would announce it again. */
const scheduleReset = (el: Element) => {
  RESETS.get(el)?.()

  const reset = () => {
    RESETS.delete(el)
    setState(el, 'rest')
  }

  RESETS.set(el, on(el, 'blur', reset, { once: true }))
}

const handleClick = async (event: Event) => {
  const el = getComposedTarget(event)?.closest(SELECTOR)
  if (!el || !isButton(el) || isDisabled(el)) return

  const value = attr(el, ATTR_COPY) || ''
  // Safari does not focus a button on click, so focus it to keep the blur-based reset consistent
  if (el instanceof HTMLElement) el.focus()

  // Overlapping clicks: only the newest operation may update state or schedule the reset
  const operation = (OPERATIONS.get(el) ?? 0) + 1
  OPERATIONS.set(el, operation)
  RESETS.get(el)?.()

  try {
    await navigator.clipboard.writeText(value)
    if (OPERATIONS.get(el) !== operation) return
    setState(el, 'success')
    emit<CopyEventDetail>(el, 'ksd-copy', { value })
  } catch (error) {
    if (OPERATIONS.get(el) !== operation) return
    setState(el, 'error')
    emit<CopyErrorEventDetail>(el, 'ksd-copy-error', { value, error })
  }

  scheduleReset(el)
}

const setupAll = (scope: ParentNode | null) => {
  for (const el of scope?.querySelectorAll(SELECTOR) || []) setup(el)
}

/** Clicks are delegated from the current `document`, so scopes it cannot see into are refused rather than left looking interactive. */
const isReachable = (scope: Element | Document) => {
  if ((scope.ownerDocument ?? scope) !== document) {
    warn('ignoring a scope from another document:', scope)
    return false
  }

  return true
}

/** Enhances every `[data-copy]` in `scope`. Needed for content the document observer has not seen yet. */
export const initCopyButtons = (
  scope: Element | Document | null = isBrowser() ? document : null,
) => {
  if (!scope || !isReachable(scope)) return

  setupAll(scope)
}

const handleMutations = (_: Document, records?: MutationRecord[]) => {
  if (!records) return setupAll(document)

  for (const record of records) {
    // The filter also matches label attributes, which any element may carry
    if (record.attributeName) {
      const el = record.target as Element
      if (el.hasAttribute(ATTR_COPY)) setup(el)
    } else
      for (const node of record.addedNodes as NodeListOf<Element>) {
        if (node.nodeType !== 1) continue
        if (node.hasAttribute(ATTR_COPY)) setup(node)
        setupAll(node)
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
