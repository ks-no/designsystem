import { JsonPipe } from '@angular/common'
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
  current?: number
  total?: number
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
      control: { type: 'number' },
      description: 'The current page',
    },
    total: {
      control: { type: 'number' },
      description: 'The total number of pages',
    },
    show: {
      control: { type: 'number' },
      description: 'How many pages to show',
    },
    href: {
      control: { type: 'text' },
      description: 'The base href for the pagination links',
    },
    ariaLabel: {
      control: { type: 'text' },
      description: 'Aria-label for the pagination',
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
      <ksd-pagination ${argsToTemplate(args)} /> 
    `,
  }),
}

// export const WithAnchor: Story = {
//   render: (args) => ({
//     props: args,
//     template: `
// <nav aria-label="Sidenavigering" ksd-pagination ${argsToTemplate(args)}>
//   <ul>
//     <li>
//       <a
//         href="#forrige-side"
//         ksd-button
//         data-variant="tertiary"
//         aria-label="Forrige side"
//         aria-hidden="false"
//         >Forrige</a
//       >
//     </li>
//     <li>
//       <a
//         href="#side-1"
//         ksd-button
//         data-variant="tertiary"
//         aria-label="Side 1"
//         >1</a
//       >
//     </li>
//     <li>
//       <a
//         href="#side-2"
//         ksd-button
//         data-variant="primary"
//         aria-label="Side 2"
//         aria-current="page"
//         >2</a
//       >
//     </li>
//     <li>
//       <a
//         href="#side-3"
//         ksd-button
//         data-variant="tertiary"
//         aria-label="Side 3"
//         >3</a
//       >
//     </li>
//     <li>
//       <a
//         href="#side-4"
//         ksd-button
//         data-variant="tertiary"
//         aria-label="Side 4"
//         >4</a
//       >
//     </li>
//     <li>
//       <a
//         href="#side-5"
//         ksd-button
//         data-variant="tertiary"
//         aria-label="Side 5"
//         >5</a
//       >
//     </li>
//     <li></li>
//     <li>
//       <a
//         href="#side-10"
//         ksd-button
//         data-variant="tertiary"
//         aria-label="Side 10"
//         >10</a
//       >
//     </li>
//     <li>
//       <a
//         href="#neste-side"
//         ksd-button
//         data-variant="tertiary"
//         aria-label="Neste side"
//         aria-hidden="false"
//         >Neste</a
//       >
//     </li>
//   </ul>
// </nav>

//     `,
//   }),
// }

// export const Mobile: Story = {
//   render: (args) => ({
//     props: args,
//     template: `
// <nav aria-label="Sidenavigering" ksd-pagination ${argsToTemplate(args)}>
//   <ul>
//     <li>
//       <button
//         ksd-button
//         data-variant="tertiary"
//         type="button"
//         aria-label="Forrige side"
//       ></button>
//     </li>
//     <li>
//       <button
//         ksd-button
//         data-variant="tertiary"
//         type="button"
//         aria-label="Side 2"
//       >
//         2
//       </button>
//     </li>
//     <li>
//       <button
//         ksd-button
//         data-variant="primary"
//         type="button"
//         aria-label="Side 3"
//       >
//         3
//       </button>
//     </li>
//     <li>
//       <button
//         ksd-button
//         data-variant="tertiary"
//         type="button"
//         aria-label="Side 4"
//       >
//         4
//       </button>
//     </li>
//     <li>
//       <button
//         ksd-button
//         data-variant="tertiary"
//         type="button"
//         aria-label="Neste side"
//       ></button>
//     </li>
//   </ul>
// </nav>
//     `,
//   }),
// }

// export const WithPaginationHelper: Story = {
//   render: (args) => {
//     const current = args['data-current'] ?? 5
//     const total = args['data-total'] ?? 50
//     const pager = pagination({ current, total, show: 7 })

//     return {
//       props: {
//         ...args,
//         pager,
//       },
//       template: `
//         <nav ksd-pagination aria-label="Pagination">
//           <ol>
//             <li>
//               <a class="ds-button" data-variant="tertiary" href="#">
//                 Forrige
//               </a>
//             </li>
//             @for (p of pager.pages; track p.key) {
//               <li>
//                 <a
//                   class="ds-button"
//                   [attr.data-variant]="p.current ? 'primary' : 'tertiary'"
//                   href="#"
//                 >
//                   {{ p.page || '...'}}
//                 </a>
//               </li>
//             }
//             <li>
//               <a class="ds-button" data-variant="tertiary" href="#">
//                 Neste
//               </a>
//             </li>
//           </ol>
//         </nav>
//       `,
//     }
//   },
// }
