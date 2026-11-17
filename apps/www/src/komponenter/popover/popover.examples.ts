import type { Imports, Snippets } from '@internal/storybook/snippets'

export const imports: Imports = {
  html: `import '@ks-digital/designsystem-web'`,
  angular: `import { Button } from '@ks-digital/designsystem-angular/button'
import { Paragraph } from '@ks-digital/designsystem-angular/paragraph'
import { Popover } from '@ks-digital/designsystem-angular/popover'`,
  react: `import { Button, Paragraph, Popover } from '@ks-digital/designsystem-react'`,
}

export const preview: Snippets = {
  html: `<button
  class="ds-button"
  type="button"
  data-variant="secondary"
  popovertarget="popover-saksnummer"
>
  Hvor finner jeg saksnummeret?
</button>
<div class="ds-popover" id="popover-saksnummer" popover data-placement="top">
  Saksnummeret står øverst i brevet du fikk fra kommunen.
</div>`,
  angular: `<button
  ksd-button
  type="button"
  data-variant="secondary"
  popovertarget="popover-saksnummer"
>
  Hvor finner jeg saksnummeret?
</button>
<div ksd-popover id="popover-saksnummer" data-placement="top">
  Saksnummeret står øverst i brevet du fikk fra kommunen.
</div>`,
  react: `<>
  <Button variant="secondary" popoverTarget="popover-saksnummer">
    Hvor finner jeg saksnummeret?
  </Button>
  <Popover id="popover-saksnummer" placement="top">
    Saksnummeret står øverst i brevet du fikk fra kommunen.
  </Popover>
</>`,
}

export const withActions: Snippets = {
  html: `<button
  class="ds-button"
  type="button"
  data-variant="secondary"
  data-color="danger"
  popovertarget="popover-slett"
>
  Slett vedlegg
</button>
<div
  class="ds-popover"
  id="popover-slett"
  popover
  data-color="danger"
  data-placement="bottom"
>
  <p class="ds-paragraph">Vil du slette vedlegget? Du kan ikke angre.</p>
  <button
    class="ds-button"
    type="button"
    data-color="danger"
    data-size="sm"
    popovertarget="popover-slett"
    popovertargetaction="hide"
  >
    Ja, slett
  </button>
  <button
    class="ds-button"
    type="button"
    data-variant="tertiary"
    data-size="sm"
    popovertarget="popover-slett"
    popovertargetaction="hide"
  >
    Avbryt
  </button>
</div>`,
  angular: `<button
  ksd-button
  type="button"
  data-variant="secondary"
  data-color="danger"
  popovertarget="popover-slett"
>
  Slett vedlegg
</button>
<div
  ksd-popover
  id="popover-slett"
  data-color="danger"
  data-placement="bottom"
>
  <p ksd-paragraph>Vil du slette vedlegget? Du kan ikke angre.</p>
  <button
    ksd-button
    type="button"
    data-color="danger"
    data-size="sm"
    popovertarget="popover-slett"
    popovertargetaction="hide"
  >
    Ja, slett
  </button>
  <button
    ksd-button
    type="button"
    data-variant="tertiary"
    data-size="sm"
    popovertarget="popover-slett"
    popovertargetaction="hide"
  >
    Avbryt
  </button>
</div>`,
  react: `<>
  <Button variant="secondary" data-color="danger" popoverTarget="popover-slett">
    Slett vedlegg
  </Button>
  <Popover id="popover-slett" data-color="danger" placement="bottom">
    <Paragraph>Vil du slette vedlegget? Du kan ikke angre.</Paragraph>
    <Button
      data-color="danger"
      data-size="sm"
      popoverTarget="popover-slett"
      popoverTargetAction="hide"
    >
      Ja, slett
    </Button>
    <Button
      variant="tertiary"
      data-size="sm"
      popoverTarget="popover-slett"
      popoverTargetAction="hide"
    >
      Avbryt
    </Button>
  </Popover>
</>`,
}
