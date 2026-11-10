import { component, per, snippets } from '@internal/storybook/markup'
import type { Imports } from '@internal/storybook/snippets'

export type SearchArgs = {
  'data-size'?: 'sm' | 'md' | 'lg'
  'data-color'?: string
  /** Accessible name of the input, when there is no visible label */
  label: string
  buttonLabel: string
  variant: 'primary' | 'secondary'
}

export const imports: Imports = {
  html: `import '@ks-digital/designsystem-web'`,
  angular: `import {
  Search,
  SearchButton,
  SearchClear,
  SearchInput,
} from '@ks-digital/designsystem-angular/search'`,
  react: `import { Search } from '@ks-digital/designsystem-react'`,
}

// React's Search and Angular's ksd-search both render <ds-suggestion class="ds-search">
const Search = component({
  html: 'ds-suggestion.ds-search',
  angular: 'ksd-search',
  react: 'Search',
})
const Input = component({
  html: 'input.ds-input',
  angular: 'input[ksd-search-input]',
  react: 'Search.Input',
})
// ds-suggestion hides the clear button while the input is empty, and names it for screen readers
const Clear = component({
  html: 'button',
  angular: 'button[ksd-search-clear]',
  react: 'Search.Clear',
})
const Button = component({
  html: 'button.ds-button',
  angular: 'button[ksd-search-button]',
  react: 'Search.Button',
})
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

const clear = () => Clear({ type: per({ html: 'reset' }) })

const submit = ({ buttonLabel, variant }: SearchArgs) =>
  Button(
    {
      type: per({ html: 'submit' }),
      'data-variant': per({ html: variant }),
      // Angular and React use primary when left out
      variant: per({
        angular: variant === 'primary' ? undefined : variant,
        react: variant === 'primary' ? undefined : variant,
      }),
    },
    buttonLabel,
  )

const colorAndSize = (args: SearchArgs) => ({
  'data-size': args['data-size'],
  'data-color': args['data-color'],
})

// With a search button, type="text" leaves out the magnifying glass in the field
export const preview = (args: SearchArgs) =>
  snippets(
    Search(
      colorAndSize(args),
      Input({ type: 'text', 'aria-label': args.label }),
      clear(),
      submit(args),
    ),
  )

// type="search" shows the magnifying glass. Angular and React set it by default.
export const withIcon = (args: SearchArgs) =>
  snippets(
    Search(
      colorAndSize(args),
      Input({ type: per({ html: 'search' }), 'aria-label': args.label }),
      clear(),
    ),
  )

export const withLabel = (args: SearchArgs) =>
  snippets(
    Field(
      {},
      Label({}, 'Søk etter saksnummer eller navn'),
      Search(
        colorAndSize(args),
        Input({ type: 'text' }),
        clear(),
        submit(args),
      ),
    ),
  )
