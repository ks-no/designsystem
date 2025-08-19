import { Component, ElementRef, inject, input } from '@angular/core'
import { CommonInputs } from '../common-inputs'

@Component({
  selector: 'ksd-card',
  template: ` <ng-content /> `,
  hostDirectives: [
    {
      directive: CommonInputs,
      inputs: ['data-size', 'data-color'],
    },
  ],
  host: {
    class: 'ds-card',
    '[attr.data-variant]': 'variant()',
    '(click)': 'handleClick($event)',
  },
})
export class Card {
  variant = input<'tinted' | 'default'>('default')
  private elementRef = inject(ElementRef)
  protected handleClick = (event: MouseEvent) => {
    const el = this.elementRef.nativeElement

    const link = el?.querySelector(
      'h1 a, h2 a, h3 a, h4 a, h5 a, h6 a',
    ) as HTMLAnchorElement | null

    if (!link) return

    if ((event as MouseEvent).metaKey || (event as MouseEvent).ctrlKey) {
      window.open(link.href, '_blank', 'noreferrer')
    } else {
      link.click()
    }
  }
}
