import { Meta, moduleMetadata, StoryObj } from '@storybook/angular'
import { expect, userEvent, within } from 'storybook/internal/test'
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
      imports: [Details, DetailsContent, DetailsSummary, ControlledDetails],
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
  play: async ({ canvasElement, context, step }) => {
    const canvas = within(canvasElement)
    const summaryText = context.parameters['summaryText']
    const contentText = context.parameters['contentText']
    const user = userEvent.setup()

    await step(
      'Detaljer skal vise innholdet når brukeren klikker på sammendraget',
      async () => {
        await user.click(canvas.getByText(summaryText))
        await expect(canvas.queryByText(summaryText)).toBeVisible()
        await expect(canvas.queryByText(contentText)).toBeVisible()
      },
    )

    await step(
      'Detaljer skal ikke lukke seg når brukeren klikker på innholdet',
      async () => {
        await user.click(canvas.getByText(contentText))
        await expect(canvas.queryByText(summaryText)).toBeVisible()
        await expect(canvas.queryByText(contentText)).toBeVisible()
      },
    )
  },
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
      <div class="ds-card">
        <ksd-details>
          <ksd-details-summary>Vedlegg</ksd-details-summary>
          <ksd-details-content>Vedlegg 1, vedlegg 2, vedlegg 3</ksd-details-content>
        </ksd-details>
      </div>
    `,
  }),
}

export const InCardWithColor: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem">
        <div class="ds-card">
          <ksd-details data-color="accent">
            <ksd-details-summary>Vedlegg</ksd-details-summary>
            <ksd-details-content>Vedlegg 1, vedlegg 2, vedlegg 3</ksd-details-content>
          </ksd-details>
        </div>
        <div class="ds-card">
          <ksd-details data-color="accent" variant="tinted">
            <ksd-details-summary>Vedlegg</ksd-details-summary>
            <ksd-details-content>Vedlegg 1, vedlegg 2, vedlegg 3</ksd-details-content>
          </ksd-details>
        </div>
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
