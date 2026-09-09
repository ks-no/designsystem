export const isBrowser = () =>
  typeof window !== 'undefined' && typeof document !== 'undefined'

export const warn = (message: string, ...args: unknown[]) =>
  !isBrowser() ||
  window.dsWarnings === false ||
  console.log(`KS Designsystem: ${message}`, ...args)

/** Get attribute when `value` is omitted, set it when a string, remove it when `null`. */
export const attr = (el: Element, name: string, value?: string | null) => {
  if (value === undefined) return el.getAttribute(name)
  if (value === null) el.removeAttribute(name)
  else if (el.getAttribute(name) !== value) el.setAttribute(name, value)
  return null
}

/** Resolves the real target even when the event crosses a shadow boundary. */
export const getComposedTarget = (event: Event) => {
  const target =
    ((event.target as Element)?.shadowRoot && event.composedPath()[0]) ||
    event.target
  return (target as Node)?.nodeType === 1 ? (target as Element) : null
}

export const off = (
  el: EventTarget,
  types: string,
  handler: EventListenerOrEventListenerObject,
  options?: boolean | EventListenerOptions,
) => {
  for (const type of types.split(' '))
    el.removeEventListener(type, handler, options)
}

export const on = (
  el: EventTarget,
  types: string,
  handler: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions,
) => {
  for (const type of types.split(' '))
    el.addEventListener(type, handler, options)
  return () =>
    off(el, types, handler, options as boolean | EventListenerOptions)
}

/** Runs `callback` immediately, then on every matching mutation. Returns a disconnect function. */
export const onMutation = <T extends Node>(
  el: T,
  callback: (el: T, records?: MutationRecord[]) => void,
  options: MutationObserverInit,
) => {
  const disconnect = () => observer.disconnect()
  const observer = new MutationObserver((records) => {
    if (!isBrowser() || !el.isConnected) return disconnect()
    callback(el, records)
  })

  callback(el)
  observer.observe(el, options)
  return disconnect
}

/** Re-runs setup on hot reload, tearing down the listeners registered by the previous run. */
export const onHotReload = (key: string, setup: () => (() => void)[]) => {
  if (!isBrowser()) return
  const store = (window.ksdHotReloadCleanup ||= new Map())
  for (const cleanup of store.get(key) || []) cleanup()
  store.set(key, setup())
}

declare global {
  interface Window {
    dsWarnings?: boolean
    ksdHotReloadCleanup?: Map<string, (() => void)[]>
  }
}
