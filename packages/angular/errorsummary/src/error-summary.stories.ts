import { Heading } from '@ks-digital/designsystem-angular/heading'
import { Link } from '@ks-digital/designsystem-angular/link'
import {
  argsToTemplate,
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
      imports: [Link, ErrorSummary, Heading],
    }),
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
    <div class="ds-field">
      <label class="ds-label" data-weight="medium" for="fornavn">Fornavn</label>
      <div class="ds-field-affixes">
        <input
          class="ds-input"
          aria-invalid="true"
          id="fornavn"
          type="text"
          aria-describedby="fornavn:validation:1"
        >
      </div>
      <p
        class="ds-validation-message"
        data-field="validation"
        id="fornavn:validation:1"
      >Fornavn må være minst 2 tegn</p>
    </div>
    <div class="ds-field">
      <label class="ds-label" data-weight="medium" for="telefon">Telefon</label>
      <div class="ds-field-affixes">
        <input
          class="ds-input"
          aria-invalid="true"
          id="telefon"
          type="tel"
          aria-describedby="telefon:validation:1"
        >
      </div>
      <p
        class="ds-validation-message"
        data-field="validation"
        id="telefon:validation:1"
      >Telefonnummer kan kun inneholde siffer</p>
    </div>
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
