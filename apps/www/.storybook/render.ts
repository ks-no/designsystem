/**
 * Rendering for the docs stories. Every story renders a lit template, so decorators can
 * wrap any story the same way:
 * - stories without Controls show their static HTML example (`renderExample`);
 * - stories with Controls have their own lit `render(args)`. The code examples stay static.
 */
import type { HtmlSnippets } from '@internal/storybook/snippets'
import type { Decorator } from '@storybook/web-components-vite'
import { html } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'

type ExampleContext = { parameters: Record<string, unknown> }

/**
 * The only place the docs turn a string into HTML (lint blocks it everywhere else).
 * Pass it the story's `parameters`, which come from our own `*.examples.ts` files.
 * Never pass it args or anything built from them: args can be set from the URL.
 */
export const parseExample = ({ parameters }: ExampleContext) => {
  const template = document.createElement('template')
  // eslint-disable-next-line no-unsanitized/property -- static examples from our own source files
  template.innerHTML = (parameters['snippets'] as HtmlSnippets).html
  return template.content
}

/** Renders the story's static HTML example (`parameters.snippets.html`) */
export const renderExample = (_args: unknown, context: ExampleContext) =>
  html`${parseExample(context)}`

/**
 * Lets the size and colour Controls work on every story. Designsystemet inherits
 * `data-size` and `data-color` from parents, so a wrapper that takes no space is enough.
 */
export const withSizeAndColor: Decorator = (story, { args }) => {
  const size = args['data-size'] as string | undefined
  const color = args['data-color'] as string | undefined
  if (!size && !color) return story()
  return html`<div
    style="display: contents"
    data-size=${ifDefined(size)}
    data-color=${ifDefined(color)}
  >
    ${story()}
  </div>`
}
