import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import {
  FRAMEWORKS,
  type Framework,
  type Imports,
  type SnippetFn,
} from '@internal/storybook/snippets'
import { DocsContext, useOf } from '@storybook/addon-docs/blocks'
import {
  useContext,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import { SyntaxHighlighter } from 'storybook/internal/components'
import { STORY_ARGS_UPDATED } from 'storybook/internal/core-events'
import { convert, ThemeProvider, themes } from 'storybook/theming'
import { Icon } from './icons'
import { restoreFocus, useFramework } from './useFramework'

// Styles live in ../docs.css
const lightTheme = convert(themes.light)

/** The story's current args, following the Controls panel */
function useLiveArgs(of: unknown) {
  const context = useContext(DocsContext)
  const { story } = useOf(of as Parameters<typeof useOf>[0], ['story'])
  const [args, setArgs] = useState(() => context.getStoryContext(story).args)

  useEffect(() => {
    const onArgsUpdated = (event: {
      storyId: string
      args: Record<string, unknown>
    }) => {
      if (event.storyId === story.id) setArgs(event.args)
    }
    context.channel.on(STORY_ARGS_UPDATED, onArgsUpdated)
    return () => context.channel.off(STORY_ARGS_UPDATED, onArgsUpdated)
  }, [story.id, context.channel])

  return { story, args }
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timeout = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timeout)
  }, [copied])

  return (
    <button
      type="button"
      className="ksd-code__copy"
      onClick={() =>
        navigator.clipboard.writeText(text).then(() => setCopied(true))
      }
    >
      <Icon name={copied ? 'check' : 'copy'} />
      {copied ? 'Kopiert' : 'Kopier'}
      <span className="ds-sr-only" aria-live="polite">
        {copied ? ' til utklippstavlen' : ''}
      </span>
    </button>
  )
}

const KEY_STEPS: Record<string, (index: number, count: number) => number> = {
  ArrowRight: (i, n) => (i + 1) % n,
  ArrowLeft: (i, n) => (i - 1 + n) % n,
  Home: () => 0,
  End: (_, n) => n - 1,
}

/**
 * Toolbar of toggle buttons: arrow keys move focus, Enter/Space selects. Selecting
 * re-renders the whole page, so it shouldn't happen just by moving through the options.
 */
function FrameworkToggle({
  value,
  onChange,
}: {
  value: Framework
  onChange: (framework: Framework, source: Element) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const selectedIndex = FRAMEWORKS.findIndex((f) => f.id === value)
  // The one button reachable with Tab (roving tabindex)
  const [focusIndex, setFocusIndex] = useState(selectedIndex)
  useEffect(() => setFocusIndex(selectedIndex), [selectedIndex])
  useEffect(() => restoreFocus(ref.current))

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
          onClick={(event) => {
            if (f.id !== value) onChange(f.id, event.currentTarget)
          }}
        >
          <Icon name={f.id} />
          {f.label}
        </button>
      ))}
    </div>
  )
}

const codeStyle = {
  margin: 0,
  fontSize: 13,
  background: 'transparent',
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
 * The code for a story in the selected framework. The framework toggle in the header is
 * global: it switches every code block on the page, the toolbar and the URL.
 */
export function CodeBlock({ of, hideImports = false, notes }: Props) {
  const { story, args } = useLiveArgs(of)
  const [framework, setFramework] = useFramework(story)

  const parameters = story.parameters as {
    snippets?: SnippetFn
    ksd?: KsdDocsParameters
  }
  if (!parameters.snippets) {
    throw new Error(`CodeBlock: story "${story.id}" has no parameters.snippets`)
  }

  const code = parameters.snippets(args)[framework]
  const imports: Imports = hideImports ? {} : (parameters.ksd?.imports ?? {})
  const importCode = imports[framework]
  const language = FRAMEWORKS.find((f) => f.id === framework)?.language

  return (
    // The docs page is always light, so the frame is pinned to light too
    <div className="sb-unstyled" data-color-scheme="light">
      <div className="ksd-code">
        <div className="ksd-code__header">
          <FrameworkToggle value={framework} onChange={setFramework} />
          <CopyButton text={importCode ? `${importCode}\n\n${code}` : code} />
        </div>
        <ThemeProvider theme={lightTheme}>
          {importCode && (
            <div className="ksd-code__section">
              <SyntaxHighlighter
                language="tsx"
                copyable={false}
                padded
                customStyle={codeStyle}
              >
                {importCode}
              </SyntaxHighlighter>
            </div>
          )}
          <div className="ksd-code__section">
            <SyntaxHighlighter
              language={language ?? 'html'}
              copyable={false}
              padded
              customStyle={codeStyle}
            >
              {code}
            </SyntaxHighlighter>
          </div>
        </ThemeProvider>
      </div>
      {notes?.[framework] && (
        <p
          className="ds-paragraph"
          data-size="sm"
          style={{
            marginBlock: 'calc(-1 * var(--ds-size-2)) var(--ds-size-4)',
          }}
        >
          {notes[framework]}
        </p>
      )}
    </div>
  )
}
