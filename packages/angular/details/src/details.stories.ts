import { Card } from '@ks-digital/designsystem-angular/card'
import {
  argsToTemplate,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular'
import { CommonArgs, commonArgTypes } from '../../.storybook/default-args'
import { ControlledDetails } from './controlled-details'
import { Details } from './details'
import { DetailsContent } from './details-content'
import { DetailsSummary } from './details-summary'

type DetailsArgs = CommonArgs

const meta: Meta<DetailsArgs> = {
  component: Details,
  title: 'Komponenter/Details',
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    ...commonArgTypes,
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
type Story = StoryObj<DetailsArgs>

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
      <details ksd-details data-testid="details" ${argsToTemplate(args)}>
        <summary>Vedlegg</summary>
        <div>Vedlegg 1, vedlegg 2, vedlegg 3</div>
      </details>
    `,
  }),
}

export const WithoutCard: Story = {
  render: (args) => ({
    props: args,
    template: `
      <details ksd-details ${argsToTemplate(args)}>
        <summary>Vedlegg</summary>
        <div>Vedlegg 1, vedlegg 2, vedlegg 3</div>
      </details>
    `,
  }),
}

export const InCard: Story = {
  render: (args) => ({
    props: args,
    template: `
      <article ksd-card>
        <details ksd-details>
          <summary>Vedlegg</summary>
          <div>Vedlegg 1, vedlegg 2, vedlegg 3</div>
        </details>
      </article>
    `,
  }),
}

export const InCardWithColor: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem">
        <article ksd-card>
          <details ksd-details data-color="accent">
            <summary>Vedlegg</summary>
            <div>Vedlegg 1, vedlegg 2, vedlegg 3</div>
          </details>
        </article>
        <article ksd-card>
          <details ksd-details data-color="accent" data-variant="tinted">
            <summary>Vedlegg</summary>
            <div>Vedlegg 1, vedlegg 2, vedlegg 3</div>
          </details>
        </article>
      </div>
    `,
  }),
}

export const WithDifferentSizes: Story = {
  render: (args) => ({
    props: args,
    template: `
      <details ksd-details data-size="sm">
          <summary>Vedlegg</summary>
          <div>Vedlegg 1, vedlegg 2, vedlegg 3</div>
      </details>
      <details ksd-details data-size="md">
          <summary>Vedlegg</summary>
          <div>Vedlegg 1, vedlegg 2, vedlegg 3</div>
      </details>
      <details ksd-details data-size="lg">
          <summary>Vedlegg</summary>
          <div>Vedlegg 1, vedlegg 2, vedlegg 3</div>
      </details>
    `,
  }),
}
