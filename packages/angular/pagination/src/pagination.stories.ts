import { Button } from '@ks-digital/designsystem-angular/button'
import {
  argsToTemplate,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular'
import { CommonArgs, commonArgTypes } from '../../.storybook/default-args'
import { Pagination } from './pagination'

type PaginationArgs = CommonArgs & {
  'data-current'?: number
  'data-total'?: number
}

const meta: Meta<PaginationArgs> = {
  component: Pagination,
  title: 'Komponenter/Pagination',
  argTypes: {
    ...commonArgTypes,
    'data-current': {
      control: { type: 'number' },
      description: 'The current page',
    },
    'data-total': {
      control: { type: 'number' },
      description: 'The total number of pages',
    },
  },
  decorators: [
    moduleMetadata({
      imports: [Button, Pagination],
    }),
  ],
}
export default meta
type Story = StoryObj<PaginationArgs>

export const Preview: Story = {
  render: (args) => ({
    props: args,
    template: `
    <nav ksd-pagination data-current="2" data-total="100" ${argsToTemplate(args)}>
      <ol>
        <li><a class="ds-button" data-variant="tertiary" href="#none"></a></li>
        <li><a class="ds-button" data-variant="tertiary" href="#none"></a></li>
        <li><a class="ds-button" data-variant="tertiary" href="#none"></a></li>
        <li><a class="ds-button" data-variant="tertiary" href="#none"></a></li>
        <li><a class="ds-button" data-variant="tertiary" href="#none"></a></li>
        <li><a class="ds-button" data-variant="tertiary" href="#none"></a></li>
        <li><a class="ds-button" data-variant="tertiary" href="#none"></a></li>
      </ol>
    </nav>

    `,
  }),
}

export const WithAnchor: Story = {
  render: (args) => ({
    props: args,
    template: `
<nav aria-label="Sidenavigering" ksd-pagination>
  <ul>
    <li>
      <a
        href="#forrige-side"
        ksd-button
        data-variant="tertiary"
        aria-label="Forrige side"
        aria-hidden="false"
        >Forrige</a
      >
    </li>
    <li>
      <a
        href="#side-1"
        ksd-button
        data-variant="tertiary"
        aria-label="Side 1"
        >1</a
      >
    </li>
    <li>
      <a
        href="#side-2"
        ksd-button
        data-variant="primary"
        aria-label="Side 2"
        aria-current="page"
        >2</a
      >
    </li>
    <li>
      <a
        href="#side-3"
        ksd-button
        data-variant="tertiary"
        aria-label="Side 3"
        >3</a
      >
    </li>
    <li>
      <a
        href="#side-4"
        ksd-button
        data-variant="tertiary"
        aria-label="Side 4"
        >4</a
      >
    </li>
    <li>
      <a
        href="#side-5"
        ksd-button
        data-variant="tertiary"
        aria-label="Side 5"
        >5</a
      >
    </li>
    <li></li>
    <li>
      <a
        href="#side-10"
        ksd-button
        data-variant="tertiary"
        aria-label="Side 10"
        >10</a
      >
    </li>
    <li>
      <a
        href="#neste-side"
        ksd-button
        data-variant="tertiary"
        aria-label="Neste side"
        aria-hidden="false"
        >Neste</a
      >
    </li>
  </ul>
</nav>

    `,
  }),
}

export const Mobile: Story = {
  render: (args) => ({
    props: args,
    template: `
<nav aria-label="Sidenavigering" class="ds-pagination">
  <ul>
    <li>
      <button
        ksd-button
        data-variant="tertiary"
        type="button"
        aria-label="Forrige side"
      ></button>
    </li>
    <li>
      <button
        ksd-button
        data-variant="tertiary"
        type="button"
        aria-label="Side 2"
      >
        2
      </button>
    </li>
    <li>
      <button
        ksd-button
        data-variant="primary"
        type="button"
        aria-label="Side 3"
      >
        3
      </button>
    </li>
    <li>
      <button
        ksd-button
        data-variant="tertiary"
        type="button"
        aria-label="Side 4"
      >
        4
      </button>
    </li>
    <li>
      <button
        ksd-button
        data-variant="tertiary"
        type="button"
        aria-label="Neste side"
      ></button>
    </li>
  </ul>
</nav>
    `,
  }),
}
