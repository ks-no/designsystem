import { Link } from '@ks-digital/designsystem-angular/link'
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular'
import { CommonArgs, commonArgTypes } from '../../.storybook/default-args'
import { Breadcrumbs } from './breadcrumbs'

type BreadcrumbsArgs = CommonArgs

const meta: Meta<BreadcrumbsArgs> = {
  component: Breadcrumbs,
  title: 'Komponenter/Breadcrumbs',
  argTypes: {
    ...commonArgTypes,
  },
  decorators: [
    moduleMetadata({
      imports: [Link, Breadcrumbs],
    }),
  ],
}
export default meta
type Story = StoryObj<BreadcrumbsArgs>

export const Preview: Story = {
  render: (args) => ({
    props: args,
    template: `
      <nav aria-label="Du er her:" ksd-breadcrumbs>
        <a ksd-link href="#" aria-label="Tilbake til Søknader">Søknader</a>
        <ol>
          <li><a ksd-link href="#">Hjem</a></li>
          <li><a ksd-link href="#">Tjenester</a></li>
          <li><a ksd-link href="#">Søknader</a></li>
          <li><a ksd-link href="#" aria-current="page">Søknad om barnehageplass</a></li>
        </ol>
      </nav>
    `,
  }),
}

export const ListOnly: Story = {
  render: (args) => ({
    props: args,
    template: `
    <nav aria-label="Du er her:" ksd-breadcrumbs>
      <ol>
        <li><a ksd-link href="#">Nivå 1</a></li>
        <li><a ksd-link href="#">Nivå 2</a></li>
        <li><a ksd-link href="#">Nivå 3</a></li>
        <li><a ksd-link href="#" aria-current="page">Nivå 4</a></li>
      </ol>
    </nav>
    `,
  }),
}

export const BackOnly: Story = {
  render: (args) => ({
    props: args,
    template: `
    <nav aria-label="Du er her:" ksd-breadcrumbs>
      <a ksd-link href="#" aria-label="Tilbake til Nivå 3">Nivå 3</a>
    </nav>
    `,
  }),
}

export const LongItems: Story = {
  render: (args) => ({
    props: args,
    template: `
    <nav aria-label="Du er her:" ksd-breadcrumbs>
      <a
        ksd-link
        href="#"
        aria-label="Tilbake til Renovasjonsgebyr"
        >Slik betaler du renovasjonsgebyr</a
      >
      <ol aria-label="Du er her:">
        <li><a ksd-link href="#">Hjem</a></li>
        <li><a ksd-link href="#">Innbygger</a></li>
        <li><a ksd-link href="#">Avfall og gjenvinning</a></li>
        <li><a ksd-link href="#">Renovasjon og gebyr</a></li>
        <li>
          <a ksd-link href="#">Informasjon om renovasjonsgebyr</a>
        </li>
        <li>
          <a ksd-link href="#"
            >Slik betaler du renovasjonsgebyr</a
          >
        </li>
        <li>
          <a ksd-link href="#" aria-current="page"
            >Oppgjør og gebyrberegning</a
          >
        </li>
      </ol>
    </nav>

    `,
  }),
}

export const MobileView: Story = {
  render: (args) => ({
    props: args,
    template: `
    <nav aria-label="Du er her:" ksd-breadcrumbs>
      <a ksd-link href="#" aria-label="Tilbake til Nivå 3">Nivå 3</a>
      <ol>
        <li><a ksd-link href="#">Nivå 1</a></li>
        <li><a ksd-link href="#">Nivå 2</a></li>
        <li><a ksd-link href="#">Nivå 3</a></li>
        <li><a ksd-link href="#" aria-current="page">Nivå 4</a></li>
      </ol>
    </nav>
    `,
  }),
}
