import { Heading } from '@ks-digital/designsystem-angular/heading'
import { Paragraph } from '@ks-digital/designsystem-angular/paragraph'
import {
  argsToTemplate,
  componentWrapperDecorator,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular'
import { Skeleton } from './skeleton'

type SkeletonArgs = {
  'data-variant'?: 'rectangle' | 'circle' | 'text'
}

const meta: Meta<SkeletonArgs> = {
  component: Skeleton,
  title: 'Skeleton',
  argTypes: {
    'data-variant': {
      options: ['rectangle', 'circle', 'text'],
      control: { type: 'radio' },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [Heading, Paragraph, Skeleton],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div style="display:flex;flex-direction:column;justify-content:center;align-items:flex-start;gap:var(--ds-size-4);padding:var(--ds-size-4)">${story}</div>`,
    ),
  ],
}
export default meta
type Story = StoryObj<SkeletonArgs>

export const Preview: Story = {
  render: () => ({
    template: `
      <ksd-skeleton style="width: 300px; height: 150px;"></ksd-skeleton>
      <div style="display: flex; gap: 10px; align-items: center; padding: 5px 0 5px 0;">
        <ksd-skeleton data-variant="circle" style="width: 30px; height: 30px;"></ksd-skeleton>
        <h2 ksd-heading>
          <ksd-skeleton data-variant="text">En medium tittel</ksd-skeleton>
        </h2>
      </div>
      <ksd-skeleton data-variant="text" style="width: 140px;"></ksd-skeleton>
    `,
  }),
}

export const Rectangle: Story = {
  args: {
    'data-variant': 'rectangle',
  },
  render: (args) => ({
    props: args,
    template: `
      <ksd-skeleton ${argsToTemplate(args)} style="width:18rem;height:10rem"></ksd-skeleton>
    `,
  }),
}

export const Circle: Story = {
  args: {
    'data-variant': 'circle',
  },
  render: (args) => ({
    props: args,
    template: `
      <ksd-skeleton ${argsToTemplate(args)} style="width:4rem;height:4rem"></ksd-skeleton>
    `,
  }),
}

export const Text: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display:flex;gap:20px;max-width:300px">
        <div style="flex:1 1 200px">
          <h2 ksd-heading>En tittel</h2>
          <p ksd-paragraph data-size="sm">Her er en paragraf som går over flere linjer</p>
        </div>
        <div style="flex:1 1 200px">
          <h2 ksd-heading>
            <ksd-skeleton data-variant="text">En tittel</ksd-skeleton>
          </h2>
          <p ksd-paragraph data-size="sm">
            <ksd-skeleton data-variant="text" style="width: 40ch"></ksd-skeleton>
          </p>
        </div>
      </div>
    `,
  }),
}
