import { Field, Input, Label } from '@ks-digital/designsystem-angular/forms'
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular'
import { CommonArgs, commonArgTypes } from '../../.storybook/default-args'
import { Suggestion, SuggestionList, SuggestionListOption } from './suggestion'

type SuggestionArgs = CommonArgs & {}

const meta: Meta<SuggestionArgs> = {
  component: Suggestion,
  title: 'Suggestion',
  decorators: [
    moduleMetadata({
      imports: [
        Suggestion,
        SuggestionList,
        SuggestionListOption,
        Field,
        Input,
        Label,
      ],
    }),
  ],
  argTypes: {
    ...commonArgTypes,
  },
}
export default meta
type Story = StoryObj<SuggestionArgs>

export const Preview: Story = {
  args: {},
  render: (args) => ({
    props: {
      ...args,
      onSelectedChange: (event: unknown) => {
        console.log('selectedchange', event)
      },
    },
    template: `
    <ksd-field>
        <ksd-label> Velg organisasjon</ksd-label>
          <ksd-suggestion (selectedChange)="onSelectedChange($event)">
          <input
            type="search"
            ksd-input
            placeholder="Skriv for å søke etter organisasjon"
          />
          <del aria-label="Fjern innhold"></del>
          <ksd-suggestion-list>
            <ksd-suggestion-list-option value="123">Bergen</ksd-suggestion-list-option>
            <ksd-suggestion-list-option value="321">Oslo</ksd-suggestion-list-option>
          </ksd-suggestion-list>
          </ksd-suggestion>
      </ksd-field>
    `,
  }),
}
