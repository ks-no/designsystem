/**
 * Framework-neutral code snippets for the component docs.
 *
 * Each component has an `*.examples.ts` that exports snippet functions built with these
 * helpers. Stories render the `html` snippet, so the live preview *is* the HTML example,
 * and the docs show all three frameworks in tabs.
 *
 * Keep this file (and the examples files) free of Storybook imports: if the docs move to a
 * custom site later, the examples should be reusable unchanged.
 */

export type Framework = 'html' | 'angular' | 'react'

export const FRAMEWORKS: ReadonlyArray<{
  id: Framework
  label: string
  /** Language for syntax highlighting */
  language: 'html' | 'tsx'
}> = [
  { id: 'html', label: 'HTML', language: 'html' },
  { id: 'angular', label: 'Angular', language: 'html' },
  { id: 'react', label: 'React', language: 'tsx' },
]

/** The markup for one example, per framework */
export type Snippets = Record<Framework, string>

/** An example that can follow the story args (Controls) */
export type SnippetFn<Args = Record<string, unknown>> = (args: Args) => Snippets

/** Imports/registration needed once per component, per framework. Omit when none. */
export type Imports = Partial<Record<Framework, string>>

type AttrValue = string | number | boolean | null | undefined

/**
 * HTML/Angular attributes: ` data-size="sm" disabled`.
 * `false`, `null`, `undefined` and `''` are left out; `true` renders a bare attribute.
 */
export function attrs(record: Record<string, AttrValue>): string {
  return Object.entries(record)
    .filter(([, value]) => value !== false && value != null && value !== '')
    .map(([name, value]) =>
      value === true ? ` ${name}` : ` ${name}="${escapeAttr(String(value))}"`,
    )
    .join('')
}

/**
 * JSX props: ` variant="secondary" loading data-size="sm"`.
 * Same filtering as {@link attrs}; numbers are wrapped in braces.
 */
export function props(record: Record<string, AttrValue>): string {
  return Object.entries(record)
    .filter(([, value]) => value !== false && value != null && value !== '')
    .map(([name, value]) => {
      if (value === true) return ` ${name}`
      if (typeof value === 'number') return ` ${name}={${value}}`
      return ` ${name}="${escapeAttr(value as string)}"`
    })
    .join('')
}

/** Indents every line of a multi-line string */
export function indent(code: string, spaces = 2): string {
  const pad = ' '.repeat(spaces)
  return code
    .split('\n')
    .map((line) => (line ? pad + line : line))
    .join('\n')
}

/** Escapes text content for HTML/JSX */
export function text(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('{', '&#123;')
    .replaceAll('}', '&#125;')
}

function escapeAttr(value: string): string {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;')
}
