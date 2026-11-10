import {
  el,
  expr,
  per,
  snippets,
  type AttrValue,
  type Child,
} from '@internal/storybook/markup'
import type { Imports } from '@internal/storybook/snippets'
import {
  angularFormsImport,
  group,
  htmlImports,
  reactImport,
  toggle,
} from '../field/form-parts'

export type RadioArgs = {
  'data-size'?: 'sm' | 'md' | 'lg'
  'data-variant'?: 'outline'
  legend: string
  disabled?: boolean
}

export const imports: Imports = {
  html: htmlImports,
  angular: angularFormsImport(
    'Field',
    'FieldError',
    'Fieldset',
    'FieldsetDescription',
    'FieldsetLegend',
    'Input',
    'Label',
  ),
  react: reactImport('Fieldset', 'Radio', 'ValidationMessage'),
}

const answers = [
  ['digital', 'Digital postkasse'],
  ['brev', 'Brev i posten'],
  ['servicetorget', 'Hente på servicetorget'],
]

type GroupArgs = Partial<RadioArgs> & { error?: string }

const answerGroup = ({ legend, error, disabled, ...field }: GroupArgs) =>
  group(
    {
      legend: legend ?? 'Hvordan vil du få svar på søknaden?',
      description: 'Vi sender svaret innen tre uker.',
      error,
    },
    ...answers.map(([value, label]) =>
      toggle('radio', {
        label,
        name: 'svar',
        value,
        disabled,
        invalid: !!error,
        ...field,
      }),
    ),
  )

export const preview = (args: RadioArgs) => snippets(answerGroup(args))

export const withError = (args: RadioArgs) =>
  snippets(
    answerGroup({
      'data-size': args['data-size'],
      error: 'Velg hvordan du vil få svar.',
    }),
  )

const Row = (...children: Child[]) =>
  el(
    'div',
    {
      style: per<AttrValue>({
        html: 'display:flex;flex-wrap:wrap;gap:var(--ds-size-6)',
        angular: 'display:flex;flex-wrap:wrap;gap:var(--ds-size-6)',
        react: expr(
          "{ display: 'flex', flexWrap: 'wrap', gap: 'var(--ds-size-6)' }",
        ),
      }),
    },
    ...children,
  )

export const inline = (args: RadioArgs) =>
  snippets(
    group(
      { legend: 'Har du fått hjelp til å fylle ut søknaden?' },
      Row(
        ...[
          ['ja', 'Ja'],
          ['nei', 'Nei'],
        ].map(([value, label]) =>
          toggle('radio', {
            label,
            name: 'hjelp',
            value,
            'data-size': args['data-size'],
          }),
        ),
      ),
    ),
  )
