import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { commonArgTypes } from '../../../.storybook/args'
import type { BreadcrumbsArgs } from './breadcrumbs.examples'
import * as examples from './breadcrumbs.examples'

const ksd: KsdDocsParameters = {
  origin: 'digdir',
  digdir: 'breadcrumbs',
  imports: examples.imports,
}

const meta: Meta<BreadcrumbsArgs> = {
  title: 'Komponenter/Breadcrumbs',
  parameters: {
    ksd,
    layout: 'padded',
    docs: { canvas: { sourceState: 'none' } },
  },
  args: {
    'aria-label': 'Du er her:',
  },
  argTypes: {
    ...commonArgTypes,
    'aria-label': { control: 'text' },
  },
  render: (args, { parameters }) => parameters['snippets'](args).html,
}
export default meta

type Story = StoryObj<BreadcrumbsArgs>

export const Preview: Story = {
  parameters: { snippets: examples.preview },
}

export const ListOnly: Story = {
  name: 'Bare liste',
  parameters: { snippets: examples.listOnly },
}

export const BackOnly: Story = {
  name: 'Bare tilbake-lenke',
  parameters: { snippets: examples.backOnly },
}
