import { signal } from '@angular/core'
import { Button } from '@ks-digital/designsystem-angular/button'
import { Field, Input, Label } from '@ks-digital/designsystem-angular/forms'
import { argsToTemplate, moduleMetadata, type Meta } from '@storybook/angular'
import { CommonArgs, commonArgTypes } from '../../.storybook/default-args'
import { Search } from './search'
import { SearchButton } from './search-button'
import { SearchClear } from './search-clear'
import { SearchInput } from './search-input'

type SearchArgs = CommonArgs & {
  variant?: 'primary' | 'secondary'
  buttonLabel?: string
  clearButtonLabel?: string
}

const meta: Meta<SearchArgs> = {
  component: Search,
  title: 'Search',
  argTypes: {
    ...commonArgTypes,
    variant: {
      options: ['primary', 'secondary'],
      control: { type: 'radio' },
      description: 'Velg variant for søkeknappen',
    },
    buttonLabel: {
      control: { type: 'text' },
      description: 'Label for søkeknappen',
    },
    clearButtonLabel: {
      control: { type: 'text' },
      description: 'Label for tøm-knappen',
    },
  },
  decorators: [
    moduleMetadata({
      imports: [
        Search,
        SearchClear,
        SearchButton,
        SearchInput,
        Button,
        Input,
        Field,
        Label,
      ],
    }),
  ],
}
export default meta
type Story = Meta<SearchArgs>

export const Preview: Story = {
  args: {
    variant: 'primary',
    buttonLabel: 'Søk',
    clearButtonLabel: 'Tøm',
  },
  render: (args) => ({
    props: args,
    template: `
      <ksd-search role="search" ${argsToTemplate(args, { exclude: ['variant', 'buttonLabel', 'clearButtonLabel'] })}>
        <input ksd-search-input role="searchbox" type="text" aria-label="Søkefelt" />
        <button ksd-search-clear [aria-label]="clearButtonLabel"></button>
        <button ksd-search-button [variant]="variant">{{ buttonLabel }}</button>
      </ksd-search>
    `,
  }),
}

export const Controlled: Story = {
  render: () => {
    const value = signal('')
    return {
      props: {
        value,
        onInput: (event: Event) =>
          value.set((event.target as HTMLInputElement).value),
      },
      template: `
        <ksd-search>
          <input ksd-search-input role="searchbox" type="text" [value]="value()" (input)="onInput($event)" />
          <button ksd-search-clear></button>
          <button ksd-search-button>Søk</button>
        </ksd-search>

        <div>
          <span>Current search value: "{{ value() }}"</span>

          <p>The input fires an <em>(input)</em> event both while typing and when the clear button empties it.</p>
        </div>
      `,
    }
  },
}

export const Variants: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <div>
        <p>Med ikon (uten søkeknapp)</p>
        <ksd-search>
          <input ksd-search-input role="searchbox" />
          <button ksd-search-clear></button>
        </ksd-search>
      </div>

      <div>
        <p>Primary variant (default)</p>
        <ksd-search>
          <input ksd-search-input role="searchbox" type="text" />
          <button ksd-search-clear></button>
          <button ksd-search-button>Søk</button>
        </ksd-search>
      </div>

      <div>
        <p>Secondary variant</p>
        <ksd-search>
          <input ksd-search-input role="searchbox" type="text" />
          <button ksd-search-clear></button>
          <button ksd-search-button variant="secondary">Søk</button>
        </ksd-search>
      </div>
    `,
  }),
}

export const WithLabel: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <ksd-field>
        <ksd-label>Søk etter hunder:</ksd-label>
        <ksd-search>
          <input ksd-search-input role="searchbox" type="text" name="dog-search" />
          <button ksd-search-clear></button>
          <button ksd-search-button>Søk</button>
        </ksd-search>
      </ksd-field>
    `,
  }),
}

export const Form: Story = {
  render: () => {
    const state = { value: '' }
    return {
      props: {
        state,
        onSubmit: (event: Event) => {
          event.preventDefault()
          const form = event.target as HTMLFormElement
          const formData = new FormData(form)
          state.value = formData.get('search') as string
        },
      },
      template: `
        <form role="search" (submit)="onSubmit($event)">
          <ksd-search>
            <input ksd-search-input role="searchbox" type="text" name="search" />
            <button ksd-search-clear></button>
            <button ksd-search-button>Søk</button>
          </ksd-search>
        </form>

        <p>Submitted value: "{{ state.value }}"</p>
    `,
    }
  },
}
