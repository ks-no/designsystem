import { component, per, snippets } from '@internal/storybook/markup'
import type { Imports } from '@internal/storybook/snippets'

export type ChipArgs = {
  'data-size'?: 'sm' | 'md' | 'lg'
  'data-color'?: string
}

export const imports: Imports = {
  angular: `import { Chip } from '@ks-digital/designsystem-angular/chip'
import { Input } from '@ks-digital/designsystem-angular/forms'`,
  react: `import { Chip } from '@ks-digital/designsystem-react'`,
}

// A label around a checkbox or radio button. React's Chip.Checkbox/Chip.Radio render the input.
const Choice = (react: 'Chip.Checkbox' | 'Chip.Radio') =>
  component({ html: 'label.ds-chip', angular: 'label[ksd-chip]', react })
const Checkbox = Choice('Chip.Checkbox')
const Radio = Choice('Chip.Radio')
const Input = component({ html: 'input.ds-input', angular: 'input[ksd-input]' })
const Removable = component({
  html: 'button.ds-chip',
  angular: 'button[ksd-chip]',
  react: 'Chip.Removable',
})

type Option = { value: string; label: string; checked?: boolean }

const choice = (
  chip: typeof Checkbox,
  type: 'checkbox' | 'radio',
  name: string,
  { value, label, checked }: Option,
  attrs: ChipArgs,
) => {
  const input = Input({ type, name, value, checked })
  return chip(
    {
      ...attrs,
      name: per({ react: name }),
      value: per({ react: value }),
      defaultChecked: per({ react: checked }),
    },
    per({ html: input, angular: input }),
    label,
  )
}

export const preview = (args: ChipArgs) =>
  snippets(
    ...[
      { value: 'barnehage', label: 'Barnehage', checked: true },
      { value: 'skole', label: 'Skole' },
      { value: 'sfo', label: 'SFO' },
    ].map((option) => choice(Checkbox, 'checkbox', 'tjeneste', option, args)),
  )

export const radio = (args: ChipArgs) =>
  snippets(
    ...[
      { value: 'bokmal', label: 'Bokmål', checked: true },
      { value: 'nynorsk', label: 'Nynorsk' },
    ].map((option) => choice(Radio, 'radio', 'malform', option, args)),
  )

export const removable = (args: ChipArgs) =>
  snippets(
    ...['Barnehage', 'Skole'].map((label) =>
      Removable(
        {
          // React sets type="button" and data-removable itself
          type: per({ react: null, default: 'button' }),
          'data-removable': per({ html: true, angular: true }),
          // The text alone doesn't say that the chip removes the filter
          'aria-label': `Fjern filteret ${label}`,
          ...args,
        },
        label,
      ),
    ),
  )
