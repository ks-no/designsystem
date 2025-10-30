import { moduleMetadata, type Meta } from '@storybook/angular'
import { expect } from 'storybook/internal/test'
import { CommonArgs, commonArgTypes } from '../../../.storybook/default-args'
import { Button } from '../button'
import { Field } from '../field/field'
import { Input } from '../input'
import { Label } from '../label/label'
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
  title: 'Komponenter/Search',
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
type Story = Meta<Search>

export const Preview: Story = {
  args: {
    variant: 'primary',
    buttonLabel: 'Søk',
    clearButtonLabel: 'Tøm',
    'data-size': '',
    'data-color': '',
  },
  render: (args) => ({
    props: {
      ...args,
      dataSize: (args as SearchArgs)['data-size'],
      dataColor: (args as SearchArgs)['data-color'],
    },
    template: `
      <div ksd-search role="search" [attr.data-size]="dataSize" [attr.data-color]="dataColor">
        <input ksd-input ksdSearchInput role="searchbox" aria-label="Søkefelt" />
        <button ksd-button ksdSearchClear [aria-label]="clearButtonLabel"></button>
        <button ksd-button ksdSearchButton [variant]="variant" [aria-label]="buttonLabel"></button>
      </div>
    `,
  }),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('search')).toBeTruthy()
  },
}

export const Controlled: Story = {
  render: () => {
    const state = {
      value: '',
    }
    return {
      props: {
        state,

        setInput: (value: string) => {
          state.value = value
        },

        setValue: (event: KeyboardEvent) => {
          const input = event.target as HTMLInputElement
          state.value = input.value
        },

        clearValue: () => {
          state.value = ''
        },
      },
      template: `
        <div ksd-search>
          <input ksd-input ksdSearchInput role="searchbox" [value]="state.value" (keyup)="setValue($event)"/>
          <button ksd-button ksdSearchClear (clearInput)="clearValue()" ></button>
          <button ksd-button ksdSearchButton></button>
        </div>

        <div>
          <span>Current search value: "{{ state.value }}"</span>

          <button ksd-button (click)="setInput('Calzone')">
            Set input value to "Calzone"
          </button>

          <p>The clear button has an output <em>(clearInput)</em> that is emitted when clicked.</p>
        </div>

      `,
    }
  },
  play: async ({ canvas }) => {
    const searchInput = (await canvas.getByRole(
      'searchbox',
    )) as HTMLInputElement
    await expect(searchInput.value).toBe('')
  },
}

export const Variants: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <div>
        <p>Primary variant (default)</p>
        <div ksd-search>
          <input ksd-input ksdSearchInput role="searchbox" />
          <button ksd-button ksdSearchClear></button>
          <button ksd-button ksdSearchButton></button>
        </div>
      </div>

      <div>
        <p>Secondary variant</p>
        <div ksd-search>
          <input ksd-input ksdSearchInput role="searchbox" />
          <button ksd-button ksdSearchClear></button>
          <button ksd-button ksdSearchButton variant="secondary"></button>
        </div>
      </div>

      <div>
        <p>Search with icon</p>
        <div ksd-search>
          <input ksd-input ksdSearchInput role="searchbox" />
          <button ksd-button ksdSearchClear></button>
        </div>
      </div>
    `,
  }),
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole('searchbox').length).toBe(3)
  },
}

export const WithLabel: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <ksd-field>
        <ksd-label>Søk etter hunder:</ksd-label>
        <div ksd-search>
          <input ksd-input ksdSearchInput role="searchbox" name="dog-search" />
          <button ksd-button ksdSearchClear></button>
          <button ksd-button ksdSearchButton></button>
        </div>
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
        onClear: () => {
          state.value = ''
        },
      },
      template: `
        <form ksd-search role="search" (submit)="onSubmit($event)">
          <input ksd-input ksdSearchInput role="searchbox" name="search" />
          <button ksd-button ksdSearchClear (clearInput)="onClear()"></button>
          <button ksd-button ksdSearchButton></button>
        </form>

        <p>Submitted value: "{{ state.value }}"</p>
    `,
    }
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('search')).toBeTruthy()
  },
}
