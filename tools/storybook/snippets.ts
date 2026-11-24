/**
 * Code examples for the component docs.
 *
 * Each component has an `*.examples.ts` with its examples written out by hand, one string
 * per framework. Stories render the `html` string, so the live preview *is* the HTML
 * example, and the docs show the code for the selected framework.
 *
 * Nothing checks that the Angular and React code match the HTML. When you update a
 * component or upgrade Designsystemet, update its examples in all three frameworks.
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

/**
 * For examples whose code is the same in every framework (plain HTML, web components).
 * The docs then show an "HTML" label instead of the framework toggle.
 */
export type HtmlSnippets = { html: string }

/** One example, as stories pass it in `parameters.snippets` */
export type Example = Snippets | HtmlSnippets

/** Imports/registration needed once per component, per framework. Omit when none. */
export type Imports = Partial<Record<Framework, string>>
