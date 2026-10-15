import { getComposedTarget, on, onHotReload, warn } from '../utils/utils'

export type DismissEventDetail = {
  trigger: Element
}

const ATTR_DISMISS = 'data-ksd-dismiss'
const ATTR_FOCUS = 'data-ksd-dismiss-focus'
const SELECTOR = `[${ATTR_DISMISS}]`

/** Focus would otherwise be stranded on the hidden subtree, leaving keyboard users nowhere. */
const moveFocus = (trigger: Element, target: Element) => {
  if (!target.contains(document.activeElement)) return

  const id = trigger.getAttribute(ATTR_FOCUS)
  const next = (id && document.getElementById(id)) || document.body

  if (!next.hasAttribute('tabindex') && next.tabIndex < 0) {
    next.setAttribute('tabindex', '-1')
    on(next, 'blur', () => next.removeAttribute('tabindex'), { once: true })
  }

  next.focus()
}

const handleClick = (event: Event) => {
  const trigger = getComposedTarget(event)?.closest(SELECTOR)
  if (!trigger) return

  const id = trigger.getAttribute(ATTR_DISMISS)
  const target = id ? document.getElementById(id) : null

  if (!target) {
    warn(
      `${ATTR_DISMISS} expects the id of an element to hide, got "${id}":`,
      trigger,
    )
    return
  }

  const event_ = new CustomEvent<DismissEventDetail>('ksd-dismiss', {
    bubbles: true,
    cancelable: true,
    composed: true,
    detail: { trigger },
  })

  // Cancelling hands the element back to the consumer, e.g. a framework that owns the DOM
  if (!target.dispatchEvent(event_)) return

  moveFocus(trigger, target)
  // Hidden rather than removed, so the markup survives and the consumer can show it again
  target.hidden = true
}

onHotReload('dismiss', () => [
  on(document, 'click', handleClick as EventListener, true),
])

declare global {
  interface GlobalEventHandlersEventMap {
    'ksd-dismiss': CustomEvent<DismissEventDetail>
  }
}
