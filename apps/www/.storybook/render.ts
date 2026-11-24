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
import { unsafeHTML } from 'lit/directives/unsafe-html.js'

/** Renders the story's static HTML example (`parameters.snippets.html`) */
export const renderExample = (
  _args: unknown,
  { parameters }: { parameters: Record<string, unknown> },
) =>
  // Our own example markup, never user input
  html`${unsafeHTML((parameters['snippets'] as HtmlSnippets).html)}`

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
