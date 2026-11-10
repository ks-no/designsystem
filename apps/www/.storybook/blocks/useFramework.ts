import { FRAMEWORKS, type Framework } from '@internal/storybook/snippets'
import { DocsContext } from '@storybook/addon-docs/blocks'
import { useCallback, useContext, useEffect, useState } from 'react'
import { GLOBALS_UPDATED, UPDATE_GLOBALS } from 'storybook/internal/core-events'

/** The `framework` global (toolbar "Rammeverk"), see `preview.ts` */
export const FRAMEWORK_GLOBAL = 'framework'

export const isFramework = (value: unknown): value is Framework =>
  FRAMEWORKS.some((f) => f.id === value)

const TOGGLE_SELECTOR = '.ksd-code__toggle'

/**
 * Storybook re-renders the docs page when a global changes, which drops keyboard focus.
 * We remember which toggle (by position on the page) the change came from, and give
 * focus back to it once it has rendered again.
 */
// It re-renders more than once (our own listener first, then Storybook), so the mark is
// kept for a short while instead of being used up by the first render.
const FOCUS_WINDOW_MS = 1000
let pendingFocus: { index: number; until: number } | null = null

function rememberFocus(source: Element | null) {
  const toggle = source?.closest(TOGGLE_SELECTOR)
  const index = toggle
    ? [...document.querySelectorAll(TOGGLE_SELECTOR)].indexOf(toggle)
    : -1
  pendingFocus =
    index >= 0 ? { index, until: Date.now() + FOCUS_WINDOW_MS } : null
}

/** Call from the toggle after it renders: restores focus if the change came from it */
export function restoreFocus(toggle: HTMLElement | null) {
  if (!pendingFocus || !toggle) return
  if (Date.now() > pendingFocus.until) {
    pendingFocus = null
    return
  }
  const toggles = [...document.querySelectorAll(TOGGLE_SELECTOR)]
  if (toggles[pendingFocus.index] !== toggle) return
  toggle.querySelector<HTMLElement>('[aria-pressed="true"]')?.focus()
}

/**
 * The selected framework, shared by every code block on the page, the toolbar and the URL
 * (`&globals=framework:angular`).
 */
export function useFramework(
  story: Parameters<
    React.ContextType<typeof DocsContext>['getStoryContext']
  >[0],
): [Framework, (framework: Framework, source?: Element | null) => void] {
  const context = useContext(DocsContext)
  const initial = context.getStoryContext(story).globals[FRAMEWORK_GLOBAL]
  const [framework, setFramework] = useState<Framework>(
    isFramework(initial) ? initial : 'html',
  )

  useEffect(() => {
    const onGlobalsUpdated = ({
      globals,
    }: {
      globals: Record<string, unknown>
    }) => {
      const next = globals[FRAMEWORK_GLOBAL]
      if (isFramework(next)) setFramework(next)
    }
    context.channel.on(GLOBALS_UPDATED, onGlobalsUpdated)
    return () => context.channel.off(GLOBALS_UPDATED, onGlobalsUpdated)
  }, [context.channel])

  const select = useCallback(
    (next: Framework, source?: Element | null) => {
      rememberFocus(source ?? null)
      context.channel.emit(UPDATE_GLOBALS, {
        globals: { [FRAMEWORK_GLOBAL]: next },
      })
    },
    [context.channel],
  )

  return [framework, select]
}
