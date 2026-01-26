import { Field, Input, Label } from '@ks-digital/designsystem-angular/forms'
import { Heading } from '@ks-digital/designsystem-angular/heading'
import { Link } from '@ks-digital/designsystem-angular/link'
import { ValidationMessage } from '@ks-digital/designsystem-angular/validation-message'
import {
  argsToTemplate,
  componentWrapperDecorator,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular'
import { CommonArgs, commonArgTypes } from '../../.storybook/default-args'
import { ErrorSummary } from './error-summary'

type ErrorSummaryArgs = Omit<CommonArgs, 'data-color'>

const meta: Meta<ErrorSummaryArgs> = {
  component: ErrorSummary,
  title: 'Komponenter/ErrorSummary',
  argTypes: {
    'data-size': commonArgTypes['data-size'],
  },
  decorators: [
    moduleMetadata({
      imports: [
        Link,
        ErrorSummary,
        Heading,
        Field,
        Input,
        Label,
        ValidationMessage,
      ],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div style="display: grid; align-items: stretch; gap: var(--ds-size-4);">${story}</div>`,
    ),
  ],
}
export default meta
type Story = StoryObj<ErrorSummaryArgs>

export const Preview: Story = {
  render: (args) => ({
    props: args,
    template: `
    <div
      ksd-error-summary
      ${argsToTemplate(args)}
    >
      <h2 ksd-heading>For å gå videre må du rette opp følgende feil:</h2>
      <ul class="ds-list">
        <li>
          <a ksd-link data-color="neutral" href="#">Fødselsdato kan ikke være etter år 2005</a>
        </li>
        <li>
          <a ksd-link data-color="neutral" href="#">Telefonnummer kan kun inneholde siffer</a>
        </li>
        <li>
          <a ksd-link data-color="neutral" href="#">E-post må være gyldig</a>
        </li>
      </ul>
    </div>

    `,
  }),
}

export const WithForm: Story = {
  render: (args) => ({
    props: args,
    template: `
    <ksd-field>
      <ksd-label>Fornavn</ksd-label>
        <input
          ksd-input
          aria-invalid="true"
          type="text"
        />
        <p
        ksd-validation-message
      >Fornavn må være minst 2 tegn</p>
      </ksd-field>
      
    <ksd-field>
      <ksd-label>Telefon</ksd-label>
      <input
          ksd-input
          aria-invalid="true"
          type="text"
        />
      <p ksd-validation-message
      >Telefonnummer kan kun inneholde siffer</p>
    </ksd-field>
    <div
      ksd-error-summary
      ${argsToTemplate(args)}
    >
      <h2 ksd-heading>For å gå videre må du rette opp følgende feil:</h2>
      <ul class="ds-list">
        <li>
          <a ksd-link data-color="neutral" href="#fornavn">Fornavn må være minst 2 tegn</a>
        </li>
        <li>
          <a ksd-link data-color="neutral" href="#telefon">Telefonnummer kan kun inneholde siffer</a>
        </li>
      </ul>
    </div>
    `,
  }),
}
