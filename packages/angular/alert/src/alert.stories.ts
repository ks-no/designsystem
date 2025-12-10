import { SeverityColors } from '@ks-digital/designsystem-angular/__internals'
import { Paragraph } from '@ks-digital/designsystem-angular/paragraph'
import { provideIcons } from '@ng-icons/core'
import { phosphorPencilLine } from '@ng-icons/phosphor-icons/regular'
import {
  componentWrapperDecorator,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular'
import { CommonArgs } from '../../.storybook/default-args'
import { Alert } from './alert'

const SEVERITY_COLORS: SeverityColors[] = [
  'info',
  'success',
  'warning',
  'danger',
]

type AlertArgs = CommonArgs & {
  variant: 'default' | 'tinted'
}

const meta: Meta<AlertArgs> = {
  component: Alert,
  title: 'Komponenter/Alert',
  argTypes: {
    'data-size': {
      options: ['sm', 'md', 'lg'],
      control: { type: 'radio' },
    },
    'data-color': {
      options: SEVERITY_COLORS,
      control: { type: 'radio' },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [Alert, Paragraph],
      providers: [provideIcons({ phosphorPencilLine })],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div style="display:flex;flex-direction:row;justify-content:center;align-items:center;flex-wrap:wrap;gap:var(--ds-size-4)">${story}</div>`,
    ),
  ],
}
export default meta
type Story = StoryObj<AlertArgs>

export const Preview: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ksd-alert>
      En beskjed det er viktig at brukeren ser
      </ksd-alert>
    `,
  }),
}

export const VariantInfo: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <ksd-alert data-color="info">
      <h2 class="ds-heading" data-size="xs" style="margin-bottom: var(--ds-size-2)">
            Har du husket å bestille passtime?
      </h2>

      <p ksd-paragraph>
      Det er lange køer for å bestille pass om dagen, det kan være lurt å
      bestille i god tid før du skal reise.
      </p>
      </ksd-alert>
    `,
  }),
}

export const VariantWarning: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <ksd-alert data-color="warning">
      <h2 class="ds-heading" data-size="xs" style="margin-bottom: var(--ds-size-2)">
            Vi har tekniske problemer
      </h2>

      <p ksd-paragraph>
        Det gjør at du kan bli avbrutt mens du fyller ut skjemaet. Vi jobber med å
      rette problemene.
      </p>
      </ksd-alert>
    `,
  }),
}

export const VariantDanger: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <ksd-alert data-color="danger">
      <h2 class="ds-heading" data-size="xs" style="margin-bottom: var(--ds-size-2)">
            Det har skjedd en feil
      </h2>

      <p ksd-paragraph>
      Vi klarer ikke å hente informasjonen du ser etter akkurat nå. Prøv igjen
      litt senere. Hvis vi fortsatt ikke klarer å vise informasjonen du trenger,
      tar du kontakt med kundeservice på telefon 85 44 32 66.
      </p>
      </ksd-alert>
    `,
  }),
}

export const VariantSuccess: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <ksd-alert data-color="success">
      <h2 class="ds-heading" data-size="xs" style="margin-bottom: var(--ds-size-2)">
            Gratulerer! Du kan nå starte selskapet ditt
      </h2>

      <p ksd-paragraph>
      Det ser ut til at regnestykket går i pluss og at du har det som skal til
      for å starte selskapet ditt.
      </p>
      </ksd-alert>
    `,
  }),
}
