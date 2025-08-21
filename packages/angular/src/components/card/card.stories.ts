import {
  argsToTemplate,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular'
import { CommonArgs, commonArgTypes } from '../../../.storybook/default-args'
import { Card } from './card'
import { CardBlock } from './card.block'

type CardArgs = CommonArgs & {
  variant: 'default' | 'tinted'
}

const meta: Meta<CardArgs> = {
  component: Card,
  title: 'Komponenter/Card',
  argTypes: {
    ...commonArgTypes,
    variant: {
      options: ['default', 'tinted'],
      control: { type: 'radio' },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [Card, CardBlock],
    }),
  ],
}
export default meta
type Story = StoryObj<CardArgs>

export const Preview: Story = {
  render: (args) => ({
    props: args,
    template: `
<div style="max-width: 320px;">
  <article ksd-card ${argsToTemplate(args)}>
    <h2>Card</h2>
    <p>Most provide as with carried business are much better more the perfected designer. Writing slightly explain desk unable at supposedly about this</p>
    <p data-size="sm">Footer text</p>
  </article>
</div>
    `,
  }),
}

export const CardWithBlocks: Story = {
  render: (args) => ({
    props: args,
    template: `
<div style="max-width: 320px;">
  <article ksd-card ${argsToTemplate(args)}>
  <h2 ksd-card-block>Use blocks to section the card</h2>
  <p ksd-card-block>Most provide as with carried business are much better more the perfected designer. Writing slightly explain desk unable at supposedly about this</p>
  <p ksd-card-block>Valgfri fotnote</p>
</article>
</div>
    `,
  }),
}

export const ListOfCards: Story = {
  render: (args) => ({
    props: args,
    template: `
  <ul style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem;">
    <li ksd-card ${argsToTemplate(args)}>
      <h2>Item 1</h2>
      <p>Description</p>
    </li>
    <li ksd-card ${argsToTemplate(args)}>
      <h2>Item 2</h2>
      <p>Description</p>
    </li>
    <li ksd-card ${argsToTemplate(args)}>
      <h2>Item 3</h2>
      <p>Description</p>
    </li>
    <li ksd-card ${argsToTemplate(args)}>
      <h2>Item 4</h2>
      <p>Description</p>
    </li>
  </ul>
  `,
  }),
}

export const AsLink: Story = {
  render: (args) => ({
    props: args,
    template: `
<div style="max-width: 320px;">
  <article ksd-card ${argsToTemplate(args)}>
    <h2><a href="/">Whole card is clickable when link is present inside heading</a></h2>
  </article>
</div>
    `,
  }),
}
