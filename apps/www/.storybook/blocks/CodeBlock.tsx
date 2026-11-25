import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import {
  FRAMEWORKS,
  type Example,
  type Framework,
  type Imports,
} from '@internal/storybook/snippets'
import { useOf } from '@storybook/addon-docs/blocks'
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import { CodeFrame, CodeLabel } from './CodeFrame'
import { Icon } from './icons'
import { useFramework } from './useFramework'

const KEY_STEPS: Record<string, (index: number, count: number) => number> = {
  ArrowRight: (i, n) => (i + 1) % n,
  ArrowLeft: (i, n) => (i - 1 + n) % n,
  Home: () => 0,
  End: (_, n) => n - 1,
}

/**
 * Toolbar of toggle buttons: arrow keys move focus, Enter/Space selects. Selecting
 * switches every code block on the page, so it shouldn't happen just by moving through
 * the options.
 */
function FrameworkToggle({
  value,
  onChange,
}: {
  value: Framework
  onChange: (framework: Framework) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const selectedIndex = FRAMEWORKS.findIndex((f) => f.id === value)
  // The one button reachable with Tab (roving tabindex)
  const [focusIndex, setFocusIndex] = useState(selectedIndex)
  useEffect(() => setFocusIndex(selectedIndex), [selectedIndex])

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = KEY_STEPS[event.key]
    if (!step) return
    event.preventDefault()
    const next = step(focusIndex, FRAMEWORKS.length)
    setFocusIndex(next)
    ref.current?.querySelectorAll('button')[next]?.focus()
  }

  return (
    <div
      ref={ref}
      role="toolbar"
      aria-label="Rammeverk"
      className="ksd-code__toggle"
      onKeyDown={onKeyDown}
      // Leaving without choosing: Tab back in lands on the selected one again
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setFocusIndex(selectedIndex)
        }
      }}
    >
      {FRAMEWORKS.map((f, index) => (
        <button
          key={f.id}
          type="button"
          className="ksd-code__option"
          aria-pressed={f.id === value}
          tabIndex={index === focusIndex ? 0 : -1}
          onFocus={() => setFocusIndex(index)}
          onClick={() => {
            if (f.id !== value) onChange(f.id)
          }}
        >
          <Icon name={f.id} />
          {f.label}
        </button>
      ))}
    </div>
  )
}

interface Props {
  /** The story whose `parameters.snippets` to show */
  of: unknown
  /** Hide the import block, e.g. for secondary examples on the same page */
  hideImports?: boolean
  /** Framework-specific notes shown under the code */
  notes?: Partial<Record<Framework, ReactNode>>
}

/**
 * The code for a story in the selected framework. The framework toggle in the header
 * switches every code block on the page, and the choice is remembered between visits.
 * Stories whose snippets only have `html` get an "HTML" label instead of the toggle.
 */
export function CodeBlock({ of, hideImports = false, notes }: Props) {
  const { story } = useOf(of as Parameters<typeof useOf>[0], ['story'])
  const [framework, setFramework] = useFramework()

  const parameters = story.parameters as {
    snippets?: Example
    ksd?: KsdDocsParameters
    /** Imports only this example needs (e.g. icons), shown even with `hideImports` */
    exampleImports?: Imports
  }
  if (!parameters.snippets) {
    throw new Error(`CodeBlock: story "${story.id}" has no parameters.snippets`)
  }

  const snippets = parameters.snippets
  // Same code in every framework (plain HTML, web components): nothing to choose
  const htmlOnly = !('angular' in snippets && 'react' in snippets)
  const shown: Framework = htmlOnly ? 'html' : framework
  const code = (snippets as Partial<Record<Framework, string>>)[shown] ?? ''
  const imports: Imports = hideImports ? {} : (parameters.ksd?.imports ?? {})
  const importCode = [imports[shown], parameters.exampleImports?.[shown]]
    .filter(Boolean)
    .join('\n')
  const language = FRAMEWORKS.find((f) => f.id === shown)?.language ?? 'html'
  const note = notes?.[shown]

  return (
    <div className="sb-unstyled">
      <CodeFrame
        header={
          htmlOnly ? (
            <CodeLabel icon="html">HTML</CodeLabel>
          ) : (
            <FrameworkToggle value={framework} onChange={setFramework} />
          )
        }
        sections={[
          ...(importCode ? [{ code: importCode, language: 'tsx' }] : []),
          { code, language },
        ]}
      />
      {note && (
        <p
          className="ds-paragraph"
          data-size="sm"
          style={{
            marginBlock: 'calc(-1 * var(--ds-size-2)) var(--ds-size-4)',
          }}
        >
          {note}
        </p>
      )}
    </div>
  )
}
