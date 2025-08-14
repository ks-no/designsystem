import {
  argsToTemplate,
  componentWrapperDecorator,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular'
import { Icon } from '../icon/icon'
import { Button } from './button'

const meta: Meta<Button> = {
  component: Button,
  title: 'Komponenter/Button',
  decorators: [
    moduleMetadata({
      imports: [Button, Icon],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div style="display:flex;flex-direction:row;justify-content:center;align-items:center;flex-wrap:wrap;gap:var(--ds-size-4)">${story}</div>`,
    ),
  ],
}
export default meta
type Story = StoryObj<Button>

export const Preview: Story = {
  args: {
    loading: false,
    disabled: false,
  },

  render: (args) => ({
    props: args,
    template: `
      <button ksd-button ${argsToTemplate(args)}>
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
      <button ksd-button variant="primary" ${argsToTemplate(args)}>Primary</button>
      <button ksd-button variant="secondary" ${argsToTemplate(args)}>Secondary</button>
      <button ksd-button variant="tertiary" ${argsToTemplate(args)}>Teritiary</button>
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
        <ksd-icon icon="edit" />
      Rediger
      </button>

      <button icon ksd-button ${argsToTemplate(args)} aria-label="Kun ikon">
        <ksd-icon icon="edit" />
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
      <button ksd-button variant="primary" ${argsToTemplate(args)}>Primary</button>
      <button ksd-button variant="secondary" ${argsToTemplate(args)}>Secondary</button>
      <button ksd-button variant="tertiary" ${argsToTemplate(args)}>Teritiary</button>
    </div>
    `,
  }),
}
