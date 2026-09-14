import { Button } from '@ks-digital/designsystem-angular/button'
import { Input } from '@ks-digital/designsystem-angular/forms'
import { Tag } from '@ks-digital/designsystem-angular/tag'
import {
  argsToTemplate,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular'
import { CommonArgs, commonArgTypes } from '../../.storybook/default-args'
import { Card } from './card'
import { CardBlock } from './card-block'

type CardArgs = CommonArgs & {
  variant: 'default' | 'tinted'
}

const meta: Meta<CardArgs> = {
  component: Card,
  title: 'Card',
  argTypes: {
    ...commonArgTypes,
    variant: {
      options: ['default', 'tinted'],
      control: { type: 'radio' },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [Card, CardBlock, Input, Button, Tag],
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
    <h2 class="ds-heading"><a href="/" class="ds-link">Whole card is clickable when link is present inside heading</a></h2>
  </article>
</div>
    `,
  }),
}

export const Horizontal: Story = {
  render: (args) => ({
    props: args,
    template: `
<article ksd-card ${argsToTemplate(args)} style="display: flex; flex-wrap: wrap; align-items: flex-start; gap: var(--ds-size-6);">
  <img
    src="https://static.fiks.ks.no/img/kommunevaapen/4601.png"
    alt=""
    width="64"
    height="64"
    style="flex: 0 0 auto;"
  />
  <div style="flex: 1 1 16rem; display: flex; flex-direction: column; align-items: start; gap: var(--ds-size-3);">
    <h2 class="ds-heading" data-size="sm" style="margin: 0;">Brev fra kommunen</h2>
    <p class="ds-paragraph" style="margin: 0; color: var(--ds-color-neutral-text-subtle);">Fra Bergen kommune 12. november 2025</p>
    <div style="display: flex; flex-wrap: wrap; gap: var(--ds-size-2);">
      <ksd-tag data-color="success">Innsendt</ksd-tag>
      <ksd-tag data-color="info">1 ny oppgave</ksd-tag>
    </div>
    <p class="ds-paragraph" style="margin: 0;">Her kommer det en ekstra detaljtekst som gir litt mer kontekst og innhold til kortet. Denne teksten kan være opptil et par linjer lang.</p>
    <button ksd-button>Gå til sak</button>
  </div>
</article>
    `,
  }),
}

export const CheckboxCard: Story = {
  render: (args) => ({
    props: args,
    template: `
<div style="max-width: 320px;">
  <div ksd-card data-clickdelegatefor="target" ${argsToTemplate(args)}>
    <input id="target" ksd-input type="checkbox"/>
    <span style="padding-left: .5rem;">Clicking this card will toggle the checkbox</span>
  </div>
</div>
    `,
  }),
}
