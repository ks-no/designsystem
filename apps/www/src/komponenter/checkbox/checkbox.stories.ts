import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { sizes } from '../../../.storybook/args'
import type { CheckboxArgs } from './checkbox.examples'
import * as examples from './checkbox.examples'

const ksd: KsdDocsParameters = {
  origin: 'digdir',
  digdir: 'checkbox',
  imports: examples.imports,
}

const meta: Meta<CheckboxArgs> = {
  title: 'Komponenter/Checkbox',
  tags: ['autodocs'],
  parameters: {
    ksd,
    layout: 'padded',
    docs: { canvas: { sourceState: 'none' } },
  },
  args: {
    label: 'Jeg bekrefter at opplysningene er riktige',
    description: 'Du kan endre søknaden fram til fristen.',
    checked: false,
    disabled: false,
    readonly: false,
  },
  argTypes: {
    'data-size': { options: [...sizes], control: { type: 'radio' } },
    'data-variant': { options: ['outline'], control: { type: 'radio' } },
    'data-position': { options: ['start', 'end'], control: { type: 'radio' } },
    label: { control: 'text' },
    description: { control: 'text' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
  },
  render: (args, { parameters }) => parameters['snippets'](args).html,
}
export default meta

type Story = StoryObj<CheckboxArgs>

export const Preview: Story = { parameters: { snippets: examples.preview } }
export const Gruppe: Story = { parameters: { snippets: examples.inGroup } }
export const MedFeilmelding: Story = {
  name: 'Med feilmelding',
  parameters: { snippets: examples.withError },
}
