import { NgIcon, provideIcons } from '@ng-icons/core'
import { phosphorPencilLine } from '@ng-icons/phosphor-icons/regular'
import {
  argsToTemplate,
  componentWrapperDecorator,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular'
import {
  CommonArgs,
  commonArgTypes,
  sizes,
  themeColors,
} from '../../.storybook/default-args'
import { Tag } from './tag'

type TagArgs = CommonArgs & {
  'data-variant': 'default' | 'outline'
}

const meta: Meta<TagArgs> = {
  component: Tag,
  title: 'Komponenter/Tag',
  decorators: [
    moduleMetadata({
      imports: [Tag, NgIcon],
      providers: [provideIcons({ phosphorPencilLine })],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div style="display:flex;flex-direction:row;justify-content:center;align-items:center;flex-wrap:wrap;gap:var(--ds-size-4)">${story}</div>`,
    ),
  ],
  argTypes: {
    ...commonArgTypes,
    'data-variant': {
      options: ['default', 'outline'],
      control: { type: 'radio' },
    },
  },
}
export default meta
type Story = StoryObj<TagArgs>

export const Preview: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <ksd-tag  ${argsToTemplate(args)}>
        Tag
      </ksd-tag>
    `,
  }),
}

export const Colors: Story = {
  args: {},
  render: (args) => ({
    props: { ...args, themeColors },
    template: `
      @for (color of themeColors; track color) {
        <ksd-tag  ${argsToTemplate(args)} [data-color]="color">
          {{ color }}
        </ksd-tag>
      }
    `,
  }),
}

export const Sizes: Story = {
  args: {},
  render: (args) => ({
    props: { ...args, sizes },
    template: `
      @for (size of sizes; track size) {
        <ksd-tag [data-size]="size" ${argsToTemplate(args)}>
          {{ size }}
        </ksd-tag>
      }
    `,
  }),
}

export const Icons: Story = {
  args: {},
  render: (args) => ({
    props: { ...args, sizes },
    template: `
      <ksd-tag ${argsToTemplate(args)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24" focusable="false" role="img" aria-hidden="true"><path fill="currentColor" d="M15 14a.75.75 0 0 1 0 1.5H9A.75.75 0 0 1 9 14zM9.5 9a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3M14.5 9a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3"></path><path fill="currentColor" fill-rule="evenodd" d="M12 .5a1.5 1.5 0 0 1 .75 2.798V5h5.5a.75.75 0 0 1 .75.75v3.5h2.24a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-.75.75H19v3.5a.75.75 0 0 1-.75.75H5.75a.75.75 0 0 1-.75-.75v-3.5H2.75A.75.75 0 0 1 2 14v-4a.75.75 0 0 1 .75-.75H5v-3.5A.75.75 0 0 1 5.75 5h5.5V3.298A1.498 1.498 0 0 1 12 .5m-5.5 17h11v-11h-11zm-3-4.25H5v-2.5H3.5zm15.5 0h1.49v-2.5H19z" clip-rule="evenodd"></path></svg> Eget SVG-ikon
      </ksd-tag>
        
      <ksd-tag ${argsToTemplate(args)}>
        <ng-icon name="phosphorPencilLine" />
        Rediger
      </ksd-tag>
    `,
  }),
}

export const VariantOutline: Story = {
  args: {},
  render: (args) => ({
    props: { ...args, themeColors },
    template: `
      @for (color of themeColors; track color) {
        <ksd-tag data-variant="outline" [data-color]="color" ${argsToTemplate(args)}>
          {{ color }}
        </ksd-tag>
      }
    `,
  }),
}
