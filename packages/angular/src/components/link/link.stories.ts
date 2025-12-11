import { NgIcon, provideIcons } from '@ng-icons/core'
import {
  phosphorArrowUpRight,
  phosphorPencilLine,
} from '@ng-icons/phosphor-icons/regular'
import { argsToTemplate, Meta, moduleMetadata } from '@storybook/angular'
import { CommonArgs } from '../../../.storybook/default-args'
import { Link } from './link'

type LinkArgs = CommonArgs

const meta: Meta<LinkArgs> = {
  component: Link,
  title: 'Komponenter/Link',
  decorators: [
    moduleMetadata({
      imports: [Link, NgIcon],
      providers: [provideIcons({ phosphorPencilLine, phosphorArrowUpRight })],
    }),
  ],
}
export default meta
type Story = Meta<LinkArgs>

export const Preview: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <a ksd-link href="https://example.com" ${argsToTemplate(args)}>
        Example Link
      </a>
    `,
  }),
}

export const InText: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <p>
        This is an example of a link within a paragraph. Click
        <a ksd-link href="https://example.com" ${argsToTemplate(args)}>here</a>
        to visit the example website.
      </p>
    `,
  }),
}

export const WithIcon: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <a ksd-link href="https://example.com" ${argsToTemplate(args)}>
        <ng-icon name="phosphorPencilLine" />
        <span>Example Link</span>
      </a>
    `,
  }),
}

export const WithIconRight: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <a ksd-link href="https://example.com" ${argsToTemplate(args)}>
        <span>Example Link</span>
        <ng-icon name="phosphorArrowUpRight" />
      </a>
    `,
  }),
}

export const WithMultipleIcons: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <a ksd-link href="https://example.com" ${argsToTemplate(args)}>
        <ng-icon name="phosphorPencilLine" />
        <span>Example Link</span>
        <ng-icon name="phosphorArrowUpRight" />
      </a>
    `,
  }),
}

export const WithOnlyIcons: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <a ksd-link href="https://example.com" ${argsToTemplate(args)} aria-label="Example Link">
        <ng-icon name="phosphorArrowUpRight" />
      </a>
    `,
  }),
}

export const WithSVG: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <a ksd-link href="https://example.com" ${argsToTemplate(args)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M227.32,73.37,182.63,28.69a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H216a8,8,0,0,0,0-16H115.32l112-112A16,16,0,0,0,227.32,73.37ZM136,75.31,152.69,92,68,176.69,51.31,160ZM48,208V179.31L76.69,208Zm48-3.31L79.32,188,164,103.31,180.69,120Zm96-96L147.32,64l24-24L216,84.69Z"></path></svg>
        <span>Tekst</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z"></path></svg>
      </a>
    `,
  }),
}

export const LongLink: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <a ksd-link href="https://example.com" ${argsToTemplate(args)}>
        This is an example of a very long link text that is meant to test how the link component handles overflow and wrapping within its container.
      </a>
    `,
  }),
}
