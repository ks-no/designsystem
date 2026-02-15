import {
  argsToTemplate,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular'
import { CommonArgs, commonArgTypes } from '../../.storybook/default-args'
import { Pagination } from './pagination'
import { PaginationButton } from './pagination.button'

type PaginationArgs = CommonArgs & {
  current: number
  total: number
  show?: number
  href?: string
  ariaLabel?: string
}

const meta: Meta<PaginationArgs> = {
  component: Pagination,
  title: 'Komponenter/Pagination',
  args: {
    current: 5,
    total: 50,
  },
  argTypes: {
    ...commonArgTypes,
    current: {
      control: { type: 'number', min: 1 },
      description: 'The current page',
    },
    total: {
      control: { type: 'number', min: 1 },
      description: 'The total number of pages',
    },
    show: {
      control: { type: 'number', min: 3 },
      description: 'How many pages to show',
    },
    href: {
      control: { type: 'text' },
      description: 'URL pattern for links, e.g. "?page=%d"',
    },
    ariaLabel: {
      control: { type: 'text' },
      description: 'Aria-label for the pagination',
    },
  },
  decorators: [
    moduleMetadata({
      imports: [Pagination, PaginationButton],
    }),
  ],
}

export default meta
type Story = StoryObj<PaginationArgs>

export const Preview: Story = {
  render: (args) => ({
    props: {
      ...args,
      onpageClicked: (page: number) => console.log('pageClicked', page),
    },
    template: `
      <ksd-pagination ${argsToTemplate(args)} #pagination (pageClicked)="onpageClicked($event)">
        <ol>
          <li><button ksdPaginationButton>Forrige</button></li>
          @for (page of pagination.pages().pages; track page.key) {
            <li><button ksdPaginationButton></button></li>
          }
          <li><button ksdPaginationButton>Neste</button></li>
        </ol>
      </ksd-pagination>
    `,
  }),
}

export const WithLinks: Story = {
  args: {
    current: 5,
    total: 50,
    href: '?page=%d',
  },
  render: (args) => ({
    props: args,
    template: `
      <ksd-pagination ${argsToTemplate(args)} #pagination>
        <ol>
          <li><a ksdPaginationButton>Forrige</a></li>
          @for (page of pagination.pages().pages; track page.key) {
            <li><a ksdPaginationButton></a></li>
          }
          <li><a ksdPaginationButton>Neste</a></li>
        </ol>
      </ksd-pagination>
    `,
  }),
}

export const Mobile: Story = {
  args: {
    current: 3,
    total: 5,
    show: 3,
  },
  render: (args) => ({
    props: {
      ...args,
      onpageClicked: (page: number) => console.log('pageClicked', page),
    },
    template: `
      <ksd-pagination ${argsToTemplate(args)} #pagination (pageClicked)="onpageClicked($event)">
        <ol>
          <li><button ksdPaginationButton>Forrige</button></li>
          @for (page of pagination.pages().pages; track page.key) {
            <li><button ksdPaginationButton></button></li>
          }
          <li><button ksdPaginationButton>Neste</button></li>
        </ol>
      </ksd-pagination>
    `,
  }),
}
