import { Button } from '@ks-digital/designsystem-angular/button'
import { Heading } from '@ks-digital/designsystem-angular/heading'
import { Paragraph } from '@ks-digital/designsystem-angular/paragraph'
import {
  Meta,
  StoryObj,
  argsToTemplate,
  moduleMetadata,
} from '@storybook/angular'
import { CommonArgs, commonArgTypes } from '../../.storybook/default-args'
import { Dialog } from './dialog'

type DialogArgs = CommonArgs & {
  'data-placement'?: 'bottom' | 'top' | 'left' | 'right'
  closedby?: 'any' | 'closerequest' | 'none'
}

const meta: Meta<DialogArgs> = {
  component: Dialog,
  title: 'Dialog',
  decorators: [
    moduleMetadata({
      imports: [Button, Dialog, Heading, Paragraph],
    }),
  ],
  argTypes: {
    ...commonArgTypes,
    'data-placement': {
      options: ['bottom', 'top', 'left', 'right'],
      control: { type: 'radio' },
    },
    closedby: {
      options: ['any', 'closerequest', 'none'],
      control: { type: 'radio' },
    },
  },
}
export default meta
type Story = StoryObj<DialogArgs>

export const Preview: Story = {
  args: {
    closedby: 'any',
  },
  render: (args) => ({
    props: args,
    template: `
      <button ksd-button commandfor="my-dialog" command="show-modal">Åpne dialog</button>
      <dialog ksd-dialog id="my-dialog" ${argsToTemplate(args)}>
        <button
          ksd-button
          data-icon="true"
          commandfor="my-dialog"
          data-variant="tertiary"
          type="button"
          aria-label="Lukk dialogvindu"
          data-color="neutral"
          command="close"
        ></button>
        <h2 ksd-heading style="margin-bottom: var(--ds-size-2);">Dialog tittel</h2>
        <p ksd-paragraph style="margin-bottom: var(--ds-size-2);">Her er det noe innhold i dialogen.</p>
      </dialog>
    `,
  }),
}

export const NonModal: Story = {
  name: 'Ikke-modal',
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <button ksd-button commandfor="non-modal-dialog" command="--show-non-modal">Åpne ikke-modal dialog</button>
      <dialog ksd-dialog id="non-modal-dialog" ${argsToTemplate(args)}>
        <button
          ksd-button
          data-icon="true"
          commandfor="non-modal-dialog"
          data-variant="tertiary"
          type="button"
          aria-label="Lukk dialogvindu"
          data-color="neutral"
          command="close"
        ></button>
        <h2 ksd-heading style="margin-bottom: var(--ds-size-2);">Ikke-modal dialog</h2>
        <p ksd-paragraph style="margin-bottom: var(--ds-size-2);">Denne dialogen blokkerer ikke resten av siden og har derfor heller ingen backdrop.</p>
      </dialog>
    `,
  }),
}
