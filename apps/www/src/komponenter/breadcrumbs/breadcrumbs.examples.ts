import type { Imports, Snippets } from '@internal/storybook/snippets'

export const imports: Imports = {
  html: `import '@ks-digital/designsystem-web'`,
  angular: `import { Breadcrumbs } from '@ks-digital/designsystem-angular/breadcrumbs'
import { Link } from '@ks-digital/designsystem-angular/link'`,
  react: `import { Breadcrumbs } from '@ks-digital/designsystem-react'`,
}

export const preview: Snippets = {
  html: `<ds-breadcrumbs class="ds-breadcrumbs" aria-label="Du er her:">
  <a class="ds-link" href="#" aria-label="Tilbake til Søknader">Søknader</a>
  <ol>
    <li>
      <a class="ds-link" href="#">Hjem</a>
    </li>
    <li>
      <a class="ds-link" href="#">Tjenester</a>
    </li>
    <li>
      <a class="ds-link" href="#">Søknader</a>
    </li>
    <li>
      <a class="ds-link" href="#">Søknad om barnehageplass</a>
    </li>
  </ol>
</ds-breadcrumbs>`,
  angular: `<ksd-breadcrumbs aria-label="Du er her:">
  <a ksd-link href="#" aria-label="Tilbake til Søknader">Søknader</a>
  <ol>
    <li>
      <a ksd-link href="#">Hjem</a>
    </li>
    <li>
      <a ksd-link href="#">Tjenester</a>
    </li>
    <li>
      <a ksd-link href="#">Søknader</a>
    </li>
    <li>
      <a ksd-link href="#">Søknad om barnehageplass</a>
    </li>
  </ol>
</ksd-breadcrumbs>`,
  react: `<Breadcrumbs aria-label="Du er her:">
  <Breadcrumbs.Link href="#" aria-label="Tilbake til Søknader">
    Søknader
  </Breadcrumbs.Link>
  <Breadcrumbs.List>
    <Breadcrumbs.Item>
      <Breadcrumbs.Link href="#">Hjem</Breadcrumbs.Link>
    </Breadcrumbs.Item>
    <Breadcrumbs.Item>
      <Breadcrumbs.Link href="#">Tjenester</Breadcrumbs.Link>
    </Breadcrumbs.Item>
    <Breadcrumbs.Item>
      <Breadcrumbs.Link href="#">Søknader</Breadcrumbs.Link>
    </Breadcrumbs.Item>
    <Breadcrumbs.Item>
      <Breadcrumbs.Link href="#">Søknad om barnehageplass</Breadcrumbs.Link>
    </Breadcrumbs.Item>
  </Breadcrumbs.List>
</Breadcrumbs>`,
}

export const listOnly: Snippets = {
  html: `<ds-breadcrumbs class="ds-breadcrumbs" aria-label="Du er her:">
  <ol>
    <li>
      <a class="ds-link" href="#">Hjem</a>
    </li>
    <li>
      <a class="ds-link" href="#">Tjenester</a>
    </li>
    <li>
      <a class="ds-link" href="#">Søknader</a>
    </li>
    <li>
      <a class="ds-link" href="#">Søknad om barnehageplass</a>
    </li>
  </ol>
</ds-breadcrumbs>`,
  angular: `<ksd-breadcrumbs aria-label="Du er her:">
  <ol>
    <li>
      <a ksd-link href="#">Hjem</a>
    </li>
    <li>
      <a ksd-link href="#">Tjenester</a>
    </li>
    <li>
      <a ksd-link href="#">Søknader</a>
    </li>
    <li>
      <a ksd-link href="#">Søknad om barnehageplass</a>
    </li>
  </ol>
</ksd-breadcrumbs>`,
  react: `<Breadcrumbs aria-label="Du er her:">
  <Breadcrumbs.List>
    <Breadcrumbs.Item>
      <Breadcrumbs.Link href="#">Hjem</Breadcrumbs.Link>
    </Breadcrumbs.Item>
    <Breadcrumbs.Item>
      <Breadcrumbs.Link href="#">Tjenester</Breadcrumbs.Link>
    </Breadcrumbs.Item>
    <Breadcrumbs.Item>
      <Breadcrumbs.Link href="#">Søknader</Breadcrumbs.Link>
    </Breadcrumbs.Item>
    <Breadcrumbs.Item>
      <Breadcrumbs.Link href="#">Søknad om barnehageplass</Breadcrumbs.Link>
    </Breadcrumbs.Item>
  </Breadcrumbs.List>
</Breadcrumbs>`,
}

export const backOnly: Snippets = {
  html: `<ds-breadcrumbs class="ds-breadcrumbs" aria-label="Du er her:">
  <a class="ds-link" href="#" aria-label="Tilbake til Søknader">Søknader</a>
</ds-breadcrumbs>`,
  angular: `<ksd-breadcrumbs aria-label="Du er her:">
  <a ksd-link href="#" aria-label="Tilbake til Søknader">Søknader</a>
</ksd-breadcrumbs>`,
  react: `<Breadcrumbs aria-label="Du er her:">
  <Breadcrumbs.Link href="#" aria-label="Tilbake til Søknader">
    Søknader
  </Breadcrumbs.Link>
</Breadcrumbs>`,
}

export const longItems: Snippets = {
  html: `<ds-breadcrumbs class="ds-breadcrumbs" aria-label="Du er her:">
  <a
    class="ds-link"
    href="#"
    aria-label="Tilbake til Slik betaler du renovasjonsgebyr"
    >Slik betaler du renovasjonsgebyr</a
  >
  <ol>
    <li>
      <a class="ds-link" href="#">Hjem</a>
    </li>
    <li>
      <a class="ds-link" href="#">Innbygger</a>
    </li>
    <li>
      <a class="ds-link" href="#">Avfall og gjenvinning</a>
    </li>
    <li>
      <a class="ds-link" href="#">Renovasjon og gebyr</a>
    </li>
    <li>
      <a class="ds-link" href="#">Informasjon om renovasjonsgebyr</a>
    </li>
    <li>
      <a class="ds-link" href="#">Slik betaler du renovasjonsgebyr</a>
    </li>
    <li>
      <a class="ds-link" href="#">Oppgjør og gebyrberegning</a>
    </li>
  </ol>
</ds-breadcrumbs>`,
  angular: `<ksd-breadcrumbs aria-label="Du er her:">
  <a
    ksd-link
    href="#"
    aria-label="Tilbake til Slik betaler du renovasjonsgebyr"
    >Slik betaler du renovasjonsgebyr</a
  >
  <ol>
    <li>
      <a ksd-link href="#">Hjem</a>
    </li>
    <li>
      <a ksd-link href="#">Innbygger</a>
    </li>
    <li>
      <a ksd-link href="#">Avfall og gjenvinning</a>
    </li>
    <li>
      <a ksd-link href="#">Renovasjon og gebyr</a>
    </li>
    <li>
      <a ksd-link href="#">Informasjon om renovasjonsgebyr</a>
    </li>
    <li>
      <a ksd-link href="#">Slik betaler du renovasjonsgebyr</a>
    </li>
    <li>
      <a ksd-link href="#">Oppgjør og gebyrberegning</a>
    </li>
  </ol>
</ksd-breadcrumbs>`,
  react: `<Breadcrumbs aria-label="Du er her:">
  <Breadcrumbs.Link
    href="#"
    aria-label="Tilbake til Slik betaler du renovasjonsgebyr"
  >
    Slik betaler du renovasjonsgebyr
  </Breadcrumbs.Link>
  <Breadcrumbs.List>
    <Breadcrumbs.Item>
      <Breadcrumbs.Link href="#">Hjem</Breadcrumbs.Link>
    </Breadcrumbs.Item>
    <Breadcrumbs.Item>
      <Breadcrumbs.Link href="#">Innbygger</Breadcrumbs.Link>
    </Breadcrumbs.Item>
    <Breadcrumbs.Item>
      <Breadcrumbs.Link href="#">Avfall og gjenvinning</Breadcrumbs.Link>
    </Breadcrumbs.Item>
    <Breadcrumbs.Item>
      <Breadcrumbs.Link href="#">Renovasjon og gebyr</Breadcrumbs.Link>
    </Breadcrumbs.Item>
    <Breadcrumbs.Item>
      <Breadcrumbs.Link href="#">
        Informasjon om renovasjonsgebyr
      </Breadcrumbs.Link>
    </Breadcrumbs.Item>
    <Breadcrumbs.Item>
      <Breadcrumbs.Link href="#">
        Slik betaler du renovasjonsgebyr
      </Breadcrumbs.Link>
    </Breadcrumbs.Item>
    <Breadcrumbs.Item>
      <Breadcrumbs.Link href="#">Oppgjør og gebyrberegning</Breadcrumbs.Link>
    </Breadcrumbs.Item>
  </Breadcrumbs.List>
</Breadcrumbs>`,
}
