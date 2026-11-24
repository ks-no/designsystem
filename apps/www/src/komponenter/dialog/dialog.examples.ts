import type { Imports, Snippets } from '@internal/storybook/snippets'

export const imports: Imports = {
  html: `import '@ks-digital/designsystem-web'`,
  angular: `import { Button } from '@ks-digital/designsystem-angular/button'
import { Dialog } from '@ks-digital/designsystem-angular/dialog'
import { Heading } from '@ks-digital/designsystem-angular/heading'
import { Paragraph } from '@ks-digital/designsystem-angular/paragraph'`,
  react: `import { Button, Dialog, Heading, Paragraph } from '@ks-digital/designsystem-react'`,
}

export const preview: Snippets = {
  html: `<button
  class="ds-button"
  type="button"
  command="show-modal"
  commandfor="dialog-behandling"
>
  Les om saksbehandlingen
</button>
<dialog class="ds-dialog" id="dialog-behandling">
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
    Vi behandler søknadene i den rekkefølgen de kommer inn. Du får svar innen fire uker.
  </p>
</dialog>`,
  angular: `<button
  ksd-button
  type="button"
  command="show-modal"
  commandfor="dialog-behandling"
>
  Les om saksbehandlingen
</button>
<dialog ksd-dialog id="dialog-behandling">
  <button
    ksd-button
    type="button"
    data-variant="tertiary"
    data-color="neutral"
    data-icon
    aria-label="Lukk dialogvindu"
    command="close"
    commandfor="dialog-behandling"
  ></button>
  <h2 ksd-heading data-size="xs">Slik behandler vi søknaden</h2>
  <p ksd-paragraph>
    Vi behandler søknadene i den rekkefølgen de kommer inn. Du får svar innen fire uker.
  </p>
</dialog>`,
  react: `<>
  <Button command="show-modal" commandfor="dialog-behandling">
    Les om saksbehandlingen
  </Button>
  <Dialog id="dialog-behandling">
    <Heading level={2} data-size="xs">Slik behandler vi søknaden</Heading>
    <Paragraph>
      Vi behandler søknadene i den rekkefølgen de kommer inn. Du får svar innen fire uker.
    </Paragraph>
  </Dialog>
</>`,
}

export const nonModal: Snippets = {
  html: `<button
  class="ds-button"
  type="button"
  data-variant="secondary"
  command="--show-non-modal"
  commandfor="dialog-hjelp"
>
  Vis hjelp
</button>
<dialog class="ds-dialog" id="dialog-hjelp">
  <button
    class="ds-button"
    type="button"
    data-variant="tertiary"
    data-color="neutral"
    data-icon
    aria-label="Lukk dialogvindu"
    command="close"
    commandfor="dialog-hjelp"
  ></button>
  <h2 class="ds-heading" data-size="xs">Hjelp til utfyllingen</h2>
  <p class="ds-paragraph">
    Du kan fortsette å fylle ut skjemaet mens dette vinduet er åpent.
  </p>
</dialog>`,
  angular: `<button
  ksd-button
  type="button"
  data-variant="secondary"
  command="--show-non-modal"
  commandfor="dialog-hjelp"
>
  Vis hjelp
</button>
<dialog ksd-dialog id="dialog-hjelp">
  <button
    ksd-button
    type="button"
    data-variant="tertiary"
    data-color="neutral"
    data-icon
    aria-label="Lukk dialogvindu"
    command="close"
    commandfor="dialog-hjelp"
  ></button>
  <h2 ksd-heading data-size="xs">Hjelp til utfyllingen</h2>
  <p ksd-paragraph>
    Du kan fortsette å fylle ut skjemaet mens dette vinduet er åpent.
  </p>
</dialog>`,
  react: `<>
  <Button
    variant="secondary"
    command="--show-non-modal"
    commandfor="dialog-hjelp"
  >
    Vis hjelp
  </Button>
  <Dialog id="dialog-hjelp" modal={false}>
    <Heading level={2} data-size="xs">Hjelp til utfyllingen</Heading>
    <Paragraph>
      Du kan fortsette å fylle ut skjemaet mens dette vinduet er åpent.
    </Paragraph>
  </Dialog>
</>`,
}
