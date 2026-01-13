import { Component, ElementRef, inject, input } from '@angular/core'
import {
  HostColor,
  HostSize,
} from '@ks-digital/designsystem-angular/__internals'

@Component({
  selector: '[ksd-card]',
  template: ` <ng-content /> `,
  hostDirectives: [
    {
      directive: HostSize,
      inputs: ['data-size'],
    },
    {
      directive: HostColor,
      inputs: ['data-color'],
    },
  ],
  host: {
    class: 'ds-card',
    '[attr.data-variant]': 'variant()',
    '(click)': 'handleClick($event)',
  },
})
export class Card {
  /**
   * Change the background color of the card
   * @default 'default'
   */
  public variant = input<'tinted' | 'default'>('default')
  private elementRef = inject(ElementRef)

  private projectedLink() {
    const el = this.elementRef.nativeElement
    return el?.querySelector(
      'h1 a, h2 a, h3 a, h4 a, h5 a, h6 a',
    ) as HTMLAnchorElement | null
  }

  protected handleClick = (event: MouseEvent) => {
    const link = this.projectedLink()
    if (!link) return

    if (event.metaKey || event.ctrlKey) {
      window.open(link.href, '_blank', 'noopener,noreferrer')
    } else {
      link.click()
    }
  }
}
