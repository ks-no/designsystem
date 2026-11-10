import { component, expr, per, snippets } from '@internal/storybook/markup'
import type { Imports } from '@internal/storybook/snippets'

export type DialogArgs = {
  closedby?: 'any' | 'closerequest' | 'none'
  'data-placement'?: 'top' | 'bottom' | 'left' | 'right'
}

export const imports: Imports = {
  html: `import '@ks-digital/designsystem-web'`,
  angular: `import { Button } from '@ks-digital/designsystem-angular/button'
import { Dialog } from '@ks-digital/designsystem-angular/dialog'
import { Heading } from '@ks-digital/designsystem-angular/heading'
import { Paragraph } from '@ks-digital/designsystem-angular/paragraph'`,
  react: `import { Button, Dialog, Heading, Paragraph } from '@ks-digital/designsystem-react'`,
}

const Button = component({
  html: 'button.ds-button',
  angular: 'button[ksd-button]',
  react: 'Button',
  reactProps: { 'data-variant': 'variant', 'data-icon': 'icon' },
})
const Dialog = component({
  html: 'dialog.ds-dialog',
  angular: 'dialog[ksd-dialog]',
  react: 'Dialog',
  reactProps: { 'data-placement': 'placement' },
})
const Heading = component({
  html: 'h2.ds-heading',
  angular: 'h2[ksd-heading]',
  react: 'Heading',
})
const Paragraph = component({
  html: 'p.ds-paragraph',
  angular: 'p[ksd-paragraph]',
  react: 'Paragraph',
})

// React's Button sets type="button" itself
const type = per({ html: 'button', angular: 'button' })

/** The close button in the corner. React's Dialog adds it itself. */
const closeButton = (id: string) =>
  per({
    html: closeButtonNode(id),
    angular: closeButtonNode(id),
  })
const closeButtonNode = (id: string) =>
  Button({
    type,
    'data-variant': 'tertiary',
    'data-color': 'neutral',
    'data-icon': true,
    'aria-label': 'Lukk dialogvindu',
    command: 'close',
    commandfor: id,
  })

export const preview = (args: DialogArgs) => {
  const id = 'dialog-behandling'
  return snippets(
    Button(
      { type, command: 'show-modal', commandfor: id },
      'Les om saksbehandlingen',
    ),
    Dialog(
      { id, ...args },
      closeButton(id),
      Heading(
        { level: per({ react: 2 }), 'data-size': 'xs' },
        'Slik behandler vi søknaden',
      ),
      Paragraph(
        {},
        'Vi behandler søknadene i den rekkefølgen de kommer inn. Du får svar innen fire uker.',
      ),
    ),
  )
}

export const nonModal = (args: DialogArgs) => {
  const id = 'dialog-hjelp'
  return snippets(
    Button(
      {
        type,
        'data-variant': 'secondary',
        command: '--show-non-modal',
        commandfor: id,
      },
      'Vis hjelp',
    ),
    Dialog(
      { id, ...args, modal: per({ react: expr('false') }) },
      closeButton(id),
      Heading(
        { level: per({ react: 2 }), 'data-size': 'xs' },
        'Hjelp til utfyllingen',
      ),
      Paragraph(
        {},
        'Du kan fortsette å fylle ut skjemaet mens dette vinduet er åpent.',
      ),
    ),
  )
}
