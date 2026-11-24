import type { Imports, Snippets } from '@internal/storybook/snippets'

export const imports: Imports = {
  react: `import { Badge } from '@ks-digital/designsystem-react'`,
}

export const preview: Snippets = {
  html: `<span class="ds-badge" data-count="5" data-variant="base"></span>`,
  angular: `<span class="ds-badge" data-count="5" data-variant="base"></span>`,
  react: `<Badge count={5} maxCount={99} variant="base" />`,
}

export const placement: Snippets = {
  html: `<span class="ds-badge--position" data-placement="top-right">
  <span class="ds-badge" data-count="3" data-color="danger"></span>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" role="img" aria-label="Innboks, 3 uleste meldinger">
    <path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48Zm-96,85.15L52.57,64H203.43ZM98.71,128,40,181.81V74.19Zm11.84,10.85,12,11.05a8,8,0,0,0,10.82,0l12-11.05,58,53.15H52.57ZM157.29,128,216,74.18V181.82Z" />
  </svg>
</span>`,
  angular: `<span class="ds-badge--position" data-placement="top-right">
  <span class="ds-badge" data-count="3" data-color="danger"></span>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" role="img" aria-label="Innboks, 3 uleste meldinger">
    <path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48Zm-96,85.15L52.57,64H203.43ZM98.71,128,40,181.81V74.19Zm11.84,10.85,12,11.05a8,8,0,0,0,10.82,0l12-11.05,58,53.15H52.57ZM157.29,128,216,74.18V181.82Z" />
  </svg>
</span>`,
  react: `<Badge.Position placement="top-right">
  <Badge count={3} data-color="danger" />
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" role="img" aria-label="Innboks, 3 uleste meldinger">
    <path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48Zm-96,85.15L52.57,64H203.43ZM98.71,128,40,181.81V74.19Zm11.84,10.85,12,11.05a8,8,0,0,0,10.82,0l12-11.05,58,53.15H52.57ZM157.29,128,216,74.18V181.82Z" />
  </svg>
</Badge.Position>`,
}
