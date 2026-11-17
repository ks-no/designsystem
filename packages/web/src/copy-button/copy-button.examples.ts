import type { HtmlSnippets, Imports } from '@internal/storybook/snippets'

export const imports: Imports = {
  html: `import '@ks-digital/designsystem-web'`,
}

export const preview: HtmlSnippets = {
  html: `<p
  class="ds-paragraph"
  style="display:flex;align-items:center;gap:var(--ds-size-2)"
>
  Saksnummer
  <strong>2026/01482-7</strong>
  <button
    class="ds-button"
    type="button"
    data-variant="tertiary"
    data-icon
    data-copy="2026/01482-7"
    data-copy-label="Kopier"
    data-copied-label="Kopiert"
  ></button>
</p>`,
}

export const iconOnly: HtmlSnippets = {
  html: `<button
  class="ds-button"
  type="button"
  data-variant="secondary"
  data-icon
  data-copy="2026/01482-7"
  data-copy-label="Kopier"
  data-copied-label="Kopiert"
></button>`,
}

export const iconAndText: HtmlSnippets = {
  html: `<button
  class="ds-button"
  type="button"
  data-variant="secondary"
  data-copy="https://designsystem.ks.no/copy-button"
  data-copy-label="Kopier lenke til denne siden"
  data-copied-label="Kopiert"
>
  Kopier lenke
</button>`,
}
