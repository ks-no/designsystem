import {
  component,
  el,
  expr,
  per,
  raw,
  snippets,
  type Attrs,
  type Child,
} from '@internal/storybook/markup'
import type { Imports } from '@internal/storybook/snippets'

export type SuggestionArgs = {
  'data-size'?: 'sm' | 'md' | 'lg'
  'data-color'?: string
  label: string
  multiple: boolean
  creatable: boolean
}

export const imports: Imports = {
  html: `// Registrerer <ds-suggestion>, én gang i applikasjonen\nimport '@ks-digital/designsystem-web'`,
  angular: `import { Field, Input, Label } from '@ks-digital/designsystem-angular/forms'
import {
  Suggestion,
  SuggestionList,
  SuggestionListEmpty,
  SuggestionListOption,
} from '@ks-digital/designsystem-angular/suggestion'`,
  react: `import {
  EXPERIMENTAL_Suggestion as Suggestion,
  Field,
  Label,
} from '@ks-digital/designsystem-react'`,
}

const Field = component({
  html: 'ds-field.ds-field',
  angular: 'ksd-field',
  react: 'Field',
})
const Label = component({
  html: 'label.ds-label',
  angular: 'ksd-label',
  react: 'Label',
})
// ksd-suggestion renders <ds-suggestion class="ds-suggestion"> and the <u-datalist> itself
const Suggestion = component({
  html: 'ds-suggestion.ds-suggestion',
  angular: 'ksd-suggestion',
  react: 'Suggestion',
})
const Input = component({
  html: 'input.ds-input',
  angular: 'input[ksd-input]',
  react: 'Suggestion.Input',
})
// No clear component in Angular: a plain reset button, as in HTML.
// ds-suggestion hides it while the input is empty, and names it for screen readers.
const Clear = component({ html: 'button', react: 'Suggestion.Clear' })
const List = component({
  html: 'u-datalist',
  angular: 'ksd-suggestion-list',
  react: 'Suggestion.List',
})
const Option = component({
  html: 'u-option',
  angular: 'ksd-suggestion-list-option',
  react: 'Suggestion.Option',
})
const Empty = component({
  html: 'u-option',
  angular: 'ksd-suggestion-list-empty',
  react: 'Suggestion.Empty',
})

// The value is the municipality number, the label is what the user sees and searches
const kommuner = [
  { label: 'Bergen', value: '4601' },
  { label: 'Kristiansand', value: '4204' },
  { label: 'Oslo', value: '0301' },
  { label: 'Stavanger', value: '1103' },
  { label: 'Trondheim', value: '5001' },
]

const field = (
  args: SuggestionArgs,
  suggestionAttrs: Attrs,
  before: Child[] = [],
  after: Child[] = [],
) =>
  Field(
    {},
    Label({}, args.label),
    Suggestion(
      {
        ...suggestionAttrs,
        'data-size': args['data-size'],
        'data-color': args['data-color'],
      },
      ...before,
      Input(),
      Clear({ type: per({ html: 'reset', angular: 'reset' }) }),
      List(
        {},
        ...kommuner.map(({ label, value }) => Option({ value }, label)),
        // Left empty with creatable, so ds-suggestion can show «Legg til "…"» in it
        Empty(
          { 'data-empty': per({ html: true }) },
          args.creatable ? '' : 'Ingen treff',
        ),
      ),
      ...after,
    ),
  )

export const preview = (args: SuggestionArgs) =>
  snippets(
    field(args, {
      // u-combobox reads data-multiple/data-creatable; the components take booleans
      'data-multiple': per({ html: args.multiple }),
      'data-creatable': per({ html: args.creatable }),
      multiple: per({ angular: args.multiple, react: args.multiple }),
      creatable: per({ angular: args.creatable, react: args.creatable }),
    }),
  )

// Single choice with a saved value: Oslo is already selected
export const inForm = (args: SuggestionArgs) =>
  snippets(
    per({
      angular: raw(`<!--
  I komponenten, med form og FormField fra '@angular/forms/signals':
  skjema = form(signal({ kommune: '0301' }))
-->`),
    }),
    field(
      args,
      {
        '[formField]': per({ angular: 'skjema.kommune' }),
        name: per({ react: 'kommune' }),
        defaultSelected: per({
          react: expr("{ label: 'Oslo', value: '0301' }"),
        }),
      },
      // The selected values are <data> elements; ds-suggestion keeps the input in sync
      [per({ html: el('data', { value: '0301' }, 'Oslo') })],
      // ds-suggestion keeps this <select> in sync with the selection, so it's sent with the form
      [per({ html: el('select', { name: 'kommune', hidden: true }) })],
    ),
  )
