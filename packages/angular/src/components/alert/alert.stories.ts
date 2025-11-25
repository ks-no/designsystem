import { provideIcons } from '@ng-icons/core'
import { phosphorPencilLine } from '@ng-icons/phosphor-icons/regular'
import {
  componentWrapperDecorator,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular'
import { CommonArgs } from '../../../.storybook/default-args'
import { SeverityColors } from '../colors'
import { Paragraph } from '../paragraph/paragraph'
import { Alert } from './alert'

const SEVERITY_COLORS: SeverityColors[] = [
  'info',
  'success',
  'warning',
  'danger',
]

type AlertArgs = CommonArgs & {
  variant: 'default' | 'tinted'
}

const meta: Meta<AlertArgs> = {
  component: Alert,
  title: 'Komponenter/Alert',
  argTypes: {
    'data-size': {
      options: ['sm', 'md', 'lg'],
      control: { type: 'radio' },
    },
    'data-color': {
      options: SEVERITY_COLORS,
      control: { type: 'radio' },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [Alert, Paragraph],
      providers: [provideIcons({ phosphorPencilLine })],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div style="display:flex;flex-direction:row;justify-content:center;align-items:center;flex-wrap:wrap;gap:var(--ds-size-4)">${story}</div>`,
    ),
  ],
}
export default meta
type Story = StoryObj<AlertArgs>

export const Preview: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ksd-alert>
      En beskjed det er viktig at brukeren ser
      </ksd-alert>
    `,
  }),
}
