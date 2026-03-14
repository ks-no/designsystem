import { signal } from '@angular/core'
import { Button } from '@ks-digital/designsystem-angular/button'
import { Field, Input, Label } from '@ks-digital/designsystem-angular/forms'
import { Paragraph } from '@ks-digital/designsystem-angular/paragraph'
import {
  componentWrapperDecorator,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular'
import { CommonArgs, commonArgTypes } from '../../.storybook/default-args'
import {
  Suggestion,
  SuggestionList,
  SuggestionListOption,
  type SuggestionItem,
} from './suggestion'

type SuggestionArgs = CommonArgs & {
  multiple: boolean
  creatable: boolean
}

const DATA_PLACES = [
  'Sogndal',
  'Oslo',
  'Brønnøysund',
  'Stavanger',
  'Trondheim',
  'Bergen',
  'Lillestrøm',
]

const DATA_PEOPLE: SuggestionItem[] = [
  { label: 'Lars', value: '#004' },
  { label: 'James', value: '#007' },
  { label: 'Nina', value: '#113' },
  { label: 'Tove', value: '#110' },
]

const meta: Meta<SuggestionArgs> = {
  component: Suggestion,
  title: 'Suggestion',
  decorators: [
    moduleMetadata({
      imports: [
        Suggestion,
        SuggestionList,
        SuggestionListOption,
        Button,
        Field,
        Input,
        Label,
        Paragraph,
      ],
    }),
    componentWrapperDecorator(
      (story) => `<div style="max-width:600px;">${story}</div>`,
    ),
  ],
  argTypes: {
    ...commonArgTypes,
    multiple: {
      control: { type: 'boolean' },
    },
    creatable: {
      control: { type: 'boolean' },
    },
  },
}
export default meta
type Story = StoryObj<SuggestionArgs>

export const Preview: Story = {
  args: {},
  render: (args) => {
    const selected = signal<SuggestionItem[]>([])

    return {
      props: {
        ...args,
        places: DATA_PLACES,
        selected,
        onSelectedChange: (value: SuggestionItem[]) => {
          selected.set(value)
        },
      },
      template: `
      <ksd-field>
        <ksd-label>Velg en destinasjon</ksd-label>
        <ksd-suggestion
          [multiple]="true"
          [selected]="selected()"
          (selectedChange)="onSelectedChange($event)"
        >
          <input
            type="text"
            ksd-input
            placeholder="Skriv for å søke etter destinasjon"
          />
          <del aria-label="Tøm" hidden=""></del>
          <ksd-suggestion-list>
            @for (place of places; track place) {
              <ksd-suggestion-list-option [value]="place">{{ place }}</ksd-suggestion-list-option>
            }
          </ksd-suggestion-list>
        </ksd-suggestion>
      </ksd-field>
    `,
    }
  },
}

export const ControlledSingle: Story = {
  args: {},
  render: (args) => {
    const selected = signal<SuggestionItem | null>(null)

    return {
      props: {
        ...args,
        places: DATA_PLACES,
        selected,
        onSelectedChange: (value: SuggestionItem | null) => selected.set(value),
        setSogndal: () =>
          selected.set({
            label: 'Sogndal',
            value: 'Sogndal',
          }),
      },
      template: `
        <ksd-field>
          <ksd-label>Velg destinasjon</ksd-label>
          <ksd-suggestion
            [selected]="selected()"
            (selectedChange)="onSelectedChange($event)"
          >
            <input type="text" ksd-input placeholder="Velg destinasjon" />
            <del aria-label="Tøm" hidden=""></del>
            <ksd-suggestion-list>
              @for (place of places; track place) {
                <ksd-suggestion-list-option [value]="place">{{ place }}</ksd-suggestion-list-option>
              }
            </ksd-suggestion-list>
          </ksd-suggestion>
        </ksd-field>

        <p ksd-paragraph>Valgt reisemål: {{ selected()?.value || '' }}</p>
        <button ksd-button type="button" data-variant="secondary" (click)="setSogndal()">
          Sett reisemål til Sogndal
        </button>
      `,
    }
  },
}

export const ControlledMultiple: Story = {
  args: {
    multiple: true,
  },
  render: (args) => {
    const selected = signal<SuggestionItem[]>([
      { label: 'Oslo', value: 'Oslo' },
    ])

    return {
      props: {
        ...args,
        places: DATA_PLACES,
        selected,
        onSelectedChange: (value: SuggestionItem[]) => selected.set(value),
        setTwoPlaces: () =>
          selected.set([
            { label: 'Sogndal', value: 'Sogndal' },
            { label: 'Stavanger', value: 'Stavanger' },
          ]),
      },
      template: `
        <ksd-field>
          <ksd-label>Velg destinasjoner</ksd-label>
          <ksd-suggestion
            [multiple]="true"
            [selected]="selected()"
            (selectedChange)="onSelectedChange($event)"
          >
            <input type="text" ksd-input placeholder="Velg destinasjoner" />
            <del aria-label="Tøm" hidden=""></del>
            <ksd-suggestion-list>
              @for (place of places; track place) {
                <ksd-suggestion-list-option [value]="place">{{ place }}</ksd-suggestion-list-option>
              }
            </ksd-suggestion-list>
          </ksd-suggestion>
        </ksd-field>

        <p ksd-paragraph>
          Valgte reisemål:
          @for (item of selected(); track item.value) {
            {{ item.value }}
            @if (!$last) {
              ,
            }
          }
        </p>
        <button ksd-button type="button" data-variant="secondary" (click)="setTwoPlaces()">
          Sett reisemål til Sogndal, Stavanger
        </button>
      `,
    }
  },
}

export const ControlledIndependentLabelValue: Story = {
  args: {},
  render: (args) => {
    const selected = signal<SuggestionItem | null>(DATA_PEOPLE[0])

    return {
      props: {
        ...args,
        people: DATA_PEOPLE,
        selected,
        onSelectedChange: (value: SuggestionItem | null) => selected.set(value),
        setNina: () => selected.set(DATA_PEOPLE[2]),
      },
      template: `
        <ksd-field>
          <ksd-label>Velg person</ksd-label>
          <ksd-suggestion
            [selected]="selected()"
            (selectedChange)="onSelectedChange($event)"
          >
            <input type="text" ksd-input placeholder="Velg person" />
            <del aria-label="Tøm" hidden=""></del>
            <ksd-suggestion-list>
              @for (person of people; track person.value) {
                <ksd-suggestion-list-option [value]="person.value">{{ person.label }}</ksd-suggestion-list-option>
              }
            </ksd-suggestion-list>
          </ksd-suggestion>
        </ksd-field>

        <p ksd-paragraph>
          Valgt person: {{ selected()?.label || '' }} ({{ selected()?.value || '' }})
        </p>
        <button ksd-button type="button" data-variant="secondary" (click)="setNina()">
          Sett Nina
        </button>
      `,
    }
  },
}

export const DefaultValue: Story = {
  args: {},
  render: (args) => ({
    props: {
      ...args,
      places: DATA_PLACES,
      selected: {
        label: 'Sogndal',
        value: 'Sogndal',
      },
    },
    template: `
      <ksd-field>
        <ksd-label>Velg en destinasjon</ksd-label>
        <ksd-suggestion [selected]="selected">
          <input type="text" ksd-input placeholder="Velg destinasjon" />
          <del aria-label="Tøm" hidden=""></del>
          <ksd-suggestion-list>
            @for (place of places; track place) {
              <ksd-suggestion-list-option [value]="place">{{ place }}</ksd-suggestion-list-option>
            }
          </ksd-suggestion-list>
        </ksd-suggestion>
      </ksd-field>
    `,
  }),
}

export const Multiple: Story = {
  args: {
    multiple: true,
  },
  render: (args) => ({
    props: {
      ...args,
      places: DATA_PLACES,
    },
    template: `
      <ksd-field>
        <ksd-label>Velg en destinasjon</ksd-label>
        <ksd-suggestion [multiple]="true">
          <input type="text" ksd-input placeholder="Velg destinasjoner" />
          <del aria-label="Tøm" hidden=""></del>
          <ksd-suggestion-list>
            @for (place of places; track place) {
              <ksd-suggestion-list-option [value]="place">{{ place }}</ksd-suggestion-list-option>
            }
          </ksd-suggestion-list>
        </ksd-suggestion>
      </ksd-field>
    `,
  }),
}

export const Creatable: Story = {
  args: {
    multiple: true,
    creatable: true,
  },
  render: (args) => ({
    props: {
      ...args,
      places: DATA_PLACES,
    },
    template: `
      <ksd-field>
        <ksd-label>Velg eller legg til en destinasjon</ksd-label>
        <ksd-suggestion [multiple]="true" [creatable]="true">
          <input type="text" ksd-input placeholder="Velg eller legg til destinasjon" />
          <del aria-label="Tøm" hidden=""></del>
          <ksd-suggestion-list>
            @for (place of places; track place) {
              <ksd-suggestion-list-option [value]="place">{{ place }}</ksd-suggestion-list-option>
            }
          </ksd-suggestion-list>
        </ksd-suggestion>
      </ksd-field>
    `,
  }),
}
