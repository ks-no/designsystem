import type { Meta, StoryObj } from '@storybook/angular'
import { Card } from './card'

const meta: Meta<Card> = {
  component: Card,
  title: 'Komponenter/Card',
}
export default meta
type Story = StoryObj<Card>

export const Preview: Story = {
  render: (_args: any) => ({
    template: `
<div style="max-width: 320px;">
  <ksd-card>
    <h2>Card</h2>
    <p>Most provide as with carried business are much better more the perfected designer. Writing slightly explain desk unable at supposedly about this</p>
    <p data-size="sm">Footer text</p>
  </ksd-card>
</div>
    `,
  }),
}

export const AsLink: Story = {
  render: (_args: any) => ({
    template: `
<div style="max-width: 320px;">
  <ksd-card>
    <h2>Nå er jeg ikke klikkbar</h2>
  </ksd-card>
  <ksd-card>
    <h2><a href="/">Nå er jeg klikkbar!</a></h2>
  </ksd-card>
</div>
    `,
  }),
}

export const TintedVariant: Story = {
  render: (_args: any) => ({
    imports: [Card],
    template: `
<div style="max-width: 320px;">
  <ksd-card variant="tinted">
    <p>Dette er et kort med tinted variant. Det har en annen bakgrunnsfarge.</p>
  </ksd-card>
</div>
    `,
  }),
}
