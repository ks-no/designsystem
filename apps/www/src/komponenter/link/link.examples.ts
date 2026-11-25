import type { Imports, Snippets } from '@internal/storybook/snippets'

export const imports: Imports = {
  angular: `import { Link } from '@ks-digital/designsystem-angular/link'
import { Paragraph } from '@ks-digital/designsystem-angular/paragraph'`,
  react: `import { Link, Paragraph } from '@ks-digital/designsystem-react'`,
}

export const preview: Snippets = {
  html: `<a class="ds-link" href="#">kommunale tjenester</a>`,
  angular: `<a ksd-link href="#">kommunale tjenester</a>`,
  react: `<Link href="#">kommunale tjenester</Link>`,
}

export const inText: Snippets = {
  html: `<p class="ds-paragraph">
  Les mer om <a class="ds-link" href="#">kommunale tjenester</a>.
</p>`,
  angular: `<p ksd-paragraph>
  Les mer om <a ksd-link href="#">kommunale tjenester</a>.
</p>`,
  react: `<Paragraph>
  Les mer om <Link href="#">kommunale tjenester</Link>.
</Paragraph>`,
}

export const withIcon: Snippets = {
  html: `<a class="ds-link" href="#">
  <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" fill="currentColor">
    <path d="M227.32,73.37,182.63,28.69a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H216a8,8,0,0,0,0-16H115.32l112-112A16,16,0,0,0,227.32,73.37ZM136,75.31,152.69,92,68,176.69,51.31,160ZM48,208V179.31L76.69,208Zm48-3.31L79.32,188,164,103.31,180.69,120Zm96-96L147.32,64l24-24L216,84.69Z"></path>
  </svg>
  <span>Endre søknaden</span>
</a>
<a class="ds-link" href="#">
  <span>Last ned vedtaket (PDF, 2,4 MB)</span>
  <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" fill="currentColor">
    <path d="M224,144v64a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V144a8,8,0,0,1,16,0v56H208V144a8,8,0,0,1,16,0Zm-101.66,5.66a8,8,0,0,0,11.32,0l40-40a8,8,0,0,0-11.32-11.32L136,124.69V32a8,8,0,0,0-16,0v92.69L93.66,98.34a8,8,0,0,0-11.32,11.32Z"></path>
  </svg>
</a>`,
  angular: `<a ksd-link href="#">
  <ng-icon name="phosphorPencilLine" aria-hidden="true" />
  <span>Endre søknaden</span>
</a>
<a ksd-link href="#">
  <span>Last ned vedtaket (PDF, 2,4 MB)</span>
  <ng-icon name="phosphorDownloadSimple" aria-hidden="true" />
</a>`,
  react: `<>
  <Link href="#">
    <PencilLine aria-hidden />
    <span>Endre søknaden</span>
  </Link>
  <Link href="#">
    <span>Last ned vedtaket (PDF, 2,4 MB)</span>
    <DownloadSimple aria-hidden />
  </Link>
</>`,
}

/** Icons used in the example above */
export const withIconImports: Imports = {
  angular: `import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  phosphorDownloadSimple,
  phosphorPencilLine,
} from '@ng-icons/phosphor-icons/regular'

// I @Component:
// imports: [NgIcon],
// providers: [provideIcons({ phosphorDownloadSimple, phosphorPencilLine })],`,
  react: `import { DownloadSimple, PencilLine } from '@phosphor-icons/react'`,
}

export const iconOnly: Snippets = {
  html: `<a class="ds-link" href="#" aria-label="Endre søknaden">
  <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" fill="currentColor">
    <path d="M227.32,73.37,182.63,28.69a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H216a8,8,0,0,0,0-16H115.32l112-112A16,16,0,0,0,227.32,73.37ZM136,75.31,152.69,92,68,176.69,51.31,160ZM48,208V179.31L76.69,208Zm48-3.31L79.32,188,164,103.31,180.69,120Zm96-96L147.32,64l24-24L216,84.69Z"></path>
  </svg>
</a>`,
  angular: `<a ksd-link href="#" aria-label="Endre søknaden">
  <ng-icon name="phosphorPencilLine" aria-hidden="true" />
</a>`,
  react: `<Link href="#" aria-label="Endre søknaden">
  <PencilLine aria-hidden />
</Link>`,
}

/** Icons used in the example above */
export const iconOnlyImports: Imports = {
  angular: `import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  phosphorPencilLine,
} from '@ng-icons/phosphor-icons/regular'

// I @Component:
// imports: [NgIcon],
// providers: [provideIcons({ phosphorPencilLine })],`,
  react: `import { PencilLine } from '@phosphor-icons/react'`,
}

export const longText: Snippets = {
  html: `<a class="ds-link" href="#">
  Slik behandler kommunen søknader om dispensasjon fra reguleringsplanen
</a>`,
  angular: `<a ksd-link href="#">
  Slik behandler kommunen søknader om dispensasjon fra reguleringsplanen
</a>`,
  react: `<Link href="#">
  Slik behandler kommunen søknader om dispensasjon fra reguleringsplanen
</Link>`,
}
