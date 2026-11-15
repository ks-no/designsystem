import { FRAMEWORKS, type Framework } from '@internal/storybook/snippets'
import { useSyncExternalStore } from 'react'

/**
 * The framework shown in the code blocks. Deliberately not a Storybook global: changing a
 * global re-renders every story on the page, and only the code blocks care about this.
 */

const STORAGE_KEY = 'ksd-docs-framework'

export const isFramework = (value: unknown): value is Framework =>
  FRAMEWORKS.some((f) => f.id === value)

/** A shared link can pick the framework, e.g. `…&framework=angular` */
function fromUrl(): string | null {
  const searches = [window.location.search]
  try {
    searches.push(window.parent.location.search)
  } catch {
    // Parent on another origin
  }
  for (const search of searches) {
    const framework = new URLSearchParams(search).get('framework')
    if (framework) return framework
  }
  return null
}

function fromStorage(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEY)
  } catch {
    // Storage can be unavailable (private mode, blocked site data)
    return null
  }
}

let current: Framework = [fromUrl(), fromStorage()].find(isFramework) ?? 'html'
const listeners = new Set<() => void>()

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

function setFramework(next: Framework) {
  if (next === current) return
  current = next
  try {
    window.localStorage.setItem(STORAGE_KEY, next)
  } catch {
    // Remembered for this page view only
  }
  listeners.forEach((listener) => listener())
}

/** The selected framework, shared by every code block and remembered between visits */
export function useFramework(): [Framework, (framework: Framework) => void] {
  return [useSyncExternalStore(subscribe, () => current), setFramework]
}
