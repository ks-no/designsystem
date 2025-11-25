import { Meta, moduleMetadata, StoryObj } from '@storybook/angular'
import { Card } from '../card/card'
import { ControlledDetails } from './controlled-details'
import { Details } from './details'
import { DetailsContent } from './details-content'
import { DetailsSummary } from './details-summary'

const meta: Meta<Details> = {
  component: Details,
  title: 'Komponenter/Details',
  parameters: {
    layout: 'padded',
  },
  decorators: [
    moduleMetadata({
      imports: [
        Card,
        Details,
        DetailsContent,
        DetailsSummary,
        ControlledDetails,
      ],
    }),
  ],
}
export default meta
type Story = StoryObj<Details>

export const Preview: Story = {
  args: {},
  parameters: {
    summaryText: 'Vedlegg',
    contentText: 'Vedlegg 1, vedlegg 2, vedlegg 3',
  },
  render: (args, context) => ({
    props: {
      ...args,
      summary: context.parameters['summaryText'],
      content: context.parameters['contentText'],
    },
    template: `
      <ksd-details data-testid="details">
        <ksd-details-summary>Vedlegg</ksd-details-summary>
        <ksd-details-content>Vedlegg 1, vedlegg 2, vedlegg 3</ksd-details-content>
      </ksd-details>
    `,
  }),
}

export const WithoutCard: Story = {
  render: () => ({
    template: `
      <ksd-details>
        <ksd-details-summary>Vedlegg</ksd-details-summary>
        <ksd-details-content>Vedlegg 1, vedlegg 2, vedlegg 3</ksd-details-content>
      </ksd-details>
    `,
  }),
}

export const InCard: Story = {
  render: () => ({
    template: `
      <article ksd-card>
        <ksd-details>
          <ksd-details-summary>Vedlegg</ksd-details-summary>
          <ksd-details-content>Vedlegg 1, vedlegg 2, vedlegg 3</ksd-details-content>
        </ksd-details>
      </article>
    `,
  }),
}

export const InCardWithColor: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem">
        <article ksd-card>
          <ksd-details data-color="accent">
            <ksd-details-summary>Vedlegg</ksd-details-summary>
            <ksd-details-content>Vedlegg 1, vedlegg 2, vedlegg 3</ksd-details-content>
          </ksd-details>
        </article>
        <article ksd-card>
          <ksd-details data-color="accent" variant="tinted">
            <ksd-details-summary>Vedlegg</ksd-details-summary>
            <ksd-details-content>Vedlegg 1, vedlegg 2, vedlegg 3</ksd-details-content>
          </ksd-details>
        </article>
      </div>
    `,
  }),
}

export const WithDifferentSizes: Story = {
  render: () => ({
    template: `
      <ksd-details data-size="sm">
          <ksd-details-summary>Vedlegg</ksd-details-summary>
          <ksd-details-content>Vedlegg 1, vedlegg 2, vedlegg 3</ksd-details-content>
      </ksd-details>
      <ksd-details data-size="md">
          <ksd-details-summary>Vedlegg</ksd-details-summary>
          <ksd-details-content>Vedlegg 1, vedlegg 2, vedlegg 3</ksd-details-content>
      </ksd-details>
      <ksd-details data-size="lg">
          <ksd-details-summary>Vedlegg</ksd-details-summary>
          <ksd-details-content>Vedlegg 1, vedlegg 2, vedlegg 3</ksd-details-content>
      </ksd-details>
    `,
  }),
}

export const DefaultOpen: Story = {
  render: () => ({
    template: `
      <ksd-details [defaultOpen]="true">
        <ksd-details-summary>Vedlegg</ksd-details-summary>
        <ksd-details-content>Vedlegg 1, vedlegg 2, vedlegg 3</ksd-details-content>
      </ksd-details>
    `,
  }),
}

export const Controlled: StoryObj<ControlledDetails> = {
  render: () => ({
    template: `<fiks-controlled-details />`,
  }),
}
