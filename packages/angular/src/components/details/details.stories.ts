import { Meta, moduleMetadata, StoryObj } from '@storybook/angular'
import { expect, userEvent, within } from 'storybook/internal/test'
import { ControlledDetails } from './controlled-details'
import { Details } from './details'
import { DetailsContent } from './details-content'
import { DetailsSummary } from './details-summary'

const meta: Meta<Details> = {
  component: Details,
  title: 'Details',
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
      <fiks-details data-testid="details">
        <fiks-details-summary>Vedlegg</fiks-details-summary>
        <fiks-details-content>Vedlegg 1, vedlegg 2, vedlegg 3</fiks-details-content>
      </fiks-details>
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
      <fiks-details>
        <fiks-details-summary>Vedlegg</fiks-details-summary>
        <fiks-details-content>Vedlegg 1, vedlegg 2, vedlegg 3</fiks-details-content>
      </fiks-details>
    `,
  }),
}

export const WithCard: Story = {
  render: () => ({
    template: `
      <div class="ds-card">
        <fiks-details>
          <fiks-details-summary>Vedlegg</fiks-details-summary>
          <fiks-details-content>Vedlegg 1, vedlegg 2, vedlegg 3</fiks-details-content>
        </fiks-details>
      </div>
    `,
  }),
}

export const WithColors: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem">
        <div class="ds-card">
          <fiks-details data-color="accent">
            <fiks-details-summary>Vedlegg</fiks-details-summary>
            <fiks-details-content>Vedlegg 1, vedlegg 2, vedlegg 3</fiks-details-content>
          </fiks-details>
        </div>
        <div class="ds-card">
          <fiks-details data-color="accent" variant="tinted">
            <fiks-details-summary>Vedlegg</fiks-details-summary>
            <fiks-details-content>Vedlegg 1, vedlegg 2, vedlegg 3</fiks-details-content>
          </fiks-details>
        </div>
      </div>
    `,
  }),
}

export const WithDifferentSizes: Story = {
  render: () => ({
    template: `
      <fiks-details data-size="sm">
          <fiks-details-summary>Vedlegg</fiks-details-summary>
          <fiks-details-content>Vedlegg 1, vedlegg 2, vedlegg 3</fiks-details-content>
        </fiks-details>
        <fiks-details data-size="md">
          <fiks-details-summary>Vedlegg</fiks-details-summary>
          <fiks-details-content>Vedlegg 1, vedlegg 2, vedlegg 3</fiks-details-content>
        </fiks-details>
        <fiks-details data-size="lg">
          <fiks-details-summary>Vedlegg</fiks-details-summary>
          <fiks-details-content>Vedlegg 1, vedlegg 2, vedlegg 3</fiks-details-content>
        </fiks-details>
    `,
  }),
}

export const DefaultOpen: Story = {
  render: () => ({
    template: `
      <fiks-details [defaultOpen]="true">
        <fiks-details-summary>Vedlegg</fiks-details-summary>
        <fiks-details-content>Vedlegg 1, vedlegg 2, vedlegg 3</fiks-details-content>
      </fiks-details>
    `,
  }),
}

export const Controlled: StoryObj<ControlledDetails> = {
  render: () => ({
    template: `<fiks-controlled-details />`,
  }),
}
