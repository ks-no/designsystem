import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
} from '@angular/core'
import {
  HostColor,
  logIfDevMode,
} from '@ks-digital/designsystem-angular/__internals'
import { SpinnerSize } from './spinner-sizes'

@Component({
  selector: 'ksd-spinner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    :host {
      display: contents;
    }
  `,
  template: `
    <svg
      class="ds-spinner"
      role="img"
      viewBox="0 0 50 50"
      [attr.data-size]="dataSize()"
      [attr.aria-label]="ariaLabel()"
      [attr.aria-hidden]="ariaHidden() || undefined"
    >
      <circle
        class="ds-spinner__background"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke-width="5"
      />
      <circle
        class="ds-spinner__circle"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke-width="5"
      />
    </svg>
  `,
  host: {
    '[attr.aria-label]': 'null',
    '[attr.aria-hidden]': 'null',
  },
  hostDirectives: [
    {
      directive: HostColor,
      inputs: ['data-color'],
    },
  ],
})
export class Spinner {
  /**
   * Aria-label for the spinner
   */
  readonly ariaLabel = input<string>(undefined, { alias: 'aria-label' })

  /**
   * Aria-hidden for the spinner
   */
  readonly ariaHidden = input(undefined, {
    transform: booleanAttribute,
    alias: 'aria-hidden',
  })

  constructor() {
    effect(() => {
      if (this.ariaLabel() === undefined && !this.ariaHidden()) {
        logIfDevMode({
          component: 'ksd-spinner',
          message: 'Either `aria-label` or `aria-hidden` must be provided.',
        })
      }
    })
  }

  /**
   * Changes size for descendant Designsystemet components. Select from predefined sizes.
   * @attribute data-size
   */
  readonly dataSize = input<SpinnerSize>(undefined, {
    alias: 'data-size',
  })
}
