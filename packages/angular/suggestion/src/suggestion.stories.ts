import { computed, signal } from '@angular/core'
import { Button } from '@ks-digital/designsystem-angular/button'
import { Field, Input, Label } from '@ks-digital/designsystem-angular/forms'
import { Paragraph } from '@ks-digital/designsystem-angular/paragraph'
import {
  argsToTemplate,
  componentWrapperDecorator,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular'
import { CommonArgs, commonArgTypes } from '../../.storybook/default-args'
import { Suggestion, SuggestionList, SuggestionListOption } from './index'
import type { SuggestionItem } from './suggestion.types'

type SuggestionArgs = CommonArgs & {
  multiple: boolean
  creatable: boolean
}

const suggestionArgsToTemplate = (args: SuggestionArgs) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { multiple: _multiple, creatable: _creatable, ...rest } = args
  return argsToTemplate(rest)
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

const DATA_MUNICIPALITIES: SuggestionItem[] = [
  { label: 'Bergen', value: '4601' },
  { label: 'Oslo', value: '0301' },
  { label: 'Stavanger', value: '1103' },
  { label: 'Molde', value: '1506' },
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
      (story) => `<div style="width:100%; max-width:500px;">${story}</div>`,
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
  args: {
    multiple: false,
    creatable: false,
  },
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
        <ksd-suggestion ${suggestionArgsToTemplate(args)}
          [multiple]="multiple"
          [creatable]="creatable"
          [selected]="selected()"
          (selectedChange)="onSelectedChange($event)"
        >
          <input
            type="text"
            ksd-input
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
  args: {
    multiple: false,
    creatable: false,
  },
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
          <ksd-suggestion ${suggestionArgsToTemplate(args)}
            [multiple]="multiple"
            [creatable]="creatable"
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
    creatable: false,
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
          <ksd-suggestion ${suggestionArgsToTemplate(args)}
            [multiple]="multiple"
            [creatable]="creatable"
            [selected]="selected()"
            (selectedChange)="onSelectedChange($event)"
          >
            <input type="text" ksd-input />
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
  args: {
    multiple: false,
    creatable: false,
  },
  render: (args) => {
    const selected = signal<SuggestionItem | null>(DATA_MUNICIPALITIES[0])

    return {
      props: {
        ...args,
        municipalities: DATA_MUNICIPALITIES,
        selected,
        onSelectedChange: (value: SuggestionItem | null) => selected.set(value),
        setStavanger: () => selected.set(DATA_MUNICIPALITIES[2]),
      },
      template: `
        <ksd-field>
          <ksd-label>Velg kommune</ksd-label>
          <ksd-suggestion ${suggestionArgsToTemplate(args)}
            [multiple]="multiple"
            [creatable]="creatable"
            [selected]="selected()"
            (selectedChange)="onSelectedChange($event)"
          >
            <input type="text" ksd-input placeholder="Velg kommune" />
            <del aria-label="Tøm" hidden=""></del>
            <ksd-suggestion-list>
              @for (municipality of municipalities; track municipality.value) {
                <ksd-suggestion-list-option [value]="municipality.value">{{ municipality.label }}</ksd-suggestion-list-option>
              }
            </ksd-suggestion-list>
          </ksd-suggestion>
        </ksd-field>

        <p ksd-paragraph>
          Valgt kommune: {{ selected()?.label || '' }} (kommunenummer: {{ selected()?.value || '' }})
        </p>
        <button ksd-button type="button" data-variant="secondary" (click)="setStavanger()">
          Sett Stavanger
        </button>
      `,
    }
  },
}

export const DefaultValue: Story = {
  args: {
    multiple: false,
    creatable: false,
  },
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
        <ksd-suggestion
          ${suggestionArgsToTemplate(args)}
          [multiple]="multiple"
          [creatable]="creatable"
          [selected]="selected"
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
    `,
  }),
}

export const Multiple: Story = {
  args: {
    multiple: true,
    creatable: false,
  },
  render: (args) => ({
    props: {
      ...args,
      places: DATA_PLACES,
    },
    template: `
      <ksd-field>
        <ksd-label>Velg en destinasjon</ksd-label>
        <ksd-suggestion
          ${suggestionArgsToTemplate(args)}
          [multiple]="multiple"
          [creatable]="creatable"
        >
          <input type="text" ksd-input />
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
        <ksd-suggestion
          ${suggestionArgsToTemplate(args)}
          [multiple]="multiple"
          [creatable]="creatable"
        >
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

export const CustomFiltering: Story = {
  args: {
    multiple: false,
    creatable: false,
  },
  render: (args) => {
    const selected = signal<SuggestionItem | null>(null)
    const query = signal('')

    const filteredMunicipalities = computed(() => {
      const value = query()
      if (!value) return DATA_MUNICIPALITIES

      const firstLetter = value.charAt(0)
      const isLetter = firstLetter.toLowerCase() !== firstLetter.toUpperCase()
      const isUppercase = firstLetter === firstLetter.toUpperCase()

      if (!isLetter || !isUppercase) return []

      return DATA_MUNICIPALITIES.filter((municipality) =>
        municipality.label.startsWith(firstLetter),
      )
    })

    return {
      props: {
        ...args,
        selected,
        filteredMunicipalities,
        onSelectedChange: (value: SuggestionItem | null) => selected.set(value),
        onInput: (event: Event) => {
          const target = event.target as HTMLInputElement | null
          query.set(target?.value ?? '')
        },
      },
      template: `
        <ksd-field>
          <ksd-label>Velg kommune (kun stor forbokstav matcher)</ksd-label>
          <ksd-suggestion
            ${suggestionArgsToTemplate(args)}
            [multiple]="multiple"
            [creatable]="creatable"
            [selected]="selected()"
            (selectedChange)="onSelectedChange($event)"
          >
            <input
              ksd-input
              (input)="onInput($event)"
            />
            <del aria-label="Tøm" hidden=""></del>
            <ksd-suggestion-list noFilter>
              @for (municipality of filteredMunicipalities(); track municipality.value) {
                <ksd-suggestion-list-option [value]="municipality.value">{{ municipality.label }}</ksd-suggestion-list-option>
              }
            </ksd-suggestion-list>
          </ksd-suggestion>
        </ksd-field>
      `,
    }
  },
}
