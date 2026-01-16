import { Button } from '@ks-digital/designsystem-angular/button'
import {
  argsToTemplate,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular'
import { CommonArgs, commonArgTypes } from '../../.storybook/default-args'
import { Pagination } from './pagination'

type PaginationArgs = CommonArgs

const meta: Meta<PaginationArgs> = {
  component: Pagination,
  title: 'Komponenter/Pagination',
  argTypes: {
    ...commonArgTypes,
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
<nav ksd-pagination aria-label="Sidenavigering" ${argsToTemplate(args)} >
  <ul>
    <li>
      <button
        ksd-button
        data-variant="tertiary"
        type="button"
        aria-label="Forrige side"
      >
        Forrige
      </button>
    </li>
    <li>
      <button
        ksd-button
        data-variant="tertiary"
        type="button"
        aria-label="Side 1"
      >
        1
      </button>
    </li>
    <li>
      <button
        ksd-button
        data-variant="primary"
        type="button"
        aria-label="Side 2"
      >
        2
      </button>
    </li>
    <li></li>
    <li>
      <button
        ksd-button
        data-variant="tertiary"
        type="button"
        aria-label="Side 9"
      >
        9
      </button>
    </li>
    <li>
      <button
        ksd-button
        data-variant="tertiary"
        type="button"
        aria-label="Side 10"
      >
        10
      </button>
    </li>
    <li>
      <button
        ksd-button
        data-variant="tertiary"
        type="button"
        aria-label="Neste side"
      >
        Neste
      </button>
    </li>
  </ul>
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
