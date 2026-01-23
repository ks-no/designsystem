import {
  Component,
  contentChild,
  effect,
  ElementRef,
  inject,
  signal,
} from '@angular/core'
import {
  HostSize,
  randomId,
} from '@ks-digital/designsystem-angular/__internals'
import { Heading } from '@ks-digital/designsystem-angular/heading'

@Component({
  selector: '[ksd-error-summary]',
  template: ` <ng-content /> `,
  hostDirectives: [
    {
      directive: HostSize,
      inputs: ['data-size'],
    },
  ],
  host: {
    class: 'ds-error-summary',
    tabindex: '-1',
    '[attr.aria-labelledby]': 'id()',
  },
})
export class ErrorSummary {
  protected id = signal(randomId())
  private heading = contentChild(Heading)
  private el = inject(ElementRef)

  constructor() {
    effect(() => {
      if (this.heading()) {
        this.heading()?.setId(this.id())
      }
    })
  }

  focus() {
    this.el.nativeElement.focus()
  }
}
