import {
  argsToTemplate,
  componentWrapperDecorator,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular'
import '~icons/material-symbols/edit'
import { Button } from './button'

const meta: Meta<Button> = {
  component: Button,
  title: 'Komponenter/Button',
  decorators: [
    moduleMetadata({
      imports: [Button],
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
          <icon-material-symbols-edit aria-hidden />
      Rediger
      </button>

      <button icon ksd-button ${argsToTemplate(args)} aria-label="Kun ikon">
        <icon-material-symbols-edit aria-hidden />
      </button>

      <button ksd-button ${argsToTemplate(args)}>
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
        <path d="M3 11.5L12 4l9 7.5" />
        <path d="M5 10.5v9.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9.5" />
        <path d="M10 21v-5a2 2 0 0 1 4 0v5" />
        </svg>

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
      <button ksd-button variant="primary" ${argsToTemplate(args)}>Primary</button>
      <button ksd-button variant="secondary" ${argsToTemplate(args)}>Secondary</button>
      <button ksd-button variant="tertiary" ${argsToTemplate(args)}>Teritiary</button>
    </div>
    `,
  }),
}
