import { component, per, snippets } from '@internal/storybook/markup'
import type { Imports } from '@internal/storybook/snippets'

export type LabelArgs = {
  'data-size'?: 'sm' | 'md' | 'lg'
  label: string
}

export const imports: Imports = {
  html: `import '@ks-digital/designsystem-web'`,
  angular: `import { Field, Input, Label } from '@ks-digital/designsystem-angular/forms'`,
  react: `import { Field, Input, Label } from '@ks-digital/designsystem-react'`,
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
const Input = component({
  html: 'input.ds-input',
  angular: 'input[ksd-input]',
  react: 'Input',
})

// Field connects label and input in Angular and React. In HTML, set for and id yourself.
export const preview = ({ label, ...attrs }: LabelArgs) =>
  snippets(
    Field(
      {},
      Label({ for: per({ html: 'fullt-navn' }), ...attrs }, label),
      Input({ id: per({ html: 'fullt-navn' }), type: 'text' }),
    ),
  )
