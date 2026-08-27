import { NgIcon, provideIcons } from '@ng-icons/core'
import { phosphorPencilLine } from '@ng-icons/phosphor-icons/regular'
import {
  argsToTemplate,
  componentWrapperDecorator,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular'
import { CommonArgs, commonArgTypes } from '../../.storybook/default-args'
import { Button } from './button'

type ButtonArgs = CommonArgs & {
  loading: boolean
  disabled: boolean
  'data-variant': 'primary' | 'secondary' | 'tertiary'
}

const meta: Meta<ButtonArgs> = {
  component: Button,
  title: 'Button',
  decorators: [
    moduleMetadata({
      imports: [Button, NgIcon],
      providers: [provideIcons({ phosphorPencilLine })],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div style="display:flex;flex-direction:row;justify-content:center;align-items:center;flex-wrap:wrap;gap:var(--ds-size-4)">${story}</div>`,
    ),
  ],
  argTypes: {
    ...commonArgTypes,
    'data-variant': {
      options: ['primary', 'secondary', 'tertiary'],
      control: { type: 'radio' },
    },
  },
}
export default meta
type Story = StoryObj<ButtonArgs>

export const Preview: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <button ksd-button  ${argsToTemplate(args)}>
        Knapp
      </button>
    `,
  }),
}

export const Variants: Story = {
  args: {
    ...Preview.args,
  },
  render: (args) => ({
    props: args,
    template: `
    <div style="display:flex;flex-direction:row;justify-content:center;align-items:center;flex-wrap:wrap;gap:var(--ds-size-4);">
      <button ksd-button  ${argsToTemplate(args)} data-variant="primary">Primary</button>
      <button ksd-button  ${argsToTemplate(args)} data-variant="secondary">Secondary</button>
      <button ksd-button  ${argsToTemplate(args)} data-variant="tertiary">Tertiary</button>
    </div>
    `,
  }),
}

export const Icons: Story = {
  args: {
    ...Preview.args,
  },
  render: (args) => ({
    props: args,
    template: `
       <button ksd-button ${argsToTemplate(args)}>
          <ng-icon name="phosphorPencilLine" />
      Rediger
      </button>

      <button icon ksd-button ${argsToTemplate(args)} aria-label="Kun ikon">
        <ng-icon name="phosphorPencilLine" />
      </button>

      <button ksd-button ${argsToTemplate(args)}>
        <svg aria-hidden xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" fill="currentColor"><path d="M240,102c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,228.66,16,172,16,102A62.07,62.07,0,0,1,78,40c20.65,0,38.73,8.88,50,23.89C139.27,48.88,157.35,40,178,40A62.07,62.07,0,0,1,240,102Z"></path></svg>
      Eget SVG-ikon
      </button>
    `,
  }),
}

export const AsLink: Story = {
  args: {
    ...Preview.args,
  },
  render: (args) => ({
    props: args,
    template: `
    <a ksd-button target="_blank" rel="noreferrer" href="https://ksdigital.no" ${argsToTemplate(args)}>Gå til ksdigital.no</a>
    `,
  }),
}

export const Loading: Story = {
  args: {
    ...Preview.args,
    loading: true,
  },
  render: (args) => ({
    props: args,
    template: `
    <div style="display:flex;flex-direction:row;justify-content:center;align-items:center;flex-wrap:wrap;gap:var(--ds-size-4);">
      <button ksd-button data-variant="primary" ${argsToTemplate(args)}>Primary</button>
      <button ksd-button data-variant="secondary" ${argsToTemplate(args)}>Secondary</button>
      <button ksd-button data-variant="tertiary" ${argsToTemplate(args)}>Teritiary</button>
    </div>
    `,
  }),
}
