import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import { renderExample } from '../../../.storybook/render'
import * as examples from './dialog.examples'

type DialogArgs = {
  closedby?: 'any' | 'closerequest' | 'none'
  /** Makes the dialog a drawer from that side */
  'data-placement'?: 'top' | 'bottom' | 'left' | 'right'
}

const ksd: KsdDocsParameters = {
  origin: 'digdir',
  digdir: 'dialog',
  imports: examples.imports,
}

const meta: Meta<DialogArgs> = {
  title: 'Komponenter/Dialog',
  tags: ['autodocs'],
  parameters: { ksd, docs: { canvas: { sourceState: 'none' } } },
  render: renderExample,
}
export default meta

type Story = StoryObj<DialogArgs>

/** The preview follows the Controls; the code below it stays the static example */
const controls: Story = {
  argTypes: {
    closedby: {
      options: ['any', 'closerequest', 'none'],
      control: { type: 'radio' },
    },
    'data-placement': {
      options: ['top', 'bottom', 'left', 'right'],
      control: { type: 'radio' },
    },
  },
  render: (a) =>
    html`<button
        class="ds-button"
        type="button"
        command="show-modal"
        commandfor="dialog-behandling"
      >
        Les om saksbehandlingen
      </button>
      <dialog
        class="ds-dialog"
        id="dialog-behandling"
        closedby=${ifDefined(a.closedby)}
        data-placement=${ifDefined(a['data-placement'])}
      >
        <button
          class="ds-button"
          type="button"
          data-variant="tertiary"
          data-color="neutral"
          data-icon
          aria-label="Lukk dialogvindu"
          command="close"
          commandfor="dialog-behandling"
        ></button>
        <h2 class="ds-heading" data-size="xs">Slik behandler vi søknaden</h2>
        <p class="ds-paragraph">
          Vi behandler søknadene i den rekkefølgen de kommer inn. Du får svar
          innen fire uker.
        </p>
      </dialog>`,
}

export const Preview: Story = {
  ...controls,
  parameters: { snippets: examples.preview },
}
export const IkkeModal: Story = {
  name: 'Ikke-modal',
  parameters: { snippets: examples.nonModal },
}
