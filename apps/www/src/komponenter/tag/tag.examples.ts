import type { Imports, Snippets } from '@internal/storybook/snippets'

export const imports: Imports = {
  angular: `import { Tag } from '@ks-digital/designsystem-angular/tag'`,
  react: `import { Tag } from '@ks-digital/designsystem-react'`,
}

export const preview: Snippets = {
  html: `<span class="ds-tag" data-variant="default">Ny</span>`,
  angular: `<ksd-tag data-variant="default">Ny</ksd-tag>`,
  react: `<Tag variant="default">Ny</Tag>`,
}

export const variants: Snippets = {
  html: `<span class="ds-tag" data-variant="default">Default</span>
<span class="ds-tag" data-variant="outline">Outline</span>`,
  angular: `<ksd-tag data-variant="default">Default</ksd-tag>
<ksd-tag data-variant="outline">Outline</ksd-tag>`,
  react: `<>
  <Tag variant="default">Default</Tag>
  <Tag variant="outline">Outline</Tag>
</>`,
}

export const withIcon: Snippets = {
  html: `<span class="ds-tag" data-color="success" style="gap: var(--ds-size-1)">
  <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" fill="currentColor">
    <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
  </svg>
  Godkjent
</span>
<span class="ds-tag" data-color="info" style="gap: var(--ds-size-1)">
  <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" fill="currentColor">
    <path d="M200,75.64V40a16,16,0,0,0-16-16H72A16,16,0,0,0,56,40V76a16.07,16.07,0,0,0,6.4,12.8L114.67,128,62.4,167.2A16.07,16.07,0,0,0,56,180v36a16,16,0,0,0,16,16H184a16,16,0,0,0,16-16V180.36a16.09,16.09,0,0,0-6.35-12.77L141.27,128l52.38-39.6A16.05,16.05,0,0,0,200,75.64ZM184,216H72V180l56-42,56,42.35Zm0-140.36L128,118,72,76V40H184Z"></path>
  </svg>
  Under behandling
</span>`,
  angular: `<ksd-tag data-color="success">
  <ng-icon name="phosphorCheckCircle" aria-hidden="true" />
  Godkjent
</ksd-tag>
<ksd-tag data-color="info">
  <ng-icon name="phosphorHourglass" aria-hidden="true" />
  Under behandling
</ksd-tag>`,
  react: `<>
  <Tag data-color="success" style={{ gap: 'var(--ds-size-1)' }}>
    <CheckCircle aria-hidden />
    Godkjent
  </Tag>
  <Tag data-color="info" style={{ gap: 'var(--ds-size-1)' }}>
    <Hourglass aria-hidden />
    Under behandling
  </Tag>
</>`,
}
